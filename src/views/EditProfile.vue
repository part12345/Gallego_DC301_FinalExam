<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const savedUser = JSON.parse(localStorage.getItem('jobtrack_user') || '{}')

const form = reactive({
  name: savedUser.name || '',
  email: savedUser.email || '',
  phone: savedUser.phone || '',
  location: savedUser.location || '',
  targetPosition: savedUser.targetPosition || ''
})

const error = ref('')
const success = ref('')

function saveProfile() {
  error.value = ''
  success.value = ''

  if (!form.name.trim() || !form.email.trim()) {
    error.value = 'Name and email are required.'
    return
  }

  const account = JSON.parse(localStorage.getItem('jobtrack_account') || '{}')
  const updatedUser = {
    ...account,
    ...form,
    name: form.name.trim(),
    email: form.email.trim(),
    phone: form.phone.trim(),
    location: form.location.trim(),
    targetPosition: form.targetPosition.trim()
  }

  localStorage.setItem('jobtrack_account', JSON.stringify(updatedUser))
  localStorage.setItem('jobtrack_user', JSON.stringify(updatedUser))

  success.value = 'Profile updated successfully!'

  setTimeout(() => {
    router.push('/profile')
  }, 600)
}
</script>

<template>
  <div class="page">
    <header class="simple-header">
      <RouterLink to="/profile" class="back-button">‹</RouterLink>
      <h1>Edit Profile</h1>
    </header>

    <div class="page-content">
      <section class="form-card profile-edit-card">
        <div class="edit-profile-heading">
          <div class="large-avatar small-edit-avatar">
            {{ (form.name || 'U').charAt(0).toUpperCase() }}
          </div>
          <div>
            <h2>Personal Information</h2>
            <p>Update the information shown on your profile.</p>
          </div>
        </div>

        <div v-if="error" class="form-error">{{ error }}</div>
        <div v-if="success" class="form-success">{{ success }}</div>

        <form @submit.prevent="saveProfile">
          <div class="form-group">
            <label>Full Name <span>*</span></label>
            <input v-model="form.name" type="text" placeholder="Your full name" autocomplete="name">
          </div>

          <div class="form-group">
            <label>Email <span>*</span></label>
            <input v-model="form.email" type="email" placeholder="you@example.com" autocomplete="email">
          </div>

          <div class="form-group">
            <label>Phone</label>
            <input v-model="form.phone" type="tel" placeholder="09XXXXXXXXX" autocomplete="tel">
          </div>

          <div class="form-group">
            <label>Location</label>
            <input v-model="form.location" type="text" placeholder="City, Province">
          </div>

          <div class="form-group">
            <label>Target Position</label>
            <input v-model="form.targetPosition" type="text" placeholder="e.g. Frontend Developer">
          </div>

          <div class="edit-profile-actions">
            <RouterLink to="/profile" class="secondary-button">Cancel</RouterLink>
            <button type="submit" class="primary-button">Save Changes</button>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>
