import { useState, useEffect, useRef } from 'react';
import { loader } from '../lib/googleMapsLoader';

interface AddressAutocompleteProps {
  onAddressSelect: (address: {
    formattedAddress: string;
    streetAddress: string;
    postalCode: string;
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  }) => void;
  initialAddress?: string;
  initialPostalCode?: string;
  initialCity?: string;
  className?: string;
  placeholder?: string;
}

const AddressAutocomplete = ({
  onAddressSelect,
  initialAddress = '',
  initialPostalCode = '',
  initialCity = '',
  className = '',
  placeholder = 'Enter address'
}: AddressAutocompleteProps) => {
  const [inputValue, setInputValue] = useState(initialAddress);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  
  useEffect(() => {
    loader.load()
      .then(() => {
        setIsLoaded(true);
        setError(null);
      })
      .catch(err => {
        console.error('Error loading Google Maps API:', err);
        setError('Failed to load Google Maps API. Using manual input mode.');
        // Still allow manual input even if API fails
        setIsLoaded(true);
      });
  }, []);
  
  useEffect(() => {
    if (!isLoaded || !inputRef.current) return;
    
    try {
      // Initialize Google Places Autocomplete
      autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
        types: ['address'],
        fields: ['address_components', 'formatted_address', 'geometry']
      });
      
      // Add listener for place selection
      autocompleteRef.current.addListener('place_changed', () => {
        const place = autocompleteRef.current?.getPlace();
        
        if (!place || !place.address_components) {
          console.error('Invalid place selected');
          
          // Fallback to manual input
          handleManualAddressInput();
          return;
        }
        
        // Extract address components
        let streetNumber = '';
        let route = '';
        let postalCode = '';
        let city = '';
        
        place.address_components.forEach(component => {
          const types = component.types;
          
          if (types.includes('street_number')) {
            streetNumber = component.long_name;
          } else if (types.includes('route')) {
            route = component.long_name;
          } else if (types.includes('postal_code')) {
            postalCode = component.long_name;
          } else if (types.includes('locality') || types.includes('postal_town')) {
            city = component.long_name;
          }
        });
        
        const streetAddress = streetNumber ? `${route} ${streetNumber}` : route;
        
        // Use place geometry if available, otherwise generate mock coordinates
        const coordinates = place.geometry?.location ? {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        } : generateMockCoordinates(streetAddress, postalCode, city);
        
        onAddressSelect({
          formattedAddress: place.formatted_address || `${streetAddress}, ${postalCode} ${city}`,
          streetAddress,
          postalCode,
          city,
          coordinates
        });
      });
    } catch (err) {
      console.error('Error initializing autocomplete:', err);
      setError('Failed to initialize address autocomplete. Using manual input mode.');
    }
  }, [isLoaded, onAddressSelect]);
  
  // Update input value when initialAddress changes
  useEffect(() => {
    if (initialAddress) {
      setInputValue(initialAddress);
    }
  }, [initialAddress]);
  
  // Handle manual address input when API fails
  const handleManualAddressInput = () => {
    // Parse the input value to extract address components
    const addressParts = inputValue.split(',').map(part => part.trim());
    
    let streetAddress = addressParts[0] || initialAddress || '';
    let postalCode = '';
    let city = '';
    
    // Try to extract postal code and city from the second part
    if (addressParts.length > 1) {
      const secondPart = addressParts[1];
      const postalMatch = secondPart.match(/\d{5}/);
      
      if (postalMatch) {
        postalCode = postalMatch[0];
        city = secondPart.replace(postalCode, '').trim();
      } else {
        city = secondPart;
      }
    }
    
    // Use initial values as fallbacks
    postalCode = postalCode || initialPostalCode || '';
    city = city || initialCity || '';
    
    // Generate mock coordinates
    const coordinates = generateMockCoordinates(streetAddress, postalCode, city);
    
    onAddressSelect({
      formattedAddress: `${streetAddress}, ${postalCode} ${city}`,
      streetAddress,
      postalCode,
      city,
      coordinates
    });
  };
  
  // Generate deterministic mock coordinates based on address
  const generateMockCoordinates = (
    streetAddress: string,
    postalCode: string,
    city: string
  ) => {
    // Simple hash function to generate deterministic coordinates
    const hash = (str: string) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash = hash & hash; // Convert to 32bit integer
      }
      return Math.abs(hash);
    };
    
    const addressHash = hash(`${streetAddress}${postalCode}${city}`);
    
    // Helsinki coordinates as base
    const lat = 60.1699 + (addressHash % 100) / 1000;
    const lng = 24.9384 + (addressHash % 100) / 1000;
    
    return { lat, lng };
  };
  
  // Handle manual form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleManualAddressInput();
  };
  
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${className}`}
          disabled={!isLoaded}
        />
        {error && (
          <p className="mt-1 text-xs text-amber-500">{error}</p>
        )}
        {!isLoaded && !error && (
          <p className="mt-1 text-xs text-gray-500">Loading address autocomplete...</p>
        )}
        {!autocompleteRef.current && isLoaded && (
          <button 
            type="submit" 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
          >
            Validate
          </button>
        )}
      </div>
    </form>
  );
};

export default AddressAutocomplete;