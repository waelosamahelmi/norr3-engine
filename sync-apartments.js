const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://your-supabase-project-id.supabase.co';
const SUPABASE_KEY = 'your-supabase-anon-key';
const JSON_FEED_URL = 'https://vilpas.kiinteistomaailma.fi/export/km/listings/baseline.json';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function syncApartments() {
  try {
    const response = await axios.get(JSON_FEED_URL);
    const apartments = response.data.map(apt => ({
      key: apt.key,
      agency_email: apt.agencyEmail,
      address: apt.address || 'Unknown Address',
      postcode: apt.postcode || 'Unknown',
      city: apt.city || 'Unknown',
      images: { images: apt.images || [] }, // Wrap in { images: ... } for JSONB
      agent_key: apt.agent ? apt.agent.key : null
    }));

    for (const apt of apartments) {
      // Check if agent_key exists in users table
      if (apt.agent_key) {
        const { data: user, error: userError } = await supabase
          .from('users')
          .select('agent_key')
          .eq('agent_key', apt.agent_key)
          .single();
        if (userError || !user) {
          console.warn(`Agent key ${apt.agent_key} not found in users table. Skipping apartment ${apt.key}.`);
          continue; // Skip this apartment if agent_key doesn’t exist
        }
      }
      // Insert or update the apartment
      const { error } = await supabase.from('apartments').upsert(apt, { onConflict: 'key' });
      if (error) throw error;
    }
    console.log('Apartments synced successfully!');
  } catch (error) {
    console.error('Error syncing apartments:', error);
  }
}

syncApartments();