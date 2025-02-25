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
    fetchCampaigns: "Fetch", // New translation for the button
    invalidCredentials: "Wrong email or password, please try again.",
    noNewNotifications: "No new notifications.",
    campaignSaved: "Campaign saved!",
    pleaseLogin: "Please log in to view campaigns.",
    noCampaigns: "No campaigns found.",
    successfullyAdded: "Successfully added apartment.",
    noApartments: "No apartments found for your agency email."
  },
  fi: {
    marketingEngine: "NØRR3",
    loginWithGoogle: "Kirjaudu Googlella",
    login: "Kirjaudu",
    emailPlaceholder: "esim. seppo.kairikko@kiinteistomaailma.fi",
    passwordPlaceholder: "Salasana",
    searchCampaigns: "Hae kampanjoita...",
    selectService: "Valitse Palvelusi",
    campaignManagement: "Kampanjahallinta",
    userManagement: "Käyttäjähallinta",
    back: "Takaisin",
    allStatuses: "Kaikki Tilat",
    active: "Aktiivinen",
    paused: "Pysäytetty",
    exportCampaigns: "Vie",
    createCampaign: "Luo",
    editCampaign: "Muokkaa Kampanjaa",
    campaignId: "Kampanjan ID",
    agent: "Asiamies",
    includedApartments: "Sisältyvät Asuntoavainten",
    start: "Alku",
    end: "Loppu",
    channels: "Kanavat",
    budget: "Budjetti",
    status: "Tila",
    actions: "Toiminnot",
    activeCampaigns: "Aktiiviset Kampanjat:",
    pausedCampaigns: "Pysäytetyt Kampanjat:",
    totalBudgetLabel: "Kokonaisbudjetti:",
    lastUpdated: "Viimeksi Päivitetty:",
    notifications: "Ilmoitukset",
    agentInformation: "Asiamiehen Tiedot",
    apartmentInformation: "Asunnon Tiedot",
    apartments: "Asunnot",
    dates: "Päivät",
    ongoing: "Käynnissä",
    budgetAllocation: "Budjetin Jakautuminen",
    totalBudget: "Kokonaisbudjetti",
    saveCampaign: "Tallenna Kampanja",
    cancel: "Peruuta",
    confirmEdits: "Vahvista Muokkaukset",
    selectApartments: "Valitse Asunnot",
    apartmentDetails: "Asunnon Tiedot",
    campaignDetails: "Kampanjan Tiedot",
    add: "Lisää",
    moreInfo: "Lisätietoja",
    fetchCampaigns: "Hae", // New translation for the button
    invalidCredentials: "Väärä sähköposti tai salasana, yritä uudelleen.",
    noNewNotifications: "Ei uusia ilmoituksia.",
    campaignSaved: "Kampanja tallennettu!",
    pleaseLogin: "Kirjaudu nähdäksesi kampanjat.",
    noCampaigns: "Kampanjoita ei löytynyt.",
    successfullyAdded: "Asunto lisätty onnistuneesti.",
    noApartments: "Ei asuntoja löydetty agenttisi sähköpostilla."
  },
  sv: {
    marketingEngine: "NØRR3",
    loginWithGoogle: "Logga in med Google",
    login: "Logga in",
    emailPlaceholder: "t.ex. seppo.kairikko@kiinteistomaailma.fi",
    passwordPlaceholder: "Lösenord",
    searchCampaigns: "Sök kampanjer...",
    selectService: "Välj Din Tjänst",
    campaignManagement: "Kampanjhantering",
    userManagement: "Användarhantering",
    back: "Tillbaka",
    allStatuses: "Alla Statusar",
    active: "Aktiv",
    paused: "Pausad",
    exportCampaigns: "Exportera",
    createCampaign: "Skapa",
    editCampaign: "Redigera Kampanj",
    campaignId: "Kampanj-ID",
    agent: "Agent",
    includedApartments: "Inkluderade Lägenhetsnycklar",
    start: "Start",
    end: "Slut",
    channels: "Kanaler",
    budget: "Budget",
    status: "Status",
    actions: "Åtgärder",
    activeCampaigns: "Aktiva Kampanjer:",
    pausedCampaigns: "Pausade Kampanjer:",
    totalBudgetLabel: "Total Budget:",
    lastUpdated: "Senast Uppdaterad:",
    notifications: "Meddelanden",
    agentInformation: "Agentinformation",
    apartmentInformation: "Lägenhetsinformation",
    apartments: "Lägenheter",
    dates: "Datum",
    ongoing: "Pågående",
    budgetAllocation: "Budgetfördelning",
    totalBudget: "Total Budget",
    saveCampaign: "Spara Kampanj",
    cancel: "Avbryt",
    confirmEdits: "Bekräfta Redigeringar",
    selectApartments: "Välj Lägenheter",
    apartmentDetails: "Lägenhetsdetaljer",
    campaignDetails: "Kampanjdetaljer",
    add: "Lägg Till",
    moreInfo: "Mer Info",
    fetchCampaigns: "Hämta", // New translation for the button
    invalidCredentials: "Fel e-post eller lösenord, försök igen.",
    noNewNotifications: "Inga nya meddelanden.",
    campaignSaved: "Kampanj sparad!",
    pleaseLogin: "Logga in för att visa kampanjer.",
    noCampaigns: "Inga kampanjer hittades.",
    successfullyAdded: "Lägenhet tillagd framgångsrikt.",
    noApartments: "Inga lägenheter hittades för din agent-e-post."
  }
};

let selectedApartments = [];
let allApartments = [];

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
      localStorage.setItem('agentEmail', data.email);
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

// Update at the top of script.js (replace the existing `let cachedCampaigns = []`)
let cachedCampaigns = JSON.parse(localStorage.getItem('cachedCampaigns')) || [];

// Update norr3FetchCampaigns to store and retrieve from localStorage
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

    // Filter campaigns by the logged-in user's agentKey and cache them
    cachedCampaigns = camps.filter(c => (c.agent_key || '').toLowerCase() === agentKey.toLowerCase());
    localStorage.setItem('cachedCampaigns', JSON.stringify(cachedCampaigns)); // Persist to localStorage

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
    norr3UpdateMetrics();
    norr3CheckNotifications();
  } catch (err) {
    showAlert('Failed to fetch campaigns: ' + err.message);
  } finally {
    showLoadingScreen(false);
  }
}

// Update norr3ToggleStatus to use cachedCampaigns
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
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP error! Status: ${res.status}, ${errorText}`);
    }

    // Update cached campaign with server response
    const updatedCamp = await res.json();
    const campIndex = cachedCampaigns.findIndex(c => c.id === id);
    if (campIndex !== -1) {
      cachedCampaigns[campIndex] = { ...cachedCampaigns[campIndex], ...updatedCamp, status: checked ? 1 : 0 };
    } else {
      // If not found, refetch campaigns to ensure sync
      await norr3FetchCampaigns();
    }
    localStorage.setItem('cachedCampaigns', JSON.stringify(cachedCampaigns)); // Update localStorage

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
    norr3UpdateMetrics();
    norr3CheckNotifications();
  } catch (err) {
    console.error('Error toggling campaign status:', err); // Log for debugging
    showAlert('Error toggling campaign status: ' + err.message);
  } finally {
    showLoadingScreen(false);
  }
}

// Update norr3ShowCampaignInfo to use cachedCampaigns
async function norr3ShowCampaignInfo(id) {
  const token = localStorage.getItem('token');
  if (!token) {
    showAlert(translations[currentLanguage].pleaseLogin);
    return;
  }
  showLoadingScreen(true);
  try {
    // Use cached campaigns
    const camp = cachedCampaigns.find(c => c.id === id);
    if (!camp) {
      showAlert('Campaign not found in memory. Please fetch campaigns again.');
      return;
    }
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
    console.error('Error loading campaign details:', err); // Log for debugging
    showAlert('Failed to load campaign details: ' + err.message);
  } finally {
    showLoadingScreen(false);
  }
}

// Update window.onload to clear cachedCampaigns on logout
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
    localStorage.setItem('agentEmail', 'seppo.kairikko@kiinteistomaailma.fi');
    document.getElementById('norr3-container').style.display = 'block';
    if (localStorage.getItem('role') === 'admin') {
      showSection('norr3-service-selection');
      document.getElementById('norr3-user-management-btn').style.display = 'inline-block';
      document.getElementById('norr3-back-button').style.display = 'inline-block';
    } else {
      showSection('norr3-campaign-setup');
      document.getElementById('norr3-user-management-btn').style.display = 'none';
      document.getElementById('norr3-back-button').style.display = 'none';
      // Load cached campaigns if they exist, otherwise show "No campaigns found"
      const list = document.getElementById('norr3-campaign-list');
      if (cachedCampaigns.length > 0) {
        list.innerHTML = '';
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
        norr3UpdateMetrics();
        norr3CheckNotifications();
      } else {
        list.innerHTML = `<p role="status">${translations[currentLanguage].noCampaigns}</p>`;
      }
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
      // Load cached campaigns if they exist, otherwise show "No campaigns found"
      const list = document.getElementById('norr3-campaign-list');
      if (cachedCampaigns.length > 0) {
        list.innerHTML = '';
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
        norr3UpdateMetrics();
        norr3CheckNotifications();
      } else {
        list.innerHTML = `<p role="status">${translations[currentLanguage].noCampaigns}</p>`;
      }
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

  // Clear cached campaigns on logout or page close
  window.addEventListener('unload', () => {
    cachedCampaigns = [];
  });
  norr3Logout = function() {
    showLoadingScreen(true);
    cachedCampaigns = []; // Clear campaigns on logout
    localStorage.clear();
    document.getElementById('norr3-container').style.display = 'none';
    showSection('norr3-login-section');
    document.getElementById('norr3-email').value = '';
    document.getElementById('norr3-password').value = '';
    showLoadingScreen(false);
  };
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

    // Update status in Google Sheet
    const decoded = jwtDecode(token);
    const agentKey = decoded.agentKey || '';
    const campaignsFromSheet = await fetch('/api/campaigns', { headers: { 'Authorization': `Bearer ${token}` } })
      .then(res => res.json())
      .then(camps => camps.filter(c => (c.agent_key || '').toLowerCase() === agentKey.toLowerCase()));
    const camp = campaignsFromSheet.find(c => c.id === id);
    if (camp) {
      const accessToken = await refreshGoogleToken(); // You need to define this function here or import it
      const sheetResp = await axios.get(
        `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/LIVE`,
        { headers: { 'Authorization': `Bearer ${accessToken}` } }
      );
      const values = sheetResp.data.values || [];
      const rowIndex = values.findIndex(row => row[0] === id);
      if (rowIndex !== -1) {
        values[rowIndex][22] = checked ? '1' : '0'; // Update status column (index 22)
        await axios.put(
          `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/LIVE!A${rowIndex + 2}:W${rowIndex + 2}?valueInputOption=RAW`,
          { values: [values[rowIndex]] },
          { headers: { 'Authorization': `Bearer ${accessToken}` } }
        );
      }
    }

    await norr3FetchCampaigns(); // Refresh the displayed campaigns
    norr3UpdateMetrics();
    norr3CheckNotifications();
  } catch (err) {
    showAlert('Error toggling campaign status: ' + err.message);
  } finally {
    showLoadingScreen(false);
  }
}

function norr3ExportCampaigns() {
  const token = localStorage.getItem('token');
  if (!token) {
    showAlert(translations[currentLanguage].pleaseLogin);
    return;
  }
  showLoadingScreen(true);
  fetch('/api/campaigns', { headers: { 'Authorization': `Bearer ${token}` } })
    .then(res => res.json())
    .then(camps => {
      const headers = [
        translations[currentLanguage].campaignId,
        translations[currentLanguage].agent,
        translations[currentLanguage].includedApartments,
        'Start Date',
        'End Date',
        translations[currentLanguage].status,
        'Meta',
        'Display',
        'PDOOH'
      ];
      const rows = camps.map(c => {
        const start = formatDate(c.start_date);
        const end = c.end_date ? formatDate(c.end_date) : (translations[currentLanguage].ongoing || 'Ongoing');
        return [
          c.id,
          c.agent_name || 'Unknown Agent',
          (c.apartments || []).map(a => a.key).join(', '),
          start,
          end,
          c.status ? (translations[currentLanguage].active || 'Active') : (translations[currentLanguage].paused || 'Paused'),
          c.budget.meta || 0,
          c.budget.display || 0,
          c.budget.pdooh || 0
        ];
      });
      let csvContent = headers.join(",") + "\n";
      rows.forEach(r => csvContent += r.join(",") + "\n");
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'campaigns.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    })
    .catch(err => showAlert('Failed to export campaigns: ' + err.message))
    .finally(() => showLoadingScreen(false));
}

async function norr3CreateCampaign() {
  const token = localStorage.getItem('token');
  if (!token) {
    showAlert(translations[currentLanguage].pleaseLogin);
    return;
  }
  selectedApartments = [];
  document.getElementById('norr3-selected-apartments').innerHTML = '';
  document.getElementById('norr3-create-modal').style.display = 'flex';
  document.getElementById('norr3-create-start-date').value = '';
  document.getElementById('norr3-create-end-date').value = '';
  document.getElementById('norr3-create-ongoing').checked = false;
  document.getElementById('norr3-create-end-date').disabled = false;
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
    const storedEmail = (localStorage.getItem('agentEmail') || '').toLowerCase().trim();
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
      radius: a.radius || 1500,
      channels: a.channels || [],
      budget: a.budget || { meta: 0, display: 0, pdooh: 0 }
    }));
    updateSelectedApartments();
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
  const combinedBudget = { meta: 0, display: 0, pdooh: 0 };
  selectedApartments.forEach(a => {
    a.channels.forEach(ch => combinedChannels.add(ch));
    combinedBudget.meta += (a.budget.meta || 0);
    combinedBudget.display += (a.budget.display || 0);
    combinedBudget.pdooh += (a.budget.pdooh || 0);
  });
  // Get agent details from token payload
  const decoded = jwtDecode(token);
  const agentName = decoded.agentName || 'Unknown Agent';
  const agentKey = decoded.agentKey || 'Unknown';
  const campaignData = {
    id: campaignId || Date.now().toString(),
    partner_id: 1,
    partnerName: localStorage.getItem('partnerName') || 'Kiinteistömaailma Helsinki',
    agent_name: agentName,
    agent_key: agentKey,
    apartments: selectedApartments,
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
    // Do not call /api/sheets/update here to avoid double posting
    if (isCreate) {
      document.getElementById('norr3-create-modal').style.display = 'none';
    } else {
      document.getElementById('norr3-edit-modal').style.display = 'none';
    }
    selectedApartments = [];
    await norr3FetchCampaigns(); // Use fetch campaigns instead of render
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

async function norr3AddApartment() {
  const token = localStorage.getItem('token');
  if (!token) {
    showAlert(translations[currentLanguage].pleaseLogin);
    return;
  }
  showLoadingScreen(true);
  try {
    const res = await fetch('/api/apartments', { headers: { 'Authorization': `Bearer ${token}` } });
    if (!res.ok) throw new Error(`Failed to load apartments (Status: ${res.status})`);
    const apartments = await res.json();
    const storedEmail = (localStorage.getItem('agentEmail') || '').toLowerCase().trim();
    const filteredApartments = apartments.filter(a =>
      (a.agentEmail || a.agencyEmail || '').toLowerCase().trim() === storedEmail
    );
    if (!filteredApartments.length) {
      showAlert(translations[currentLanguage].noApartments);
      return;
    }
    allApartments = filteredApartments;
    document.getElementById('norr3-apartment-modal').style.display = 'flex';
    const aptList = document.getElementById('norr3-apartment-list');
    aptList.innerHTML = '';
    filteredApartments.forEach(apt => {
      const row = document.createElement('div');
      row.className = 'norr3-apartment-row';
      row.innerHTML = `
        <input type="radio" name="selected-apartment" value="${apt.key}" onchange="norr3SelectApartment(${apt.key})"/>
        <img src="${getThumbnailUrl(apt)}" alt="${apt.address || 'Apartment'}" style="width:80px; height:auto;" loading="lazy">
        <span>${apt.address || 'Unknown Address'}, ${apt.postcode || ''} ${apt.city || ''}</span>
        <span><a href="https://www.kiinteistomaailma.fi/${apt.key}" target="_blank">Link</a></span>
        <i class="fas fa-info-circle norr3-info-icon" onclick="norr3ShowApartmentInfo(${apt.key})"></i>
      `;
      aptList.appendChild(row);
    });
  } catch (err) {
    showAlert('Failed to load apartments for selection: ' + err.message);
  } finally {
    showLoadingScreen(false);
  }
}

function norr3SelectApartment(key) {
  localStorage.setItem('tempApartment', JSON.stringify(key));
  document.getElementById('norr3-apartment-radius').value = '1500';
  ['meta', 'display', 'pdooh'].forEach(ch => {
    const checkbox = document.querySelector(`#norr3-apartment-modal input[value="${ch}"]`);
    if (checkbox) checkbox.checked = false;
    const budgetInput = document.getElementById(`norr3-apartment-budget-${ch}`);
    if (budgetInput) {
      budgetInput.value = 0;
      budgetInput.disabled = true;
      budgetInput.style.opacity = '0.5';
    }
  });
}

function norr3UpdateApartmentChannels() {
  ['meta', 'display', 'pdooh'].forEach(ch => {
    const checkbox = document.querySelector(`#norr3-apartment-modal input[value="${ch}"]`);
    const budgetInput = document.getElementById(`norr3-apartment-budget-${ch}`);
    if (checkbox && budgetInput) {
      if (checkbox.checked) {
        budgetInput.disabled = false;
        budgetInput.style.opacity = '1';
      } else {
        budgetInput.disabled = true;
        budgetInput.style.opacity = '0.5';
        budgetInput.value = 0;
      }
    }
  });
}

function norr3AddSelectedApartment() {
  const tempKey = JSON.parse(localStorage.getItem('tempApartment') || 'null');
  if (!tempKey) {
    showAlert('Please select an apartment first.');
    return;
  }
  if (selectedApartments.some(a => String(a.key) === String(tempKey))) {
    showAlert('Apartment already selected.');
    return;
  }
  const radiusVal = document.getElementById('norr3-apartment-radius').value || '1500';
  const metaChecked = document.querySelector(`#norr3-apartment-modal input[value="meta"]`).checked;
  const displayChecked = document.querySelector(`#norr3-apartment-modal input[value="display"]`).checked;
  const pdoohChecked = document.querySelector(`#norr3-apartment-modal input[value="pdooh"]`).checked;
  const aptData = {
    key: tempKey,
    radius: parseInt(radiusVal, 10) || 1500,
    channels: [],
    budget: {
      meta: parseFloat(document.getElementById('norr3-apartment-budget-meta').value) || 0,
      display: parseFloat(document.getElementById('norr3-apartment-budget-display').value) || 0,
      pdooh: parseFloat(document.getElementById('norr3-apartment-budget-pdooh').value) || 0
    }
  };
  if (metaChecked) aptData.channels.push('meta');
  if (displayChecked) aptData.channels.push('display');
  if (pdoohChecked) aptData.channels.push('pdooh');
  selectedApartments.push(aptData);
  norr3CloseApartmentModal();
  updateSelectedApartments();
  localStorage.removeItem('tempApartment');
  showAlert(translations[currentLanguage].successfullyAdded);
}

function norr3CloseApartmentModal(event) {
  document.getElementById('norr3-apartment-modal').style.display = 'none';
}

function updateSelectedApartments() {
  const container = document.getElementById('norr3-selected-apartments');
  container.innerHTML = '';
  selectedApartments.forEach(apt => {
    const full = allApartments.find(a => String(a.key) === String(apt.key)) || {};
    const div = document.createElement('div');
    div.className = 'norr3-apartment-item';
    div.innerHTML = `
      <img src="${getThumbnailUrl(full)}" alt="${full.address || 'Apartment'}" style="width:80px; height:auto;" loading="lazy">
      <span>${full.address || 'Unknown Address'}, ${full.postcode || ''} ${full.city || ''}</span>
      <span><a href="https://www.kiinteistomaailma.fi/${full.key}" target="_blank">Link</a></span>
      <span>Radius: ${apt.radius}</span>
      <span>Channels: ${apt.channels.join(', ') || 'None'}</span>
      <span>Budgets: Meta: ${apt.budget.meta}, Display: ${apt.budget.display}, PDOOH: ${apt.budget.pdooh}</span>
      <i class="fas fa-info-circle norr3-info-icon" onclick="norr3ShowApartmentInfo(${full.key})"></i>
      <button class="norr3-btn-primary" onclick="norr3RemoveApartment('${full.key}')">Remove</button>
    `;
    container.appendChild(div);
  });
}

function norr3RemoveApartment(key) {
  selectedApartments = selectedApartments.filter(a => String(a.key) !== String(key));
  updateSelectedApartments();
}

async function norr3ShowApartmentInfo(key) {
  const token = localStorage.getItem('token');
  if (!token) {
    showAlert(translations[currentLanguage].pleaseLogin);
    return;
  }
  showLoadingScreen(true);
  try {
    const res = await fetch('/api/apartments', { headers: { 'Authorization': `Bearer ${token}` } });
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

function norr3CloseApartmentInfoModal(event) {
  document.getElementById('norr3-apartment-info-modal').style.display = 'none';
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
    showAlert('Failed to load campaign details: ' + err.message);
  } finally {
    showLoadingScreen(false);
  }
}

function norr3CloseCampaignInfoModal(event) {
  document.getElementById('norr3-campaign-info-modal').style.display = 'none';
}

function norr3CheckNotifications() {
  const token = localStorage.getItem('token');
  if (!token) return;
  showLoadingScreen(true);
  fetch('/api/campaigns', { headers: { 'Authorization': `Bearer ${token}` } })
    .then(res => res.json())
    .then(camps => {
      const now = new Date();
      const hasNotifs = camps.some(c => {
        const endDate = c.end_date ? new Date(c.end_date) : null;
        const budgetLimit = Object.values(c.budget).reduce((sum, val) => sum + (parseFloat(val) || 0), 0) * 0.9;
        const currentBudget = Object.values(c.budget).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
        return (endDate && (endDate - now) < 7 * 24 * 60 * 60 * 1000) || (currentBudget >= budgetLimit);
      });
      const notifIcon = document.getElementById('norr3-notification-icon');
      if (hasNotifs) {
        notifIcon.classList.add('new');
      } else {
        notifIcon.classList.remove('new');
      }
    })
    .catch(err => console.error('Error checking notifications:', err))
    .finally(() => showLoadingScreen(false));
}

function norr3ShowNotifications() {
  const token = localStorage.getItem('token');
  if (!token) {
    showAlert(translations[currentLanguage].pleaseLogin);
    return;
  }
  showLoadingScreen(true);
  fetch('/api/campaigns', { headers: { 'Authorization': `Bearer ${token}` } })
    .then(res => res.json())
    .then(camps => {
      const notifs = [];
      const now = new Date();
      camps.forEach(c => {
        const endDate = c.end_date ? new Date(c.end_date) : null;
        const budgetLimit = Object.values(c.budget).reduce((sum, val) => sum + (parseFloat(val) || 0), 0) * 0.9;
        const currentBudget = Object.values(c.budget).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
        if (endDate && (endDate - now) < 7 * 24 * 60 * 60 * 1000) {
          notifs.push(`Campaign ID ${c.id} ends in ${Math.ceil((endDate - now) / (24 * 60 * 60 * 1000))} days (${formatDate(endDate)}).`);
        }
        if (currentBudget >= budgetLimit) {
          notifs.push(`Campaign ID ${c.id} budget is over 90%.`);
        }
      });
      if (!notifs.length) {
        showAlert(translations[currentLanguage].noNewNotifications);
      } else {
        document.getElementById('norr3-notification-list').innerHTML = notifs.map(n => `<p>${n}</p>`).join('');
        document.getElementById('norr3-notification-modal').style.display = 'flex';
        document.getElementById('norr3-notification-icon').classList.remove('new');
      }
    })
    .catch(err => showAlert('Failed to load notifications: ' + err.message))
    .finally(() => showLoadingScreen(false));
}

function norr3CloseNotificationModal(event) {
  document.getElementById('norr3-notification-modal').style.display = 'none';
}

function norr3UpdateMetrics() {
  const token = localStorage.getItem('token');
  if (!token) return;
  showLoadingScreen(true);
  fetch('/api/campaigns', { headers: { 'Authorization': `Bearer ${token}` } })
    .then(res => res.json())
    .then(camps => {
      const activeCount = camps.filter(c => c.status).length;
      const pausedCount = camps.filter(c => !c.status).length;
      const totalBudget = camps.reduce((sum, c) =>
        sum + Object.values(c.budget).reduce((s, v) => s + (parseFloat(v) || 0), 0), 0);
      document.getElementById('norr3-active-count').textContent = activeCount;
      document.getElementById('norr3-paused-count').textContent = pausedCount;
      document.getElementById('norr3-total-budget').textContent = totalBudget.toFixed(2) + '€';
      document.getElementById('norr3-last-updated').textContent = new Date().toLocaleString();
    })
    .catch(err => console.error('Error updating metrics:', err))
    .finally(() => showLoadingScreen(false));
}

async function norr3AddUser() {
  const token = localStorage.getItem('token');
  if (!token || localStorage.getItem('role') !== 'admin') {
    showAlert('Only admins can manage users.');
    return;
  }
  showLoadingScreen(true);
  try {
    const partnerName = document.getElementById('norr3-user-partner-name').value;
    const agentName = document.getElementById('norr3-user-agent-name').value;
    const agentKey = document.getElementById('norr3-user-agent-key').value;
    const agentImage = document.getElementById('norr3-user-agent-image').value;
    const email = document.getElementById('norr3-user-email').value;
    const password = document.getElementById('norr3-user-password').value;
    if (!partnerName || !agentName || !agentKey || !email || !password) {
      showAlert('All fields except Agent Image are required.');
      return;
    }
    const user = { email, password, partnerName, agentName, agentKey, agentImage };
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    if (!res.ok) throw new Error(await res.text());
    await norr3RenderUsers();
    showAlert('User added successfully!');
  } catch (err) {
    showAlert('Error adding user: ' + err.message);
  } finally {
    showLoadingScreen(false);
  }
}

async function norr3RemoveUser() {
  const token = localStorage.getItem('token');
  if (!token || localStorage.getItem('role') !== 'admin') {
    showAlert('Only admins can manage users.');
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
    showAlert('Only admins can manage users.');
    return;
  }
  showLoadingScreen(true);
  try {
    const email = document.getElementById('norr3-user-email').value;
    const partnerName = document.getElementById('norr3-user-partner-name').value;
    const agentName = document.getElementById('norr3-user-agent-name').value;
    const agentKey = document.getElementById('norr3-user-agent-key').value;
    const agentImage = document.getElementById('norr3-user-agent-image').value;
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
    if (!res.ok) throw new Error('Failed to load users');
    const users = await res.json();
    const list = document.getElementById('norr3-user-list');
    list.innerHTML = '';
    users.forEach(u => {
      const row = document.createElement('div');
      row.className = 'norr3-user-item';
      row.innerHTML = `
        <span>${u.email || 'Unknown Email'}</span>
        <span>${u.partnerName || 'Unknown Partner'}</span>
        <span>${u.agentName || 'Unknown Agent'}</span>
        <span>${u.agentKey || 'Unknown Key'}</span>
        <img src="${u.agentImage || 'https://via.placeholder.com/50'}" alt="${u.agentName || 'Agent'}" loading="lazy">
        <button onclick="norr3RemoveUser('${u.email}')" class="norr3-btn-primary">Remove</button>
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
  showSection('norr3-user-management');
}

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
        else if (modal.id === 'norr3-apartment-modal') norr3CloseApartmentModal(e);
        else if (modal.id === 'norr3-apartment-info-modal') norr3CloseApartmentInfoModal(e);
        else if (modal.id === 'norr3-campaign-info-modal') norr3CloseCampaignInfoModal(e);
        else if (modal.id === 'norr3-notification-modal') norr3CloseNotificationModal(e);
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
    localStorage.setItem('agentEmail', 'seppo.kairikko@kiinteistomaailma.fi');
    document.getElementById('norr3-container').style.display = 'block';
    if (localStorage.getItem('role') === 'admin') {
      showSection('norr3-service-selection');
      document.getElementById('norr3-user-management-btn').style.display = 'inline-block';
      document.getElementById('norr3-back-button').style.display = 'inline-block';
    } else {
      showSection('norr3-campaign-setup');
      document.getElementById('norr3-user-management-btn').style.display = 'none';
      document.getElementById('norr3-back-button').style.display = 'none';
      // Remove automatic campaign loading
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
      // Remove automatic campaign loading
      const list = document.getElementById('norr3-campaign-list');
      list.innerHTML = `<p role="status">${translations[currentLanguage].noCampaigns}</p>`;
      // Add Fetch Campaigns button
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