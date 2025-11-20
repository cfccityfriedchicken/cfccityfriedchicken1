import React from 'react';
import { 
  X, MapPin, Phone, ArrowLeft, CheckCircle, ChefHat, Truck, 
  Home, Store, Bike, Plus, Minus, Trash2, History, Search, 
  Sandwich, Pizza, Drumstick, Utensils, Salad, CakeSlice, 
  IceCream, Tag, UtensilsCrossed, ShoppingCart 
} from 'lucide-react';

export const CloseIcon = (props: any) => <X {...props} />;
export const LocationPinIcon = (props: any) => <MapPin {...props} />;
export const PhoneIcon = (props: any) => <Phone {...props} />;
export const BackIcon = (props: any) => <ArrowLeft {...props} />;
export const PlusIcon = (props: any) => <Plus {...props} />;
export const MinusIcon = (props: any) => <Minus {...props} />;
export const TrashIcon = (props: any) => <Trash2 {...props} />;
export const HistoryIcon = (props: any) => <History {...props} />;
export const SearchIcon = (props: any) => <Search {...props} />;

// Menu Category Icons
export const BurgerIcon = (props: any) => <Sandwich {...props} />;
export const PizzaIcon = (props: any) => <Pizza {...props} />;
export const ChickenIcon = (props: any) => <Drumstick {...props} />;
export const FriesIcon = (props: any) => <Utensils {...props} />;
export const SaladIcon = (props: any) => <Salad {...props} />;
export const DessertIcon = (props: any) => <CakeSlice {...props} />;
export const IceCreamIcon = (props: any) => <IceCream {...props} />;
export const TagIcon = (props: any) => <Tag {...props} />;
export const PastaIcon = (props: any) => <UtensilsCrossed {...props} />;
export const CartIcon = (props: any) => <ShoppingCart {...props} />;

// Tracking Icons
export const CheckCircleIcon = (props: any) => <CheckCircle {...props} />;
export const ChefIcon = (props: any) => <ChefHat {...props} />;
export const DeliveryIcon = (props: any) => <Truck {...props} />;
export const HomeIcon = (props: any) => <Home {...props} />;
export const RestaurantIcon = (props: any) => <Store {...props} />;
export const DeliveryBikeIcon = (props: any) => <Bike {...props} />;

export const WhatsAppIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.1 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2m.01 16.61c-1.48 0-2.94-.4-4.21-1.15l-.3-.18-3.11.82.83-3.04-.19-.31a8.173 8.173 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.183 8.183 0 012.41 5.83c.02 4.54-3.68 8.23-8.23 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.52 1.02 2.69.13.17 1.77 2.71 4.28 3.79 1.55.66 1.86.53 2.52.49.66-.03 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.07-.11-.24-.18-.49-.3z" />
  </svg>
);