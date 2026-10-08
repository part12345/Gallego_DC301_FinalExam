<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const error = ref('')
const success = ref('')

function register() {
  error.value = ''
  success.value = ''

  if (
    !form.name ||
    !form.email ||
    !form.password ||
    !form.confirmPassword
  ) {
    error.value = 'Please complete all fields.'
    return
  }

  if (form.password.length < 6) {
    error.value = 'Password must be at least 6 characters.'
    return
  }

  if (form.password !== form.confirmPassword) {
    error.value = 'Passwords do not match.'
    return
  }

  const existingAccount = localStorage.getItem(
    'jobtrack_account'
  )

  if (existingAccount) {
    const account = JSON.parse(existingAccount)

    if (account.email === form.email) {
      error.value = 'An account with this email already exists.'
      return
    }
  }

  const user = {
    name: form.name,
    email: form.email,
    password: form.password,
    location: 'Philippines',
    targetPosition: '',
    phone: ''
  }

  localStorage.setItem(
    'jobtrack_account',
    JSON.stringify(user)
  )

  localStorage.setItem(
    'jobtrack_user',
    JSON.stringify(user)
  )

  if (!localStorage.getItem('jobtrack_applications')) {
    localStorage.setItem(
      'jobtrack_applications',
      JSON.stringify([])
    )
  }

  success.value = 'Account created successfully!'

  setTimeout(() => {
    router.push('/dashboard')
  }, 500)
}
</script>

<template>
  <div class="auth-page">

    <div class="auth-card">

      <!-- BACK -->

      <RouterLink
        to="/"
        class="back-link"
      >
        ‹ Back
      </RouterLink>

      <!-- LOGO -->

      <div class="auth-logo">
        💼
      </div>

      <!-- TITLE -->

      <h1>Create Account</h1>

      <p class="auth-description">
        Create your JobTrack account to start
        managing your job applications.
      </p>

      <!-- ERROR -->

      <div
        v-if="error"
        class="form-error"
      >
        {{ error }}
      </div>

      <!-- SUCCESS -->

      <div
        v-if="success"
        class="form-success"
      >
        {{ success }}
      </div>

      <!-- FORM -->

      <form @submit.prevent="register">

        <!-- NAME -->

        <div class="form-group">

          <label>
            Full Name
            <span>*</span>
          </label>

          <input
            v-model="form.name"
            type="text"
            placeholder="ex: Prince Paul DeLa Cruz "
            autocomplete="name"
          >

        </div>

        <!-- EMAIL -->

        <div class="form-group">

          <label>
            Email
            <span>*</span>
          </label>

          <input
            v-model="form.email"
            type="email"
            placeholder="john@example.com"
            autocomplete="email"
          >

        </div>

        <!-- PASSWORD -->

        <div class="form-group">

          <label>
            Password
            <span>*</span>
          </label>

          <input
            v-model="form.password"
            type="password"
            placeholder="Minimum 6 characters"
            autocomplete="new-password"
          >

        </div>

        <!-- CONFIRM PASSWORD -->

        <div class="form-group">

          <label>
            Confirm Password
            <span>*</span>
          </label>

          <input
            v-model="form.confirmPassword"
            type="password"
            placeholder="Repeat your password"
            autocomplete="new-password"
          >

        </div>

        <!-- SUBMIT -->

        <button
          class="primary-button full-width"
          type="submit"
        >
          Create Account
        </button>

      </form>

      <!-- LOGIN -->

      <p class="auth-footer">

        Already have an account?

        <RouterLink to="/login">
          Login
        </RouterLink>

      </p>

    </div>

  </div>
</template>

<style scoped>
.form-success {
  margin-bottom: 14px;
  padding: 11px 13px;

  color: #047857;
  background: #ecfdf5;

  border: 1px solid #a7f3d0;
  border-radius: 10px;

  font-size: 10px;
}
</style>