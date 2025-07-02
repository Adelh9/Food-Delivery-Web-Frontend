<script setup lang="ts">
import { onMounted } from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { useUserStore } from '@/stores/user'
import { useCartStore } from '@/stores/basket'
import { useThemeStore } from '@/stores/theme'
import { useKeyboardShortcuts } from '@/composables/useKeyboardShortcuts'

// Initialize store actions for user and cart management
const { fetchUserInfo } = useUserStore()
const { fetchBasket } = useCartStore();
const { initializeTheme } = useThemeStore();

// Initialize keyboard shortcuts
useKeyboardShortcuts()

/**
 * Application initialization on mount
 * Checks for existing JWT token and loads user data and cart if authenticated
 */
onMounted(async () => {
  // Initialize theme first
  initializeTheme()
  
  // Check if user is already authenticated via JWT token
  if (localStorage.getItem('jwt') !== null) {
    try {
      // Fetch user information and cart data in parallel for better performance
      await Promise.all([
        fetchUserInfo(),
        fetchBasket()
      ])
    } catch (error) {
      console.error('Failed to initialize app data:', error)
      // Clear invalid token if fetch fails
      localStorage.removeItem('jwt')
    }
  }
})

</script>

<template>
  <!-- Main application layout -->
  <Header />
  
  <!-- Global notifications system -->
  <notifications position="bottom right" />
  
  <!-- Dynamic route content -->
  <router-view />
  
  <!-- Footer component -->
  <Footer />
</template>

<style scoped>
/* Global application styles can be added here */
</style>
