<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import StatusBadge from '../components/StatusBadge.vue'
import DeleteModal from '../components/DeleteModal.vue'

const route = useRoute()
const router = useRouter()

const showDelete = ref(false)

const applications = JSON.parse(
  localStorage.getItem('jobtrack_applications') || '[]'
)

const application = computed(() => {
  return applications.find(
    app => String(app.id) === String(route.params.id)
  )
})

function deleteApplication() {

  const updated = applications.filter(
    app => app.id !== application.value.id
  )

  localStorage.setItem(
    'jobtrack_applications',
    JSON.stringify(updated)
  )

  router.push('/applications')
}

function formatDate(date) {
  if (!date) return 'Not specified'

  return new Date(
    date + 'T00:00:00'
  ).toLocaleDateString(
    'en-US',
    {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }
  )
}
</script>

<template>
  <div
    v-if="application"
    class="page"
  >

    <header class="details-header">

      <RouterLink
        to="/applications"
        class="back-button"
      >
        ‹
      </RouterLink>

      <h1>Application Details</h1>

      <button
        class="icon-button"
        @click="showDelete = true"
      >
        ⋮
      </button>

    </header>

    <div class="details-page">

      <section class="details-company">

        <div class="big-company-logo">
          {{ application.company.charAt(0) }}
        </div>

        <h1>{{ application.company }}</h1>

        <p>
          {{ application.position }}
        </p>

        <StatusBadge
          :status="application.status"
        />

      </section>

      <section class="details-card">

        <div class="detail-row">
          <span>⌖</span>

          <div>
            <small>Location</small>
            <strong>
              {{ application.location }}
            </strong>
          </div>
        </div>

        <div class="detail-row">
          <span>▣</span>

          <div>
            <small>Applied</small>
            <strong>
              {{ formatDate(application.dateApplied) }}
            </strong>
          </div>
        </div>

        <div class="detail-row">
          <span>◷</span>

          <div>
            <small>Job Type</small>
            <strong>
              {{ application.jobType }}
            </strong>
          </div>
        </div>

        <div class="detail-row">
          <span>₱</span>

          <div>
            <small>Expected Salary</small>
            <strong>
              {{ application.salary || 'Not specified' }}
            </strong>
          </div>
        </div>

        <div class="detail-row">
          <span>🔗</span>

          <div>
            <small>Job Link</small>

            <a
              v-if="application.jobLink"
              :href="application.jobLink"
              target="_blank"
            >
              {{ application.jobLink }}
            </a>

            <strong v-else>
              Not provided
            </strong>

          </div>
        </div>

      </section>

      <section
        v-if="application.notes"
        class="details-card"
      >

        <h3>Details</h3>

        <p class="notes">
          {{ application.notes }}
        </p>

      </section>

      <section
        v-if="
          application.status === 'Interview' ||
          application.interviewDate
        "
        class="details-card"
      >

        <h3>Interview Information</h3>

        <div class="detail-row">
          <span>▣</span>

          <div>
            <small>Date</small>

            <strong>
              {{
                formatDate(
                  application.interviewDate ||
                  application.dateApplied
                )
              }}
            </strong>
          </div>
        </div>

        <div
          v-if="application.interviewTime"
          class="detail-row"
        >
          <span>◷</span>

          <div>
            <small>Time</small>
            <strong>
              {{ application.interviewTime }}
            </strong>
          </div>
        </div>

        <div
          v-if="application.interviewType"
          class="detail-row"
        >
          <span>⌁</span>

          <div>
            <small>Type</small>
            <strong>
              {{ application.interviewType }}
            </strong>
          </div>
        </div>

      </section>

      <div class="details-actions">

        <RouterLink
          :to="`/applications/${application.id}/edit`"
          class="secondary-button"
        >
          Edit
        </RouterLink>

        <button
          class="danger-button"
          @click="showDelete = true"
        >
          Delete
        </button>

      </div>

    </div>

    <DeleteModal
      :show="showDelete"
      :application="application"
      @cancel="showDelete = false"
      @confirm="deleteApplication"
    />

  </div>
</template>