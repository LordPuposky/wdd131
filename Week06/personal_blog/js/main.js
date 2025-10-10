let currentLanguage = localStorage.getItem('language') || 'en';
let isDarkMode = localStorage.getItem('darkMode') === 'true';

// ===== ARRAY PROJECTS =====
const projectsData = [
  // FRONTEND
  {
    status: "completed",
    statusText: { es: "Completado", en: "Completed" },
    image: "images/project-placeholder.avif",
    alt: "Bank UI Components Library",
    title: { es: "Biblioteca de Componentes UI Bancarios", en: "Bank UI Components Library" },
    githubUrl: "https://github.com/yourrepo/bank-ui-library",
    description: {
      es: "Componentes reutilizables y accesibles para interfaces bancarias: botones, tablas y formularios.",
      en: "Reusable, accessible components for banking interfaces: buttons, tables, and input forms."
    },
    purpose: { es: "Base de UI modular.", en: "Foundation of modular UI for financial apps." },
    technologies: ["HTML5", "CSS3", "React"],
    challenge: { es: "Lograr accesibilidad y modularidad.", en: "Full accessibility and modularity." },
    value: { es: "Mejor UX y consistencia.", en: "Better UX and consistency." },
    date: "August 2025",
    demoUrl: "#"
  },
  {
    status: "completed",
    statusText: { es: "Completado", en: "Completed" },
    image: "images/project-placeholder.avif",
    alt: "Responsive Dashboard",
    title: { es: "Dashboard Responsive", en: "Responsive Dashboard" },
    githubUrl: "https://github.com/yourrepo/responsive-dashboard",
    description: {
      es: "Panel de usuario móvil para visualizar movimientos y balances.",
      en: "Mobile-friendly user dashboard to visualize transactions and balances."
    },
    purpose: { es: "Diseño mobile-first y visualización.", en: "Mobile-first design and visualization." },
    technologies: ["HTML5", "CSS3", "JavaScript"],
    challenge: { es: "Formulario adaptable y data charts.", en: "Adaptive layout and interactive charts." },
    value: { es: "UX ideal en cualquier dispositivo.", en: "Smooth UX on any device." },
    date: "June 2025",
    demoUrl: "#"
  },

  // BACKEND
  {
    status: "inprogress",
    statusText: { es: "En Proceso", en: "In Progress" },
    image: "images/project-placeholder.avif",
    alt: "Simple Banking API",
    title: { es: "API Bancaria Simple", en: "Simple Banking API" },
    githubUrl: "https://github.com/yourrepo/simple-banking-api",
    description: {
      es: "API RESTful para cuentas de usuario y transacciones con autenticación.",
      en: "RESTful API for user accounts and transactions with authentication."
    },
    purpose: { es: "CRUD seguro para banca.", en: "Secure CRUD for banking data." },
    technologies: ["Python", "Flask", "Node.js"],
    challenge: { es: "Diseñar endpoints seguros.", en: "Design secure endpoints." },
    value: { es: "API real para práctica fintech.", en: "Real-world API for fintech practice." },
    date: "July 2025",
    demoUrl: null
  },
  {
    status: "completed",
    statusText: { es: "Completado", en: "Completed" },
    image: "images/project-placeholder.avif",
    alt: "Notifications Microservice",
    title: { es: "Microservicio de Notificaciones", en: "Notifications Microservice" },
    githubUrl: "https://github.com/yourrepo/notifications-microservice",
    description: {
      es: "Servicio para enviar notificaciones SMS/email sobre cuentas.",
      en: "Service to send account SMS/email notifications."
    },
    purpose: { es: "Procesamiento asíncrono, integración externa.", en: "Async processing, external API integration." },
    technologies: ["Python", "Flask", "Celery"],
    challenge: { es: "Integrar servicios externos.", en: "Integrate cloud/external services." },
    value: { es: "Automatización y alertas.", en: "Automation and real-time alerts." },
    date: "July 2025",
    demoUrl: null
  },

  // FULL STACK
  {
    status: "completed",
    statusText: { es: "Completado", en: "Completed" },
    image: "images/project-placeholder.avif",
    alt: "Personal Finance Tracker",
    title: { es: "Tracker de Finanzas Personales", en: "Personal Finance Tracker" },
    githubUrl: "https://github.com/yourrepo/finance-tracker",
    description: {
      es: "App completa para presupuestos, gastos y tendencias.",
      en: "Full-stack app for budgets, expenses, and trends."
    },
    purpose: { es: "Visualizar y categorizar gastos.", en: "Categorize and visualize spending." },
    technologies: ["React", "Python", "PostgreSQL"],
    challenge: { es: "Sincronizar backend y frontend.", en: "Sync backend & frontend for real-time." },
    value: { es: "Presupuestos dinámicos.", en: "Dynamic budgeting and analytics." },
    date: "September 2025",
    demoUrl: "#"
  },
  {
    status: "completed",
    statusText: { es: "Completado", en: "Completed" },
    image: "images/project-placeholder.avif",
    alt: "Simple Bank Portal",
    title: { es: "Portal de Banca Simple", en: "Simple Bank Portal" },
    githubUrl: "https://github.com/yourrepo/simple-bank-portal",
    description: {
      es: "Portal de registro/login, ver balance y transferir.",
      en: "Portal for signup/login, check balance and transfer."
    },
    purpose: { es: "Simular flujo bancario sencillo.", en: "Simulate simple banking flow." },
    technologies: ["Node.js", "MongoDB", "React"],
    challenge: { es: "Conexión UI-backend.", en: "UI-backend connection, authentication." },
    value: { es: "Aprendizaje completo fullstack.", en: "Fullstack learning for real-world apps." },
    date: "August 2025",
    demoUrl: "#"
  },

  // CLOUD / DATABASE
  {
    status: "completed",
    statusText: { es: "Completado", en: "Completed" },
    image: "images/project-placeholder.avif",
    alt: "Banking Database Schema",
    title: { es: "Diseño de Esquema Bancario", en: "Banking Database Schema Design" },
    githubUrl: "https://github.com/yourrepo/db-schema-design",
    description: {
      es: "Esquema relacional para cuentas, movimientos, logs y auditoría.",
      en: "Relational schema for accounts, transactions, logs and audit."
    },
    purpose: { es: "Base robusta para banking data.", en: "Solid foundation for banking data." },
    technologies: ["PostgreSQL", "MySQL"],
    challenge: { es: "Modelar relaciones complejas.", en: "Model complex relations and constraints." },
    value: { es: "Integridad y seguridad.", en: "Data integrity and security." },
    date: "October 2025",
    demoUrl: null
  },
  {
    status: "completed",
    statusText: { es: "Completado", en: "Completed" },
    image: "images/project-placeholder.avif",
    alt: "Cloud Deployment Demo",
    title: { es: "Demo de Cloud Deployment", en: "Cloud Deployment Demo" },
    githubUrl: "https://github.com/yourrepo/cloud-deployment-demo",
    description: {
      es: "Despliegue de un API/app a AWS/Heroku con CI/CD y Docker.",
      en: "Deploy a REST API/app to AWS/Heroku with CI/CD and Docker."
    },
    purpose: { es: "Aprender despliegue cloud y automatización.", en: "Learn cloud deployment and automation." },
    technologies: ["Docker", "GitHub Actions", "AWS"],
    challenge: { es: "Automatización CI/CD.", en: "CI/CD automation, containers." },
    value: { es: "Preparación para trabajo real en la nube.", en: "Readiness for real-world cloud jobs." },
    date: "October 2025",
    demoUrl: null
  }
];

// DEVICON SVG MAPPING
const deviconSVG = {
  'HTML5':'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
  'CSS3':'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
  'JavaScript':'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
  'React':'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
  'Python':'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
  'Flask':'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg',
  'Node.js':'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
  'PostgreSQL':'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
  'MySQL':'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',
  'MongoDB':'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
  'Celery':'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/celery/celery-original.svg',
  'Docker':'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
  'GitHub Actions':'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
  'AWS':'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original.svg'
};

// tHEME DARK/LIGHT
function initializeTheme() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  isDarkMode = localStorage.getItem('darkMode') === 'true' ||
               (localStorage.getItem('darkMode') === null && prefersDark);
  applyTheme(isDarkMode);
}
function applyTheme(dark) {
  const body = document.body, themeToggle = document.getElementById('themeToggle');
  if (dark) {
    body.classList.add('dark-mode');
    if (themeToggle) themeToggle.textContent = '🌙';
    localStorage.setItem('darkMode', 'true');
  } else {
    body.classList.remove('dark-mode');
    if (themeToggle) themeToggle.textContent = '☀️';
    localStorage.setItem('darkMode', 'false');
  }
}

// LANGUAGE
function initializeLanguage() {
  currentLanguage = localStorage.getItem('language') || 'en';
  updateLanguageDisplay();
}
function changeLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem('language', lang);
  updateLanguageDisplay();
  document.dispatchEvent(new Event('languageChanged'));
}
function updateLanguageDisplay() {
  document.querySelectorAll('[data-es][data-en]').forEach(el => {
    const text = el.getAttribute('data-' + currentLanguage);
    if (text) el.textContent = text;
  });
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    const langText = langToggle.querySelector('.lang-text');
    if (langText) langText.textContent = currentLanguage === 'es' ? 'EN' : 'ES';
  }
}

// EVENT LISTENERS
function setupEventListeners() {
  document.getElementById('themeToggle')?.addEventListener('click', () => {
    isDarkMode = !isDarkMode; applyTheme(isDarkMode);
  });
  document.getElementById('langToggle')?.addEventListener('click', () => {
    const newLang = currentLanguage === 'es' ? 'en' : 'es';
    changeLanguage(newLang);
  });
}

// BADGES
function createTechBadges(technologies) {
  return [...new Set(technologies)].map(tech => `
    <span class="tech-badge">
      <img src="${deviconSVG[tech] || `icons/${tech.toLowerCase()}.svg`}" alt="${tech}" title="${tech}" loading="lazy" />
      ${tech}
    </span>
  `).join('');
}

// RENDER PROJECTS
function createProjectCard(project) {
  const lang = currentLanguage;
  const statusClass = project.status === 'completed' ? 'completed' : 'inprogress';
  return `
    <div class="project-card">
      <span class="project-status ${statusClass}">${project.statusText[lang]}</span>
      <div class="project-card-grid">
        <div class="project-image"><img src="${project.image}" alt="${project.alt}" loading="lazy"></div>
        <div class="project-info">
          <h3 class="project-title"><a href="${project.githubUrl}" target="_blank" rel="noopener">${project.title[lang]}</a></h3>
          <p class="project-description">${project.description[lang]}<br><em>Purpose:</em> ${project.purpose[lang]}</p>
          <div class="project-tech">${createTechBadges(project.technologies)}</div>
          <div class="project-challenge"><strong>Main Challenge:</strong> ${project.challenge[lang]}</div>
          <div class="project-value"><strong>Value Added:</strong> ${project.value[lang]}</div>
          <div class="project-date"><strong>Date:</strong> ${project.date}</div>
          <div class="project-actions">
            <a href="${project.githubUrl}" target="_blank" class="btn btn-secondary">View Code</a>
            ${project.demoUrl ? `<a href="${project.demoUrl}" target="_blank" class="btn btn-secondary">Try Demo</a>` : ""}
          </div>
        </div>
      </div>
    </div>`;
}
function renderProjects() {
  const container = document.getElementById('projects-container');
  if (!container) return;
  container.innerHTML = projectsData.map(createProjectCard).join('');
}

// INITIALIZE
document.addEventListener('DOMContentLoaded', function () {
  initializeTheme();
  initializeLanguage();
  setupEventListeners();
  renderProjects();
});
document.addEventListener('languageChanged', renderProjects);

// ===== CONTACT FORM HANDLING, VALIDATION & SUCCESS ANIMATION =====
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return; // Only run on contact page

  const successDiv = document.getElementById('contactSuccess');
  const nameInput = form.contactName;

  // Hide success by default
  successDiv.style.opacity = 0;
  successDiv.style.display = 'none';

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simple validation
    let isValid = form.checkValidity();
    if (!isValid) {
      form.reportValidity();
      return;
    }
    if (nameInput.value.trim().length < 2) {
      nameInput.focus();
      return;
    }
    if (form.contactMsg.value.trim().length < 20) {
      form.contactMsg.focus();
      return;
    }

    // Store name in localStorage for greeting
    try { 
      localStorage.setItem('lastContactName', nameInput.value.trim());
    } catch (_) { }

    // Reset the form visually
    form.reset();

    // Show success with fade in
    successDiv.style.display = 'block';
    successDiv.style.opacity = 0;
    setTimeout(() => { successDiv.style.opacity = 1; }, 50);

    // Hide with fade out after 3s
    setTimeout(() => {
      successDiv.style.opacity = 0;
      setTimeout(() => { successDiv.style.display = 'none'; }, 700);
    }, 3100);
  });
}

// Initialize contact form when DOM is ready
document.addEventListener('DOMContentLoaded', initContactForm);
