<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  email: '',
  password: ''
})

const error = ref('')

function login() {

  error.value = ''

  const account = JSON.parse(
    localStorage.getItem('jobtrack_account') || 'null'
  )

  if (!account) {
    error.value = 'No account found. Please create an account first.'
    return
  }

  if (
    form.email !== account.email ||
    form.password !== account.password
  ) {
    error.value = 'Incorrect email or password.'
    return
  }

  localStorage.setItem(
    'jobtrack_user',
    JSON.stringify(account)
  )

  router.push('/dashboard')
}
</script>

<template>
  <div class="auth-page">

    <div class="auth-card">

      <RouterLink
        to="/"
        class="back-link"
      >
        ‹ Back
      </RouterLink>

      <div class="auth-logo">
        💼
      </div>

      <h1>Welcome Back</h1>

      <p class="auth-description">
        Login to continue tracking your
        job applications.
      </p>

      <div
        v-if="error"
        class="form-error"
      >
        {{ error }}
      </div>

      <form @submit.prevent="login">

        <div class="form-group">
          <label>Email</label>

          <input
            v-model="form.email"
            type="email"
            placeholder="john@example.com"
          >
        </div>

        <div class="form-group">
          <label>Password</label>

          <input
            v-model="form.password"
            type="password"
            placeholder="Your password"
          >
        </div>

        <button
          type="submit"
          class="primary-button full-width"
        >
          Login
        </button>

      </form>

      <p class="auth-footer">
        Don't have an account?

        <RouterLink to="/register">
          Create Account
        </RouterLink>
      </p>

    </div>

  </div>
</template>