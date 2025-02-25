const jwt = require('jsonwebtoken');
const axios = require('axios');

async function refreshGoogleToken() {
  const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    grant_type: 'refresh_token'
  });
  return tokenResponse.data.access_token;
}

async function loadCampaignsFromSheet(agentKey) {
  const accessToken = await refreshGoogleToken();
  const sheetResp = await axios.get(
    `https://sheets.googleapis.com/v4/spreadsheets/${process.env.GOOGLE_SHEET_ID}/values/LIVE`,
    { headers: { 'Authorization': `Bearer ${accessToken}` } }
  );
  const values = sheetResp.data.values || [];
  const loadedCampaigns = [];
  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    const rowAgentKey = row[4];
    if (!agentKey || rowAgentKey.toLowerCase() === agentKey.toLowerCase()) {
      let existingCamp = loadedCampaigns.find(c => c.id === row[0]);
      if (!existingCamp) {
        existingCamp = {
          id: row[0],
          partner_id: row[1],
          partnerName: row[2],
          agent_name: row[3],
          agent_key: row[4],
          apartments: [],
          address: row[7] || 'Unknown',
          postal_code: row[8] || 'Unknown',
          city: row[9] || 'Unknown',
          radius: 0,
          start_date: row[20],
          end_date: row[21] || '',
          channels: [],
          budget: { meta: 0, display: 0, pdooh: 0 },
          status: (row[22] === '1')
        };
        loadedCampaigns.push(existingCamp);
      }
      existingCamp.apartments.push({
        key: row[5],
        radius: parseInt(row[10]) || 1500,
        channels: [
          row[11] === '1' ? 'meta' : null,
          row[12] === '1' ? 'display' : null,
          row[13] === '1' ? 'pdooh' : null
        ].filter(Boolean),
        budget: {
          meta: parseFloat(row[14]) || 0,
          display: parseFloat(row[16]) || 0,
          pdooh: parseFloat(row[18]) || 0
        }
      });
      if (row[11] === '1' && !existingCamp.channels.includes('meta')) existingCamp.channels.push('meta');
      if (row[12] === '1' && !existingCamp.channels.includes('display')) existingCamp.channels.push('display');
      if (row[13] === '1' && !existingCamp.channels.includes('pdooh')) existingCamp.channels.push('pdooh');
      existingCamp.budget.meta += parseFloat(row[14]) || 0;
      existingCamp.budget.display += parseFloat(row[16]) || 0;
      existingCamp.budget.pdooh += parseFloat(row[18]) || 0;
    }
  }
  return loadedCampaigns;
}

module.exports = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  try {
    if (!token) return res.status(401).json({ error: 'No token provided' });
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) return res.status(401).json({ error: 'Invalid token' });
      if (req.method === 'GET') {
        const agentKey = decoded.role === 'partner' ? decoded.agentKey : null;
        const campaigns = await loadCampaignsFromSheet(agentKey);
        res.json(campaigns);
      } else if (req.method === 'POST') {
        const randomId = String(Math.floor(1000 + Math.random() * 9000));
        const newCampaign = {
          ...req.body,
          id: randomId,
          agent_name: decoded.agentName,
          agent_key: decoded.agentKey
        };
        await syncToSheets([newCampaign]);
        res.json(newCampaign);
      } else if (req.method === 'PUT') {
        const campaign = req.body;
        await syncToSheets([campaign]);
        res.json(campaign);
      } else {
        res.status(405).json({ error: 'Method not allowed' });
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process campaigns: ' + error.message });
  }
};

async function syncToSheets(campaignsArray) {
  const accessToken = await refreshGoogleToken();
  const campaign = campaignsArray[0];
  const days = campaign.end_date
    ? Math.max(1, (new Date(campaign.end_date) - new Date(campaign.start_date)) / (1000 * 60 * 60 * 24))
    : 30;
  const rows = [];
  campaign.apartments.forEach(apt => {
    rows.push([
      campaign.id,
      campaign.partner_id,
      campaign.partnerName,
      campaign.agent_name,
      campaign.agent_key,
      apt.key,
      `https://www.kiinteistomaailma.fi/${apt.key}`,
      campaign.address,
      campaign.postal_code,
      campaign.city,
      apt.radius,
      campaign.channels.includes('meta') ? 1 : 0,
      campaign.channels.includes('display') ? 1 : 0,
      campaign.channels.includes('pdooh') ? 1 : 0,
      (campaign.budget.meta || 0).toString(),
      ((parseFloat(campaign.budget.meta || 0) / days) || 0).toFixed(2),
      (campaign.budget.display || 0).toString(),
      ((parseFloat(campaign.budget.display || 0) / days) || 0).toFixed(2),
      (campaign.budget.pdooh || 0).toString(),
      ((parseFloat(campaign.budget.pdooh || 0) / days) || 0).toFixed(2),
      campaign.start_date,
      campaign.end_date || '',
      campaign.status ? '1' : '0'
    ]);
  });
  await axios.post(
    `https://sheets.googleapis.com/v4/spreadsheets/${process.env.GOOGLE_SHEET_ID}/values/LIVE:append?valueInputOption=RAW`,
    { values: rows },
    { headers: { 'Authorization': `Bearer ${accessToken}` } }
  );
}