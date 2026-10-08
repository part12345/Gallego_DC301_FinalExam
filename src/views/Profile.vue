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

const interviews = computed(() =>
  applications.value.filter(
    a => a.status === 'Interview'
  ).length
)

const offers = computed(() =>
  applications.value.filter(
    a => a.status === 'Offer'
  ).length
)

const rejected = computed(() =>
  applications.value.filter(
    a => a.status === 'Rejected'
  ).length
)
</script>

<template>
  <div class="page">

    <header class="simple-header">
      <h1>Profile</h1>

      <RouterLink
        to="/settings"
        class="icon-button settings-icon-button"
        aria-label="Open settings"
        title="Settings"
      >
        <span class="gear-icon">⚙</span>
      </RouterLink>
    </header>

    <section class="profile-banner">

      <div class="large-avatar">
        {{ (user.name || 'U').charAt(0) }}
      </div>

      <h2>
        {{ user.name }}
      </h2>

      <p>{{ user.email }}</p>

      <RouterLink to="/profile/edit" class="small-outline-button">
        Edit Profile
      </RouterLink>

    </section>

    <div class="page-content">

      <section class="section-card">

        <h2>Personal Information</h2>

        <div class="profile-info">

          <div>
            <span>⌖</span>

            <div>
              <small>Location</small>
              <strong>
                {{ user.location || 'Not specified' }}
              </strong>
            </div>
          </div>

          <div>
            <span>▣</span>

            <div>
              <small>Target Position</small>
              <strong>
                {{ user.targetPosition || 'Not specified' }}
              </strong>
            </div>
          </div>

          <div>
            <span>☎</span>

            <div>
              <small>Phone</small>
              <strong>
                {{ user.phone || 'Not specified' }}
              </strong>
            </div>
          </div>

          <div>
            <span>✉</span>

            <div>
              <small>Email</small>
              <strong>
                {{ user.email }}
              </strong>
            </div>
          </div>

        </div>

      </section>

      <section class="section-card">

        <h2>Application Statistics</h2>

        <div class="profile-stat">
          <span>🟢</span>
          <label>Total Applications</label>
          <strong>{{ applications.length }}</strong>
        </div>

        <div class="profile-stat">
          <span>🟣</span>
          <label>Interviews</label>
          <strong>{{ interviews }}</strong>
        </div>

        <div class="profile-stat">
          <span>🟡</span>
          <label>Offers</label>
          <strong>{{ offers }}</strong>
        </div>

        <div class="profile-stat">
          <span>🔴</span>
          <label>Rejected</label>
          <strong>{{ rejected }}</strong>
        </div>

      </section>

      <section class="section-card">

        <div class="section-heading">
          <h2>Overall Progress</h2>
          <strong>
            {{
              applications.length
                ? Math.round(
                    ((offers + interviews) /
                    applications.length) * 100
                  )
                : 0
            }}%
          </strong>
        </div>

        <div class="large-progress">
          <div
            :style="{
              width:
                (applications.length
                  ? Math.round(
                      ((offers + interviews) /
                      applications.length) * 100
                    )
                  : 0) + '%'
            }"
          ></div>
        </div>

      </section>

    </div>

  </div>
</template>