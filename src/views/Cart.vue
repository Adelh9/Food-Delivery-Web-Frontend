<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useCartStore } from '@/stores/basket'
import CartItem from '@/components/CartItem.vue'

const store = useCartStore();
const { basket } = storeToRefs(store)

// Computed properties for cart summary
const totalItems = computed(() => {
    return basket.value.reduce((total, item) => total + item.amount, 0)
})

const subtotal = computed(() => {
    return basket.value.reduce((total, item) => total + (item.price * item.amount), 0)
})

const deliveryFee = computed(() => {
    return subtotal.value > 0 ? 200 : 0 // Free delivery for orders over certain amount
})

const total = computed(() => {
    return subtotal.value + deliveryFee.value
})

const isEmpty = computed(() => {
    return basket.value.length === 0
})
</script>

<template>
  <div class="cart-container">
    <div class="container">
      <div class="row">
        <!-- Cart Items Section -->
        <div class="col-lg-8">
          <div class="cart-items-section">
            <div class="cart-header">
              <h2 class="cart-title">
                <i class="bi bi-cart3"></i>
                Your Cart
              </h2>
              <span v-if="!isEmpty" class="item-count">
                {{ totalItems }} {{ totalItems === 1 ? 'item' : 'items' }}
              </span>
            </div>
            
            <!-- Cart Items -->
            <div v-if="!isEmpty" class="cart-items">
              <div 
                v-for="(item, index) in basket" 
                :key="item.id"
                class="cart-item-wrapper"
              >
                <CartItem :index="index" :item="item" />
              </div>
            </div>
            
            <!-- Empty Cart State -->
            <div v-else class="empty-cart">
              <div class="empty-cart-icon">
                <i class="bi bi-cart-x"></i>
              </div>
              <h3>Your cart is empty</h3>
              <p>Looks like you haven't added any delicious dishes yet!</p>
              <router-link to="/" class="btn btn-primary">
                <i class="bi bi-arrow-left"></i>
                Start Shopping
              </router-link>
            </div>
          </div>
        </div>
        
        <!-- Cart Summary Section -->
        <div v-if="!isEmpty" class="col-lg-4">
          <div class="cart-summary">
            <h3 class="summary-title">Order Summary</h3>
            
            <div class="summary-details">
              <div class="summary-row">
                <span>Subtotal ({{ totalItems }} items)</span>
                <span>{{ subtotal }} ₽</span>
              </div>
              
              <div class="summary-row">
                <span>Delivery Fee</span>
                <span>{{ deliveryFee }} ₽</span>
              </div>
              
              <div class="summary-divider"></div>
              
              <div class="summary-row total-row">
                <span>Total</span>
                <span class="total-amount">{{ total }} ₽</span>
              </div>
            </div>
            
            <div class="summary-actions">
              <router-link to="/purchase" class="btn btn-primary btn-checkout">
                <i class="bi bi-credit-card"></i>
                Proceed to Checkout
              </router-link>
              
              <router-link to="/" class="btn btn-outline-secondary btn-continue">
                <i class="bi bi-arrow-left"></i>
                Continue Shopping
              </router-link>
            </div>
            
            <div class="delivery-info">
              <div class="delivery-badge">
                <i class="bi bi-truck"></i>
                Free delivery on orders over 1000 ₽
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-container {
    padding: 2rem 0;
    min-height: 60vh;
}

.cart-items-section {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    margin-bottom: 2rem;
}

.cart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #f8f9fa;
}

.cart-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #212529;
    margin: 0;
    font-weight: 600;
}

.cart-title i {
    color: #0d6efd;
    font-size: 1.5rem;
}

.item-count {
    background: #e9ecef;
    color: #6c757d;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 500;
}

.cart-items {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.empty-cart {
    text-align: center;
    padding: 3rem 1rem;
}

.empty-cart-icon {
    font-size: 4rem;
    color: #dee2e6;
    margin-bottom: 1rem;
}

.empty-cart h3 {
    color: #6c757d;
    margin-bottom: 0.5rem;
}

.empty-cart p {
    color: #adb5bd;
    margin-bottom: 2rem;
}

.cart-summary {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    position: sticky;
    top: 2rem;
}

.summary-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #212529;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #f8f9fa;
}

.summary-details {
    margin-bottom: 2rem;
}

.summary-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 0;
    color: #6c757d;
}

.total-row {
    font-weight: 600;
    color: #212529;
    font-size: 1.1rem;
}

.total-amount {
    color: #0d6efd;
    font-size: 1.25rem;
}

.summary-divider {
    height: 1px;
    background: #e9ecef;
    margin: 1rem 0;
}

.summary-actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.btn-checkout {
    padding: 0.75rem 1.5rem;
    font-weight: 600;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

.btn-continue {
    padding: 0.75rem 1.5rem;
    font-weight: 500;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

.delivery-info {
    padding-top: 1rem;
    border-top: 1px solid #e9ecef;
}

.delivery-badge {
    background: #e8f5e8;
    color: #198754;
    padding: 0.75rem;
    border-radius: 8px;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
}

/* Responsive design */
@media (max-width: 992px) {
    .cart-summary {
        position: static;
        margin-top: 2rem;
    }
}

@media (max-width: 768px) {
    .cart-container {
        padding: 1rem 0;
    }
    
    .cart-items-section,
    .cart-summary {
        padding: 1.5rem;
    }
    
    .cart-header {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
    }
}
</style>