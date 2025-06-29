<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCartStore } from '@/stores/basket'
import type { ICartItem } from '@/api/types'
import QuntitiInput from '@/components/QuantityInput.vue'

const props = defineProps<{ index: number, item: ICartItem }>()
const { decreaseFromCart } = useCartStore()

// Animation state for smooth removal
const isRemoving = ref(false)

// Computed total price for this item
const totalPrice = computed(() => {
    return props.item.price * props.item.amount
})

/**
 * Handle item removal with animation
 */
async function handleRemove() {
    isRemoving.value = true
    
    // Wait for animation to complete before removing
    setTimeout(() => {
        decreaseFromCart({ dishId: props.item.id, increase: false })
    }, 300)
}
</script>

<template>
    <div 
        class="cart-item card d-flex flex-md-row"
        :class="{ 'removing': isRemoving }"
    >
        <!-- Item number -->
        <div class="col-md-1 item-number">
            <span class="item-index">{{ props.index + 1 }}</span>
        </div>
        
        <!-- Item image -->
        <div class="item-image-container">
            <img 
                :src="props.item.image" 
                :alt="props.item.name"
                class="item-image"
                loading="lazy"
            >
        </div>
        
        <!-- Item details -->
        <div class="col item-details">
            <div class="item-info">
                <h5 class="item-title">{{ props.item.name }}</h5>
                <p class="item-price">Price per dish: {{ props.item.price }} ₽</p>
                <p class="item-total">Total: {{ totalPrice }} ₽</p>
            </div>
            
            <!-- Quantity controls -->
            <div class="quantity-section">
                <QuntitiInput :item="props.item.id" />
            </div>
        </div>
        
        <!-- Remove button -->
        <div class="col-md-2 remove-section">
            <button 
                type="button" 
                class="btn btn-outline-danger remove-btn"
                @click="handleRemove"
                :disabled="isRemoving"
            >
                <i class="bi bi-trash"></i>
                Remove
            </button>
        </div>
    </div>
</template>

<style scoped>
.cart-item {
    border: 1px solid #e9ecef;
    border-radius: 12px;
    margin-bottom: 1rem;
    transition: all 0.3s ease;
    background: white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.cart-item:hover {
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    transform: translateY(-2px);
}

.cart-item.removing {
    opacity: 0;
    transform: translateX(-100%);
}

.item-number {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 60px;
    min-width: 60px;
}

.item-index {
    background: #f8f9fa;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    color: #6c757d;
    font-size: 0.9rem;
}

.item-image-container {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    max-width: 120px;
    min-width: 120px;
}

.item-image {
    max-height: 80px;
    max-width: 100%;
    object-fit: cover;
    border-radius: 8px;
}

.item-details {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem;
    flex: 1;
}

.item-info {
    margin-bottom: 1rem;
}

.item-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: #212529;
    margin-bottom: 0.5rem;
}

.item-price {
    color: #6c757d;
    font-size: 0.9rem;
    margin-bottom: 0.25rem;
}

.item-total {
    color: #0d6efd;
    font-weight: 600;
    font-size: 1rem;
    margin-bottom: 0;
}

.quantity-section {
    display: flex;
    align-items: center;
}

.remove-section {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
}

.remove-btn {
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.remove-btn:hover {
    background-color: #dc3545;
    border-color: #dc3545;
    color: white;
    transform: scale(1.05);
}

.remove-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

/* Responsive design */
@media (max-width: 768px) {
    .cart-item {
        flex-direction: column;
        text-align: center;
    }
    
    .item-image-container {
        max-width: 100%;
        justify-content: center;
    }
    
    .item-details {
        padding: 0.5rem 1rem;
    }
    
    .remove-section {
        padding: 0.5rem;
    }
    
    .remove-btn {
        width: 100%;
        justify-content: center;
    }
}
</style>