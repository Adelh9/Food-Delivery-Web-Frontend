<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useOrderStore } from '@/stores/order'
import type { IGetOrderResponse } from '@/api/types'
import OrderDetailsItem from './OrderDetailsItem.vue'

const route = useRoute();
const id = route.params.id;

const { fetchOrderById, getDateFormated } = useOrderStore();

const orderItem: IGetOrderResponse = (await fetchOrderById(id as string))!;
const capSpace = (str: String) => str.replace(/([A-Z])/g, ' $1').trim();

</script>

<template>
    <div class="card border border-2 mx-2">
        <div class="card border-0">
            <div class="card-header">
                <h3 class="m-0">Order</h3>
            </div>
            <div class="card-body">
                <p class="card-subtitle">Created at: {{ getDateFormated(orderItem.orderTime, true)}}</p>
                <p class="card-subtitle">Delivery time: {{ getDateFormated(orderItem.deliveryTime, false) }}</p>
                <p class="card-subtitle">Delivery address: {{ orderItem.address }}</p>
                <p class="card-subtitle">Delivery status: {{ capSpace(orderItem.status) }}</p>
            </div>
        </div>
        <div class="col px-3">
            <span class="mt-4">
                Item list:
            </span>
            <div v-for="(item, ) in orderItem.dishes" v-bind:key="item.id">
                <OrderDetailsItem :item="item" />
            </div>
            <div class="d-flex align-items-center my-2">
                <span class="fw-bold">Price:</span>
                <span class="ms-2">{{ orderItem.price }} &#8381;</span>
            </div>
        </div>
    </div>
</template>
