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

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Notifications)

app.component('StarRating', StarRating);
app.component('Multiselect', Multiselect);
app.component('Vue3BsPaginate', Vue3BsPaginate);


app.mount('#app')
