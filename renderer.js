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



