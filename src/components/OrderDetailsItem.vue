<script setup lang="ts">
import type { ICartItem } from '@/api/types'

const props = defineProps<{ item: ICartItem }>()
</script>

<template>
    <div class="card d-flex flex-md-row align-items-center">
        <img :src="item!.image" style="max-height: 7rem;" class="cropper py-2" alt="...">
        <div class="col">
            <div class="card-body">
                <h5 class="card-title">{{ props.item.name }}</h5>
                <p class="card-subtitle">Price: {{ props.item.price }} &#8381;/dish</p>
                <p class="card-subtitle mt-1">Quantity: {{ item.amount }}</p>
            </div>
        </div>
        <div class="col align-self-md-end">
            <div class="d-flex align-items-center justify-content-md-end">
                <p class="px-3"><strong>Price: </strong>{{ props.item.totalPrice }} &#8381;</p>
            </div>
        </div>
    </div>
</template>
