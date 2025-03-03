import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { Campaign, CampaignApartment, Apartment, User } from '../types';
import { X, Search, Info, ExternalLink, Eye, EyeOff, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';
import { format, parse } from 'date-fns';
import { addCampaignToSheet, updateCampaignInSheet } from '../lib/googleSheets';
import { geocodeAddress } from '../lib/maps';
import AddressAutocomplete from './AddressAutocomplete';
import { initializeMap, addMarker, addRadiusCircle } from '../lib/maps';

interface CampaignModalProps {
  campaign: Campaign | null;
  onClose: () => void;
  onSave: () => void;
  apartments: Apartment[];
  campaignApartments: CampaignApartment[];
}

const CampaignModal = ({ 
  campaign, 
  onClose, 
  onSave, 
  apartments, 
  campaignApartments 
}: CampaignModalProps) => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [selectedApartments, setSelectedApartments] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    campaign_start_date: format(new Date(), 'MM/yyyy'),
    campaign_end_date: '',
    ongoing: false,
    campaign_address: '',
    campaign_postal_code: '',
    campaign_city: '',
    campaign_radius: 1500,
    channel_meta: false,
    channel_display: false,
    channel_pdooh: false,
    budget_meta: '', // Changed from 0 to ''
    budget_display: '', // Changed from 0 to ''
    budget_pdooh: '', // Changed from 0 to ''
    formatted_address: '',
    campaign_coordinates: { lat: 0, lng: 0 }
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [addressValidated, setAddressValidated] = useState(false);
  const [validatingAddress, setValidatingAddress] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [showApartmentInfo, setShowApartmentInfo] = useState<string | null>(null);
  const [loadingApartments, setLoadingApartments] = useState(false);
  const [filteredApartments, setFilteredApartments] = useState<Apartment[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string>('kiinteistomaailma');
  const [selectedAgency, setSelectedAgency] = useState<string>('');
  const [agencies, setAgencies] = useState<string[]>([]);
  
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const radiusCircleRef = useRef<google.maps.Circle | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);

  useEffect(() => {
    if (campaign) {
      setFormData({
        campaign_start_date: campaign.campaign_start_date,
        campaign_end_date: campaign.campaign_end_date || '',
        ongoing: !campaign.campaign_end_date,
        campaign_address: campaign.campaign_address,
        campaign_postal_code: campaign.campaign_postal_code,
        campaign_city: campaign.campaign_city,
        campaign_radius: campaign.campaign_radius,
        channel_meta: campaign.channel_meta === 1,
        channel_display: campaign.channel_display === 1,
        channel_pdooh: campaign.channel_pdooh === 1,
        budget_meta: campaign.budget_meta !== 0 ? campaign.budget_meta.toString() : '', // Handle edit mode
        budget_display: campaign.budget_display !== 0 ? campaign.budget_display.toString() : '', // Handle edit mode
        budget_pdooh: campaign.budget_pdooh !== 0 ? campaign.budget_pdooh.toString() : '', // Handle edit mode
        formatted_address: campaign.formatted_address || '',
        campaign_coordinates: campaign.campaign_coordinates || { lat: 0, lng: 0 }
      });
      
      const selectedKeys = campaignApartments
        .filter(ca => ca.campaign_id === campaign.id)
        .map(ca => ca.apartment_key);
      
      setSelectedApartments(selectedKeys);
      
      if (campaign.campaign_coordinates && 
          campaign.campaign_coordinates.lat !== 0 && 
          campaign.campaign_coordinates.lng !== 0) {
        setAddressValidated(true);
      }
    }
    
    checkUserRoleAndLoadAgencies();
  }, [campaign, campaignApartments]);

  useEffect(() => {
    if (addressValidated && 
        formData.campaign_coordinates && 
        formData.campaign_coordinates.lat !== 0 && 
        formData.campaign_coordinates.lng !== 0 && 
        mapContainerRef.current) {
      
      const initMap = async () => {
        try {
          const map = await initializeMap(
            'campaign-location-map',
            formData.campaign_coordinates,
            13
          );
          
          mapRef.current = map;
          
          const marker = await addMarker(
            map,
            formData.campaign_coordinates,
            formData.formatted_address || formData.campaign_address
          );
          
          markerRef.current = marker;
          
          const circle = await addRadiusCircle(
            map,
            formData.campaign_coordinates,
            formData.campaign_radius
          );
          
          radiusCircleRef.current = circle;
        } catch (error) {
          console.error('Error initializing map:', error);
        }
      };
      
      initMap();
    }
  }, [addressValidated, formData.campaign_coordinates, formData.campaign_radius]);

  useEffect(() => {
    if (radiusCircleRef.current) {
      radiusCircleRef.current.setRadius(formData.campaign_radius);
    }
  }, [formData.campaign_radius]);

  useEffect(() => {
    if (apartments.length > 0) {
      const uniqueAgencies = Array.from(
        new Set(apartments.filter(apt => apt.agency).map(apt => apt.agency))
      ).sort();
      
      setAgencies(uniqueAgencies);
    }
  }, [apartments]);

  const checkUserRoleAndLoadAgencies = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error('You must be logged in to perform this action');
        return;
      }
      
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single();
      
      if (userError) {
        console.error('Error fetching user data:', userError);
        toast.error('Failed to load user data');
        return;
      }
      
      if (userData) {
        setIsAdmin(userData.role === 'admin');
        setCurrentUserEmail(userData.email);
        
        if (userData.role !== 'admin') {
          setFilteredApartments(apartments.filter(
            apt => apt.agentEmail && apt.agentEmail.toLowerCase() === userData.email.toLowerCase()
          ));
        }
      }
    } catch (error) {
      console.error('Error checking user role:', error);
      toast.error('Failed to load user data');
    }
  };

  const handleLoadApartments = async () => {
    if (!selectedAgency && isAdmin) {
      toast.error('Please select an agency first');
      return;
    }
    
    try {
      setLoadingApartments(true);
      
      let agencyApartments = apartments;
      
      if (selectedCompany === 'kiinteistomaailma') {
        if (isAdmin && selectedAgency) {
          agencyApartments = apartments.filter(apt => apt.agency === selectedAgency);
        } else if (!isAdmin) {
          agencyApartments = apartments.filter(
            apt => apt.agentEmail && apt.agentEmail.toLowerCase() === currentUserEmail.toLowerCase()
          );
        }
      }
      
      setFilteredApartments(agencyApartments);
      
      if (agencyApartments.length === 0) {
        toast.warning('No apartments found for the selected agency');
      } else {
        toast.success(`Found ${agencyApartments.length} apartments`);
      }
    } catch (error) {
      console.error('Error loading apartments:', error);
      toast.error('Failed to load apartments');
    } finally {
      setLoadingApartments(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: value === '' ? '' : parseFloat(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    if (name === 'campaign_address' || name === 'campaign_postal_code' || name === 'campaign_city') {
      setAddressValidated(false);
      setValidationError(null);
    }
  };

  const handleToggleOngoing = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ongoing = e.target.checked;
    setFormData(prev => ({ 
      ...prev, 
      ongoing,
      campaign_end_date: ongoing ? '' : prev.campaign_end_date
    }));
  };

  const handleToggleChannel = (channel: 'meta' | 'display' | 'pdooh') => {
    const channelKey = `channel_${channel}` as keyof typeof formData;
    const budgetKey = `budget_${channel}` as keyof typeof formData;
    
    setFormData(prev => ({ 
      ...prev, 
      [channelKey]: !prev[channelKey],
      [budgetKey]: !prev[channelKey] ? prev[budgetKey] : ''
    }));
  };

  const handleSelectApartment = async (key: string) => {
    const exists = filteredApartments.some(apt => apt.key === key);
    
    if (!exists) {
      toast.error(`Apartment ${key} is not available for selection`);
      return;
    }
    
    setSelectedApartments(prev => 
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const handleShowApartmentInfo = (key: string) => {
    setShowApartmentInfo(key);
  };

  const handleCloseApartmentInfo = () => {
    setShowApartmentInfo(null);
  };

  const handleAddressSelect = (addressData: {
    formattedAddress: string;
    streetAddress: string;
    postalCode: string;
    city: string;
    coordinates: { lat: number; lng: number };
  }) => {
    setFormData(prev => ({
      ...prev,
      campaign_address: addressData.streetAddress,
      campaign_postal_code: addressData.postalCode,
      campaign_city: addressData.city,
      formatted_address: addressData.formattedAddress,
      campaign_coordinates: addressData.coordinates
    }));
    
    setAddressValidated(true);
    setValidationError(null);
  };

  const validateCampaignAddress = async () => {
    if (!formData.campaign_address) {
      setValidationError('Address is required');
      return false;
    }
    
    setValidatingAddress(true);
    
    try {
      const result = await geocodeAddress(
        formData.campaign_address,
        formData.campaign_postal_code,
        formData.campaign_city
      );
      
      if (result.success) {
        setFormData(prev => ({
          ...prev,
          formatted_address: result.formatted_address,
          campaign_coordinates: result.coordinates
        }));
        
        setAddressValidated(true);
        setValidationError(null);
        return true;
      } else {
        setValidationError(result.error || 'Address could not be validated');
        setAddressValidated(false);
        return false;
      }
    } catch (error) {
      console.error('Error validating address:', error);
      setValidationError(error instanceof Error ? error.message : 'Address validation failed');
      setAddressValidated(false);
      return false;
    } finally {
      setValidatingAddress(false);
    }
  };

  const handleSaveCampaign = async () => {
    try {
      setLoading(true);
      
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error('You must be logged in to perform this action');
        return;
      }
      
      if (!formData.campaign_start_date) {
        toast.error('Start date is required');
        return;
      }
      
      if (!formData.ongoing && !formData.campaign_end_date) {
        toast.error('End date is required for non-ongoing campaigns');
        return;
      }
      
      const dateRegex = /^(0[1-9]|1[0-2])\/\d{4}$/;
      if (!dateRegex.test(formData.campaign_start_date)) {
        toast.error('Start date must be in MM/YYYY format');
        return;
      }
      
      if (!formData.ongoing && formData.campaign_end_date && !dateRegex.test(formData.campaign_end_date)) {
        toast.error('End date must be in MM/YYYY format');
        return;
      }
      
      if (!addressValidated) {
        const isValid = await validateCampaignAddress();
        if (!isValid) {
          toast.error('Please validate the campaign address');
          return;
        }
      }
      
      if (!(formData.channel_meta || formData.channel_display || formData.channel_pdooh)) {
        toast.error('At least one channel must be selected');
        return;
      }
      
      if (selectedApartments.length === 0) {
        toast.error('At least one apartment must be selected');
        return;
      }
      
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single();
      
      if (userError) {
        console.error('Error fetching user data:', userError);
        toast.error('Failed to load user data');
        return;
      }
      
      if (!userData) {
        toast.error('User data not found');
        return;
      }
      
      let agentData = userData;
      let agencyName = '';
      
      if (isAdmin && selectedAgency) {
        const agencyApt = filteredApartments.find(apt => apt.agency === selectedAgency);
        if (agencyApt) {
          agencyName = agencyApt.agency || '';
          agentData = {
            ...userData,
            agent_key: agencyApt.agentKey || `agency-${Date.now()}`,
            partner_name: 'Kiinteistömaailma',
          };
        }
      }
      
      const startDate = parse(formData.campaign_start_date, 'MM/yyyy', new Date());
      const endDate = formData.ongoing ? null : 
        formData.campaign_end_date ? parse(formData.campaign_end_date, 'MM/yyyy', new Date()) : null;
      
      const days = endDate 
        ? Math.max(1, Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)))
        : 30;
      
      const campaignData = {
        partner_id: agentData.partner_name.replace(/\s+/g, '-').toLowerCase(),
        partner_name: agentData.partner_name,
        agent: isAdmin && agencyName ? agencyName : agentData.name,
        agent_key: agentData.agent_key,
        campaign_address: formData.campaign_address,
        campaign_postal_code: formData.campaign_postal_code,
        campaign_city: formData.campaign_city,
        campaign_radius: formData.campaign_radius,
        campaign_start_date: formData.campaign_start_date,
        campaign_end_date: formData.ongoing ? null : formData.campaign_end_date,
        campaign_coordinates: formData.campaign_coordinates,
        formatted_address: formData.formatted_address,
        active: true,
        channel_meta: formData.channel_meta ? 1 : 0,
        channel_display: formData.channel_display ? 1 : 0,
        channel_pdooh: formData.channel_pdooh ? 1 : 0,
        budget_meta: formData.budget_meta === '' ? 0 : parseFloat(formData.budget_meta),
        budget_display: formData.budget_display === '' ? 0 : parseFloat(formData.budget_display),
        budget_pdooh: formData.budget_pdooh === '' ? 0 : parseFloat(formData.budget_pdooh),
        budget_meta_daily: formData.channel_meta && formData.budget_meta !== '' ? parseFloat(formData.budget_meta) / days : 0,
        budget_display_daily: formData.channel_display && formData.budget_display !== '' ? parseFloat(formData.budget_display) / days : 0,
        budget_pdooh_daily: formData.channel_pdooh && formData.budget_pdooh !== '' ? parseFloat(formData.budget_pdooh) / days : 0,
        user_id: agentData.id,
        created_by: userData.email,
      };
      
      let campaignId;
      let newCampaignApartments: CampaignApartment[] = [];
      
      if (campaign) {
        const { error: updateError } = await supabase
          .from('campaigns')
          .update({ ...campaignData, updated_at: new Date().toISOString() })
          .eq('id', campaign.id);
        
        if (updateError) {
          console.error('Error updating campaign:', updateError);
          throw updateError;
        }
        
        campaignId = campaign.id;
        
        await supabase.from('activity_logs').insert({
          user_id: session.user.id,
          user_email: userData.email,
          action: 'update_campaign',
          details: `User updated campaign: ${campaignId}`
        });
      } else {
        const { data: newCampaign, error: insertError } = await supabase
          .from('campaigns')
          .insert({ ...campaignData, created_at: new Date().toISOString(), updated_at: new Date().toISOString() })
          .select()
          .single();
        
        if (insertError) {
          console.error('Error creating campaign:', insertError);
          throw insertError;
        }
        
        if (!newCampaign) {
          throw new Error('Failed to create campaign - no data returned');
        }
        
        campaignId = newCampaign.id;
        
        await supabase.from('activity_logs').insert({
          user_id: session.user.id,
          user_email: userData.email,
          action: 'create_campaign',
          details: `User created campaign: ${campaignId}`
        });
      }
      
      if (campaign) {
        const { error: deleteError } = await supabase
          .from('campaign_apartments')
          .delete()
          .eq('campaign_id', campaignId);
        
        if (deleteError) {
          console.error('Error deleting campaign apartments:', deleteError);
          throw deleteError;
        }
      }
      
      const apartmentInserts = selectedApartments.map(key => ({
        campaign_id: campaignId,
        apartment_key: key,
        active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }));
      
      const { data: insertedApartments, error: insertError } = await supabase
        .from('campaign_apartments')
        .insert(apartmentInserts)
        .select();
      
      if (insertError) {
        console.error('Error inserting campaign apartments:', insertError);
        throw insertError;
      }
      
      if (insertedApartments) {
        newCampaignApartments = insertedApartments as CampaignApartment[];
      }
      
      try {
        const { data: updatedCampaign, error: fetchError } = await supabase
          .from('campaigns')
          .select('*')
          .eq('id', campaignId)
          .single();
        
        if (fetchError) {
          console.error('Error fetching updated campaign:', fetchError);
          throw fetchError;
        }
        
        if (updatedCampaign) {
          if (campaign) {
            await updateCampaignInSheet(updatedCampaign as Campaign, newCampaignApartments, apartments);
          } else {
            await addCampaignToSheet(updatedCampaign as Campaign, newCampaignApartments, apartments);
          }
        }
      } catch (sheetError) {
        console.error('Error syncing to Google Sheets:', sheetError);
        toast.error('Campaign saved but failed to sync with Google Sheets');
      }
      
      onSave();
    } catch (error) {
      console.error('Error saving campaign:', error);
      toast.error('Failed to save campaign');
    } finally {
      setLoading(false);
    }
  };

  const searchedApartments = filteredApartments.filter(apt => {
    const matchesSearch = 
      (apt.address && apt.address.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (apt.key && apt.key.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCity = 
      !cityFilter || 
      (apt.city && apt.city.toLowerCase().includes(cityFilter.toLowerCase()));
    
    return matchesSearch && matchesCity;
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            {campaign ? 'Edit Campaign' : 'Create New Campaign'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 max-h-[calc(90vh-130px)] overflow-y-auto">
          {/* Left Column: Apartment Selection */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">Select Apartments</h3>
            
            {isAdmin && (
              <div className="mb-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company
                    </label>
                    <select
                      value={selectedCompany}
                      onChange={(e) => setSelectedCompany(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="kiinteistomaailma">Kiinteistömaailma</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Agency
                    </label>
                    <select
                      value={selectedAgency}
                      onChange={(e) => setSelectedAgency(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Select an agency</option>
                      {agencies.map(agency => (
                        <option key={agency} value={agency}>{agency}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      onClick={handleLoadApartments}
                      disabled={loadingApartments || !selectedAgency}
                      className="px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800 transition-colors disabled:bg-purple-300"
                    >
                      {loadingApartments ? 'Loading...' : 'Load Apartments'}
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            <div className="space-y-3 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search apartments by address or key..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Filter by City
                </label>
                <input
                  type="text"
                  placeholder="Enter city name"
                  value={cityFilter}
                  onChange={(e) => setCityFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            
            <div className="border rounded-md overflow-hidden">
              {loadingApartments ? (
                <div className="flex items-center justify-center p-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-900"></div>
                </div>
              ) : filteredApartments.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  {isAdmin ? 
                    "Please select an agency and click 'Load Apartments'" :
                    "No apartments found linked to your email address. Please contact an administrator if this is unexpected."
                  }
                </div>
              ) : searchedApartments.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  No apartments match your search criteria
                </div>
              ) : (
                <div className="max-h-96 overflow-y-auto">
                  {searchedApartments.map((apt) => (
                    <div 
                      key={apt.key}
                      className={`flex items-center p-3 border-b last:border-b-0 hover:bg-gray-50 ${
                        selectedApartments.includes(apt.key) ? 'bg-purple-50' : ''
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedApartments.includes(apt.key)}
                        onChange={() => handleSelectApartment(apt.key)}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-800">{apt.address}</p>
                        <p className="text-xs text-gray-500">{apt.postcode} {apt.city}</p>
                        <p className="text-xs text-gray-400">Key: {apt.key}</p>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleShowApartmentInfo(apt.key)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Info size={18} />
                        </button>
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
                  ))}
                </div>
              )}
            </div>
            
            <div className="mt-4 text-sm text-gray-600">
              Selected: {selectedApartments.length} apartments
            </div>
          </div>
          
          {/* Right Column: Campaign Details */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">Campaign Details</h3>
            
            {/* Dates */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Campaign Period</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Start Month (MM/YYYY)
                  </label>
                  <input
                    type="text"
                    name="campaign_start_date"
                    value={formData.campaign_start_date}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="MM/YYYY"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    End Month (MM/YYYY)
                  </label>
                  <input
                    type="text"
                    name="campaign_end_date"
                    value={formData.campaign_end_date}
                    onChange={handleInputChange}
                    disabled={formData.ongoing}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      formData.ongoing ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                    placeholder="MM/YYYY"
                  />
                </div>
              </div>
              
              <div className="mt-2 flex items-center">
                <input
                  type="checkbox"
                  id="ongoing"
                  checked={formData.ongoing}
                  onChange={handleToggleOngoing}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="ongoing" className="ml-2 text-sm text-gray-700">
                  Ongoing (no end date)
                </label>
              </div>
            </div>
            
            {/* Channels & Budget */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Channels & Monthly Budget</h4>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="channel_meta"
                      checked={formData.channel_meta}
                      onChange={() => handleToggleChannel('meta')}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <label htmlFor="channel_meta" className="ml-2 text-sm text-gray-700">
                      Meta
                    </label>
                  </div>
                  <div className="w-32">
                    <input
                      type="number"
                      name="budget_meta"
                      value={formData.budget_meta}
                      onChange={handleInputChange}
                      disabled={!formData.channel_meta}
                      min="0"
                      step="0.01"
                      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                        !formData.channel_meta ? 'bg-gray-100 cursor-not-allowed' : ''
                      }`}
                      placeholder="€"
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="channel_display"
                      checked={formData.channel_display}
                      onChange={() => handleToggleChannel('display')}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <label htmlFor="channel_display" className="ml-2 text-sm text-gray-700">
                      Display
                    </label>
                  </div>
                  <div className="w-32">
                    <input
                      type="number"
                      name="budget_display"
                      value={formData.budget_display}
                      onChange={handleInputChange}
                      disabled={!formData.channel_display}
                      min="0"
                      step="0.01"
                      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                        !formData.channel_display ? 'bg-gray-100 cursor-not-allowed' : ''
                      }`}
                      placeholder="€"
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="channel_pdooh"
                      checked={formData.channel_pdooh}
                      onChange={() => handleToggleChannel('pdooh')}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <label htmlFor="channel_pdooh" className="ml-2 text-sm text-gray-700">
                      PDOOH
                    </label>
                  </div>
                  <div className="w-32">
                    <input
                      type="number"
                      name="budget_pdooh"
                      value={formData.budget_pdooh}
                      onChange={handleInputChange}
                      disabled={!formData.channel_pdooh}
                      min="0"
                      step="0.01"
                      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                        !formData.channel_pdooh ? 'bg-gray-100 cursor-not-allowed' : ''
                      }`}
                      placeholder="€"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-3 text-right">
                <p className="text-sm font-medium text-gray-700">
                  Total Monthly Budget: €
                  {(
                    (formData.channel_meta && formData.budget_meta !== '' ? parseFloat(formData.budget_meta) : 0) +
                    (formData.channel_display && formData.budget_display !== '' ? parseFloat(formData.budget_display) : 0) +
                    (formData.channel_pdooh && formData.budget_pdooh !== '' ? parseFloat(formData.budget_pdooh) : 0)
                  ).toFixed(2)}
                </p>
              </div>
            </div>
            
            {/* Campaign Location */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Campaign Location</h4>
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">
                  Address
                </label>
                <AddressAutocomplete
                  onAddressSelect={handleAddressSelect}
                  initialAddress={formData.campaign_address}
                  initialPostalCode={formData.campaign_postal_code}
                  initialCity={formData.campaign_city}
                  placeholder="Enter campaign address"
                />
                
                {validationError && (
                  <p className="mt-1 text-xs text-red-500">{validationError}</p>
                )}
                
                {!addressValidated && !validationError && (
                  <div className="mt-2 flex justify-end">
                    <button
                      onClick={validateCampaignAddress}
                      disabled={validatingAddress || !formData.campaign_address}
                      className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 disabled:bg-gray-100 disabled:text-gray-400"
                    >
                      {validatingAddress ? 'Validating...' : 'Validate Address'}
                    </button>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="campaign_postal_code"
                    value={formData.campaign_postal_code}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter postal code"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="campaign_city"
                    value={formData.campaign_city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter city"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Campaign Radius (meters)
                </label>
                <input
                  type="number"
                  name="campaign_radius"
                  value={formData.campaign_radius}
                  onChange={handleInputChange}
                  min="100"
                  max="10000"
                  step="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              {addressValidated && (
                <div className="mt-4">
                  <div
                    id="campaign-location-map" 
                    ref={mapContainerRef}
                    className="w-full h-64 rounded-lg border border-gray-200"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    The circle shows the campaign radius around the selected location.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end p-6 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors mr-2"
          >
            Cancel
          </button>
          
          <button
            onClick={handleSaveCampaign}
            disabled={loading}
            className="px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800 transition-colors disabled:bg-purple-300"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                {campaign ? 'Updating...' : 'Creating...'}
              </span>
            ) : (
              campaign ? 'Update Campaign' : 'Create Campaign'
            )}
          </button>
        </div>
      </div>
      
      {showApartmentInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-800">Apartment Details</h2>
              <button onClick={handleCloseApartmentInfo} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              {(() => {
                const apt = apartments.find(a => a.key === showApartmentInfo);
                if (!apt) return <p>Apartment not found</p>;
                
                return (
                  <div>
                    <div className="mb-4">
                      <h3 className="text-lg font-medium text-gray-800">{apt.address}</h3>
                      <p className="text-gray-600">{apt.postcode} {apt.city}</p>
                      <p className="text-gray-500 text-sm">Key: {apt.key}</p>
                      {apt.agency && (
                        <p className="text-gray-500 text-sm">Agency: {apt.agency}</p>
                      )}
                      {apt.agentEmail && (
                        <p className="text-gray-500 text-sm">Agent Email: {apt.agentEmail}</p>
                      )}
                      {apt.agencyEmail && (
                        <p className="text-gray-500 text-sm">Agency Email: {apt.agencyEmail}</p>
                      )}
                    </div>
                    
                    {apt.images && apt.images.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Images</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {apt.images.slice(0, 4).map((img, index) => (
                            <img
                              key={index}
                              src={img.url}
                              alt={`Apartment ${apt.key} image ${index + 1}`}
                              className="w-full h-40 object-cover rounded-md"
                            />
                          ))}
                        </div>
                        {apt.images.length > 4 && (
                          <p className="text-sm text-gray-500 mt-2">
                            +{apt.images.length - 4} more images
                          </p>
                        )}
                      </div>
                    )}
                    
                    <div className="mt-4">
                      <a
                        href={`https://www.kiinteistomaailma.fi/${apt.key}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-purple-600 hover:text-purple-800"
                      >
                        <ExternalLink size={16} className="mr-1" />
                        View on Kiinteistömaailma
                      </a>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignModal;