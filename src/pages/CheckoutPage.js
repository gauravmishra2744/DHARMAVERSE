import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { ecommerceService } from '../services/ecommerce';
import { authService } from '../services/auth';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Form States
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState({
    type: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });
  
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    const cartItems = ecommerceService.getCart();
    if (cartItems.length === 0) {
      navigate('/shop');
      return;
    }
    setCart(cartItems);

    // Pre-fill user data if logged in
    const user = authService.getCurrentUser();
    if (user) {
      setShippingAddress(prev => ({
        ...prev,
        fullName: user.name,
        phone: user.phone || ''
      }));
    }
  }, [navigate]);

  const subtotal = ecommerceService.getCartTotal();
  const shipping = ecommerceService.calculateShipping(cart, shippingMethod, shippingAddress);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Process payment
      const paymentResult = await ecommerceService.processPayment({
        amount: total,
        method: paymentMethod
      });

      if (paymentResult.success) {
        // Create order
        const order = ecommerceService.createOrder({
          shippingAddress,
          paymentMethod: { ...paymentMethod, cardNumber: '**** **** **** ' + paymentMethod.cardNumber.slice(-4) },
          shippingMethod,
          subtotal,
          shipping,
          tax,
          total,
          transactionId: paymentResult.transactionId
        });

        setOrderId(order.id);
        setOrderPlaced(true);
      }
    } catch (error) {
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen vedic-brown text-white">
        <Header />
        <div className="pt-24 p-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="dharma-card p-8 rounded-xl">
              <div className="text-6xl mb-4">✅</div>
              <h1 className="text-3xl font-bold sacred-text mb-4">Order Confirmed!</h1>
              <p className="text-amber-200 mb-6">
                Thank you for your order. Your spiritual books are on their way!
              </p>
              
              <div className="bg-amber-900/30 rounded-lg p-4 mb-6">
                <div className="text-sm text-amber-300 mb-2">Order Number</div>
                <div className="text-xl font-bold">{orderId}</div>
              </div>

              <div className="space-y-2 text-sm text-left mb-6">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-amber-700 pt-2 flex justify-between font-bold">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Link 
                  to="/orders"
                  className="flex-1 bg-gradient-to-r from-amber-600 to-amber-500 text-white py-2 rounded-lg font-semibold hover:scale-105 transition-transform"
                >
                  Track Order
                </Link>
                <Link 
                  to="/shop"
                  className="flex-1 border border-amber-600 text-amber-300 py-2 rounded-lg font-semibold hover:bg-amber-600/10 transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen vedic-brown text-white">
      <Header />
      
      <div className="pt-24 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-amber-600 text-white' : 'bg-gray-600'}`}>
                1
              </div>
              <div className={`w-16 h-1 ${step >= 2 ? 'bg-amber-600' : 'bg-gray-600'}`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-amber-600 text-white' : 'bg-gray-600'}`}>
                2
              </div>
              <div className={`w-16 h-1 ${step >= 3 ? 'bg-amber-600' : 'bg-gray-600'}`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-amber-600 text-white' : 'bg-gray-600'}`}>
                3
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {step === 1 && (
                <div className="dharma-card p-6 rounded-xl">
                  <h2 className="text-2xl font-bold sacred-text mb-6">🚚 Shipping Address</h2>
                  
                  <form onSubmit={handleAddressSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-amber-200 mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={shippingAddress.fullName}
                        onChange={(e) => setShippingAddress({...shippingAddress, fullName: e.target.value})}
                        className="w-full px-3 py-2 bg-amber-900/50 border border-amber-700 rounded-lg text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-amber-200 mb-1">Address</label>
                      <input
                        type="text"
                        required
                        value={shippingAddress.address}
                        onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                        className="w-full px-3 py-2 bg-amber-900/50 border border-amber-700 rounded-lg text-white"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-amber-200 mb-1">City</label>
                        <input
                          type="text"
                          required
                          value={shippingAddress.city}
                          onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                          className="w-full px-3 py-2 bg-amber-900/50 border border-amber-700 rounded-lg text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-amber-200 mb-1">State</label>
                        <input
                          type="text"
                          required
                          value={shippingAddress.state}
                          onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})}
                          className="w-full px-3 py-2 bg-amber-900/50 border border-amber-700 rounded-lg text-white"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-amber-200 mb-1">ZIP Code</label>
                        <input
                          type="text"
                          required
                          value={shippingAddress.zipCode}
                          onChange={(e) => setShippingAddress({...shippingAddress, zipCode: e.target.value})}
                          className="w-full px-3 py-2 bg-amber-900/50 border border-amber-700 rounded-lg text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-amber-200 mb-1">Phone</label>
                        <input
                          type="tel"
                          required
                          value={shippingAddress.phone}
                          onChange={(e) => setShippingAddress({...shippingAddress, phone: e.target.value})}
                          className="w-full px-3 py-2 bg-amber-900/50 border border-amber-700 rounded-lg text-white"
                        />
                      </div>
                    </div>

                    {/* Shipping Method */}
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-4">Shipping Method</h3>
                      <div className="space-y-3">
                        {[
                          { id: 'standard', name: 'Standard Shipping', time: '5-7 business days', price: 5.99 },
                          { id: 'express', name: 'Express Shipping', time: '2-3 business days', price: 12.99 },
                          { id: 'overnight', name: 'Overnight Shipping', time: '1 business day', price: 24.99 }
                        ].map(method => (
                          <label key={method.id} className="flex items-center p-3 border border-amber-700 rounded-lg cursor-pointer hover:bg-amber-900/20">
                            <input
                              type="radio"
                              name="shipping"
                              value={method.id}
                              checked={shippingMethod === method.id}
                              onChange={(e) => setShippingMethod(e.target.value)}
                              className="mr-3"
                            />
                            <div className="flex-1">
                              <div className="font-medium">{method.name}</div>
                              <div className="text-sm text-gray-400">{method.time}</div>
                            </div>
                            <div className="font-semibold">
                              {subtotal >= 35 && method.id === 'standard' ? 'FREE' : `$${method.price}`}
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-amber-600 to-amber-500 text-white py-3 rounded-lg font-semibold hover:scale-105 transition-transform"
                    >
                      Continue to Payment
                    </button>
                  </form>
                </div>
              )}

              {step === 2 && (
                <div className="dharma-card p-6 rounded-xl">
                  <h2 className="text-2xl font-bold sacred-text mb-6">💳 Payment Information</h2>
                  
                  <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-amber-200 mb-1">Card Number</label>
                      <input
                        type="text"
                        required
                        placeholder="1234 5678 9012 3456"
                        value={paymentMethod.cardNumber}
                        onChange={(e) => setPaymentMethod({...paymentMethod, cardNumber: e.target.value})}
                        className="w-full px-3 py-2 bg-amber-900/50 border border-amber-700 rounded-lg text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-amber-200 mb-1">Name on Card</label>
                      <input
                        type="text"
                        required
                        value={paymentMethod.nameOnCard}
                        onChange={(e) => setPaymentMethod({...paymentMethod, nameOnCard: e.target.value})}
                        className="w-full px-3 py-2 bg-amber-900/50 border border-amber-700 rounded-lg text-white"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-amber-200 mb-1">Expiry Date</label>
                        <input
                          type="text"
                          required
                          placeholder="MM/YY"
                          value={paymentMethod.expiryDate}
                          onChange={(e) => setPaymentMethod({...paymentMethod, expiryDate: e.target.value})}
                          className="w-full px-3 py-2 bg-amber-900/50 border border-amber-700 rounded-lg text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-amber-200 mb-1">CVV</label>
                        <input
                          type="text"
                          required
                          placeholder="123"
                          value={paymentMethod.cvv}
                          onChange={(e) => setPaymentMethod({...paymentMethod, cvv: e.target.value})}
                          className="w-full px-3 py-2 bg-amber-900/50 border border-amber-700 rounded-lg text-white"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 border border-amber-600 text-amber-300 py-3 rounded-lg font-semibold hover:bg-amber-600/10 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-gradient-to-r from-amber-600 to-amber-500 text-white py-3 rounded-lg font-semibold hover:scale-105 transition-transform disabled:opacity-50"
                      >
                        {loading ? 'Processing...' : `Place Order - $${total.toFixed(2)}`}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="dharma-card p-6 rounded-xl h-fit">
              <h3 className="text-xl font-bold sacred-text mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-4">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <img src={item.image} alt={item.title} className="w-12 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <div className="text-sm font-medium line-clamp-2">{item.title}</div>
                      <div className="text-xs text-gray-400">Qty: {item.quantity}</div>
                      <div className="text-sm font-semibold text-green-400">${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-amber-700 pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-amber-700 pt-2 flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-green-900/30 rounded-lg">
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <span>🔒</span>
                  <span>Secure SSL Checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;