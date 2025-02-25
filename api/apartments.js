const axios = require('axios');

let apartmentsCache = [];

module.exports = async (req, res) => {
  try {
    if (!apartmentsCache.length) {
      const response = await axios.get(process.env.JSON_FEED_URL, { headers: { 'Cache-Control': 'no-cache' } });
      apartmentsCache = response.data;
    }
    const mapped = apartmentsCache.map(apt => ({
      key: apt.key,
      agencyEmail: apt.agencyEmail,
      address: apt.address || 'Unknown Address',
      postcode: apt.postcode || 'Unknown',
      city: apt.city || 'Unknown',
      images: apt.images || [],
      agentEmail: apt.agent && apt.agent.email ? apt.agent.email.toLowerCase().trim() : ""
    }));
    res.json(mapped);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch apartments: ' + err.message });
  }
};