import { events, registrations } from "./data.js";

export function renderEvents() {
  const container = document.getElementById("events-container");
  if (!container) return;

  // Скелетон
  container.innerHTML = `
    <div class="skeleton-block"></div>
    <div class="skeleton-block"></div>
    <div class="skeleton-block"></div>
  `;

  setTimeout(() => {
    container.innerHTML = "";
    events.forEach((e) => {
      const card = document.createElement("article");
      card.className = "event-card";
      card.setAttribute("role", "listitem");
      card.innerHTML = `
        <header class="card-header">
          <span class="event-id">#${e.id}</span>
          <h3>${e.title}</h3>
          <span class="status status-${e.status}">${e.status}</span>
        </header>
        <div class="card-body">
          <p>${e.description}</p>
          <div>${e.location.city}, ${e.location.venue}</div>
          <ul class="tags-list">
            ${e.tags.map((t) => `<li>${t}</li>`).join("")}
          </ul>
        </div>
        <footer class="card-meta">
          <time datetime="${e.startDate}">${new Date(e.startDate).toLocaleString()}</time>
          <span>Вместимость: ${e.capacity} чел.</span>
        </footer>
      `;
      container.appendChild(card);
    });
  }, 800);
}

export function renderRegistrations() {
  const tbody = document.getElementById("registrations-table-body");
  if (!tbody) return;

  tbody.innerHTML = "";
  registrations.forEach((r) => {
    const tr = document.createElement("tr");

    // Для мобильной версии: data-label для подписей
    tr.innerHTML = `
      <td data-label="Участник">${r.participantName}</td>
      <td data-label="Мероприятие">${r.eventId}</td>
      <td data-label="Билет">${r.ticketType}</td>
      <td data-label="Статус">
        <span class="status status-${r.status}">${r.status}</span>
      </td>
      <td data-label="Дата регистрации">
        <time datetime="${r.registeredAt}">${new Date(r.registeredAt).toLocaleString()}</time>
      </td>
    `;
    tbody.appendChild(tr);
  });
}
function renderSchedule() {
  const content = document.getElementById('schedule-content');
  if (!content) return;
  content.innerHTML = '';

  const grouped = {};
  eventsData.forEach(e => {
    if (!grouped[e.date]) grouped[e.date] = [];
    grouped[e.date].push(e);
  });

  Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b)).forEach(([date, events]) => {
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
          <div class="time-col">
            ${e.startTime}–${e.endTime}
          </div>
          <div class="title-col">
            <strong>${escapeHtml(e.title)}</strong>
            <div style="font-size:0.8rem; color:var(--text-secondary); margin-top:2px;">
              Статус: ${e.status}
            </div>
          </div>
          <span class="status-badge-sm ${e.status === 'confirmed' ? 'status-confirmed' : (e.status === 'cancelled' ? 'status-cancelled' : 'status-draft')}">
            ${e.status}
          </span>
        </div>
      `).join('')}
    `;
    content.appendChild(block);
  });
}
function renderScheduleFiltered(dateFilter) {
  const content = document.getElementById('schedule-content');
  if (!content) return;
  content.innerHTML = '';

  const filtered = dateFilter
    ? eventsData.filter(e => e.date === dateFilter)
    : eventsData;

  if (filtered.length === 0) {
    content.innerHTML = '<div style="padding:1rem; text-align:center; color:var(--text-muted);">Нет событий на эту дату</div>';
    return;
  }

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
          <div class="time-col">${e.startTime}–${e.endTime}</div>
          <div class="title-col"><strong>${escapeHtml(e.title)}</strong></div>
          <span class="status-badge-sm ${e.status === 'confirmed' ? 'status-confirmed' : (e.status === 'cancelled' ? 'status-cancelled' : 'status-draft')}">${e.status}</span>
        </div>
      `).join('')}
    `;
    content.appendChild(block);
  });
}




