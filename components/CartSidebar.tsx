
import React, { useState } from 'react';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { CartItem } from '../types';
import CheckoutModal from './CheckoutModal';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 0 ? 150 : 0;
  const total = subtotal + deliveryFee;

  const handleOrderSuccess = () => {
    onClearCart();
    setIsCheckoutOpen(false);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[55] transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[56] transform transition-transform duration-300 shadow-2xl ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          
          {/* Header */}
          <div className="p-6 border-b flex justify-between items-center bg-gray-50">
            <h2 className="text-xl font-bold flex items-center gap-2 text-gray-900">
              <ShoppingBag className="text-red-600" /> Your Order
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition text-gray-500">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cartItems.length === 0 ? (
              <div className="text-center text-gray-500 mt-20">
                <ShoppingBag className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p>Your cart is empty.</p>
                <p className="text-sm">Add some delicious chicken!</p>
              </div>
            ) : (
              cartItems.map(item => (
                <div key={item.cartId} className="flex gap-4 items-start bg-white">
                  <img src={item.imageUrl} alt={item.name} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-gray-800 truncate">{item.name}</h4>
                     {item.variations && item.variations.length > 0 && (
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{item.variations.join(', ')}</p>
                     )}
                     {item.specialInstructions && (
                         <p className="text-[10px] text-gray-400 italic mt-0.5">"{item.specialInstructions}"</p>
                     )}
                    <p className="text-red-600 font-semibold text-sm mt-1">Rs. {(item.price * item.quantity).toFixed(0)}</p>
                    
                    <div className="flex items-center gap-3 mt-2">
                      <button 
                        onClick={() => onUpdateQuantity(item.cartId, -1)}
                        className="p-1 bg-gray-100 rounded hover:bg-gray-200 transition"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.cartId, 1)}
                        className="p-1 bg-gray-100 rounded hover:bg-gray-200 transition"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <button 
                    onClick={() => onRemoveItem(item.cartId)}
                    className="text-gray-400 hover:text-red-500 transition p-2"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t bg-gray-50 space-y-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>Rs. {subtotal.toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Delivery Fee</span>
                <span>Rs. {deliveryFee}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-200">
                <span>Total</span>
                <span>Rs. {total.toFixed(0)}</span>
              </div>
              
              <button 
                className="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg shadow hover:bg-red-700 transition active:scale-[0.98]"
                onClick={() => setIsCheckoutOpen(true)}
              >
                Checkout Now
              </button>
            </div>
          )}
        </div>
      </div>

      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderSuccess={handleOrderSuccess}
        cartItems={cartItems}
        totalPrice={total}
      />
    </>
  );
};
