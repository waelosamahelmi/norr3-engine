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
  const { code } = req.query;
  try {
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
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
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.redirect(`${process.env.GOOGLE_REDIRECT_URI}?token=${token}&service=kiinteistomaailma`);
  } catch (error) {
    res.status(500).json({ error: 'Google login failed: ' + error.message });
  }
};