import { Loader } from '@googlemaps/js-api-loader';

// Initialize Google Maps API loader with the API key from environment variables
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

// Create a singleton loader instance to avoid multiple loader initialization
export const loader = new Loader({
  apiKey: GOOGLE_MAPS_API_KEY,
  version: 'weekly',
  libraries: ['places', 'geocoding'] // Include all needed libraries upfront
});

export default loader;