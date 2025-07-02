import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  // Get initial theme from localStorage or default to 'light'
  const currentTheme = ref(localStorage.getItem('theme') || 'light')

  // Apply theme to document
  const applyTheme = (theme: string) => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
    currentTheme.value = theme
  }

  // Toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = currentTheme.value === 'light' ? 'dark' : 'light'
    applyTheme(newTheme)
  }

  // Initialize theme on store creation
  const initializeTheme = () => {
    applyTheme(currentTheme.value)
  }

  // Watch for theme changes and apply them
  watch(currentTheme, (newTheme) => {
    applyTheme(newTheme)
  })

  return {
    currentTheme,
    toggleTheme,
    initializeTheme
  }
}) 