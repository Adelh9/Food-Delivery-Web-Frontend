<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useUserStore } from '@/stores/user'
import { useCartStore } from '@/stores/basket'
import type { ILoginRequest } from "@/api/types";

const { handleLogin } = useUserStore();
const { fetchBasket } = useCartStore();

// Form data with reactive validation
const form = ref<ILoginRequest>({
  email: '',
  password: '',
});

// Form validation state
const errors = reactive({
  email: '',
  password: '',
  general: ''
});

// Loading state for better UX
const isLoading = ref(false);

/**
 * Validate email format
 */
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate form fields before submission
 */
function validateForm(): boolean {
  let isValid = true;
  
  // Reset previous errors
  errors.email = '';
  errors.password = '';
  errors.general = '';
  
  // Email validation
  if (!form.value.email) {
    errors.email = 'Email is required';
    isValid = false;
  } else if (!validateEmail(form.value.email)) {
    errors.email = 'Please enter a valid email address';
    isValid = false;
  }
  
  // Password validation
  if (!form.value.password) {
    errors.password = 'Password is required';
    isValid = false;
  } else if (form.value.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
    isValid = false;
  }
  
  return isValid;
}

/**
 * Handle form submission with enhanced error handling
 */
async function onSubmit() {
  if (!validateForm()) {
    return;
  }
  
  isLoading.value = true;
  
  try {
    await handleLogin(form.value);
    await fetchBasket();
  } catch (error) {
    console.error('Login failed:', error);
    errors.general = 'Invalid email or password. Please try again.';
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="card shadow" style="width: 25rem;">
    <div class="card-body py-5 text-center">
      <h3 class="mb-4">Authorization</h3>
      
      <!-- General error message -->
      <div v-if="errors.general" class="alert alert-danger" role="alert">
        {{ errors.general }}
      </div>
      
      <form @submit.prevent="onSubmit">
        <div class="form-floating mb-3">
          <input 
            type="email" 
            class="form-control" 
            :class="{ 'is-invalid': errors.email }"
            id="floatingEmail" 
            placeholder="Email" 
            autocomplete="email" 
            required
            v-model="form.email" 
            :disabled="isLoading"
          />
          <label for="floatingEmail">Email address</label>
          <div v-if="errors.email" class="invalid-feedback">
            {{ errors.email }}
          </div>
        </div>
        
        <div class="form-floating mb-3">
          <input 
            type="password" 
            class="form-control" 
            :class="{ 'is-invalid': errors.password }"
            id="floatingPassword" 
            placeholder="Password"
            autocomplete="current-password" 
            required 
            v-model="form.password" 
            :disabled="isLoading"
          />
          <label for="floatingPassword">Password</label>
          <div v-if="errors.password" class="invalid-feedback">
            {{ errors.password }}
          </div>
        </div>
        
        <button 
          type="submit" 
          class="btn btn-primary my-3 w-100"
          :disabled="isLoading"
        >
          <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status"></span>
          {{ isLoading ? 'Signing In...' : 'Sign In' }}
        </button>
      </form>
      
      <div class="mt-3">
        <span>Don't have an account? </span>
        <router-link class="forgot-register" to="/register">Register</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  border-radius: 15px;
  border: none;
}

.form-control:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
}

.btn-primary {
  border-radius: 8px;
  font-weight: 500;
}

.forgot-register {
  color: #0d6efd;
  text-decoration: none;
  font-weight: 500;
}

.forgot-register:hover {
  text-decoration: underline;
}
</style>