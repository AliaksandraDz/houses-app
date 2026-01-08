<template>
  <div class="backdrop">
    <div class="modal">
      <h3>Delete listing</h3>
      <p>Are you sure you want to delete this listing?</p>
      <p class="modal-second-p">This action cannot be undone.</p>

      <router-link to="/">
        <button
          class="modal-delete"
          @click="handleDelete"
        >
          Yes, delete
        </button>
      </router-link>

      <button
        class="modal-back"
        @click="emitClose"
      >
        Go back
      </button>
    </div>
  </div>
</template>

<script>
import { useStore } from '@/stores/store'

export default {
  props: {
    house: {
      type: Object,
      required: true
    }
  },
  emits: ['close'],

  setup(props, { emit }) {
    const store = useStore()

    const handleDelete = () => {
      store.deleteHouse(props.house.id)
      emit('close')
    }

    const emitClose = () => {
      emit('close')
    }

    return {
      handleDelete,
      emitClose
    }
  }
}
</script>
  