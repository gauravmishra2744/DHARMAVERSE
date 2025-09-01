import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { ecommerceService } from '../services/ecommerce';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [trackingInfo, setTrackingInfo] = useState(null);

  useEffect(() => {
    setOrders(ecommerceService.getOrders());
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      'confirmed': 'text-blue-400',
      'processing': 'text-yellow-400',
      'shipped': 'text-purple-400',
      'delivered': 'text-green-400',
      'cancelled': 'text-red-400'
    };
    return colors[status] || 'text-gray-400';
  };

  const getStatusIcon = (status) => {
    const icons = {
      'confirmed': '✅',
      'processing': '⏳',
      'shipped': '🚚',
      'delivered': '📦',
      'cancelled': '❌'
    };
    return icons[status] || '📋';
  };

  const trackOrder = (order) => {
    const tracking = ecommerceService.getTrackingInfo(order.tracking);
    setTrackingInfo(tracking);
    setSelectedOrder(order);
  };

  return (
    <div className="min-h-screen vedic-brown text-white">
      <Header />
      
      <div className="pt-24 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold sacred-text mb-8">📦 My Orders</h1>

          {orders.length === 0 ? (
            <div className="dharma-card p-8 rounded-xl text-center">
              <div className="text-6xl mb-4">📋</div>
              <h2 className="text-2xl font-bold mb-4">No Orders Yet</h2>
              <p className="text-amber-200 mb-6">You haven't placed any orders yet. Start shopping for spiritual books!</p>
              <Link 
                to="/shop"
                className="inline-block px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-500 text-white rounded-lg font-semibold hover:scale-105 transition-transform"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Orders List */}
              <div className="lg:col-span-2 space-y-4">
                {orders.map(order => (
                  <div key={order.id} className="dharma-card p-6 rounded-xl">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold">Order #{order.id}</h3>
                        <p className="text-sm text-amber-300">
                          Placed on {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className={`flex items-center gap-2 ${getStatusColor(order.status)}`}>
                          <span>{getStatusIcon(order.status)}</span>
                          <span className="capitalize font-semibold">{order.status}</span>
                        </div>
                        <div className="text-sm text-gray-400">
                          Total: ${order.total.toFixed(2)}
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-3 mb-4">
                      {order.items.slice(0, 2).map(item => (
                        <div key={item.id} className="flex gap-3">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="w-12 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <div className="text-sm font-medium line-clamp-1">{item.title}</div>
                            <div className="text-xs text-gray-400">
                              Qty: {item.quantity} • ${item.price}
                            </div>
                          </div>
                        </div>
                      ))}
                      {order.items.length > 2 && (
                        <div className="text-sm text-amber-300">
                          +{order.items.length - 2} more items
                        </div>
                      )}
                    </div>

                    {/* Shipping Info */}
                    <div className="bg-amber-900/20 rounded-lg p-3 mb-4">
                      <div className="text-sm">
                        <div className="font-medium mb-1">Shipping Address:</div>
                        <div className="text-gray-300">
                          {order.shippingAddress.fullName}<br/>
                          {order.shippingAddress.address}<br/>
                          {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button 
                        onClick={() => trackOrder(order)}
                        className="flex-1 bg-gradient-to-r from-amber-600 to-amber-500 text-white py-2 rounded-lg font-semibold hover:scale-105 transition-transform"
                      >
                        🚚 Track Order
                      </button>
                      <button className="px-4 py-2 border border-amber-600 text-amber-300 rounded-lg hover:bg-amber-600/10 transition-colors">
                        📄 Invoice
                      </button>
                      {order.status === 'delivered' && (
                        <button className="px-4 py-2 border border-green-600 text-green-300 rounded-lg hover:bg-green-600/10 transition-colors">
                          ⭐ Review
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Tracking Panel */}
              <div className="dharma-card p-6 rounded-xl h-fit">
                {selectedOrder && trackingInfo ? (
                  <>
                    <h3 className="text-xl font-bold sacred-text mb-4">📍 Order Tracking</h3>
                    
                    <div className="mb-4">
                      <div className="text-sm text-amber-300">Tracking Number</div>
                      <div className="font-mono text-lg">{trackingInfo.trackingNumber}</div>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm text-amber-300">Current Status</div>
                      <div className="font-semibold">{trackingInfo.currentStatus}</div>
                    </div>

                    <div className="mb-6">
                      <div className="text-sm text-amber-300">Estimated Delivery</div>
                      <div className="font-semibold">
                        {new Date(trackingInfo.estimatedDelivery).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Tracking Timeline */}
                    <div className="space-y-4">
                      <h4 className="font-semibold">Tracking History</h4>
                      {trackingInfo.statusHistory.map((status, index) => (
                        <div key={index} className="flex gap-3">
                          <div className="w-3 h-3 bg-amber-600 rounded-full mt-1 flex-shrink-0"></div>
                          <div className="flex-1">
                            <div className="font-medium">{status.status}</div>
                            <div className="text-sm text-gray-400">{status.location}</div>
                            <div className="text-xs text-amber-300">
                              {new Date(status.date).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {/* Future statuses */}
                      <div className="flex gap-3 opacity-50">
                        <div className="w-3 h-3 border-2 border-gray-600 rounded-full mt-1 flex-shrink-0"></div>
                        <div className="flex-1">
                          <div className="font-medium">Out for Delivery</div>
                          <div className="text-sm text-gray-400">Your City</div>
                        </div>
                      </div>
                      
                      <div className="flex gap-3 opacity-50">
                        <div className="w-3 h-3 border-2 border-gray-600 rounded-full mt-1 flex-shrink-0"></div>
                        <div className="flex-1">
                          <div className="font-medium">Delivered</div>
                          <div className="text-sm text-gray-400">Your Address</div>
                        </div>
                      </div>
                    </div>

                    {/* Delivery Instructions */}
                    <div className="mt-6 p-3 bg-blue-900/30 rounded-lg">
                      <div className="text-sm">
                        <div className="font-medium mb-1">📋 Delivery Instructions:</div>
                        <div className="text-gray-300">
                          Leave package at front door if no one is home. Signature required for orders over $100.
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4">📦</div>
                    <p className="text-amber-200">Select an order to view tracking information</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <Link 
              to="/shop"
              className="dharma-card p-6 rounded-xl text-center hover:scale-105 transition-transform"
            >
              <div className="text-4xl mb-3">🛒</div>
              <h3 className="font-semibold mb-2">Continue Shopping</h3>
              <p className="text-sm text-gray-400">Browse more spiritual books</p>
            </Link>
            
            <div className="dharma-card p-6 rounded-xl text-center">
              <div className="text-4xl mb-3">📞</div>
              <h3 className="font-semibold mb-2">Customer Support</h3>
              <p className="text-sm text-gray-400">Need help with your order?</p>
            </div>
            
            <div className="dharma-card p-6 rounded-xl text-center">
              <div className="text-4xl mb-3">↩️</div>
              <h3 className="font-semibold mb-2">Returns & Exchanges</h3>
              <p className="text-sm text-gray-400">30-day return policy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;