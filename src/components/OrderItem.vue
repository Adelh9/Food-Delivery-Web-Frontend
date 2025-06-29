<script setup lang="ts">
import router from '@/router'
import { useOrderStore } from '@/stores/order'
import type { IOrderItem } from '@/api/types'

const props = defineProps<{item: IOrderItem }>();
const { handleConfirmDelivery, fetchOrders, getDateFormated } = useOrderStore();

const handleClick = (id: string) => {
    router.push({name: 'orderDetail', params: { id }})
    console.log('oreders clicked', id)
}

const handleConfirm = async(id: string) => {
    await handleConfirmDelivery(id)
    await fetchOrders()
}

const capSpace = (str: String) => str.replace(/([A-Z])/g, ' $1').trim();
</script>

<template>
    <div class="card d-flex flex-row">
        <div class="card-body" v-on:click="handleClick(props.item.id)">
            <h5 class="card-title">Order from {{ new Date(props.item.orderTime).toLocaleDateString() }}</h5>
            <p class="card-subtitle">Order status - {{ capSpace(props.item.status) }}</p>
            <p class="card-subtitle mt-1">Delivery time: {{ getDateFormated(props.item.deliveryTime, false) }}</p>
        </div>
        <div class="py-3 ms-auto d-flex flex-column justify-content-between">
            <div class="me-3">
                <button type="button" v-if="props.item.status == 'InProcess'" v-on:click="handleConfirm(props.item.id)"
                    class="btn btn-outline-success w-100 ">Confirm delivery</button>
            </div>
            <div class="d-flex align-items-center align-self-end">
                <span class="fw-bold fs-6">Total order cost:</span>
                <span class="ms-2 me-3">{{ props.item.price }} &#8381;</span>
            </div>
        </div>
    </div>
</template>