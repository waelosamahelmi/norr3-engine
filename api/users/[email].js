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
  const { email } = req.query;
  try {
    if (!token) return res.status(401).json({ error: 'No token provided' });
    jwt.verify(token, 'fda64fada1aa314e2167197ae36b9e2bfb12229ab8b6a604995d5b77a21df609', (err, decoded) => {
      if (err || decoded.role !== 'admin') return res.status(401).json({ error: 'Admin access required' });
      const index = users.findIndex(u => u.email === email);
      if (index === -1) return res.status(404).json({ error: 'User not found' });
      if (req.method === 'PUT') {
        users[index] = { ...users[index], ...req.body };
        if (req.body.password) users[index].password = bcrypt.hashSync(req.body.password, 10);
        res.json(users[index]);
      } else if (req.method === 'DELETE') {
        users = users.filter(u => u.email !== email);
        res.json({ message: 'User removed successfully' });
      } else {
        res.status(405).json({ error: 'Method not allowed' });
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process user: ' + error.message });
  }
};