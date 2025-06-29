<script setup lang="ts">
import DishDetails from '@/components/DishDetails.vue';

</script>

<template>
    <Suspense>
        <div class="container-sm shadow p-2 mb-5 h-50">
            <main>
                <DishDetails />
            </main>
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