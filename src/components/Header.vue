<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import { useCartStore } from '@/stores/basket'
import { useOrderStore } from '@/stores/order'

const store = useUserStore();
const cartStore = useCartStore();

const { $resetOrders } = useOrderStore()
const { $resetBasket } = cartStore
const { basket } = storeToRefs(cartStore);
const { user, loggedIn } = storeToRefs(store);
const { handleLogout } = store;

async function onLogout() {
  await handleLogout();
  $resetOrders();
  $resetBasket();
}


</script>
<template>
    <nav class="navbar navbar-expand-sm fixed-top navbar-light shadow" style="background-color: white">
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

<style scoped lang="scss"></style>