const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Environment variables
const JWT_SECRET = 'fda64fada1aa314e2167197ae36b9e2bfb12229ab8b6a604995d5b77a21df609';
const GOOGLE_SHEET_ID = '1ncxlcx8f8BfhHeT9ph1sb0HqencDOnkwCMeoYg9e3tk';
const GOOGLE_CLIENT_ID = '510608755501-ucl194dpbraertmqp8188bb7muh1b5oh.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
const GOOGLE_REFRESH_TOKEN = '1//04hKsI6kHczRqCgYIARAAGAQSNwF-L9IrDHN4iJWBcImylm9fFCx8IXWHgQMln-HkTTCL_k7XbzI578mhEAXlqMIFA3HV8i0Ghao';
const JSON_FEED_URL = 'https://vilpas.kiinteistomaailma.fi/export/km/listings/baseline.json';
const GOOGLE_REDIRECT_URI = 'https://kiinteistomaailma.norr3.fi/auth/google-callback';

// In-memory storage
let campaigns = []; // In-memory campaigns (synced with Google Sheets)
let users = [
  {
    email: 'seppo.kairikko@kiinteistomaailma.fi',
    password: bcrypt.hashSync('defaultPassword123', 10), // Hashed password
    partnerName: 'Kiinteistömaailma Helsinki',
    agentName: 'Seppo Kairikko',
    agentKey: '1160ska',
    agentImage: 'https://norr3.fi/wp-content/uploads/2025/02/265574029cb3c272131e0a888e3d891a.jpg',
    role: 'partner'
  },
  {
    email: 'admin@norr3.fi',
    password: bcrypt.hashSync('adminPassword123', 10), // Hashed password
    partnerName: 'NØRR3',
    agentName: 'Admin User',
    agentKey: 'admin123',
    agentImage: 'https://norr3.fi/wp-content/uploads/2025/02/265574029cb3c272131e0a888e3d891a.jpg',
    role: 'admin'
  },
  {
    email: 'admin2@norr3.fi',
    password: bcrypt.hashSync('adminPassword123', 10), // Hashed password for new admin user
    partnerName: 'NØRR3',
    agentName: 'Admin User 2',
    agentKey: 'admin123',
    agentImage: 'https://norr3.fi/wp-content/uploads/2025/02/265574029cb3c272131e0a888e3d891a.jpg',
    role: 'admin'
  }
]; // Hardcoded in-memory users

/*
  Function: refreshGoogleToken
  - Uses the refresh token to request a new access token from Google.
*/
async function refreshGoogleToken() {
  try {
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      refresh_token: GOOGLE_REFRESH_TOKEN,
      grant_type: 'refresh_token'
    });
    return tokenResponse.data.access_token;
  } catch (error) {
    throw new Error('Failed to refresh Google token: ' + error.message);
  }
}

/*
  Function: syncToSheets
  - Syncs campaigns to Google Sheets (LIVE sheet), handling one row per campaign with consolidated apartment data.
*/
/*
  Function: syncToSheets
  - Syncs campaigns to Google Sheets (LIVE sheet), updating existing rows with the same campaign_id or appending new rows.
*/
async function syncToSheets(data) {
  try {
    const token = await refreshGoogleToken();
    
    // Fetch current data from the sheet to find the row with the campaign_id
    const sheetResponse = await axios.get(
      `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/LIVE!A1:Z`,
      { headers: { 'Authorization': `Bearer ${token}` } }
    );
    const rows = sheetResponse.data.values || [];
    const headers = rows[0] || []; // Assume the first row is headers
    const dataRows = rows.slice(1); // Data rows (excluding headers)

    // Prepare the new data for each campaign in the input
    for (const item of data) {
      const campaignIdIndex = headers.indexOf('campaign_id');
      if (campaignIdIndex === -1) throw new Error('campaign_id column not found in sheet');

      // Find the row index with the matching campaign_id
      let rowIndex = -1;
      for (let i = 0; i < dataRows.length; i++) {
        if (dataRows[i][campaignIdIndex] === item.campaign_id) {
          rowIndex = i + 2; // +2 because slice(1) skips header, and 1-based indexing in Sheets
          break;
        }
      }

      const rowData = [
        item.campaign_id || '',
        item.partner_id || '',
        item.partner_name || '',
        item.agent || '',
        item.agent_key || '',
        (item.apartments || []).map(a => a.key).join(', ') || '',
        (item.apartments || []).map(a => `https://www.kiinteistomaailma.fi/${a.key}`).join(', ') || '',
        item.campaign_address || '',
        item.campaign_postal_code || '',
        item.campaign_city || '',
        item.campaign_radius || 0,
        item.channel_meta || 0,
        item.channel_display || 0,
        item.channel_pdooh || 0,
        (item.budget_meta || 0).toString(),
        (item.budget_meta_daily || 0).toString(),
        (item.budget_display || 0).toString(),
        (item.budget_display_daily || 0).toString(),
        (item.budget_pdooh || 0).toString(),
        (item.budget_pdooh_daily || 0).toString(),
        item.campaign_start_date || '',
        item.campaign_end_date || '',
        item.active ? '1' : '0'
      ];

      if (rowIndex !== -1) {
        // Update existing row
        await axios.put(
          `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/LIVE!A${rowIndex}:Z${rowIndex}?valueInputOption=RAW`,
          { values: [rowData] },
          { headers: { 'Authorization': `Bearer ${token}` } }
        );
      } else {
        // Append new row if not found
        await axios.post(
          `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/LIVE!A1:append?valueInputOption=RAW`,
          { values: [rowData] },
          { headers: { 'Authorization': `Bearer ${token}` } }
        );
      }
    }
  } catch (error) {
    throw new Error('Failed to sync campaigns to Google Sheets: ' + error.message);
  }
}
/*
  Function: fetchFromSheets
  - Fetches campaigns from Google Sheets (LIVE sheet), handling one row per campaign with consolidated apartment data.
*/
async function fetchFromSheets() {
  try {
    const token = await refreshGoogleToken();
    const response = await axios.get(
      `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/LIVE!A1:Z`,
      { headers: { 'Authorization': `Bearer ${token}` } }
    );
    const rows = response.data.values || [];
    return rows.slice(1).map(row => {
      const apartmentKeys = row[5].split(', ').filter(Boolean);
      const apartments = apartmentKeys.map(key => ({
        key: key || '',
        campaign_radius: 1500 // Default radius, as it's now general in the UI
      }));
      return {
        campaign_id: row[0] || '',
        partner_id: row[1] || '',
        partner_name: row[2] || '',
        agent: row[3] || '',
        agent_key: row[4] || '',
        apartments: apartments,
        campaign_address: row[7] || '',
        campaign_postal_code: row[8] || '',
        campaign_city: row[9] || '',
        campaign_radius: parseInt(row[10]) || 1500,
        campaign_start_date: row[20] || '',
        campaign_end_date: row[21] || '',
        active: row[22] === '1' || false,
        channel_meta: parseInt(row[11]) || 0,
        channel_display: parseInt(row[12]) || 0,
        channel_pdooh: parseInt(row[13]) || 0,
        budget_meta: parseFloat(row[14]) || 0,
        budget_display: parseFloat(row[16]) || 0,
        budget_pdooh: parseFloat(row[18]) || 0,
        budget_meta_daily: parseFloat(row[15]) || 0,
        budget_display_daily: parseFloat(row[17]) || 0,
        budget_pdooh_daily: parseFloat(row[19]) || 0
      };
    });
  } catch (error) {
    throw new Error('Failed to fetch campaigns from Google Sheets: ' + error.message);
  }
}

/*
  Agent info endpoint
*/
app.get('/api/agent-info', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const email = req.query.email;
  if (!email) return res.status(400).json({ error: 'Email is required' });
  try {
    const response = await axios.get(JSON_FEED_URL, { headers: { 'Cache-Control': 'no-cache' } });
    const apartments = response.data;
    let agentInfo = null;
    for (const apt of apartments) {
      if (apt.agent && apt.agent.email && apt.agent.email.toLowerCase().trim() === email.toLowerCase().trim()) {
        agentInfo = apt.agent;
        break;
      }
    }
    if (!agentInfo) return res.status(404).json({ error: 'Agent not found' });
    res.json({ name: agentInfo.name, key: agentInfo.key, email: agentInfo.email });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch agent info: ' + err.message });
  }
});

/*
  Apartments endpoint
*/
app.get('/api/apartments', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  try {
    const response = await axios.get('https://vilpas.kiinteistomaailma.fi/export/km/listings/baseline.json', { 
      headers: { 'Cache-Control': 'no-cache' } 
    });
    const mapped = response.data.map(apt => ({
      key: apt.key || '', // Ensure this matches the numeric "key" in the JSON
      agencyEmail: apt.agencyEmail || '',
      address: apt.address || '',
      postcode: apt.postcode || '',
      city: apt.city || '',
      images: apt.images || [], // Array of objects with url and type
      agentEmail: apt.agent?.email?.toLowerCase().trim() || '' // Extract agent email if exists
    }));
    res.json(mapped);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch apartments: ' + err.message });
  }
});/*
  Campaigns endpoints using in-memory storage and Google Sheets, handling one row per campaign with consolidated apartment data.
*/
app.get('/api/campaigns', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    campaigns = await fetchFromSheets(); // Fetch from Sheets
    if (decoded.role === 'partner') {
      campaigns = campaigns.filter(c => (c.agent_key || '').toLowerCase() === (decoded.agentKey || '').toLowerCase());
    }
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch campaigns: ' + error.message });
  }
});

app.get('/api/campaigns/:campaignId', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    campaigns = await fetchFromSheets(); // Fetch from Sheets
    const campaign = campaigns.find(c => c.campaign_id === req.params.campaignId);
    if (!campaign) return res.status(404).json({ error: 'Campaign not found' });
    if (decoded.role === 'partner' && campaign.agent_key.toLowerCase() !== decoded.agentKey.toLowerCase()) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }
    res.json(campaign);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch campaign: ' + error.message });
  }
});

app.post('/api/campaigns', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { campaign, apartments } = req.body;
    const newCampaign = {
      campaign_id: campaign.campaign_id || Math.random().toString(36).substr(2, 9),
      partner_id: campaign.partner_id || Math.random().toString(36).substr(2, 9),
      partner_name: campaign.partner_name || decoded.partnerName || 'Kiinteistömaailma Helsinki',
      agent: campaign.agent || decoded.agentName || '',
      agent_key: campaign.agent_key || decoded.agentKey || '',
      apartments: apartments || [],
      campaign_address: campaign.campaign_address || '',
      campaign_postal_code: campaign.campaign_postal_code || '',
      campaign_city: campaign.campaign_city || '',
      campaign_radius: campaign.campaign_radius || 1500,
      campaign_start_date: campaign.campaign_start_date || new Date().toISOString().split('T')[0],
      campaign_end_date: campaign.campaign_end_date || null,
      active: campaign.active !== undefined ? campaign.active : true,
      channel_meta: campaign.channel_meta || 0,
      channel_display: campaign.channel_display || 0,
      channel_pdooh: campaign.channel_pdooh || 0,
      budget_meta: campaign.budget_meta || 0,
      budget_display: campaign.budget_display || 0,
      budget_pdooh: campaign.budget_pdooh || 0,
      budget_meta_daily: campaign.budget_meta_daily || (campaign.budget_meta / 30).toFixed(2), // Default 30 days if no end date
      budget_display_daily: campaign.budget_display_daily || (campaign.budget_display / 30).toFixed(2),
      budget_pdooh_daily: campaign.budget_pdooh_daily || (campaign.budget_pdooh / 30).toFixed(2)
    };
    campaigns.push(newCampaign);
    await syncToSheets([newCampaign]); // Sync the new campaign
    res.json(newCampaign);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create campaign: ' + error.message });
  }
});

app.put('/api/campaigns/:campaignId', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { campaign, apartments } = req.body;
    const index = campaigns.findIndex(c => c.campaign_id === req.params.campaignId);
    if (index === -1) return res.status(404).json({ error: 'Campaign not found' });
    if (decoded.role === 'partner' && campaigns[index].agent_key.toLowerCase() !== decoded.agentKey.toLowerCase()) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }
    // Calculate days for daily budgets
    const start = new Date(campaign.campaign_start_date);
    const end = campaign.campaign_end_date ? new Date(campaign.campaign_end_date) : new Date(start.getTime() + 30 * 24 * 60 * 60 * 1000);
    const days = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));

    campaigns[index] = {
      ...campaigns[index],
      campaign_id: req.params.campaignId,
      partner_id: campaign.partner_id || campaigns[index].partner_id || Math.random().toString(36).substr(2, 9),
      partner_name: campaign.partner_name || decoded.partnerName || 'Kiinteistömaailma Helsinki',
      agent: campaign.agent || decoded.agentName || '',
      agent_key: campaign.agent_key || decoded.agentKey || '',
      apartments: apartments || campaigns[index].apartments,
      campaign_address: campaign.campaign_address || campaigns[index].campaign_address || '',
      campaign_postal_code: campaign.campaign_postal_code || campaigns[index].campaign_postal_code || '',
      campaign_city: campaign.campaign_city || campaigns[index].campaign_city || '',
      campaign_radius: campaign.campaign_radius || campaigns[index].campaign_radius || 1500,
      campaign_start_date: campaign.campaign_start_date || campaigns[index].campaign_start_date || new Date().toISOString().split('T')[0],
      campaign_end_date: campaign.campaign_end_date || campaigns[index].campaign_end_date || null,
      active: campaign.active !== undefined ? campaign.active : campaigns[index].active || true,
      channel_meta: campaign.channel_meta || campaigns[index].channel_meta || 0,
      channel_display: campaign.channel_display || campaigns[index].channel_display || 0,
      channel_pdooh: campaign.channel_pdooh || campaigns[index].channel_pdooh || 0,
      budget_meta: campaign.budget_meta || campaigns[index].budget_meta || 0,
      budget_display: campaign.budget_display || campaigns[index].budget_display || 0,
      budget_pdooh: campaign.budget_pdooh || campaigns[index].budget_pdooh || 0,
      budget_meta_daily: (campaign.budget_meta || campaigns[index].budget_meta) / days || 0,
      budget_display_daily: (campaign.budget_display || campaigns[index].budget_display) / days || 0,
      budget_pdooh_daily: (campaign.budget_pdooh || campaigns[index].budget_pdooh) / days || 0
    };
    await syncToSheets([campaigns[index]]); // Sync the updated campaign
    res.json(campaigns[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update campaign: ' + error.message });
  }
});

app.patch('/api/campaigns/status/:campaignId', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const index = campaigns.findIndex(c => c.campaign_id === req.params.campaignId);
    if (index === -1) return res.status(404).json({ error: 'Campaign not found' });
    if (decoded.role === 'partner' && campaigns[index].agent_key.toLowerCase() !== decoded.agentKey.toLowerCase()) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }
    campaigns[index].active = req.body.active === true;
    await syncToSheets([campaigns[index]]); // Sync the updated campaign
    res.json(campaigns[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update campaign status: ' + error.message });
  }
});

/*
  Users endpoints using in-memory storage (hardcoded in server.js).
*/
app.get('/api/users', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'admin') return res.status(401).json({ error: 'Admin access required' });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users: ' + error.message });
  }
});

app.post('/api/users', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'admin') return res.status(401).json({ error: 'Admin access required' });
    const newUser = {
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      partnerName: req.body.partnerName || '',
      agentName: req.body.agentName || '',
      agentKey: req.body.agentKey || '',
      agentImage: req.body.agentImage || '',
      role: req.body.role || 'partner'
    };
    users.push(newUser);
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add user: ' + error.message });
  }
});

app.delete('/api/users/:email', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'admin') return res.status(401).json({ error: 'Admin access required' });
    users = users.filter(u => u.email !== req.params.email);
    res.json({ message: 'User removed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove user: ' + error.message });
  }
});

app.put('/api/users/:email', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'admin') return res.status(401).json({ error: 'Admin access required' });
    const index = users.findIndex(u => u.email === req.params.email);
    if (index === -1) return res.status(404).json({ error: 'User not found' });
    users[index] = {
      ...users[index],
      partnerName: req.body.partnerName || users[index].partnerName,
      agentName: req.body.agentName || users[index].agentName,
      agentKey: req.body.agentKey || users[index].agentKey,
      agentImage: req.body.agentImage || users[index].agentImage,
      role: req.body.role || users[index].role
    };
    if (req.body.password) {
      users[index].password = bcrypt.hashSync(req.body.password, 10);
    }
    res.json(users[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to edit user: ' + error.message });
  }
});

// Google login endpoints (set as admin with full access)
app.get('/auth/google-login', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile`);
});

app.get('/auth/google-callback', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const code = req.query.code;
  try {
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code'
    });
    const { access_token } = tokenResponse.data;
    const userResponse = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
      headers: { Authorization: `Bearer ${access_token}` }
    });
    const user = userResponse.data;
    let existingUser = users.find(u => u.email === user.email);
    if (!existingUser) {
      const newUser = {
        email: user.email,
        password: bcrypt.hashSync('defaultPassword123', 10),
        partnerName: 'NØRR3', // Default for Google login as admin
        agentName: user.name || 'Admin User',
        agentKey: user.email === 'admin@norr3.fi' || user.email === 'admin2@norr3.fi' ? 'admin123' : 'google-' + Math.random().toString(36).substr(2, 9),
        agentImage: user.picture || 'https://norr3.fi/wp-content/uploads/2025/02/265574029cb3c272131e0a888e3d891a.jpg',
        role: 'admin' // Force Google login as admin with full access
      };
      users.push(newUser);
      existingUser = newUser;
    }
    const token = jwt.sign(
      { 
        email: existingUser.email, 
        role: 'admin', 
        partnerName: existingUser.partnerName, 
        agentName: existingUser.agentName, 
        agentKey: existingUser.agentKey 
      },
      JWT_SECRET,
      { expiresIn: '4h' }
    );
    res.redirect(`https://kiinteistomaailma.norr3.fi/?token=${token}&service=norr3&email=${encodeURIComponent(existingUser.email)}`);
  } catch (error) {
    res.status(500).send('Google login failed: ' + error.message);
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase()); // Case-insensitive match
    if (!user) {
      return res.status(401).json({ error: 'Wrong email or password, please try again.' });
    }
    if (!bcrypt.compareSync(password, user.password)) {
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
  } catch (error) {
    res.status(500).json({ error: 'Server error during login: ' + error.message });
  }
});

// New endpoint for agent autofill (from JSON feed, not Sheets)
app.post('/api/users/autofill', async (req, res) => {
  const { email } = req.body;
  try {
    const response = await axios.get(JSON_FEED_URL, {
      headers: { 'Cache-Control': 'no-cache' }
    });
    const listings = response.data;
    const agentInfo = listings.find(apt => 
      apt.agent && apt.agent.email && apt.agent.email.toLowerCase().trim() === email.toLowerCase().trim()
    );
    if (!agentInfo) {
      return res.status(404).json({ error: 'Agent not found in JSON feed.' });
    }
    const { name, key, pictureUrl } = agentInfo.agent;
    res.json({ email, agentName: name, agentKey: key, agentImage: pictureUrl });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch agent info: ' + error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;