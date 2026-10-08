<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const darkMode = ref(
  localStorage.getItem('jobtrack_dark') === 'true'
)

const interviewReminders = ref(true)
const applicationReminders = ref(true)
const emailNotifications = ref(false)

function toggleDarkMode() {

  darkMode.value = !darkMode.value

  localStorage.setItem(
    'jobtrack_dark',
    darkMode.value
  )

  document.body.classList.toggle(
    'dark-mode',
    darkMode.value
  )
}

function clearApplications() {

  const confirmDelete = confirm(
    'Delete all applications? This cannot be undone.'
  )

  if (!confirmDelete) return

  localStorage.setItem(
    'jobtrack_applications',
    JSON.stringify([])
  )

  alert('All applications have been cleared.')
}

function logout() {

  localStorage.removeItem('jobtrack_user')

  router.push('/login')
}
</script>

<template>
  <div class="page">

    <header class="simple-header">

      <RouterLink
        to="/profile"
        class="back-button"
      >
        ‹
      </RouterLink>

      <h1>Settings</h1>

    </header>

    <div class="page-content settings-page">

      <h3 class="settings-title">
        Appearance
      </h3>

      <section class="settings-card">

        <div class="setting-row">

          <div class="setting-icon">
            ◐
          </div>

          <div>
            <strong>Dark Mode</strong>
            <small>Use dark appearance</small>
          </div>

          <button
            class="toggle"
            :class="{ active: darkMode }"
            @click="toggleDarkMode"
          >
            <span></span>
          </button>

        </div>

        <div class="setting-row">

          <div class="setting-icon">
            ◉
          </div>

          <div>
            <strong>Language</strong>
            <small>English</small>
          </div>

          <span class="setting-arrow">
            ›
          </span>

        </div>

      </section>

      <h3 class="settings-title">
        Notifications
      </h3>

      <section class="settings-card">

        <div class="setting-row">

          <div class="setting-icon green">
            ◷
          </div>

          <div>
            <strong>Interview Reminders</strong>
            <small>Get interview notifications</small>
          </div>

          <button
            class="toggle"
            :class="{ active: interviewReminders }"
            @click="
              interviewReminders =
                !interviewReminders
            "
          >
            <span></span>
          </button>

        </div>

        <div class="setting-row">

          <div class="setting-icon">
            ▣
          </div>

          <div>
            <strong>Application Reminders</strong>
            <small>Remember your applications</small>
          </div>

          <button
            class="toggle"
            :class="{ active: applicationReminders }"
            @click="
              applicationReminders =
                !applicationReminders
            "
          >
            <span></span>
          </button>

        </div>

        <div class="setting-row">

          <div class="setting-icon">
            ✉
          </div>

          <div>
            <strong>Email Notifications</strong>
            <small>Receive email updates</small>
          </div>

          <button
            class="toggle"
            :class="{ active: emailNotifications }"
            @click="
              emailNotifications =
                !emailNotifications
            "
          >
            <span></span>
          </button>

        </div>

      </section>

      <h3 class="settings-title">
        Data
      </h3>

      <section class="settings-card">

        <div class="setting-row clickable">

          <div class="setting-icon">
            ⇩
          </div>

          <div>
            <strong>Export Applications</strong>
            <small>Save your application data</small>
          </div>

          <span>›</span>

        </div>

        <button
          class="setting-row danger-setting"
          @click="clearApplications"
        >

          <div class="setting-icon red">
            🗑
          </div>

          <div>
            <strong>Clear All Applications</strong>
            <small>Delete all saved applications</small>
          </div>

          <span>›</span>

        </button>

      </section>

      <h3 class="settings-title">
        Account
      </h3>

      <section class="settings-card">

        <RouterLink
          to="/profile/edit"
          class="setting-row clickable"
        >

          <div class="setting-icon">
            ♙
          </div>

          <div>
            <strong>Edit Profile</strong>
            <small>Update your information</small>
          </div>

          <span>›</span>

        </RouterLink>

        <RouterLink
          to="/change-password"
          class="setting-row clickable"
        >
          <div class="setting-icon">
            🔑
          </div>

          <div>
            <strong>Change Password</strong>
            <small>Update your password securely</small>
          </div>

          <span class="setting-arrow">›</span>
        </RouterLink>

      </section>

      <!-- LOGOUT -->

      <button
        class="logout-button"
        @click="logout"
      >
        Logout
      </button>

      <p class="app-version">
        JobTrack v1.0.0
      </p>

    </div>

  </div>
</template>