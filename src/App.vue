<script setup lang="ts">
import { onMounted } from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { useUserStore } from '@/stores/user'
import { useCartStore } from '@/stores/basket'

const { fetchUserInfo } = useUserStore()
const { fetchBasket } = useCartStore();

onMounted(async () => {
  if (localStorage.getItem('jwt') !== null) {
    await fetchUserInfo()
    await fetchBasket()
  }
})

</script>

<template>
  <Header />
  <notifications position="bottom right" />
  <router-view />
  <Footer />
</template>

<style scoped></style>
