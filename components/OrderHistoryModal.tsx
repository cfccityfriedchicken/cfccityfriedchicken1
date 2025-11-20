
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Order } from '../types';
import { CloseIcon, BackIcon, LocationPinIcon, RestaurantIcon, HomeIcon, DeliveryBikeIcon, CheckCircleIcon, ChefIcon, DeliveryIcon } from './IconComponents';
import { RESTAURANT_LOCATION } from '../utils/deliveryTime';

interface OrderHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STATUS_STAGES = ['Order Placed', 'Preparing', 'Out for Delivery', 'Delivered'];

const MapView = ({ order }: { order: Order }) => {
    const [driverPosition, setDriverPosition] = useState({ top: '50%', left: '10%' });

    useEffect(() => {
        if (order.status !== 'Out for Delivery') {
            const newPos = order.status === 'Delivered' ? { top: '50%', left: '90%' } : { top: '50%', left: '10%' };
            setDriverPosition(newPos);
            return;
        }

        const animationDuration = 20000; 
        const startTime = Date.now();
        
        const interval = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            const progress = Math.min(elapsedTime / animationDuration, 1);
            
            const left = 10 + progress * 80;
            setDriverPosition({ top: '50%', left: `${left}%` });

            if (progress >= 1) {
                clearInterval(interval);
            }
        }, 100); 

        return () => clearInterval(interval);

    }, [order.status]);

    return (
        <div className="relative w-full h-48 bg-green-50 rounded-xl overflow-hidden mb-6 border border-green-100 shadow-inner relative group">
            {/* Map Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:16px_16px]"></div>

            <div className="absolute top-4 left-4 z-10">
                <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-2 border border-gray-100">
                    <RestaurantIcon className="w-4 h-4 text-red-600" />
                    <div>
                        <p className="text-[10px] font-bold text-gray-900 uppercase tracking-wider">From</p>
                        <p className="text-xs text-gray-600 font-medium">CFC Main Branch</p>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-4 right-4 z-10">
                 <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-2 border border-gray-100 text-right">
                    <div>
                         <p className="text-[10px] font-bold text-gray-900 uppercase tracking-wider">To</p>
                         <p className="text-xs text-gray-600 font-medium">Your Location</p>
                    </div>
                    <HomeIcon className="w-4 h-4 text-blue-600" />
                </div>
            </div>

            {/* Route Line */}
            <div className="absolute top-1/2 left-[10%] w-[80%] h-0.5 bg-gray-300 border-t border-dashed border-gray-400 -translate-y-1/2"></div>

            {/* Driver/Package Icon */}
            {(order.status === 'Out for Delivery' || order.status === 'Delivered' || order.status === 'Preparing' || order.status === 'Order Placed') && (
                 <div
                    className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-linear z-20"
                    style={driverPosition}
                >
                    <div className="relative">
                        <div className="bg-white p-2 rounded-full shadow-lg border border-gray-100 relative z-10">
                             {order.status === 'Out for Delivery' ? (
                                 <DeliveryBikeIcon className="w-6 h-6 text-red-600 animate-bounce-slight" />
                             ) : order.status === 'Delivered' ? (
                                 <CheckCircleIcon className="w-6 h-6 text-green-600" />
                             ) : (
                                 <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                             )}
                        </div>
                        {order.status === 'Out for Delivery' && (
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-red-400/30 rounded-full animate-ping"></div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

const OrderHistoryModal: React.FC<OrderHistoryModalProps> = ({ isOpen, onClose }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const loadOrders = useCallback(() => {
     try {
        const storedOrders = localStorage.getItem('cfc-order-history');
        if (storedOrders) {
          const parsedOrders = JSON.parse(storedOrders);
          setOrders(parsedOrders);
          
          // Update selected order if it exists
          if (selectedOrder) {
              const updatedSelected = parsedOrders.find((o: Order) => o.id === selectedOrder.id);
              if (updatedSelected) setSelectedOrder(updatedSelected);
          }
        }
      } catch (error) {
        console.error("Failed to load order history:", error);
        setOrders([]);
      }
  }, [selectedOrder]);

  useEffect(() => {
    if (isOpen) {
      loadOrders();
      const interval = setInterval(loadOrders, 3000); // Refresh every 3s
      return () => clearInterval(interval);
    }
  }, [isOpen, loadOrders]);

  // Simulate Order Status Progression
  useEffect(() => {
      if (!isOpen || !selectedOrder || selectedOrder.status === 'Delivered') return;

      const timer = setTimeout(() => {
          const currentStageIndex = STATUS_STAGES.indexOf(selectedOrder.status);
          if (currentStageIndex !== -1 && currentStageIndex < STATUS_STAGES.length - 1) {
              const nextStatus = STATUS_STAGES[currentStageIndex + 1];
              
              // Update Local Storage
              const storedOrdersRaw = localStorage.getItem('cfc-order-history');
              if (storedOrdersRaw) {
                  const allOrders = JSON.parse(storedOrdersRaw);
                  const updatedOrders = allOrders.map((o: Order) => 
                      o.id === selectedOrder.id ? { ...o, status: nextStatus } : o
                  );
                  localStorage.setItem('cfc-order-history', JSON.stringify(updatedOrders));
                  // Force reload will happen via interval, but we can also trigger it manually or wait
                  loadOrders(); 
              }
          }
      }, 8000); // Advance status every 8 seconds for demo

      return () => clearTimeout(timer);
  }, [selectedOrder, isOpen, loadOrders]);


  if (!isOpen) return null;

  const getStatusInfo = (stage: string, currentStatus: string) => {
    const stages = STATUS_STAGES;
    const currentIndex = stages.indexOf(currentStatus);
    const stageIndex = stages.indexOf(stage);
    const isActive = stageIndex <= currentIndex;

    const icon = {
        'Order Placed': <CheckCircleIcon className="w-5 h-5" />,
        'Preparing': <ChefIcon className="w-5 h-5" />,
        'Out for Delivery': <DeliveryIcon className="w-5 h-5" />,
        'Delivered': <HomeIcon className="w-5 h-5" />,
    }[stage];

    return {
        isActive,
        icon,
        wrapperClass: isActive ? 'text-red-600' : 'text-gray-300',
        bgClass: isActive ? 'bg-red-600' : 'bg-gray-200',
    };
  };

  const renderTrackingView = () => {
      if (!selectedOrder) return null;

      const currentStatusIndex = STATUS_STAGES.indexOf(selectedOrder.status);
      const progressPercent = (currentStatusIndex / (STATUS_STAGES.length - 1)) * 100;

      return (
        <div className="flex flex-col h-full animate-in slide-in-from-right duration-300">
             <div className="p-6 border-b border-gray-100 flex items-center gap-4 bg-gray-50/50">
                <button onClick={() => setSelectedOrder(null)} className="p-2 bg-white rounded-full hover:bg-gray-100 transition shadow-sm text-gray-600">
                    <BackIcon className="w-5 h-5" />
                </button>
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Track Order</h2>
                    <p className="text-xs text-gray-500 font-mono">{selectedOrder.id}</p>
                </div>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
                <MapView order={selectedOrder} />

                {/* Status Steps */}
                <div className="mb-8 relative px-4">
                    {/* Progress Bar Background */}
                    <div className="absolute top-5 left-4 right-4 h-1 bg-gray-100 rounded-full -z-10"></div>
                    {/* Progress Bar Foreground */}
                    <div 
                        className="absolute top-5 left-4 h-1 bg-red-600 rounded-full -z-10 transition-all duration-1000"
                        style={{ width: `calc(${progressPercent}% - 2rem)` }} // Approximate width adjustment
                    ></div>

                    <div className="flex justify-between">
                        {STATUS_STAGES.map((stage, index) => {
                            const { isActive, icon, bgClass, wrapperClass } = getStatusInfo(stage, selectedOrder.status);
                            return (
                                <div key={stage} className="flex flex-col items-center gap-2">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${bgClass} shadow-sm transition-colors duration-500 z-10 border-4 border-white`}>
                                        {icon}
                                    </div>
                                    <span className={`text-[10px] font-bold text-center max-w-[60px] leading-tight ${wrapperClass}`}>
                                        {stage}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 space-y-4">
                    <div>
                        <h3 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wider">Delivery Details</h3>
                        <div className="flex items-start gap-3 text-sm text-gray-600">
                            <LocationPinIcon className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                            <p>{selectedOrder.deliveryDetails?.address || "GPS Location Captured"}</p>
                        </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                         <h3 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wider">Order Items</h3>
                         <ul className="space-y-2">
                            {selectedOrder.items.map((item, idx) => (
                                <li key={idx} className="flex justify-between text-sm">
                                    <span className="text-gray-700">{item.quantity}x {item.name}</span>
                                    <span className="font-medium text-gray-900">PKR {item.price * item.quantity}</span>
                                </li>
                            ))}
                         </ul>
                         <div className="flex justify-between items-center pt-3 mt-3 border-t border-gray-200 font-bold">
                             <span>Total</span>
                             <span className="text-red-600 text-lg">PKR {selectedOrder.totalPrice}</span>
                         </div>
                    </div>
                </div>
            </div>
        </div>
      );
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-[70] flex justify-center items-center p-4 backdrop-blur-sm">
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg transform transition-all duration-300 ease-out scale-95 animate-scale-in h-[85vh] flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-history-title"
      >
        {selectedOrder ? (
            renderTrackingView()
        ) : (
            <>
                <div className="p-6 flex-shrink-0 relative border-b border-gray-100 bg-white z-10">
                    <button onClick={onClose} aria-label="Go back" className="absolute top-6 left-6 text-gray-400 hover:text-gray-800 transition-colors">
                        <BackIcon />
                    </button>
                    <button onClick={onClose} aria-label="Close order history" className="absolute top-6 right-6 text-gray-400 hover:text-gray-800 transition-colors">
                        <CloseIcon />
                    </button>
                    <h2 id="order-history-title" className="text-2xl font-bold text-gray-900 text-center">Your Orders</h2>
                </div>

                <div className="overflow-y-auto p-6 bg-gray-50/50 flex-1">
                    {orders.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-4xl">🧾</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">No orders yet</h3>
                            <p className="text-gray-500 mt-2 max-w-xs mx-auto">Looks like you haven't placed any orders yet. Delicious food is waiting!</p>
                        </div>
                    ) : (
                    <ul className="space-y-4">
                        {orders.map((order) => (
                        <li key={order.id} className="bg-white p-5 rounded-xl border border-gray-200 hover:border-red-300 hover:shadow-lg transition-all group cursor-pointer" onClick={() => order.status !== 'Delivered' && setSelectedOrder(order)}>
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-bold text-gray-900 text-sm">Order #{order.id.slice(-6)}</p>
                                        {order.status !== 'Delivered' && <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>}
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">{new Date(order.date).toLocaleString()}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-black text-lg text-red-600">PKR {order.totalPrice?.toFixed(0) || '0'}</p>
                                </div>
                            </div>

                            <div className="border-t border-dashed border-gray-100 pt-3 space-y-1 mb-4">
                                {Array.isArray(order.items) && order.items.slice(0, 2).map((item, index) => (
                                    <div key={`${order.id}-${index}`} className="text-sm flex items-center justify-between text-gray-600">
                                        <span>{item.quantity}x {item.name}</span>
                                    </div>
                                ))}
                                {order.items.length > 2 && <p className="text-xs text-gray-400 italic">+ {order.items.length - 2} more items</p>}
                            </div>
                            
                            <div className="flex justify-between items-center pt-2">
                                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                                    order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                                    order.status === 'Out for Delivery' ? 'bg-purple-100 text-purple-700' :
                                    'bg-yellow-100 text-yellow-700'
                                }`}>
                                    {order.status}
                                </span>
                                {order.status !== 'Delivered' && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedOrder(order);
                                    }}
                                    className="text-xs sm:text-sm font-bold text-white bg-red-600 px-4 py-2 rounded-full hover:bg-red-700 transition shadow-sm flex items-center gap-2 group-hover:scale-105"
                                >
                                    Track Order <DeliveryBikeIcon className="w-3.5 h-3.5" />
                                </button>
                                )}
                            </div>
                        </li>
                        ))}
                    </ul>
                    )}
                </div>
            </>
        )}
      </div>
      <style>{`
        @keyframes scale-in { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-scale-in { animation: scale-in 0.2s ease-out forwards; }
        .animate-bounce-slight { animation: bounce-slight 2s infinite; }
        @keyframes bounce-slight { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
      `}</style>
    </div>
  );
};

export default OrderHistoryModal;
