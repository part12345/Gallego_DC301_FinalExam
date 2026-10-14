
<script setup>
import { computed, ref, onMounted } from 'vue'

const isDarkMode = ref(
  localStorage.getItem('jobtrack_dark') === 'true'
)

function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value

  localStorage.setItem(
    'jobtrack_dark',
    String(isDarkMode.value)
  )

  document.body.classList.toggle(
    'dark-mode',
    isDarkMode.value
  )
}

onMounted(() => {
  document.body.classList.toggle(
    'dark-mode',
    isDarkMode.value
  )
})

const user = computed(() => {
  return JSON.parse(
    localStorage.getItem('jobtrack_user') || '{}'
  )
})

const applications = computed(() => {
  return JSON.parse(
    localStorage.getItem('jobtrack_applications') || '[]'
  )
})

const total = computed(() => applications.value.length)

const inReview = computed(() =>
  applications.value.filter(
    app => app.status === 'In Review'
  ).length
)

const interviews = computed(() =>
  applications.value.filter(
    app => app.status === 'Interview'
  ).length
)

const offers = computed(() =>
  applications.value.filter(
    app => app.status === 'Offer'
  ).length
)

const rejected = computed(() =>
  applications.value.filter(
    app => app.status === 'Rejected'
  ).length
)

const recentApplications = computed(() =>
  [...applications.value]
    .sort(
      (a, b) =>
        new Date(b.dateApplied) -
        new Date(a.dateApplied)
    )
    .slice(0, 3)
)

function percent(value) {
  if (!total.value) return 0
  return Math.round((value / total.value) * 100)
}
</script>


<template>
  <div>

    <!-- HEADER -->

    <section class="dashboard-header">

      <div class="header-top">

        <div>
          <div class="brand-small">
            💼 JobTrack
          </div>

          <span class="small-label">
            Your Job Application Tracker
          </span>
        </div>

        
  <div class="header-actions">
    <button
    type="button"
    class="theme-toggle"
    @click="toggleDarkMode"
    :aria-label="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <span>{{ isDarkMode ? '☀️' : '🌙' }}</span>
  </button>

  <RouterLink
    to="/profile"
    class="profile-avatar"
  >
    {{ (user.name || 'U').charAt(0).toUpperCase() }}
  </RouterLink>
  </div>


      </div>

      <div class="greeting">
        Good morning,
        <strong>
          {{ user.name || 'User' }}!
        </strong>

        <p>
          Keep going! Your next opportunity
          is closer than you think.
        </p>
      </div>


    </section>

    <div class="page-content dashboard-content">

      <!-- DASHBOARD OVERVIEW -->

      <section class="dashboard-block overview-block">
        <div class="dashboard-block-heading">
          <div>
            <span class="dashboard-eyebrow">OVERVIEW</span>
            <h2>Application Overview</h2>
          </div>
          <span class="dashboard-block-badge">{{ total }} total</span>
        </div>

        <div class="stat-grid">

        <RouterLink to="/applications" class="stat-card blue overview-stat-link" aria-label="View all applications">
          <span class="stat-icon">▣</span>
          <strong>{{ total }}</strong>
          <small>Total Applications</small>
        </RouterLink>

        <RouterLink to="/applications" class="stat-card yellow overview-stat-link" aria-label="View applications in review">
          <span class="stat-icon">!</span>
          <strong>{{ inReview }}</strong>
          <small>In Review</small>
        </RouterLink>

        <RouterLink to="/applications" class="stat-card purple overview-stat-link" aria-label="View interview applications">
          <span class="stat-icon">●</span>
          <strong>{{ interviews }}</strong>
          <small>Interviews</small>
        </RouterLink>

        <RouterLink to="/applications" class="stat-card green overview-stat-link" aria-label="View offers">
          <span class="stat-icon">✓</span>
          <strong>{{ offers }}</strong>
          <small>Offers</small>
        </RouterLink>

        <RouterLink to="/applications" class="stat-card red overview-stat-link" aria-label="View rejected applications">
          <span class="stat-icon">×</span>
          <strong>{{ rejected }}</strong>
          <small>Rejected</small>
        </RouterLink>
        </div>
      </section>

      <!-- APPLICATION PROGRESS -->

      <section class="dashboard-block progress-block">
        <div class="dashboard-block-heading">
          <div>
            <span class="dashboard-eyebrow">PROGRESS</span>
            <h2>Application Progress</h2>
          </div>
          <span class="progress-summary">{{ total ? Math.round(((offers + interviews) / total) * 100) : 0 }}% active</span>
        </div>

        <div class="progress-item">
          <div>
            <span>Applied</span>
            <b>
              {{ applications.filter(a => a.status === 'Applied').length }}
            </b>
          </div>

          <div class="progress-track">
            <div
              class="progress-fill blue-fill"
              :style="{
                width: percent(
                  applications.filter(a => a.status === 'Applied').length
                ) + '%'
              }"
            ></div>
          </div>
        </div>

        <div class="progress-item">
          <div>
            <span>In Review</span>
            <b>{{ inReview }}</b>
          </div>

          <div class="progress-track">
            <div
              class="progress-fill yellow-fill"
              :style="{ width: percent(inReview) + '%' }"
            ></div>
          </div>
        </div>

        <div class="progress-item">
          <div>
            <span>Interview</span>
            <b>{{ interviews }}</b>
          </div>

          <div class="progress-track">
            <div
              class="progress-fill purple-fill"
              :style="{ width: percent(interviews) + '%' }"
            ></div>
          </div>
        </div>

        <div class="progress-item">
          <div>
            <span>Offer</span>
            <b>{{ offers }}</b>
          </div>

          <div class="progress-track">
            <div
              class="progress-fill green-fill"
              :style="{ width: percent(offers) + '%' }"
            ></div>
          </div>
        </div>

        <div class="progress-item">
          <div>
            <span>Rejected</span>
            <b>{{ rejected }}</b>
          </div>

          <div class="progress-track">
            <div
              class="progress-fill red-fill"
              :style="{ width: percent(rejected) + '%' }"
            ></div>
          </div>
        </div>

      </section>

      <!-- RECENT -->

      <section>

        <div class="section-heading">
          <h2>Recent Applications</h2>

          <RouterLink to="/applications">
            View All
          </RouterLink>
        </div>

        <div
          v-if="recentApplications.length"
          class="application-list"
        >
          <AppCard
            v-for="application in recentApplications"
            :key="application.id"
            :application="application"
          />
        </div>

        <div
          v-else
          class="small-empty"
        >
          <span>📋</span>
          <p>No applications yet.</p>

          <RouterLink
            to="/applications/add"
            class="text-button"
          >
            Add your first application
          </RouterLink>
        </div>

      </section>

    </div>

  </div>
</template>