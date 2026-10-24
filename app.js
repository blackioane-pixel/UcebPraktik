import { initTabs } from './components.js';
import { initAccordion } from './components.js';
import { initToast, showToast } from './components.js';
import { renderEvents } from './renderer.js';
import { renderRegistrations } from './renderer.js';

// --- Тема и акцентный цвет ---

function getSavedOrSystemTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) return saved;

  const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  return system;
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);

  // Синхронизируем радио‑кнопки переключателя тем
  document.querySelectorAll('input[name="theme"]').forEach(radio => {
    radio.checked = radio.value === theme;
  });
}

export function initThemeSwitcher() {
  const radios = document.querySelectorAll('input[name="theme"]');
  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.checked) {
        applyTheme(radio.value);
      }
    });
  });
}

export function initSystemThemeListener() {
  const mq = window.matchMedia('(prefers-color-scheme: dark)');

  function onSystemChange(e) {
    // Меняем тему только если пользователь не выбирал вручную
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

export function initAccentColor() {
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

function updateAccentColor(hex) {
  const rgb = hexToRgb(hex);
  document.documentElement.style.setProperty('--color-accent', hex);
  document.documentElement.style.setProperty('--color-accent-rgb', rgb);
}

// --- Мобильное меню ---

export function initMobileMenu() {
  const toggle = document.getElementById('mobile-menu-toggle');
  const navList = document.querySelector('.nav-list');
  const overlay = document.createElement('div');
  overlay.className = 'mobile-overlay';
  document.body.appendChild(overlay);

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

// --- Валидация формы регистрации ---

export function initFormValidation() {
  const form = document.getElementById('registration-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    const nameInput = document.getElementById('reg-name');
    const emailInput = document.getElementById('reg-email');
    const ticketInput = document.getElementById('reg-ticket');

    [nameInput, emailInput, ticketInput].forEach(input => {
      const errorSpan = input.nextElementSibling;
      if (!errorSpan || !errorSpan.classList.contains('error-msg')) return;

      let error = '';
      if (input.required && !input.value.trim()) {
        error = 'Это поле обязательно';
      } else if (input.type === 'email' && input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        error = 'Введите корректный email';
      } else if (input.id === 'reg-name' && input.minLength && input.value.length < input.minLength) {
        error = `Минимум ${input.minLength} символов`;
      }

      if (error) {
        isValid = false;
        errorSpan.textContent = error;
        input.classList.add('invalid');
      } else {
        errorSpan.textContent = '';
        input.classList.remove('invalid');
      }
    });

    if (isValid) {
      showToast('Регистрация успешно отправлена!', 'success');
      form.reset();
      // Здесь можно добавить логику отправки на сервер
    } else {
      showToast('Есть ошибки в форме', 'error');
    }
  });
}

// --- Фильтры и сортировка (базовая реализация) ---

export function initFiltersAndSort() {
  const search = document.getElementById('search');
  const ticketType = document.getElementById('ticket-type');
  const statusCheckboxes = document.querySelectorAll('input[name="status"]');
  const viewModeRadios = document.querySelectorAll('input[name="view-mode"]');
  const resetBtn = document.getElementById('reset-filters');
  const eventsContainer = document.getElementById('events-container');
  const regTableBody = document.getElementById('registrations-table-body');
  const sortableHeaders = document.querySelectorAll('.sortable');

  let currentSort = { col: 'participantName', dir: 'asc' };

  function applyFiltersAndRender() {
    renderEvents(); // renderer сам может учитывать фильтры, если дописать логику внутри
    renderRegistrations();
  }

  if (search) {
    search.addEventListener('input', applyFiltersAndRender);
  }
  if (ticketType) {
    ticketType.addEventListener('change', applyFiltersAndRender);
  }
  statusCheckboxes.forEach(cb => cb.addEventListener('change', applyFiltersAndRender));
  viewModeRadios.forEach(rb => rb.addEventListener('change', applyFiltersAndRender));

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      search.value = '';
      ticketType.value = '';
      statusCheckboxes.forEach(cb => cb.checked = cb.defaultChecked);
      viewModeRadios[0].checked = true;
      applyFiltersAndRender();
    });
  }

  sortableHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const col = header.getAttribute('data-sort');
      if (currentSort.col === col) {
        currentSort.dir = currentSort.dir === 'asc' ? 'desc' : 'asc';
      } else {
        currentSort = { col, dir: 'asc' };
      }
      renderRegistrations(); // в renderer можно добавить сортировку по currentSort
    });
  });
}

// --- Инициализация всего приложения ---

export async function initApp() {
  // Применяем тему ДО рендера (дублируем для надёжности)
  applyTheme(getSavedOrSystemTheme());

  initThemeSwitcher();
  initSystemThemeListener();
  initAccentColor();
  initMobileMenu();
  initTabs();
  initAccordion();
  initToast();
  initFormValidation();
  initFiltersAndSort();

  renderEvents();
  renderRegistrations();
}

// Точка входа
(async () => {
  try {
    await initApp();
  } catch (err) {
    console.error('Ошибка инициализации приложения:', err);
    showToast('Ошибка загрузки страницы. Проверьте консоль.', 'error');
  }
})();
