<script setup lang="ts">
import { ref } from 'vue'

const showHelp = ref(false)

const shortcuts = [
  { key: 'C', description: 'Go to Cart' },
  { key: 'M', description: 'Go to Menu' },
  { key: 'O', description: 'Go to Orders' },
  { key: 'P', description: 'Go to Profile' },
  { key: 'L', description: 'Go to Login' },
  { key: 'R', description: 'Go to Register' },
]

const toggleHelp = () => {
  showHelp.value = !showHelp.value
}
</script>

<template>
  <div class="keyboard-shortcuts-help">
    <!-- Help Button -->
    <button 
      @click="toggleHelp" 
      class="btn btn-outline-info btn-sm help-btn"
      title="Keyboard Shortcuts"
    >
      <i class="bi bi-question-circle"></i>
      <span class="ms-1">Help</span>
    </button>

    <!-- Help Modal -->
    <div v-if="showHelp" class="help-overlay" @click="toggleHelp">
      <div class="help-modal" @click.stop>
        <div class="help-header">
          <h5>Keyboard Shortcuts</h5>
          <button @click="toggleHelp" class="btn-close"></button>
        </div>
        <div class="help-content">
          <p class="help-description">
            Use these keyboard shortcuts to navigate quickly through the application:
          </p>
          <div class="shortcuts-list">
            <div 
              v-for="shortcut in shortcuts" 
              :key="shortcut.key" 
              class="shortcut-item"
            >
              <kbd class="shortcut-key">{{ shortcut.key }}</kbd>
              <span class="shortcut-description">{{ shortcut.description }}</span>
            </div>
          </div>
          <div class="help-note">
            <small>
              <i class="bi bi-info-circle"></i>
              Note: Shortcuts work when not typing in input fields
            </small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.keyboard-shortcuts-help {
  position: relative;
}

.help-btn {
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.help-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
}

.help-modal {
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 4px 12px var(--shadow-color);
}

.help-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.help-header h5 {
  margin: 0;
  color: var(--text-primary);
}

.help-content {
  padding: 1rem;
}

.help-description {
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.shortcuts-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.shortcut-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.shortcut-key {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  font-family: monospace;
  font-size: 0.875rem;
  color: var(--text-primary);
  min-width: 2rem;
  text-align: center;
}

.shortcut-description {
  color: var(--text-primary);
  flex: 1;
}

.help-note {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
  color: var(--text-muted);
}

.help-note i {
  margin-right: 0.25rem;
}
</style> 