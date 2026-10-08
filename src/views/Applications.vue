<script setup>
import { computed, ref } from 'vue'
import AppCard from '../components/AppCard.vue'
import EmptyState from '../components/EmptyState.vue'

const applications = ref(
  JSON.parse(
    localStorage.getItem('jobtrack_applications') || '[]'
  )
)

const search = ref('')
const selectedStatus = ref('All')
const selectedType = ref('All')

const filteredApplications = computed(() => {

  return applications.value.filter(app => {

    const searchText =
      `${app.company} ${app.position} ${app.location}`
        .toLowerCase()

    const matchesSearch =
      searchText.includes(
        search.value.toLowerCase()
      )

    const matchesStatus =
      selectedStatus.value === 'All' ||
      app.status === selectedStatus.value

    const matchesType =
      selectedType.value === 'All' ||
      app.jobType === selectedType.value

    return (
      matchesSearch &&
      matchesStatus &&
      matchesType
    )
  })
})
</script>

<template>
  <div class="page">

    <header class="page-header">

      <div>
        <span class="eyebrow">
          JobTrack
        </span>

        <h1>Applications</h1>
      </div>

      <RouterLink
        to="/applications/add"
        class="add-button"
      >
        +
      </RouterLink>

    </header>

    <div class="page-content">

      <!-- SEARCH -->

      <div class="search-box">
        <span>⌕</span>

        <input
          v-model="search"
          type="text"
          placeholder="Search by company, position or location..."
        >
      </div>

      <!-- FILTER -->

      <div class="filter-row">

        <select v-model="selectedStatus">
          <option>All</option>
          <option>Applied</option>
          <option>In Review</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>

        <select v-model="selectedType">
          <option>All</option>
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Contract</option>
          <option>Internship</option>
          <option>Freelance</option>
        </select>

      </div>

      <div
        v-if="filteredApplications.length"
        class="application-list"
      >

        <AppCard
          v-for="application in filteredApplications"
          :key="application.id"
          :application="application"
        />

      </div>

      <EmptyState
        v-else-if="applications.length === 0"
      />

      <div
        v-else
        class="no-results"
      >
        <span>⌕</span>
        <h2>No results found</h2>
        <p>
          Try changing your search or filters.
        </p>
      </div>

    </div>

  </div>
</template>