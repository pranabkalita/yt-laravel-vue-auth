import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL

store.dispatch('auth/me').then(() => {
  createApp(App).use(store).use(router).mount('#app')
})
