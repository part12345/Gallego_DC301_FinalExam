<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const showCurrent = ref(false)
const showNew = ref(false)
const showConfirm = ref(false)
const error = ref('')
const success = ref('')

function changePassword() {
  error.value = ''
  success.value = ''

  const account = JSON.parse(localStorage.getItem('jobtrack_account') || 'null')

  if (!account) {
    error.value = 'No account was found. Please log in again.'
    return
  }

  if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
    error.value = 'Please complete all password fields.'
    return
  }

  if (form.currentPassword !== account.password) {
    error.value = 'Your current password is incorrect.'
    return
  }

  if (form.newPassword.length < 6) {
    error.value = 'Your new password must be at least 6 characters.'
    return
  }

  if (form.newPassword === form.currentPassword) {
    error.value = 'Your new password must be different from your current password.'
    return
  }

  if (form.newPassword !== form.confirmPassword) {
    error.value = 'New passwords do not match.'
    return
  }

  const updatedAccount = {
    ...account,
    password: form.newPassword
  }

  localStorage.setItem('jobtrack_account', JSON.stringify(updatedAccount))
  localStorage.setItem('jobtrack_user', JSON.stringify(updatedAccount))

  form.currentPassword = ''
  form.newPassword = ''
  form.confirmPassword = ''
  success.value = 'Password changed successfully.'
}
</script>

<template>
  <div class="page password-page">
    <header class="simple-header password-header">
      <button class="back-button" type="button" @click="router.back()" aria-label="Go back">‹</button>
      <div>
        <span class="eyebrow">ACCOUNT SECURITY</span>
        <h1>Change Password</h1>
      </div>
      <div class="header-lock">🔒</div>
    </header>

    <div class="page-content password-content">
      <section class="security-hero">
        <div class="security-icon">🔐</div>
        <div>
          <h2>Keep your account secure</h2>
          <p>Choose a strong password that you don't use on other accounts.</p>
        </div>
      </section>

      <div v-if="error" class="form-error password-message">{{ error }}</div>
      <div v-if="success" class="form-success password-message">✓ {{ success }}</div>

      <form class="form-card password-form-card" @submit.prevent="changePassword">
        <div class="form-section-heading">
          <span>01</span>
          <div>
            <strong>Current password</strong>
            <small>Verify your existing password first.</small>
          </div>
        </div>

        <div class="password-field">
          <input
            v-model="form.currentPassword"
            :type="showCurrent ? 'text' : 'password'"
            placeholder="Enter current password"
            autocomplete="current-password"
          >
          <button type="button" class="password-eye" @click="showCurrent = !showCurrent">
            {{ showCurrent ? 'Hide' : 'Show' }}
          </button>
        </div>

        <div class="form-section-heading second">
          <span>02</span>
          <div>
            <strong>Create a new password</strong>
            <small>Use at least 6 characters.</small>
          </div>
        </div>

        <div class="password-field">
          <input
            v-model="form.newPassword"
            :type="showNew ? 'text' : 'password'"
            placeholder="Enter new password"
            autocomplete="new-password"
          >
          <button type="button" class="password-eye" @click="showNew = !showNew">
            {{ showNew ? 'Hide' : 'Show' }}
          </button>
        </div>

        <div class="password-field">
          <input
            v-model="form.confirmPassword"
            :type="showConfirm ? 'text' : 'password'"
            placeholder="Confirm new password"
            autocomplete="new-password"
          >
          <button type="button" class="password-eye" @click="showConfirm = !showConfirm">
            {{ showConfirm ? 'Hide' : 'Show' }}
          </button>
        </div>

        <div class="password-tips">
          <div>✓ At least 6 characters</div>
          <div>✓ Different from your old password</div>
          <div>✓ Make it easy for you to remember, but hard to guess</div>
        </div>

        <button class="primary-button password-save-button" type="submit">
          <span>🔒</span> Update Password
        </button>

        <button class="secondary-button password-cancel-button" type="button" @click="router.push('/settings')">
          Cancel
        </button>
      </form>
    </div>
  </div>
</template>
