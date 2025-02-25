const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = [
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
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all for speed
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Wrong email or password' });
  }
  const token = jwt.sign(
    { email: user.email, role: user.role, partnerName: user.partnerName, agentName: user.agentName, agentKey: user.agentKey },
    'fda64fada1aa314e2167197ae36b9e2bfb12229ab8b6a604995d5b77a21df609', // Hardcoded JWT_SECRET
    { expiresIn: '1h' }
  );
  res.json({ token, role: user.role, partnerName: user.partnerName, email: user.email, agentName: user.agentName, agentKey: user.agentKey });
};