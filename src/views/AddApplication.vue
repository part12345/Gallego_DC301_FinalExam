<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const error = ref('')

const form = reactive({
  company: '',
  position: '',
  location: '',
  jobType: '',
  dateApplied: '',
  status: '',
  salary: '',
  jobLink: '',
  notes: '',
  interviewDate: '',
  interviewTime: '',
  interviewType: '',
  interviewLink: '',
  eventDate: '',
  eventLabel: ''
})

function saveApplication() {

  error.value = ''

  if (
    !form.company ||
    !form.position ||
    !form.location ||
    !form.jobType ||
    !form.dateApplied ||
    !form.status
  ) {
    error.value =
      'Please complete all required fields.'
    return
  }

  const applications = JSON.parse(
    localStorage.getItem('jobtrack_applications') || '[]'
  )

  const application = {
    id: Date.now(),
    ...form
  }

  applications.push(application)

  localStorage.setItem(
    'jobtrack_applications',
    JSON.stringify(applications)
  )

  router.push(`/applications/${application.id}`)
}
</script>

<template>
  <div class="page">

    <header class="form-header">
      <RouterLink
        to="/applications"
        class="back-button"
      >
        ‹
      </RouterLink>

      <h1>Add Job Application</h1>
    </header>

    <div class="form-page">

      <div
        v-if="error"
        class="form-error"
      >
        {{ error }}
      </div>

      <form @submit.prevent="saveApplication">

        <div class="form-group">
          <label>Company Name <span>*</span></label>

          <input
            v-model="form.company"
            placeholder="e.g. Google"
          >
        </div>

        <div class="form-group">
          <label>Job Position <span>*</span></label>

          <input
            v-model="form.position"
            placeholder="e.g. Frontend Developer"
          >
        </div>

        <div class="form-group">
          <label>Location <span>*</span></label>

          <input
            v-model="form.location"
            placeholder="e.g. Manila, Philippines"
          >
        </div>

        <div class="form-group">
          <label>Job Type <span>*</span></label>

          <select v-model="form.jobType">
            <option value="">
              Select job type
            </option>

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
          >
        </div>

        <div class="form-group">
          <label>Status <span>*</span></label>

          <select v-model="form.status">
            <option value="">
              Select status
            </option>

            <option>Applied</option>
            <option>In Review</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
        </div>

        <div class="interview-form-section">
          <div class="interview-form-heading">
            <span>🎯</span>
            <div>
              <strong>Interview Schedule</strong>
              <small>Add a date so JobTrack can highlight it on your calendar.</small>
            </div>
          </div>

          <div class="form-group">
            <label>Interview Date</label>
            <input v-model="form.interviewDate" type="date">
          </div>

          <div class="form-group">
            <label>Interview Time</label>
            <input v-model="form.interviewTime" type="time">
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

          <input
            v-model="form.salary"
            placeholder="e.g. ₱30,000 - ₱40,000"
          >
        </div>

        <div class="form-group">
          <label>Job Link <small>(optional)</small></label>

          <input
            v-model="form.jobLink"
            placeholder="https://company.com/job"
          >
        </div>

        <div class="form-group">
          <label>Notes <small>(optional)</small></label>

          <textarea
            v-model="form.notes"
            placeholder="Add any notes..."
          ></textarea>
        </div>

        <div class="form-actions">

          <RouterLink
            to="/applications"
            class="secondary-button"
          >
            Cancel
          </RouterLink>

          <button
            type="submit"
            class="primary-button"
          >
            Save Application
          </button>

        </div>

      </form>

    </div>

  </div>
</template>