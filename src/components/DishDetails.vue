<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router';
import { useDishStore } from '@/stores/dishes'
import { useUserStore } from '@/stores/user'
import type { IDish, } from '@/api/types'

const route = useRoute();
const id = route.params.id;
const { fetchDishById, isValidToRate, getDishById, handleSetRating } = useDishStore();
const { loggedIn } = useUserStore();
const item = ref<IDish>(getDishById(id as string) ?? (await fetchDishById(id as string))!);
const isValid = loggedIn ? (await isValidToRate(item.value.id))! : false;

async function onSubmit() {
    await handleSetRating( {id: item.value.id!, ratingScore: Math.round(item.value.rating!)} )
    console.log('rate', Math.round(item.value.rating!))
    item.value = (await fetchDishById(id as string))!
}
</script>
<template>
    <h3>{{ item.name }}</h3>
    <div class="card">
        <img :src="item.image" class="card-img-top mx-auto d-block pt-3" style="width:30rem; height:20rem">
        <div class="card-body text-center">
            <p class="card-subtitle">Dish category - {{ item.category }}</p>
            <p v-if="item.vegetarian" class="card-text">Vegeterian</p>
            <p v-else class="card-text">Not vegeterian</p>
            <p class="card-text">{{ item.description }}</p>
            <StarRating class="rate justify-content-center" v-model:rating="item.rating" @update:rating="onSubmit" :show-rating="false" :max-rating="10" :fixed-points="2" :increment="0.01" :star-size="20" :read-only="!isValid"/>
            <p class="card-text my-0">Price - {{ item.price }}</p>
        </div>
    </div>
</template>

<style lang="scss">
.rate {
    margin: 0 !important;
    padding: 0 5px 10px 0 !important;
}
</style>