const eventsData = [
  { id: 1, title: 'Frontend Meetup', date: '2025-11-10', status: 'confirmed', tags: ['meetup', 'frontend'], format: 'online' },
  { id: 2, title: 'Design Sprint', date: '2025-11-12', status: 'draft', tags: ['design', 'sprint'], format: 'hybrid'},
  { id: 3, title: 'Hackathon Weekend', date: '2025-11-15', status: 'confirmed', tags: ['hackathon', 'coding'] },
  { id: 4, title: 'Tech Talk: AI', date: '2025-11-20', status: 'cancelled', tags: ['ai', 'talk'], format: 'hybrid' },
  { id: 5, title: 'QA & Testing Day', date: '2025-11-22', status: 'confirmed', tags: ['ux', 'workshop'] },
  { id: 6, title: 'AI & ML Bootcamp', date: '2025-11-22', status: 'confirmed', tags: ['ux', 'workshop'] },
  { id: 7, title: 'Product Management Meetup', date: '2025-11-22', status: 'confirmed', tags: ['ux', 'workshop'] },
  { id: 8, title: 'Cybersecurity Talk', date: '2025-11-22', status: 'confirmed', tags: ['ux', 'workshop'] },
  { id: 9, title: 'GameDev Jam', date: '2025-11-22', status: 'confirmed', tags: ['ux', 'workshop'] },
  { id: 10, title: 'Web Accessibility Workshop', date: '2025-11-22', status: 'confirmed', tags: ['ux', 'workshop'] },
  { id: 11, title: 'Agile & Scrum Deep Dive', date: '2025-11-22', status: 'confirmed', tags: ['ux', 'workshop'] },
  { id: 12, title: 'UX Workshop', date: '2025-11-22', status: 'confirmed', tags: ['ux', 'workshop'] },
  { id: 13, title: 'UX Workshop', date: '2025-11-22', status: 'confirmed', tags: ['ux', 'workshop'] },
  { id: 14, title: 'UX Workshop', date: '2025-11-22', status: 'confirmed', tags: ['ux', 'workshop'] },
  { id: 15, title: 'UX Workshop', date: '2025-11-22', status: 'confirmed', tags: ['ux', 'workshop'] },
];

const registrationsData = [
  { participantName: 'Анна Петрова', ticketType: 'vip', status: 'paid', date: '2025-11-01' },
  { participantName: 'Борис Иванов', ticketType: 'standard', status: 'pending', date: '2025-11-03' },
  { participantName: 'Вера Смирнова', ticketType: 'student', status: 'refunded', date: '2025-11-05' },
  { participantName: 'Глеб Козлов', ticketType: 'vip', status: 'paid', date: '2025-11-07' },
  { participantName: 'Диана Орлова', ticketType: 'standard', status: 'paid', date: '2025-11-08' },
];


// --- Утилиты ---
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <svg style="width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:2;display:block" viewBox="0 0 24 24">
      ${type === 'success'
        ? '<path d="M20 6L9 17l-5-5" />'
        : type === 'error'
          ? '<path d="M12 18.005l-6-6m0 12l6-6m-6-2h12v-2h-12v2z" />'
          : '<circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/>'}
    </svg>
    <span>${escapeHtml(message)}</span>
  `;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('show');
    setTimeout(() => toast.remove(), 3000);
  }, 50);
}

// --- Переключение тем и акцента ---
function initThemeSwitcher() {
  const radios = document.querySelectorAll('input[name="theme"]');
  radios.forEach(r => r.addEventListener('change', () => {
    document.body.setAttribute('data-theme', r.value);
  }));
}

function initAccentColor() {
  const picker = document.getElementById('accent-picker');
  if (picker) {
    picker.addEventListener('input', e => {
      document.documentElement.style.setProperty('--color-accent', e.target.value);
    });
  }
}

// --- Навигация между вкладками ---
function initNavigation() {
  const links = document.querySelectorAll('.nav-link[data-view]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const viewId = link.dataset.view;

      // убираем active у всех ссылок
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      // скрываем все панели
      document.querySelectorAll('.view-pane').forEach(p => p.classList.add('hidden'));
      // показываем нужную
      document.getElementById(`${viewId}-view`).classList.remove('hidden');
    });
  });
}

// --- Модалка «Добавить мероприятие» ---
function initAddEventModal() {
  const btn = document.getElementById('add-event-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const modal = document.getElementById('add-event-modal');
    if (!modal) return;
    modal.innerHTML = `
      <div class="modal-content">
        <h3>Новое мероприятие</h3>
        <div class="form-row">
          <div class="form-group">
            <label for="new-event-title">Название</label>
            <input type="text" id="new-event-title" placeholder="Например: Новогодний корпоратив" />
          </div>
          <div class="form-group">
            <label for="new-event-date">Дата</label>
            <input type="date" id="new-event-date" />
          </div>
        </div>
        <div class="form-group">
          <label>Теги (через запятую)</label>
          <input type="text" id="new-event-tags" placeholder="vip, tech, business" />
        </div>
        <button type="button" id="save-event-btn" class="btn btn-primary" style="width:100%">Сохранить</button>
        <button type="button" id="close-event-modal-btn" class="btn btn-outline" style="width:100%; margin-top:var(--sp-2)">Отмена</button>
      </div>
    `;
    modal.classList.add('show');

    const dateInput = document.getElementById('new-event-date');
    if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];

    document.getElementById('close-event-modal-btn').addEventListener('click', closeModal, { once: true });
    document.getElementById('save-event-btn').addEventListener('click', saveNewEvent, { once: true });
  });
}

function closeModal() {
  const modal = document.getElementById('add-event-modal');
  if (modal) {
    modal.classList.remove('show');
    setTimeout(() => modal.innerHTML = '', 300);
  }
}

function saveNewEvent() {
  const title = document.getElementById('new-event-title').value.trim();
  const date = document.getElementById('new-event-date').value;
  const tagsRaw = document.getElementById('new-event-tags').value.trim();

  if (!title) { showToast('Введите название мероприятия', 'error'); return; }
  if (!date) { showToast('Укажите дату', 'error'); return; }

  const tags = tagsRaw
    ? tagsRaw.split(',').map(t => t.trim().toLowerCase()).filter(Boolean)
    : ['general'];

  eventsData.push({
    id: Date.now(),
    title,
    date,
    status: 'draft',
    tags
  });

  closeModal();
  renderEvents();
  showToast('Мероприятие добавлено', 'success');
}

// --- Форма регистрации ---
function initFormValidation() {
  const form = document.getElementById('registration-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('reg-name');
    const typeInput = document.getElementById('reg-ticket-type');
    const name = nameInput.value.trim();
    const type = typeInput.value;

    if (!name) {
      showToast('Введите имя участника', 'error');
      return;
    }

    registrationsData.push({
      participantName: name,
      ticketType: type,
      status: 'pending',
      date: new Date().toISOString().split('T')[0]
    });

    renderRegistrations();
    showToast('Участник зарегистрирован', 'success');
    form.reset();
  });
}

// --- Рендер карточек мероприятий ---
function renderEvents() {
  const container = document.getElementById('events-container');
  if (!container) return;

  container.innerHTML = '';
  eventsData.forEach(event => {
    const card = document.createElement('div');
    card.className = 'event-card';
    const statusClassMap = {
      confirmed: 'status-confirmed',
      draft: 'status-draft',
      cancelled: 'status-cancelled'
    };
    const statusBadge = statusClassMap[event.status] || 'status-draft';

    card.innerHTML = `
      <h3>${escapeHtml(event.title)}</h3>
      <p style="color:var(--text-secondary); margin-bottom:var(--sp-2);">
        📅 ${new Date(event.date).toLocaleDateString('ru-RU')}
      </p>
      <span class="status-badge ${statusBadge}">${event.status}</span>
      <div style="margin-top:var(--sp-3); display:flex; gap:0.5rem; flex-wrap:wrap;">
        ${event.tags.map(tag => `<span style="font-size:0.75rem; padding:0.25rem 0.5rem; border-radius:999px; background:var(--bg-level-3); color:var(--text-muted)">${escapeHtml(tag)}</span>`).join('')}
      </div>
    `;
    container.appendChild(card);
  });
}

// --- Рендер таблицы регистраций ---
function renderRegistrations() {
  const tbody = document.getElementById('registrations-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';

  registrationsData.forEach((r, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${escapeHtml(r.participantName)}</td>
      <td>${r.ticketType}</td>
      <td>
        <span style="padding:0.25em 0.5em; border-radius:999px; font-size:0.75em; text-transform:uppercase; background:${r.status==='paid'?'#d1fae5':'#fef3c7'}; color:${r.status==='paid'?'#065f46':'#92400e'}">
          ${r.status}
        </span>
      </td>
      <td>${r.date}</td>
    `;
    tbody.appendChild(tr);
  });
}

// --- Расписание (упрощённо) ---
function renderSchedule() {
  const content = document.getElementById('schedule-content');
  if (!content) return;
  content.innerHTML = '';

  // Группируем события по дате
  const grouped = {};
  eventsData.forEach(e => {
    if (!grouped[e.date]) grouped[e.date] = [];
    grouped[e.date].push(e);
  });

  Object.entries(grouped).forEach(([date, events]) => {
    const block = document.createElement('div');
    block.className = 'schedule-day-block';
    const dayDate = new Date(date).toLocaleDateString('ru-RU');
    block.innerHTML = `
      <div class="schedule-day-header">
        <span class="day-date">${dayDate}</span>
        <span class="day-total">${events.length} событий</span>
      </div>
      ${events.map(e => `
        <div class="event-in-schedule">
          <span class="time-col">10:00</span>
          <span class="title-col">${escapeHtml(e.title)}</span>
          <span class="status-badge-sm ${e.status === 'confirmed' ? 'status-confirmed' : (e.status === 'cancelled' ? 'status-cancelled' : 'status-draft')}">${e.status}</span>
        </div>
      `).join('')}
    `;
    content.appendChild(block);
  });
}

// --- Фильтры и поиск ---
function initFilters() {
  // Поиск мероприятий
  const search = document.getElementById('events-search');
  if (search) {
    search.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      renderEventsFiltered(query);
    });
  }

  // Фильтр расписания по дате
  const filterDate = document.getElementById('schedule-filter-date');
  const resetBtn = document.getElementById('reset-schedule-btn');

  if (filterDate) {
    filterDate.addEventListener('change', () => {
      renderScheduleFiltered(filterDate.value);
    });
  }
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      filterDate.value = '';
      renderSchedule();
    });
  }
}

function renderEventsFiltered(query) {
  const container = document.getElementById('events-container');
  if (!container) return;
  container.innerHTML = '';

  eventsData
    .filter(e => e.title.toLowerCase().includes(query))
    .forEach(event => {
      const card = document.createElement('div');
      card.className = 'event-card';
      const statusClassMap = { confirmed: 'status-confirmed', draft: 'status-draft', cancelled: 'status-cancelled' };
      const statusBadge = statusClassMap[event.status] || 'status-draft';
      card.innerHTML = `
        <h3>${escapeHtml(event.title)}</h3>
        <p style="color:var(--text-secondary); margin-bottom:var(--sp-2);">📅 ${new Date(event.date).toLocaleDateString('ru-RU')}</p>
        <span class="status-badge ${statusBadge}">${event.status}</span>
      `;
      container.appendChild(card);
    });
}

function renderScheduleFiltered(dateFilter) {
  const content = document.getElementById('schedule-content');
  if (!content) return;
  content.innerHTML = '';

  const filtered = dateFilter
    ? eventsData.filter(e => e.date === dateFilter)
    : eventsData;

  const grouped = {};
  filtered.forEach(e => {
    if (!grouped[e.date]) grouped[e.date] = [];
    grouped[e.date].push(e);
  });

  Object.entries(grouped).forEach(([date, events]) => {
    const block = document.createElement('div');
    block.className = 'schedule-day-block';
    const dayDate = new Date(date).toLocaleDateString('ru-RU');
    block.innerHTML = `
      <div class="schedule-day-header">
        <span class="day-date">${dayDate}</span>
        <span class="day-total">${events.length} событий</span>
      </div>
      ${events.map(e => `
        <div class="event-in-schedule">
          <span class="time-col">10:00</span>
          <span class="title-col">${escapeHtml(e.title)}</span>
          <span class="status-badge-sm ${e.status === 'confirmed' ? 'status-confirmed' : (e.status === 'cancelled' ? 'status-cancelled' : 'status-draft')}">${e.status}</span>
        </div>
      `).join('')}
    `;
    content.appendChild(block);
  });
}

// --- Инициализация ---
document.addEventListener('DOMContentLoaded', () => {
  initThemeSwitcher();
  initAccentColor();
  initNavigation();
  initAddEventModal();
  initFormValidation();
  initFilters();

  renderEvents();
  renderRegistrations();
  renderSchedule();
});
 // --- Логика переключения тем ---
    const themeRadios = document.querySelectorAll('input[name="theme"]');
    const body = document.body;

    themeRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        const themeValue = radio.value;
        body.setAttribute('data-theme', themeValue);
      });
    });

    // --- Переключение вкладок ---
    const navLinks = document.querySelectorAll('.nav-link');
    const viewPanes = document.querySelectorAll('.view-pane');

    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();

        // Убираем активный класс у всех ссылок и скрываем все панели
        navLinks.forEach(l => l.classList.remove('active'));
        viewPanes.forEach(p => p.classList.add('hidden'));

        // Добавляем активный класс нажатой ссылке и показываем нужную панель
        link.classList.add('active');
        const targetView = link.getAttribute('data-view');
        document.getElementById(targetView + '-view').classList.remove('hidden');
      });
    });

    // --- Модальное окно: Добавить мероприятие ---
    const addEventBtn = document.getElementById('add-event-btn');
    const modalOverlay = document.getElementById('add-event-modal');
    const closeModalBtn = document.getElementById('modal-close-btn');
    const addEventForm = document.getElementById('add-event-form');

    function openModal() {
      modalOverlay.classList.add('show');
      // Небольшая задержка для корректной работы transition
      setTimeout(() => {
        modalOverlay.style.display = 'flex';
      }, 50);
    }

    function closeModal() {
      modalOverlay.classList.remove('show');
      setTimeout(() => {
        modalOverlay.style.display = 'none';
      }, 250); // Должно совпадать с длительностью transition в CSS
    }

    addEventBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);

    // Закрытие по клику вне окна
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });

    // Обработка отправки формы (имитация)
    addEventForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(addEventForm);
      const name = formData.get('name');
      const date = formData.get('date');
      const time = formData.get('start_time');
      const desc = formData.get('description');

      // Здесь можно добавить логику сохранения (AJAX, fetch и т.д.)
      console.log('Добавлено мероприятие:', { name, date, time, desc });

      alert(`Мероприятие "${name}" успешно добавлено!`);
      closeModal();
      addEventForm.reset();
    });

    // --- Простой тост-уведомление (опционально) ---
    function showToast(message) {
      const toastContainer = document.getElementById('toast-container');
      const toast = document.createElement('div');
      toast.textContent = message;
      toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--color-accent);
        color: white;
        padding: 10px 16px;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 2000;
        animation: slideIn 0.3s ease-out;
      `;
      toastContainer.appendChild(toast);
      setTimeout(() => {
        toast.remove();
      }, 3000);
    }




