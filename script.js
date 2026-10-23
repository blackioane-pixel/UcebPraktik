// --- Тема и акцент ---
function getSavedOrSystemTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) return saved;
  const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  return system;
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);

  document.querySelectorAll('input[name="theme"]').forEach(radio => {
    radio.checked = radio.value === theme;
  });
}

function initThemeSwitcher() {
  const radios = document.querySelectorAll('input[name="theme"]');
  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.checked) applyTheme(radio.value);
    });
  });
}

function initSystemThemeListener() {
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  function onSystemChange(e) {
    if (!localStorage.getItem('theme')) {
      const newTheme = e.matches ? 'dark' : 'light';
      applyTheme(newTheme);
    }
  }
  mq.addEventListener('change', onSystemChange);
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

function updateAccentColor(hex) {
  const rgb = hexToRgb(hex);
  document.documentElement.style.setProperty('--color-accent', hex);
  document.documentElement.style.setProperty('--color-accent-rgb', rgb);
}

function initAccentColor() {
  const picker = document.getElementById('accent-picker');
  if (!picker) return;

  const savedAccent = localStorage.getItem('accent-color');
  if (savedAccent) {
    picker.value = savedAccent;
    updateAccentColor(savedAccent);
  }

  picker.addEventListener('input', (e) => {
    const color = e.target.value;
    localStorage.setItem('accent-color', color);
    updateAccentColor(color);
  });
}

// --- Мобильное меню ---
function initMobileMenu() {
  const toggle = document.getElementById('mobile-menu-toggle');
  const navList = document.getElementById('mobile-nav-list');
  const overlay = document.getElementById('mobile-overlay');

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    toggle.classList.toggle('active');
    navList.classList.toggle('active');
    overlay.classList.toggle('active');
  });

  overlay.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.classList.remove('active');
    navList.classList.remove('active');
    overlay.classList.remove('active');
  });
}

// --- Тосты ---
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// --- Фильтры и сортировка ---
let currentSort = { col: 'participantName', dir: 'asc' };

function applyFiltersAndRender() {
  renderEvents();
  renderRegistrations();
}

function renderEvents() {
  const search = document.getElementById('search').value.toLowerCase();
  const ticketType = document.getElementById('ticket-type').value;
  const statusCheckboxes = Array.from(document.querySelectorAll('input[name="status"]'))
    .filter(cb => cb.checked).map(cb => cb.value);

  const filtered = eventsData.filter(e => {
    const matchSearch = e.title.toLowerCase().includes(search);
    // Упрощённо: считаем, что ticketType совпадает с каким-то тегом
    const matchTicket = !ticketType || e.tags.includes(ticketType);
    const matchStatus = statusCheckboxes.length === 0 || statusCheckboxes.includes(e.status);
    return matchSearch && matchTicket && matchStatus;
  });

  const container = document.getElementById('events-container');
  container.innerHTML = '';

  if (filtered.length === 0) {
    container.innerHTML = '<div class="empty-state">Нет мероприятий по текущим фильтрам</div>';
    return;
  }

  filtered.forEach(e => {
    const card = document.createElement('article');
    card.className = 'event-card';

    const statusClass = `status-${e.status}`;
    const dateFormatted = new Date(e.date).toLocaleDateString('ru-RU', {
      day: 'numeric', month: 'long', year: 'numeric'
    });

    card.innerHTML = `
      <div class="card-header">
        <h3>${e.title}</h3>
        <span class="status-badge ${statusClass}">${e.status}</span>
      </div>
      <p class="date-badge">${dateFormatted}</p>
      <ul class="tags-list">
        ${e.tags.map(t => `<li>${t}</li>`).join('')}
      </ul>
    `;
    container.appendChild(card);
  });
}

function sortData(data, col, dir) {
  return [...data].sort((a, b) => {
    const valA = a[col];
    const valB = b[col];
    if (typeof valA === 'string' && typeof valB === 'string') {
      return dir === 'asc'
        ? valA.localeCompare(valB, 'ru')
        : valB.localeCompare(valA, 'ru');
    }
    return dir === 'asc' ? valA - valB : valB - valA;
  });
}

function renderRegistrations() {
  const search = document.getElementById('search').value.toLowerCase();
  const ticketType = document.getElementById('ticket-type').value;
  const statusCheckboxes = Array.from(document.querySelectorAll('input[name="status"]'))
    .filter(cb => cb.checked).map(cb => cb.value);

  let filtered = registrationsData.filter(r => {
    const matchSearch = r.participantName.toLowerCase().includes(search) || r.ticketType.includes(search);
    const matchTicket = !ticketType || r.ticketType === ticketType;
    const matchStatus = statusCheckboxes.length === 0 || statusCheckboxes.includes(r.status);
    return matchSearch && matchTicket && matchStatus;
  });

  // Сортировка
  filtered = sortData(filtered, currentSort.col, currentSort.dir);

  const tbody = document.getElementById('registrations-table-body');
  tbody.innerHTML = '';

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" class="empty-state" style="border:none">Нет регистраций по фильтрам</td></tr>`;
    return;
  }

  filtered.forEach(r => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td data-label="Участник">${r.participantName}</td>
      <td data-label="Билет">${r.ticketType}</td>
      <td data-label="Статус">${r.status}</td>
      <td data-label="Дата">${r.date}</td>
    `;
    tbody.appendChild(tr);
  });
}

function initFiltersAndSort() {
  const search = document.getElementById('search');
  const ticketType = document.getElementById('ticket-type');
  const statusCheckboxes = document.querySelectorAll('input[name="status"]');
  const resetBtn = document.getElementById('reset-filters');
  const sortableHeaders = document.querySelectorAll('.sortable');

  if (search) search.addEventListener('input', applyFiltersAndRender);
  if (ticketType) ticketType.addEventListener('change', applyFiltersAndRender);
  statusCheckboxes.forEach(cb => cb.addEventListener('change', applyFiltersAndRender));

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      search.value = '';
      ticketType.value = '';
      statusCheckboxes.forEach(cb => cb.checked = cb.defaultChecked);
      applyFiltersAndRender();
    });
  }

  sortableHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const col = header.getAttribute('data-sort');
      // Обновляем классы для стрелки сортировки
      sortableHeaders.forEach(h => h.classList.remove('asc', 'desc'));
      if (currentSort.col === col) {
        currentSort.dir = currentSort.dir === 'asc' ? 'desc' : 'asc';
      } else {
        currentSort = { col, dir: 'asc' };
      }
      header.classList.add(currentSort.dir);
      renderRegistrations();
    });
  });
}

function initFormValidation() {
  const form = document.getElementById('registration-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('reg-name');
    const emailInput = document.getElementById('reg-email');
    const ticketInput = document.getElementById('reg-ticket');

    // Сброс ошибок
    [nameInput, emailInput, ticketInput].forEach(input => {
      input.classList.remove('invalid');
      const errorSpan = input.nextElementSibling;
      if (errorSpan && errorSpan.classList.contains('error-msg')) {
        errorSpan.textContent = '';
      }
    });

    let isValid = true;

    // Валидация имени
    if (!nameInput.value || nameInput.value.trim().length < 3) {
      nameInput.classList.add('invalid');
      const errorSpan = nameInput.nextElementSibling;
      if (errorSpan) errorSpan.textContent = 'Имя должно быть не короче 3 символов';
      isValid = false;
    }

    // Валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      emailInput.classList.add('invalid');
      const errorSpan = emailInput.nextElementSibling;
      if (errorSpan) errorSpan.textContent = 'Введите корректный email';
      isValid = false;
    }

    // Валидация билета
    if (!ticketInput.value) {
      ticketInput.classList.add('invalid');
      const errorSpan = ticketInput.nextElementSibling;
      if (errorSpan) errorSpan.textContent = 'Выберите тип билета';
      isValid = false;
    }

    if (!isValid) {
      showToast('Исправьте ошибки в форме', 'error');
      return;
    }

    // Успешная регистрация (имитация)
    const newRegistration = {
      participantName: nameInput.value.trim(),
      ticketType: ticketInput.value,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
    };

    registrationsData.push(newRegistration);
    renderRegistrations();
    showToast('Участник успешно зарегистрирован!', 'success');

    form.reset();
  });
}

// --- Инициализация всех компонентов ---
function init() {
  initThemeSwitcher();
  initSystemThemeListener();
  initAccentColor();
  initMobileMenu();
  initFiltersAndSort();
  initFormValidation();

  // Первоначальный рендер
  renderEvents();
  renderRegistrations();
}

// Запуск после загрузки DOM
document.addEventListener('DOMContentLoaded', init);
