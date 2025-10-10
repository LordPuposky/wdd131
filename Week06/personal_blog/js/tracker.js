// ===== VARIABLES TRACKER =====
let currentGoalFilter = 'all';
let currentGoalDetail = null;
let categoryChart = null;
let weeklyChart = null;

// ===== CATEGORÍA ICONS Y COLORES =====
const categoryIcons = {
  estudios: '📚',
  trabajo: '💼',
  salud: '💪',
  financiero: '💰',
  espiritual: '🙏',
  social: '🤝'
};

const categoryColors = {
  estudios: '#3498db',
  trabajo: '#e74c3c',
  salud: '#2ecc71',
  financiero: '#f39c12',
  espiritual: '#9b59b6',
  social: '#1abc9c'
};

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
  setupTrackerEventListeners();
  renderGoals();
  updateStatistics();
  initializeCharts();
  setDefaultTargetDate();
});

// ===== EVENT LISTENERS =====
function setupTrackerEventListeners() {
  // Formulario para crear meta
  const goalForm = document.getElementById('goalForm');
  if (goalForm) {
    goalForm.addEventListener('submit', handleCreateGoal);
  }

  // Filtros
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => handleFilterChange(btn));
  });

  // Modal de progreso
  const progressModal = document.getElementById('progressModal');
  const progressForm = document.getElementById('progressForm');
  const modalClose = document.querySelector('.modal-close');

  if (progressForm) {
    progressForm.addEventListener('submit', handleLogProgress);
  }

  if (progressModal) {
    progressModal.addEventListener('click', (e) => {
      if (e.target === progressModal) {
        closeModal(progressModal);
      }
    });
  }

  // Modal de detalles
  const detailModal = document.getElementById('goalDetailModal');
  const periodBtns = document.querySelectorAll('.period-btn');

  periodBtns.forEach(btn => {
    btn.addEventListener('click', () => handlePeriodChange(btn));
  });

  if (detailModal) {
    detailModal.addEventListener('click', (e) => {
      if (e.target === detailModal) {
        closeModal(detailModal);
      }
    });
  }

  // Botón eliminar meta
  const deleteBtn = document.getElementById('deleteGoalBtn');
  if (deleteBtn) {
    deleteBtn.addEventListener('click', handleDeleteGoal);
  }
}

// ===== CREAR META =====
function handleCreateGoal(e) {
  e.preventDefault();

  const title = document.getElementById('goalTitle').value.trim();
  const category = document.getElementById('goalCategory').value;
  const frequency = document.getElementById('goalFrequency').value;
  const targetValue = parseInt(document.getElementById('goalTarget').value);
  const targetDate = document.getElementById('goalTargetDate').value;

  if (!title || !category || !frequency || !targetDate) {
    showNotification(
      currentLanguage === 'es' ? 'Completa todos los campos' : 'Fill all fields',
      'error'
    );
    return;
  }

  const goalData = {
    title,
    category,
    frequency,
    targetValue,
    targetDate
  };

  const newGoal = GoalTracker.createGoal(goalData);
  
  showNotification(
    currentLanguage === 'es' ? 'Meta creada exitosamente' : 'Goal created successfully',
    'success'
  );

  e.target.reset();
  setDefaultTargetDate();
  renderGoals();
  updateStatistics();
  updateCharts();
}

// ===== RENDERIZAR METAS =====
function renderGoals() {
  const container = document.getElementById('goalsContainer');
  const emptyState = document.getElementById('emptyState');
  
  if (!container) return;

  const goals = GoalTracker.getAllGoals();
  const filteredGoals = currentGoalFilter === 'all'
    ? goals 
    : goals.filter(g => g.category === currentGoalFilter);

  container.innerHTML = '';

  if (filteredGoals.length === 0) {
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';

  filteredGoals.forEach(goal => {
    const goalCard = createGoalCard(goal);
    container.appendChild(goalCard);
  });
}

/**
 * Crea una tarjeta de meta
 */
function createGoalCard(goal) {
  const card = document.createElement('div');
  card.className = 'goal-card';
  card.dataset.goalId = goal.id;

  const progressPercent = goal.progress;
  const icon = categoryIcons[goal.category] || '⭐';
  const categoryColor = categoryColors[goal.category] || '#176887';

  const categoryLabel = currentLanguage === 'es' 
    ? getCategoryLabelES(goal.category)
    : getCategoryLabelEN(goal.category);

  const frequencyLabel = currentLanguage === 'es'
    ? getFrequencyLabelES(goal.frequency)
    : getFrequencyLabelEN(goal.frequency);

  card.innerHTML = `
    <div class="goal-card-header">
      <span class="goal-icon" style="font-size: 28px;">${icon}</span>
      <div class="goal-title-info">
        <h3>${goal.title}</h3>
        <p class="goal-category" style="color: ${categoryColor};">${categoryLabel}</p>
      </div>
    </div>

    <div class="goal-progress">
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${progressPercent}%; background-color: ${categoryColor};"></div>
      </div>
      <span class="progress-text">${progressPercent}%</span>
    </div>

    <div class="goal-meta">
      <span class="goal-frequency">📅 ${frequencyLabel}</span>
      <span class="goal-logs">${goal.logs.length} ${currentLanguage === 'es' ? 'registros' : 'logs'}</span>
    </div>

    <div class="goal-actions">
      <button class="btn-small btn-log" data-goal-id="${goal.id}" data-es="Registrar" data-en="Log">Registrar</button>
      <button class="btn-small btn-view" data-goal-id="${goal.id}" data-es="Ver" data-en="View">Ver</button>
    </div>
  `;

  // Event listeners para botones
  const logBtn = card.querySelector('.btn-log');
  const viewBtn = card.querySelector('.btn-view');

  if (logBtn) {
    logBtn.addEventListener('click', () => openProgressModal(goal.id));
  }

  if (viewBtn) {
    viewBtn.addEventListener('click', () => openDetailModal(goal.id));
  }

  return card;
}

// ===== FILTROS =====
function handleFilterChange(btn) {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  currentGoalFilter = btn.dataset.filter;
  renderGoals();
  updateStatistics();
  updateCharts();
}

// ===== MODALES =====
/**
 * Abre modal para registrar progreso
 */
function openProgressModal(goalId) {
  const goal = GoalTracker.getAllGoals().find(g => g.id === goalId);
  if (!goal) return;

  currentGoalDetail = goal;

  const modal = document.getElementById('progressModal');
  const form = document.getElementById('progressForm');

  form.dataset.goalId = goalId;
  document.getElementById('progressValue').value = 0;
  document.getElementById('progressNotes').value = '';

  modal.style.display = 'flex';
}

/**
 * Abre modal con detalles de la meta
 */
function openDetailModal(goalId) {
  const goal = GoalTracker.getAllGoals().find(g => g.id === goalId);
  if (!goal) return;

  currentGoalDetail = goal;

  const modal = document.getElementById('goalDetailModal');
  document.getElementById('detailTitle').textContent = goal.title;
  document.getElementById('detailOverallProgress').textContent = `${goal.progress}%`;
  
  const categoryLabel = currentLanguage === 'es' 
    ? getCategoryLabelES(goal.category)
    : getCategoryLabelEN(goal.category);
  const frequencyLabel = currentLanguage === 'es'
    ? getFrequencyLabelES(goal.frequency)
    : getFrequencyLabelEN(goal.frequency);

  document.getElementById('detailCategory').textContent = categoryLabel;
  document.getElementById('detailFrequency').textContent = frequencyLabel;
  document.getElementById('detailDaysActive').textContent = goal.logs.length;

  // Mostrar período por defecto (día)
  updateDetailLogs('day');

  // Reset period buttons
  document.querySelectorAll('.period-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelector('.period-btn[data-period="day"]').classList.add('active');

  modal.style.display = 'flex';
}

/**
 * Cierra un modal
 */
function closeModal(modal) {
  modal.style.display = 'none';
  currentGoalDetail = null;
}

// ===== REGISTRAR PROGRESO =====
function handleLogProgress(e) {
  e.preventDefault();

  const goalId = parseInt(e.target.dataset.goalId);
  const progressValue = parseInt(document.getElementById('progressValue').value);
  const notes = document.getElementById('progressNotes').value;

  if (progressValue <= 0) {
    showNotification(
      currentLanguage === 'es' ? 'Ingresa un valor positivo' : 'Enter a positive value',
      'error'
    );
    return;
  }

  GoalTracker.logProgress(goalId, progressValue, notes);

  showNotification(
    currentLanguage === 'es' ? 'Progreso registrado' : 'Progress logged',
    'success'
  );

  closeModal(document.getElementById('progressModal'));
  renderGoals();
  updateStatistics();
  updateCharts();
}

// ===== DETALLES DE META =====
function handlePeriodChange(btn) {
  document.querySelectorAll('.period-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const period = btn.dataset.period;
  updateDetailLogs(period);
}

/**
 * Actualiza los registros mostrados según el período
 */
function updateDetailLogs(period) {
  if (!currentGoalDetail) return;

  const goal = GoalTracker.getAllGoals().find(g => g.id === currentGoalDetail.id);
  if (!goal) return;

  const periodData = GoalTracker.getProgressByPeriod(goal.id, period);
  const logsList = document.getElementById('detailLogs');

  if (!periodData || periodData.logs.length === 0) {
    logsList.innerHTML = `<p>${currentLanguage === 'es' ? 'Sin registros' : 'No logs'}</p>`;
    return;
  }

  const logsHTML = periodData.logs.map(log => `
    <div class="log-entry">
      <div class="log-date">${formatDate(log.date)}</div>
      <div class="log-value">+${log.value}</div>
      <div class="log-notes">${log.notes || '--'}</div>
    </div>
  `).join('');

  logsList.innerHTML = logsHTML;
}

/**
 * Elimina una meta
 */
function handleDeleteGoal() {
  if (!currentGoalDetail) return;

  const confirmed = confirm(
    currentLanguage === 'es'
      ? '¿Estás seguro de que quieres eliminar esta meta?'
      : 'Are you sure you want to delete this goal?'
  );

  if (confirmed) {
    GoalTracker.deleteGoal(currentGoalDetail.id);
    closeModal(document.getElementById('goalDetailModal'));
    
    showNotification(
      currentLanguage === 'es' ? 'Meta eliminada' : 'Goal deleted',
      'success'
    );

    renderGoals();
    updateStatistics();
    updateCharts();
  }
}

// ===== ESTADÍSTICAS =====
function updateStatistics() {
  const goals = GoalTracker.getAllGoals();
  const filteredGoals = currentGoalFilter === 'all' 
    ? goals 
    : goals.filter(g => g.category === currentGoalFilter);

  const activeGoals = filteredGoals.filter(g => g.status === 'active');
  const avgProgress = filteredGoals.length > 0
    ? Math.round(filteredGoals.reduce((sum, g) => sum + g.progress, 0) / filteredGoals.length)
    : 0;

  let weeklyLogsCount = 0;
  let totalLogsCount = 0;

  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay());

  filteredGoals.forEach(goal => {
    totalLogsCount += goal.logs.length;
    goal.logs.forEach(log => {
      if (new Date(log.date) >= weekStart) {
        weeklyLogsCount++;
      }
    });
  });

  document.getElementById('activeGoalsCount').textContent = activeGoals.length;
  document.getElementById('averageProgress').textContent = `${avgProgress}%`;
  document.getElementById('weeklyLogs').textContent = weeklyLogsCount;
  document.getElementById('totalLogs').textContent = totalLogsCount;
}

// ===== GRÁFICOS =====
/**
 * Inicializa los gráficos
 */
function initializeCharts() {
  updateCharts();
}

/**
 * Actualiza los gráficos con datos actuales
 */
function updateCharts() {
  updateCategoryChart();
  updateWeeklyChart();
}

/**
 * Gráfico de progreso por categoría
 */
function updateCategoryChart() {
  const ctx = document.getElementById('categoryChart');
  if (!ctx) return;

  const goals = GoalTracker.getAllGoals();
  const categories = ['estudios', 'trabajo', 'salud', 'financiero', 'espiritual', 'social'];
  
  const categoryData = categories.map(cat => {
    const categoryGoals = goals.filter(g => g.category === cat);
    const avgProgress = categoryGoals.length > 0
      ? Math.round(categoryGoals.reduce((sum, g) => sum + g.progress, 0) / categoryGoals.length)
      : 0;
    return avgProgress;
  });

  const categoryLabels = categories.map(cat => {
    return currentLanguage === 'es' 
      ? getCategoryLabelES(cat)
      : getCategoryLabelEN(cat);
  });

  const chartColors = categories.map(cat => categoryColors[cat]);

  if (categoryChart) {
    categoryChart.destroy();
  }

  categoryChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: categoryLabels,
      datasets: [{
        label: currentLanguage === 'es' ? 'Progreso %' : 'Progress %',
        data: categoryData,
        backgroundColor: chartColors,
        borderRadius: 6,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: true,
          labels: {
            color: getComputedStyle(document.documentElement).getPropertyValue('--text-primary'),
            font: {
              family: getComputedStyle(document.documentElement).getPropertyValue('--font-heading'),
              size: 14,
              weight: '600'
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            color: getComputedStyle(document.documentElement).getPropertyValue('--text-secondary'),
          },
          grid: {
            color: getComputedStyle(document.documentElement).getPropertyValue('--border-color'),
          }
        },
        x: {
          ticks: {
            color: getComputedStyle(document.documentElement).getPropertyValue('--text-secondary'),
          },
          grid: {
            display: false
          }
        }
      }
    }
  });
}

/**
 * Gráfico de progreso semanal
 */
function updateWeeklyChart() {
  const ctx = document.getElementById('weeklyChart');
  if (!ctx) return;

  const goals = GoalTracker.getAllGoals();
  const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const dayLabels = currentLanguage === 'es'
    ? days
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const now = new Date();
  const weekData = [0, 0, 0, 0, 0, 0, 0];

  goals.forEach(goal => {
    goal.logs.forEach(log => {
      const logDate = new Date(log.date);
      const dayOfWeek = logDate.getDay();
      
      // Solo contar si está en la semana actual
      if (logDate >= new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay())) {
        weekData[dayOfWeek] += log.value;
      }
    });
  });

  if (weeklyChart) {
    weeklyChart.destroy();
  }

  weeklyChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dayLabels,
      datasets: [{
        label: currentLanguage === 'es' ? 'Progreso Acumulado' : 'Accumulated Progress',
        data: weekData,
        borderColor: '#176887',
        backgroundColor: 'rgba(23, 104, 135, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: '#64CCC5',
        pointBorderColor: '#176887',
        pointBorderWidth: 2,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: true,
          labels: {
            color: getComputedStyle(document.documentElement).getPropertyValue('--text-primary'),
            font: {
              family: getComputedStyle(document.documentElement).getPropertyValue('--font-heading'),
              size: 14,
              weight: '600'
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: getComputedStyle(document.documentElement).getPropertyValue('--text-secondary'),
          },
          grid: {
            color: getComputedStyle(document.documentElement).getPropertyValue('--border-color'),
          }
        },
        x: {
          ticks: {
            color: getComputedStyle(document.documentElement).getPropertyValue('--text-secondary'),
          },
          grid: {
            display: false
          }
        }
      }
    }
  });
}

// ===== UTILIDADES =====
function setDefaultTargetDate() {
  const input = document.getElementById('goalTargetDate');
  if (!input) return;

  const today = new Date();
  const thirtyDaysLater = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
  
  const year = thirtyDaysLater.getFullYear();
  const month = String(thirtyDaysLater.getMonth() + 1).padStart(2, '0');
  const day = String(thirtyDaysLater.getDate()).padStart(2, '0');
  
  input.value = `${year}-${month}-${day}`;
}

/**
 * Obtiene la etiqueta de categoría en español
 */
function getCategoryLabelES(category) {
  const labels = {
    estudios: 'Estudios',
    trabajo: 'Trabajo',
    salud: 'Salud Física',
    financiero: 'Financiero',
    espiritual: 'Espiritual',
    social: 'Social'
  };
  return labels[category] || category;
}

/**
 * Obtiene la etiqueta de categoría en inglés
 */
function getCategoryLabelEN(category) {
  const labels = {
    estudios: 'Studies',
    trabajo: 'Work',
    salud: 'Physical Health',
    financiero: 'Financial',
    espiritual: 'Spiritual',
    social: 'Social'
  };
  return labels[category] || category;
}

/**
 * Obtiene la etiqueta de frecuencia en español
 */
function getFrequencyLabelES(frequency) {
  const labels = {
    diario: 'Diario',
    semanal: 'Semanal',
    mensual: 'Mensual'
  };
  return labels[frequency] || frequency;
}

/**
 * Obtiene la etiqueta de frecuencia en inglés
 */
function getFrequencyLabelEN(frequency) {
  const labels = {
    diario: 'Daily',
    semanal: 'Weekly',
    mensual: 'Monthly'
  };
  return labels[frequency] || frequency;
}