const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Supabase client
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  process.env.SUPABASE_URL || "https://wuehzmkhvduybcjwkfaq.supabase.co",
  process.env.SUPABASE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1ZWh6bWtodmR1eWJjandrZmFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1NzYzMDgsImV4cCI6MjA1NjE1MjMwOH0.Xr0kSW_WyZwIIqcqtTFOj_9RuWcxBku7hONDGm1QEd8"
);

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
  - Given an array with one campaign object, calculates per‑day budget,
    formats the campaign data as rows, and appends them to a Google Sheet.
*/
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
    `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/LIVE:append?valueInputOption=RAW`,
    { values: rows },
    { headers: { 'Authorization': `Bearer ${accessToken}` } }
  );
}

/*
  Agent info endpoint
  - Searches the external JSON feed for an apartment whose agent email matches the provided email.
  - Returns the first matching agent info.
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
  - Retrieves the JSON feed and maps apartment fields.
*/
app.get('/api/apartments', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  
  try {
    const response = await axios.get(JSON_FEED_URL, { headers: { 'Cache-Control': 'no-cache' } });
    const mapped = response.data.map(apt => ({
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

/*
  Campaign endpoints using Supabase for persistence.
  Partners can only view their own campaigns.
*/
app.get('/api/campaigns', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    let query = supabase.from('campaigns').select('*');
    if (decoded.role === 'partner') {
      query = query.eq('agent_key', decoded.agentKey);
    }
    const { data, error } = await query;
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
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
    const { data, error } = await supabase
      .from('campaigns')
      .select('*')
      .eq('id', req.params.id)
      .single();
    if (error) return res.status(404).json({ error: 'Campaign not found' });
    if (decoded.role === 'partner' && data.agent_key.toLowerCase() !== decoded.agentKey.toLowerCase()) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }
    res.json(data);
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
    const randomId = String(Math.floor(1000 + Math.random() * 9000));
    // For partners, agent info comes from token; admins can provide agent info in the request body.
    let newCampaign = { ...req.body, id: randomId };
    if (decoded.role === 'partner') {
      newCampaign.agent_name = decoded.agentName || 'Unknown Agent';
      newCampaign.agent_key = decoded.agentKey || 'Unknown';
    }
    const { data, error } = await supabase.from('campaigns').insert(newCampaign).single();
    if (error) return res.status(500).json({ error: error.message });
    await syncToSheets([data]);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create campaign: ' + error.message });
  }
});

app.put('/api/campaigns', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { data, error } = await supabase
      .from('campaigns')
      .update(req.body)
      .eq('id', req.body.id)
      .single();
    if (error) return res.status(404).json({ error: 'Campaign not found or update failed' });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update campaign: ' + error.message });
  }
});

app.patch('/api/campaigns/status/:id', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // Fetch campaign first to ensure partner owns it
    const { data: campaign, error: fetchError } = await supabase
      .from('campaigns')
      .select('*')
      .eq('id', req.params.id)
      .single();
    if (fetchError || !campaign) return res.status(404).json({ error: 'Campaign not found' });
    if (decoded.role === 'partner' && campaign.agent_key.toLowerCase() !== decoded.agentKey.toLowerCase()) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }
    const { data, error } = await supabase
      .from('campaigns')
      .update({ status: req.body.status })
      .eq('id', req.params.id)
      .single();
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update campaign status: ' + error.message });
  }
});

app.post('/api/sheets/update', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { data: campaign, error } = await supabase
      .from('campaigns')
      .select('*')
      .eq('id', req.body.campaignId)
      .single();
    if (error || !campaign) return res.status(404).json({ error: 'Campaign not found' });
    await syncToSheets([campaign]);
    res.json({ message: 'Campaign synced to Google Sheets' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to sync to Google Sheets: ' + error.message });
  }
});

// Updated login endpoint using Supabase for user data
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const { data: users, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error || !users) {
    return res.status(401).json({ error: 'Wrong email or password, please try again.' });
  }

  if (!bcrypt.compareSync(password, users.password)) {
    return res.status(401).json({ error: 'Wrong email or password, please try again.' });
  }

  const token = jwt.sign(
    { 
      email: users.email, 
      role: users.role, 
      partnerName: users.partner_name, 
      agentName: users.agent_name, 
      agentKey: users.agent_key 
    },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ 
    token, 
    role: users.role, 
    partnerName: users.partner_name, 
    email: users.email,
    agentName: users.agent_name,
    agentKey: users.agent_key
  });
});

// New endpoint for Supabase-based agent autofill
app.post('/api/users/autofill', async (req, res) => {
  const { email } = req.body;
  try {
    const response = await axios.get(JSON_FEED_URL, {
      headers: { 'Cache-Control': 'no-cache' }
    });
    const listings = response.data;
    // Search for an agent with matching email
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

// Google login endpoints – these are kept similar but may be updated later to use Supabase Auth
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
    // Check Supabase for the user; if not exists, insert a new user with default values.
    let { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('email', user.email)
      .single();
    if (!existingUser) {
      const newUser = {
        email: user.email,
        password: bcrypt.hashSync('defaultPassword123', 10),
        role: 'partner',
        partnerName: 'Kiinteistömaailma Helsinki',
        agentName: '',
        agentKey: '1160ska', // default agentKey
        agentImage: ''
      };
      const { data, error } = await supabase.from('users').insert(newUser).single();
      if (error) throw new Error(error.message);
      existingUser = data;
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
    res.status(500).send('Google login failed: ' + error.message);
  }
});

// User management endpoints using Supabase
app.post('/api/users', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'admin') return res.status(401).json({ error: 'Admin access required' });
    const newUser = { ...req.body, password: bcrypt.hashSync(req.body.password, 10), role: 'partner' };
    const { data, error } = await supabase.from('users').insert(newUser).single();
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
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
    const { data, error } = await supabase.from('users').delete().eq('email', req.params.email);
    if (error) return res.status(500).json({ error: error.message });
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
    let updateData = { ...req.body };
    if (req.body.password) {
      updateData.password = bcrypt.hashSync(req.body.password, 10);
    }
    const { data, error } = await supabase.from('users').update(updateData).eq('email', req.params.email).single();
    if (error) return res.status(404).json({ error: 'User not found or update failed' });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to edit user: ' + error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
