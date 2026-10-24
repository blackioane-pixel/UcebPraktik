document.addEventListener('DOMContentLoaded', () => {
  // --- Переключение тем ---
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
      const targetPane = document.getElementById(targetView + '-view');
      if (targetPane) {
        targetPane.classList.remove('hidden');
      }
    });
  });

  // --- Модальное окно: Добавить мероприятие ---
  const addEventBtn = document.getElementById('add-event-btn');
  const modalOverlay = document.getElementById('add-event-modal');
  const closeModalBtn = document.getElementById('modal-close-btn');
  const addEventForm = document.getElementById('add-event-form');

  function openModal() {
    modalOverlay.classList.add('show');
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

  if (addEventBtn) addEventBtn.addEventListener('click', openModal);
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

  // Закрытие по клику вне окна
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }

  // Обработка отправки формы добавления мероприятия
  if (addEventForm) {
    addEventForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(addEventForm);
      const name = formData.get('name');
      const date = formData.get('date');
      const time = formData.get('start_time');
      const desc = formData.get('description');

      console.log('Добавлено мероприятие:', { name, date, time, desc });

      showToast(`Мероприятие "${name}" успешно добавлено!`);
      closeModal();
      addEventForm.reset();
    });
  }

  // --- Тосты (уведомления) ---
  function showToast(message) {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.textContent = message;
    toast.className = 'toast';
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  // --- Пример: заполнение таблицы регистрации (демо) ---
  const regTableBody = document.getElementById('registrations-table-body');
  if (regTableBody) {
    const demoData = [
      { name: 'Анна Петрова', type: 'VIP', status: 'Confirmed', date: '2025-11-10' },
      { name: 'Иван Сидоров', type: 'Standard', status: 'Pending', date: '2025-11-12' },
    ];

    demoData.forEach(row => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${row.name}</td>
        <td>${row.type}</td>
        <td>${row.status}</td>
        <td>${row.date}</td>
        <td><button class="btn btn-outline" style="padding:4px 8px;">Удалить</button></td>
      `;
      regTableBody.appendChild(tr);
    });
  }
});
// --- Покупка билета: модалка подтверждения ---
const purchaseModal = document.getElementById('purchase-modal');
const purchaseCloseBtn = document.getElementById('purchase-close-btn');
const purchasePayBtn = document.getElementById('purchase-pay-btn');
const purchaseCancelBtn = document.getElementById('purchase-cancel-btn');
const purchaseDetails = document.getElementById('purchase-details');

function openPurchaseModal(ticketType, price, eventName) {
  purchaseDetails.innerHTML = `
    <p><strong>Мероприятие:</strong> ${escapeHtml(eventName)}</p>
    <p><strong>Тип билета:</strong> ${escapeHtml(ticketType)}</p>
    <p style="font-size:1.2rem; font-weight:bold;">${price}</p>
  `;
  purchaseModal.classList.add('show');
  setTimeout(() => {
    purchaseModal.style.display = 'flex';
  }, 50);
}

function closePurchaseModal() {
  purchaseModal.classList.remove('show');
  setTimeout(() => {
    purchaseModal.style.display = 'none';
  }, 250);
}

if (purchaseCloseBtn) purchaseCloseBtn.addEventListener('click', closePurchaseModal);
if (purchaseCancelBtn) purchaseCancelBtn.addEventListener('click', closePurchaseModal);

if (purchasePayBtn) {
  purchasePayBtn.addEventListener('click', () => {
    // Имитация перехода на платёжную страницу
    showToast('Переход на платёжную систему…');
    // Вариант А: открыть новую вкладку с заглушкой
    window.open('/payment-page.html?type=confirmed', '_blank');
    closePurchaseModal();
    // Вариант Б (альтернатива): просто редирект (закомментируй, если не нужен)
    // window.location.href = '/payment-page.html?type=confirmed';
  });
}

// Обработчики кнопок «Купить» в карточках билетов
document.querySelectorAll('.tickets-grid a[href^="/payment"]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault(); // Отменяем обычный переход по ссылке

    // Парсим параметры из href (например: /payment?type=standard&event=techmeetup)
    const url = new URL(btn.href, window.location.origin);
    const type = url.searchParams.get('type') || 'Unknown';
    const event = url.searchParams.get('event') || 'Неизвестно';

    let price = '0 ₽';
    if (type === 'standard') price = '1 500 ₽';
    else if (type === 'vip') price = '3 000 ₽';
    else if (type === 'student') price = '900 ₽';

    openPurchaseModal(type, price, getEventNameByCode(event));
  });
});

function getEventNameByCode(code) {
  const map = {
    'techmeetup': 'TechMeetup: Frontend тренды',
    'vip-dinner': 'VIP‑ужин для партнёров',
    'hackathon': 'Студенческий хакатон'
  };
  return map[code] || code;
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
// --- Фильтры и поиск ---
const eventsSearch = document.getElementById('events-search');
const typeSelectTrigger = document.getElementById('type-select-trigger');
const typeOptionsList = document.getElementById('type-options-list');
const typeSelectText = document.getElementById('type-select-text');
const formatCheckboxes = document.querySelectorAll('input[name="format"]');
const viewModeRadios = document.querySelectorAll('input[name="view-mode"]');
const resetBtn = document.getElementById('filters-reset-btn');
const eventsContainer = document.getElementById('events-container');

let selectedType = 'all';
let selectedFormats = [];
let viewMode = 'grid';

// Поиск
if (eventsSearch) {
  eventsSearch.addEventListener('input', applyFilters);
}

// Кастомный select
if (typeSelectTrigger) {
  typeSelectTrigger.addEventListener('click', () => {
    typeOptionsList.classList.toggle('show');
  });
}

if (typeOptionsList) {
  typeOptionsList.querySelectorAll('.custom-option').forEach(opt => {
    opt.addEventListener('click', () => {
      selectedType = opt.dataset.value;
      typeSelectText.textContent = opt.textContent;
      typeOptionsList.classList.remove('show');
      applyFilters();
    });
  });

  // Закрытие по клику вне
  document.addEventListener('click', (e) => {
    if (!typeSelectWrapper.contains(e.target)) {
      typeOptionsList.classList.remove('show');
    }
  });
}

const typeSelectWrapper = document.getElementById('type-select-wrapper');

// Чекбоксы форматов
formatCheckboxes.forEach(cb => {
  cb.addEventListener('change', () => {
    selectedFormats = Array.from(formatCheckboxes)
      .filter(c => c.checked)
      .map(c => c.value);
    applyFilters();
  });
});

// Радио: вид отображения
viewModeRadios.forEach(rb => {
  rb.addEventListener('change', () => {
    viewMode = rb.value;
    applyFilters();
  });
});

// Сброс фильтров
if (resetBtn) {
  resetBtn.addEventListener('click', () => {
    eventsSearch.value = '';
    selectedType = 'all';
    typeSelectText.textContent = 'Все типы';
    typeOptionsList.classList.remove('show');

    formatCheckboxes.forEach(cb => {
      cb.checked = false;
    });
    selectedFormats = [];

    const defaultRadio = document.querySelector('input[name="view-mode"][value="grid"]');
    if (defaultRadio) {
      defaultRadio.checked = true;
      viewMode = 'grid';
    }

    applyFilters();
  });
}

function applyFilters() {
  const searchTerm = (eventsSearch?.value || '').toLowerCase().trim();

  const cards = Array.from(eventsContainer.querySelectorAll('.event-card'));
  cards.forEach(card => {
    const title = card.querySelector('h3')?.textContent?.toLowerCase() || '';
    const desc = card.querySelector('p')?.textContent?.toLowerCase() || '';

    // Простая эмуляция типа и формата из текста карточки
    const hasSearch = !searchTerm || title.includes(searchTerm) || desc.includes(searchTerm);

    // Здесь можно хранить тип/формат в data-атрибутах, чтобы фильтровать точнее
    // Для демо будем считать, что тип есть в заголовке
    const isType = selectedType === 'all' || title.includes(selectedType) || title.includes(['conference','workshop','meetup','hackathon','bootcamp'].find(t => t === selectedType));

    // Формат — пока упрощённо: если ни один не выбран, показываем всё
    const isFormat = selectedFormats.length === 0 || selectedFormats.some(f => title.includes(f) || desc.includes(f));

    if (hasSearch && isType && isFormat) {
      card.style.display = viewMode === 'grid' ? 'block' : 'flex';
      // Для списка удобно использовать flex или block с margin
      if (viewMode === 'list') {
        card.style.marginBottom = '12px';
        card.style.border = '1px solid var(--border-main)';
        card.style.padding = '12px';
      } else {
        card.style.marginBottom = '';
        card.style.border = '';
        card.style.padding = '';
      }
      card.style.opacity = '1';
    } else {
      card.style.display = 'none';
    }
  });
}
