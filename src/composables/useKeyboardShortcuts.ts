import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

export function useKeyboardShortcuts() {
  const router = useRouter()

  // Define keyboard shortcuts mapping
  const shortcuts = {
    'KeyC': () => router.push('/cart'),
    'KeyM': () => router.push('/'),
    'KeyO': () => router.push('/orders'),
    'KeyP': () => router.push('/profile'),
    'KeyL': () => router.push('/login'),
    'KeyR': () => router.push('/register'),
  }

  // Handle keydown events
  const handleKeydown = (event: KeyboardEvent) => {
    // Only handle shortcuts when not typing in input fields
    if (event.target instanceof HTMLInputElement || 
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement) {
      return
    }

    // Check if the pressed key matches any shortcut
    const shortcut = shortcuts[event.code as keyof typeof shortcuts]
    if (shortcut) {
      event.preventDefault()
      shortcut()
    }
  }

  // Set up event listeners
  onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
  })

  // Clean up event listeners
  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
  })

  return {
    shortcuts
  }
} 