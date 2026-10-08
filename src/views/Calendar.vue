<script setup>
import { computed, ref } from 'vue'

const applications = JSON.parse(
  localStorage.getItem('jobtrack_applications') || '[]'
)

const currentDate = ref(new Date())
const today = new Date()
const todayKey = toKey(today)

function toKey(date) {
  if (!date) return ''
  const d = new Date(date + (typeof date === 'string' && date.length === 10 ? 'T00:00:00' : ''))
  if (Number.isNaN(d.getTime())) return ''
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function formatDate(date) {
  if (!date) return ''
  const d = new Date(date + 'T00:00:00')
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

function eventType(app, date) {
  const key = toKey(date)
  if (!key) return 'other'
  if (toKey(app.interviewDate) === key) return 'interview'
  if (toKey(app.dateApplied) === key) return 'application'
  return 'other'
}

function eventsForDate(day) {
  if (!day) return []
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const key = toKey(new Date(year, month, day))

  const events = []
  applications.forEach(app => {
    const fields = [
      ['interviewDate', app.interviewDate],
      ['dateApplied', app.dateApplied],
      ['eventDate', app.eventDate],
      ['followUpDate', app.followUpDate],
      ['deadlineDate', app.deadlineDate],
      ['offerDate', app.offerDate]
    ]

    fields.forEach(([field, date]) => {
      if (toKey(date) === key) {
        events.push({
          app,
          field,
          type: field === 'interviewDate'
            ? 'interview'
            : field === 'dateApplied'
              ? 'application'
              : 'other'
        })
      }
    })
  })

  return events
}

const monthName = computed(() =>
  currentDate.value.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  })
)

const days = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const totalDays = new Date(year, month + 1, 0).getDate()
  const result = []

  for (let i = 0; i < firstDay; i++) result.push(null)
  for (let i = 1; i <= totalDays; i++) result.push(i)

  return result
})

const upcoming = computed(() => {
  const now = new Date()
  now.setHours(0, 0, 0, 0)

  return applications
    .map(app => {
      const date = app.interviewDate || app.eventDate || app.followUpDate || app.deadlineDate || app.offerDate
      return { app, date }
    })
    .filter(item => item.date && new Date(item.date + 'T00:00:00') >= now)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
})

const upcomingInterviews = computed(() =>
  upcoming.value.filter(item => item.app.interviewDate)
)

const nextInterview = computed(() => upcomingInterviews.value[0] || null)

const monthEvents = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const prefix = `${year}-${String(month + 1).padStart(2, '0')}`
  const map = new Map()

  applications.forEach(app => {
    const fields = [app.interviewDate, app.dateApplied, app.eventDate, app.followUpDate, app.deadlineDate, app.offerDate]
    fields.filter(Boolean).forEach(date => {
      if (date.startsWith(prefix)) {
        const day = Number(date.slice(8, 10))
        if (!map.has(day)) map.set(day, eventsForDate(day))
      }
    })
  })

  return map
})

function previousMonth() {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() - 1,
    1
  )
}

function nextMonth() {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    1
  )
}

function goToday() {
  currentDate.value = new Date()
}
</script>

<template>
  <div class="page calendar-page">
    <header class="simple-header calendar-page-header">
      <div>
        <span class="eyebrow">YOUR SCHEDULE</span>
        <h1>Calendar</h1>
        <p>Never miss an interview, deadline, or application follow-up.</p>
      </div>
      <button class="today-button" @click="goToday">Today</button>
    </header>

    <div class="page-content">
      <section class="calendar-hero-card">
        <div class="calendar-hero-icon">📅</div>
        <div>
          <span>UPCOMING INTERVIEWS</span>
          <strong>{{ upcomingInterviews.length }}</strong>
          <small>
            {{ nextInterview ? `${nextInterview.app.company} · ${formatDate(nextInterview.date)}` : 'No scheduled interviews yet' }}
          </small>
        </div>
        <div class="calendar-hero-orb"></div>
      </section>

      <section class="calendar-card">
        <div class="calendar-heading">
          <button aria-label="Previous month" @click="previousMonth">‹</button>
          <div class="calendar-title">
            <strong>{{ monthName }}</strong>
            <span>Tap a highlighted date to see scheduled activity</span>
          </div>
          <button aria-label="Next month" @click="nextMonth">›</button>
        </div>

        <div class="weekdays">
          <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
        </div>

        <div class="calendar-grid">
          <div
            v-for="(day, index) in days"
            :key="index"
            class="calendar-day"
            :class="{
              empty: !day,
              today: day && toKey(new Date(currentDate.getFullYear(), currentDate.getMonth(), day)) === todayKey,
              'has-events': day && monthEvents.has(day),
              'has-interview': day && monthEvents.get(day)?.some(event => event.type === 'interview'),
              'has-application': day && monthEvents.get(day)?.some(event => event.type === 'application'),
              'has-other': day && monthEvents.get(day)?.some(event => event.type === 'other')
            }"
          >
            <template v-if="day">
              <span class="day-number">{{ day }}</span>
              <div v-if="monthEvents.get(day)?.length" class="event-dots">
                <i v-if="monthEvents.get(day)?.some(event => event.type === 'interview')" class="event-dot interview-dot"></i>
                <i v-if="monthEvents.get(day)?.some(event => event.type === 'application')" class="event-dot application-dot"></i>
                <i v-if="monthEvents.get(day)?.some(event => event.type === 'other')" class="event-dot other-dot"></i>
              </div>
              <span v-if="monthEvents.get(day)?.some(event => event.type === 'interview')" class="date-alert">INTERVIEW</span>
            </template>
          </div>
        </div>

        <div class="calendar-legend">
          <span><i class="purple-dot"></i> Interview</span>
          <span><i class="green-dot"></i> Application</span>
          <span><i class="orange-dot"></i> Other activity</span>
          <span><i class="today-dot"></i> Today</span>
        </div>
      </section>

      <div class="section-heading calendar-section-heading">
        <div>
          <span class="eyebrow">YOUR NEXT STEPS</span>
          <h2>Upcoming Activity</h2>
        </div>
        <RouterLink to="/applications">View All</RouterLink>
      </div>

      <div v-if="upcoming.length" class="application-list">
        <RouterLink
          v-for="item in upcoming.slice(0, 5)"
          :key="`${item.app.id}-${item.date}`"
          :to="`/applications/${item.app.id}`"
          class="interview-card upcoming-event-card"
          :class="{ 'event-interview': item.app.interviewDate === item.date }"
        >
          <div class="company-logo">{{ item.app.company.charAt(0) }}</div>
          <div>
            <div class="event-card-topline">
              <strong>{{ item.app.company }}</strong>
              <span class="event-type-pill">{{ item.app.interviewDate === item.date ? 'INTERVIEW' : 'ACTIVITY' }}</span>
            </div>
            <span>{{ item.app.position }}</span>
            <small>
              {{ item.app.interviewDate === item.date ? formatDate(item.date) : (item.app.eventLabel || 'Important date') }}
              <template v-if="item.app.interviewDate === item.date"> · {{ item.app.interviewTime || 'Time TBD' }} · {{ item.app.interviewType || 'Online' }}</template>
              <template v-else> · {{ formatDate(item.date) }}</template>
            </small>
          </div>
        </RouterLink>
      </div>

      <div v-else class="small-empty">
        <span>📅</span>
        <p>No upcoming activity yet.</p>
        <RouterLink to="/applications/add" class="text-button">Add an application</RouterLink>
      </div>
    </div>
  </div>
</template>
