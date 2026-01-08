<template>
  <router-link :to="{ name: 'HouseDetailsView', query: { delete: clickedOnDelete}, params: { id: house.id }}">
    <article class="house-card">
      <img class="house-card-image" :src="house.image" alt="House"/>
      <div class="house-card-info">
        <h2 class="house-card-title">{{ house.location.street }} {{ house.location.houseNumber }}
          <div class="house-card-actions" v-if="house.madeByMe">
            <router-link
              :to="{ name: 'HouseEditView', params: { id: house.id }}"
              class="btn btn-edit">
                <img class="btn-edit-icon" src="../assets/ic_edit@3x.png" alt="Edit" />
            </router-link>
            <button class="btn btn-delete" @click="clickedOnDelete = true">
                <img class="btn-delete-icon" src="../assets/ic_delete@3x.png" alt="Delete" />
            </button>
          </div>
        </h2>
        <p class="house-card-price">€ {{ house.price }}</p>
        <p class="house-card-address">{{ house.location.zip }} {{ house.location.city }}</p>
        <p class="house-card-meta">
          <span class="meta-item">
            <img src="../assets/ic_bed@3x.png" alt="Bed" />{{ house.rooms.bedrooms }}
          </span>
          <span class="meta-item">
            <img src="../assets/ic_bath@3x.png" alt="Bath" />{{ house.rooms.bathrooms }} 
          </span>
          <span class="meta-item">
            <img src="../assets/ic_size@3x.png" alt="Size" />{{ house.size }} m2
          </span>
        </p>
      </div>
    </article>
  </router-link>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'HouseListingComponent',
  props: {
    house: {
      type: Object,
      required: true,
    },
  },

  setup() {

    /* -----------------------------------
    * Local state
    * ------------------------------------
    * clickedOnDelete →
    * - Becomes true when delete button is clicked
    * - Passed as query param to HouseDetailsView
    * - Used there to auto-open the delete modal
    */

    const clickedOnDelete = ref(false)

    return { clickedOnDelete }
  }
}
</script>
