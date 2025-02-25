const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  const token = req.headers.authorization?.split(' ')[1];
  try {
    if (!token) return res.status(401).json({ error: 'No token provided' });
    jwt.verify(token, 'fda64fada1aa314e2167197ae36b9e2bfb12229ab8b6a604995d5b77a21df609', async (err, decoded) => {
      if (err) return res.status(401).json({ error: 'Invalid token' });
      const campaigns = await loadCampaignsFromSheet(decoded.agentKey);
      const campaign = campaigns.find(c => c.id === req.body.campaignId);
      if (!campaign) return res.status(404).json({ error: 'Campaign not found' });
      await syncToSheets([campaign]); // Keep Sheets sync
      res.json({ message: 'Campaign synced to Google Sheets' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to sync to Google Sheets: ' + error.message });
  }
};