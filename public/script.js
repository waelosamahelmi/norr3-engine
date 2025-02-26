// Load Supabase client
const { createClient } = window.supabase;
const supabase = createClient('https://wuehzmkhvduybcjwkfaq.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1ZWh6bWtodmR1eWJjandrZmFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1NzYzMDgsImV4cCI6MjA1NjE1MjMwOH0.Xr0kSW_WyZwIIqcqtTFOj_9RuWcxBku7hONDGm1QEd8');

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
    totalBudget: "Total Budget:",
    lastUpdated: "Last Updated:",
    notifications: "Notifications",
    agentInformation: "Agent Information",
    apartmentInformation: "Apartment Information",
    apartments: "Apartments",
    dates: "Dates",
    ongoing: "Ongoing",
    budgetAllocation: "Budget Allocation",
    saveCampaign: "Save Campaign",
    cancel: "Cancel",
    confirmEdits: "Confirm Edits",
    selectApartments: "Select Apartments",
    apartmentDetails: "Apartment Details",
    campaignDetails: "Campaign Details",
    add: "Add",
    moreInfo: "More Info",
    fetchCampaigns: "Fetch",
    autoFill: "Auto Fill",
    invalidCredentials: "Wrong email or password, please try again.",
    noNewNotifications: "No new notifications.",
    campaignSaved: "Campaign saved!",
    pleaseLogin: "Please log in to view campaigns.",
    noCampaigns: "No campaigns found.",
    successfullyAdded: "Successfully added apartment.",
    noApartments: "No apartments found for your agency email.",
    agentNotFound: "Agent not found. Please enter manually or check the email."
  },
  fi: {
    marketingEngine: "NØRR3",
    loginWithGoogle: "Kirjaudu Googlella",
    login: "Kirjaudu",
    emailPlaceholder: "esim. etunimi.sukunimi@kiinteistomaailma.fi",
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
    totalBudget: "Kokonaisbudjetti:",
    lastUpdated: "Viimeksi Päivitetty:",
    notifications: "Ilmoitukset",
    agentInformation: "Asiamiehen Tiedot",
    apartmentInformation: "Asunnon Tiedot",
    apartments: "Asunnot",
    dates: "Päivät",
    ongoing: "Käynnissä",
    budgetAllocation: "Budjetin Jakautuminen",
    saveCampaign: "Tallenna Kampanja",
    cancel: "Peruuta",
    confirmEdits: "Vahvista Muokkaukset",
    selectApartments: "Valitse Asunnot",
    apartmentDetails: "Asunnon Tiedot",
    campaignDetails: "Kampanjan Tiedot",
    add: "Lisää",
    moreInfo: "Lisätietoja",
    fetchCampaigns: "Hae",
    autoFill: "Täytä Automaattisesti",
    invalidCredentials: "Väärä sähköposti tai salasana, yritä uudelleen.",
    noNewNotifications: "Ei uusia ilmoituksia.",
    campaignSaved: "Kampanja tallennettu!",
    pleaseLogin: "Kirjaudu nähdäksesi kampanjat.",
    noCampaigns: "Kampanjoita ei löytynyt.",
    successfullyAdded: "Asunto lisätty onnistuneesti.",
    noApartments: "Ei asuntoja löydetty agenttisi sähköpostilla.",
    agentNotFound: "Asiamiestä ei löytynyt. Syötä tiedot manuaalisesti tai tarkista sähköposti."
  },
  sv: {
    marketingEngine: "NØRR3",
    loginWithGoogle: "Logga in med Google",
    login: "Logga in",
    emailPlaceholder: "t.ex. förnamn.efternamn@kiinteistomaailma.fi",
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
    totalBudget: "Total Budget:",
    lastUpdated: "Senast Uppdaterad:",
    notifications: "Meddelanden",
    agentInformation: "Agentinformation",
    apartmentInformation: "Lägenhetsinformation",
    apartments: "Lägenheter",
    dates: "Datum",
    ongoing: "Pågående",
    budgetAllocation: "Budgetfördelning",
    saveCampaign: "Spara Kampanj",
    cancel: "Avbryt",
    confirmEdits: "Bekräfta Redigeringar",
    selectApartments: "Välj Lägenheter",
    apartmentDetails: "Lägenhetsdetaljer",
    campaignDetails: "Kampanjdetaljer",
    add: "Lägg Till",
    moreInfo: "Mer Info",
    fetchCampaigns: "Hämta",
    autoFill: "Autofyll",
    invalidCredentials: "Fel e-post eller lösenord, försök igen.",
    noNewNotifications: "Inga nya meddelanden.",
    campaignSaved: "Kampanj sparad!",
    pleaseLogin: "Logga in för att visa kampanjer.",
    noCampaigns: "Inga kampanjer hittades.",
    successfullyAdded: "Lägenhet tillagd framgångsrikt.",
    noApartments: "Inga lägenheter hittades för din agent-e-post.",
    agentNotFound: "Agent hittades inte. Ange manuellt eller kontrollera e-post."
  }
};

let selectedApartments = [];
let allApartments = [];
let cachedCampaigns = [];

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
  if (sectionId === 'norr3-campaign-setup' && !supabase.auth.getSession()) {
    showAlert(translations[currentLanguage].pleaseLogin);
  }
}

function norr3GoBack() {
  if (supabase.auth.getSession()?.user.role === 'admin') {
    showSection('norr3-service-selection');
  }
}

function norr3Logout() {
  showLoadingScreen(true);
  supabase.auth.signOut();
  cachedCampaigns = []; // Clear campaigns on logout
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
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      showAlert(error.message || translations[currentLanguage].invalidCredentials);
      return;
    }
    document.getElementById('norr3-container').style.display = 'block';
    hideAlert();
    if (data.session.user.role === 'admin') {
      showSection('norr3-service-selection');
    } else {
      showSection('norr3-campaign-setup');
    }
    updateProfileDropdown(); // Update profile picture and dropdown
  } catch (error) {
    showAlert('Login failed: ' + error.message);
  } finally {
    showLoadingScreen(false);
  }
}

async function norr3GoogleLogin() {
  showLoadingScreen(true);
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });
    if (error) throw new Error(error.message);
  } catch (error) {
    showAlert('Google login failed: ' + error.message);
  } finally {
    showLoadingScreen(false);
  }
}

async function norr3SelectService(service) {
  showLoadingScreen(true);
  const session = await supabase.auth.getSession();
  if (!session.data.session) {
    showAlert(translations[currentLanguage].pleaseLogin);
    showLoadingScreen(false);
    return;
  }
  showSection('norr3-campaign-setup');
  showLoadingScreen(false);
}

async function norr3FetchCampaigns() {
  const session = await supabase.auth.getSession();
  if (!session.data.session) {
    showAlert(translations[currentLanguage].pleaseLogin);
    return;
  }
  showLoadingScreen(true);
  try {
    let campaignsData;
    if (session.data.session.user.role === 'admin') {
      const { data, error } = await supabase.from('campaigns').select('*');
      if (error) throw new Error(error.message);
      campaignsData = data;
    } else {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('agent_key', session.data.session.user.user_metadata.agentKey);
      if (error) throw new Error(error.message);
      campaignsData = data;
    }
    cachedCampaigns = campaignsData;
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

async function norr3ToggleStatus(id, checked) {
  const session = await supabase.auth.getSession();
  if (!session.data.session) {
    showAlert(translations[currentLanguage].pleaseLogin);
    return;
  }
  showLoadingScreen(true);
  try {
    const { data, error } = await supabase
      .from('campaigns')
      .update({ status: checked ? 1 : 0 })
      .eq('id', id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    if (!data) throw new Error('Campaign not found');
    const campIndex = cachedCampaigns.findIndex(c => c.id === id);
    if (campIndex !== -1) {
      cachedCampaigns[campIndex] = { ...cachedCampaigns[campIndex], ...data, status: checked ? 1 : 0 };
    } else {
      await norr3FetchCampaigns();
    }
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
    console.error('Error toggling campaign status:', err);
    showAlert('Error toggling campaign status: ' + err.message);
  } finally {
    showLoadingScreen(false);
  }
}

async function norr3ExportCampaigns() {
  const session = await supabase.auth.getSession();
  if (!session.data.session) {
    showAlert(translations[currentLanguage].pleaseLogin);
    return;
  }
  showLoadingScreen(true);
  try {
    const { data: camps, error } = await supabase.from('campaigns').select('*');
    if (error) throw error;
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
      const end = c.end_date ? formatDate(c.end_date) : translations[currentLanguage].ongoing;
      return [
        c.id,
        c.agent_name || 'Unknown Agent',
        (c.apartments || []).map(a => a.key).join(', '),
        start,
        end,
        c.status ? translations[currentLanguage].active : translations[currentLanguage].paused,
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
  } catch (err) {
    showAlert('Failed to export campaigns: ' + err.message);
  } finally {
    showLoadingScreen(false);
  }
}


async function norr3CreateCampaign() {
  const session = await supabase.auth.getSession();
  if (!session.data.session) {
    showAlert(translations[currentLanguage].pleaseLogin);
    return;
  }
  selectedApartments = [];
  document.getElementById('norr3-selected-apartments').innerHTML = '';
  document.getElementById('norr3-create-modal').style.display = 'flex';
  document.getElementById('norr3-create-agent-email').value = '';
  document.getElementById('norr3-create-start-date').value = '';
  document.getElementById('norr3-create-end-date').value = '';
  document.getElementById('norr3-create-ongoing').checked = false;
  document.getElementById('norr3-create-end-date').disabled = false;
  ['meta', 'display', 'pdooh'].forEach(ch => {
    document.querySelector(`#norr3-create-${ch}`).checked = false;
    document.getElementById(`norr3-create-budget-${ch}`).value = 0;
    document.getElementById(`norr3-create-budget-${ch}`).disabled = true;
    document.getElementById(`norr3-create-budget-${ch}`).style.opacity = '0.5';
  });
}

function norr3CloseCreateModal(event) {
  document.getElementById('norr3-create-modal').style.display = 'none';
  selectedApartments = [];
}

async function norr3EditCampaign(id) {
  const session = await supabase.auth.getSession();
  if (!session.data.session) {
    showAlert(translations[currentLanguage].pleaseLogin);
    return;
  }
  showLoadingScreen(true);
  try {
    const [campRes, aptRes] = await Promise.all([
      supabase.from('campaigns').select('*').eq('id', id).single(),
      supabase.from('apartments').select('*')
    ]);
    if (campRes.error || aptRes.error) throw new Error('Failed to load campaign or apartments');
    const campaign = campRes.data;
    const apartments = aptRes.data;
    allApartments = session.data.session.user.role === 'admin' ? apartments : apartments.filter(a => a.agent_key && a.agent_key.toLowerCase() === session.data.session.user.user_metadata.agentKey.toLowerCase());
    document.getElementById('norr3-edit-modal').style.display = 'flex';
    document.getElementById('norr3-edit-modal').setAttribute('data-campaign-id', campaign.id);
    document.getElementById('norr3-edit-agent-email').value = campaign.agent_key ? campaign.agent_key : '';
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
      budget: a.budget || { meta: 0, display: 0, pdooh: 0 },
      explanation: a.explanation || ''
    }));
    updateSelectedApartments();
    ['meta', 'display', 'pdooh'].forEach(ch => {
      const checkbox = document.querySelector(`#norr3-modal-${ch}`);
      const budgetInput = document.getElementById(`norr3-modal-budget-${ch}`);
      checkbox.checked = campaign.channels.includes(ch);
      budgetInput.value = (campaign.budget[ch] || 0).toString();
      budgetInput.disabled = !checkbox.checked;
      budgetInput.style.opacity = checkbox.checked ? '1' : '0.5';
    });
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

function norr3UpdateCreateChannels() {
  ['meta', 'display', 'pdooh'].forEach(ch => {
    const checkbox = document.querySelector(`#norr3-create-${ch}`);
    const budgetInput = document.getElementById(`norr3-create-budget-${ch}`);
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

function norr3UpdateEditChannels() {
  ['meta', 'display', 'pdooh'].forEach(ch => {
    const checkbox = document.querySelector(`#norr3-modal-${ch}`);
    const budgetInput = document.getElementById(`norr3-modal-budget-${ch}`);
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

async function norr3SaveCampaign() {
  const session = await supabase.auth.getSession();
  if (!session.data.session) {
    showAlert(translations[currentLanguage].pleaseLogin);
    return;
  }
  showLoadingScreen(true);
  const createModal = document.getElementById('norr3-create-modal');
  const editModal = document.getElementById('norr3-edit-modal');
  const isCreate = createModal.style.display === 'flex';
  const modal = isCreate ? createModal : editModal;
  const campaignId = modal.getAttribute('data-campaign-id') || '';
  const agentEmail = (isCreate ? document.getElementById('norr3-create-agent-email') : document.getElementById('norr3-edit-agent-email')).value;
  const startDate = isCreate
    ? document.getElementById('norr3-create-start-date').value
    : document.getElementById('norr3-modal-start-date').value;
  const endDate = isCreate
    ? document.getElementById('norr3-create-end-date').value
    : document.getElementById('norr3-modal-end-date').value;
  const ongoing = isCreate
    ? document.getElementById('norr3-create-ongoing').checked
    : document.getElementById('norr3-modal-ongoing').checked;
  if (!startDate || (!ongoing && !endDate) || !agentEmail || selectedApartments.length === 0) {
    showAlert('Please provide Agent Email, Start Date, End Date (or mark as Ongoing), and select at least one apartment.');
    showLoadingScreen(false);
    return;
  }

  let agentInfo = await fetchAgentInfo(agentEmail);
  if (!agentInfo) {
    showAlert(translations[currentLanguage].agentNotFound);
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
  const campaignData = {
    id: campaignId || Date.now().toString(),
    partner_id: 1,
    partnerName: session.data.session.user.role === 'admin' ? 'NØRR3' : 'Kiinteistömaailma Helsinki',
    agent_name: agentInfo.agentName,
    agent_key: agentInfo.agentKey,
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
    const { data, error } = await supabase
      .from('campaigns')
      .upsert(campaignData, { onConflict: 'id' })
      .select()
      .single();
    if (error) throw new Error(error.message);
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
    await syncToSheets([campaignData]); // Sync to Google Sheets
  } catch (err) {
    showAlert('Error saving campaign: ' + err.message);
  } finally {
    showLoadingScreen(false);
  }
}

async function fetchAgentInfo(email) {
  try {
    const response = await fetch(`/api/agents/autofill?email=${encodeURIComponent(email)}`);
    if (!response.ok) throw new Error(await response.text());
    return await response.json();
  } catch (err) {
    console.error('Error fetching agent info:', err);
    return null;
  }
}

function norr3ConfirmEdits() {
  norr3SaveCampaign();
}

async function norr3AddApartment(agentKey = null) {
  const session = await supabase.auth.getSession();
  if (!session.data.session) {
    showAlert(translations[currentLanguage].pleaseLogin);
    return;
  }
  showLoadingScreen(true);
  try {
    let url = '/api/apartments';
    if (agentKey) {
      url = `/api/apartments/by-agent/${agentKey}`;
    }
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to load apartments (Status: ${response.status})`);
    const apartments = await response.json();
    allApartments = apartments;
    document.getElementById('norr3-apartment-modal').style.display = 'flex';
    const aptList = document.getElementById('norr3-apartment-list');
    aptList.innerHTML = '';
    apartments.forEach(apt => {
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

async function suggestAgents(query) {
  if (query.length < 3) {
    document.getElementById('agent-suggestions').style.display = 'none';
    document.getElementById('agent-suggestions-edit').style.display = 'none';
    return;
  }
  const { data, error } = await supabase
    .from('users')
    .select('email, agent_name, agent_key')
    .ilike('email', `${query}%`)
    .or(`agent_name.ilike.%${query}%,agent_key.ilike.%${query}%`);
  if (error) {
    console.error('Error fetching agent suggestions:', error);
    return;
  }
  const createSuggestions = document.getElementById('agent-suggestions');
  const editSuggestions = document.getElementById('agent-suggestions-edit');
  createSuggestions.innerHTML = '';
  editSuggestions.innerHTML = '';
  data.forEach(agent => {
    const div = document.createElement('div');
    div.textContent = `${agent.email} (${agent.agent_name || 'No Name'} - ${agent.agent_key || 'No Key'})`;
    div.onclick = () => {
      document.getElementById('norr3-create-agent-email').value = agent.email;
      createSuggestions.style.display = 'none';
    };
    createSuggestions.appendChild(div);

    const divEdit = document.createElement('div');
    divEdit.textContent = `${agent.email} (${agent.agent_name || 'No Name'} - ${agent.agent_key || 'No Key'})`;
    divEdit.onclick = () => {
      document.getElementById('norr3-edit-agent-email').value = agent.email;
      editSuggestions.style.display = 'none';
    };
    editSuggestions.appendChild(divEdit);
  });
  createSuggestions.style.display = data.length ? 'block' : 'none';
  editSuggestions.style.display = data.length ? 'block' : 'none';
}

function norr3SelectApartment(key) {
  localStorage.setItem('tempApartment', JSON.stringify(key));
  document.getElementById('norr3-apartment-radius').value = '1500';
  document.getElementById('norr3-apartment-explanation').value = '';
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
  const explanation = document.getElementById('norr3-apartment-explanation').value || '';
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
    },
    explanation: explanation
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
      <span>Explanation: ${apt.explanation || 'None'}</span>
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
  const session = await supabase.auth.getSession();
  if (!session.data.session) {
    showAlert(translations[currentLanguage].pleaseLogin);
    return;
  }
  showLoadingScreen(true);
  try {
    const { data, error } = await supabase.from('apartments').select('*').eq('key', key).single();
    if (error) throw new Error(error.message);
    if (!data) {
      showAlert('Apartment not found.');
      return;
    }
    const apt = data;
    document.getElementById('norr3-apartment-info-modal').style.display = 'flex';
    const info = document.getElementById('norr3-apartment-info');
    info.innerHTML = `
      <h4>${apt.address || 'Unknown Address'}, ${apt.postcode || ''} ${apt.city || ''}</h4>
      <div class="norr3-image-slider">
        ${(apt.images || []).map(img => `<img src="${img.url}" alt="Apartment Image" loading="lazy"/>`).join('')}
      </div>
      <p><strong>Key:</strong> ${apt.key || 'Unknown'}</p>
      <p><strong>Link:</strong> <a href="https://www.kiinteistomaailma.fi/${apt.key}" target="_blank">View</a></p>
      <p><strong>Agent:</strong> ${apt.agent_name || 'Unknown Agent'} (Key: ${apt.agent_key || 'N/A'})</p>
      <p><strong>Agent Email:</strong> ${apt.agency_email || 'Unknown'}</p>
      <p><strong>Agency:</strong> ${apt.agency || 'Unknown'}</p>
      <p><strong>Phone:</strong> ${apt.agent_phone || 'Unknown'}</p>
      <p><strong>Degrees:</strong> ${apt.agent_degrees || 'None'}</p>
      <p><strong>Title:</strong> ${apt.agent_title || 'None'}</p>
      <img src="${apt.agent_image || 'https://via.placeholder.com/50'}" alt="${apt.agent_name || 'Agent'}" style="max-width: 100px; height: auto; border-radius: 4px;" loading="lazy">
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
  const session = await supabase.auth.getSession();
  if (!session.data.session) {
    showAlert(translations[currentLanguage].pleaseLogin);
    return;
  }
  showLoadingScreen(true);
  try {
    const { data, error } = await supabase.from('campaigns').select('*').eq('id', id).single();
    if (error) throw new Error(error.message);
    if (!data) {
      showAlert('Campaign not found in memory. Please fetch campaigns again.');
      return;
    }
    const camp = data;
    document.getElementById('norr3-campaign-info-modal').style.display = 'flex';
    const info = document.getElementById('norr3-campaign-info');
    info.innerHTML = `
      <h4>Campaign ID: ${camp.id}</h4>
      <p><strong>Partner Name:</strong> ${camp.partnerName || 'Kiinteistömaailma Helsinki'}</p>
      <p><strong>Agent:</strong> ${camp.agent_name || 'Unknown Agent'} (Key: ${camp.agent_key || 'N/A'})</p>
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

async function norr3CheckNotifications() {
  const session = await supabase.auth.getSession();
  if (!session.data.session) return;
  showLoadingScreen(true);
  try {
    const { data: camps, error } = await supabase.from('campaigns').select('*');
    if (error) throw error;
    const now = new Date();
    const hasNotifs = camps.some(c => {
      const endDate = c.end_date ? new Date(c.end_date) : null;
      const isExpired = endDate && endDate < now;
      const budgetLimit = Object.values(c.budget).reduce((sum, val) => sum + (parseFloat(val) || 0), 0) * 0.9;
      const currentBudget = Object.values(c.budget).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
      return (endDate && (isExpired || (endDate - now) < 7 * 24 * 60 * 60 * 1000)) || (currentBudget >= budgetLimit);
    });
    const notifIcon = document.getElementById('norr3-notification-icon');
    if (hasNotifs) {
      notifIcon.classList.add('new');
    } else {
      notifIcon.classList.remove('new');
    }
  } catch (err) {
    console.error('Error checking notifications:', err);
  } finally {
    showLoadingScreen(false);
  }
}

async function norr3ShowNotifications() {
  const session = await supabase.auth.getSession();
  if (!session.data.session) {
    showAlert(translations[currentLanguage].pleaseLogin);
    return;
  }
  showLoadingScreen(true);
  try {
    const { data: camps, error } = await supabase.from('campaigns').select('*');
    if (error) throw error;
    const notifs = [];
    const now = new Date();
    camps.forEach(c => {
      const endDate = c.end_date ? new Date(c.end_date) : null;
      const isExpired = endDate && endDate < now;
      const budgetLimit = Object.values(c.budget).reduce((sum, val) => sum + (parseFloat(val) || 0), 0) * 0.9;
      const currentBudget = Object.values(c.budget).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
      if (endDate) {
        if (isExpired) {
          notifs.push(`Campaign ID ${c.id} has expired (ended on ${formatDate(endDate)}).`);
        } else if ((endDate - now) < 7 * 24 * 60 * 60 * 1000) {
          notifs.push(`Campaign ID ${c.id} ends in ${Math.ceil((endDate - now) / (24 * 60 * 60 * 1000))} days (${formatDate(endDate)}).`);
        }
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
  } catch (err) {
    showAlert('Failed to load notifications: ' + err.message);
  } finally {
    showLoadingScreen(false);
  }
}
function norr3CloseNotificationModal(event) {
  document.getElementById('norr3-notification-modal').style.display = 'none';
}

async function norr3UpdateMetrics() {
  const session = await supabase.auth.getSession();
  if (!session.data.session) return;
  showLoadingScreen(true);
  try {
    const { data: camps, error } = await supabase.from('campaigns').select('*');
    if (error) throw error;
    const activeCount = camps.filter(c => c.status).length;
    const pausedCount = camps.filter(c => !c.status).length;
    const totalBudget = camps.reduce((sum, c) =>
      sum + Object.values(c.budget).reduce((s, v) => s + (parseFloat(v) || 0), 0), 0);
    document.getElementById('norr3-active-count').textContent = activeCount;
    document.getElementById('norr3-paused-count').textContent = pausedCount;
    document.getElementById('norr3-total-budget').textContent = totalBudget.toFixed(2) + '€';
  } catch (err) {
    console.error('Error updating metrics:', err);
  } finally {
    showLoadingScreen(false);
  }
}

async function norr3AddUser() {
  const session = await supabase.auth.getSession();
  if (!session.data.session || session.data.session.user.role !== 'admin') {
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
    const role = document.getElementById('norr3-user-role').value || 'partner';
    if (!email || !partnerName || !agentName || !agentKey || !password) {
      showAlert('All fields except Agent Image are required.');
      return;
    }
    const user = { email, password, partnerName, agentName, agentKey, agentImage, role };
    const { data, error } = await supabase.from('users').insert([user]).select().single();
    if (error) throw new Error(error.message);
    await norr3RenderUsers();
    showAlert('User added successfully!');
  } catch (err) {
    showAlert('Error adding user: ' + err.message);
  } finally {
    showLoadingScreen(false);
  }
}

async function norr3AutoFillUser() {
  const session = await supabase.auth.getSession();
  if (!session.data.session || session.data.session.user.role !== 'admin') {
    showAlert('Only admins can manage users.');
    return;
  }
  showLoadingScreen(true);
  try {
    const email = document.getElementById('norr3-user-email').value;
    if (!email) {
      showAlert('Please enter an agent email to auto-fill.');
      return;
    }
    const agentInfo = await fetchAgentInfo(email);
    if (!agentInfo) {
      showAlert(translations[currentLanguage].agentNotFound);
      return;
    }
    document.getElementById('norr3-user-agent-name').value = agentInfo.agentName || '';
    document.getElementById('norr3-user-agent-key').value = agentInfo.agentKey || '';
    document.getElementById('norr3-user-agent-image').value = agentInfo.pictureUrl || '';
    document.getElementById('norr3-user-partner-name').value = agentInfo.agency || 'Kiinteistömaailma Helsinki';
    showAlert('Agent information auto-filled successfully!');
  } catch (err) {
    showAlert('Error auto-filling user: ' + err.message);
  } finally {
    showLoadingScreen(false);
  }
}

async function norr3RemoveUser() {
  const session = await supabase.auth.getSession();
  if (!session.data.session || session.data.session.user.role !== 'admin') {
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
    const { error } = await supabase.from('users').delete().eq('email', email);
    if (error) throw new Error(error.message);
    await norr3RenderUsers();
    showAlert('User removed successfully!');
  } catch (err) {
    showAlert('Error removing user: ' + err.message);
  } finally {
    showLoadingScreen(false);
  }
}

async function norr3EditUser() {
  const session = await supabase.auth.getSession();
  if (!session.data.session || session.data.session.user.role !== 'admin') {
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
    const role = document.getElementById('norr3-user-role').value || 'partner';
    if (!email) {
      showAlert('Please enter an email to edit.');
      return;
    }
    const user = { partnerName, agentName, agentKey, agentImage, role };
    if (password) user.password = password;
    const { data, error } = await supabase
      .from('users')
      .update(user)
      .eq('email', email)
      .select()
      .single();
    if (error) throw new Error(error.message);
    if (!data) return res.status(404).json({ error: 'User not found' });
    await norr3RenderUsers();
    showAlert('User edited successfully!');
  } catch (err) {
    showAlert('Error editing user: ' + err.message);
  } finally {
    showLoadingScreen(false);
  }
}

async function norr3RenderUsers() {
  const session = await supabase.auth.getSession();
  if (!session.data.session || session.data.session.user.role !== 'admin') return;
  showLoadingScreen(true);
  try {
    const { data, error } = await supabase.from('users').select('*');
    if (error) throw new Error(error.message);
    const list = document.getElementById('norr3-user-list');
    list.innerHTML = '';
    data.forEach(u => {
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

async function updateProfileDropdown() {
  const session = await supabase.auth.getSession();
  if (!session.data.session) return;
  const user = session.data.session.user;
  const profileImg = document.getElementById('norr3-profile-img');
  const profileDropdown = document.getElementById('norr3-profile-dropdown');
  if (profileImg && profileDropdown) {
    profileImg.src = user.user_metadata.agentImage || 'https://via.placeholder.com/50';
    profileImg.alt = `${user.user_metadata.agentName || 'User'} Profile`;
    profileDropdown.innerHTML = `
      <p>${user.email}</p>
      <button onclick="showAccountSettings()" class="norr3-dropdown-btn">Account Settings</button>
      <button onclick="norr3Logout()" class="norr3-dropdown-btn">Logout</button>
    `;
  }
}

function toggleProfileDropdown() {
  const dropdown = document.getElementById('norr3-profile-dropdown');
  if (dropdown.style.display === 'block') {
    dropdown.style.display = 'none';
  } else {
    dropdown.style.display = 'block';
  }
}

function showAccountSettings() {
  // Placeholder for account settings modal (to be implemented in index.html and styled in styles.css)
  showAlert('Account settings feature coming soon!');
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
  document.addEventListener('click', (e) => {
    const profileDropdown = document.getElementById('norr3-profile-dropdown');
    const profileImg = document.getElementById('norr3-profile-img');
    if (profileDropdown && profileImg && !profileDropdown.contains(e.target) && e.target !== profileImg) {
      profileDropdown.style.display = 'none';
    }
  });

  // Handle Google OAuth redirect
  const urlParams = new URLSearchParams(window.location.search);
  const sessionStr = urlParams.get('session');
  if (sessionStr) {
    const session = JSON.parse(decodeURIComponent(sessionStr));
    supabase.auth.setSession(session);
    const role = urlParams.get('role') || 'admin';
    const partnerName = urlParams.get('partnerName') || 'NØRR3';
    document.getElementById('norr3-container').style.display = 'block';
    if (role === 'admin') {
      showSection('norr3-service-selection');
    } else {
      showSection('norr3-campaign-setup');
    }
    updateProfileDropdown();
    window.history.replaceState({}, document.title, window.location.pathname); // Clear URL params
  }
});

window.onload = async function() {
  setLanguage(currentLanguage);
  const session = await supabase.auth.getSession();
  if (session.data.session) {
    document.getElementById('norr3-container').style.display = 'block';
    if (session.data.session.user.role === 'admin') {
      showSection('norr3-service-selection');
      document.getElementById('norr3-user-management-btn').style.display = 'inline-block';
      document.getElementById('norr3-back-button').style.display = 'inline-block';
    } else {
      showSection('norr3-campaign-setup');
      document.getElementById('norr3-user-management-btn').style.display = 'none';
      document.getElementById('norr3-back-button').style.display = 'none';
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
    updateProfileDropdown(); // Initialize profile dropdown on load
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
  if (supabase.auth.getSession()?.user.role === 'admin') {
    norr3RenderUsers();
  }
};