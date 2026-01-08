<template>

    <div class="house-details main">
    <!-- Loader -->
    <div v-if="isLoading" class="main-house-card --loading">
      Loading house...
    </div>

    <!-- Error / not found -->
    <div v-else-if="!houseDetails" class="main-house-card --loading">
      House not found
    </div>

    <!-- Only render when data exists -->
    <article v-else class="main-house-card">

    <router-link to="/" class="btn btn-back">
      <picture>
          <!-- Small devices -->
          <source srcset="../assets/ic_back_white@3x.png" media="(max-width: 768px)">
          <!-- Large devices -->
          <source srcset="../assets/ic_back_grey@3x.png">
          <img class="btn-back-icon" src="../assets/ic_back_grey@3x.png" alt="Back">
      </picture> 
      <span class="btn-back-label">Back to overview</span>
    </router-link>

    <!-- Small devices -->
    <div class="house-actions-sm" v-if="houseDetails?.madeByMe">
      <router-link
        :to="{ name: 'HouseEditView', params: { id: $route.params.id }}"
        class="btn btn-edit">
          <img class="btn-edit-icon" src="../assets/ic_edit_white@3x.png" alt="Edit" />
      </router-link>

      <button class="btn btn-delete" @click="showModal = true">
          <img class="btn-delete-icon" src="../assets/ic_delete_white@3x.png" alt="Delete" />
      </button>
    </div>

      <img
        class="main-house-card-image"
        :src="houseDetails?.image"
        alt="House"
      />

      <div class="main-house-card-info">
        <div class="main-house-card-header">
          <h1 class="main-house-card-title">
            {{ houseDetails?.location?.street }} {{ houseDetails?.location?.houseNumber }}
          </h1>

          <!-- Large devices -->
          <div class="house-actions" v-if="houseDetails?.madeByMe">
            <router-link
              :to="{ name: 'HouseEditView', params: { id: $route.params.id }}"
              class="btn btn-edit">
                <img class="btn-edit-icon" src="../assets/ic_edit@3x.png" alt="Edit" />
            </router-link>

            <button class="btn btn-delete" @click="showModal = true">
                <img class="btn-delete-icon" src="../assets/ic_delete@3x.png" alt="Delete" />
            </button>
          </div>
      </div>

        <p class="main-house-card-meta">
          <span class="meta-item">
            <img src="../assets/ic_location@3x.png" alt="Location" />
            {{ houseDetails?.location?.zip }} {{ houseDetails?.location?.city }}
          </span>
        </p>

        <p class="main-house-card-meta">
          <span class="meta-item">
            <img src="../assets/ic_price@3x.png" alt="Price" />
            {{ houseDetails?.price }}
          </span>

          <span class="meta-item">
            <img src="../assets/ic_size@3x.png" alt="Size" />
            {{ houseDetails?.size }} m2
          </span>

          <span class="meta-item">
            <img src="../assets/ic_construction_date@3x.png" alt="Construction Year" />
            Built in {{ houseDetails?.constructionYear }}
          </span>
        </p>

        <p class="main-house-card-meta">
          <span class="meta-item">
            <img src="../assets/ic_bed@3x.png" alt="Bed" />
            {{ houseDetails?.rooms?.bedrooms }}
          </span>

          <span class="meta-item">
            <img src="../assets/ic_bath@3x.png" alt="Bath" />
            {{ houseDetails?.rooms?.bathrooms }}
          </span>

          <span class="meta-item">
            <img src="../assets/ic_garage@3x.png" alt="Garage" />
            {{ houseDetails?.hasGarage ? 'Yes' : 'No' }}
          </span>
        </p>
        
        <p class="main-house-card-description">
          {{ houseDetails?.description }}
        </p>

      </div>
    </article>

    <div class="recommended-houses">
      <h2>Recommended for you</h2>
      <div v-for="recommendedHouse in recommendations" :key="recommendedHouse.id" class="recommended-house">
          <div class="recommended-card-info" @click="navigateToHouseDetails(recommendedHouse.id)">
              <img :src="recommendedHouse.image" class="recommended-card-info-img" alt="House Image" />
              <div class="recommended-card-text">
                  <h3 class="recommended-house-card-title">{{ recommendedHouse.location.street }} {{ recommendedHouse.location.houseNumber }}</h3>
                  <p class="recommended-house-card-price">€ {{ recommendedHouse.price }} </p>
                  <p class="recommended-house-card-location">{{ recommendedHouse.location.zip }} {{ recommendedHouse.location.city }}</p>
                  <p class="recommended-house-meta">
                    <span class="meta-item">
                      <img src="../assets/ic_bed@3x.png" alt="Bed" /> {{ recommendedHouse.rooms.bedrooms }}
                    </span> 
                    <span class="meta-item">
                      <img src="../assets/ic_bath@3x.png" alt="Bath" /> {{ recommendedHouse.rooms.bathrooms }}
                    </span>
                    <span class="meta-item">
                      <img src="../assets/ic_size@3x.png" alt="Size" /> {{ recommendedHouse.size }} m2
                    </span>
                  </p>
              </div>
          </div>
      </div>
    </div>
    <ModalComponent v-if="showModal && houseDetails" :house="houseDetails" @close="showModal = false"/>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/stores/store'
import ModalComponent from '@/components/ModalComponent.vue'

/* -----------------------------------
* Router and Store
* ------------------------------------
* route is used to access route params & query (house id, delete flag)
* router is used for navigation to other house detail pages
* store is used for holding all houses
*/

const route = useRoute()
const router = useRouter()
const store = useStore()

/* -----------------------------------
* Reactive state
* ------------------------------------
* houseDetails is used for a currently selected house
* isLoading controls loading UI
* showModal controls delete confirmation modal
* recommendations is a list of recommended houses
*/

const houseDetails = ref(null)
const isLoading = ref(true)
const showModal = ref(route.query.delete === "true");
const recommendations = ref([]);

/* -----------------------------------
* Fetch house data and recommendations
* ------------------------------------
* 1. Fetch all houses (if not already loaded)
* 2. Find current house by id
* 3. Generate recommendations based on price similarity
*/

const fetchData = async (id) => {
  isLoading.value = true

  try {

    await store.getHouses()

    const currentHouse = store.houses.find(h => h.id === id)
    if (!currentHouse) {
      houseDetails.value = null
      recommendations.value = []
      return
    }

    houseDetails.value = currentHouse

    recommendations.value = store.houses
      .filter(h => h.id !== id)
      .map(h => ({
        ...h,
        priceDiff: Math.abs(currentHouse.price - h.price)
      }))
      .sort((a, b) => a.priceDiff - b.priceDiff)
      .slice(0, 3)

  } catch (err) {
    console.error('Error while fetching house:', err)
    houseDetails.value = null
    recommendations.value = []
  } finally {
    isLoading.value = false
  }
}

/* -----------------------------------
* Watch route changes
* ------------------------------------
* Re-fetch data when:
* - user navigates to another house
* - component is loaded for the first time
*/

watch(
  () => route.params.id,
  (id) => {
    if (!id) return
    fetchData(Number(id))
  },
  { immediate: true }
)

const navigateToHouseDetails = (houseId) => {
    router.push({ name: 'HouseDetailsView', params: { id: houseId } });
};

</script>
