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
    selectApartments: "Load Apartments",
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
    noApartments: "No apartments found for the specified agent email.",
    failedLoadUsers: "Failed to load users",
    budgetProgressTooltip: "Progress based on campaign duration: (current days / total days) * 100%"
  },
  fi: {
    marketingEngine: "NØRR3",
    loginWithGoogle: "Kirjaudu Googlella",
    login: "Kirjaudu",
    emailPlaceholder: "esim. etunimi.sukunimi@kiinteistomaailma.fi",
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
    selectApartments: "Lataa Asunnot",
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
    noApartments: "Ei asuntoja löytynyt annetulle välittäjän sähköpostille.",
    failedLoadUsers: "Käyttäjien lataaminen epäonnistui",
    budgetProgressTooltip: "Edistyminen perustuu kampanjan kestoa: (nykyiset päivät / kokonaispäivät) * 100%"
  },
  sv: {
    marketingEngine: "NØRR3",
    loginWithGoogle: "Logga in med Google",
    login: "Logga in",
    emailPlaceholder: "t.ex. förnamn.efternamn@kiinteistomaailma.fi",
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
    selectApartments: "Ladda Lägenheter",
    apartmentDetails: "Lägenhetsdetaljer",
    campaignDetails: "Kampanjdetaljer",
    add: "Lägg till",
    moreInfo: "Mer information",
    fetchCampaigns: "Synkronisera",
    invalidCredentials: "Fel e-post eller lösenord, försök igen.",
    noNewNotifications: "Inga nya aviseringar.",
    campaignSaved: "Kampanj sparad!",
    pleaseLogin: "Logga in för att se kampanjer.",
    noCampaigns: "Inga kampanjer hittades.",
    noApartments: "Inga lägenheter hittades för angiven mäklar-e-post.",
    failedLoadUsers: "Det gick inte att ladda användare.",
    budgetProgressTooltip: "Framsteg baserat på kampanjens varaktighet: (aktuella dagar / totala dagar) * 100%"
  }
};

let selectedApartments = [];
let allApartments = [];
let cachedCampaigns = []; // In-memory campaigns
let cachedUsers = [];     // In-memory users
let currentApartmentImageIndex = 0;

function getThumbnailUrl(apt) {
  const mainImg = (apt.images || []).find(i => i.type === 'MAIN');
  return mainImg && mainImg.url ? mainImg.url : 'https://norr3.fi/wp-content/uploads/2025/02/265574029cb3c272131e0a888e3d891a.jpg';
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
  setTimeout(() => alertEl.style.display = 'none', 3000);
}

function showLoadingScreen(show) {
  const loadingEl = document.getElementById('norr3-loading-screen');
  if (loadingEl) {
    loadingEl.style.display = show ? 'flex' : 'none';
  }
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
  const profileContainer = document.getElementById('norr3-user-profile');
  if (profileContainer) {
    profileContainer.style.display = 'none';
  }
  showLoadingScreen(false);
  showAlert('Logged out successfully!');
}
async function norr3ManualLogin() {
  const email = document.getElementById('norr3-email').value.trim();
  const password = document.getElementById('norr3-password').value.trim();
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
      await norr3FetchUsers(); // Fetch initial users from server in-memory
      await norr3FetchCampaigns(); // Fetch initial campaigns from Sheets
      if (data.role === 'admin') {
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
      showLoadingScreen(false); // Hide loading screen only after dashboard and campaigns are loaded
      showAlert('Logged in successfully!');
    } else {
      const err = await res.json().catch(() => ({ error: translations[currentLanguage].invalidCredentials }));
      showLoadingScreen(false);
      showAlert(err.error || translations[currentLanguage].invalidCredentials);
    }
  } catch (error) {
    showLoadingScreen(false);
    showAlert('Login failed: ' + error.message);
  }
}

async function norr3GoogleLogin() {
  showLoadingScreen(true);
  try {
    window.location.href = '/auth/google-login';
  } catch (error) {
    showLoadingScreen(false);
    showAlert('Google login failed: ' + error.message);
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
    filterCampaigns(); // Apply filters after fetching
    showLoadingScreen(false);
  } catch (err) {
    showLoadingScreen(false);
    showAlert('Failed to fetch campaigns: ' + err.message);
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
    if (localStorage.getItem('role') === 'admin') {
      norr3RenderUsers();
    }
    showLoadingScreen(false);
  } catch (err) {
    showLoadingScreen(false);
    showAlert('Failed to fetch users: ' + err.message);
  }
}

function renderCampaignList(campaignsToRender = cachedCampaigns) {
  const list = document.getElementById('norr3-campaign-list');
  list.innerHTML = '';
  if (!campaignsToRender.length) {
    list.innerHTML = `<p role="status">${translations[currentLanguage].noCampaigns}</p>`;
    return;
  }
  campaignsToRender.forEach(camp => {
    const displayId = camp.campaign_id.slice(-4);
    const totalBudget = (camp.budget_meta + camp.budget_display + camp.budget_pdooh);
    const apartmentKeys = (camp.apartments || []).map(a => a.key).join(', ');
    const apartmentLinks = (camp.apartments || []).map(a => `https://www.kiinteistomaailma.fi/${a.key}`).join(', ');
    const row = document.createElement('div');
    row.className = `norr3-table-row ${!camp.active ? 'norr3-row-off' : ''}`;
    row.setAttribute('role', 'row');
    row.innerHTML = `
      <span role="cell">${displayId}</span>
      <span role="cell">${camp.agent || ''}</span>
      <span role="cell"><span class="norr3-apartment-key" data-key="${apartmentKeys}" data-address="${camp.apartments.map(a => `${a.key}: ${allApartments.find(apt => apt.key === a.key)?.address || 'Unknown'}`).join(', ')}">${apartmentKeys || ''}</span></span>
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
  // Add event listeners for apartment key tooltips and clicks
  document.querySelectorAll('.norr3-apartment-key').forEach(key => {
    key.addEventListener('mouseover', showApartmentTooltip);
    key.addEventListener('mouseout', hideApartmentTooltip);
    key.addEventListener('click', () => norr3ShowApartmentInfoFromKey(key.getAttribute('data-key').split(', ')[0]));
  });
}
// Update the updateUserProfile function
function updateUserProfile() {
  const token = localStorage.getItem('token');
  if (token) {
    const decoded = jwtDecode(token);
    const email = decoded.email || localStorage.getItem('email') || '';

    // Set the tooltip with the email for the user icon
    const userIcon = document.getElementById('norr3-user-icon');
    if (userIcon) {
      userIcon.title = email; // Use title for native browser tooltip
    }
  } else {
    // Hide icon if not logged in
    const userIcon = document.getElementById('norr3-user-icon');
    if (userIcon) {
      userIcon.style.display = 'none';
    }
  }
}

// Update window.onload to call updateUserProfile
window.onload = function() {
  showLoadingScreen(true); // Show loading screen immediately on page load
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
    norr3FetchCampaigns()
      .then(() => {
        showLoadingScreen(false); // Hide loading screen only after campaigns are fetched and dashboard is loaded
        updateUserProfile(); // Set tooltip for user icon after login
      })
      .catch(() => showLoadingScreen(false)); // Ensure loading screen hides on error
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
    norr3FetchCampaigns()
      .then(() => {
        showLoadingScreen(false); // Hide loading screen only after campaigns are fetched and dashboard is loaded
        updateUserProfile(); // Set tooltip for user icon for existing session
      })
      .catch(() => showLoadingScreen(false)); // Ensure loading screen hides on error
  } else {
    showSection('norr3-login-section');
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
      showAlert(translations[currentLanguage].pleaseLogin);
    }
    showLoadingScreen(false); // Hide loading screen if not logged in
  }
  document.getElementById('norr3-search-campaigns').addEventListener('input', filterCampaigns);
  document.getElementById('norr3-filter-status').addEventListener('change', filterCampaigns);
  if (localStorage.getItem('role') === 'admin') {
    norr3RenderUsers();
  }
  updateUserProfile(); // Call on page load to handle profile updates
}

// Update norr3Logout to hide the icon when logging out
function norr3Logout() {
  showLoadingScreen(true);
  localStorage.clear();
  cachedCampaigns = []; // Clear in-memory campaigns
  cachedUsers = [];     // Clear in-memory users
  document.getElementById('norr3-container').style.display = 'none';
  showSection('norr3-login-section');
  document.getElementById('norr3-email').value = '';
  document.getElementById('norr3-password').value = '';
  const userIcon = document.getElementById('norr3-user-icon');
  if (userIcon) {
    userIcon.style.display = 'none';
  }
  showLoadingScreen(false);
  showAlert('Logged out successfully!');
}

function showApartmentTooltip(e) {
  const tooltip = document.createElement('div');
  tooltip.className = 'norr3-tooltip';
  tooltip.textContent = e.target.getAttribute('data-address');
  tooltip.style.position = 'absolute';
  tooltip.style.background = '#1a2027';
  tooltip.style.color = '#fff';
  tooltip.style.padding = '8px 12px';
  tooltip.style.borderRadius = '4px';
  tooltip.style.fontSize = '14px';
  tooltip.style.zIndex = '1001';
  tooltip.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
  const rect = e.target.getBoundingClientRect();
  tooltip.style.left = `${rect.left + window.scrollX}px`;
  tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
  document.body.appendChild(tooltip);
  e.target.tooltip = tooltip;
}

function hideApartmentTooltip(e) {
  if (e.target.tooltip) {
    document.body.removeChild(e.target.tooltip);
    e.target.tooltip = null;
  }
}

async function norr3ShowApartmentInfoFromKey(key) {
  const token = localStorage.getItem('token');
  if (!token) {
    showAlert(translations[currentLanguage].pleaseLogin);
    return;
  }
  showLoadingScreen(true);
  try {
    const res = await fetch('/api/apartments', { headers: { 'Authorization': `Bearer ${token}` } });
    if (!res.ok) throw new Error(await res.text());
    allApartments = await res.json();
    const apt = allApartments.find(a => a.key === key);
    if (!apt) throw new Error('Apartment not found');
    document.getElementById('norr3-apartment-info-modal').style.display = 'flex';
    const slider = document.getElementById('norr3-apartment-image-slider');
    const info = document.getElementById('norr3-apartment-info');
    const images = apt.images || [];
    slider.innerHTML = images.map((img, index) => `
      <img src="${img.url || 'https://norr3.fi/wp-content/uploads/2025/02/265574029cb3c272131e0a888e3d891a.jpg'}" alt="${apt.address || 'Apartment Image'}" class="norr3-slider-image ${index === 0 ? 'active' : ''}" style="max-height: 300px; width: auto; margin: 5px; display: ${index === 0 ? 'block' : 'none'};" loading="lazy">
    `).join('');
    info.innerHTML = `
      <h4>${translations[currentLanguage].apartmentDetails}</h4>
      <p><strong>Address:</strong> ${apt.address || ''}</p>
      <p><strong>Postal Code:</strong> ${apt.postcode || ''}</p>
      <p><strong>City:</strong> ${apt.city || ''}</p>
    `;
    currentApartmentImageIndex = 0;
    showLoadingScreen(false);
  } catch (err) {
    showLoadingScreen(false);
    showAlert('Failed to load apartment details: ' + err.message);
  }
}

function norr3PrevImage() {
  const images = document.querySelectorAll('.norr3-slider-image');
  if (images.length > 0) {
    images[currentApartmentImageIndex].style.display = 'none';
    currentApartmentImageIndex = (currentApartmentImageIndex - 1 + images.length) % images.length;
    images[currentApartmentImageIndex].style.display = 'block';
  }
}

function norr3NextImage() {
  const images = document.querySelectorAll('.norr3-slider-image');
  if (images.length > 0) {
    images[currentApartmentImageIndex].style.display = 'none';
    currentApartmentImageIndex = (currentApartmentImageIndex + 1) % images.length;
    images[currentApartmentImageIndex].style.display = 'block';
  }
}

function norr3CloseApartmentInfoModal(event) {
  document.getElementById('norr3-apartment-info-modal').style.display = 'none';
  currentApartmentImageIndex = 0;
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
    filterCampaigns(); // Reapply filters after status change
    showLoadingScreen(false);
    showAlert(checked ? 'Campaign activated!' : 'Campaign paused!');
  } catch (err) {
    showLoadingScreen(false);
    showAlert('Failed to update campaign status: ' + err.message);
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
    const apartmentKeys = (camp.apartments || []).map(a => a.key).join(', ');
    const apartmentLinks = (camp.apartments || []).map(a => `https://www.kiinteistomaailma.fi/${a.key}`).join(', ');
    document.getElementById('norr3-campaign-info-modal').style.display = 'flex';
    const info = document.getElementById('norr3-campaign-info');
    info.innerHTML = `
      <h4>${translations[currentLanguage].campaignDetails}</h4>
      <p><strong>${translations[currentLanguage].campaignId}:</strong> ${camp.campaign_id}</p>
      <p><strong>${translations[currentLanguage].agent}:</strong> ${camp.agent || ''}</p>
      <p><strong>${translations[currentLanguage].includedApartments}:</strong> ${apartmentKeys || 'None'}</p>
      <p><strong>Links:</strong> ${apartmentLinks || 'None'}</p>
      <p><strong>${translations[currentLanguage].start}:</strong> ${formatDate(camp.campaign_start_date)}</p>
      <p><strong>${translations[currentLanguage].end}:</strong> ${camp.campaign_end_date ? formatDate(camp.campaign_end_date) : translations[currentLanguage].ongoing}</p>
      <p><strong>${translations[currentLanguage].channels}:</strong> ${[camp.channel_meta ? 'Meta' : '', camp.channel_display ? 'Display' : '', camp.channel_pdooh ? 'PDOOH' : ''].filter(Boolean).join(', ') || 'None'}</p>
      <p><strong>${translations[currentLanguage].budget}:</strong> ${(camp.budget_meta + camp.budget_display + camp.budget_pdooh).toFixed(2)}€</p>
      <p><strong>${translations[currentLanguage].status}:</strong> ${camp.active ? translations[currentLanguage].active : translations[currentLanguage].paused}</p>
      <p><strong>Address:</strong> ${camp.campaign_address || ''}</p>
      <p><strong>Postal Code:</strong> ${camp.campaign_postal_code || ''}</p>
      <p><strong>City:</strong> ${camp.campaign_city || ''}</p>
      <p><strong>Radius:</strong> ${camp.campaign_radius || 0} meters</p>
    `;
    showLoadingScreen(false);
  } catch (err) {
    showLoadingScreen(false);
    showAlert('Failed to load campaign details: ' + err.message);
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
  document.getElementById('norr3-create-agent-email').value = '';
  document.getElementById('norr3-create-agent-email').disabled = false;
  document.getElementById('norr3-create-campaign-address').value = '';
  document.getElementById('norr3-create-campaign-postal-code').value  = '';
  document.getElementById('norr3-create-campaign-city').value = '';
  document.getElementById('norr3-create-campaign-radius').value = '1500';

  const role = localStorage.getItem('role');
  if (role === 'admin') {
    document.getElementById('norr3-agent-section').style.display = 'block';
    document.getElementById('norr3-load-apartments-btn').style.display = 'block';
  } else {
    document.getElementById('norr3-agent-section').style.display = 'block';
    const agentEmail = localStorage.getItem('agentEmail') || '';
    document.getElementById('norr3-create-agent-email').value = agentEmail;
    document.getElementById('norr3-create-agent-email').disabled = true;
    document.getElementById('norr3-load-apartments-btn').style.display = 'none';
    showLoadingScreen(true);
    await norr3LoadApartmentsForAgent(agentEmail);
    showLoadingScreen(false);
  }
}

async function norr3LoadApartmentsForAgent(agentEmail) {
  const token = localStorage.getItem('token');
  if (!token) {
    showAlert(translations[currentLanguage].pleaseLogin);
    return;
  }
  const loadingEl = document.getElementById('norr3-apartments-loading');
  const table = document.getElementById('norr3-apartments-table');
  if (loadingEl) loadingEl.style.display = 'block';
  if (table) table.style.display = 'none';
  try {
    const res = await fetch('/api/apartments', { headers: { 'Authorization': `Bearer ${token}` } });
    if (!res.ok) throw new Error(await res.text());
    allApartments = await res.json();
    const filtered = allApartments.filter(a => 
      (a.agentEmail || a.agencyEmail || '').toLowerCase().trim() === agentEmail.toLowerCase().trim()
    );
    table.innerHTML = '';
    if (!filtered.length) {
      showAlert(translations[currentLanguage].noApartments);
      table.innerHTML = `<p>No apartments found.</p>`;
    } else {
      filtered.forEach(apt => {
        const row = document.createElement('div');
        row.className = 'norr3-apartment-row';
        row.innerHTML = `
          <input type="checkbox" class="norr3-apartment-checkbox" data-key="${apt.key}" onchange="norr3ToggleApartmentSelection(event)" />
          <img src="${getThumbnailUrl(apt)}" alt="${apt.address || 'Apartment'}" style="width:50px; height:auto;" loading="lazy">
          <span>${apt.address || ''}, ${apt.postcode || ''} ${apt.city || ''}</span>
          <a href="https://www.kiinteistomaailma.fi/${apt.key}" target="_blank"><i class="fas fa-link"></i></a>
        `;
        table.appendChild(row);
      });
    }
  } catch (err) {
    showAlert('Failed to load apartments: ' + err.message);
  } finally {
    if (loadingEl) loadingEl.style.display = 'none';
    if (table) table.style.display = 'block';
  }
}

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
  const loadingEl = document.getElementById('norr3-apartments-loading');
  const table = document.getElementById('norr3-apartments-table');
  const loadBtnText = document.getElementById('norr3-load-apartments-text');
  const loadBtnIcon = document.getElementById('norr3-load-apartments-icon');
  loadBtnText.style.display = 'none';
  loadBtnIcon.className = 'fas fa-spinner fa-spin';
  loadBtnIcon.style.display = 'inline-block';
  if (loadingEl) loadingEl.style.display = 'block';
  if (table) table.style.display = 'none';
  try {
    const res = await fetch('/api/apartments', { headers: { 'Authorization': `Bearer ${token}` } });
    if (!res.ok) throw new Error(await res.text());
    allApartments = await res.json();
    const filtered = allApartments.filter(a => 
      (a.agentEmail || a.agencyEmail || '').toLowerCase().trim() === agentEmail.toLowerCase().trim()
    );
    table.innerHTML = '';
    if (!filtered.length) {
      showAlert(translations[currentLanguage].noApartments);
      table.innerHTML = `<p>No apartments found.</p>`;
    } else {
      filtered.forEach(apt => {
        const row = document.createElement('div');
        row.className = 'norr3-apartment-row';
        row.innerHTML = `
          <input type="checkbox" class="norr3-apartment-checkbox" data-key="${apt.key}" onchange="norr3ToggleApartmentSelection(event)" />
          <img src="${getThumbnailUrl(apt)}" alt="${apt.address || 'Apartment'}" style="width:50px; height:auto;" loading="lazy">
          <span>${apt.address || ''}, ${apt.postcode || ''} ${apt.city || ''}</span>
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
    loadBtnText.textContent = translations[currentLanguage].selectApartments;
    if (loadingEl) loadingEl.style.display = 'none';
    if (table) table.style.display = 'block';
  }
}

function norr3ToggleApartmentSelection(e) {
  const checkbox = e.target;
  const key = checkbox.getAttribute('data-key');
  if (checkbox.checked) {
    if (!selectedApartments.some(a => a.key === key)) {
      selectedApartments.push({ key: key });
    }
    // Update address fields when an apartment is selected
    const apt = allApartments.find(a => a.key === key);
    if (apt) {
      document.getElementById('norr3-create-campaign-address').value = apt.address || '';
      document.getElementById('norr3-create-campaign-postal-code').value = apt.postcode || '';
      document.getElementById('norr3-create-campaign-city').value = apt.city || '';
    }
  } else {
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

function norr3CloseCreateModal(event) {
  document.getElementById('norr3-create-modal').style.display = 'none';
  selectedApartments = [];
  document.getElementById('norr3-create-agent-email').value = '';
  document.getElementById('norr3-create-agent-email').disabled = false;
  document.getElementById('norr3-create-campaign-address').value = '';
  document.getElementById('norr3-create-campaign-postal-code').value = '';
  document.getElementById('norr3-create-campaign-city').value = '';
  document.getElementById('norr3-create-campaign-radius').value = '1500';
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
selectedApartments = (campaign.apartments || []).map(a => ({ key: a.key }));
const apartmentKeys = selectedApartments.map(a => a.key).join(', ');
const apartmentLinks = selectedApartments.map(a => `https://www.kiinteistomaailma.fi/${a.key}`).join(', ');
document.getElementById('norr3-selected-apartments').innerHTML = `
  <p><strong>Apartment Keys:</strong> <span class="norr3-apartment-key" data-key="${apartmentKeys}" data-address="${campaign.apartments.map(a => `${a.key}: ${allApartments.find(apt => apt.key === a.key)?.address || 'Unknown'}`).join(', ')}">${apartmentKeys || 'None'}</span></p>
  <p><strong>Links:</strong> <span id="norr3-selected-apartment-links">${apartmentLinks || 'None'}</span></p>
`;
document.getElementById('norr3-edit-campaign-address').value = campaign.campaign_address || '';
document.getElementById('norr3-edit-campaign-postal-code').value = campaign.campaign_postal_code || '';
document.getElementById('norr3-edit-campaign-city').value = campaign.campaign_city || '';
document.getElementById('norr3-edit-campaign-radius').value = campaign.campaign_radius || 1500;
    if (localStorage.getItem('role') === 'admin') {
      document.getElementById('norr3-create-agent-email').value = '';
      document.getElementById('norr3-load-apartments-btn').style.display = 'block';
    } else {
      document.getElementById('norr3-create-agent-email').value = localStorage.getItem('agentEmail') || '';
      document.getElementById('norr3-create-agent-email').disabled = true;
      document.getElementById('norr3-load-apartments-btn').style.display = 'none';
    }
    showLoadingScreen(false);
  } catch (err) {
    showLoadingScreen(false);
    showAlert('Failed to load campaign for editing: ' + err.message);
  }
}

function norr3CloseModal(event) {
  document.getElementById('norr3-edit-modal').style.display = 'none';
  selectedApartments = [];
  document.getElementById('norr3-edit-campaign-address').value = '';
  document.getElementById('norr3-edit-campaign-postal-code').value = '';
  document.getElementById('norr3-edit-campaign-city').value = '';
  document.getElementById('norr3-edit-campaign-radius').value = '1500';
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
  const editCheckbox = document.getElementById(`norr3-edit-channel-${channel.replace('create', 'edit')}`);
  const input = document.getElementById(`norr3-create-budget-${channel}`);
  const editInput = document.getElementById(`norr3-edit-budget-${channel.replace('create', 'edit')}`);
  if (checkbox) {
    if (checkbox.checked) {
      input.disabled = false;
      input.style.opacity = '1';
    } else {
      input.disabled = true;
      input.style.opacity = '0.5';
      input.value = 0;
    }
  }
  if (editCheckbox) {
    if (editCheckbox.checked) {
      editInput.disabled = false;
      editInput.style.opacity = '1';
    } else {
      editInput.disabled = true;
      editInput.style.opacity = '0.5';
      editInput.value = 0;
    }
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
    ? document.getElementById('norr3-create-agent-email').value.trim().toLowerCase()
    : (localStorage.getItem('agentEmail') || '').toLowerCase().trim();
  let agentInfo = {};

  if (agentEmail) {
    try {
      const agentRes = await fetch(`/api/agent-info?email=${encodeURIComponent(agentEmail)}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!agentRes.ok) throw new Error('Failed to fetch agent info');
      agentInfo = await agentRes.json();
    } catch (err) {
      showAlert('Failed to fetch agent information: ' + err.message);
      showLoadingScreen(false);
      return;
    }
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

  const start = new Date(startDate);
  const end = ongoing || !endDate ? new Date(start.getTime() + 30 * 24 * 60 * 60 * 1000) : new Date(endDate);
  const days = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));

  const campaignData = {
    campaign_id: campaignId || Math.random().toString(36).substr(2, 9),
    partner_id: Math.random().toString(36).substr(2, 9),
    partner_name: localStorage.getItem('partnerName') || 'Kiinteistömaailma Helsinki',
    agent: agentName,
    agent_key: agentKey,
    campaign_address: isCreate ? document.getElementById('norr3-create-campaign-address').value : document.getElementById('norr3-edit-campaign-address').value,
    campaign_postal_code: isCreate ? document.getElementById('norr3-create-campaign-postal-code').value : document.getElementById('norr3-edit-campaign-postal-code').value,
    campaign_city: isCreate ? document.getElementById('norr3-create-campaign-city').value : document.getElementById('norr3-edit-campaign-city').value,
    campaign_radius: parseInt(isCreate ? document.getElementById('norr3-create-campaign-radius').value : document.getElementById('norr3-edit-campaign-radius').value) || 1500,
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

  const apartmentKeys = selectedApartments.map(apt => apt.key).join(', ');
  const apartmentLinks = selectedApartments.map(apt => `https://www.kiinteistomaailma.fi/${apt.key}`).join(', ');
  const apartmentsData = selectedApartments.map(apt => ({ key: apt.key }));

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
    if (!res.ok) throw new Error(await res.text());
    if (isCreate) {
      document.getElementById('norr3-create-modal').style.display = 'none';
    } else {
      document.getElementById('norr3-edit-modal').style.display = 'none';
    }
    selectedApartments = [];
    await norr3FetchCampaigns();
    showLoadingScreen(false);
    showAlert(translations[currentLanguage].campaignSaved);
  } catch (err) {
    showLoadingScreen(false);
    showAlert('Failed to save campaign: ' + err.message);
  }
}

function norr3ConfirmEdits() {
  norr3SaveCampaign();
}

// --- Filter Campaigns --- //
function filterCampaigns() {
  const searchQuery = document.getElementById('norr3-search-campaigns').value.toLowerCase();
  const statusFilter = document.getElementById('norr3-filter-status').value;
  let filteredCampaigns = [...cachedCampaigns];

  if (searchQuery) {
    filteredCampaigns = filteredCampaigns.filter(campaign => 
      campaign.agent?.toLowerCase().includes(searchQuery) ||
      campaign.apartments?.some(a => a.key.toLowerCase().includes(searchQuery)) ||
      campaign.campaign_city?.toLowerCase().includes(searchQuery)
    );
  }

  if (statusFilter) {
    filteredCampaigns = filteredCampaigns.filter(campaign => 
      statusFilter === 'on' ? campaign.active : !campaign.active
    );
  }

  renderCampaignList(filteredCampaigns);
  norr3UpdateMetrics(filteredCampaigns); // Update metrics with filtered data
}

// --- Export Campaigns --- //
function norr3ExportCampaigns() {
  const csv = [
    ['Campaign ID', 'Agent', 'Apartment Keys', 'Start', 'End', 'Channels', 'Budget (€)', 'Status', 'Address', 'Postal Code', 'City', 'Radius (m)']
  ];
  cachedCampaigns.forEach(camp => {
    const displayId = camp.campaign_id.slice(-4);
    const totalBudget = (camp.budget_meta + camp.budget_display + camp.budget_pdooh).toFixed(2);
    const apartmentKeys = (camp.apartments || []).map(a => a.key).join(', ');
    const channels = [camp.channel_meta ? 'Meta' : '', camp.channel_display ? 'Display' : '', camp.channel_pdooh ? 'PDOOH' : ''].filter(Boolean).join(', ');
    const status = camp.active ? 'Active' : 'Paused';
    csv.push([
      displayId,
      camp.agent || '',
      apartmentKeys || '',
      formatDate(camp.campaign_start_date),
      camp.campaign_end_date ? formatDate(camp.campaign_end_date) : 'Ongoing',
      channels || '',
      totalBudget,
      status,
      camp.campaign_address || '',
      camp.campaign_postal_code || '',
      camp.campaign_city || '',
      camp.campaign_radius || 0
    ]);
  });

  const csvContent = csv.map(row => row.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'campaigns.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
  showAlert('Campaigns exported successfully!');
}

// --- Dashboard Metrics and Progress Bar --- //
function norr3UpdateMetrics(campaigns = cachedCampaigns) {
  const activeCount = campaigns.filter(c => c.active).length;
  const pausedCount = campaigns.filter(c => !c.active).length;
  const totalBudget = campaigns.reduce((sum, c) => sum + (c.budget_meta + c.budget_display + c.budget_pdooh), 0);
  const lastUpdated = new Date().toLocaleString();
  const currentDate = new Date();
  let totalDays = 0;
  let elapsedDays = 0;

  campaigns.forEach(c => {
    const start = new Date(c.campaign_start_date);
    const end = c.campaign_end_date ? new Date(c.campaign_end_date) : new Date(start.getTime() + 30 * 24 * 60 * 60 * 1000);
    const campaignDays = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
    const campaignElapsed = Math.max(0, Math.min(campaignDays, Math.ceil((currentDate - start) / (1000 * 60 * 60 * 24))));
    totalDays += campaignDays;
    elapsedDays += campaignElapsed;
  });

  const progress = totalDays > 0 ? (elapsedDays / totalDays) * 100 : 0;
  document.getElementById('norr3-active-count').textContent = activeCount;
  document.getElementById('norr3-paused-count').textContent = pausedCount;
  document.getElementById('norr3-total-budget').textContent = `${totalBudget.toFixed(2)}€`;
  document.getElementById('norr3-last-updated').textContent = lastUpdated;
  document.getElementById('norr3-budget-progress').style.width = `${progress}%`;
  document.getElementById('norr3-budget-tooltip').textContent = `${translations[currentLanguage].budgetProgressTooltip} (${elapsedDays}/${totalDays} days)`;
}

// --- Event Listeners for Filters --- //
document.getElementById('norr3-search-campaigns').addEventListener('input', filterCampaigns);
document.getElementById('norr3-filter-status').addEventListener('change', filterCampaigns);

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
    // Build table header with light theme
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
    // Build rows for each user with shorter text, ellipsis, and tooltips
    cachedUsers.forEach(u => {
      // Function to shorten text with ellipsis, keeping full text for tooltip
      const shortenText = (text, maxLength = 20) => {
        if (!text) return '';
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
      };
      const row = document.createElement('div');
      row.className = 'norr3-user-item';
      row.innerHTML = `
        <span class="norr3-user-text" title="${u.email || ''}">${shortenText(u.email || '')}</span>
        <span class="norr3-user-text" title="${u.partnerName || ''}">${shortenText(u.partnerName || '')}</span>
        <span class="norr3-user-text" title="${u.agentName || ''}">${shortenText(u.agentName || '')}</span>
        <span class="norr3-user-text" title="${u.agentKey || ''}">${shortenText(u.agentKey || '')}</span>
        <span><img src="${u.agentImage || 'https://norr3.fi/wp-content/uploads/2025/02/265574029cb3c272131e0a888e3d891a.jpg'}" alt="${u.agentName || 'Agent'}" style="width:40px; height:auto;" loading="lazy"></span>
        <span class="norr3-user-text" title="${u.role || ''}">${shortenText(u.role || '')}</span>
        <span>
          <i class="fas fa-edit norr3-action-icon" title="Edit" onclick="norr3EditUser('${u.email}')" tabindex="0" aria-label="Edit user"></i>
          <i class="fas fa-trash norr3-action-icon" title="Remove" onclick="norr3RemoveUser('${u.email}')" tabindex="0" aria-label="Remove user"></i>
        </span>
      `;
      list.appendChild(row);
    });
    showLoadingScreen(false);
  } catch (err) {
    showLoadingScreen(false);
    showAlert('Failed to load users: ' + err.message);
  }
}// Open the Add User modal
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
    showLoadingScreen(false);
  } catch (err) {
    showLoadingScreen(false);
    showAlert('Auto-fill failed: ' + err.message);
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
    showLoadingScreen(false);
    showAlert('User added successfully!');
    norr3CloseAddUser();
  } catch (err) {
    showLoadingScreen(false);
    showAlert('Error adding user: ' + err.message);
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
    showLoadingScreen(false);
    showAlert('User removed successfully!');
  } catch (err) {
    showLoadingScreen(false);
    showAlert('Error removing user: ' + err.message);
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
    showLoadingScreen(false);
    showAlert('User edited successfully!');
  } catch (err) {
    showLoadingScreen(false);
    showAlert('Error editing user: ' + err.message);
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
function norr3CheckNotifications() {
  
}

function norr3ShowNotifications() {
  document.getElementById('norr3-notification-modal').style.display = 'flex';
  const notificationList = document.getElementById('norr3-notification-list');
  notificationList.innerHTML = `<p>${translations[currentLanguage].noNewNotifications}</p>`;
}

function norr3CloseNotificationModal(event) {
  document.getElementById('norr3-notification-modal').style.display = 'none';
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
  // Initialize tooltips and click handlers for apartment keys in campaign list
  document.querySelectorAll('.norr3-apartment-key').forEach(key => {
    key.addEventListener('mouseover', showApartmentTooltip);
    key.addEventListener('mouseout', hideApartmentTooltip);
    key.addEventListener('click', () => norr3ShowApartmentInfoFromKey(key.getAttribute('data-key').split(', ')[0]));
  });
});

window.onload = function() {
  showLoadingScreen(true); // Show loading screen immediately on page load
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
    norr3FetchCampaigns()
      .then(() => {
        showLoadingScreen(false); // Hide loading screen only after campaigns are fetched and dashboard is loaded
        updateUserProfile(); // Set profile picture and tooltip after login
      })
      .catch(() => showLoadingScreen(false)); // Ensure loading screen hides on error
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
    norr3FetchCampaigns()
      .then(() => {
        showLoadingScreen(false); // Hide loading screen only after campaigns are fetched and dashboard is loaded
        updateUserProfile(); // Set profile picture and tooltip for existing session
      })
      .catch(() => showLoadingScreen(false)); // Ensure loading screen hides on error
  } else {
    showSection('norr3-login-section');
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
      showAlert(translations[currentLanguage].pleaseLogin);
    }
    showLoadingScreen(false); // Hide loading screen if not logged in
  }
  document.getElementById('norr3-search-campaigns').addEventListener('input', filterCampaigns);
  document.getElementById('norr3-filter-status').addEventListener('change', filterCampaigns);
  if (localStorage.getItem('role') === 'admin') {
    norr3RenderUsers();
  }
  updateUserProfile(); // Call on page load to handle profile updates
}