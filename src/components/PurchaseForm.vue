<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import { useCartStore } from '@/stores/basket'
import { useOrderStore } from '@/stores/order'
import OrderDetailsItem from '@/components/OrderDetailsItem.vue'

const cartStore = useCartStore();
const userStore = useUserStore();
const emit = defineEmits(['submit']);

const { handleCreateOrder } = useOrderStore();
const { user } = storeToRefs(userStore);
const { basket, totalPrice } = storeToRefs(cartStore);
const { fetchBasket } = cartStore;

async function onSubmit() {
    emit('submit', form)
    await handleCreateOrder(form.value)
    await fetchBasket()
}

const form = ref({
    address: user.value.address,
    deliveryTime: '',
})

const formatDate = (date: Date | string) => {
    if (typeof (date) == 'string') {
        date = new Date(date)
    }
    return new Date(date.getTime() + date.getTimezoneOffset() * -60 * 1000).toISOString();
}

const validateDate = () => {
    const current = new Date();
    const date = new Date(current.setMinutes(current.getMinutes() + 60));
    return formatDate(date).slice(0, 16);
}

</script>

<template>
    <form @submit.prevent="onSubmit" class="d-flex flex-column justify-content-space p-2 my-2">
        <h3 class="mb-4">Create order</h3>
        <h5>User data</h5>
        <div class="row">
            <div class="col">
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingPhone" placeholder="Email" :value="user.phoneNumber"
                        disabled readonly />
                    <label for="floatingPhone">Phone number</label>
                </div>
            </div>
            <div class="col">
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingEmail" placeholder="Email" :value="user.email"
                        disabled readonly />
                    <label for="floatingEmail">Email address</label>
                </div>
            </div>
            <h5>Delivery data</h5>
            <div class="col">
                <label class="form-label" for="deliveryAddress">Delivery address</label>
                <input type="text" class="form-control" id="deliveryAddress" placeholder="Address" v-model="form.address" />
            </div>
            <div class="col">
                <label class="form-label" for="deliveryDate">Delivery date</label>
                <input type="datetime-local" class="form-control" id="deliveryDate" :min="validateDate()"
                    v-model="form.deliveryTime" required />
            </div>
            <span class="mt-4">
                Item list:
            </span>
            <div v-if="basket.length !==0">
                <div class="col">
                    <div v-for="(item, ) in basket" v-bind:key="item.id">
                        <OrderDetailsItem :item="item" />
                    </div>
                </div>
                <div class="d-flex align-items-center my-2">
                    <span class="fw-bold">Price:</span>
                    <span class="ms-2">{{ totalPrice }} &#8381;</span>
                </div>
                <div class="col">
                    <button type="submit" class="btn btn-success">Confirm order</button>
                </div>
            </div>
            <div v-else>
                <span>No items found in the cart</span>
            </div>
        </div>
    </form>
</template>