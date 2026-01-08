import { defineStore } from 'pinia';
import { baseUrl } from '../shared/baseUrl';

/* =====================================================
* Main application store
* ======================================================
* This Pinia store is responsible for:
* - Fetching houses from the API
* - Creating, editing, and deleting houses
* - Managing search & sorting state
* - Providing filtered/sorted house lists
*/

export const useStore = defineStore('store', {
  state: () => ({
    houses: [],
    isActive: 'price',
    searchInput: '',
  }),

  actions: {
    async getHouses() {
      const res = await fetch(`${baseUrl}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });

      if (!res.ok) {
        console.error('Failed to fetch houses', res.status);
        return;
      }

      this.houses = await res.json();

    },

    async getHouseById(id) {
      const res = await fetch(`${baseUrl}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });
    
      if (!res.ok) {
        throw new Error(`Failed to fetch house ${id}`);
      }

      return await res.json()
    },

    async deleteHouse(id) {
      const res = await fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
      });
          
      if (!res.ok) {
        throw new Error(`Failed to delete house ${id}`);
      }
    },

    toggleActive(buttonType) {
      this.isActive = buttonType;
    },

    async addHouse(houseFormData) {

      const res = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(houseFormData)
      })
    
      if (!res.ok) {
        throw new Error('Failed to create house')
      }

      const text = await res.text()

      let createdHouse
      try {
        createdHouse = JSON.parse(text)
      } catch {
        console.error('Non-JSON response:', text)
        throw new Error('Invalid server response')
      }
    
      this.houses.push(createdHouse)
    
      return createdHouse
    },

    async editHouse(houseFormData, id) {
      const res = await fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(houseFormData),
      })
    
      if (!res.ok) {
        throw new Error(`Failed to update house ${id}`)
      }

      const index = this.houses.findIndex(h => h.id === id)
      if (index !== -1) {
        this.houses[index] = {
          ...this.houses[index],
          ...Object.fromEntries(houseFormData),
        }
      }
    },

    clearSearch() {
      this.searchInput = '';
    },
  },

  getters: {
    filteredHouses(state) {
      const query = state.searchInput.toLowerCase().trim();

      const sorted = [...state.houses].sort((a, b) => {
        if (state.isActive === 'price') return a.price - b.price;
        if (state.isActive === 'size') return a.size - b.size;
        return 0;
      });

      if (!query) return sorted;

      return sorted.filter((house) => {
        if (!house.location) return false;
        const street = house.location.street?.toLowerCase() || '';
        const city = house.location.city?.toLowerCase() || '';
        return street.includes(query) || city.includes(query);
      });
    },
  },
});
