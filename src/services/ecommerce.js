// E-commerce Service - Cart, Orders, Shipping, Payment
export class EcommerceService {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.orders = JSON.parse(localStorage.getItem('orders') || '[]');
    this.addresses = JSON.parse(localStorage.getItem('addresses') || '[]');
    this.paymentMethods = JSON.parse(localStorage.getItem('paymentMethods') || '[]');
  }

  // Cart Management
  addToCart(product, quantity = 1) {
    const existingItem = this.cart.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cart.push({ ...product, quantity, addedAt: new Date().toISOString() });
    }
    this.saveCart();
    return this.cart;
  }

  removeFromCart(productId) {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.saveCart();
    return this.cart;
  }

  updateQuantity(productId, quantity) {
    const item = this.cart.find(item => item.id === productId);
    if (item) {
      item.quantity = Math.max(0, quantity);
      if (item.quantity === 0) {
        return this.removeFromCart(productId);
      }
    }
    this.saveCart();
    return this.cart;
  }

  getCart() {
    return this.cart;
  }

  getCartTotal() {
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getCartCount() {
    return this.cart.reduce((count, item) => count + item.quantity, 0);
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
  }

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  // Address Management
  addAddress(address) {
    const newAddress = {
      id: Date.now(),
      ...address,
      createdAt: new Date().toISOString()
    };
    this.addresses.push(newAddress);
    localStorage.setItem('addresses', JSON.stringify(this.addresses));
    return newAddress;
  }

  getAddresses() {
    return this.addresses;
  }

  // Payment Methods
  addPaymentMethod(method) {
    const newMethod = {
      id: Date.now(),
      ...method,
      createdAt: new Date().toISOString()
    };
    this.paymentMethods.push(newMethod);
    localStorage.setItem('paymentMethods', JSON.stringify(this.paymentMethods));
    return newMethod;
  }

  getPaymentMethods() {
    return this.paymentMethods;
  }

  // Order Management
  createOrder(orderData) {
    const order = {
      id: `DV${Date.now()}`,
      items: [...this.cart],
      ...orderData,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      estimatedDelivery: this.calculateDeliveryDate(orderData.shippingMethod),
      tracking: this.generateTrackingNumber()
    };
    
    this.orders.push(order);
    localStorage.setItem('orders', JSON.stringify(this.orders));
    this.clearCart();
    return order;
  }

  getOrders() {
    return this.orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  getOrder(orderId) {
    return this.orders.find(order => order.id === orderId);
  }

  updateOrderStatus(orderId, status) {
    const order = this.orders.find(order => order.id === orderId);
    if (order) {
      order.status = status;
      order.updatedAt = new Date().toISOString();
      localStorage.setItem('orders', JSON.stringify(this.orders));
    }
    return order;
  }

  // Shipping Calculation
  calculateShipping(items, method, address) {
    const weight = items.reduce((total, item) => total + (item.weight || 0.5) * item.quantity, 0);
    const basePrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
    
    const shippingRates = {
      standard: { base: 99, perKg: 40, days: 7 },
      express: { base: 199, perKg: 60, days: 3 },
      overnight: { base: 399, perKg: 120, days: 1 }
    };

    if (basePrice >= 1500) return 0; // Free shipping over ₹1500
    
    const rate = shippingRates[method] || shippingRates.standard;
    return rate.base + (weight * rate.perKg);
  }

  calculateDeliveryDate(method) {
    const days = { standard: 7, express: 3, overnight: 1 }[method] || 7;
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + days);
    return deliveryDate.toISOString();
  }

  generateTrackingNumber() {
    return 'DV' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }

  // Mock Payment Processing
  async processPayment(paymentData) {
    // Simulate payment processing
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          transactionId: 'txn_' + Math.random().toString(36).substr(2, 9),
          message: 'Payment processed successfully'
        });
      }, 2000);
    });
  }

  // Order Tracking
  getTrackingInfo(trackingNumber) {
    const statuses = [
      { status: 'Order Confirmed', date: new Date(Date.now() - 86400000 * 2), location: 'DharmaVerse Warehouse' },
      { status: 'Picked & Packed', date: new Date(Date.now() - 86400000 * 1), location: 'DharmaVerse Warehouse' },
      { status: 'In Transit', date: new Date(), location: 'Local Distribution Center' },
      { status: 'Out for Delivery', date: null, location: 'Your City' },
      { status: 'Delivered', date: null, location: 'Your Address' }
    ];

    return {
      trackingNumber,
      currentStatus: 'In Transit',
      estimatedDelivery: this.calculateDeliveryDate('standard'),
      statusHistory: statuses.filter(s => s.date)
    };
  }
}

export const ecommerceService = new EcommerceService();