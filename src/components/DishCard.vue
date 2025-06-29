<script setup lang="ts">
import router from '@/router'
import type { IDish } from '@/api/types'
import { useCartStore } from '@/stores/basket'
import { useUserStore } from '@/stores/user'
import QuantityInput from './QuantityInput.vue'

const props = defineProps<{ dish: IDish }>();
const { addToCart, itemById } = useCartStore();
const { loggedIn } = useUserStore();

const handleClick = () => {
    router.push({ name: 'item', params: { id: props.dish.id } });
    console.log('rate', props.dish!.rating)
}

</script>
<template>
    <div class="card" style="height: 35rem">
        <div class="d-block background-img">
            <img :src="props.dish.image" class="card-img-top" style="height: 12rem">
            <img v-show="props.dish.vegetarian" src="../assets/Vegetarian.svg" class="icon" style="max-height: 30px">
        </div>
        <div class="card-body" v-on:click="handleClick">
            <h5 class="card-title">{{ props.dish.name }}</h5>
            <p class="card-subtitle mb-2">Dish category - {{ props.dish.category }}</p>
            <StarRating class="rate justify-content-center" v-model:rating="props.dish!.rating" :show-rating="false" :max-rating="10" :fixed-points="3" :increment="0.001" :star-size="20" :read-only="true"/>
            <p class="card-text" style="font-size:0.9rem">{{ props.dish.description }}</p>
        </div>
        <div class="d-flex align-items-center justify-content-between card-footer mt-auto text-muted">
            <p class="card-text my-0">Price - {{ props.dish.price }}</p>
            <div v-if="!itemById(props.dish.id)">
                <button class="btn btn-primary" :disabled="!loggedIn" v-on:click="addToCart({ dishId: props.dish.id })">Add
                    to cart</button>
            </div>
            <div v-else>
                <QuantityInput :item="props.dish.id" class="my-1"/>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.rate {
    margin: 0 !important;
    padding: 0 5px 10px 0 !important;
}

.background-img .icon {
    position: absolute;
    overflow: hidden;
    top: 28%;
    left: 85%;
}

.background-img .icon {
    opacity: 1;
    width: 30px;
    height: 30px;
}
</style>