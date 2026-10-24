:root {
  --bg-level-1: #ffffff;
  --bg-level-2: #f8fafc;
  --bg-level-3: #e2e8f0;
  --border-main: #e2e8f0;
  --color-accent: #3b82f6;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --sp-1: 0.25rem;
  --sp-2: 0.5rem;
  --sp-3: 1rem;
}

[data-theme="dark"] {
  --bg-level-1: #1e1e2a;
  --bg-level-2: #272733;
  --bg-level-3: #37374d;
  --border-main: #37374d;
  --color-accent: #60a5fa;
  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
}

[data-theme="corporate"] {
  --color-accent: #005f73;
}

/* Плавный переход всех цветов */
body {
  margin: 0;
  font-family: system-ui, -apple-system, sans-serif;
  background: var(--bg-level-1);
  color: var(--text-primary);
  line-height: 1.5;
  transition: background 0.3s ease, color 0.3s ease;
}

.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--sp-2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--sp-3);
  flex-wrap: wrap;
}

.logo-centered {
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--color-accent);
  text-decoration: none;
}

#desktop-nav {
  display: flex;
  gap: var(--sp-2);
}

.nav-link {
  padding: var(--sp-1) var(--sp-2);
  border-radius: 6px;
  text-decoration: none;
  color: var(--text-secondary);
  transition: 0.2s;
}

.nav-link.active, .nav-link:hover {
  background: var(--color-accent);
  color: white;
}

.theme-switcher label {
  margin-right: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
}

main {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--sp-3);
}

.controls-row {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  margin-bottom: var(--sp-3);
  flex-wrap: wrap;
}

input[type="search"] {
  padding: var(--sp-1) var(--sp-2);
  border: 1px solid var(--border-main);
  border-radius: 6px;
  width: 240px;
}

.btn {
  padding: var(--sp-1) var(--sp-2);
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
}
.btn-primary {
  background: var(--color-accent);
  color: white;
}
.btn-outline {
  border: 1px solid var(--border-main);
  color: var(--text-secondary);
}

.view-pane {
  display: block;
}
.hidden {
  display: none !important;
}

/* Таблицы */
.table-wrapper {
  overflow-x: auto;
}
table {
  width: 100%;
  border-collapse: collapse;
  background: var(--bg-level-1);
}
th, td {
  padding: var(--sp-2);
  border-bottom: 1px solid var(--border-main);
  text-align: left;
}
thead th {
  color: var(--text-secondary);
  font-weight: 400;
  text-transform: uppercase;
  font-size: 0.75rem;
}

/* Карточки билетов */
.tickets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--sp-3);
}
.ticket-card {
  background: var(--bg-level-2);
  border: 1px solid var(--border-main);
  padding: var(--sp-3);
  border-radius: 8px;
  box-shadow: var(--shadow-sm);
}

/* Модалка: базовая стилизация */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: none; /* Скрыто по умолчанию */
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.25s ease, visibility 0.25s ease;
}
.modal-overlay.show {
  opacity: 1;
  visibility: visible;
}
.modal-content {
  background: var(--bg-level-1);
  padding: var(--sp-3);
  border-radius: 12px;
  min-width: 360px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
  transform: translateY(-10px);
  transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.modal-overlay.show .modal-content {
  transform: translateY(0);
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--sp-2);
}
.modal-close {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: var(--text-secondary);
}
.form-group { margin-bottom: var(--sp-2); }
.form-group label { display: block; margin-bottom: var(--sp-1); font-size: 0.9rem; }
.form-group input, .form-group select, .form-group textarea {
  width: 100%;
  padding: var(--sp-1);
 border: 1px solid var(--border-main);
  border-radius: 6px;
  background: var(--bg-level-2);
  color: var(--text-primary);
}

/* Анимация тостов */
@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: var(--color-accent);
  color: white;
  padding: 12px 18px;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  z-index: 2000;
  animation: slideIn 0.3s ease-out forwards;
  min-width: 220px;
}

/* Адаптив для мобильных */
@media (max-width: 768px) {
  .header-inner {
    flex-direction: column;
    align-items: stretch;
  }
  #desktop-nav {
    width: 100%;
    justify-content: space-between;
    margin-top: var(--sp-2);
  }
  .theme-switcher {
    margin-top: var(--sp-2);
    text-align: center;
  }
  .theme-switcher label {
    margin-right: 0.4rem;
  }
  input[type="search"] {
    width: 100%;
  }
}
.action-btn-group {
  display: flex;
  gap: 0.25rem;
}
.btn-sm {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  border-radius: 6px;
}
.btn-danger {
  background: #fee2e2;
  color: #991b1b;
  border: 1px solid #fecaca;
}
.btn-success {
  background: #d1fae5;
  color: #065f46;
  border: 1px solid #a7f3d0;
}
:root {
  --bg-level-1: #ffffff;
  --bg-level-2: #f8fafc;
  --bg-level-3: #e2e8f0;
  --border-main: #e2e8f0;
  --color-accent: #3b82f6;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --text-muted: #94a3b8;
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --radius-md: 8px;
  --radius-lg: 12px;
  --sp-2: 0.5rem;
  --sp-3: 1rem;
  --sp-4: 1.5rem;
}

[data-theme="dark"] {
  --bg-level-1: #1e1e2e;
  --bg-level-2: #272733;
  --bg-level-3: #373745;
  --border-main: #373745;
  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
}

[data-theme="corporate"] {
  --color-accent: #005f73;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  background: var(--bg-level-2);
  color: var(--text-primary);
  line-height: 1.5;
}

header {
  padding: var(--sp-3) 0;
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--bg-level-1);
  border-bottom: 1px solid var(--border-main);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--sp-3);
  gap: var(--sp-3);
  position: relative;
}

.header-left, .header-right {
  flex: 1;
  min-width: 0;
}

.logo-centered {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  font-weight: 700;
  font-size: 1.3rem;
  color: var(--color-accent);
  text-decoration: none;
  white-space: nowrap;
}

.header-left { text-align: left; }
.header-right { text-align: right; }

.btn-toggle-menu {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}
.hamburger { display: block; width: 20px; height: 2px; background: var(--text-secondary); position: relative; }
.hamburger::before, .hamburger::after { content: ''; display: block; width: 20px; height: 2px; background: var(--text-secondary); position: absolute; left: 0; }
.hamburger::before { top: -6px; }
.hamburger::after { top: 6px; }

#desktop-nav a {
  margin-left: 1rem;
  text-decoration: none;
  color: var(--text-secondary);
  font-weight: 500;
}
#desktop-nav a:hover { color: var(--color-accent); }

.nav-link {
  color: var(--text-secondary);
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  transition: all 0.2s;
}
.nav-link:hover { background: var(--bg-level-2); color: var(--color-accent); }
.nav-link.active {
  color: var(--color-accent);
  background: var(--bg-level-1);
  font-weight: 600;
}

main {
  max-width: 1200px;
  margin: var(--sp-4) auto;
  padding: 0 var(--sp-3);
}

.view-pane { display: block; }
.view-pane.hidden { display: none; }

.controls-row {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  flex-wrap: wrap;
  margin-bottom: var(--sp-3);
}

input[type="search"], input[type="date"] {
  padding: var(--sp-2);
  border: 1px solid var(--border-main);
  border-radius: var(--radius-md);
  background: var(--bg-level-2);
  color: var(--text-primary);
}

button.btn {
  padding: var(--sp-2) var(--sp-3);
  border-radius: var(--radius-md);
  border: none;
  cursor: pointer;
  font-weight: 500;
}
button.btn-primary {
  background: var(--color-accent);
  color: white;
}
button.btn-outline {
  background: transparent;
  border: 1px solid var(--border-main);
  color: var(--text-secondary);
}
button.btn-outline:hover { border-color: var(--color-accent); color: var(--color-accent); }

.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--sp-3);
}
.event-card {
  background: var(--bg-level-1);
  border: 1px solid var(--border-main);
  border-radius: var(--radius-lg);
  padding: var(--sp-3);
  box-shadow: var(--shadow-sm);
}
.event-card h3 { margin-bottom: var(--sp-2); font-size: 1.1rem; }
.status-badge {
  font-size: 0.75rem;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  font-weight: 600;
  text-transform: uppercase;
}
.status-confirmed { background: #d1fae5; color: #065f46; }
.status-draft { background: #fef3c7; color: #92400e; }
.status-cancelled { background: #fee2e2; color: #991b1b; }

#schedule-content {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--sp-3);
}
.schedule-day-block {
  background: var(--bg-level-1);
  border: 1px solid var(--border-main);
  border-radius: var(--radius-lg);
  padding: var(--sp-3);
}
.schedule-day-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: var(--sp-2);
  font-weight: 600;
  color: var(--text-primary);
}
.day-date { font-size: 0.9rem; color: var(--text-muted); }
.day-total {
  font-size: 0.85rem;
  background: var(--bg-level-3);
  padding: 0.15rem 0.4rem;
  border-radius: 999px;
  color: var(--text-secondary);
}
.event-in-schedule {
  display: flex;
  align-items: flex-start;
  gap: var(--sp-2);
  padding: var(--sp-2) 0;
  border-bottom: 1px solid var(--border-main);
}
.event-in-schedule:last-child { border-bottom: none; }
.time-col { min-width: 65px; font-weight: 600; color: var(--color-accent); }
.title-col { flex-grow: 1; }
.status-badge-sm {
  font-size: 0.7rem;
  padding: 0.15em 0.35em;
  border-radius: 999px;
  text-transform: uppercase;
}

.table-wrapper {
  overflow-x: auto;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-main);
  box-shadow: var(--shadow-sm);
  background: var(--bg-level-1);
}
table { width: 100%; border-collapse: collapse; }
th, td { padding: var(--sp-2) var(--sp-3); text-align: left; border-bottom: 1px solid var(--border-main); }
th { background: var(--bg-level-2); color: var(--text-secondary); font-weight: 600; position: sticky; top: 0; }
tbody tr:hover { background: var(--bg-level-2); }

#toast-container {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.toast {
  padding: var(--sp-2) var(--sp-3);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  transform: translateX(100%);
  transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  min-width: 280px;
}
.toast.show { transform: translateX(0); }
.toast.info { background: var(--bg-level-2); color: var(--text-primary); }
.toast.success { background: #d1fae5; color: #065f46; border: 1px solid #a7f3d0; }
.toast.error { background: #fee2e2; color: #991b1b; border: 1px solid #fecaca; }

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
  opacity: 0;
  visibility: hidden;
}
/* Контейнер фильтров */
.filters-panel {
  background: var(--bg-level-1);
  padding: var(--sp-2);
  border-radius: 8px;
  margin-bottom: var(--sp-2);
}

.panel-title {
  margin: 0 0 var(--sp-1) 0;
  font-size: 1.1rem;
}

.filter-group {
  margin-bottom: var(--sp-2);
}

.filter-label {
  display: block;
  margin-bottom: 4px;
  color: var(--text-secondary);
  font-weight: 500;
}

/* Поиск */
#events-search {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--border-main);
  border-radius: 6px;
  background: var(--bg-level-2);
  color: var(--text-primary);
}

#events-search:focus {
  outline: none;
  border-color: var(--color-accent);
}

/* Кастомный select */
.custom-select-wrapper {
  position: relative;
}

.custom-select-trigger {
  padding: 8px 12px;
  background: var(--bg-level-2);
  border: 1px solid var(--border-main);
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
}

.custom-arrow {
  font-size: 0.8rem;
  opacity: 0.7;
}

.custom-options-list {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  background: var(--bg-level-1);
  border: 1px solid var(--border-main);
  border-radius: 6px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  display: none; /* скрыто по умолчанию */
}

.custom-options-list.show {
  display: block;
}

.custom-option {
  padding: 8px 12px;
  cursor: pointer;
}

.custom-option:hover {
  background: var(--bg-level-2);
}

/* Кастомные чекбоксы */
.checkbox-group {
  display: flex;
  gap: var(--sp-1);
  flex-wrap: wrap;
}

.custom-checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.custom-checkbox-input {
  position: absolute;
  opacity: 0;
  clip: rect(0 0 0 0);
  width: 1px;
  height: 1px;
}

.custom-checkmark {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 1px solid var(--border-main);
  border-radius: 4px;
  margin-right: 8px;
  position: relative;
  transition: all 0.2s;
}

.custom-checkbox-input:checked + .custom-checkmark::before {
  content: '';
  position: absolute;
  top: 4px;
  left: 5px;
  width: 4px;
  height: 8px;
  border: solid var(--color-accent);
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.custom-checkbox-input:focus + .custom-checkmark {
  box-shadow: 0 0 0 2px rgba(var(--color-accent-rgb), 0.3);
}

/* Кастомные радио-кнопки */
.radio-group {
  display: flex;
  gap: var(--sp-1);
}

.custom-radio-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.custom-radio-input {
  position: absolute;
  opacity: 0;
  clip: rect(0 0 0 0);
  width: 1px;
  height: 1px;
}

.custom-radio-dot {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 1px solid var(--border-main);
  border-radius: 50%;
  margin-right: 8px;
  position: relative;
  transition: all 0.2s;
}

.custom-radio-input:checked + .custom-radio-dot::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  background: var(--color-accent);
  border-radius: 50%;
}

.custom-radio-input:focus + .custom-radio-dot {
  box-shadow: 0 0 0 2px rgba(var(--color-accent-rgb), 0.3);
}
