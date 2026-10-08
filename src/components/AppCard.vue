<script setup>
import StatusBadge from './StatusBadge.vue'

defineProps({
  application: {
    type: Object,
    required: true
  }
})

function formatDate(date) {
  if (!date) return ''

  return new Date(date + 'T00:00:00').toLocaleDateString(
    'en-US',
    {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }
  )
}

function getInitials(company) {
  if (!company) return '?'

  return company
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .substring(0, 2)
    .toUpperCase()
}
</script>

<template>
  <RouterLink
    :to="`/applications/${application.id}`"
    class="application-card"
  >

    <div class="company-logo">
      {{ getInitials(application.company) }}
    </div>

    <div class="application-info">

      <div class="application-top">

        <div>
          <h3>
            {{ application.company }}
          </h3>

          <p>
            {{ application.position }}
          </p>
        </div>

        <StatusBadge
          :status="application.status"
        />

      </div>

      <div class="application-bottom">

        <span>
          ⌖ {{ application.location }}
        </span>

        <span>
          {{ formatDate(application.dateApplied) }}
        </span>

      </div>

    </div>

    <span class="card-arrow">
      ›
    </span>

  </RouterLink>
</template>