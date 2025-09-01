import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Particles from '../Particles';
import Cart from '../components/Cart';
import { ecommerceService } from '../services/ecommerce';

const ShopPage = () => {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCart, setShowCart] = useState(false);

  const books = [
    {
      id: 1,
      title: "Bhagavad Gita As It Is",
      author: "A.C. Bhaktivedanta Swami Prabhupada",
      price: 899,
      originalPrice: 1299,
      rating: 4.8,
      reviews: 2847,
      image: "https://www.bing.com/images/search?view=detailV2&ccid=E2ndrBfA&id=A2FF34BB58ABF201B9B03D6BCA1E6CCF0494B561&thid=OIP.E2ndrBfA7QOmFJQOdzst8wHaNI&mediaurl=https%3a%2f%2fwisdombooksofindia.com%2fwp-content%2fuploads%2f2019%2f05%2fEng-cvr-Bhagavad-gita.jpg&exph=1295&expw=730&q=bhagavad+gita&FORM=IRPRST&ck=BD6BA88B9F2E46EE7077050F772A3B04&selectedIndex=0&itb=0",
      category: "hinduism",
      description: "The world's most popular edition of the timeless classic",
      bestseller: true
    },
    {
      id: 2,
      title: "The Holy Bible - NIV Study Edition",
      author: "Zondervan Publishing",
      price: 1199,
      originalPrice: 1599,
      rating: 4.9,
      reviews: 5234,
      image: "w=300&h=400&fit=crop",
      category: "christianity",
      description: "Complete study Bible with commentary and maps",
      bestseller: true
    },
    {
      id: 3,
      title: "The Noble Quran - English Translation",
      author: "Dr. Muhammad Taqi-ud-Din Al-Hilali",
      price: 699,
      originalPrice: 999,
      rating: 4.7,
      reviews: 1892,
      image: "w=300&h=400&fit=crop",
      category: "islam",
      description: "Clear English translation with Arabic text",
      bestseller: false
    },
    {
      id: 4,
      title: "The Dhammapada - Buddha's Path of Wisdom",
      author: "Acharya Buddharakkhita",
      price: 599,
      originalPrice: 849,
      rating: 4.6,
      reviews: 987,
      image: "w=300&h=400&fit=crop",
      category: "buddhism",
      description: "Essential teachings of the Buddha",
      bestseller: false
    },
    {
      id: 5,
      title: "Meditations by Marcus Aurelius",
      author: "Marcus Aurelius",
      price: 549,
      originalPrice: 749,
      rating: 4.5,
      reviews: 3421,
      image: "w=300&h=400&fit=crop",
      category: "philosophy",
      description: "Timeless Stoic philosophy and wisdom",
      bestseller: false
    },
    {
      id: 6,
      title: "The Power of Now",
      author: "Eckhart Tolle",
      price: 649,
      originalPrice: 899,
      rating: 4.4,
      reviews: 8765,
      image: "w=300&h=400&fit=crop",
      category: "spirituality",
      description: "A guide to spiritual enlightenment",
      bestseller: true
    }
  ];

  const categories = [
    { id: 'all', name: 'All Books', icon: '📚' },
    { id: 'hinduism', name: 'Hinduism', icon: '🕉️' },
    { id: 'christianity', name: 'Christianity', icon: '✝️' },
    { id: 'islam', name: 'Islam', icon: '☪️' },
    { id: 'buddhism', name: 'Buddhism', icon: '☸️' },
    { id: 'philosophy', name: 'Philosophy', icon: '🏛️' },
    { id: 'spirituality', name: 'Spirituality', icon: '✨' }
  ];

  const filteredBooks = selectedCategory === 'all' 
    ? books 
    : books.filter(book => book.category === selectedCategory);

  useEffect(() => {
    setCart(ecommerceService.getCart());
  }, []);

  const addToCart = (book) => {
    const updatedCart = ecommerceService.addToCart(book);
    setCart(updatedCart);
  };

  const cartTotal = ecommerceService.getCartTotal();
  const cartCount = ecommerceService.getCartCount();

  return (
    <div className="min-h-screen vedic-brown text-white relative overflow-hidden">
      <Particles />
      <Header />
      
      <div className="relative z-10 pt-24 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Shop Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold sacred-text mb-4">
              📖 Spiritual Bookstore
            </h1>
            <p className="text-xl text-amber-200 max-w-2xl mx-auto">
              Discover ancient wisdom through sacred texts and modern spiritual guides
            </p>
            
            {/* Cart Summary */}
            {cart.length > 0 && (
              <div className="mt-6 inline-flex items-center gap-2 bg-amber-900/30 px-4 py-2 rounded-full">
                <span className="text-2xl">🛒</span>
                <span>{cart.length} items - ₹{cartTotal.toFixed(0)}</span>
              </div>
            )}
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full transition-all ${
                  selectedCategory === category.id
                    ? 'bg-amber-600 text-white'
                    : 'bg-amber-900/30 hover:bg-amber-800/40'
                }`}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>

          {/* Books Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map(book => (
              <div key={book.id} className="dharma-card rounded-xl overflow-hidden hover:scale-105 transition-transform">
                {/* Book Image */}
                <div className="relative">
                  <img 
                    src={book.image} 
                    alt={book.title}
                    className="w-full h-64 object-cover"
                  />
                  {book.bestseller && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      🔥 Bestseller
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-sm">
                    ⭐ {book.rating}
                  </div>
                </div>

                {/* Book Details */}
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1 line-clamp-2">{book.title}</h3>
                  <p className="text-amber-300 text-sm mb-2">by {book.author}</p>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">{book.description}</p>
                  
                  {/* Rating & Reviews */}
                  <div className="flex items-center gap-2 mb-3 text-sm">
                    <div className="flex text-yellow-400">
                      {'★'.repeat(Math.floor(book.rating))}
                      {'☆'.repeat(5 - Math.floor(book.rating))}
                    </div>
                    <span className="text-gray-400">({book.reviews.toLocaleString()})</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-green-400">₹{book.price}</span>
                      {book.originalPrice > book.price && (
                        <span className="text-gray-500 line-through ml-2">₹{book.originalPrice}</span>
                      )}
                    </div>
                    {book.originalPrice > book.price && (
                      <div className="bg-green-600 text-white px-2 py-1 rounded text-xs">
                        Save ₹{(book.originalPrice - book.price)}
                      </div>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => addToCart(book)}
                    className="w-full bg-gradient-to-r from-amber-600 to-amber-500 text-white py-2 rounded-lg font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2"
                  >
                    🛒 Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid md:grid-cols-4 gap-6 text-center">
            <div className="dharma-card p-6 rounded-lg">
              <div className="text-3xl mb-2">🚚</div>
              <h3 className="font-semibold mb-1">Free Shipping</h3>
              <p className="text-sm text-gray-400">On orders over ₹1500</p>
            </div>
            <div className="dharma-card p-6 rounded-lg">
              <div className="text-3xl mb-2">🔒</div>
              <h3 className="font-semibold mb-1">Secure Payment</h3>
              <p className="text-sm text-gray-400">SSL encrypted checkout</p>
            </div>
            <div className="dharma-card p-6 rounded-lg">
              <div className="text-3xl mb-2">↩️</div>
              <h3 className="font-semibold mb-1">Easy Returns</h3>
              <p className="text-sm text-gray-400">30-day return policy</p>
            </div>
            <div className="dharma-card p-6 rounded-lg">
              <div className="text-3xl mb-2">📞</div>
              <h3 className="font-semibold mb-1">24/7 Support</h3>
              <p className="text-sm text-gray-400">Customer service</p>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="mt-16 dharma-card p-8 rounded-xl text-center">
            <h2 className="text-2xl font-bold sacred-text mb-4">📧 Stay Connected</h2>
            <p className="text-amber-200 mb-6">Get exclusive deals and spiritual insights delivered to your inbox</p>
            <div className="flex max-w-md mx-auto gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-amber-900/50 border border-amber-700 rounded-lg text-white"
              />
              <button className="px-6 py-2 bg-gradient-to-r from-amber-600 to-amber-500 rounded-lg font-semibold hover:scale-105 transition-transform">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Cart isOpen={showCart} onClose={() => setShowCart(false)} />
    </div>
  );
};

export default ShopPage;