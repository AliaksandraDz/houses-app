import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import './assets/header and footer.css'
import './assets/house listing component.css'
import './assets/not found.css'
import './assets/home view.css'
import './assets/details view.css'
import './assets/modal.css'
import './assets/create and edit.css'
import './assets/about.css'

const pinia = createPinia();

pinia.use(({ store }) => {
  store.$router = router
});

createApp(App)
    .use(router)
    .use(pinia)
    .mount('#app')