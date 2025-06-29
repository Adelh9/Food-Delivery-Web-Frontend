import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ICartItem, IBasketResponse, IAddToBasketRequest, IDeleteFromBasketRequest } from '@/api/types'
import axios from 'axios'
import { useNotification } from "@kyvg/vue3-notification";
import authApi from '@/api/authApi'

const { notify } = useNotification();

export const useCartStore = defineStore('basket', () => {
  const basket = ref<IBasketResponse>([]);

  function setBasketData(data: ICartItem[]) {
    basket.value = data;
    console.log('cart info updated:', basket.value);
  }

  function $resetBasket() {
    basket.value = [];
  }

  async function fetchBasket() {
    try {
      const { data } = await authApi.get<IBasketResponse>('basket',);
      console.log('fetching basket...');
      setBasketData(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Fetching basket axios error: ', error.response?.data.message);
      } else {
        console.error('Fetching basket unexpected error: ', error);
      }
    }
  }

  async function addToCart(params: IAddToBasketRequest) {
    try {
      await authApi.post(`basket/dish/${params.dishId}`, { params });
      await fetchBasket();
      notify({
        type: 'success',
        title: "Added to cart",
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Add to cart axios error: ', error.response?.data.message);
      } else {
        console.error('Add to cart unexpected error: ', error);
      }
    }
  }

  async function decreaseFromCart(params: IDeleteFromBasketRequest) {
    try {
      await authApi.delete(`basket/dish/${params.dishId}`, { params });
      await fetchBasket();
      notify({
        type: 'success',
        title: params.increase ? "Dish removed from the cart": "Dishes deleted from the cart",
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Delete/decrease axios error: ', error.response?.data.message);
      } else {
        console.error('Delete/decrease unexpected error: ', error);
      }
    }
  }

  const itemById = computed(() => { return (id: string): ICartItem => basket.value.find((item: ICartItem) => item.id === id) as ICartItem; });
  const totalPrice = computed(() => basket.value.map((item => item.totalPrice)).reduce((a, b) => a + b));

  return { basket, itemById, totalPrice, $resetBasket, fetchBasket, addToCart, decreaseFromCart }
})