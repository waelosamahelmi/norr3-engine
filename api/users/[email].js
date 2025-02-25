const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

let users = [
  // Same as above
];

module.exports = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  const { email } = req.query;
  try {
    if (!token) return res.status(401).json({ error: 'No token provided' });
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
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