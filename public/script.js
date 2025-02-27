let currentLanguage = 'en';
const translations = {
  en: {
    marketingEngine: "NØRR3",
    loginWithGoogle: "Login with Google",
    login: "Login",
    emailPlaceholder: "e.g. seppo.kairikko@kiinteistomaailma.fi",
    passwordPlaceholder: "Password",
    searchCampaigns: "Search campaigns...",
    selectService: "Select Your Service",
    campaignManagement: "Campaign Management",
    userManagement: "User Management",
    back: "Back",
    allStatuses: "All Statuses",
    active: "Active",
    paused: "Paused",
    exportCampaigns: "Export",
    createCampaign: "Create Campaign",
    editCampaign: "Edit Campaign",
    campaignId: "Campaign ID",
    agent: "Agent",
    includedApartments: "Included Apartment Keys",
    start: "Start",
    end: "End",
    channels: "Channels",
    budget: "Budget",
    status: "Status",
    actions: "Actions",
    activeCampaigns: "Active Campaigns:",
    pausedCampaigns: "Paused Campaigns:",
    totalBudgetLabel: "Total Budget:",
    lastUpdated: "Last Updated:",
    notifications: "Notifications",
    agentInformation: "Agent Information",
    apartmentInformation: "Apartment Information",
    apartments: "Apartments",
    dates: "Dates",
    ongoing: "Ongoing",
    budgetAllocation: "Budget Allocation",
    totalBudget: "Total Budget",
    saveCampaign: "Save Campaign",
    cancel: "Cancel",
    confirmEdits: "Confirm Edits",
    selectApartments: "Select Apartments",
    apartmentDetails: "Apartment Details",
    campaignDetails: "Campaign Details",
    add: "Add",
    moreInfo: "More Info",
    fetchCampaigns: "Fetch",
    invalidCredentials: "Wrong email or password, please try again.",
    noNewNotifications: "No new notifications.",
    campaignSaved: "Campaign saved!",
    pleaseLogin: "Please log in to view campaigns.",
    noCampaigns: "No campaigns found.",
    successfullyAdded: "Successfully added apartment.",
    noApartments: "No apartments found for the specified agent email.",
    failedLoadUsers: "Failed to load users"
  },
  fi: { /* Finnish translations here */ },
  sv: { /* Swedish translations here */ }
};

let selectedApartments = [];
let allApartments = [];
// Global variable to hold auto-filled agent info (for admin campaign creation)
let adminAgentInfo = {};

function getThumbnailUrl(apt) {
  const mainImg = (apt.images || []).find(i => i.type === 'MAIN');
  return mainImg && mainImg.url ? mainImg.url : 'https://via.placeholder.com/50';
}

function setLanguage(lang) {
  currentLanguage = lang;
  document.querySelectorAll('[data-translate]').forEach(el => {
    const key = el.getAttribute('data-translate');
    el.textContent = translations[currentLanguage][key] || key;
  });
  document.getElementById('norr3-email').placeholder = translations[currentLanguage].emailPlaceholder;
  document.getElementById('norr3-password').placeholder = translations[currentLanguage].passwordPlaceholder;
  document.getElementById('norr3-search-campaigns').placeholder = translations[currentLanguage].searchCampaigns;
  const filterSelect = document.getElementById('norr3-filter-status');
  if (filterSelect && filterSelect.options.length >= 3) {
    filterSelect.options[0].text = translations[currentLanguage].allStatuses;
    filterSelect.options[1].text = translations[currentLanguage].active;
    filterSelect.options[2].text = translations[currentLanguage].paused;
  }
}

document.querySelectorAll('.norr3-language-switcher a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    setLanguage(link.getAttribute('data-lang'));
  });
});

function showAlert(message) {
  const alertEl = document.getElementById('norr3-alert');
  alertEl.textContent = message;
  alertEl.style.display = 'block';
  alertEl.focus();
  alertEl.addEventListener('click', () => alertEl.style.display = 'none', { once: true });
}

function hideAlert() {
  document.getElementById('norr3-alert').style.display = 'none';
}

function showLoadingScreen(show = true) {
  document.getElementById('norr3-loading-screen').style.display = show ? 'flex' : 'none';
}

function showSection(sectionId) {
  document.querySelectorAll('.norr3-fade-in').forEach(sec => sec.style.display = 'none');
  const sec = document.getElementById(sectionId);
  if (sec) sec.style.display = 'block';
  if (sectionId === 'norr3-campaign-setup' && !localStorage.getItem('token')) {
    showAlert(translations[currentLanguage].pleaseLogin);
  }
}

function norr3GoBack() {
  if (localStorage.getItem('role') === 'admin') {
    showSection('norr3-service-selection');
  }
}

function norr3Logout() {
  showLoadingScreen(true);
  localStorage.clear();
  document.getElementById('norr3-container').style.display = 'none';
  showSection('norr3-login-section');
  document.getElementById('norr3-email').value = '';
  document.getElementById('norr3-password').value = '';
  showLoadingScreen(false);
}

async function norr3ManualLogin() {
  const email = document.getElementById('norr3-email').value;
  const password = document.getElementById('norr3-password').value;
  showLoadingScreen(true);
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('norr3LoggedIn', 'true');
      localStorage.setItem('role', data.role);
      localStorage.setItem('partnerName', data.partnerName);
      localStorage.setItem('email', data.email);
      if (data.role === 'partner') {
        localStorage.setItem('agentEmail', data.email);
      }
      document.getElementById('norr3-container').style.display = 'block';
      hideAlert();
      if (data.role === 'admin') {
        showSection('norr3-service-selection');
      } else {
        showSection('norr3-campaign-setup');
      }
    } else {
      const err = await res.json();
      showAlert(err.error || translations[currentLanguage].invalidCredentials);
    }
  } catch (error) {
    showAlert('Login failed: ' + error.message);
  } finally {
    showLoadingScreen(false);
  }
}

async function norr3GoogleLogin() {
  showLoadingScreen(true);
  try {
    window.location.href = '/auth/google-login';
  } catch (error) {
    showAlert('Google login failed: ' + error.message);
  } finally {
    showLoadingScreen(false);
  }
}

async function norr3SelectService(service) {
  showLoadingScreen(true);
  localStorage.setItem('norr3SelectedService', service);
  localStorage.setItem('norr3Page', 'campaign-setup');
  showSection('norr3-campaign-setup');
  showLoadingScreen(false);
}

// Cached campaigns stored in localStorage
let cachedCampaigns = JSON.parse(localStorage.getItem('cachedCampaigns')) || [];

// Fetch campaigns and update dashboard
async function norr3FetchCampaigns() {
  const token = localStorage.getItem('token');
  if (!token) {
    showAlert(translations[currentLanguage].pleaseLogin);
    return;
  }
  showLoadingScreen(true);
  try {
    const decoded = jwtDecode(token);
    const agentKey = decoded.agentKey || '';
    const res = await fetch('/api/campaigns', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error(await res.text());
    let camps = await res.json();
    if (decoded.role === 'partner') {
      cachedCampaigns = camps.filter(c => (c.agent_key || '').toLowerCase() === agentKey.toLowerCase());
    } else {
      cachedCampaigns = camps;
    }
    localStorage.setItem('cachedCampaigns', JSON.stringify(cachedCampaigns));
    renderCampaignList();
    norr3UpdateMetrics();
    norr3CheckNotifications();
  } catch (err) {
    showAlert('Failed to fetch campaigns: ' + err.message);
  } finally {
    showLoadingScreen(false);
  }
}

function renderCampaignList() {
  const list = document.getElementById('norr3-campaign-list');
  list.innerHTML = '';
  if (!cachedCampaigns.length) {
    list.innerHTML = `<p role="status">${translations[currentLanguage].noCampaigns}</p>`;
    return;
  }
  cachedCampaigns.forEach(camp => {
    const displayId = camp.id.length > 4 ? camp.id.slice(-4) : camp.id;
    const totalBudget = Object.values(camp.budget).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
    const row = document.createElement('div');
    row.className = `norr3-table-row ${!camp.status ? 'norr3-row-off' : ''}`;
    row.setAttribute('role', 'row');
    row.innerHTML = `
      <span role="cell">${displayId}</span>
      <span role="cell">${camp.agent_name || 'Unknown Agent'}</span>
      <span role="cell">${(camp.apartments || []).map(a => a.key).join(', ') || 'None'}</span>
      <span role="cell">${formatDate(camp.start_date)}</span>
      <span role="cell">${camp.end_date ? formatDate(camp.end_date) : translations[currentLanguage].ongoing}</span>
      <span role="cell">
        ${camp.channels.includes('meta') ? '<i class="fab fa-facebook" title="Meta"></i>' : ''}
        ${camp.channels.includes('display') ? '<i class="fas fa-desktop" title="Display"></i>' : ''}
        ${camp.channels.includes('pdooh') ? '<i class="fas fa-sign" title="PDOOH"></i>' : ''}
      </span>
      <span role="cell">${totalBudget.toFixed(2)}€</span>
      <span role="cell">
        <label class="norr3-toggle-slider">
          <input type="checkbox" ${camp.status ? 'checked' : ''} onchange="norr3ToggleStatus('${camp.id}', this.checked)"/>
          <span class="norr3-slider"></span>
        </label>
      </span>
      <span role="cell">
        <i class="fas fa-info-circle norr3-info-icon" onclick="norr3ShowCampaignInfo('${camp.id}')" tabindex="0"></i>
      </span>
    `;
    list.appendChild(row);
  });
}

async function norr3ToggleStatus(id, checked) {
  const token = localStorage.getItem('token');
  if (!token) {
    showAlert(translations[currentLanguage].pleaseLogin);
    return;
  }
  showLoadingScreen(true);
  try {
    const res = await fetch(`/api/campaigns/status/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: checked })
    });
    if (!res.ok) throw new Error(await res.text());
    const updatedCamp = await res.json();
    const campIndex = cachedCampaigns.findIndex(c => c.id === id);
    if (campIndex !== -1) {
      cachedCampaigns[campIndex] = { ...cachedCampaigns[campIndex], ...updatedCamp, status: checked ? 1 : 0 };
    } else {
      await norr3FetchCampaigns();
    }
    localStorage.setItem('cachedCampaigns', JSON.stringify(cachedCampaigns));
    renderCampaignList();
    norr3UpdateMetrics();
    norr3CheckNotifications();
  } catch (err) {
    console.error('Error toggling campaign status:', err);
    showAlert('Error toggling campaign status: ' + err.message);
  } finally {
    showLoadingScreen(false);
  }
}

async function norr3ShowCampaignInfo(id) {
  const token = localStorage.getItem('token');
  if (!token) {
    showAlert(translations[currentLanguage].pleaseLogin);
    return;
  }
  showLoadingScreen(true);
  try {
    const res = await fetch(`/api/campaigns/${id}`, { headers: { 'Authorization': `Bearer ${token}` } });
    if (!res.ok) throw new Error('Failed to load campaign details');
    const camp = await res.json();
    document.getElementById('norr3-campaign-info-modal').style.display = 'flex';
    const info = document.getElementById('norr3-campaign-info');
    info.innerHTML = `
      <h4>Campaign ID: ${camp.id}</h4>
      <p><strong>Partner Name:</strong> ${camp.partnerName || 'Kiinteistömaailma Helsinki'}</p>
      <p><strong>Agent:</strong> ${camp.agent_name || 'Unknown Agent'}</p>
      <p><strong>Apartment Keys:</strong> ${(camp.apartments || []).map(a => a.key).join(', ') || 'None'}</p>
      <p><strong>Address:</strong> ${camp.address || 'Unknown Address'}</p>
      <p><strong>Radius:</strong> ${(camp.apartments || []).map(a => a.radius).join(', ') || 'N/A'} meters</p>
      <p><strong>Channels:</strong> ${camp.channels.join(', ') || 'None'}</p>
      <p><strong>Budgets:</strong> Meta: ${camp.budget.meta || 0}€, Display: ${camp.budget.display || 0}€, PDOOH: ${camp.budget.pdooh || 0}€</p>
      <p><strong>Start Date:</strong> ${formatDate(camp.start_date)}</p>
      <p><strong>End Date:</strong> ${camp.end_date ? formatDate(camp.end_date) : 'Ongoing'}</p>
      <p><strong>Active:</strong> ${camp.status ? 'Yes' : 'No'}</p>
    `;
  } catch (err) {
    console.error('Error loading campaign details:', err);
    showAlert('Failed to load campaign details: ' + err.message);
  } finally {
    showLoadingScreen(false);
  }
}

function norr3CloseCampaignInfoModal(event) {
  document.getElementById('norr3-campaign-info-modal').style.display = 'none';
}

// --- New Functions for Campaign Creation – Apartment Selection --- //

// For Admin: Auto Fill Agent Info remains unchanged
async function norr3AutoFillAgent() {
  const agentEmailInput = document.getElementById('norr3-create-agent-email');
  const email = agentEmailInput.value.trim();
  if (!email) {
    showAlert('Please enter an agent email.');
    return;
  }
  showLoadingScreen(true);
  try {
    const res = await fetch(`/api/agent-info?email=${encodeURIComponent(email)}`);
    if (!res.ok) throw new Error(await res.text());
    const agentData = await res.json();
    adminAgentInfo = agentData;
    agentEmailInput.value = agentData.email;
    showAlert(`Auto-filled agent info for ${agentData.name}`);
  } catch (err) {
    showAlert('Auto Fill failed: ' + err.message);
  } finally {
    showLoadingScreen(false);
  }
}

// Load apartments into the scrollable container inside the Create Campaign modal
async function norr3LoadApartments() {
  const token = localStorage.getItem('token');
  if (!token) {
    showAlert(translations[currentLanguage].pleaseLogin);
    return;
  }
  const agentEmail = document.getElementById('norr3-create-agent-email').value.trim().toLowerCase();
  if (!agentEmail) {
    showAlert("Please enter an agent email.");
    return;
  }
  const loadBtnText = document.getElementById('norr3-load-apartments-text');
  const loadBtnIcon = document.getElementById('norr3-load-apartments-icon');
  loadBtnText.style.display = 'none';
  loadBtnIcon.className = 'fas fa-spinner fa-spin';
  loadBtnIcon.style.display = 'inline-block';
  try {
    const res = await fetch('/api/apartments', { headers: { 'Authorization': `Bearer ${token}` } });
    if (!res.ok) throw new Error(await res.text());
    const apartments = await res.json();
    const filtered = apartments.filter(a => 
      (a.agentEmail || a.agencyEmail || '').toLowerCase().trim() === agentEmail
    );
    const table = document.getElementById('norr3-apartments-table');
    if (!filtered.length) {
      showAlert(translations[currentLanguage].noApartments);
      table.innerHTML = `<p>No apartments found.</p>`;
    } else {
      table.innerHTML = '';
      filtered.forEach(apt => {
        const row = document.createElement('div');
        row.className = 'norr3-apartment-row';
        row.innerHTML = `
<input type="checkbox" class="norr3-apartment-checkbox" data-key="${apt.key}" onchange="norr3ToggleApartmentSelection(event)" />
<img src="${getThumbnailUrl(apt)}" alt="${apt.address || 'Apartment'}" style="width:50px; height:auto;" loading="lazy">
<div>
  <div>${apt.address || 'Unknown Address'}, ${apt.postcode || ''} ${apt.city || ''}</div>
  <div>
    <label>Radius:
      <input type="number" class="norr3-apartment-radius" data-key="${apt.key}" placeholder="Radius (meters)" disabled style="opacity:0.5;" onchange="norr3UpdateApartmentRadius(event)" />
    </label>
  </div>
</div>
<i class="fas fa-info-circle norr3-info-icon" onclick="norr3ShowApartmentInfo('${apt.key}')" tabindex="0"></i>
<a href="https://www.kiinteistomaailma.fi/${apt.key}" target="_blank"><i class="fas fa-link"></i></a>
        `;
        table.appendChild(row);
      });
    }
  } catch (err) {
    showAlert('Failed to load apartments: ' + err.message);
  } finally {
    loadBtnIcon.style.display = 'none';
    loadBtnText.style.display = 'inline-block';
    loadBtnText.textContent = 'Load Apartments';
  }
}

function norr3ToggleApartmentSelection(e) {
  const checkbox = e.target;
  const key = checkbox.getAttribute('data-key');
  const radiusInput = document.querySelector(`.norr3-apartment-radius[data-key="${key}"]`);
  if (checkbox.checked) {
    radiusInput.disabled = false;
    radiusInput.style.opacity = '1';
    if (!selectedApartments.some(a => a.key === key)) {
      selectedApartments.push({ key: key, radius: parseInt(radiusInput.value) || 1500 });
    }
  } else {
    radiusInput.disabled = true;
    radiusInput.style.opacity = '0.5';
    selectedApartments = selectedApartments.filter(a => a.key !== key);
  }
}

function norr3UpdateApartmentRadius(e) {
  const input = e.target;
  const key = input.getAttribute('data-key');
  const apt = selectedApartments.find(a => a.key === key);
  if (apt) {
    apt.radius = parseInt(input.value) || 1500;
  }
}

// --- Campaign Creation and Editing --- //

async function norr3CreateCampaign() {
  const token = localStorage.getItem('token');
  if (!token) {
    showAlert(translations[currentLanguage].pleaseLogin);
    return;
  }
  // Clear previous selections
  selectedApartments = [];
  document.getElementById('norr3-apartments-table').innerHTML = '';
  document.getElementById('norr3-create-modal').style.display = 'flex';
  document.getElementById('norr3-create-start-date').value = '';
  document.getElementById('norr3-create-end-date').value = '';
  document.getElementById('norr3-create-ongoing').checked = false;
  document.getElementById('norr3-create-end-date').disabled = false;
  
  if (localStorage.getItem('role') === 'admin') {
    document.getElementById('norr3-agent-section').style.display = 'block';
    document.getElementById('norr3-campaign-budget-section').style.display = 'block';
  } else {
    document.getElementById('norr3-agent-section').style.display = 'none';
    document.getElementById('norr3-campaign-budget-section').style.display = 'none';
  }
}

function norr3CloseCreateModal(event) {
  document.getElementById('norr3-create-modal').style.display = 'none';
  selectedApartments = [];
}

async function norr3EditCampaign(id) {
  const token = localStorage.getItem('token');
  if (!token) {
    showAlert(translations[currentLanguage].pleaseLogin);
    return;
  }
  showLoadingScreen(true);
  try {
    const [campRes, aptRes] = await Promise.all([
      fetch(`/api/campaigns/${id}`, { headers: { 'Authorization': `Bearer ${token}` } }),
      fetch('/api/apartments', { headers: { 'Authorization': `Bearer ${token}` } })
    ]);
    if (!campRes.ok || !aptRes.ok) throw new Error('Failed to load campaign or apartments');
    const campaign = await campRes.json();
    const apartments = await aptRes.json();
    let storedEmail = localStorage.getItem('role') === 'admin'
      ? document.getElementById('norr3-create-agent-email').value.trim().toLowerCase()
      : (localStorage.getItem('agentEmail') || '').toLowerCase().trim();
    allApartments = apartments.filter(a =>
      (a.agentEmail || a.agencyEmail || '').toLowerCase().trim() === storedEmail
    );
    document.getElementById('norr3-edit-modal').style.display = 'flex';
    document.getElementById('norr3-edit-modal').setAttribute('data-campaign-id', campaign.id);
    document.getElementById('norr3-modal-start-date').value = (campaign.start_date || '').split('T')[0];
    if (campaign.end_date) {
      document.getElementById('norr3-modal-end-date').value = campaign.end_date.split('T')[0];
      document.getElementById('norr3-modal-ongoing').checked = false;
      document.getElementById('norr3-modal-end-date').disabled = false;
    } else {
      document.getElementById('norr3-modal-end-date').value = '';
      document.getElementById('norr3-modal-ongoing').checked = true;
      document.getElementById('norr3-modal-end-date').disabled = true;
    }
    selectedApartments = (campaign.apartments || []).map(a => ({
      key: a.key,
      radius: a.radius || 1500
    }));
    // For admin users, render selected apartments in the container (assumed to be the same container as create)
    if (localStorage.getItem('role') === 'admin') {
      norr3RenderSelectedApartments();
    }
  } catch (err) {
    showAlert('Failed to load campaign for editing: ' + err.message);
  } finally {
    showLoadingScreen(false);
  }
}

function norr3CloseModal(event) {
  document.getElementById('norr3-edit-modal').style.display = 'none';
}

function norr3ToggleCreateEndDate() {
  const ongoing = document.getElementById('norr3-create-ongoing').checked;
  const endDate = document.getElementById('norr3-create-end-date');
  endDate.disabled = ongoing;
  if (ongoing) endDate.value = '';
}

function norr3ToggleEndDate() {
  const ongoing = document.getElementById('norr3-modal-ongoing').checked;
  const endDate = document.getElementById('norr3-modal-end-date');
  endDate.disabled = ongoing;
  if (ongoing) endDate.value = '';
}

function norr3ToggleChannelBudget(channel) {
  const checkbox = document.getElementById(`norr3-create-channel-${channel}`);
  const input = document.getElementById(`norr3-create-budget-${channel}`);
  if (checkbox.checked) {
    input.disabled = false;
    input.style.opacity = '1';
  } else {
    input.disabled = true;
    input.style.opacity = '0.5';
    input.value = 0;
  }
}

async function norr3SaveCampaign() {
  const token = localStorage.getItem('token');
  if (!token) {
    showAlert(translations[currentLanguage].pleaseLogin);
    return;
  }
  showLoadingScreen(true);
  const createModal = document.getElementById('norr3-create-modal');
  const editModal = document.getElementById('norr3-edit-modal');
  const isCreate = createModal.style.display === 'flex';
  const modal = isCreate ? createModal : editModal;
  const campaignId = modal.getAttribute('data-campaign-id') || '';
  const startDate = isCreate
    ? document.getElementById('norr3-create-start-date').value
    : document.getElementById('norr3-modal-start-date').value;
  const endDate = isCreate
    ? document.getElementById('norr3-create-end-date').value
    : document.getElementById('norr3-modal-end-date').value;
  const ongoing = isCreate
    ? document.getElementById('norr3-create-ongoing').checked
    : document.getElementById('norr3-modal-ongoing').checked;
  if (!startDate || (!ongoing && !endDate) || selectedApartments.length === 0) {
    showAlert('Please provide Start Date, End Date (or mark as Ongoing), and select at least one apartment.');
    showLoadingScreen(false);
    return;
  }
  let campAddress = 'Unknown Address', campPost = 'Unknown', campCity = 'Unknown';
  const firstApt = allApartments.find(a => a.key === selectedApartments[0].key);
  if (firstApt) {
    campAddress = firstApt.address || campAddress;
    campPost = firstApt.postcode || campPost;
    campCity = firstApt.city || campCity;
  }
  const combinedChannels = new Set();
  let combinedBudget = { meta: 0, display: 0, pdooh: 0 };
  if (localStorage.getItem('role') === 'admin') {
    combinedBudget.meta = parseFloat(document.getElementById('norr3-create-budget-meta').value) || 0;
    combinedBudget.display = parseFloat(document.getElementById('norr3-create-budget-display').value) || 0;
    combinedBudget.pdooh = parseFloat(document.getElementById('norr3-create-budget-pdooh').value) || 0;
    ['meta', 'display', 'pdooh'].forEach(ch => {
      const checkbox = document.getElementById(`norr3-create-channel-${ch}`);
      if (checkbox && checkbox.checked) combinedChannels.add(ch);
    });
  } else {
    const decoded = jwtDecode(token);
    // For partners, budget is not handled here.
  }
  const decoded = jwtDecode(token);
  const agentName = decoded.agentName || 'Unknown Agent';
  const agentKey = decoded.agentKey || 'Unknown';
  const campaignData = {
    id: campaignId || Date.now().toString(),
    partner_id: 1,
    partnerName: localStorage.getItem('partnerName') || 'Kiinteistömaailma Helsinki',
    agent_name: agentName,
    agent_key: agentKey,
    apartments: selectedApartments, // ensure this is an array (even if empty)
    address: campAddress,
    postal_code: campPost,
    city: campCity,
    radius: 0,
    start_date: startDate,
    end_date: ongoing ? '' : endDate,
    channels: [...combinedChannels],
    budget: combinedBudget,
    status: true
  };
    try {
    const method = campaignId ? 'PUT' : 'POST';
    const res = await fetch('/api/campaigns', {
      method: method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(campaignData)
    });
    if (!res.ok) throw new Error(await res.text());
    const savedCampaign = await res.json();
    if (isCreate) {
      document.getElementById('norr3-create-modal').style.display = 'none';
    } else {
      document.getElementById('norr3-edit-modal').style.display = 'none';
    }
    selectedApartments = [];
    await norr3FetchCampaigns();
    norr3UpdateMetrics();
    norr3CheckNotifications();
    showAlert(translations[currentLanguage].campaignSaved);
  } catch (err) {
    showAlert('Error saving campaign: ' + err.message);
  } finally {
    showLoadingScreen(false);
  }
}

function norr3ConfirmEdits() {
  norr3SaveCampaign();
}

// --- New function to render selected apartments in Edit mode for admin ---
function norr3RenderSelectedApartments() {
  // Assuming you have a container with ID 'norr3-apartments-table-edit'
  const container = document.getElementById('norr3-apartments-table-edit') || document.getElementById('norr3-apartments-table');
  container.innerHTML = '';
  selectedApartments.forEach(ap => {
    const apt = allApartments.find(a => a.key === ap.key) || {};
    const row = document.createElement('div');
    row.className = 'norr3-apartment-row';
    row.innerHTML = `
      <input type="checkbox" class="norr3-apartment-checkbox" data-key="${ap.key}" checked onchange="norr3ToggleApartmentSelection(event)" />
      <img src="${getThumbnailUrl(apt)}" alt="${apt.address || 'Apartment'}" style="width:50px; height:auto;" loading="lazy">
      <span>${apt.address || 'Unknown Address'}, ${apt.postcode || ''} ${apt.city || ''}</span>
      <i class="fas fa-info-circle norr3-info-icon" onclick="norr3ShowApartmentInfo('${ap.key}')" tabindex="0"></i>
      <a href="https://www.kiinteistomaailma.fi/${ap.key}" target="_blank"><i class="fas fa-link"></i></a>
      <input type="number" class="norr3-apartment-radius" data-key="${ap.key}" value="${ap.radius}" placeholder="Radius (meters)" onchange="norr3UpdateApartmentRadius(event)" />
    `;
    container.appendChild(row);
  });
}

// --- User Management Functions --- //

// Open the Add User modal
function norr3OpenAddUser() {
  document.getElementById('norr3-add-user-modal').style.display = 'flex';
}

// Close the Add User modal
function norr3CloseAddUser() {
  document.getElementById('norr3-add-user-modal').style.display = 'none';
}

// Toggle password visibility in the Add User modal
function norr3TogglePasswordVisibility(inputId) {
  const input = document.getElementById(inputId);
  if (input.type === 'password') {
    input.type = 'text';
  } else {
    input.type = 'password';
  }
}

async function norr3ShowApartmentInfo(key) {
  const token = localStorage.getItem('token');
  if (!token) {
    showAlert(translations[currentLanguage].pleaseLogin);
    return;
  }
  showLoadingScreen(true);
  try {
    const res = await fetch('/api/apartments', { 
      headers: { 'Authorization': `Bearer ${token}` } 
    });
    if (!res.ok) throw new Error(`Failed to load apartments (Status: ${res.status})`);
    const apartments = await res.json();
    const apt = apartments.find(a => String(a.key) === String(key));
    if (!apt) {
      showAlert('Apartment not found.');
      return;
    }
    document.getElementById('norr3-apartment-info-modal').style.display = 'flex';
    const info = document.getElementById('norr3-apartment-info');
    info.innerHTML = `
      <h4>${apt.address || 'Unknown Address'}, ${apt.postcode || ''} ${apt.city || ''}</h4>
      <div class="norr3-image-slider">
        ${(apt.images || []).map(img => `<img src="${img.url}" alt="Apartment Image" loading="lazy"/>`).join('')}
      </div>
      <p><strong>Key:</strong> ${apt.key || 'Unknown'}</p>
      <p><strong>Link:</strong> <a href="https://www.kiinteistomaailma.fi/${apt.key}" target="_blank">View</a></p>
      <p><strong>Agent Email:</strong> ${apt.agentEmail || apt.agencyEmail || 'Unknown'}</p>
    `;
  } catch (err) {
    showAlert('Failed to load apartment details: ' + err.message);
  } finally {
    showLoadingScreen(false);
  }
}


// Auto-fill user details (calls an API endpoint for agent autofill)
async function norr3AutoFillUser() {
  const emailInput = document.getElementById('norr3-add-user-email');
  const email = emailInput.value.trim();
  if (!email) {
    showAlert("Please enter an email to auto-fill.");
    return;
  }
  showLoadingScreen(true);
  try {
    const res = await fetch('/api/users/autofill', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    if (!res.ok) throw new Error(await res.text());
    const data = await res.json();
    // Fill in the rest of the fields
    document.getElementById('norr3-add-user-name').value = data.agentName || '';
    document.getElementById('norr3-add-user-agent-key').value = data.agentKey || '';
    document.getElementById('norr3-add-user-agent-image').value = data.agentImage || '';
    // Suggest a random password (you can improve this logic)
    document.getElementById('norr3-add-user-password').value = Math.random().toString(36).slice(-8);
    showAlert(`Auto-filled details for ${data.email}`);
  } catch (err) {
    showAlert('Auto-fill failed: ' + err.message);
  } finally {
    showLoadingScreen(false);
  }
}

async function norr3AddUserAccount() {
  // This function is triggered from the Add User modal
  const token = localStorage.getItem('token');
  if (!token || localStorage.getItem('role') !== 'admin') {
    showAlert('Only admins can add users.');
    return;
  }
  showLoadingScreen(true);
  try {
    const email = document.getElementById('norr3-add-user-email').value;
    const password = document.getElementById('norr3-add-user-password').value;
    const name = document.getElementById('norr3-add-user-name').value;
    const agentKey = document.getElementById('norr3-add-user-agent-key').value;
    const agentImage = document.getElementById('norr3-add-user-agent-image').value;
    const role = document.getElementById('norr3-add-user-role').value;
    if (!email || !password || !name || !agentKey) {
      showAlert('Please fill in all required fields.');
      return;
    }
    const user = { email, password, partnerName: name, agentName: name, agentKey, agentImage, role };
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    if (!res.ok) throw new Error(await res.text());
    await norr3RenderUsers();
    showAlert('User added successfully!');
    norr3CloseAddUser();
  } catch (err) {
    showAlert('Error adding user: ' + err.message);
  } finally {
    showLoadingScreen(false);
  }
}

async function norr3RemoveUser() {
  const token = localStorage.getItem('token');
  if (!token || localStorage.getItem('role') !== 'admin') {
    showAlert('Only admins can remove users.');
    return;
  }
  showLoadingScreen(true);
  try {
    const email = document.getElementById('norr3-user-email').value;
    if (!email) {
      showAlert('Please enter an email to remove.');
      return;
    }
    const res = await fetch(`/api/users/${encodeURIComponent(email)}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error(await res.text());
    await norr3RenderUsers();
    showAlert('User removed successfully!');
  } catch (err) {
    showAlert('Error removing user: ' + err.message);
  } finally {
    showLoadingScreen(false);
  }
}

async function norr3EditUser() {
  const token = localStorage.getItem('token');
  if (!token || localStorage.getItem('role') !== 'admin') {
    showAlert('Only admins can edit users.');
    return;
  }
  showLoadingScreen(true);
  try {
    const email = document.getElementById('norr3-user-email').value;
    const partnerName = document.getElementById('norr3-user-partner-name').value;
    const agentName = document.getElementById('norr3-user-agent-name').value;
    const agentKey = document.getElementById('norr3-user-agent-key').value;
    const agentImage = document.getElementById('norr3-user-agent-image').value || "";
    const password = document.getElementById('norr3-user-password').value;
    if (!email) {
      showAlert('Please enter an email to edit.');
      return;
    }
    const user = { partnerName, agentName, agentKey, agentImage };
    if (password) user.password = password;
    const res = await fetch(`/api/users/${encodeURIComponent(email)}`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    if (!res.ok) throw new Error(await res.text());
    await norr3RenderUsers();
    showAlert('User edited successfully!');
  } catch (err) {
    showAlert('Error editing user: ' + err.message);
  } finally {
    showLoadingScreen(false);
  }
}

async function norr3RenderUsers() {
  const token = localStorage.getItem('token');
  if (!token || localStorage.getItem('role') !== 'admin') return;
  showLoadingScreen(true);
  try {
    const res = await fetch('/api/users', { headers: { 'Authorization': `Bearer ${token}` } });
    if (!res.ok) throw new Error(translations[currentLanguage].failedLoadUsers);
    const users = await res.json();
    const list = document.getElementById('norr3-user-list');
    list.innerHTML = '';
    // Build table header
    const header = document.createElement('div');
    header.className = 'norr3-user-item norr3-user-header';
    header.innerHTML = `
      <span>Email</span>
      <span>Partner</span>
      <span>Agent</span>
      <span>Agent Key</span>
      <span>Image</span>
      <span>Role</span>
      <span>Actions</span>
    `;
    list.appendChild(header);
    // Build rows for each user
    users.forEach(u => {
      const row = document.createElement('div');
      row.className = 'norr3-user-item';
      row.innerHTML = `
        <span>${u.email || 'Unknown'}</span>
        <span>${u.partnerName || 'Unknown'}</span>
        <span>${u.agentName || 'Unknown'}</span>
        <span>${u.agentKey || 'Unknown'}</span>
        <span><img src="${u.agentImage || 'https://via.placeholder.com/50'}" alt="${u.agentName || 'Agent'}" style="width:40px; height:auto;"></span>
        <span>${u.role || 'Unknown'}</span>
        <span>
          <button class="norr3-btn-primary" onclick="norr3EditUser('${u.email}')">Edit</button>
          <button class="norr3-btn-primary" onclick="norr3RemoveUser('${u.email}')">Remove</button>
        </span>
      `;
      list.appendChild(row);
    });
  } catch (err) {
    showAlert('Failed to load users: ' + err.message);
  } finally {
    showLoadingScreen(false);
  }
}

function norr3UserManagement() {
  document.getElementById('norr3-user-management-modal').style.display = 'flex';
}

// --- Utility Functions --- //

function jwtDecode(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return {};
  }
}

function formatDate(date) {
  if (!date) return '';
  const d = new Date(date);
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.norr3-modal').forEach(modal => {
    modal.addEventListener('click', e => {
      if (e.target === modal) {
        if (modal.id === 'norr3-create-modal') norr3CloseCreateModal(e);
        else if (modal.id === 'norr3-edit-modal') norr3CloseModal(e);
        else if (modal.id === 'norr3-apartment-info-modal') norr3CloseApartmentInfoModal(e);
        else if (modal.id === 'norr3-campaign-info-modal') norr3CloseCampaignInfoModal(e);
        else if (modal.id === 'norr3-notification-modal') norr3CloseNotificationModal(e);
        else if (modal.id === 'norr3-user-management-modal') modal.style.display = 'none';
        else if (modal.id === 'norr3-add-user-modal') norr3CloseAddUser();
      }
    });
  });
});

window.onload = function() {
  setLanguage(currentLanguage);
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  const service = urlParams.get('service');
  if (token) {
    localStorage.setItem('token', token);
    localStorage.setItem('norr3LoggedIn', 'true');
    localStorage.setItem('role', service === 'norr3' ? 'admin' : 'partner');
    localStorage.setItem('partnerName', service === 'norr3' ? 'NØRR3' : 'Kiinteistömaailma Helsinki');
    localStorage.setItem('email', 'seppo.kairikko@kiinteistomaailma.fi');
    if (localStorage.getItem('role') !== 'admin') {
      localStorage.setItem('agentEmail', 'seppo.kairikko@kiinteistomaailma.fi');
    }
    document.getElementById('norr3-container').style.display = 'block';
    if (localStorage.getItem('role') === 'admin') {
      showSection('norr3-service-selection');
      document.getElementById('norr3-user-management-btn').style.display = 'inline-block';
      document.getElementById('norr3-back-button').style.display = 'inline-block';
    } else {
      showSection('norr3-campaign-setup');
      document.getElementById('norr3-user-management-btn').style.display = 'none';
      document.getElementById('norr3-back-button').style.display = 'none';
      const list = document.getElementById('norr3-campaign-list');
      list.innerHTML = `<p role="status">${translations[currentLanguage].noCampaigns}</p>`;
    }
  } else if (localStorage.getItem('norr3LoggedIn') === 'true') {
    document.getElementById('norr3-container').style.display = 'block';
    const page = localStorage.getItem('norr3Page') || 'campaign-setup';
    if (localStorage.getItem('role') === 'admin') {
      showSection(page === 'campaign-setup' ? 'norr3-campaign-setup' : 'norr3-service-selection');
      document.getElementById('norr3-user-management-btn').style.display = 'inline-block';
      document.getElementById('norr3-back-button').style.display = 'inline-block';
    } else {
      showSection('norr3-campaign-setup');
      document.getElementById('norr3-user-management-btn').style.display = 'none';
      document.getElementById('norr3-back-button').style.display = 'none';
      const list = document.getElementById('norr3-campaign-list');
      list.innerHTML = `<p role="status">${translations[currentLanguage].noCampaigns}</p>`;
      const buttonContainer = document.createElement('div');
      buttonContainer.className = 'norr3-fetch-button';
      buttonContainer.innerHTML = `<button class="norr3-btn-primary" onclick="norr3FetchCampaigns()" data-translate="fetchCampaigns">${translations[currentLanguage].fetchCampaigns}</button>`;
      list.parentNode.insertBefore(buttonContainer, list);
    }
  } else {
    showSection('norr3-login-section');
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
      showAlert(translations[currentLanguage].pleaseLogin);
    }
  }
  document.getElementById('norr3-search-campaigns').addEventListener('input', () => {});
  document.getElementById('norr3-filter-status').addEventListener('change', () => {});
  document.querySelector('.norr3-notification').addEventListener('keypress', e => {
    if (e.key === 'Enter' || e.key === ' ') norr3ShowNotifications();
  });
  if (localStorage.getItem('role') === 'admin') {
    norr3RenderUsers();
  }
};