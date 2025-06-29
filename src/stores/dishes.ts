import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useNotification } from "@kyvg/vue3-notification";
import type { IDishRequest, IDishesResponse, IDish, ISetRateRequest } from '@/api/types'
import axios from 'axios'
import authApi from '@/api/authApi'

const { notify } = useNotification()

export const useDishStore = defineStore('dishes', () => {
  const dishes = ref<IDishesResponse>({
    dishes: <IDish[]>[{
      name: '',
      description: '',
      price: 0,
      image: '',
      vegetarian: false,
      rating: 0,
      category: '',
      id: '',

    }],
    pagination: {
      count: 1,
      current: 1,
      size: 1
    },
  })

  const loading = ref(false)

  function setDishesInfo(data: IDishesResponse) {
    dishes.value = data;
    console.log('dish info updated:', dishes.value);
  }

  async function fetchDishes(params: IDishRequest) {
    try {
      loading.value = true;
      const { data } = await authApi.get<IDishesResponse>('dish', { params });
      console.log('fetching dishes...');
      setDishesInfo(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Fetch dishes axios error: ', error.response?.data.message);
      } else {
        console.error('Fetch dishes unexpected error: ', error);
      }
    } finally {
      loading.value = false;
    }
  }

  async function fetchDishById(id: string): Promise<IDish | null> {
    try {
      const { data } = await authApi.get<IDish>(`dish/${id}`,);
      console.log('fetchingById:', data);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Fetch dish axios error: ', error.response?.data.message);
      } else {
        console.error('Fetch dish unexpected error: ', error);
      }
      return null;
    }
  }

  async function isValidToRate(id: string): Promise<boolean | null> {
    try {
      const { data } = await authApi.get<boolean>(`dish/${id}/rating/check`,);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('isValid axios error: ', error.response?.data.message);
      } else {
        console.error('isValid unexpected error: ', error);
      }
      return null;
    }
  }

  async function handleSetRating(params: ISetRateRequest) {
    try {
      await authApi.post(`dish/${params.id}/rating?ratingScore=${params.ratingScore}`,);
      notify({
        type: 'success',
        title: 'Raiting set',
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('isValid axios error: ', error.response?.data.message);
      } else {
        console.error('isValid unexpected error: ', error);
      }
      return null;
    }
  }

  const getDishById = computed(() => {return (id: string) => dishes.value.dishes.find((item: IDish) => item.id === id) as IDish;});

  return { dishes, loading, getDishById, fetchDishes, fetchDishById, isValidToRate, handleSetRating }
})