const axios = require('axios');

let apartmentsCache = [];

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  try {
    if (!apartmentsCache.length) {
      const response = await axios.get('https://vilpas.kiinteistomaailma.fi/export/km/listings/baseline.json', {
        headers: { 'Cache-Control': 'no-cache' }
      });
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