<template>
  <div class="auth-page welcome-page">

    <div class="welcome-background">
      <div class="circle circle-one"></div>
      <div class="circle circle-two"></div>
      <div class="circle circle-three"></div>
    </div>

    <div class="welcome-content">

      <div class="brand-icon">
        💼
      </div>

      <h1>JobTrack</h1>

      <p class="brand-subtitle">
        Your Job Application Tracker
      </p>

      <div class="welcome-illustration">
        <div class="person">👨‍💻</div>
        <div class="plant">🌿</div>
      </div>

      <h2>Build your future</h2>

      <p class="welcome-text">
        Keep track of your job applications,
        interviews and opportunities all in one place.
      </p>

      <RouterLink
        to="/register"
        class="primary-button large-button"
      >
        Get Started
      </RouterLink>

      <RouterLink
        to="/login"
        class="outline-button large-button"
      >
        Login
      </RouterLink>

    </div>

  </div>
</template>