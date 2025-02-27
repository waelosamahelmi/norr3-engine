let currentLanguage = 'en';
const translations = {
  en: {
    marketingEngine: "NØRR3",
    loginWithGoogle: "Login with Google",
    login: "Login",
    emailPlaceholder: "e.g. firstname.lastname@kiinteistomaailma.fi",
    passwordPlaceholder: "Password",
    searchCampaigns: "Search campaigns...",
    selectService: "Select Your Service",
    campaignManagement: "Campaign Management",
    userManagement: "Users",
    back: "Back",
    allStatuses: "All Statuses",
    active: "Active",
    paused: "Paused",
    exportCampaigns: "Export",
    createCampaign: "Create",
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
    fetchCampaigns: "Sync",
    invalidCredentials: "Wrong email or password, please try again.",
    noNewNotifications: "No new notifications.",
    campaignSaved: "Campaign saved!",
    pleaseLogin: "Please log in to view campaigns.",
    noCampaigns: "No campaigns found.",
    successfullyAdded: "Successfully added apartment.",
    noApartments: "No apartments found for the specified agent email.",
    failedLoadUsers: "Failed to load users"
},
fi: {
    marketingEngine: "NØRR3",
    loginWithGoogle: "Kirjaudu Googlella",
    login: "Kirjaudu",
    emailPlaceholder: "esim. förnamn.efternamn@kiinteistomaailma.fi",
    passwordPlaceholder: "Salasana",
    searchCampaigns: "Etsi kampanjoita...",
    selectService: "Valitse palvelusi",
    campaignManagement: "Kampanjahallinta",
    userManagement: "Käyttäjät",
    back: "Takaisin",
    allStatuses: "Kaikki tilat",
    active: "Aktiivinen",
    paused: "Tauolla",
    exportCampaigns: "Vie",
    createCampaign: "Luo",
    editCampaign: "Muokkaa kampanjaa",
    campaignId: "Kampanjan tunnus",
    agent: "Välittäjä",
    includedApartments: "Sisältyvät asunnot",
    start: "Aloitus",
    end: "Lopetus",
    channels: "Kanavat",
    budget: "Budjetti",
    status: "Tila",
    actions: "Toiminnot",
    activeCampaigns: "Aktiiviset kampanjat:",
    pausedCampaigns: "Tauolla olevat kampanjat:",
    totalBudgetLabel: "Kokonaisbudjetti:",
    lastUpdated: "Viimeksi päivitetty:",
    notifications: "Ilmoitukset",
    agentInformation: "Välittäjän tiedot",
    apartmentInformation: "Asunnon tiedot",
    apartments: "Asunnot",
    dates: "Päivämäärät",
    ongoing: "Käynnissä",
    budgetAllocation: "Budjetin jakautuminen",
    totalBudget: "Kokonaisbudjetti",
    saveCampaign: "Tallenna kampanja",
    cancel: "Peruuta",
    confirmEdits: "Vahvista muutokset",
    selectApartments: "Valitse asunnot",
    apartmentDetails: "Asunnon tiedot",
    campaignDetails: "Kampanjan tiedot",
    add: "Lisää",
    moreInfo: "Lisätietoja",
    fetchCampaigns: "Hae",
    invalidCredentials: "Väärä sähköposti tai salasana, yritä uudelleen.",
    noNewNotifications: "Ei uusia ilmoituksia.",
    campaignSaved: "Kampanja tallennettu!",
    pleaseLogin: "Kirjaudu sisään nähdäksesi kampanjat.",
    noCampaigns: "Ei kampanjoita löytynyt.",
    successfullyAdded: "Asunto lisätty onnistuneesti.",
    noApartments: "Ei asuntoja löytynyt annetulle välittäjän sähköpostille.",
    failedLoadUsers: "Käyttäjien lataaminen epäonnistui"
},
sv: {
    marketingEngine: "NØRR3",
    loginWithGoogle: "Logga in med Google",
    login: "Logga in",
    emailPlaceholder: "t.ex. seppo.kairikko@kiinteistomaailma.fi",
    passwordPlaceholder: "Lösenord",
    searchCampaigns: "Sök kampanjer...",
    selectService: "Välj din tjänst",
    campaignManagement: "Kampanjhantering",
    userManagement: "Användare",
    back: "Tillbaka",
    allStatuses: "Alla statusar",
    active: "Aktiv",
    paused: "Pausad",
    exportCampaigns: "Exportera",
    createCampaign: "Skapa",
    editCampaign: "Redigera kampanj",
    campaignId: "Kampanj-ID",
    agent: "Mäklare",
    includedApartments: "Inkluderade lägenheter",
    start: "Start",
    end: "Slut",
    channels: "Kanaler",
    budget: "Budget",
    status: "Status",
    actions: "Åtgärder",
    activeCampaigns: "Aktiva kampanjer:",
    pausedCampaigns: "Pausade kampanjer:",
    totalBudgetLabel: "Total budget:",
    lastUpdated: "Senast uppdaterad:",
    notifications: "Aviseringar",
    agentInformation: "Mäklarinformation",
    apartmentInformation: "Lägenhetsinformation",
    apartments: "Lägenheter",
    dates: "Datum",
    ongoing: "Pågående",
    budgetAllocation: "Budgetfördelning",
    totalBudget: "Total budget",
    saveCampaign: "Spara kampanj",
    cancel: "Avbryt",
    confirmEdits: "Bekräfta ändringar",
    selectApartments: "Välj lägenheter",
    apartmentDetails: "Lägenhetsdetaljer",
    campaignDetails: "Kampanjdetaljer",
    add: "Lägg till",
    moreInfo: "Mer information",
    fetchCampaigns: "Hämta",
    invalidCredentials: "Fel e-post eller lösenord, försök igen.",
    noNewNotifications: "Inga nya aviseringar.",
    campaignSaved: "Kampanj sparad!",
    pleaseLogin: "Logga in för att se kampanjer.",
    noCampaigns: "Inga kampanjer hittades.",
    successfullyAdded: "Lägenheten har lagts till.",
    noApartments: "Inga lägenheter hittades för angiven mäklar-e-post.",
    failedLoadUsers: "Det gick inte att ladda användare"
}

};
let selectedApartments = [];
let allApartments = [];
let cachedCampaigns = []; // In-memory campaigns
let cachedUsers = [];     // In-memory users

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
  cachedCampaigns = []; // Clear in-memory campaigns
  cachedUsers = [];     // Clear in-memory users
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
      localStorage.setItem('partnerName', data.partnerName || 'Kiinteistömaailma Helsinki');
      localStorage.setItem('email', data.email);
      localStorage.setItem('agentName', data.agentName || '');
      localStorage.setItem('agentKey', data.agentKey || '');
      if (data.role === 'partner') {
        localStorage.setItem('agentEmail', data.email);
      }
      document.getElementById('norr3-container').style.display = 'block';
      hideAlert();
      await norr3FetchUsers(); // Fetch users from server in-memory
      await norr3FetchCampaigns(); // Fetch campaigns from Sheets
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

// Fetch campaigns from Google Sheets via API
async function norr3FetchCampaigns() {
  const token = localStorage.getItem('token');
  if (!token) {
    showAlert(translations[currentLanguage].pleaseLogin);
    return;
  }
  showLoadingScreen(true);
  try {
    const res = await fetch('/api/campaigns', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error(await res.text());
    cachedCampaigns = await res.json();
    renderCampaignList();
    norr3UpdateMetrics();
    norr3CheckNotifications();
  } catch (err) {
    showAlert('Failed to fetch campaigns: ' + err.message);
  } finally {
    showLoadingScreen(false);
  }
}

// Fetch users from server in-memory via API
async function norr3FetchUsers() {
  const token = localStorage.getItem('token');
  if (!token) {
    showAlert(translations[currentLanguage].pleaseLogin);
    return;
  }
  showLoadingScreen(true);
  try {
    const res = await fetch('/api/users', { headers: { 'Authorization': `Bearer ${token}` } });
    if (!res.ok) throw new Error(translations[currentLanguage].failedLoadUsers);
    cachedUsers = await res.json();
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
    const displayId = camp.campaign_id.slice(-4);
    const totalBudget = (camp.budget_meta + camp.budget_display + camp.budget_pdooh);
    const row = document.createElement('div');
    row.className = `norr3-table-row ${!camp.active ? 'norr3-row-off' : ''}`;
    row.setAttribute('role', 'row');
    row.innerHTML = `
      <span role="cell">${displayId}</span>
      <span role="cell">${camp.agent || ''}</span>
      <span role="cell">${(camp.apartments || []).map(a => a.key).join(', ') || ''}</span>
      <span role="cell">${formatDate(camp.campaign_start_date)}</span>
      <span role="cell">${camp.campaign_end_date ? formatDate(camp.campaign_end_date) : translations[currentLanguage].ongoing}</span>
      <span role="cell">
        ${camp.channel_meta ? '<i class="fab fa-facebook" title="Meta"></i>' : ''}
        ${camp.channel_display ? '<i class="fas fa-desktop" title="Display"></i>' : ''}
        ${camp.channel_pdooh ? '<i class="fas fa-sign" title="PDOOH"></i>' : ''}
      </span>
      <span role="cell">${totalBudget.toFixed(2)}€</span>
      <span role="cell">
        <label class="norr3-toggle-slider">
          <input type="checkbox" ${camp.active ? 'checked' : ''} onchange="norr3ToggleStatus('${camp.campaign_id}', this.checked)"/>
          <span class="norr3-slider"></span>
        </label>
      </span>
      <span role="cell">
        <i class="fas fa-info-circle norr3-info-icon" onclick="norr3ShowCampaignInfo('${camp.campaign_id}')" tabindex="0" aria-label="View campaign details"></i>
      </span>
    `;
    list.appendChild(row);
  });
}

async function norr3ToggleStatus(campaignId, checked) {
  const token = localStorage.getItem('token');
  if (!token) {
    showAlert(translations[currentLanguage].pleaseLogin);
    return;
  }
  showLoadingScreen(true);
  try {
    const res = await fetch(`/api/campaigns/status/${campaignId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ active: checked })
    });
    if (!res.ok) throw new Error(await res.text());
    const updatedCamp = await res.json();
    const campIndex = cachedCampaigns.findIndex(c => c.campaign_id === campaignId);
    if (campIndex !== -1) {
      cachedCampaigns[campIndex] = { ...cachedCampaigns[campIndex], ...updatedCamp };
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

async function norr3ShowCampaignInfo(campaignId) {
  const token = localStorage.getItem('token');
  if (!token) {
    showAlert(translations[currentLanguage].pleaseLogin);
    return;
  }
  showLoadingScreen(true);
  try {
    const res = await fetch(`/api/campaigns/${campaignId}`, { headers: { 'Authorization': `Bearer ${token}` } });
    if (!res.ok) throw new Error('Failed to load campaign details');
    const camp = await res.json();
    document.getElementById('norr3-campaign-info-modal').style.display = 'flex';
    const info = document.getElementById('norr3-campaign-info');
    info.innerHTML = `
      <h4>Campaign ID: ${camp.campaign_id}</h4>
      <p><strong>Partner ID:</strong> ${camp.partner_id || ''}</p>
      <p><strong>Partner Name:</strong> ${camp.partner_name || 'Kiinteistömaailma Helsinki'}</p>
      <p><strong>Agent:</strong> ${camp.agent || ''}</p>
      <p><strong>Agent Key:</strong> ${camp.agent_key || ''}</p>
      <p><strong>Apartment Keys:</strong> ${(camp.apartments || []).map(a => a.key).join(', ') || 'None'}</p>
      <p><strong>URL:</strong> ${camp.apartments && camp.apartments.length > 0 ? `https://www.kiinteistomaailma.fi/${camp.apartments[0].key}` : ''}</p>
      <p><strong>Address:</strong> ${camp.campaign_address || ''}</p>
      <p><strong>Postal Code:</strong> ${camp.campaign_postal_code || ''}</p>
      <p><strong>City:</strong> ${camp.campaign_city || ''}</p>
      <p><strong>Radius:</strong> ${(camp.apartments || []).map(a => a.campaign_radius || 0).join(', ') || 'N/A'} meters</p>
      <p><strong>Channels:</strong> ${[camp.channel_meta ? 'Meta' : '', camp.channel_display ? 'Display' : '', camp.channel_pdooh ? 'PDOOH' : ''].filter(Boolean).join(', ') || 'None'}</p>
      <p><strong>Budgets:</strong> Meta: ${camp.budget_meta || 0}€, Display: ${camp.budget_display || 0}€, PDOOH: ${camp.budget_pdooh || 0}€</p>
      <p><strong>Daily Budgets:</strong> Meta: ${camp.budget_meta_daily || 0}€, Display: ${camp.budget_display_daily || 0}€, PDOOH: ${camp.budget_pdooh_daily || 0}€</p>
      <p><strong>Start Date:</strong> ${formatDate(camp.campaign_start_date)}</p>
      <p><strong>End Date:</strong> ${camp.campaign_end_date ? formatDate(camp.campaign_end_date) : 'Ongoing'}</p>
      <p><strong>Active:</strong> ${camp.active ? 'Yes' : 'No'}</p>
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

// --- Campaign Creation and Editing --- //

async function norr3CreateCampaign() {
  const token = localStorage.getItem('token');
  if (!token) {
    showAlert(translations[currentLanguage].pleaseLogin);
    return;
  }
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
    document.getElementById('norr3-create-agent-email').value = ''; // Clear agent email for admin
  } else {
    document.getElementById('norr3-agent-section').style.display = 'none';
    document.getElementById('norr3-campaign-budget-section').style.display = 'none';
    // Automatically fetch apartments and populate address fields for the agent's email
    const agentEmail = localStorage.getItem('agentEmail') || '';
    if (agentEmail) {
      await norr3LoadApartmentsForAgent(agentEmail);
      await norr3PopulateApartmentDetails(); // Populate address fields for agents
    }
  }
}

async function norr3LoadApartmentsForAgent(agentEmail) {
  const token = localStorage.getItem('token');
  if (!token) {
    showAlert(translations[currentLanguage].pleaseLogin);
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
    allApartments = await res.json();
    const filtered = allApartments.filter(a => 
      (a.agentEmail || a.agencyEmail || '').toLowerCase().trim() === agentEmail.toLowerCase().trim()
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
            <div>${apt.address || ''}, ${apt.postcode || ''} ${apt.city || ''}</div>
            <div>
              <label>Radius:
                <input type="number" class="norr3-apartment-radius" data-key="${apt.key}" placeholder="Radius (meters)" disabled style="opacity:0.5;" onchange="norr3UpdateApartmentRadius(event)" />
              </label>
            </div>
          </div>
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

async function norr3PopulateApartmentDetails() {
  if (allApartments.length > 0 && !selectedApartments.length) {
    // Automatically select the first apartment for agents to populate details
    const firstApt = allApartments[0];
    selectedApartments.push({ key: firstApt.key, campaign_radius: 1500 });
    norr3RenderSelectedApartments();
    // Populate address fields in the modal
    document.getElementById('norr3-create-campaign-address').value = firstApt.address || '';
    document.getElementById('norr3-create-campaign-postal-code').value = firstApt.postcode || '';
    document.getElementById('norr3-create-campaign-city').value = firstApt.city || '';
  }
}

function norr3CloseCreateModal(event) {
  document.getElementById('norr3-create-modal').style.display = 'none';
  selectedApartments = [];
  // Clear address fields when closing
  document.getElementById('norr3-create-campaign-address').value = '';
  document.getElementById('norr3-create-campaign-postal-code').value = '';
  document.getElementById('norr3-create-campaign-city').value = '';
}

async function norr3EditCampaign(campaignId) {
  const token = localStorage.getItem('token');
  if (!token) {
    showAlert(translations[currentLanguage].pleaseLogin);
    return;
  }
  showLoadingScreen(true);
  try {
    const res = await fetch(`/api/campaigns/${campaignId}`, { headers: { 'Authorization': `Bearer ${token}` } });
    if (!res.ok) throw new Error('Failed to load campaign');
    const campaign = await res.json();
    const aptRes = await fetch('/api/apartments', { headers: { 'Authorization': `Bearer ${token}` } });
    if (!aptRes.ok) throw new Error('Failed to load apartments');
    const apartments = await aptRes.json();
    let storedEmail = localStorage.getItem('role') === 'admin'
      ? document.getElementById('norr3-create-agent-email').value.trim().toLowerCase()
      : (localStorage.getItem('agentEmail') || '').toLowerCase().trim();
    allApartments = apartments.filter(a =>
      (a.agentEmail || a.agencyEmail || '').toLowerCase().trim() === storedEmail
    );
    document.getElementById('norr3-edit-modal').style.display = 'flex';
    document.getElementById('norr3-edit-modal').setAttribute('data-campaign-id', campaign.campaign_id);
    document.getElementById('norr3-modal-start-date').value = (campaign.campaign_start_date || '').split('T')[0];
    if (campaign.campaign_end_date) {
      document.getElementById('norr3-modal-end-date').value = campaign.campaign_end_date.split('T')[0];
      document.getElementById('norr3-modal-ongoing').checked = false;
      document.getElementById('norr3-modal-end-date').disabled = false;
    } else {
      document.getElementById('norr3-modal-end-date').value = '';
      document.getElementById('norr3-modal-ongoing').checked = true;
      document.getElementById('norr3-modal-end-date').disabled = true;
    }
    selectedApartments = (campaign.apartments || []).map(a => ({
      key: a.key,
      campaign_radius: a.campaign_radius || 1500
    }));
    if (localStorage.getItem('role') === 'admin') {
      norr3RenderSelectedApartments();
      // Pre-fill agent email if it exists in the campaign
      const agentEmail = allApartments.find(a => a.agentEmail === campaign.agent_key)?.agentEmail || '';
      document.getElementById('norr3-create-agent-email').value = agentEmail;
    } else {
      norr3RenderSelectedApartments();
      // Populate address fields for agents in edit mode
      const firstApt = allApartments.find(a => a.key === selectedApartments[0]?.key);
      if (firstApt) {
        document.getElementById('norr3-create-campaign-address').value = firstApt.address || '';
        document.getElementById('norr3-create-campaign-postal-code').value = firstApt.postcode || '';
        document.getElementById('norr3-create-campaign-city').value = firstApt.city || '';
      }
    }
  } catch (err) {
    showAlert('Failed to load campaign for editing: ' + err.message);
  } finally {
    showLoadingScreen(false);
  }
}

function norr3CloseModal(event) {
  document.getElementById('norr3-edit-modal').style.display = 'none';
  selectedApartments = [];
  // Clear address fields when closing
  document.getElementById('norr3-create-campaign-address').value = '';
  document.getElementById('norr3-create-campaign-postal-code').value = '';
  document.getElementById('norr3-create-campaign-city').value = '';
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

  let agentEmail = localStorage.getItem('role') === 'admin'
    ? document.getElementById('norr3-create-agent-email')?.value.trim().toLowerCase() || ''
    : (localStorage.getItem('agentEmail') || '').toLowerCase().trim();
  let agentInfo = {};

  // Fetch agent info if agentEmail exists
  if (agentEmail) {
    try {
      const agentRes = await fetch(`/api/agent-info?email=${encodeURIComponent(agentEmail)}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!agentRes.ok) throw new Error('Failed to fetch agent info');
      agentInfo = await agentRes.json();
    } catch (err) {
      console.error('Error fetching agent info:', err);
      showAlert('Failed to fetch agent information: ' + err.message);
      showLoadingScreen(false);
      return;
    }
  }

  let campAddress = '', campPost = '', campCity = ''; // Use empty strings or real values
  const firstApt = allApartments.find(a => a.key === selectedApartments[0].key);
  if (firstApt) {
    campAddress = firstApt.address || '';
    campPost = firstApt.postcode || '';
    campCity = firstApt.city || '';
  } else {
    // Use input fields for address if manually entered by admin
    campAddress = document.getElementById('norr3-create-campaign-address')?.value || '';
    campPost = document.getElementById('norr3-create-campaign-postal-code')?.value || '';
    campCity = document.getElementById('norr3-create-campaign-city')?.value || '';
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
  }
  const decoded = jwtDecode(token);
  const agentName = agentInfo.name || decoded.agentName || '';
  const agentKey = agentInfo.key || decoded.agentKey || '';

  // Calculate days for daily budgets (default to 30 if ongoing or no end date)
  const start = new Date(startDate);
  const end = ongoing || !endDate ? new Date(start.getTime() + 30 * 24 * 60 * 60 * 1000) : new Date(endDate);
  const days = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));

  const campaignData = {
    campaign_id: campaignId || Math.random().toString(36).substr(2, 9), // Simple unique ID for campaign_id
    partner_id: Math.random().toString(36).substr(2, 9), // Simple unique ID for partner_id
    partner_name: localStorage.getItem('partnerName') || 'Kiinteistömaailma Helsinki',
    agent: agentName,
    agent_key: agentKey,
    campaign_address: campAddress,
    campaign_postal_code: campPost,
    campaign_city: campCity,
    campaign_start_date: startDate,
    campaign_end_date: ongoing ? null : endDate,
    active: true,
    channel_meta: combinedChannels.has('meta') ? 1 : 0,
    channel_display: combinedChannels.has('display') ? 1 : 0,
    channel_pdooh: combinedChannels.has('pdooh') ? 1 : 0,
    budget_meta: combinedBudget.meta,
    budget_display: combinedBudget.display,
    budget_pdooh: combinedBudget.pdooh,
    budget_meta_daily: (combinedBudget.meta / days).toFixed(2),
    budget_display_daily: (combinedBudget.display / days).toFixed(2),
    budget_pdooh_daily: (combinedBudget.pdooh / days).toFixed(2)
  };
  const apartmentsData = selectedApartments.map(apt => ({
    key: apt.key,
    campaign_radius: apt.campaign_radius || 1500
  })) || [];
  console.log('Campaign data being sent:', JSON.stringify(campaignData, null, 2));
  console.log('Apartments data being sent:', JSON.stringify(apartmentsData, null, 2));
  try {
    const method = campaignId ? 'PUT' : 'POST';
    const res = await fetch(`/api/campaigns/${method === 'PUT' ? campaignId : ''}`, {
      method: method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ campaign: campaignData, apartments: apartmentsData })
    });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error saving campaign: ${errorText || 'Unknown error'}`);
    }
    const savedCampaign = await res.json();
    if (isCreate) {
      document.getElementById('norr3-create-modal').style.display = 'none';
    } else {
      document.getElementById('norr3-edit-modal').style.display = 'none';
    }
    selectedApartments = [];
    await norr3FetchCampaigns(); // Refresh from Sheets
    norr3UpdateMetrics();
    norr3CheckNotifications();
    showAlert(translations[currentLanguage].campaignSaved);
  } catch (err) {
    console.error('Error saving campaign:', err);
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
  const container = document.getElementById('norr3-apartments-table');
  container.innerHTML = '';
  selectedApartments.forEach(ap => {
    const apt = allApartments.find(a => a.key === ap.key) || {};
    const row = document.createElement('div');
    row.className = 'norr3-apartment-row';
    row.innerHTML = `
      <input type="checkbox" class="norr3-apartment-checkbox" data-key="${ap.key}" checked onchange="norr3ToggleApartmentSelection(event)" />
      <img src="${getThumbnailUrl(apt)}" alt="${apt.address || 'Apartment'}" style="width:50px; height:auto;" loading="lazy">
      <span>${apt.address || ''}, ${apt.postcode || ''} ${apt.city || ''}</span>
      <a href="https://www.kiinteistomaailma.fi/${ap.key}" target="_blank"><i class="fas fa-link"></i></a>
      <input type="number" class="norr3-apartment-radius" data-key="${ap.key}" value="${ap.campaign_radius || 1500}" placeholder="Radius (meters)" onchange="norr3UpdateApartmentRadius(event)" />
    `;
    container.appendChild(row);
  });
}

// --- Apartment Selection Functions --- //

async function norr3LoadApartments() {
  const token = localStorage.getItem('token');
  if (!token) {
    showAlert(translations[currentLanguage].pleaseLogin);
    return;
  }
  const agentEmail = localStorage.getItem('role') === 'admin'
    ? document.getElementById('norr3-create-agent-email').value.trim().toLowerCase()
    : (localStorage.getItem('agentEmail') || '').toLowerCase().trim();
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
    allApartments = await res.json();
    const filtered = allApartments.filter(a => 
      (a.agentEmail || a.agencyEmail || '').toLowerCase().trim() === agentEmail.toLowerCase().trim()
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
            <div>${apt.address || ''}, ${apt.postcode || ''} ${apt.city || ''}</div>
            <div>
              <label>Radius:
                <input type="number" class="norr3-apartment-radius" data-key="${apt.key}" placeholder="Radius (meters)" disabled style="opacity:0.5;" onchange="norr3UpdateApartmentRadius(event)" />
              </label>
            </div>
          </div>
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
      selectedApartments.push({ key: key, campaign_radius: parseInt(radiusInput.value) || 1500 });
    }
    // Update address fields when an apartment is selected
    const apt = allApartments.find(a => a.key === key);
    if (apt) {
      document.getElementById('norr3-create-campaign-address').value = apt.address || '';
      document.getElementById('norr3-create-campaign-postal-code').value = apt.postcode || '';
      document.getElementById('norr3-create-campaign-city').value = apt.city || '';
    }
  } else {
    radiusInput.disabled = true;
    radiusInput.style.opacity = '0.5';
    selectedApartments = selectedApartments.filter(a => a.key !== key);
    // Revert to the first selected apartment's details or clear if none selected
    if (selectedApartments.length > 0) {
      const firstApt = allApartments.find(a => a.key === selectedApartments[0].key);
      document.getElementById('norr3-create-campaign-address').value = firstApt?.address || '';
      document.getElementById('norr3-create-campaign-postal-code').value = firstApt?.postcode || '';
      document.getElementById('norr3-create-campaign-city').value = firstApt?.city || '';
    } else {
      document.getElementById('norr3-create-campaign-address').value = '';
      document.getElementById('norr3-create-campaign-postal-code').value = '';
      document.getElementById('norr3-create-campaign-city').value = '';
    }
  }
}

function norr3UpdateApartmentRadius(e) {
  const input = e.target;
  const key = input.getAttribute('data-key');
  const apt = selectedApartments.find(a => a.key === key);
  if (apt) {
    apt.campaign_radius = parseInt(input.value) || 1500;
  }
}

// --- Apartment Info Popup --- //

async function norr3ShowApartmentInfo(key) {
  const token = localStorage.getItem('token');
  if (!token) {
    showAlert(translations[currentLanguage].pleaseLogin);
    return;
  }
  showLoadingScreen(true);
  try {
    const apt = allApartments.find(a => a.key === key);
    if (!apt) throw new Error('Apartment not found');
    document.getElementById('norr3-apartment-info-modal').style.display = 'flex';
    const info = document.getElementById('norr3-apartment-info');
    const images = apt.images || [];
    const imageSlider = images.map(img => `
      <img src="${img.url || 'https://via.placeholder.com/400'}" alt="${apt.address || 'Apartment Image'}" style="max-height: 400px; width: auto; margin: 5px;" loading="lazy">
    `).join('');
    info.innerHTML = `
      <h4>Apartment Details</h4>
      <p><strong>Address:</strong> ${apt.address || ''}</p>
      <p><strong>Postal Code:</strong> ${apt.postcode || ''}</p>
      <p><strong>City:</strong> ${apt.city || ''}</p>
      <div class="norr3-image-slider" style="overflow-x: auto; white-space: nowrap;">
        ${imageSlider}
      </div>
    `;
  } catch (err) {
    console.error('Error loading apartment details:', err);
    showAlert('Failed to load apartment details: ' + err.message);
  } finally {
    showLoadingScreen(false);
  }
}

function norr3CloseApartmentInfoModal(event) {
  document.getElementById('norr3-apartment-info-modal').style.display = 'none';
}

// --- User Management Functions --- //

function norr3UserManagement() {
  document.getElementById('norr3-user-management-modal').style.display = 'flex';
  norr3RenderUsers(); // Fetch and display users from server in-memory
}

async function norr3RenderUsers() {
  const token = localStorage.getItem('token');
  if (!token || localStorage.getItem('role') !== 'admin') return;
  showLoadingScreen(true);
  try {
    const res = await fetch('/api/users', { headers: { 'Authorization': `Bearer ${token}` } });
    if (!res.ok) throw new Error(translations[currentLanguage].failedLoadUsers);
    cachedUsers = await res.json();
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
    cachedUsers.forEach(u => {
      const row = document.createElement('div');
      row.className = 'norr3-user-item';
      row.innerHTML = `
        <span>${u.email || ''}</span>
        <span>${u.partnerName || ''}</span>
        <span>${u.agentName || ''}</span>
        <span>${u.agentKey || ''}</span>
        <span><img src="${u.agentImage || 'https://via.placeholder.com/50'}" alt="${u.agentName || 'Agent'}" style="width:40px; height:auto;"></span>
        <span>${u.role || ''}</span>
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

// Open the Add User modal
function norr3OpenAddUser() {
  document.getElementById('norr3-add-user-modal').style.display = 'flex';
  // Clear form fields
  document.getElementById('norr3-add-user-email').value = '';
  document.getElementById('norr3-add-user-password').value = '';
  document.getElementById('norr3-add-user-name').value = '';
  document.getElementById('norr3-add-user-agent-key').value = '';
  document.getElementById('norr3-add-user-agent-image').value = '';
  document.getElementById('norr3-add-user-role').value = 'partner';
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
    const newUser = { email, password, partnerName: name, agentName: name, agentKey, agentImage, role };
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    });
    if (!res.ok) throw new Error(await res.text());
    await norr3FetchUsers(); // Refresh users from server in-memory
    showAlert('User added successfully!');
    norr3CloseAddUser();
  } catch (err) {
    showAlert('Error adding user: ' + err.message);
  } finally {
    showLoadingScreen(false);
  }
}

async function norr3RemoveUser(email) {
  const token = localStorage.getItem('token');
  if (!token || localStorage.getItem('role') !== 'admin') {
    showAlert('Only admins can remove users.');
    return;
  }
  showLoadingScreen(true);
  try {
    const res = await fetch(`/api/users/${encodeURIComponent(email)}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error(await res.text());
    await norr3FetchUsers(); // Refresh users from server in-memory
    showAlert('User removed successfully!');
  } catch (err) {
    showAlert('Error removing user: ' + err.message);
  } finally {
    showLoadingScreen(false);
  }
}

async function norr3EditUser(email) {
  const token = localStorage.getItem('token');
  if (!token || localStorage.getItem('role') !== 'admin') {
    showAlert('Only admins can edit users.');
    return;
  }
  showLoadingScreen(true);
  try {
    const partnerName = prompt('Enter new Partner Name:', '');
    const agentName = prompt('Enter new Agent Name:', '');
    const agentKey = prompt('Enter new Agent Key:', '');
    const agentImage = prompt('Enter new Agent Image URL (optional):', '');
    const password = prompt('Enter new Password (optional):', '');
    if (!partnerName && !agentName && !agentKey && !agentImage && !password) {
      showAlert('No changes provided.');
      return;
    }
    const user = {};
    if (partnerName) user.partnerName = partnerName;
    if (agentName) user.agentName = agentName;
    if (agentKey) user.agentKey = agentKey;
    if (agentImage) user.agentImage = agentImage;
    if (password) user.password = password;
    const res = await fetch(`/api/users/${encodeURIComponent(email)}`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    if (!res.ok) throw new Error(await res.text());
    await norr3FetchUsers(); // Refresh users from server in-memory
    showAlert('User edited successfully!');
  } catch (err) {
    showAlert('Error editing user: ' + err.message);
  } finally {
    showLoadingScreen(false);
  }
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

// Placeholder functions for missing references
function norr3UpdateMetrics() {
  console.warn('norr3UpdateMetrics is not implemented');
}

function norr3CheckNotifications() {
  console.warn('norr3CheckNotifications is not implemented');
}

function norr3ShowNotifications() {
  console.warn('norr3ShowNotifications is not implemented');
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
    norr3FetchUsers(); // Fetch initial users from server in-memory
    norr3FetchCampaigns(); // Fetch initial campaigns from Sheets
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
    norr3FetchUsers(); // Fetch initial users from server in-memory
    norr3FetchCampaigns(); // Fetch initial campaigns from Sheets
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