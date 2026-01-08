<template>
  <div class="house-create">
      <div class="house-create-wrapper">
        <div class="create-header-row">
          <router-link to="/" class="btn btn-edit-back">
            <img class="btn-create-back-icon" src="../assets/ic_back_grey@3x.png" alt="Back" />
            <p class="back-label">Back to overview</p>
          </router-link>
          <h1 class="create-header-sm">Create new listing</h1>
        </div>

      <h1 class="create-header-lg">Create new listing</h1>

      <form @submit.prevent="handleSubmit" novalidate>
        
        <!-- STREET -->
        <div class="full-size">
          <label>Street name*</label>
          <input
            type="text"
            v-model="form.location.street"
            placeholder="Enter the street name"
            @blur="v$.location.street.$touch()"
            :class="{ error: hasError(v$.location.street) }"
          />

          <p v-if="hasError(v$.location.street)" class="error-text">
            <span v-if="v$.location.street.required.$invalid">
              Required field missing.
            </span>
            <span v-else-if="v$.location.street.minLength.$invalid">
              Street must be at least 2 characters long.
            </span>
            <span v-else-if="v$.location.street.maxLength.$invalid">
              Street cannot be longer than 50 characters.
            </span>
          </p>
        </div>

        <!-- HOUSE NUMBER -->
        <div class="half-size">
          <label>House number*</label>
          <input
            type="number"
            v-model="form.location.houseNumber"
            placeholder="Enter the house number"
            @blur="v$.location.houseNumber.$touch()"
            :class="{ error: hasError(v$.location.houseNumber) }"
          />

          <p v-if="hasError(v$.location.houseNumber)" class="error-text">
            <span v-if="v$.location.houseNumber.required.$invalid">
              Required field missing.
            </span>
            <span v-else-if="v$.location.houseNumber.minValue.$invalid">
              House number must be at least 1.
            </span>
          </p>
        </div>

        <!-- ADDITION -->
        <div class="half-size">
          <label>Addition (optional)</label>
          <input
            type="text"
            v-model="form.location.houseNumberAddition"
            placeholder="e.g. A"
          />
        </div>

        <!-- ZIP -->
        <div class="full-size">
          <label>Postal code*</label>
          <input
            type="text"
            v-model="form.location.zip"
            placeholder="e.g. 1000 AA"
            @blur="v$.location.zip.$touch()"
            :class="{ error: hasError(v$.location.zip) }"
          />

          <p v-if="hasError(v$.location.zip)" class="error-text">
            <span v-if="v$.location.zip.required.$invalid">Required field missing.</span>
            <span v-else-if="v$.location.zip.zipPattern.$invalid">Invalid postal code format.</span>
          </p>
        </div>

        <!-- CITY -->
        <div class="full-size">
          <label>City*</label>
          <input
            type="text"
            v-model="form.location.city"
            placeholder="e.g. Utrecht"
            @blur="v$.location.city.$touch()"
            :class="{ error: hasError(v$.location.city) }"
          />

          <p v-if="hasError(v$.location.city)" class="error-text">
            <span v-if="v$.location.city.required.$invalid">
              Required field missing.
            </span>
            <span v-else-if="v$.location.city.minLength.$invalid">
              City must be at least 2 characters long.
            </span>
            <span v-else-if="v$.location.city.maxLength.$invalid">
              City cannot be longer than 50 characters.
            </span>
          </p>
        </div>

        <!-- IMAGE -->
        <div class="full-size">
          <label>Upload picture (PNG or JPG)*</label>
          <div class="input-wrapper" :class="{ 'has-image': image }" ref="imageWrapper">
            <input
              type="file"
              accept="image/png, image/jpeg"
              @click="imageTouched = true"
              @change="handleImageChange"
            />
            <button
              v-if="image"
              class="clear-button-white"
              @click.prevent="clearImage"
            >
              <img class="btn-clearImage" src="../assets/ic_clear_white@3x.png" alt="Clear" />
            </button>
          </div>

          <p v-if="imageError" class="error-text">
            Required field missing.
          </p>
        </div>

        <!-- PRICE -->
        <div class="full-size">
          <label>Price*</label>
          <input
            type="number"
            v-model="form.price"
            placeholder="e.g. €150.000"
            @blur="v$.price.$touch()"
            :class="{ error: hasError(v$.price) }"
          />

          <p v-if="hasError(v$.price)" class="error-text">
            Required field missing.
          </p>
        </div>

        <!-- SIZE -->
        <div class="half-size">
          <label>Size*</label>
          <input
            type="number"
            v-model="form.size"
            placeholder="e.g. 60 m2"
            @blur="v$.size.$touch()"
            :class="{ error: hasError(v$.size) }"
          />

          <p v-if="hasError(v$.size)" class="error-text">
            <span v-if="v$.size.required.$invalid">
              Required field missing.
            </span>
            <span v-else-if="v$.size.minValue.$invalid">
              Size must be at least 10 m2.
            </span>
          </p>
        </div>

        <!-- GARAGE -->
        <div class="half-size">
          <label>Garage*</label>
          <select v-model="form.hasGarage">
            <option disabled value="">Select</option>
            <option :value="true">Yes</option>
            <option :value="false">No</option>
          </select>

          <p v-if="hasError(v$.hasGarage)" class="error-text">
            Required field missing.
          </p>
        </div>

        <!-- ROOMS -->
        <div class="half-size">
          <label>Bedrooms*</label>
          <input type="number" 
              v-model="form.rooms.bedrooms"
              placeholder="Enter amount" 
              @blur="v$.rooms.bedrooms.$touch()"
              :class="{ error: hasError(v$.rooms.bedrooms) }"
          />

          <p v-if="hasError(v$.rooms.bedrooms)" class="error-text">
            <span v-if="v$.rooms.bedrooms.required.$invalid">
              Required field missing.
            </span>
            <span v-else-if="v$.rooms.bedrooms.minValue.$invalid">
              Number of bedrooms must be at least 1.
            </span>
          </p>
        </div>

        <div class="half-size">
          <label>Bathrooms*</label>
          <input type="number" 
              v-model="form.rooms.bathrooms" 
              placeholder="Enter amount"
              @blur="v$.rooms.bathrooms.$touch()"
              :class="{ error: hasError(v$.rooms.bathrooms) }"
          />

          <p v-if="hasError(v$.rooms.bathrooms)" class="error-text">
            <span v-if="v$.rooms.bathrooms.required.$invalid">
              Required field missing.
            </span>
            <span v-else-if="v$.rooms.bathrooms.minValue.$invalid">
              Number of bathrooms must be at least 1.
            </span>
          </p>
        </div>

        <!-- YEAR -->
        <div class="full-size">
          <label>Construction date*</label>
          <input
            type="number"
            v-model="form.constructionYear"
            placeholder="e.g. 1990"
            @blur="v$.constructionYear.$touch()"
            :class="{ error: hasError(v$.constructionYear) }"
          />

          <p v-if="hasError(v$.constructionYear)" class="error-text">
            <span v-if="v$.constructionYear.required.$invalid">
              Required field missing.
            </span>
            <span v-else-if="v$.constructionYear.minValue.$invalid">
              Year must be 1700 or later.
            </span>
            <span v-else-if="v$.constructionYear.maxValue.$invalid">
              Year cannot be later than {{ currentYear }}.
            </span>
          </p>
        </div>

        <!-- DESCRIPTION -->
        <div class="full-size">
          <label>Description*</label>
          <textarea
            rows="4"
            v-model="form.description"
            placeholder="Enter description"
            @blur="v$.description.$touch()"
            :class="{ error: hasError(v$.description) }"
          />

          <p v-if="hasError(v$.description)" class="error-text">
            <span v-if="v$.description.required.$invalid">
              Required field missing.
            </span>
            <span v-else-if="v$.description.minLength.$invalid">
              Description must be at least 15 characters long.
            </span>
            <span v-else-if="v$.description.maxLength.$invalid">
              Description cannot be longer than 10000 characters.
            </span>
          </p>
        </div>

        <div class="form-btn-wrapper">
          <button class="submit-form-button"
          :disabled="v$.$invalid || !image || isSubmitting">
            {{ isSubmitting ? 'Loading…' : 'Post' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from '@/stores/store'
import { useRouter } from 'vue-router'
import useVuelidate from '@vuelidate/core'
import { required, minLength, maxLength, minValue, maxValue, helpers } from '@vuelidate/validators'


export default {
  name: 'HouseCreateView',

  setup() {

    /* -----------------------------------
    * Router and Store
    * ------------------------------------
    * router is used to navigate after successful submit
    * store is used to handle API calls (addHouse)
    */

    const router = useRouter()
    const store = useStore()

    /* -----------------------------------
    * Form state
    * ------------------------------------
    * All form fields are grouped into one reactive object
    * so Vuelidate can validate the full structure.
    */

    const form = ref({
      location: {
        street: '',
        houseNumber: '',
        houseNumberAddition: '',
        zip: '',
        city: ''
      },
      price: '',
      size: '',
      hasGarage: '',
      rooms: {
        bedrooms: '',
        bathrooms: ''
      },
      constructionYear: '',
      description: ''
    })

    /* -----------------------------------
    * General UI state
    * ------------------------------------
    * currentYear is used for max validation on construction year
    * isSubmitting disables submit button while request is running
    */

    const currentYear = new Date().getFullYear()
    const isSubmitting = ref(false)

    /* -----------------------------------
    * Validation helper
    * ------------------------------------
    * Returns true when a field has been touched AND is invalid
    * Used to conditionally show error styles/messages
    */

    const hasError = (field) => field.$dirty && field.$invalid

    /* -----------------------------------
    * Custom ZIP code validator
    * ------------------------------------
    * Validates Dutch postal codes (e.g. 1234 AB)
    * Wrapped with helpers to work nicely with Vuelidate
    */

    const zipPattern = helpers.withMessage(
      'Invalid postal code format.',
      helpers.withParams(
        { type: 'zipPattern' },
        (value) => {
          if (!value) return true
          return /^[1-9][0-9]{3} ?(?!sa|SA|sd|SD|ss|SS)[a-zA-Z]{2}$/.test(value)
        }
      )
    )

    /* -----------------------------------
    * Vuelidate rules
    * ------------------------------------
    * Mirrors the structure of the form object
    * Each field contains its own validation rules
    */

    const rules = {
      location: {
        street: { required, minLength: minLength(2), maxLength: maxLength(50) },
        houseNumber: { required, minValue: minValue(1) },
        zip: { required, zipPattern, minLength: minLength(6), maxLength: maxLength(7) },
        city: { required, minLength: minLength(2), maxLength: maxLength(50) }
      },
      price: { required },
      size: { required, minValue: minValue(10) },
      hasGarage: { required },
      rooms: {
        bedrooms: { required, minValue: minValue(1) },
        bathrooms: { required, minValue: minValue(1) }
      },
      constructionYear: { required, minValue: minValue(1700), maxValue: maxValue(currentYear) },
      description: { required, minLength: minLength(15), maxLength: maxLength(10000) }
    }

    /* -----------------------------------
    * Initialize Vuelidate
    * ------------------------------------
    * v$ contains validation state & helpers
    */

    const v$ = useVuelidate(rules, form)

    /* -----------------------------------
    * Image upload state
    * ------------------------------------
    * image        -> selected file
    * imageWrapper -> DOM ref used to show preview background
    * imageTouched -> tracks whether user interacted with image input
    */

    const image = ref(null)
    const imageWrapper = ref(null)
    const imageTouched = ref(false)

    /* -----------------------------------
    * Image validation
    * ------------------------------------
    * Shows error if user interacted but no image is selected
    */

    const imageError = computed(() => {
      return imageTouched.value && !image.value
    })

    /* -----------------------------------
    * Handle image selection
    * ------------------------------------
    * Stores file and sets preview as background image
    */

    const handleImageChange = (e) => {
      const file = e.target.files[0]

      imageTouched.value = true

      if (!file) {
        image.value = null
        return
      }

      image.value = file

      if (imageWrapper.value) {
        imageWrapper.value.style.backgroundImage =
          `url(${URL.createObjectURL(file)})`
        imageWrapper.value.style.backgroundSize = 'cover'
      }
    }

    /* -----------------------------------
    * Clear selected image
    * ------------------------------------
    * Resets image state and removes preview
    */

    const clearImage = () => {
      image.value = null
      imageTouched.value = true
      if (imageWrapper.value) {
        imageWrapper.value.style.backgroundImage = ''
      }
    }

    /* -----------------------------------
    * Form submission
    * ------------------------------------
    * 1. Touch all validations
    * 2. Abort if invalid
    * 3. Build FormData
    * 4. Send data to store
    * 5. Redirect to detail page
    */

    const handleSubmit = async () => {
      v$.value.$touch()
      imageTouched.value = true

      if (v$.value.$invalid || imageError.value) return

      isSubmitting.value = true

      try {
        const data = new FormData()
        data.append('price', form.value.price)
        data.append('bedrooms', form.value.rooms.bedrooms)
        data.append('bathrooms', form.value.rooms.bathrooms)
        data.append('size', form.value.size)
        data.append('streetName', form.value.location.street)
        data.append('houseNumber', form.value.location.houseNumber)
        data.append('numberAddition', form.value.location.houseNumberAddition)
        data.append('zip', form.value.location.zip)
        data.append('city', form.value.location.city)
        data.append('constructionYear', form.value.constructionYear)
        data.append('hasGarage', form.value.hasGarage)
        data.append('description', form.value.description)

        const imageData = new FormData()
        imageData.append('image', image.value)

        const createdHouse = await store.addHouse(data, imageData)

        router.push({
            name: 'HouseDetailsView',
            params: { id: createdHouse.id }
        })
      } catch (err) {
        console.error('Create house failed:', err)
      } finally {
        isSubmitting.value = false
      }
    }

    return {
      form,
      image,
      imageWrapper,
      handleImageChange,
      clearImage,
      handleSubmit,
      currentYear,
      isSubmitting,
      imageError,
      v$,
      hasError,
      zipPattern
    }
  }
}
</script>
