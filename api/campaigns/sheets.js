const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  try {
    if (!token) return res.status(401).json({ error: 'No token provided' });
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) return res.status(401).json({ error: 'Invalid token' });
      const campaigns = await loadCampaignsFromSheet(decoded.agentKey);
      const campaign = campaigns.find(c => c.id === req.body.campaignId);
      if (!campaign) return res.status(404).json({ error: 'Campaign not found' });
      await syncToSheets([campaign]);
      res.json({ message: 'Campaign synced to Google Sheets' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to sync to Google Sheets: ' + error.message });
  }
};