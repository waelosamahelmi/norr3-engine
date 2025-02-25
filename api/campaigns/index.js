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

  const token = req.headers.authorization?.split(' ')[1];
  try {
    if (!token) return res.status(401).json({ error: 'No token provided' });
    jwt.verify(token, 'fda64fada1aa314e2167197ae36b9e2bfb12229ab8b6a604995d5b77a21df609', async (err, decoded) => {
      if (err || decoded.role !== 'admin') return res.status(401).json({ error: 'Admin access required' });
      if (req.method === 'GET') {
        res.json(users);
      } else if (req.method === 'POST') {
        const user = {
          ...req.body,
          password: bcrypt.hashSync(req.body.password, 10),
          role: 'partner'
        };
        users.push(user);
        res.json(user);
      } else {
        res.status(405).json({ error: 'Method not allowed' });
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process users: ' + error.message });
  }
};