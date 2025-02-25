const axios = require('axios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  const { code } = req.query;
  try {
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: '510608755501-ucl194dpbraertmqp8188bb7muh1b5oh.apps.googleusercontent.com',
      client_secret: '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',
      redirect_uri: 'https://kiinteistomaailma.norr3.fi/api/auth/google-callback',
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
    const token = jwt.sign(
      { email: user.email, role: 'partner', partnerName: 'Kiinteistömaailma Helsinki' },
      'fda64fada1aa314e2167197ae36b9e2bfb12229ab8b6a604995d5b77a21df609',
      { expiresIn: '1h' }
    );
    res.redirect(`https://kiinteistomaailma.norr3.fi/?token=${token}&service=kiinteistomaailma`);
  } catch (error) {
    res.status(500).json({ error: 'Google login failed: ' + error.message });
  }
};