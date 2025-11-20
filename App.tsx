
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { MenuItem, Category, CartItem, Order } from './types';
import { fetchMenuData } from './services/gemini';
import Spinner from './components/Spinner';
import CheckoutModal from './components/CheckoutModal';
import OrderHistoryModal from './components/OrderHistoryModal';
import ItemCustomizationModal from './components/ItemCustomizationModal';
import FaqSection from './components/FaqSection';
import { Footer } from './components/Footer';
import { About } from './components/About';
import { Blog } from './components/Blog'; // Import Blog
import WhatsAppButton from './components/WhatsAppButton';
import { PlusIcon, MinusIcon, TrashIcon, HistoryIcon, SearchIcon, BurgerIcon, PizzaIcon, ChickenIcon, SaladIcon, DessertIcon, LocationPinIcon, PhoneIcon, IceCreamIcon, TagIcon, ChefIcon, PastaIcon, BackIcon, CartIcon } from './components/IconComponents';
import { Flame } from 'lucide-react';

// SUB-COMPONENTS

const ProductSlider: React.FC<{
    items: MenuItem[];
    onOrderNow: (item: MenuItem) => void;
}> = ({ items, onOrderNow }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (items.length <= 1) return;
        const timer = setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
        }, 5000); 
        return () => clearTimeout(timer);
    }, [currentIndex, items.length]);

    if (items.length === 0) {
        return null;
    }

    return (
        <div className="bg-[#F7F7F7] py-6 border-b border-gray-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-xl shadow-sm bg-white">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {items.map((item) => (
                            <div key={item.id} className="w-full flex-shrink-0 p-6">
                                <div className="flex items-center justify-center sm:justify-between">
                                    <div className="flex items-center gap-6">
                                        <img src={item.imageUrl} alt={item.name} className="h-24 w-24 rounded-xl object-cover hidden sm:block shadow-md" />
                                        <div>
                                            <span className="bg-brand-secondary text-white text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider mb-1 inline-block">Featured</span>
                                            <h4 className="font-black text-brand-dark text-2xl">{item.name}</h4>
                                            <p className="text-lg text-brand-primary font-bold">PKR {item.price.toFixed(0)}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => onOrderNow(item)}
                                        className="bg-brand-primary text-white font-bold px-8 py-3 rounded-full text-sm hover:bg-red-700 transition-all shadow-lg transform hover:-translate-y-0.5 ml-4"
                                    >
                                        Order Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                     {/* Dots */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
                        {items.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full transition-colors ${currentIndex === index ? 'bg-brand-primary' : 'bg-gray-300'}`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const Header: React.FC<{
    onShowHistory: () => void;
    totalItems: number;
    totalPrice: number;
    sliderItems: MenuItem[];
    onOrderNow: (item: MenuItem) => void;
    onCartClick: () => void;
}> = ({ onShowHistory, totalItems, totalPrice, sliderItems, onOrderNow, onCartClick }) => {
    return (
        <header className="bg-white shadow-md sticky top-0 z-40">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between py-3">
                    {/* Branding Section */}
                    <div className="flex-shrink-0 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
                         <a href="#" aria-label="CFC City Fried Chicken Home">
                             {/* LOGO: Replace the src below with your actual uploaded logo URL */}
                             <img 
                                src="https://placehold.co/150x150/white/DC2626?text=CFC+Logo" 
                                alt="CFC City Fried Chicken" 
                                className="h-20 sm:h-24 w-auto object-contain" 
                             />
                        </a>
                    </div>

                    {/* Actions Section */}
                    <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                        <button 
                            onClick={onCartClick}
                            className="flex lg:hidden items-center justify-center bg-brand-primary text-white rounded-full font-bold shadow-sm hover:bg-red-700 transition-colors h-10 w-10 relative"
                        >
                            <CartIcon />
                             {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 bg-brand-secondary text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                                    {totalItems}
                                </span>
                            )}
                        </button>

                        {totalItems > 0 && (
                            <div className="hidden lg:flex items-center space-x-2 bg-brand-light px-4 py-2 rounded-full border border-red-100" aria-live="polite">
                                <span className="font-bold text-sm text-brand-dark">{totalItems} items</span>
                                <span className="text-gray-300">|</span>
                                <span className="font-bold text-sm text-brand-primary">PKR {totalPrice.toFixed(0)}</span>
                            </div>
                        )}
                        
                        <a 
                            href="tel:+923000421400" 
                            aria-label="Call us"
                            className="flex items-center justify-center bg-gray-100 text-gray-700 rounded-full font-bold hover:bg-gray-200 transition-colors h-10 w-10 sm:w-auto sm:px-4"
                        >
                            <PhoneIcon className="h-5 w-5" aria-hidden="true" />
                            <span className="hidden sm:inline ml-2 text-sm">Call</span>
                        </a>
                        <button 
                            onClick={onShowHistory} 
                            aria-label="View my orders"
                            className="flex items-center justify-center bg-gray-100 text-gray-700 rounded-full font-bold hover:bg-gray-200 transition-colors h-10 w-10 sm:w-auto sm:px-4"
                        >
                            <HistoryIcon className="h-5 w-5" aria-hidden="true" />
                            <span className="hidden sm:inline ml-2 text-sm">Orders</span>
                        </button>
                         <button 
                            onClick={onCartClick} 
                            aria-label="View cart"
                            className="hidden lg:flex items-center justify-center bg-brand-primary text-white rounded-full font-bold shadow-lg hover:bg-red-700 transition-transform transform active:scale-95 h-10 w-10 sm:w-auto sm:px-6"
                        >
                            <CartIcon />
                            <span className="hidden sm:inline ml-2 text-sm">Cart</span>
                        </button>
                    </div>
                </div>
            </div>
            <ProductSlider items={sliderItems} onOrderNow={onOrderNow} />
        </header>
    );
};

const CategoryGrid: React.FC<{ categories: Category[]; onSelectCategory: (categoryName: string) => void; }> = ({ categories, onSelectCategory }) => {
    const getCategoryIcon = (categoryName: string) => {
        const iconProps = { className: "w-8 h-8 transition-colors duration-300 group-hover:text-white text-brand-primary", "aria-hidden": "true" };
        switch (categoryName) {
            case 'Deals': return <TagIcon {...iconProps} />;
            case 'Burgers & Sandwiches': return <BurgerIcon {...iconProps} />;
            case 'Pizza': return <PizzaIcon {...iconProps} />;
            case 'Royal Premium Flavors Pizza': return <PizzaIcon {...iconProps} />;
            case 'Kabab Stuffer': return <ChickenIcon {...iconProps} />;
            case 'Pasta': return <PastaIcon {...iconProps} />;
            case 'Starters, Fried & Rolls': return <SaladIcon {...iconProps} />;
            case 'Ice Cream': return <IceCreamIcon {...iconProps} />;
            default: return <DessertIcon {...iconProps} />;
        }
    };

    return (
        <section className="py-8 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center gap-2 mb-8">
                    <span className="h-1 w-10 bg-brand-primary rounded-full"></span>
                    <h2 className="text-2xl font-extrabold text-brand-dark uppercase tracking-wide">Our Menu</h2>
                    <span className="h-1 w-10 bg-brand-primary rounded-full"></span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {categories.map(category => (
                        <button
                            key={category.name}
                            onClick={() => onSelectCategory(category.name)}
                            className="group flex flex-col items-center justify-center p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:bg-brand-primary hover:shadow-lg hover:border-brand-primary transform hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="bg-brand-light p-3 rounded-full group-hover:bg-white/20 transition-colors">
                                {getCategoryIcon(category.name)}
                            </div>
                            <span className="mt-3 text-xs sm:text-sm font-bold text-center text-gray-700 group-hover:text-white transition-colors duration-300">{category.name}</span>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

const MenuItemCard: React.FC<{ item: MenuItem; onOrderNow: (item: MenuItem, quantity: number) => void; }> = ({ item, onOrderNow }) => {
    const [quantity, setQuantity] = useState(1);

    const itemName = (typeof item.name === 'string' || typeof item.name === 'number') ? item.name : 'Unnamed Item';
    const itemDescription = typeof item.description === 'string' ? item.description : 'No description available.';
    const itemPrice = typeof item.price === 'number' ? item.price : 0;
    const itemImageUrl = typeof item.imageUrl === 'string' && item.imageUrl ? item.imageUrl : 'https://via.placeholder.com/400x300';

    const handleIncrement = (e: React.MouseEvent) => {
        e.stopPropagation();
        setQuantity(prev => prev + 1);
    };

    const handleDecrement = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col transform hover:shadow-xl hover:border-red-100 hover:-translate-y-1 transition-all duration-300 h-full group">
            <div className="relative overflow-hidden h-44 sm:h-52 flex-shrink-0">
                <img className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110" src={itemImageUrl} alt={itemName} />
                {item.isSpicy && (
                  <div className="absolute top-3 left-3 bg-red-600 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 z-10 shadow-md">
                    <Flame className="w-3 h-3" /> SPICY
                  </div>
                )}
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-60"></div>
            </div>
            <div className="p-4 flex flex-col flex-grow relative">
                <div className="absolute -top-8 right-4 bg-white p-1 rounded-full shadow-md">
                     <div className="bg-brand-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                        PKR {itemPrice.toFixed(0)}
                     </div>
                </div>
                
                <h3 className="text-lg font-black text-brand-dark line-clamp-1 mb-1">{itemName}</h3>
                <p className="text-xs text-gray-500 mb-4 line-clamp-2 flex-grow leading-relaxed">{itemDescription}</p>
                
                <div className="mt-auto pt-4 border-t border-gray-50">
                    <div className="flex flex-col sm:flex-row items-stretch gap-3">
                        {/* Quantity Selector */}
                        <div className="flex items-center justify-between bg-gray-50 rounded-lg border border-gray-200 p-1">
                            <button 
                                onClick={handleDecrement}
                                className={`p-1.5 rounded-md text-brand-primary transition-colors ${quantity <= 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white hover:shadow-sm'}`}
                                disabled={quantity <= 1}
                                aria-label="Decrease quantity"
                            >
                                <MinusIcon className="h-4 w-4" />
                            </button>
                            <span className="w-8 text-center font-bold text-gray-800 text-sm">{quantity}</span>
                            <button 
                                onClick={handleIncrement}
                                className="p-1.5 rounded-md text-brand-primary hover:bg-white hover:shadow-sm transition-colors"
                                aria-label="Increase quantity"
                            >
                                <PlusIcon className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Order Button */}
                        <button
                            onClick={() => onOrderNow(item, quantity)}
                            className="flex-grow bg-brand-dark text-white font-bold py-2.5 px-4 rounded-lg hover:bg-brand-primary transition-colors text-xs sm:text-sm shadow-sm"
                        >
                            Order Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CartSidebar: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    cartItems: CartItem[];
    onUpdateQuantity: (item: CartItem, newQuantity: number) => void;
    onRemoveItem: (item: CartItem) => void;
    onCheckout: () => void;
    totalPrice: number;
}> = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onCheckout, totalPrice }) => {
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

    return (
    <>
        <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose}></div>
        <div 
            className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[60] transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
        >
            <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-6 border-b bg-gray-50">
                    <div className="flex items-center gap-2">
                        <div className="bg-white p-2 rounded-full shadow-sm text-red-600">
                             <CartIcon className="w-5 h-5" />
                        </div>
                        <h2 id="cart-title" className="text-xl font-black text-brand-dark">Your Cart</h2>
                    </div>
                    <button onClick={onClose} aria-label="Close cart" className="text-gray-400 hover:text-red-600 transition-colors p-2 bg-white rounded-full shadow-sm">
                        <BackIcon className="w-5 h-5" />
                    </button>
                </div>
                
                {cartItems.length === 0 ? (
                    <div className="flex-grow flex flex-col justify-center items-center text-center p-8 bg-white">
                         <div className="bg-red-50 p-6 rounded-full mb-4 animate-pulse">
                            <CartIcon className="w-12 h-12 text-red-200" />
                         </div>
                        <h3 className="text-lg font-bold text-gray-900">Your cart is empty</h3>
                        <p className="text-gray-500 mt-2 text-sm max-w-xs mx-auto">Looks like you haven't added any delicious food yet.</p>
                        <button onClick={onClose} className="mt-6 px-6 py-2 bg-brand-primary text-white rounded-full font-bold text-sm hover:bg-red-700 transition">
                            Browse Menu
                        </button>
                    </div>
                ) : (
                    <div className="flex-grow overflow-y-auto p-6 bg-white">
                        <ul className="space-y-6">
                            {cartItems.map((item, index) => {
                                const itemName = (typeof item.name === 'string' || typeof item.name === 'number') ? item.name : 'Unknown Item';
                                const itemPrice = typeof item.price === 'number' ? item.price : 0;
                                const itemImageUrl = typeof item.imageUrl === 'string' && item.imageUrl ? item.imageUrl : 'https://via.placeholder.com/80x80';
                                
                                return (
                                <li key={index} className="flex gap-4">
                                    <img src={itemImageUrl} alt="" className="w-20 h-20 rounded-xl object-cover border border-gray-100 flex-shrink-0" />
                                    <div className="flex-grow min-w-0">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-bold text-gray-900 text-sm truncate pr-2">{itemName}</h3>
                                            <button onClick={() => onRemoveItem(item)} aria-label={`Remove ${itemName} from cart`} className="text-gray-300 hover:text-red-500 transition">
                                                <TrashIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                        
                                        {Array.isArray(item.variations) && item.variations.length > 0 && (
                                            <p className="text-[10px] text-gray-500 mt-1 bg-gray-50 inline-block px-2 py-0.5 rounded">
                                                {item.variations.join(', ')}
                                            </p>
                                        )}
                                        {typeof item.specialInstructions === 'string' && item.specialInstructions && (
                                            <p className="text-[10px] text-gray-400 italic mt-0.5 truncate">"{item.specialInstructions}"</p>
                                        )}
                                        
                                        <div className="flex justify-between items-end mt-2">
                                            <p className="text-brand-primary font-bold text-sm">PKR {itemPrice.toFixed(0)}</p>
                                            <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200 p-0.5">
                                                <button onClick={() => onUpdateQuantity(item, item.quantity - 1)} className="p-1 hover:bg-white hover:shadow-sm rounded transition text-gray-600"><MinusIcon className="w-3 h-3" /></button>
                                                <span className="px-3 font-bold text-xs text-gray-800">{item.quantity}</span>
                                                <button onClick={() => onUpdateQuantity(item, item.quantity + 1)} className="p-1 hover:bg-white hover:shadow-sm rounded transition text-gray-600"><PlusIcon className="w-3 h-3" /></button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
                
                {cartItems.length > 0 && (
                    <div className="p-6 bg-gray-50 border-t border-gray-100">
                        <div className="space-y-2 mb-4">
                             <div className="flex justify-between text-sm text-gray-500">
                                <span>Subtotal</span>
                                <span>PKR {totalPrice.toFixed(0)}</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-500">
                                <span>Delivery Fee</span>
                                <span>PKR 150</span>
                            </div>
                            <div className="flex justify-between items-center pt-2 border-t border-gray-200 mt-2">
                                <span className="font-bold text-gray-900 text-lg">Total</span>
                                <span className="font-black text-brand-primary text-xl">PKR {(totalPrice + 150).toFixed(0)}</span>
                            </div>
                        </div>
                        <button 
                            onClick={onCheckout} 
                            className="w-full bg-brand-primary text-white font-bold py-4 rounded-xl hover:bg-red-700 transition-all shadow-lg active:scale-[0.98] flex justify-between px-6"
                        >
                            <span>Checkout</span>
                            <span>→</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    </>
)};


// MAIN APP COMPONENT
const App: React.FC = () => {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
    const [isCustomizationModalOpen, setIsCustomizationModalOpen] = useState(false);
    const [selectedItemForCustomization, setSelectedItemForCustomization] = useState<MenuItem | null>(null);
    const [initialCustomizationQuantity, setInitialCustomizationQuantity] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const loadMenu = async () => {
            setLoading(true);
            try {
                const data = await fetchMenuData();
                
                const validatedData = data.filter(item => 
                    item && 
                    typeof item.name === 'string' &&
                    typeof item.category === 'string'
                );
                
                setMenuItems(validatedData);
                
                const uniqueCategories = [...new Set(validatedData.map(item => item.category))];
                const categoryOrder = ['Burgers & Sandwiches', 'Pizza', 'Royal Premium Flavors Pizza', 'Kabab Stuffer', 'Pasta', 'Starters, Fried & Rolls', 'Ice Cream', 'Deals'];
                const sortedUniqueCategories = uniqueCategories.sort((a, b) => {
                    const indexA = categoryOrder.indexOf(a);
                    const indexB = categoryOrder.indexOf(b);
                    if (indexA === -1) return 1; 
                    if (indexB === -1) return -1;
                    return indexA - indexB;
                });
                setCategories(sortedUniqueCategories.map(name => ({ name })));
            } catch (err) {
                setError('Failed to load menu. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        loadMenu();
    }, []);

    const { totalItems, totalPrice } = useMemo(() => {
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return { totalItems, totalPrice };
    }, [cartItems]);

    const filteredItems = useMemo(() => {
        return menuItems.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [menuItems, searchTerm]);

    const handleAddToCart = useCallback((itemToAdd: CartItem) => {
        setCartItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(
                item =>
                    item.id === itemToAdd.id &&
                    item.specialInstructions === itemToAdd.specialInstructions &&
                    JSON.stringify(item.variations) === JSON.stringify(item.variations)
            );

            if (existingItemIndex > -1) {
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex].quantity += itemToAdd.quantity;
                return updatedItems;
            } else {
                return [...prevItems, itemToAdd];
            }
        });
        setIsCustomizationModalOpen(false);
        setIsCartOpen(true);
    }, []);

    const handleUpdateQuantity = useCallback((itemToUpdate: CartItem, newQuantity: number) => {
        if (newQuantity < 1) {
            handleRemoveFromCart(itemToUpdate);
            return;
        }
        setCartItems(prevItems =>
            prevItems.map(item =>
                item === itemToUpdate ? { ...item, quantity: newQuantity } : item
            )
        );
    }, []);
    
    const handleRemoveFromCart = useCallback((itemToRemove: CartItem) => {
        setCartItems(prevItems => prevItems.filter(item => item !== itemToRemove));
    }, []);
    
    const handleClearCart = useCallback(() => {
        setCartItems([]);
    }, []);

    const handleOpenCustomization = useCallback((item: MenuItem, quantity: number = 1) => {
        setSelectedItemForCustomization(item);
        setInitialCustomizationQuantity(quantity);
        setIsCustomizationModalOpen(true);
    }, []);

    const handleOrderSuccess = useCallback(() => {
        handleClearCart();
        setIsCheckoutModalOpen(false);
        setIsHistoryModalOpen(true);
    }, [handleClearCart]);

    const handleCategorySelect = useCallback((categoryName: string) => {
        const element = document.getElementById(categoryName);
        if (element) {
            const headerEl = document.querySelector('header');
            const headerOffset = headerEl ? headerEl.offsetHeight : 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    }, []);
    
    const sliderItems = useMemo(() => {
        const dealItems = menuItems.filter(item => item.category === 'Deals');
        const premiumPizzaItems = menuItems.filter(item => item.category === 'Royal Premium Flavors Pizza').slice(0, 2);
        const combinedItems = [...dealItems, ...premiumPizzaItems];

        if (combinedItems.length > 0) {
            return combinedItems;
        }
        return menuItems.slice(0, 5);
    }, [menuItems]);


    return (
        <div className="font-sans bg-gray-50 min-h-screen flex flex-col">
            <Header
                onShowHistory={() => setIsHistoryModalOpen(true)}
                totalItems={totalItems}
                totalPrice={totalPrice + (totalItems > 0 ? 150 : 0)}
                sliderItems={sliderItems}
                onOrderNow={handleOpenCustomization}
                onCartClick={() => setIsCartOpen(true)}
            />

            <main className="flex-grow">
                {loading && <div className="mt-20"><Spinner /></div>}
                {error && <p className="text-center text-red-500 mt-10">{error}</p>}
                {!loading && !error && (
                    <>
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                            {/* Search */}
                            <div className="mb-10 max-w-2xl mx-auto">
                                <div className="relative group">
                                    <label htmlFor="search-food" className="sr-only">Search for your favorite food</label>
                                    <input
                                        type="search"
                                        id="search-food"
                                        placeholder="Search for yummy food..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full px-6 py-4 pl-12 border border-gray-200 rounded-full shadow-sm focus:ring-4 focus:ring-red-100 focus:border-red-500 focus:outline-none transition-all text-gray-800 group-hover:shadow-md"
                                    />
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 transition-colors group-hover:text-red-500" aria-hidden="true">
                                        <SearchIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                </div>
                            </div>
                           
                           <CategoryGrid categories={categories} onSelectCategory={handleCategorySelect} />
                           
                           {/* Full Menu Section */}
                           {categories.map(category => {
                               const itemsForCategory = filteredItems.filter(item => item.category === category.name);
                               if (itemsForCategory.length === 0) return null;

                               return (
                                   <section key={category.name} id={category.name} className="py-12 scroll-mt-24">
                                       <div className="flex items-center gap-4 mb-8">
                                            <div className="h-10 w-2 bg-brand-primary rounded-r-full"></div>
                                            <h2 className="text-3xl font-black text-brand-dark uppercase tracking-tight">{category.name}</h2>
                                       </div>
                                       
                                       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                           {itemsForCategory.map(item => (
                                               <MenuItemCard key={item.id} item={item} onOrderNow={handleOpenCustomization} />
                                           ))}
                                       </div>
                                   </section>
                               )
                           })}
                           
                           <About />
                           <Blog />
                           <FaqSection />
                        </div>
                    </>
                )}
            </main>
            
            <Footer />

            <CartSidebar
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cartItems={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveFromCart}
                onCheckout={() => {
                    setIsCartOpen(false);
                    setIsCheckoutModalOpen(true);
                }}
                totalPrice={totalPrice}
            />

            <CheckoutModal
                isOpen={isCheckoutModalOpen}
                onClose={() => setIsCheckoutModalOpen(false)}
                onOrderSuccess={handleOrderSuccess}
                cartItems={cartItems}
                totalPrice={totalPrice + 150}
            />

            <ItemCustomizationModal
                isOpen={isCustomizationModalOpen}
                onClose={() => setIsCustomizationModalOpen(false)}
                item={selectedItemForCustomization}
                onAddToCart={handleAddToCart}
                initialQuantity={initialCustomizationQuantity}
            />

            <OrderHistoryModal
                isOpen={isHistoryModalOpen}
                onClose={() => setIsHistoryModalOpen(false)}
            />

            <WhatsAppButton />
        </div>
    );
};

export default App;
