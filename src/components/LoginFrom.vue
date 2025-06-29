<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useCartStore } from '@/stores/basket'
import type { ILoginRequest } from "@/api/types";

const { handleLogin } = useUserStore();
const { fetchBasket } = useCartStore();


const form = ref<ILoginRequest>({
  email: '',
  password: '',
});

async function onSubmit() {
  await handleLogin(form.value);
  await fetchBasket();
}
</script>

<template>
    <div class="card shadow" style="width: 25rem;">
      <div class="card-body py-5 text-center">
        <h3 class="mb-4">Autorization</h3>
        <form @submit.prevent="onSubmit">
          <div class="form-floating mb-3">
            <input type="email" class="form-control" id="floatingEmail" placeholder="Email" autocomplete="email" required
              v-model="form.email" />
            <label for="floatingEmail">Email address</label>
          </div>
          <div class="form-floating">
            <input type="password" class="form-control" id="floatingPassword" placeholder="Password"
              autocomplete="password" required v-model="form.password" />
            <label for="floatingPassword">Password</label>
          </div>
          <button type="submit" class="btn btn-primary my-3">Sign
            In</button>
        </form>
        <div>
          <span>Don't have an account? </span>
          <router-link class="forgot-register" to="/register">Register</router-link>
        </div>
      </div>
    </div>
</template>