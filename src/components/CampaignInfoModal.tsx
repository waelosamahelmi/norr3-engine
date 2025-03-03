import { Campaign, CampaignApartment, Apartment } from '../types';
import { X, ExternalLink, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { useEffect, useRef } from 'react';
import { initializeMap, addMarker, addRadiusCircle } from '../lib/maps';

interface CampaignInfoModalProps {
  campaign: Campaign;
  onClose: () => void;
  apartments: Apartment[];
  campaignApartments: CampaignApartment[];
}

const CampaignInfoModal = ({ 
  campaign, 
  onClose, 
  apartments, 
  campaignApartments 
}: CampaignInfoModalProps) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  
  // Get apartment details for this campaign
  const campaignApts = campaignApartments.map(ca => {
    const apt = apartments.find(a => a.key === ca.apartment_key);
    return {
      key: ca.apartment_key,
      address: apt?.address || 'Unknown',
      postcode: apt?.postcode || '',
      city: apt?.city || '',
      images: apt?.images || [],
      active: ca.active,
      coordinates: apt?.coordinates,
    };
  });
  
  // Calculate total budget
  const totalBudget = (
    campaign.budget_meta + 
    campaign.budget_display + 
    campaign.budget_pdooh
  ).toFixed(2);
  
  // Format dates (MM/YYYY)
  const startDate = campaign.campaign_start_date;
  const endDate = campaign.campaign_end_date || 'Ongoing';
  
  // Initialize map when component mounts
  useEffect(() => {
    if (!mapContainerRef.current || !campaign.campaign_coordinates) return;
    
    const initMap = async () => {
      try {
        if (campaign.campaign_coordinates && 
            campaign.campaign_coordinates.lat !== 0 && 
            campaign.campaign_coordinates.lng !== 0) {
          
          const map = await initializeMap(
            'campaign-map',
            campaign.campaign_coordinates,
            13
          );
          
          mapRef.current = map;
          
          // Add marker for campaign location
          await addMarker(
            map,
            campaign.campaign_coordinates,
            campaign.campaign_address
          );
          
          // Add circle for campaign radius
          await addRadiusCircle(
            map,
            campaign.campaign_coordinates,
            campaign.campaign_radius
          );
          
          // Add markers for apartments if they have coordinates
          for (const apt of campaignApts) {
            if (apt.coordinates && apt.coordinates.lat !== 0 && apt.coordinates.lng !== 0) {
              await addMarker(
                map,
                apt.coordinates,
                apt.address
              );
            }
          }
        }
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };
    
    initMap();
  }, [campaign, campaignApts]);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Campaign Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 max-h-[calc(90vh-130px)] overflow-y-auto">
          {/* Left Column: Campaign Details */}
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Campaign Information</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Campaign ID</p>
                  <p className="text-base text-gray-800">{campaign.id}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Partner</p>
                  <p className="text-base text-gray-800">{campaign.partner_name}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Agent</p>
                  <p className="text-base text-gray-800">{campaign.agent}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Agent Key</p>
                  <p className="text-base text-gray-800">{campaign.agent_key}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <p className={`text-base ${campaign.active ? 'text-green-600' : 'text-red-600'}`}>
                    {campaign.active ? 'Active' : 'Paused'}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Campaign Period</p>
                  <p className="text-base text-gray-800">{startDate} to {endDate}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Campaign Location</p>
                  {campaign.formatted_address ? (
                    <p className="text-base text-gray-800">{campaign.formatted_address}</p>
                  ) : (
                    <p className="text-base text-gray-800">
                      {campaign.campaign_address}, {campaign.campaign_postal_code} {campaign.campaign_city}
                    </p>
                  )}
                  <p className="text-sm text-gray-600">Radius: {campaign.campaign_radius} meters</p>
                  
                  {campaign.campaign_coordinates && 
                   campaign.campaign_coordinates.lat !== 0 && 
                   campaign.campaign_coordinates.lng !== 0 && (
                    <div className="flex items-center mt-1">
                      <MapPin size={14} className="text-gray-500 mr-1" />
                      <p className="text-xs text-gray-500">
                        Coordinates: {campaign.campaign_coordinates.lat.toFixed(6)}, {campaign.campaign_coordinates.lng.toFixed(6)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">Budget Information</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {campaign.channel_meta ? (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-blue-800">Meta</p>
                      <p className="text-xl font-semibold text-blue-900">€{campaign.budget_meta.toFixed(2)}</p>
                      <p className="text-xs text-blue-700">€{campaign.budget_meta_daily.toFixed(2)} daily</p>
                    </div>
                  ) : null}
                  
                  {campaign.channel_display ? (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-green-800">Display</p>
                      <p className="text-xl font-semibold text-green-900">€{campaign.budget_display.toFixed(2)}</p>
                      <p className="text-xs text-green-700">€{campaign.budget_display_daily.toFixed(2)} daily</p>
                    </div>
                  ) : null}
                  
                  {campaign.channel_pdooh ? (
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-purple-800">PDOOH</p>
                      <p className="text-xl font-semibold text-purple-900">€{campaign.budget_pdooh.toFixed(2)}</p>
                      <p className="text-xs text-purple-700">€{campaign.budget_pdooh_daily.toFixed(2)} daily</p>
                    </div>
                  ) : null}
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-700">Total Budget</p>
                  <p className="text-xl font-semibold text-gray-900">€{totalBudget}</p>
                </div>
              </div>
            </div>
            
            {/* Map */}
            {campaign.campaign_coordinates && 
             campaign.campaign_coordinates.lat !== 0 && 
             campaign.campaign_coordinates.lng !== 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Campaign Location</h3>
                <div 
                  id="campaign-map" 
                  ref={mapContainerRef}
                  className="w-full h-64 rounded-lg border border-gray-200"
                ></div>
              </div>
            )}
          </div>
          
          {/* Right Column: Apartments */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Included Apartments ({campaignApts.length})
            </h3>
            
            <div className="border rounded-md overflow-hidden">
              {campaignApts.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  No apartments included in this campaign.
                </div>
              ) : (
                <div className="max-h-[calc(90vh-250px)] overflow-y-auto">
                  {campaignApts.map((apt) => (
                    <div 
                      key={apt.key}
                      className={`flex items-start p-4 border-b last:border-b-0 ${
                        apt.active ? '' : 'bg-gray-50 opacity-75'
                      }`}
                    >
                      {apt.images && apt.images.length > 0 ? (
                        <img 
                          src={apt.images[0].url} 
                          alt={apt.address}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                          <span className="text-gray-400 text-xs">No image</span>
                        </div>
                      )}
                      
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-800">{apt.address}</p>
                            <p className="text-xs text-gray-500">{apt.postcode} {apt.city}</p>
                            <p className="text-xs text-gray-400">Key: {apt.key}</p>
                            
                            {apt.coordinates && apt.coordinates.lat !== 0 && apt.coordinates.lng !== 0 && (
                              <div className="flex items-center mt-1">
                                <MapPin size={12} className="text-gray-400 mr-1" />
                                <p className="text-xs text-gray-400">
                                  {apt.coordinates.lat.toFixed(6)}, {apt.coordinates.lng.toFixed(6)}
                                </p>
                              </div>
                            )}
                          </div>
                          
                          <div>
                            <a
                              href={`https://www.kiinteistomaailma.fi/${apt.key}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-purple-600 hover:text-purple-800"
                            >
                              <ExternalLink size={18} />
                            </a>
                          </div>
                        </div>
                        
                        <div className="mt-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            apt.active 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {apt.active ? 'Active' : 'Paused'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end p-6 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignInfoModal;