<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import { useCartStore } from '@/stores/basket'
import { useOrderStore } from '@/stores/order'
import { useThemeStore } from '@/stores/theme'
import KeyboardShortcutsHelp from './KeyboardShortcutsHelp.vue'

const store = useUserStore();
const cartStore = useCartStore();
const themeStore = useThemeStore();

const { $resetOrders } = useOrderStore()
const { $resetBasket } = cartStore
const { basket } = storeToRefs(cartStore);
const { user, loggedIn } = storeToRefs(store);
const { currentTheme } = storeToRefs(themeStore);
const { handleLogout } = store;
const { toggleTheme } = themeStore;

async function onLogout() {
  await handleLogout();
  $resetOrders();
  $resetBasket();
}

</script>
<template>
    <nav class="navbar navbar-expand-sm fixed-top navbar-light shadow">
        <div class="container-fluid">
            <a class="navbar-brand">Delivery.Eats</a>
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link class="nav-link active" to="/">Menu</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" v-bind:class="{ disabled: !loggedIn }" to="/orders">Orders</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" v-bind:class="{ disabled: !loggedIn }" to="/cart">Cart
                            <span class="badge bg-success"> {{ basket.length }}</span>
                        </router-link>
                    </li>
                </ul>
            </div>
            
            <!-- Theme Toggle Button -->
            <div class="navbar-nav me-3">
                <button 
                    @click="toggleTheme" 
                    class="btn btn-outline-secondary btn-sm theme-toggle"
                    :title="currentTheme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'"
                >
                    <i v-if="currentTheme === 'light'" class="bi bi-moon-fill"></i>
                    <i v-else class="bi bi-sun-fill"></i>
                </button>
            </div>
            
            <!-- Keyboard Shortcuts Help -->
            <div class="navbar-nav me-3">
                <KeyboardShortcutsHelp />
            </div>
            
            <li v-if="loggedIn" class="nav-item dropdown d-flex align-items-center">
                <a class="nav-link dropdown-toggle mx-2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {{ user.email }}
                </a>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" v-on:click="$router.push('/profile')">Edit profile</a></li>
                </ul>
                <button type="button" class="btn btn-light" v-on:click="onLogout">Logout</button>
            </li>
            <div v-else class="navbar__login">
                <button type="button" class="btn btn-light" v-on:click="$router.push('/login')">Login</button>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.theme-toggle {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.theme-toggle:hover {
    transform: scale(1.1);
}

.theme-toggle i {
    font-size: 1.1rem;
}

/* Theme-aware dropdown styles */
.dropdown-menu {
    background-color: var(--card-bg);
    border-color: var(--border-color);
}

.dropdown-item {
    color: var(--text-primary);
}

.dropdown-item:hover {
    background-color: var(--bg-secondary);
    color: var(--text-primary);
}
</style>