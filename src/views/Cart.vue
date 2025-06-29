<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/basket'
import CartItem from '@/components/CartItem.vue'

const store = useCartStore();
const { basket } = storeToRefs(store)

</script>

<template>
  <div class="container-sm shadow p-2 mb-5">
    <h3>Your cart</h3>
    <div v-if="basket.length !== 0">
      <div v-for="(item, index) in basket" v-bind:key="item.id">
        <CartItem :index="index" :item="item" />
      </div>
    </div>
    <div v-else> 
      <h5>No items found in your cart</h5>
    </div>
  </div>
</template>