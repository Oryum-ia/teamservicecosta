// Modern Cart System - Team Service Costa
// Based on clean, minimal design pattern

export interface CartProduct {
  id: string;
  name: string;
  model: string;
  price: number; // Price as number for calculations
  image?: string;
  quantity: number;
}

export interface CartState {
  items: CartProduct[];
  isOpen: boolean;
  total: number;
  itemCount: number;
}

class CartManager {
  private state: CartState = {
    items: [],
    isOpen: false,
    total: 0,
    itemCount: 0
  };

  private listeners: Array<(state: CartState) => void> = [];
  private static instance: CartManager;

  constructor() {
    console.log('🛒 CartManager initialized');
    this.loadFromStorage();
    this.updateTotals();
  }

  static getInstance(): CartManager {
    if (!CartManager.instance) {
      CartManager.instance = new CartManager();
    }
    return CartManager.instance;
  }

  // Subscribe to state changes
  subscribe(listener: (state: CartState) => void): () => void {
    this.listeners.push(listener);
    listener(this.state); // Initial call
    
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify(): void {
    this.updateTotals();
    this.saveToStorage();
    this.listeners.forEach(listener => listener(this.state));
  }

  private updateTotals(): void {
    this.state.itemCount = this.state.items.reduce((sum, item) => sum + item.quantity, 0);
    this.state.total = this.state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  // Cart operations
  addProduct(product: Omit<CartProduct, 'quantity'>): void {
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

  updateQuantity(productId: string, quantity: number): void {
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

  removeProduct(productId: string): void {
    this.state.items = this.state.items.filter(item => item.id !== productId);
    this.notify();
  }

  clearCart(): void {
    this.state.items = [];
    this.notify();
  }

  // Modal controls
  openCart(): void {
    this.state.isOpen = true;
    this.notify();
  }

  closeCart(): void {
    this.state.isOpen = false;
    this.notify();
  }

  toggleCart(): void {
    this.state.isOpen = !this.state.isOpen;
    this.notify();
  }

  // Getters
  getState(): CartState {
    return { ...this.state };
  }

  getItems(): CartProduct[] {
    return [...this.state.items];
  }

  getItemCount(): number {
    return this.state.itemCount;
  }

  getTotal(): number {
    return this.state.total;
  }

  isCartOpen(): boolean {
    return this.state.isOpen;
  }

  // Storage
  private saveToStorage(): void {
    try {
      localStorage.setItem('teamservicecosta_cart', JSON.stringify({
        items: this.state.items,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.warn('Failed to save cart to localStorage:', error);
    }
  }

  private loadFromStorage(): void {
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
  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  }

  parsePrice(priceString: string): number {
    // Convert price string like "549.900" to number 549900
    return parseFloat(priceString.replace(/[^\d.-]/g, ''));
  }
}

// Export singleton instance
export const cartManager = CartManager.getInstance();

// Global availability
declare global {
  interface Window {
    cartManager: CartManager;
  }
}

if (typeof window !== 'undefined') {
  window.cartManager = cartManager;
}