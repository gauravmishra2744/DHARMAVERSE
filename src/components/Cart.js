import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ecommerceService } from '../services/ecommerce';

const Cart = ({ isOpen, onClose }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCart(ecommerceService.getCart());
    }
  }, [isOpen]);

  const updateQuantity = (productId, quantity) => {
    const updatedCart = ecommerceService.updateQuantity(productId, quantity);
    setCart(updatedCart);
  };

  const removeItem = (productId) => {
    const updatedCart = ecommerceService.removeFromCart(productId);
    setCart(updatedCart);
  };

  const total = ecommerceService.getCartTotal();
  const itemCount = ecommerceService.getCartCount();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto">
        {/* Cart Header */}
        <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            Shopping Cart ({itemCount})
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="p-8 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-600 mb-4">Add some spiritual books to get started</p>
            <Link 
              to="/shop"
              onClick={onClose}
              className="inline-block px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="p-4 space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-16 h-20 object-cover rounded"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-600">{item.author}</p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-semibold text-green-600">
                          ₹{(item.price * item.quantity).toFixed(0)}
                        </div>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-xs text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="sticky bottom-0 bg-white border-t p-4">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>₹{total.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span className="text-green-600">
                    {total >= 1500 ? 'FREE' : '₹99'}
                  </span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span>₹{(total + (total >= 1500 ? 0 : 99)).toFixed(0)}</span>
                </div>
              </div>

              {total < 1500 && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-amber-800">
                    🚚 Add ₹{(1500 - total).toFixed(0)} more for FREE shipping!
                  </p>
                </div>
              )}

              <Link 
                to="/checkout"
                onClick={onClose}
                className="w-full bg-gradient-to-r from-amber-600 to-amber-500 text-white py-3 rounded-lg font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2"
              >
                🔒 Proceed to Checkout
              </Link>
              
              <Link 
                to="/shop"
                onClick={onClose}
                className="w-full mt-2 border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
              >
                Continue Shopping
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;