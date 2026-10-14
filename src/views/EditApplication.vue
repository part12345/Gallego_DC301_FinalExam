
<script setup>
import { reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const error = ref('')

const applications = JSON.parse(
  localStorage.getItem('jobtrack_applications') || '[]'
)

const existing = applications.find(
  app => String(app.id) === String(route.params.id)
)

if (!existing) {
  router.replace('/applications')
}

const form = reactive({
  eventDate: '',
  eventLabel: '',
  interviewDate: '',
  interviewTime: '',
  interviewType: '',
  ...existing
})

// Clear interview information when the status is not Interview.
watch(
  () => form.status,
  (newStatus) => {
    if (newStatus !== 'Interview') {
      form.interviewDate = ''
      form.interviewTime = ''
      form.interviewType = ''
    }
  }
)

function updateApplication() {
  if (
    !form.company?.trim() ||
    !form.position?.trim() ||
    !form.location?.trim() ||
    !form.jobType ||
    !form.dateApplied ||
    !form.status
  ) {
    error.value = 'Please complete all required fields.'
    return
  }

  if (form.status === 'Interview' && !form.interviewDate) {
    error.value = 'Please enter the interview date.'
    return
  }

  const index = applications.findIndex(
    app => String(app.id) === String(existing.id)
  )

  if (index === -1) {
    error.value = 'Application not found. Please try again.'
    return
  }

  // Save only the relevant interview details.
  const updatedApplication = {
    ...form,
    interviewDate:
      form.status === 'Interview' ? form.interviewDate : '',
    interviewTime:
      form.status === 'Interview' ? form.interviewTime : '',
    interviewType:
      form.status === 'Interview' ? form.interviewType : ''
  }

  applications[index] = updatedApplication

  localStorage.setItem(
    'jobtrack_applications',
    JSON.stringify(applications)
  )

  router.push(`/applications/${form.id}`)
}
</script>

<template>
  <div class="page">
    <header class="form-header">
      <RouterLink
        :to="`/applications/${form.id}`"
        class="back-button"
      >
        ‹
      </RouterLink>

      <h1>Edit Application</h1>
    </header>

    <div class="form-page">
      <div
        v-if="error"
        class="form-error"
        role="alert"
      >
        {{ error }}
      </div>

      <form @submit.prevent="updateApplication">
        <div class="form-group">
          <label>Company Name <span>*</span></label>
          <input v-model="form.company" required>
        </div>

        <div class="form-group">
          <label>Job Position <span>*</span></label>
          <input v-model="form.position" required>
        </div>

        <div class="form-group">
          <label>Location <span>*</span></label>
          <input v-model="form.location" required>
        </div>

        <div class="form-group">
          <label>Job Type <span>*</span></label>
          <select v-model="form.jobType" required>
            <option value="">Select job type</option>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Internship</option>
            <option>Freelance</option>
          </select>
        </div>

        <div class="form-group">
          <label>Date Applied <span>*</span></label>
          <input
            v-model="form.dateApplied"
            type="date"
            required
          >
        </div>

        <div class="form-group">
          <label>Status <span>*</span></label>
          <select v-model="form.status" required>
            <option>Applied</option>
            <option>In Review</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
        </div>

        <!-- This section is visible ONLY when status is Interview. -->
        <Transition name="schedule">
          <div
            v-if="form.status === 'Interview'"
            class="interview-form-section"
          >
            <div class="interview-form-heading">
              <span>🎯</span>
              <div>
                <strong>Interview Schedule</strong>
                <small>
                  Add a date so JobTrack can highlight it on your calendar.
                </small>
              </div>
            </div>

            <div class="form-group">
              <label>Interview Date <span>*</span></label>
              <input
                v-model="form.interviewDate"
                type="date"
                required
              >
            </div>

            <div class="form-group">
              <label>Interview Time</label>
              <input
                v-model="form.interviewTime"
                type="time"
              >
            </div>

            <div class="form-group">
              <label>Interview Type</label>
              <select v-model="form.interviewType">
                <option value="">Select type</option>
                <option>Online</option>
                <option>Phone</option>
                <option>On-site</option>
              </select>
            </div>
          </div>
        </Transition>

        <div class="form-group">
          <label>Other Important Date <small>(optional)</small></label>
          <input
            v-model="form.eventDate"
            type="date"
          >
        </div>

        <div class="form-group">
          <label>Date Label <small>(optional)</small></label>
          <input
            v-model="form.eventLabel"
            placeholder="e.g. Follow-up, Application Deadline"
          >
        </div>

        <div class="form-group">
          <label>Expected Salary</label>
          <input v-model="form.salary">
        </div>

        <div class="form-group">
          <label>Job Link <small>(optional)</small></label>
          <input
            v-model="form.jobLink"
            type="url"
          >
        </div>

        <div class="form-group">
          <label>Notes <small>(optional)</small></label>
          <textarea v-model="form.notes"></textarea>
        </div>

        <div class="form-actions">
          <RouterLink
            :to="`/applications/${form.id}`"
            class="secondary-button"
          >
            Cancel
          </RouterLink>

          <button
            type="submit"
            class="primary-button"
          >
            Update Application
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.schedule-enter-active,
.schedule-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.schedule-enter-from,
.schedule-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
