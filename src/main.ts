import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Notifications from '@kyvg/vue3-notification'
import StarRating from 'vue-star-rating'
import Multiselect from '@vueform/multiselect'

import { Vue3BsPaginate } from 'vue3-bootstrap-paginate';

import './assets/main.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

// Create the Vue application instance
const app = createApp(App)

// Configure Pinia for state management
const pinia = createPinia()
app.use(pinia)

// Configure Vue Router
app.use(router)

// Configure notifications system
app.use(Notifications, {
    position: 'bottom right',
    duration: 4000,
    pauseOnHover: true
})

// Register global components
app.component('StarRating', StarRating)
app.component('Multiselect', Multiselect)
app.component('Vue3BsPaginate', Vue3BsPaginate)

// Global error handler for better debugging
app.config.errorHandler = (err, instance, info) => {
    console.error('Global error:', err)
    console.error('Component:', instance)
    console.error('Info:', info)
}

// Performance optimization: enable production mode warnings
if (import.meta.env.PROD) {
    app.config.warnHandler = () => null
}

// Mount the application
app.mount('#app')
