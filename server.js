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
    agentImage: 'https://example.com/image.jpg',
    role: 'partner'
  },
  {
    email: 'admin@norr3.fi',
    password: bcrypt.hashSync('adminPassword123', 10), // Hashed password
    partnerName: 'NØRR3',
    agentName: 'Admin User',
    agentKey: 'admin123',
    agentImage: 'https://example.com/admin.jpg',
    role: 'admin'
  }
]; // Hardcoded in-memory users

/*
  Function: refreshGoogleToken
  - Uses the refresh token to request a new access token from Google.
*/
async function refreshGoogleToken() {
  const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET,
    refresh_token: GOOGLE_REFRESH_TOKEN,
    grant_type: 'refresh_token'
  });
  return tokenResponse.data.access_token;
}

/*
  Function: syncToSheets
  - Syncs campaigns to Google Sheets (Campaigns sheet only).
*/
async function syncToSheets(data) {
  try {
    const token = await refreshGoogleToken();
    const rows = data.map(item => [
      item.id || '',
      item.partner_name || '',
      item.agent_name || '',
      item.agent_key || '',
      item.address || '',
      item.postal_code || '',
      item.city || '',
      item.start_date || '',
      item.end_date || '',
      item.status ? '1' : '0',
      item.channel_meta || 0,
      item.channel_display || 0,
      item.channel_pdooh || 0,
      (item.budget_meta || 0).toString(),
      (item.budget_display || 0).toString(),
      (item.budget_pdooh || 0).toString()
    ]);
    await axios.post(
      `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/LIVE!A1:append?valueInputOption=RAW`,
      { values: rows },
      { headers: { 'Authorization': `Bearer ${token}` } }
    );
  } catch (error) {
    console.error('Error syncing to Campaigns in Google Sheets:', error);
    throw new Error('Failed to sync campaigns to Google Sheets: ' + error.message);
  }
}

/*
  Function: fetchFromSheets
  - Fetches campaigns from Google Sheets (Campaigns sheet only).
*/
async function fetchFromSheets() {
  try {
    const token = await refreshGoogleToken();
    const response = await axios.get(
      `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/LIVE!A1:Z`,
      { headers: { 'Authorization': `Bearer ${token}` } }
    );
    const rows = response.data.values || [];
    return rows.slice(1).map(row => ({
      id: row[0] || '',
      partner_name: row[1] || '',
      agent_name: row[2] || '',
      agent_key: row[3] || '',
      address: row[4] || '',
      postal_code: row[5] || '',
      city: row[6] || '',
      start_date: row[7] || '',
      end_date: row[8] || '',
      status: row[9] === '1' || false,
      channel_meta: parseInt(row[10]) || 0,
      channel_display: parseInt(row[11]) || 0,
      channel_pdooh: parseInt(row[12]) || 0,
      budget_meta: parseFloat(row[13]) || 0,
      budget_display: parseFloat(row[14]) || 0,
      budget_pdooh: parseFloat(row[15]) || 0,
      apartments: [] // Will be populated separately if needed
    }));
  } catch (error) {
    console.error('Error fetching from Campaigns in Google Sheets:', error);
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
    res.json(agentInfo);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
    const response = await axios.get(JSON_FEED_URL, { headers: { 'Cache-Control': 'no-cache' } });
    const mapped = response.data.map(apt => ({
      key: apt.key || '',
      agencyEmail: apt.agencyEmail || '',
      address: apt.address || '',
      postcode: apt.postcode || '',
      city: apt.city || '',
      images: apt.images || [],
      agentEmail: apt.agent?.email?.toLowerCase().trim() || ''
    }));
    res.json(mapped);
  } catch (err) {
    console.error('Error in /api/apartments:', err);
    res.status(500).json({ error: 'Failed to fetch apartments: ' + err.message });
  }
});

/*
  Campaigns endpoints using in-memory storage and Google Sheets.
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
    console.error('Error in GET /api/campaigns:', error);
    res.status(500).json({ error: 'Failed to fetch campaigns: ' + error.message });
  }
});

app.get('/api/campaigns/:id', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    campaigns = await fetchFromSheets(); // Fetch from Sheets
    const campaign = campaigns.find(c => c.id === req.params.id);
    if (!campaign) return res.status(404).json({ error: 'Campaign not found' });
    if (decoded.role === 'partner' && campaign.agent_key.toLowerCase() !== decoded.agentKey.toLowerCase()) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }
    res.json(campaign);
  } catch (error) {
    console.error('Error in GET /api/campaigns/:id:', error);
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
      id: Math.random().toString(36).substr(2, 9), // Simple unique ID for in-memory
      partner_name: campaign.partner_name || decoded.partnerName || 'Kiinteistömaailma Helsinki',
      agent_name: campaign.agent_name || decoded.agentName || '',
      agent_key: campaign.agent_key || decoded.agentKey || '',
      address: campaign.address || '',
      postal_code: campaign.postal_code || '',
      city: campaign.city || '',
      start_date: campaign.start_date || new Date().toISOString().split('T')[0],
      end_date: campaign.end_date || null,
      status: campaign.status !== undefined ? campaign.status : true,
      channel_meta: campaign.channel_meta || 0,
      channel_display: campaign.channel_display || 0,
      channel_pdooh: campaign.channel_pdooh || 0,
      budget_meta: campaign.budget_meta || 0,
      budget_display: campaign.budget_display || 0,
      budget_pdooh: campaign.budget_pdooh || 0,
      apartments: apartments || []
    };
    campaigns.push(newCampaign);
    await syncToSheets([newCampaign]);
    res.json(newCampaign);
  } catch (error) {
    console.error('Error in POST /api/campaigns:', error);
    res.status(500).json({ error: 'Failed to create campaign: ' + error.message });
  }
});

app.put('/api/campaigns/:id', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { campaign, apartments } = req.body;
    const index = campaigns.findIndex(c => c.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Campaign not found' });
    if (decoded.role === 'partner' && campaigns[index].agent_key.toLowerCase() !== decoded.agentKey.toLowerCase()) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }
    campaigns[index] = {
      ...campaigns[index],
      id: req.params.id,
      partner_name: campaign.partner_name || decoded.partnerName || 'Kiinteistömaailma Helsinki',
      agent_name: campaign.agent_name || decoded.agentName || '',
      agent_key: campaign.agent_key || decoded.agentKey || '',
      address: campaign.address || '',
      postal_code: campaign.postal_code || '',
      city: campaign.city || '',
      start_date: campaign.start_date || new Date().toISOString().split('T')[0],
      end_date: campaign.end_date || null,
      status: campaign.status !== undefined ? campaign.status : true,
      channel_meta: campaign.channel_meta || 0,
      channel_display: campaign.channel_display || 0,
      channel_pdooh: campaign.channel_pdooh || 0,
      budget_meta: campaign.budget_meta || 0,
      budget_display: campaign.budget_display || 0,
      budget_pdooh: campaign.budget_pdooh || 0,
      apartments: apartments || []
    };
    await syncToSheets(campaigns);
    res.json(campaigns[index]);
  } catch (error) {
    console.error('Error in PUT /api/campaigns/:id:', error);
    res.status(500).json({ error: 'Failed to update campaign: ' + error.message });
  }
});

app.patch('/api/campaigns/status/:id', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const index = campaigns.findIndex(c => c.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Campaign not found' });
    if (decoded.role === 'partner' && campaigns[index].agent_key.toLowerCase() !== decoded.agentKey.toLowerCase()) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }
    campaigns[index].status = req.body.status === true;
    await syncToSheets(campaigns);
    res.json(campaigns[index]);
  } catch (error) {
    console.error('Error in PATCH /api/campaigns/status/:id:', error);
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
    console.error('Error in GET /api/users:', error);
    res.status(500).json({ error: error.message });
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
    console.error('Failed to add user:', error);
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
    console.error('Failed to remove user:', error);
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
    console.error('Failed to edit user:', error);
    res.status(500).json({ error: 'Failed to edit user: ' + error.message });
  }
});

// Google login endpoints
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
        partnerName: 'Kiinteistömaailma Helsinki',
        agentName: user.name || '',
        agentKey: '1160ska',
        agentImage: user.picture || '',
        role: 'partner'
      };
      users.push(newUser);
      existingUser = newUser;
    }
    const token = jwt.sign(
      { 
        email: existingUser.email, 
        role: existingUser.role, 
        partnerName: existingUser.partnerName, 
        agentName: existingUser.agentName, 
        agentKey: existingUser.agentKey 
      },
      JWT_SECRET,
      { expiresIn: '4h' }
    );
    res.redirect(`https://kiinteistomaailma.norr3.fi/?token=${token}&service=kiinteistomaailma`);
  } catch (error) {
    console.error('Google login failed:', error);
    res.status(500).send('Google login failed: ' + error.message);
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
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