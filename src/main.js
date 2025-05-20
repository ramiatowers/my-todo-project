import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import './style.css'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate) // 👈 se activa el plugin

app.use(pinia)
app.use(router)

app.mount('#app')
