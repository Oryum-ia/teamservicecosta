// Modern Cart System - Team Service Costa
// Integrated directly without ES6 imports for Astro compatibility

class CartManager {
  constructor() {
    this.state = {
      items: [],
      isOpen: false,
      total: 0,
      itemCount: 0
    };
    this.listeners = [];
    
    console.log('🛒 CartManager initialized');
    this.loadFromStorage();
    this.updateTotals();
  }

  // Subscribe to state changes
  subscribe(listener) {
    this.listeners.push(listener);
    listener(this.state); // Initial call
    
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.updateTotals();
    this.saveToStorage();
    this.listeners.forEach(listener => listener(this.state));
  }

  updateTotals() {
    this.state.itemCount = this.state.items.reduce((sum, item) => sum + item.quantity, 0);
    this.state.total = this.state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  // Cart operations
  addProduct(product) {
    console.log('🛒 Adding product to cart:', product);
    const existingItem = this.state.items.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
      console.log('🛒 Updated existing item quantity:', existingItem.quantity);
    } else {
      this.state.items.push({ ...product, quantity: 1 });
      console.log('🛒 Added new item to cart');
    }
    
    this.notify();
  }

  updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      this.removeProduct(productId);
      return;
    }

    const item = this.state.items.find(item => item.id === productId);
    if (item) {
      item.quantity = quantity;
      this.notify();
    }
  }

  removeProduct(productId) {
    this.state.items = this.state.items.filter(item => item.id !== productId);
    this.notify();
  }

  clearCart() {
    this.state.items = [];
    this.notify();
  }

  // Modal controls
  openCart() {
    this.state.isOpen = true;
    this.notify();
  }

  closeCart() {
    this.state.isOpen = false;
    this.notify();
  }

  toggleCart() {
    this.state.isOpen = !this.state.isOpen;
    this.notify();
  }

  // Getters
  getState() {
    return { ...this.state };
  }

  getItems() {
    return [...this.state.items];
  }

  getItemCount() {
    return this.state.itemCount;
  }

  getTotal() {
    return this.state.total;
  }

  isCartOpen() {
    return this.state.isOpen;
  }

  // Storage
  saveToStorage() {
    try {
      localStorage.setItem('teamservicecosta_cart', JSON.stringify({
        items: this.state.items,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.warn('Failed to save cart to localStorage:', error);
    }
  }

  loadFromStorage() {
    try {
      const saved = localStorage.getItem('teamservicecosta_cart');
      if (saved) {
        const data = JSON.parse(saved);
        // Check if data is not older than 7 days
        const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days in ms
        if (data.timestamp && (Date.now() - data.timestamp) < maxAge) {
          this.state.items = data.items || [];
        }
      }
    } catch (error) {
      console.warn('Failed to load cart from localStorage:', error);
      this.state.items = [];
    }
  }

  // Utility methods
  formatPrice(price) {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  }

  parsePrice(priceString) {
    // Convert price string like "549.900" to number 549900
    return parseFloat(priceString.replace(/[^\d.-]/g, ''));
  }
}

// Initialize and make globally available
if (typeof window !== 'undefined') {
  window.cartManager = new CartManager();
  console.log('🛒 CartManager set on window:', window.cartManager);
  
  // Dispatch ready event
  const event = new CustomEvent('cartManagerReady');
  document.dispatchEvent(event);
  console.log('🛒 cartManagerReady event dispatched');
}