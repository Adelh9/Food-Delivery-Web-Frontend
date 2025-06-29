<script setup lang="ts">
import { useCartStore } from '@/stores/basket'
import type { ICartItem } from '@/api/types'
import QuntitiInput from '@/components/QuantityInput.vue'

const props = defineProps< { index: number, item: ICartItem } >()
const { decreaseFromCart } = useCartStore()

</script>

<template>
    <div class="card d-flex flex-md-row">
        <div class="col-md-1" style="max-width: 5%;">
            <p class="card-text ms-3 mt-2">{{ props.index + 1 }}.</p>
        </div>
        <img :src="props.item!.image" style="max-height: 7rem;" class="cropper py-2" alt="...">
        <div class="col d-flex flex-row m-3">
            <div class="me-3">
                <h5 class="card-title">{{ props.item.name }}</h5>
                <p class="card-subtitle">Price/dish: {{ props.item.price }} &#8381;</p>
            </div>
            <QuntitiInput :item="props.item.id" />
        </div>
        <div class="col-md-2">
            <div class="d-flex m-3 justify-content-md-end">
                <button type="button" class="btn btn-danger"
                    v-on:click="decreaseFromCart({ dishId: props.item.id, increase: false })">Remove</button>
            </div>
        </div>
    </div>
</template>