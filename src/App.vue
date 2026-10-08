<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BottomNav from './components/BottomNav.vue'

const route = useRoute()
const router = useRouter()

function applyTheme() {
  document.body.classList.toggle(
    'dark-mode',
    localStorage.getItem('jobtrack_dark') === 'true'
  )
}

onMounted(() => {
  document.body.classList.toggle(
    'dark-mode',
    localStorage.getItem('jobtrack_dark') === 'true'
  )
  applyTheme()
})

router.afterEach(() => applyTheme())

const showNavigation = computed(() => {
  return route.meta.requiresAuth
})
</script>

<template>
  <div class="app-shell">

    <main :class="{ 'with-navigation': showNavigation }">
      <RouterView />
    </main>

    <BottomNav v-if="showNavigation" />

  </div>
</template>