<script setup>
defineProps({
  status: {
    type: String,
    required: true
  }
})
</script>

<template>
  <span
    class="status-badge"
    :class="{
      applied: status === 'Applied',
      review: status === 'In Review',
      interview: status === 'Interview',
      offer: status === 'Offer',
      rejected: status === 'Rejected'
    }"
  >
    <span class="status-dot"></span>
    {{ status }}
  </span>
</template>