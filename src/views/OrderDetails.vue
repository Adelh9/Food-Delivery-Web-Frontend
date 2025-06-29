<script setup lang="ts">
import OrderDetails from '@/components/OrderDetails.vue';

</script>

<template>
    <Suspense>
        <div class="container-sm shadow mb-5 py-3">
            <OrderDetails />
        </div>
        <template #fallback>
            <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </template>
    </Suspense>
</template>