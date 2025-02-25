const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  try {
    if (!token) return res.status(401).json({ error: 'No token provided' });
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) return res.status(401).json({ error: 'Invalid token' });
      const campaigns = await loadCampaignsFromSheet(decoded.agentKey); // Load from Sheets
      const camp = campaigns.find(c => c.id === req.query.id);
      if (!camp) return res.status(404).json({ error: 'Campaign not found' });
      if (decoded.role === 'partner' && camp.agent_key.toLowerCase() !== decoded.agentKey.toLowerCase()) {
        return res.status(403).json({ error: 'Unauthorized access' });
      }
      camp.status = req.body.status;
      await syncToSheets([camp]); // Sync updated status to Sheets
      res.json(camp);
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update campaign status: ' + error.message });
  }
};

// Reuse loadCampaignsFromSheet and syncToSheets from index.js (could be factored out)