import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { IOrderItem, IGetOrdersResponse, IGetOrderResponse, IConfrimOrderRequest } from '@/api/types'
import axios from 'axios'
import { useNotification } from "@kyvg/vue3-notification";
import authApi from '@/api/authApi'
import router from '@/router'

const { notify } = useNotification()

export const useOrderStore = defineStore('order', () => {
    const orders = ref<IGetOrdersResponse>([])
    const loading = ref(false)

    function setOrderData(data: IOrderItem[]) {
        orders.value = data;
        console.log('cart info updated:', orders.value);
    }

    function $resetOrders() {
        orders.value = [];
      }

    async function fetchOrders() {
        try {
            loading.value = true;
            const { data } = await authApi.get<IGetOrdersResponse>('order',);
            console.log('fetching order...');
            setOrderData(data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Fetching orders axios error: ', error.response?.data.message);
            } else {
                console.error('Fetching orders unexpected error: ', error);
            }
        } finally {
            loading.value = false;
        }
    }

    async function fetchOrderById(id: string): Promise<IGetOrderResponse | null> {
        try {
            const { data } = await authApi.get<IGetOrderResponse>(`order/${id}`,);
            console.log('fetching order by id:', data);
            return data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Fetching order axios error: ', error.response?.data.message);
            } else {
                console.error('Fetching order unexpected error: ', error);
            }
            return null;
        }
    }

    async function handleCreateOrder(params: IConfrimOrderRequest) {
        try {
            await authApi.post('order', params);
            notify({
                type: 'success',
                title: "Order created",
            });
            router.push('/orders');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Create order axios error: ', error.response?.data.message);
            } else {
                console.error('Create order unexpected error: ', error);
            }
        }
    }

    async function handleConfirmDelivery(id: string) {
        try {
            await authApi.post(`order/${id}/status`,);
            notify({
                type: 'success',
                title: "Delivery confirmed",
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Create order axios error: ', error.response?.data.message);
            } else {
                console.error('Create order unexpected error: ', error);
            }
        }
    }
    const getDateFormated = computed(() => {
        return (id: string, serverSide: boolean) => {
            const date = new Date(id);
            if (serverSide) {
                return new Date(date.getTime() + date.getTimezoneOffset() * -60 * 1000).toLocaleString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(',', ' ');
            }
            return date.toLocaleString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(',', ' ');
        }
    })

    return { orders, loading, getDateFormated, $resetOrders, fetchOrders, fetchOrderById, handleCreateOrder, handleConfirmDelivery }
})