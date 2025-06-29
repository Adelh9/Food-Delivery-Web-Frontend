<script setup lang="ts">
import { useCartStore } from '@/stores/basket'

const props = defineProps<{ item: string }>();

const { itemById, addToCart, decreaseFromCart } = useCartStore();

</script>

<template>
    <div class="wrapper">
        <button class="bttn bttn__minus" v-on:click="decreaseFromCart({ dishId: props.item, increase: true })"
            type="button" name="button">
            -
        </button>
        <input class="quantity" type="text" name="name" :value="itemById(props.item).amount">
        <button class="bttn bttn__plus" v-on:click="addToCart({ dishId: props.item })" type="button" name="button">
            +
        </button>
    </div>
</template>

<style scoped lang="scss">
.wrapper {
    height: 30px;
    display: flex;
}

.quantity {
    border: none;
    text-align: center;
    width: 30px;
    border-top: 1px solid #E1E8EE;
    border-bottom: 1px solid #E1E8EE;
    font-size: 16px;
    color: #43484D;
    background-color: #f3f5f7;
    font-weight: 300;
}

.bttn {
    border: 1px solid #E1E8EE;
    width: 30px;
    background-color: #f3f5f7;

    /*   border-radius: 6px; */
    &__minus {
        border-right: none;
    }

    &__plus {
        border-left: none;
    }
}
</style>
