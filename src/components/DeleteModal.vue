<script setup>
defineProps({
  application: {
    type: Object,
    default: null
  },
  show: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits([
  'cancel',
  'confirm'
])
</script>

<template>
  <div
    v-if="show"
    class="modal-overlay"
  >

    <div class="delete-modal">

      <div class="delete-icon">
        🗑
      </div>

      <h2>Delete Application?</h2>

      <p>
        Are you sure you want to delete
        this application?
      </p>

      <strong v-if="application">
        {{ application.company }} -
        {{ application.position }}
      </strong>

      <div class="modal-actions">

        <button
          class="secondary-button"
          @click="emit('cancel')"
        >
          Cancel
        </button>

        <button
          class="danger-button"
          @click="emit('confirm')"
        >
          Delete
        </button>

      </div>

    </div>

  </div>
</template>