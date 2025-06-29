<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useUserStore } from '@/stores/user'
import type { IRegisterRequest } from '@/api/types'

const { handleRegister } = useUserStore();

// Form data with reactive validation
const form = ref<IRegisterRequest>({
    fullName: '',
    gender: '',
    birthDate: '',
    phoneNumber: '',
    address: '',
    email: '',
    password: '',
});

// Form validation state
const errors = reactive({
    fullName: '',
    gender: '',
    birthDate: '',
    phoneNumber: '',
    address: '',
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
 * Validate phone number format (Russian format)
 */
function validatePhone(phone: string): boolean {
    const phoneRegex = /^\+7\s?[\(]{0,1}9[0-9]{2}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}$/;
    return phoneRegex.test(phone);
}

/**
 * Validate name format (letters only, minimum 3 characters)
 */
function validateName(name: string): boolean {
    const nameRegex = /^[A-Za-zА-Яа-яЁё\s]{3,}$/;
    return nameRegex.test(name);
}

/**
 * Validate birth date (must be at least 18 years old)
 */
function validateBirthDate(date: string): boolean {
    if (!date) return false;
    const birthDate = new Date(date);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1 >= 18;
    }
    return age >= 18;
}

/**
 * Validate form fields before submission
 */
function validateForm(): boolean {
    let isValid = true;
    
    // Reset previous errors
    Object.keys(errors).forEach(key => {
        errors[key as keyof typeof errors] = '';
    });
    
    // Full name validation
    if (!form.value.fullName) {
        errors.fullName = 'Full name is required';
        isValid = false;
    } else if (!validateName(form.value.fullName)) {
        errors.fullName = 'Name must contain at least 3 letters';
        isValid = false;
    }
    
    // Gender validation
    if (!form.value.gender) {
        errors.gender = 'Please select your gender';
        isValid = false;
    }
    
    // Birth date validation
    if (!form.value.birthDate) {
        errors.birthDate = 'Birth date is required';
        isValid = false;
    } else if (!validateBirthDate(form.value.birthDate)) {
        errors.birthDate = 'You must be at least 18 years old';
        isValid = false;
    }
    
    // Phone number validation
    if (!form.value.phoneNumber) {
        errors.phoneNumber = 'Phone number is required';
        isValid = false;
    } else if (!validatePhone(form.value.phoneNumber)) {
        errors.phoneNumber = 'Please enter a valid Russian phone number (+7 XXX XXX XX XX)';
        isValid = false;
    }
    
    // Address validation
    if (!form.value.address) {
        errors.address = 'Address is required';
        isValid = false;
    } else if (form.value.address.length < 10) {
        errors.address = 'Address must be at least 10 characters';
        isValid = false;
    }
    
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
        await handleRegister(form.value);
    } catch (error) {
        console.error('Registration failed:', error);
        errors.general = 'Registration failed. Please try again.';
    } finally {
        isLoading.value = false;
    }
}
</script>

<template>
    <div class="card shadow" style="width: 30rem;">
        <div class="card-body text-center py-5">
            <h3 class="mb-4">Register New Account</h3>
            
            <!-- General error message -->
            <div v-if="errors.general" class="alert alert-danger" role="alert">
                {{ errors.general }}
            </div>
            
            <form @submit.prevent="onSubmit">
                <div class="form-floating mb-3">
                    <input 
                        type="text" 
                        class="form-control" 
                        :class="{ 'is-invalid': errors.fullName }"
                        id="floatingName" 
                        placeholder="Name" 
                        autocomplete="name"
                        required 
                        v-model="form.fullName" 
                        :disabled="isLoading"
                    />
                    <label for="floatingName">Full Name</label>
                    <div v-if="errors.fullName" class="invalid-feedback">
                        {{ errors.fullName }}
                    </div>
                </div>
                
                <div class="form-floating mb-3">
                    <select 
                        class="form-select" 
                        :class="{ 'is-invalid': errors.gender }"
                        id="autoSizingSelect" 
                        required 
                        v-model="form.gender"
                        :disabled="isLoading"
                    >
                        <option value="" disabled selected>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <label for="autoSizingSelect">Gender</label>
                    <div v-if="errors.gender" class="invalid-feedback">
                        {{ errors.gender }}
                    </div>
                </div>
                
                <div class="form-floating mb-3">
                    <input 
                        type="date" 
                        class="form-control" 
                        :class="{ 'is-invalid': errors.birthDate }"
                        id="floatingDate" 
                        placeholder="Date" 
                        required
                        v-model="form.birthDate" 
                        :max="new Date().toISOString().split('T')[0]"
                        :disabled="isLoading"
                    />
                    <label for="floatingDate">Birth Date</label>
                    <div v-if="errors.birthDate" class="invalid-feedback">
                        {{ errors.birthDate }}
                    </div>
                </div>
                
                <div class="form-floating mb-3">
                    <input 
                        type="tel" 
                        class="form-control" 
                        :class="{ 'is-invalid': errors.phoneNumber }"
                        id="floatingTel" 
                        placeholder="Phone number" 
                        autocomplete="tel"
                        required 
                        v-model="form.phoneNumber" 
                        :disabled="isLoading"
                    />
                    <label for="floatingTel">Phone Number (+7 XXX XXX XX XX)</label>
                    <div v-if="errors.phoneNumber" class="invalid-feedback">
                        {{ errors.phoneNumber }}
                    </div>
                </div>
                
                <div class="form-floating mb-3">
                    <input 
                        type="text" 
                        class="form-control" 
                        :class="{ 'is-invalid': errors.address }"
                        id="floatingAddress" 
                        placeholder="Address" 
                        required
                        v-model="form.address" 
                        :disabled="isLoading"
                    />
                    <label for="floatingAddress">Address</label>
                    <div v-if="errors.address" class="invalid-feedback">
                        {{ errors.address }}
                    </div>
                </div>
                
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
                    <label for="floatingEmail">Email Address</label>
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
                        autocomplete="new-password" 
                        required 
                        v-model="form.password" 
                        minlength="6"
                        :disabled="isLoading"
                    />
                    <label for="floatingPassword">Password</label>
                    <div v-if="errors.password" class="invalid-feedback">
                        {{ errors.password }}
                    </div>
                </div>
                
                <button 
                    type="submit" 
                    class="btn btn-primary mt-3 w-100"
                    :disabled="isLoading"
                >
                    <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status"></span>
                    {{ isLoading ? 'Creating Account...' : 'Register' }}
                </button>
            </form>
            
            <div class="mt-3">
                <span>Already have an account? </span>
                <router-link class="login-link" to="/login">Sign In</router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    border-radius: 15px;
    border: none;
}

.form-control:focus,
.form-select:focus {
    border-color: #0d6efd;
    box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
}

.btn-primary {
    border-radius: 8px;
    font-weight: 500;
}

.login-link {
    color: #0d6efd;
    text-decoration: none;
    font-weight: 500;
}

.login-link:hover {
    text-decoration: underline;
}
</style>