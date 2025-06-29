<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useOrderStore } from '@/stores/order'
import { useCartStore } from '@/stores/basket'
import OrderItem from '@/components/OrderItem.vue'

const orderStore = useOrderStore();
const cartStore = useCartStore();
const { orders, loading } = storeToRefs(orderStore);
const { basket } = storeToRefs(cartStore);

const { fetchOrders } = orderStore;

onMounted(async () => {
    await fetchOrders();
})

</script>

<template>
    <div class="container-sm shadow mb-5 py-3">
        <div class="d-flex border border-2 justify-content-space align-items-center p-2 mb-3">
            <span>An order can be created with the items in the cart</span>
            <button type="button" :disabled="basket.length == 0" class="btn ms-auto"
                :class="[basket.length !== 0 ? 'btn-success' : 'btn-danger']" v-on:click="$router.push('/purchase')">Create
                order</button>
        </div>
        <h3>Previous orders</h3>
        <div v-if="!loading">
            <div v-for="(item, ) in orders" v-bind:key="item.id">
                <OrderItem :item="item" />
            </div>
        </div>
        <div v-else class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>
</template>