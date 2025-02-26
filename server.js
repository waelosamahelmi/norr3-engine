const express = require('express');
const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors()); // Allow all origins for speed (no security)
app.use(bodyParser.json());
app.use(express.static('public'));

// Hardcode environment variables (replace with Supabase credentials later)
const SUPABASE_URL = 'https://wuehzmkhvduybcjwkfaq.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1ZWh6bWtodmR1eWJjandrZmFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1NzYzMDgsImV4cCI6MjA1NjE1MjMwOH0.Xr0kSW_WyZwIIqcqtTFOj_9RuWcxBku7hONDGm1QEd8';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const GOOGLE_SHEET_ID = '1ncxlcx8f8BfhHeT9ph1sb0HqencDOnkwCMeoYg9e3tk';
const GOOGLE_CLIENT_ID = '510608755501-ucl194dpbraertmqp8188bb7muh1b5oh.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
const GOOGLE_REFRESH_TOKEN = '1//04hKsI6kHczRqCgYIARAAGAQSNwF-L9IrDHN4iJWBcImylm9fFCx8IXWHgQMln-HkTTCL_k7XbzI578mhEAXlqMIFA3HV8i0Ghao';
const JSON_FEED_URL = 'https://vilpas.kiinteistomaailma.fi/export/km/listings/baseline.json';
const GOOGLE_REDIRECT_URI = 'https://kiinteistomaailma.norr3.fi/auth/google-callback';

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
      campaign.status ? '1' : '0'
    ]);
  });
  await axios.post(
    `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/LIVE:append?valueInputOption=RAW`,
    { values: rows },
    { headers: { 'Authorization': `Bearer ${accessToken}` } }
  );
}

async function fetchApartmentsFromJson() {
  if (!apartmentsCache.length) {
    const response = await axios.get(JSON_FEED_URL, {
      headers: { 'Cache-Control': 'no-cache' }
    });
    apartmentsCache = response.data;
  }
  return apartmentsCache.map(apt => ({
    key: apt.key,
    agencyEmail: apt.agencyEmail,
    address: apt.address || 'Unknown Address',
    postcode: apt.postcode || 'Unknown',
    city: apt.city || 'Unknown',
    images: apt.images || [],
    agent: apt.agent || {}
  }));
}

app.get('/api/apartments', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  
  try {
    const apartments = await fetchApartmentsFromJson();
    res.json(apartments);
  } catch (err) {
    console.error('Error in /api/apartments:', err);
    res.status(500).json({ error: 'Failed to fetch apartments: ' + err.message });
  }
});

app.get('/api/campaigns', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  const session = await supabase.auth.getSession();
  if (!session.data.session) return res.status(401).json({ error: 'No session provided' });
  try {
    let campaignsData;
    if (session.data.session.user.role === 'admin') {
      const { data, error } = await supabase.from('campaigns').select('*');
      if (error) throw new Error(error.message);
      campaignsData = data;
    } else {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('agent_key', session.data.session.user.user_metadata.agentKey);
      if (error) throw new Error(error.message);
      campaignsData = data;
    }
    res.json(campaignsData);
  } catch (error) {
    console.error('Error in GET /api/campaigns:', error);
    res.status(500).json({ error: 'Failed to fetch campaigns: ' + error.message });
  }
});

app.get('/api/campaigns/:id', async (req, res) => {
  const session = await supabase.auth.getSession();
  if (!session.data.session) return res.status(401).json({ error: 'No session provided' });
  try {
    const { data, error } = await supabase
      .from('campaigns')
      .select('*')
      .eq('id', req.params.id)
      .single();
    if (error) throw new Error(error.message);
    if (!data) return res.status(404).json({ error: 'Campaign not found' });
    if (session.data.session.user.role === 'partner' && data.agent_key.toLowerCase() !== session.data.session.user.user_metadata.agentKey.toLowerCase()) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch campaign: ' + error.message });
  }
});

app.post('/api/campaigns', async (req, res) => {
  const session = await supabase.auth.getSession();
  if (!session.data.session) return res.status(401).json({ error: 'No session provided' });
  try {
    const randomId = String(Math.floor(1000 + Math.random() * 9000));
    const newCampaign = {
      ...req.body,
      id: randomId,
      agent_name: session.data.session.user.user_metadata.agentName || 'Unknown Agent',
      agent_key: session.data.session.user.user_metadata.agentKey || 'Unknown',
      status: true // Default to active
    };
    const { data, error } = await supabase.from('campaigns').insert([newCampaign]).select().single();
    if (error) throw new Error(error.message);
    await syncToSheets([newCampaign]); // Sync to Google Sheets
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create campaign: ' + error.message });
  }
});

app.put('/api/campaigns', async (req, res) => {
  const session = await supabase.auth.getSession();
  if (!session.data.session) return res.status(401).json({ error: 'No session provided' });
  try {
    const { data, error } = await supabase
      .from('campaigns')
      .update(req.body)
      .eq('id', req.body.id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    if (!data) return res.status(404).json({ error: 'Campaign not found' });
    if (session.data.session.user.role === 'partner' && data.agent_key.toLowerCase() !== session.data.session.user.user_metadata.agentKey.toLowerCase()) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }
    await syncToSheets([data]); // Sync to Google Sheets
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update campaign: ' + error.message });
  }
});

app.patch('/api/campaigns/status/:id', async (req, res) => {
  const session = await supabase.auth.getSession();
  if (!session.data.session) return res.status(401).json({ error: 'No session provided' });
  try {
    const { data, error } = await supabase
      .from('campaigns')
      .update({ status: req.body.status ? 1 : 0 })
      .eq('id', req.params.id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    if (!data) return res.status(404).json({ error: 'Campaign not found' });
    if (session.data.session.user.role === 'partner' && data.agent_key.toLowerCase() !== session.data.session.user.user_metadata.agentKey.toLowerCase()) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }
    await syncToSheets([data]); // Sync to Google Sheets
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update campaign status: ' + error.message });
  }
});

app.get('/api/apartments/by-agent/:agentKey', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  
  try {
    const apartments = await fetchApartmentsFromJson();
    const filteredApartments = apartments.filter(apt => 
      apt.agent && apt.agent.key.toLowerCase() === req.params.agentKey.toLowerCase()
    );
    res.json(filteredApartments);
  } catch (err) {
    console.error('Error in /api/apartments/by-agent:', err);
    res.status(500).json({ error: 'Failed to fetch apartments: ' + err.message });
  }
});

app.get('/api/agents/autofill', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  
  const email = req.query.email;
  if (!email) return res.status(400).json({ error: 'Email is required' });
  
  try {
    const apartments = await fetchApartmentsFromJson();
    const apartment = apartments.find(apt => 
      apt.agent && apt.agent.email.toLowerCase() === email.toLowerCase()
    );
    if (!apartment || !apartment.agent) {
      return res.status(404).json({ error: 'Agent not found in apartment listings' });
    }
    const agent = apartment.agent;
    res.json({
      email: agent.email,
      agentName: agent.name,
      agentKey: agent.key,
      phone: agent.phone,
      agency: agent.agency,
      pictureUrl: agent.pictureUrl,
      degrees: agent.degrees,
      title: agent.title
    });
  } catch (err) {
    console.error('Error in /api/agents/autofill:', err);
    res.status(500).json({ error: 'Failed to fetch agent info: ' + err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return res.status(401).json({ error: 'Wrong email or password, please try again.' });
  }
  res.json({
    session: data.session,
    role: data.user.user_metadata.role || 'partner',
    partnerName: data.user.user_metadata.partnerName || 'Kiinteistömaailma Helsinki',
    email: data.user.email,
    agentName: data.user.user_metadata.agentName || '',
    agentKey: data.user.user_metadata.agentKey || ''
  });
});

app.get('/auth/google-login', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.redirect(supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: GOOGLE_REDIRECT_URI
    }
  }).url);
});

app.get('/auth/google-callback', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  const code = req.query.code;
  try {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) throw new Error(error.message);
    const session = data.session;
    let user = await supabase
      .from('users')
      .select('*')
      .eq('email', session.user.email)
      .single();
    if (!user.data) {
      // Create new admin user for Google login
      const { data: newUser, error: insertError } = await supabase.from('users').insert([{
        email: session.user.email,
        password: bcrypt.hashSync('defaultPassword123', 10), // Optional, can remove if not needed
        role: 'admin',
        partner_name: 'NØRR3',
        agent_name: session.user.name || '',
        agent_key: '', // Can be auto-filled later via autofill
        agent_image: '' // Can be auto-filled from Google profile or JSON feed
      }]).select().single();
      if (insertError) throw new Error(insertError.message);
      user.data = newUser;
    }
    res.redirect(`https://kiinteistomaailma.norr3.fi/?session=${encodeURIComponent(JSON.stringify(session))}&role=admin&partnerName=NØRR3`);
  } catch (error) {
    res.status(500).send('Google login failed: ' + error.message);
  }
});

app.post('/api/users', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  const session = await supabase.auth.getSession();
  if (!session.data.session || session.data.session.user.role !== 'admin') {
    return res.status(401).json({ error: 'Admin access required' });
  }
  try {
    const user = { 
      ...req.body, 
      password: req.body.password ? bcrypt.hashSync(req.body.password, 10) : null, 
      role: req.body.role || 'partner' 
    };
    const { data, error } = await supabase.from('users').insert([user]).select().single();
    if (error) throw new Error(error.message);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add user: ' + error.message });
  }
});

app.delete('/api/users/:email', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  const session = await supabase.auth.getSession();
  if (!session.data.session || session.data.session.user.role !== 'admin') {
    return res.status(401).json({ error: 'Admin access required' });
  }
  try {
    const { error } = await supabase.from('users').delete().eq('email', req.params.email);
    if (error) throw new Error(error.message);
    res.json({ message: 'User removed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove user: ' + error.message });
  }
});

app.put('/api/users/:email', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  const session = await supabase.auth.getSession();
  if (!session.data.session || session.data.session.user.role !== 'admin') {
    return res.status(401).json({ error: 'Admin access required' });
  }
  try {
    const user = { ...req.body };
    if (req.body.password) {
      user.password = bcrypt.hashSync(req.body.password, 10);
    }
    const { data, error } = await supabase
      .from('users')
      .update(user)
      .eq('email', req.params.email)
      .select()
      .single();
    if (error) throw new Error(error.message);
    if (!data) return res.status(404).json({ error: 'User not found' });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to edit user: ' + error.message });
  }
});

app.get('/api/users', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  const session = await supabase.auth.getSession();
  if (!session.data.session || session.data.session.user.role !== 'admin') {
    return res.status(401).json({ error: 'Admin access required' });
  }
  try {
    const { data, error } = await supabase.from('users').select('*');
    if (error) throw new Error(error.message);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users: ' + error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app; // Export for Vercel