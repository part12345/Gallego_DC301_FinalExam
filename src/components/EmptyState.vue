<template>
  <div class="empty-state">

    <div class="empty-illustration">
      <div class="empty-paper">
        <span>☷</span>
      </div>

      <div class="empty-search">
        ⌕
      </div>
    </div>

    <h2>No job applications yet.</h2>

    <p>
      Start tracking your job search by adding
      your first application.
    </p>

    <RouterLink
      to="/applications/add"
      class="primary-button"
    >
      <span>＋</span>
      Add Application
    </RouterLink>

  </div>
</template>