export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: 'Burgers & Sandwiches' | 'Pizza' | 'Royal Premium Flavors Pizza' | 'Kabab Stuffer' | 'Pasta' | 'Starters, Fried & Rolls' | 'Ice Cream' | 'Deals';
  imageUrl: string;
  isSpicy?: boolean;
}

export interface CartItem extends MenuItem {
  cartId: string; // Unique ID for the item in the cart (to handle variations)
  quantity: number;
  variations?: string[];
  specialInstructions?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  totalPrice: number;
  estimatedDeliveryTime: number;
  status: string;
  deliveryDetails: {
    customerName: string;
    mobileNumber: string;
    location: { lat: number; lng: number } | null;
    address?: string;
    transactionId: string;
    paymentScreenshot: string | null;
  };
}

export interface Category {
  name: string;
}