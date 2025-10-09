// ===== VARIABLES GLOBALES =====
let currentLanguage = localStorage.getItem('language') || 'es';
let isDarkMode = localStorage.getItem('darkMode') === 'true';

const translations = {
  es: {
    home: 'Inicio',
    about: 'Sobre mí',
    projects: 'Proyectos',
    tracker: 'Tracker',
    contact: 'Contacto'
  },
  en: {
    home: 'Home',
    about: 'About',
    projects: 'Projects',
    tracker: 'Tracker',
    contact: 'Contact'
  }
};

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
  initializeTheme();
  initializeLanguage();
  setupEventListeners();
  updateActiveNavLink();
  loadGoalsFromStorage();
});

// ===== TEMA OSCURO / CLARO =====
/**
 * Inicializa el tema basado en preferencia guardada o sistema
 */
function initializeTheme() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  isDarkMode = localStorage.getItem('darkMode') === 'true' || 
              (localStorage.getItem('darkMode') === null && prefersDark);
  
  applyTheme(isDarkMode);
}

/**
 * Aplica el tema oscuro o claro al documento
 */
function applyTheme(dark) {
  isDarkMode = dark;
  const body = document.body;
  const themeToggle = document.getElementById('themeToggle');
  
  if (dark) {
    body.classList.add('dark-mode');
    if (themeToggle) themeToggle.textContent = '☀️';
    localStorage.setItem('darkMode', 'true');
  } else {
    body.classList.remove('dark-mode');
    if (themeToggle) themeToggle.textContent = '🌙';
    localStorage.setItem('darkMode', 'false');
  }
}

// ===== SISTEMA DE IDIOMAS =====
/**
 * Inicializa el idioma de la página
 */
function initializeLanguage() {
  currentLanguage = localStorage.getItem('language') || 'es';
  updateLanguageDisplay();
}

/**
 * Cambia el idioma de todos los elementos con atributos data-es y data-en
 */
function changeLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem('language', lang);
  updateLanguageDisplay();
}

/**
 * Actualiza el texto de todos los elementos según el idioma actual
 */
function updateLanguageDisplay() {
  const elements = document.querySelectorAll('[data-es][data-en]');
  
  elements.forEach(element => {
    const text = element.getAttribute(`data-${currentLanguage}`);
    if (text) {
      if (element.children.length === 0) {
        element.textContent = text;
      } else {
        const span = document.createElement('span');
        span.textContent = text;
        element.innerText = text;
      }
    }
  });
  
  updateLangToggleDisplay();
}

function updateLangToggleDisplay() {
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    const langText = langToggle.querySelector('.lang-text');
    if (langText) {
      langText.textContent = currentLanguage === 'es' ? 'EN' : 'ES';
    }
  }
}
// ===== EVENT LISTENERS ===== *//
function setupEventListeners() {
  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      applyTheme(!isDarkMode);
    });
  }  
  // Language toggle
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      const newLang = currentLanguage === 'es' ? 'en' : 'es';
      changeLanguage(newLang);
    });
  } 
  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const navList = document.querySelector('.nav-list');
  if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
      navList.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
    
    const navLinks = navList.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navList.classList.remove('active');
        menuToggle.classList.remove('active');
      });
    });
  }
  
  // Smooth scroll para links internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ===== NAVEGACIÓN =====

function updateActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// ===== SISTEMA DE METAS Y TRACKER =====
/**
 * Estructura de datos para las metas
 */
const GoalTracker = {
  /**
   * Obtiene todas las metas guardadas
   */
  getAllGoals() {
    const goals = localStorage.getItem('goals');
    return goals ? JSON.parse(goals) : [];
  },
  
  /**
   * Guarda las metas en localStorage
   */
  saveGoals(goals) {
    localStorage.setItem('goals', JSON.stringify(goals));
  },
  
  /**
   * Crea una nueva meta
   */
  createGoal(data) {
    const goals = this.getAllGoals();
    const newGoal = {
      id: Date.now(),
      title: data.title,
      category: data.category,
      startDate: new Date().toISOString(),
      targetDate: data.targetDate,
      progress: 0,
      frequency: data.frequency,
      status: 'active',
      milestones: [],
      logs: []
    };
    goals.push(newGoal);
    this.saveGoals(goals);
    return newGoal;
  },
  
  /**
   * Registra un progreso diario
   */
  logProgress(goalId, progressValue, notes = '') {
    const goals = this.getAllGoals();
    const goal = goals.find(g => g.id === goalId);
    
    if (goal) {
      goal.logs.push({
        date: new Date().toISOString(),
        value: progressValue,
        notes: notes
      });
      
      // Calcular progreso general
      goal.progress = Math.min(100, goal.progress + progressValue);
      this.saveGoals(goals);
      return goal;
    }
    return null;
  },
  
  /**
   * Obtiene progreso en un período específico
   */
  getProgressByPeriod(goalId, period = 'week') {
    const goals = this.getAllGoals();
    const goal = goals.find(g => g.id === goalId);
    
    if (!goal) return null;
    
    const now = new Date();
    let startDate;
    
    switch(period) {
      case 'day':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'week':
        startDate = new Date(now);
        startDate.setDate(now.getDate() - now.getDay());
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date(0);
    }
    
    const relevantLogs = goal.logs.filter(log => {
      return new Date(log.date) >= startDate;
    });
    
    return {
      period,
      totalProgress: relevantLogs.reduce((sum, log) => sum + log.value, 0),
      entries: relevantLogs.length,
      logs: relevantLogs
    };
  },
  
  /**
   * Obtiene estadísticas de una meta
   */
  getGoalStats(goalId) {
    const goals = this.getAllGoals();
    const goal = goals.find(g => g.id === goalId);
    
    if (!goal || goal.logs.length === 0) return null;
    
    const daily = this.getProgressByPeriod(goalId, 'day');
    const weekly = this.getProgressByPeriod(goalId, 'week');
    const monthly = this.getProgressByPeriod(goalId, 'month');
    const yearly = this.getProgressByPeriod(goalId, 'year');
    
    return {
      goal: goal.title,
      overall: goal.progress,
      daily,
      weekly,
      monthly,
      yearly,
      daysActive: goal.logs.length
    };
  },
  
  /**
   * Elimina una meta
   */
  deleteGoal(goalId) {
    let goals = this.getAllGoals();
    goals = goals.filter(g => g.id !== goalId);
    this.saveGoals(goals);
  },
  
  /**
   * Actualiza el estado de una meta
   */
  updateGoalStatus(goalId, status) {
    const goals = this.getAllGoals();
    const goal = goals.find(g => g.id === goalId);
    if (goal) {
      goal.status = status;
      this.saveGoals(goals);
      return goal;
    }
    return null;
  }
};

// ===== FUNCIONES AUXILIARES =====
/**
 * Carga las metas del almacenamiento y las muestra en la interfaz
 */
function loadGoalsFromStorage() {
  const goals = GoalTracker.getAllGoals();
  // Esta función se expande en el archivo tracker.js específico
}

/**
 * Formatea una fecha a formato legible
 */
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(currentLanguage === 'es' ? 'es-ES' : 'en-US', options);
}

/**
 * Valida un email
 */
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Muestra un mensaje de notificación
 */
function showNotification(message, type = 'success', duration = 3000) {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 16px 24px;
    background-color: ${type === 'success' ? '#4caf50' : '#f44336'};
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    z-index: 10000;
    animation: slideIn 300ms ease-in-out;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 300ms ease-in-out';
    setTimeout(() => notification.remove(), 300);
  }, duration);
}

/**
 * Calcula el porcentaje de progreso de un período
 */
function calculateProgressPercentage(logs, targetValue = 100) {
  if (logs.length === 0) return 0;
  const total = logs.reduce((sum, log) => sum + log.value, 0);
  return Math.min(100, Math.round((total / targetValue) * 100));
}

// ===== ANIMACIÓN DE ENTRADA =====
// Animar elementos al cargar la página
window.addEventListener('load', () => {
  const elements = document.querySelectorAll('.highlight-card, .btn, h2, p');
  elements.forEach((el, index) => {
    el.style.animation = `fadeInUp 600ms ease-out ${index * 100}ms both`;
  });
});

// ===== ESTILOS DE ANIMACIÓN =====
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
  
  /* Menú móvil */
  @media (max-width: 768px) {
    .nav-list.active {
      display: flex !important;
    }
  }
`;
document.head.appendChild(style);

// Exportar para usar en otros archivos
window.GoalTracker = GoalTracker;
window.changeLanguage = changeLanguage;
window.applyTheme = applyTheme;
window.formatDate = formatDate;
window.validateEmail = validateEmail;
window.showNotification = showNotification;