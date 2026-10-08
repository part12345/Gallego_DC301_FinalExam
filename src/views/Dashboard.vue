<script setup>
import { computed } from 'vue'

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

        <RouterLink
          to="/profile"
          class="profile-avatar"
        >
          {{ (user.name || 'U').charAt(0).toUpperCase() }}
        </RouterLink>

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

        <div class="stat-card blue">
          <span class="stat-icon">▣</span>
          <strong>{{ total }}</strong>
          <small>Total Applications</small>
        </div>

        <div class="stat-card yellow">
          <span class="stat-icon">!</span>
          <strong>{{ inReview }}</strong>
          <small>In Review</small>
        </div>

        <div class="stat-card purple">
          <span class="stat-icon">●</span>
          <strong>{{ interviews }}</strong>
          <small>Interviews</small>
        </div>

        <div class="stat-card green">
          <span class="stat-icon">✓</span>
          <strong>{{ offers }}</strong>
          <small>Offers</small>
        </div>

        <div class="stat-card red">
          <span class="stat-icon">×</span>
          <strong>{{ rejected }}</strong>
          <small>Rejected</small>
        </div>
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