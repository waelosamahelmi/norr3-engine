const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

let users = [
  // Same as above
];

module.exports = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  try {
    if (!token) return res.status(401).json({ error: 'No token provided' });
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
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