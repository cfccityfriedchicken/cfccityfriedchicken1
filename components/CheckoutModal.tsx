
import React, { useState, useEffect, useRef } from 'react';
import { useGeolocation } from '../hooks/useGeolocation';
import { CartItem, Order } from '../types';
import { CloseIcon, LocationPinIcon, PhoneIcon, BackIcon } from './IconComponents';
import { calculateDeliveryTime } from '../utils/deliveryTime';
import { Clock } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: () => void;
  cartItems: CartItem[];
  totalPrice: number;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onOrderSuccess,
  cartItems,
  totalPrice
}) => {
  const successTitleRef = useRef<HTMLHeadingElement>(null);
  const [customerName, setCustomerName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [manualAddress, setManualAddress] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isConfirmingOrder, setIsConfirmingOrder] = useState(false); 
  const { data: locationData, loading: locationLoading, error: locationError, getLocation } = useGeolocation();
  const [deliveryTime, setDeliveryTime] = useState<{minTime: number, maxTime: number} | null>(null);

  useEffect(() => {
    if (isOpen) {
        setIsSubmitted(false);
        setIsConfirmingOrder(false);
        setCustomerName('');
        setMobileNumber('');
        setManualAddress('');
        setTransactionId('');
        setPaymentScreenshot(null);
        // Do not auto-fetch location, wait for user interaction
    }
  }, [isOpen]);

  useEffect(() => {
    if (isSubmitted) {
      successTitleRef.current?.focus();
    }
  }, [isSubmitted]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            if (isConfirmingOrder) {
                setIsConfirmingOrder(false);
            } else {
                onClose();
            }
        }
    };
    if (isOpen) {
        document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
        document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, isConfirmingOrder]);

  useEffect(() => {
    if (cartItems.length > 0) {
        // Dynamic calculation based on cart size
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        
        // Base time: 25 minutes (preparation + travel)
        // Add 3 minutes per item to account for prep complexity
        const estimatedMin = 25 + (totalItems * 3);
        
        // Max time buffer (15 mins window)
        const estimatedMax = estimatedMin + 15;
        
        setDeliveryTime({ minTime: estimatedMin, maxTime: estimatedMax });
    }
  }, [cartItems]);


  if (!isOpen) return null;

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setMobileNumber(value);
  };

  const isFormValid =
    customerName.trim().length >= 3 &&
    mobileNumber.length >= 11 &&
    (locationData !== null || manualAddress.trim().length >= 10) &&
    transactionId.trim().length >= 5 &&
    paymentScreenshot !== null;

  const handlePlaceOrder = () => {
    if (isFormValid && deliveryTime) {
      const newOrder: Order = {
        id: `CFC-${Date.now()}`,
        date: new Date().toISOString(),
        items: cartItems,
        totalPrice: totalPrice,
        estimatedDeliveryTime: deliveryTime.maxTime,
        status: 'Order Placed',
        deliveryDetails: {
          customerName,
          mobileNumber,
          location: locationData,
          address: manualAddress.trim() || undefined,
          transactionId,
          paymentScreenshot: paymentScreenshot?.name || null
        }
      };

      try {
        const existingOrdersRaw = localStorage.getItem('cfc-order-history');
        const existingOrders: Order[] = existingOrdersRaw ? JSON.parse(existingOrdersRaw) : [];
        const updatedOrders = [newOrder, ...existingOrders];
        localStorage.setItem('cfc-order-history', JSON.stringify(updatedOrders));
      } catch (error) {
        console.error("Failed to save order history:", error);
      }
      
      setIsConfirmingOrder(false);
      setIsSubmitted(true);

      setTimeout(() => {
        onOrderSuccess();
      }, 4000);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      setIsConfirmingOrder(true);
    }
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-[60] flex justify-center items-center p-4">
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 ease-out scale-95 animate-scale-in overflow-y-auto max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
      >
        <div className="p-6 relative">
          <button onClick={onClose} aria-label="Go back" className="absolute top-4 left-4 text-gray-400 hover:text-gray-800 transition-colors">
            <BackIcon />
          </button>
          <button onClick={onClose} aria-label="Close checkout" className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors">
            <CloseIcon />
          </button>

          {isSubmitted ? (
            <div className="text-center py-12 flex flex-col items-center">
              <svg className="w-24 h-24 text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <h2 id="checkout-title" ref={successTitleRef} tabIndex={-1} className="text-3xl font-bold text-gray-900 mb-2 outline-none">Thank You!</h2>
              <p className="text-gray-600">Your order has been placed successfully.</p>
               {deliveryTime && (
                <p className="text-gray-600 mt-2 bg-gray-50 inline-block px-3 py-1 rounded-full text-sm">
                    Estimated arrival: <strong>{new Date(Date.now() + deliveryTime.maxTime * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong>
                </p>
              )}
              <p className="font-semibold text-red-600 mt-4 text-lg">
                Total: PKR {totalPrice.toFixed(2)}
              </p>
            </div>
          ) : (
            <>
              <h2 id="checkout-title" className="text-2xl font-bold text-gray-900 mb-4 text-center mt-8">Confirm Your Details</h2>

              <div className="bg-red-50 rounded-xl p-4 mb-6 border border-red-100">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-red-600" />
                    <p className="text-sm font-bold text-red-800 uppercase tracking-wide">Estimated Delivery Time</p>
                </div>
                <div className="text-center">
                    <p className="text-3xl font-black text-gray-900 leading-none">
                        {deliveryTime ? `${deliveryTime.minTime}-${deliveryTime.maxTime}` : '--'}
                        <span className="text-lg font-bold text-gray-500 ml-1">mins</span>
                    </p>
                    {deliveryTime && (
                         <p className="text-xs text-gray-600 mt-2 font-medium bg-white inline-block px-3 py-1 rounded-full shadow-sm border border-red-100">
                            Arriving around <span className="text-red-600 font-bold">{new Date(Date.now() + deliveryTime.maxTime * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </p>
                    )}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-4 max-h-40 overflow-y-auto border border-gray-100">
                {cartItems.map((item, index) => {
                    const itemName = (typeof item.name === 'string' || typeof item.name === 'number') ? item.name : 'Unknown Item';
                    const itemPrice = typeof item.price === 'number' ? item.price : 0;
                    const itemQuantity = typeof item.quantity === 'number' ? item.quantity : 1;
                    const itemImageUrl = typeof item.imageUrl === 'string' && item.imageUrl ? item.imageUrl : 'https://via.placeholder.com/80x80';

                    return (
                        <div key={`${item.id}-${index}`} className="text-sm mb-2 flex items-start">
                           <img src={itemImageUrl} alt={itemName} className="w-12 h-12 rounded-md object-cover mr-3 flex-shrink-0" />
                           <div className="flex-grow flex justify-between">
                                <div>
                                    <span className="text-gray-800 font-semibold block">{itemName} x{itemQuantity}</span>
                                    {Array.isArray(item.variations) && item.variations.length > 0 && (
                                        <p className="text-xs text-gray-500">{item.variations.join(', ')}</p>
                                    )}
                                    {typeof item.specialInstructions === 'string' && item.specialInstructions && (
                                        <p className="text-xs text-gray-500 italic">"{item.specialInstructions}"</p>
                                    )}
                                </div>
                                <span className="text-gray-800 font-medium whitespace-nowrap pl-2">
                                    PKR {(itemPrice * itemQuantity).toFixed(0)}
                                </span>
                           </div>
                        </div>
                    );
                })}
                <div className="flex justify-between items-center font-bold text-md border-t pt-2 mt-2">
                  <span>Total</span>
                  <span>PKR {totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <label htmlFor="customer-name" className="sr-only">Your Name</label>
                <input
                    id="customer-name"
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-md focus:ring-red-600 focus:border-red-600"
                    required
                />
                <div className="relative">
                    <label htmlFor="mobile-number" className="sr-only">Mobile Number</label>
                    <PhoneIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" aria-hidden="true" />
                    <input
                      id="mobile-number"
                      type="tel"
                      value={mobileNumber}
                      onChange={handleMobileChange}
                      placeholder="Mobile Number (e.g. 03001234567)"
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border-transparent rounded-md"
                      required
                      minLength={11}
                    />
                </div>
                
                <label htmlFor="manual-address" className="sr-only">Enter Delivery Address Manually</label>
                <textarea
                    id="manual-address"
                    value={manualAddress}
                    onChange={(e) => setManualAddress(e.target.value)}
                    placeholder="Enter Delivery Address Manually"
                    className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-md focus:ring-red-600 focus:border-red-600"
                    rows={2}
                />
                
                <label htmlFor="transaction-id" className="sr-only">Transaction ID (TID)</label>
                <input
                    id="transaction-id"
                    type="text"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    placeholder="Transaction ID (TID)"
                    className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-md focus:ring-red-600 focus:border-red-600"
                    required
                />
                <div>
                  <label htmlFor="payment-screenshot" className="block text-sm text-center font-medium text-gray-700 mb-2">Upload Payment Screenshot</label>
                  <input
                    id="payment-screenshot"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPaymentScreenshot(e.target.files?.[0] || null)}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-600 hover:file:bg-red-100"
                    required
                  />
                  {paymentScreenshot && (
                    <p className="text-green-600 text-xs mt-2 text-center">
                      Selected: {paymentScreenshot.name}
                    </p>
                  )}
                </div>

                {/* Location Capture Section - Moved to Bottom */}
                <div className="relative text-center my-4" aria-hidden="true">
                    <span className="text-xs text-gray-400 bg-white px-2 z-10 relative">OR Using GPS</span>
                    <div className="absolute left-0 top-1/2 w-full h-px bg-gray-200"></div>
                </div>

                <button
                    type="button"
                    onClick={getLocation}
                    disabled={locationLoading}
                    className="w-full flex items-center justify-center px-4 py-3 text-white bg-red-600 rounded-md hover:bg-red-700 transition font-bold shadow-sm"
                >
                    <LocationPinIcon className="mr-2 h-5 w-5 text-white" />
                    {locationLoading ? 'Fetching...' : (locationData ? 'Location Captured!' : 'Use My Current Location')}
                </button>
                {locationError && !locationData && (
                    <p className="text-red-500 text-xs text-center mt-1" role="alert">
                        Could not get location. Please enter address manually.
                    </p>
                )}

                <button
                  type="submit"
                  disabled={!isFormValid}
                  className="w-full bg-red-600 text-white font-bold py-3 px-4 rounded-lg disabled:bg-gray-300 transition-colors hover:bg-red-700 shadow-md mt-4"
                >
                  Place Order
                </button>
              </form>
            </>
          )}

          {isConfirmingOrder && (
              <div 
                className="absolute inset-0 bg-white bg-opacity-95 flex flex-col justify-center items-center p-8 rounded-2xl z-10"
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="confirm-title"
              >
                  <h3 id="confirm-title" className="text-xl font-bold text-gray-900 text-center mb-6">Are you sure you want to place this order?</h3>
                  <div className="flex space-x-4">
                      <button
                          onClick={() => setIsConfirmingOrder(false)}
                          className="px-6 py-2 rounded-lg bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition-colors"
                      >
                          No, Go Back
                      </button>
                      <button
                          onClick={handlePlaceOrder}
                          className="px-6 py-2 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 transition-colors"
                      >
                          Yes, Place Order
                      </button>
                  </div>
              </div>
          )}

        </div>
      </div>
      <style>{`
        @keyframes scale-in {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CheckoutModal;
