<template>
  <div class="page">
    <header class="simple-header">
      <div>
        <span class="eyebrow">Project Documentation</span>
        <h1>Requirements</h1>
      </div>
    </header>

    <div class="page-content requirements-page">
      <section class="hero-card requirements-hero">
        <div class="hero-icon">✓</div>
        <div>
          <h2>JobTrack SPA</h2>
          <p>A VueJS Single Page Application for managing and monitoring job applications.</p>
        </div>
      </section>

      <section class="requirements-section">
        <h2>Functional Requirements</h2>
        <div class="requirement-list">
          <article v-for="item in functionalRequirements" :key="item.title" class="requirement-card">
            <span class="requirement-number">{{ item.number }}</span>
            <div>
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
            </div>
          </article>
        </div>
      </section>

      <section class="requirements-section">
        <h2>CRUD Coverage</h2>
        <div class="crud-grid">
          <article v-for="item in crudItems" :key="item.label" class="crud-card">
            <strong>{{ item.label }}</strong>
            <span>{{ item.action }}</span>
            <small>{{ item.example }}</small>
          </article>
        </div>
      </section>

      <section class="requirements-section">
        <h2>Application Pages</h2>
        <div class="page-link-grid">
          <RouterLink v-for="item in pages" :key="item.path" :to="item.path" class="page-link-card">
            <span>{{ item.icon }}</span>
            <div>
              <strong>{{ item.name }}</strong>
              <small>{{ item.description }}</small>
            </div>
            <b>›</b>
          </RouterLink>
        </div>
      </section>

      <section class="requirements-section">
        <h2>Main Entity</h2>
        <div class="entity-card">
          <div><strong>Job Application</strong><span>Stored in browser localStorage</span></div>
          <ul>
            <li>Company and position</li>
            <li>Location and job type</li>
            <li>Date applied and status</li>
            <li>Salary, job link, notes, and interview information</li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
const functionalRequirements = [
  { number: '01', title: 'Single Page Application', description: 'Vue 3 and Vue Router provide client-side navigation without full-page reloads.' },
  { number: '02', title: 'User Account Flow', description: 'Users create an account first, then log in before accessing the application dashboard.' },
  { number: '03', title: 'Application Management', description: 'Users can add, view, edit, and delete job application records.' },
  { number: '04', title: 'Search and Filtering', description: 'Applications can be searched by company, position, or location and filtered by status and job type.' },
  { number: '05', title: 'Responsive App Design', description: 'The interface is designed as a mobile-friendly application with reusable Vue components.' }
]

const crudItems = [
  { label: 'CREATE', action: 'Add Application', example: 'Applications → + → Save Application' },
  { label: 'READ', action: 'View Applications', example: 'Dashboard, Applications, and Details pages' },
  { label: 'UPDATE', action: 'Edit Application', example: 'Details → Edit → Update Application' },
  { label: 'DELETE', action: 'Delete Application', example: 'Details → Delete → Confirm' }
]

const pages = [
  { name: 'Dashboard', path: '/dashboard', icon: '⌂', description: 'Application statistics and recent records' },
  { name: 'Applications', path: '/applications', icon: '▣', description: 'Search, filter, and manage records' },
  { name: 'Calendar', path: '/calendar', icon: '▦', description: 'Review application and interview dates' },
  { name: 'Profile', path: '/profile', icon: '♙', description: 'Manage account profile information' },
  { name: 'Settings', path: '/settings', icon: '⚙', description: 'Application preferences and logout' }
]
</script>
