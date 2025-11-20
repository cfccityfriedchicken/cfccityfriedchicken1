import React, { useState, useEffect, useMemo } from 'react';
import { Order } from '../types';
import { CloseIcon, CheckCircleIcon, ChefIcon, DeliveryIcon, HomeIcon, RestaurantIcon, DeliveryBikeIcon, LocationPinIcon, BackIcon } from './IconComponents';
import { RESTAURANT_LOCATION } from '../utils/deliveryTime';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  onUpdateStatus: (orderId: string, newStatus: string) => void;
}

const STATUS_STAGES: string[] = ['Order Placed', 'Preparing', 'Out for Delivery', 'Delivered'];

// Helper to safely get the numeric value of delivery time, handling legacy object format
const getNumericDeliveryTime = (time: any): number => {
    if (typeof time === 'object' && time !== null && typeof time.maxTime === 'number') {
        return time.maxTime;
    }
    if (typeof time === 'number') {
        return time;
    }
    return 30;
};

const MapView: React.FC<{ order: Order }> = ({ order }) => {
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
        <div className="relative w-full h-40 bg-green-50 rounded-lg overflow-hidden my-4 p-4 flex flex-col justify-between border border-green-100 shadow-inner" role="img" aria-label="Map showing delivery route from restaurant to your location.">
            <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2 z-10">
                    <RestaurantIcon className="w-5 h-5 text-red-600" />
                    <div className="bg-white/80 backdrop-blur-sm px-2 py-1 rounded shadow-sm">
                        <p className="text-xs font-bold text-gray-900">Restaurant</p>
                        <p className="text-[10px] text-gray-500">CFC Main Branch</p>
                    </div>
                </div>
            </div>
            <div className="relative w-full h-1/2">
                <div className="absolute top-1/2 left-[10%] w-[80%] border-t-2 border-dashed border-gray-400 -translate-y-1/2"></div>
                {(order.status === 'Out for Delivery' || order.status === 'Delivered') && (
                    <div
                        className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-linear"
                        style={driverPosition}
                        aria-label="Delivery driver position"
                    >
                        <div className="bg-white p-1.5 rounded-full shadow-md border border-gray-100">
                             <DeliveryBikeIcon className="w-6 h-6 text-red-600" />
                        </div>
                    </div>
                )}
            </div>
            <div className="flex justify-between items-end">
                 <div className="flex items-center space-x-2 z-10 ml-auto">
                    <div className="bg-white/80 backdrop-blur-sm px-2 py-1 rounded shadow-sm text-right">
                         <p className="text-xs font-bold text-gray-900">Your Location</p>
                    </div>
                    <HomeIcon className="w-5 h-5 text-blue-600" />
                </div>
            </div>
        </div>
    );
};


const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({ isOpen, onClose, order, onUpdateStatus }) => {
  const [currentOrder, setCurrentOrder] = useState<Order | null>(order);

  useEffect(() => {
    setCurrentOrder(order);
  }, [order]);

  const currentStatusIndex = useMemo(() => {
    if (!currentOrder) return -1;
    return STATUS_STAGES.indexOf(currentOrder.status);
  }, [currentOrder]);
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            onClose();
        }
    };
    if (isOpen) {
        document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
        document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Automatic status progression simulation (Demo purposes)
  useEffect(() => {
    if (!isOpen || !currentOrder || currentOrder.status === 'Delivered') {
      return;
    }

    const advanceStatus = () => {
      const nextIndex = STATUS_STAGES.indexOf(currentOrder.status) + 1;
      if (nextIndex < STATUS_STAGES.length) {
        onUpdateStatus(currentOrder.id, STATUS_STAGES[nextIndex]);
      }
    };

    // Simulate progression: Placed -> (5s) -> Preparing -> (15s) -> Out -> (20s) -> Delivered
    const delay = currentOrder.status === 'Order Placed' ? 5000 : (currentOrder.status === 'Preparing' ? 15000 : 20000);
    const timer = setTimeout(advanceStatus, delay);

    return () => clearTimeout(timer);
  }, [isOpen, currentOrder, onUpdateStatus]);

  // Real-time polling for status updates from localStorage
  useEffect(() => {
      if (!isOpen || !currentOrder || currentOrder.status === 'Delivered') {
          return;
      }

      const interval = setInterval(() => {
          try {
              const storedOrdersRaw = localStorage.getItem('cfc-order-history');
              if (storedOrdersRaw) {
                  const storedOrders: Order[] = JSON.parse(storedOrdersRaw);
                  const updatedOrder = storedOrders.find(o => o.id === currentOrder.id);
                  if (updatedOrder && updatedOrder.status !== currentOrder.status) {
                      setCurrentOrder(updatedOrder);
                  }
              }
          } catch (error) {
              console.error("Error polling for order status:", error);
          }
      }, 2000); // Poll every 2 seconds

      return () => clearInterval(interval);
  }, [isOpen, currentOrder]);

  if (!isOpen || !currentOrder) return null;

  const estimatedTimeInMinutes = getNumericDeliveryTime(currentOrder.estimatedDeliveryTime);

  const getStatusInfo = (stage: string, index: number) => {
    const isActive = index <= currentStatusIndex;
    const icon = {
        'Order Placed': <CheckCircleIcon className="w-5 h-5" />,
        'Preparing': <ChefIcon className="w-5 h-5" />,
        'Out for Delivery': <DeliveryIcon className="w-5 h-5" />,
        'Delivered': <HomeIcon className="w-5 h-5" />,
    }[stage];

    return {
        isActive,
        icon,
        label: stage,
        wrapperClass: isActive ? 'text-red-600' : 'text-gray-400',
        iconBgClass: isActive ? 'bg-red-600' : 'bg-gray-200',
    };
  }
  
  const deliveryLocation = currentOrder.deliveryDetails?.address 
    ? currentOrder.deliveryDetails.address
    : currentOrder.deliveryDetails?.location
      ? `GPS: Captured`
      : 'Not specified';

  return (
    <div className="fixed inset-0 bg-black/70 z-[80] flex justify-center items-center p-4 backdrop-blur-sm">
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg transform transition-all duration-300 ease-out scale-95 animate-scale-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tracking-title"
      >
        <div className="p-6 relative">
          <button onClick={onClose} aria-label="Go back" className="absolute top-4 left-4 text-gray-400 hover:text-gray-800 transition-colors">
            <BackIcon />
          </button>
          <button onClick={onClose} aria-label="Close order tracking" className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors">
            <CloseIcon />
          </button>
          <div className="text-center pt-2">
            <h2 id="tracking-title" className="text-2xl font-bold text-gray-900">Track Your Order</h2>
            <p className="text-xs text-gray-500 font-mono mt-1">{currentOrder.id}</p>
          </div>

          <MapView order={currentOrder} />

          <div className="mt-8 mb-6 px-2" role="img" aria-label={`Order progress: step ${currentStatusIndex + 1} of ${STATUS_STAGES.length}. Current status: ${currentOrder.status}.`}>
            <div className="flex justify-between items-start relative">
              {/* Connecting Line Background */}
              <div className="absolute top-5 left-0 w-full h-1 bg-gray-200 -z-10 rounded-full"></div>
              {/* Active Line */}
              <div 
                className="absolute top-5 left-0 h-1 bg-red-600 -z-10 rounded-full transition-all duration-1000"
                style={{ width: `${(currentStatusIndex / (STATUS_STAGES.length - 1)) * 100}%` }}
              ></div>

              {STATUS_STAGES.map((stage, index) => {
                const { isActive, icon, label, wrapperClass, iconBgClass } = getStatusInfo(stage, index);
                return (
                  <div key={stage} className={`flex flex-col items-center text-center relative group w-1/4`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${iconBgClass} z-10 border-4 border-white shadow-sm transition-colors duration-500`}>
                      {icon}
                    </div>
                    <p className={`text-[10px] sm:text-xs font-bold mt-2 transition-colors duration-300 ${wrapperClass}`}>{label}</p>
                  </div>
                );
              })}
            </div>
          </div>
          
           <div className="my-4 p-4 border border-gray-100 rounded-xl bg-gray-50 text-sm flex items-start gap-3">
                <div className="bg-white p-2 rounded-full text-red-500 shadow-sm">
                     <LocationPinIcon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-xs uppercase tracking-wider">Delivering To</p>
                  <p className="text-gray-700 font-medium">{deliveryLocation}</p>
                </div>
            </div>

          <div className="text-center bg-red-50 p-5 rounded-xl border border-red-100" role="status">
             <p className="font-bold text-lg text-red-800 animate-pulse">
                {
                    {
                        'Order Placed': 'We have received your order!',
                        'Preparing': 'Chefs are preparing your food! 👨‍🍳',
                        'Out for Delivery': 'Rider is on the way! 🏍️',
                        'Delivered': 'Enjoy your meal! 😋'
                    }[currentOrder.status] || currentOrder.status
                }
             </p>
             <div className="inline-flex items-center gap-2 mt-2 bg-white px-3 py-1 rounded-full border border-red-200 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <p className="text-xs text-gray-600 font-medium">
                    Est. Arrival: {new Date(new Date(currentOrder.date).getTime() + estimatedTimeInMinutes * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
             </div>
          </div>

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

export default OrderTrackingModal;
