const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID || 'your-google-sheet-id';
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'your-google-client-id';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || 'your-google-client-secret';
const GOOGLE_REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN || 'your-google-refresh-token';

let campaigns = [];
let users = [
  {
    email: 'seppo.kairikko@kiinteistomaailma.fi',
    password: bcrypt.hashSync('password123', 10),
    role: 'partner',
    partnerName: 'Kiinteistömaailma Helsinki',
    agentName: 'Seppo Kairikko',
    agentKey: '1160ska',
    agentImage: ''
  },
  {
    email: 'admin@norr3.fi',
    password: bcrypt.hashSync('Admin123', 10),
    role: 'admin',
    partnerName: 'NØRR3',
    agentName: '',
    agentKey: '',
    agentImage: ''
  }
];
let apartmentsCache = [];

async function refreshGoogleToken() {
  const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET,
    refresh_token: GOOGLE_REFRESH_TOKEN,
    grant_type: 'refresh_token'
  });
  return tokenResponse.data.access_token;
}

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
      campaign.status ? 'yes' : 'no'
    ]);
  });
  await axios.post(
    `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/LIVE:append?valueInputOption=RAW`,
    { values: rows },
    { headers: { 'Authorization': `Bearer ${accessToken}` } }
  );
}

async function loadCampaignsFromSheet(agentEmail) {
  const accessToken = await refreshGoogleToken();
  const sheetResp = await axios.get(
    `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/LIVE`,
    { headers: { 'Authorization': `Bearer ${accessToken}` } }
  );
  const values = sheetResp.data.values || [];
  const loadedCampaigns = [];
  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    const campaign_id = row[0];
    const agent_key = row[4];
    if (!agentEmail || agent_key.toLowerCase() === agentEmail.toLowerCase()) {
      let existingCamp = loadedCampaigns.find(c => c.id === campaign_id);
      if (!existingCamp) {
        existingCamp = {
          id: campaign_id,
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
          status: (row[22] === 'yes')
        };
        loadedCampaigns.push(existingCamp);
      }
      existingCamp.apartments.push({
        key: row[5],
        radius: parseInt(row[10]) || 1500,
        channels: [row[11] === '1' ? 'meta' : null, row[12] === '1' ? 'display' : null, row[13] === '1' ? 'pdooh' : null].filter(Boolean),
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

app.get('/api/apartments', async (req, res) => {
  try {
    if (!apartmentsCache.length) {
      const response = await axios.get(process.env.JSON_FEED_URL || 'https://vilpas.kiinteistomaailma.fi/export/km/listings/baseline.json', {
        headers: { 'Cache-Control': 'no-cache' }
      });
      apartmentsCache = response.data;
    }
    const mapped = apartmentsCache.map(apt => ({
      key: apt.key,
      agencyEmail: apt.agencyEmail,
      address: apt.address || 'Unknown Address',
      postcode: apt.postcode || 'Unknown',
      city: apt.city || 'Unknown',
      images: apt.images || [],
      agentEmail: apt.agent && apt.agent.email ? apt.agent.email.toLowerCase().trim() : ""
    }));
    res.json(mapped);
  } catch (err) {
    console.error('Error in /api/apartments:', err);
    res.status(500).json({ error: 'Failed to fetch apartments: ' + err.message });
  }
});

app.get('/api/campaigns', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  try {
    if (!token) return res.status(401).json({ error: 'No token provided' });
    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
      if (err) return res.status(401).json({ error: 'Invalid token' });
      const agentEmail = (decoded.role === 'partner') ? decoded.email : null;
      const allCamps = await loadCampaignsFromSheet(agentEmail);
      if (decoded.role === 'partner') return res.json(allCamps);
      else {
        const allLoaded = await loadCampaignsFromSheet(null);
        res.json(allLoaded);
      }
    });
  } catch (error) {
    console.error('Error in GET /api/campaigns:', error);
    res.status(500).json({ error: 'Failed to fetch campaigns: ' + error.message });
  }
});

app.get('/api/campaigns/:id', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  try {
    if (!token) return res.status(401).json({ error: 'No token provided' });
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ error: 'Invalid token' });
      const camp = campaigns.find(c => c.id === req.params.id);
      if (!camp) return res.status(404).json({ error: 'Campaign not found in memory' });
      if (decoded.role === 'partner' && camp.agent_key.toLowerCase() !== decoded.email.toLowerCase()) {
        return res.status(403).json({ error: 'Unauthorized access' });
      }
      res.json(camp);
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch campaign: ' + error.message });
  }
});

app.post('/api/campaigns', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  try {
    if (!token) return res.status(401).json({ error: 'No token provided' });
    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
      if (err) return res.status(401).json({ error: 'Invalid token' });
      const randomId = String(Math.floor(1000 + Math.random() * 9000));
      // Use agent details from token payload
      const newCampaign = {
        ...req.body,
        id: randomId,
        agent_name: decoded.agentName || 'Unknown Agent',
        agent_key: decoded.agentKey || 'Unknown'
      };
      campaigns.push(newCampaign);
      await syncToSheets([newCampaign]);
      res.json(newCampaign);
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create campaign: ' + error.message });
  }
});

app.put('/api/campaigns', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  try {
    if (!token) return res.status(401).json({ error: 'No token provided' });
    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
      if (err) return res.status(401).json({ error: 'Invalid token' });
      const idx = campaigns.findIndex(c => c.id === req.body.id);
      if (idx === -1) return res.status(404).json({ error: 'Campaign not found' });
      if (decoded.role === 'partner' && campaigns[idx].agent_key.toLowerCase() !== decoded.email.toLowerCase()) {
        return res.status(403).json({ error: 'Unauthorized access' });
      }
      campaigns[idx] = { ...campaigns[idx], ...req.body };
      await syncToSheets([campaigns[idx]]);
      res.json(campaigns[idx]);
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update campaign: ' + error.message });
  }
});

app.patch('/api/campaigns/status/:id', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  try {
    if (!token) return res.status(401).json({ error: 'No token provided' });
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ error: 'Invalid token' });
      const camp = campaigns.find(c => c.id === req.params.id);
      if (!camp) return res.status(404).json({ error: 'Campaign not found' });
      if (decoded.role === 'partner' && camp.agent_key.toLowerCase() !== decoded.email.toLowerCase()) {
        return res.status(403).json({ error: 'Unauthorized access' });
      }
      camp.status = req.body.status;
      res.json(camp);
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update campaign status: ' + error.message });
  }
});

app.post('/api/sheets/update', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  try {
    if (!token) return res.status(401).json({ error: 'No token provided' });
    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
      if (err) return res.status(401).json({ error: 'Invalid token' });
      const campaign = campaigns.find(c => c.id === req.body.campaignId);
      if (!campaign) return res.status(404).json({ error: 'Campaign not found' });
      // (Temporarily disabled: campaign syncing is done on POST)
      res.json({ message: 'Campaign syncing disabled for edits' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to sync to Google Sheets: ' + error.message });
  }
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Wrong email or password, please try again.' });
  }
  const token = jwt.sign(
    { 
      email: user.email, 
      role: user.role, 
      partnerName: user.partnerName, 
      agentName: user.agentName, 
      agentKey: user.agentKey 
    },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
  res.json({ 
    token, 
    role: user.role, 
    partnerName: user.partnerName, 
    email: user.email,
    agentName: user.agentName,
    agentKey: user.agentKey
  });
});

app.get('/auth/google-login', (req, res) => {
  res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=https://kiinteistomaailma.norr3.fi/auth/google-callback&response_type=code&scope=email profile`);
});

app.get('/auth/google-callback', async (req, res) => {
  const code = req.query.code;
  try {
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: 'https://kiinteistomaailma.norr3.fi/auth/google-callback',
      grant_type: 'authorization_code'
    });
    const { access_token } = tokenResponse.data;
    const userResponse = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
      headers: { Authorization: `Bearer ${access_token}` }
    });
    const user = userResponse.data;
    const existingUser = users.find(u => u.email === user.email);
    if (!existingUser) {
      users.push({
        email: user.email,
        password: bcrypt.hashSync('defaultPassword123', 10),
        role: 'partner',
        partnerName: 'Kiinteistömaailma Helsinki',
        agentName: '',
        agentKey: '',
        agentImage: ''
      });
    }
    const token = jwt.sign({ email: user.email, role: 'partner', partnerName: 'Kiinteistömaailma Helsinki' }, JWT_SECRET, { expiresIn: '1h' });
    res.redirect(`https://kiinteistomaailma.norr3.fi/?token=${token}&service=kiinteistomaailma`);
  } catch (error) {
    res.status(500).send('Google login failed: ' + error.message);
  }
});

app.post('/api/users', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  try {
    if (!token) return res.status(401).json({ error: 'No token provided' });
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err || decoded.role !== 'admin') return res.status(401).json({ error: 'Admin access required' });
      const user = { ...req.body, password: bcrypt.hashSync(req.body.password, 10), role: 'partner' };
      users.push(user);
      res.json(user);
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add user: ' + error.message });
  }
});

app.delete('/api/users/:email', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  try {
    if (!token) return res.status(401).json({ error: 'No token provided' });
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err || decoded.role !== 'admin') return res.status(401).json({ error: 'Admin access required' });
      users = users.filter(u => u.email !== req.params.email);
      res.json({ message: 'User removed successfully' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove user: ' + error.message });
  }
});

app.put('/api/users/:email', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  try {
    if (!token) return res.status(401).json({ error: 'No token provided' });
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err || decoded.role !== 'admin') return res.status(401).json({ error: 'Admin access required' });
      const index = users.findIndex(u => u.email === req.params.email);
      if (index === -1) return res.status(404).json({ error: 'User not found' });
      users[index] = { ...users[index], ...req.body };
      if (req.body.password) {
        users[index].password = bcrypt.hashSync(req.body.password, 10);
      }
      res.json(users[index]);
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to edit user: ' + error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
