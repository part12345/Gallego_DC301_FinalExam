<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const navigation = [
  {
    name: 'dashboard',
    path: '/dashboard',
    icon: '⌂',
    label: 'Home'
  },
  {
    name: 'applications',
    path: '/applications',
    icon: '▣',
    label: 'Applications'
  },
  {
    name: 'calendar',
    path: '/calendar',
    icon: '▦',
    label: 'Calendar'
  },
  {
    name: 'profile',
    path: '/profile',
    icon: '♙',
    label: 'Profile'
  }
]
</script>

<template>
  <nav class="bottom-nav">

    <RouterLink
      v-for="item in navigation"
      :key="item.name"
      :to="item.path"
      class="nav-item"
      :class="{
        active: route.name === item.name
      }"
    >

      <span class="nav-icon">
        {{ item.icon }}
      </span>

      <span>
        {{ item.label }}
      </span>

    </RouterLink>

  </nav>
</template>