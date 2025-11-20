
import React, { useState, useEffect, useMemo } from 'react';
import { MenuItem, CartItem } from '../types';
import { CloseIcon, PlusIcon, MinusIcon, BackIcon } from './IconComponents';

interface ItemCustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: MenuItem | null;
  onAddToCart: (item: CartItem) => void;
  initialQuantity?: number;
}

const getVariationsForCategory = (category: string): string[] => {
    switch (category) {
        case 'Burgers & Sandwiches':
            return ['Extra Cheese', 'No Onions', 'No Pickles', 'Extra Sauce'];
        case 'Pizza':
        case 'Royal Premium Flavors Pizza':
            return ['Add Olives', 'Add Mushrooms', 'Extra Meat'];
        case 'Starters, Fried & Rolls':
            return ['Extra Sauce', 'Spicy Dip'];
        case 'Ice Cream':
            return ['Add Sprinkles', 'Chocolate Syrup', 'Waffle Cone'];
        default:
            return [];
    }
};


const ItemCustomizationModal: React.FC<ItemCustomizationModalProps> = ({ isOpen, onClose, item, onAddToCart, initialQuantity = 1 }) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [selectedVariations, setSelectedVariations] = useState<string[]>([]);
  
  // Special state for Kabab Stuffer size selection
  const [selectedSize, setSelectedSize] = useState<'M' | 'L' | 'XL'>('M');

  // Special state for Pizza size selection
  const [selectedPizzaSize, setSelectedPizzaSize] = useState<'S' | 'M' | 'L' | 'XL'>('S');
  
  // Special state for Pasta variants
  const [selectedPastaVariant, setSelectedPastaVariant] = useState<'F1' | 'F2'>('F1');
  
  // Special state for Ice Cream scoops
  const [selectedIceCreamSize, setSelectedIceCreamSize] = useState<'3 Scoops' | '4 Scoops'>('3 Scoops');

  // Special state for Pizza/Burger options
  const [selectedSpice, setSelectedSpice] = useState('Normal');
  
  // Special state for Pizza Extra Toppings
  const [selectedExtraToppings, setSelectedExtraToppings] = useState<string[]>([]);

  const isKababStuffer = item?.category === 'Kabab Stuffer';
  const isPasta = item?.category === 'Pasta';
  const isPizza = item?.category === 'Pizza' || item?.category === 'Royal Premium Flavors Pizza';
  const isBurger = item?.category === 'Burgers & Sandwiches';
  const isIceCream = item?.category === 'Ice Cream';

  const availableVariations = useMemo(() => item ? getVariationsForCategory(item.category) : [], [item]);

  const extraToppingOptions = [
      { id: 'S', label: 'Small (S)', price: 70 },
      { id: 'M', label: 'Medium (M)', price: 130 },
      { id: 'L', label: 'Large (L)', price: 170 },
      { id: 'XL', label: 'Extra Large (XL)', price: 200 },
  ];

  useEffect(() => {
    if (isOpen) {
      setQuantity(initialQuantity);
      setSpecialInstructions('');
      setSelectedVariations([]);
      setSelectedSize('M'); // Default for Stuffer
      setSelectedPizzaSize('S'); // Default for Pizza
      setSelectedPastaVariant('F1'); // Default to F1
      setSelectedIceCreamSize('3 Scoops'); // Default to 3 scoops
      setSelectedSpice('Normal'); // Default Spice
      setSelectedExtraToppings([]); // Reset Extra Toppings
    }
  }, [isOpen, initialQuantity]);

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

  if (!isOpen || !item) return null;

  const itemName = (typeof item.name === 'string' || typeof item.name === 'number') ? item.name : 'Unnamed Item';
  const itemDescription = typeof item.description === 'string' ? item.description : 'No description available.';
  const itemImageUrl = typeof item.imageUrl === 'string' && item.imageUrl ? item.imageUrl : 'https://via.placeholder.com/400x300';
  
  // Dynamic Price Calculation
  const getUnitPrice = () => {
      let price = 0;
      if (isKababStuffer) {
          if (selectedSize === 'L') price = 1600;
          else if (selectedSize === 'XL') price = 1800;
          else price = 1050; // Medium base price
      } else if (isPasta) {
          // Special pricing for pasta variants
          if (itemName.includes('Special')) {
              price = selectedPastaVariant === 'F1' ? 400 : 700;
          } else {
             // Creamy and Crunchy
             price = selectedPastaVariant === 'F1' ? 450 : 750;
          }
      } else if (isIceCream) {
          price = selectedIceCreamSize === '3 Scoops' ? 120 : 150;
      } else if (isPizza) {
          // Check for Behari Kabab Pizza Exception
          if (itemName.toLowerCase().includes('behari')) {
               switch (selectedPizzaSize) {
                   case 'S': price = 600; break;
                   case 'M': price = 1000; break;
                   case 'L': price = 1550; break;
                   case 'XL': price = 1750; break;
                   default: price = 600;
               }
          } else {
             // Standard Pizza Pricing
             switch (selectedPizzaSize) {
                 case 'S': price = 600; break;
                 case 'M': price = 900; break;
                 case 'L': price = 1400; break;
                 case 'XL': price = 1600; break;
                 default: price = 600;
             }
          }
          
          // Add selected Extra Toppings Prices
          selectedExtraToppings.forEach(id => {
              const topping = extraToppingOptions.find(t => t.id === id);
              if (topping) {
                  price += topping.price;
              }
          });

      } else {
          price = typeof item.price === 'number' ? item.price : 0;
      }
      
      return price;
  };

  const currentUnitPrice = getUnitPrice();
  const totalPrice = currentUnitPrice * quantity;

  const handleVariationChange = (variation: string) => {
    setSelectedVariations(prev =>
      prev.includes(variation)
        ? prev.filter(v => v !== variation)
        : [...prev, variation]
    );
  };

  const handleSubmit = () => {
    const finalVariations = [...selectedVariations];
    
    // If it's a Kabab Stuffer item, add the size to variations
    if (isKababStuffer) {
        const sizeLabel = selectedSize === 'M' ? 'Medium' : selectedSize === 'L' ? 'Large' : 'Extra Large';
        finalVariations.unshift(`Size: ${sizeLabel}`);
    }

    // If it's a Pizza item, add the size and extra toppings
    if (isPizza) {
         const sizeLabel = { 'S': 'Small', 'M': 'Medium', 'L': 'Large', 'XL': 'Extra Large' }[selectedPizzaSize];
         finalVariations.unshift(`Size: ${sizeLabel}`);
         
         selectedExtraToppings.forEach(id => {
             const topping = extraToppingOptions.find(t => t.id === id);
             if (topping) {
                 finalVariations.push(`Extra Topping: ${topping.label} (+PKR ${topping.price})`);
             }
         });
    }

    // If it's a Pasta item, add the variant
    if (isPasta) {
        finalVariations.unshift(`Variant: ${selectedPastaVariant}`);
    }
    
    // If it's Ice Cream, add the scoops
    if (isIceCream) {
        finalVariations.unshift(`${selectedIceCreamSize}`);
    }

    // Add Pizza specifics
    if (isPizza) {
        finalVariations.push(`Spice: ${selectedSpice}`);
    }

    // Add Burger specifics
    if (isBurger) {
        finalVariations.push(`Spice: ${selectedSpice}`);
    }

    const cartItem: CartItem = {
      ...item,
      cartId: '', // This will be overwritten in App.tsx
      price: currentUnitPrice, // Use the dynamic size-based price
      quantity: quantity,
      specialInstructions: specialInstructions.trim() || undefined,
      variations: finalVariations.length > 0 ? finalVariations : undefined,
    };
    onAddToCart(cartItem);
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-[60] flex justify-center items-center p-4 backdrop-blur-sm">
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 ease-out scale-95 animate-scale-in overflow-y-auto max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="customization-title"
      >
        <img src={itemImageUrl} alt={itemName} className="w-full h-48 object-cover rounded-t-2xl"/>
        <div className="p-6 relative">
          {/* Back Button */}
          <button onClick={onClose} aria-label="Go back" className="absolute -top-16 left-4 bg-white/80 p-2 rounded-full text-gray-900 hover:bg-white transition-colors shadow-md">
            <BackIcon className="w-5 h-5" />
          </button>
          {/* Close Button */}
          <button onClick={onClose} aria-label="Close customization" className="absolute -top-16 right-4 bg-white/80 p-2 rounded-full text-gray-900 hover:bg-white transition-colors shadow-md">
            <CloseIcon className="w-5 h-5" />
          </button>
          
          <div>
            <h2 id="customization-title" className="text-2xl font-bold text-gray-900">{itemName}</h2>
            <p className="text-gray-600 mt-1 text-sm">{itemDescription}</p>
            <span className="text-xl font-black text-gray-900 mt-3 block">PKR {currentUnitPrice.toFixed(0)}</span>
          </div>
          
          <div className="mt-6 space-y-6">
            
            {/* Special Size Selector for Kabab Stuffer */}
            {isKababStuffer && (
                <div>
                    <h3 className="text-md font-semibold text-gray-900 mb-2">Select Size</h3>
                    <div className="flex gap-2">
                        {[
                            { code: 'M', label: 'Medium', price: 1050 },
                            { code: 'L', label: 'Large', price: 1600 },
                            { code: 'XL', label: 'Extra Large', price: 1800 },
                        ].map((size) => (
                            <button
                                key={size.code}
                                onClick={() => setSelectedSize(size.code as 'M' | 'L' | 'XL')}
                                className={`flex-1 py-2 rounded-lg text-sm font-bold border transition-all duration-200 flex flex-col items-center justify-center ${
                                    selectedSize === size.code 
                                    ? 'bg-red-600 text-white border-red-600 shadow-md ring-2 ring-red-200' 
                                    : 'bg-white text-gray-700 border-gray-200 hover:border-red-600 hover:text-red-600'
                                }`}
                            >
                                <div>{size.label}</div>
                                <div className={`text-xs font-normal ${selectedSize === size.code ? 'text-red-100' : 'text-gray-500'}`}>{size.price}</div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Special Size Selector for Pizza */}
            {isPizza && (
                <div>
                    <h3 className="text-md font-semibold text-gray-900 mb-2">Select Size</h3>
                    <div className="flex gap-2">
                        {[
                            { code: 'S', label: 'S', price: itemName.toLowerCase().includes('behari') ? 600 : 600 },
                            { code: 'M', label: 'M', price: itemName.toLowerCase().includes('behari') ? 1000 : 900 },
                            { code: 'L', label: 'L', price: itemName.toLowerCase().includes('behari') ? 1550 : 1400 },
                            { code: 'XL', label: 'XL', price: itemName.toLowerCase().includes('behari') ? 1750 : 1600 },
                        ].map((size) => (
                            <button
                                key={size.code}
                                onClick={() => setSelectedPizzaSize(size.code as 'S' | 'M' | 'L' | 'XL')}
                                className={`flex-1 py-2 rounded-lg text-sm font-bold border transition-all duration-200 flex flex-col items-center justify-center ${
                                    selectedPizzaSize === size.code 
                                    ? 'bg-red-600 text-white border-red-600 shadow-md ring-2 ring-red-200' 
                                    : 'bg-white text-gray-700 border-gray-200 hover:border-red-600 hover:text-red-600'
                                }`}
                            >
                                <div>{size.label}</div>
                                <div className={`text-xs font-normal ${selectedPizzaSize === size.code ? 'text-red-100' : 'text-gray-500'}`}>{size.price}</div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

             {/* Special Variant Selector for Pasta */}
             {isPasta && (
                <div>
                    <h3 className="text-md font-semibold text-gray-900 mb-2">Select Variant</h3>
                    <div className="flex gap-2">
                        {[
                            { code: 'F1', label: 'F1 (Small)', price: itemName.includes('Special') ? 400 : 450 },
                            { code: 'F2', label: 'F2 (Large)', price: itemName.includes('Special') ? 700 : 750 },
                        ].map((variant) => (
                            <button
                                key={variant.code}
                                onClick={() => setSelectedPastaVariant(variant.code as 'F1' | 'F2')}
                                className={`flex-1 py-2 rounded-lg text-sm font-bold border transition-all duration-200 flex flex-col items-center justify-center ${
                                    selectedPastaVariant === variant.code 
                                    ? 'bg-red-600 text-white border-red-600 shadow-md ring-2 ring-red-200' 
                                    : 'bg-white text-gray-700 border-gray-200 hover:border-red-600 hover:text-red-600'
                                }`}
                            >
                                <div>{variant.label}</div>
                                <div className={`text-xs font-normal ${selectedPastaVariant === variant.code ? 'text-red-100' : 'text-gray-500'}`}>{variant.price}</div>
                            </button>
                        ))}
                    </div>
                </div>
            )}
            
            {/* Special Selector for Ice Cream */}
            {isIceCream && (
                <div>
                    <h3 className="text-md font-semibold text-gray-900 mb-2">Select Quantity</h3>
                    <div className="flex gap-2">
                        {[
                            { code: '3 Scoops', label: '3 Scoops', price: 120 },
                            { code: '4 Scoops', label: '4 Scoops', price: 150 },
                        ].map((opt) => (
                            <button
                                key={opt.code}
                                onClick={() => setSelectedIceCreamSize(opt.code as '3 Scoops' | '4 Scoops')}
                                className={`flex-1 py-2 rounded-lg text-sm font-bold border transition-all duration-200 flex flex-col items-center justify-center ${
                                    selectedIceCreamSize === opt.code 
                                    ? 'bg-red-600 text-white border-red-600 shadow-md ring-2 ring-red-200' 
                                    : 'bg-white text-gray-700 border-gray-200 hover:border-red-600 hover:text-red-600'
                                }`}
                            >
                                <div>{opt.label}</div>
                                <div className={`text-xs font-normal ${selectedIceCreamSize === opt.code ? 'text-red-100' : 'text-gray-500'}`}>{opt.price}</div>
                            </button>
                        ))}
                    </div>
                </div>
            )}
            
            {/* Extra Topping for Pizza - List of Checkboxes */}
            {isPizza && (
                <div>
                     <h3 className="text-md font-semibold text-gray-900 mb-2">Extra Topping</h3>
                     <div className="space-y-2">
                        {extraToppingOptions.map((option) => (
                            <label key={option.id} className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${selectedExtraToppings.includes(option.id) ? 'border-red-600 bg-red-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                                <input 
                                    type="checkbox" 
                                    checked={selectedExtraToppings.includes(option.id)}
                                    onChange={() => {
                                        setSelectedExtraToppings(prev => 
                                            prev.includes(option.id) 
                                            ? prev.filter(id => id !== option.id) 
                                            : [...prev, option.id]
                                        );
                                    }}
                                    className="form-checkbox text-red-600 h-5 w-5 rounded focus:ring-red-600"
                                />
                                <div className="ml-3 flex-grow flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-700">{option.label}</span>
                                    <span className="text-sm font-bold text-gray-500">+PKR {option.price}</span>
                                </div>
                            </label>
                        ))}
                     </div>
                </div>
            )}

            {/* Spice Level for Pizza & Burgers */}
            {(isPizza || isBurger) && (
                <div>
                    <h3 className="text-md font-semibold text-gray-900 mb-2">Spice Level</h3>
                    <div className="flex gap-2">
                        {['Mild', 'Normal', 'Spicy', 'Extra Hot'].map((spice) => (
                            <button
                                key={spice}
                                onClick={() => setSelectedSpice(spice)}
                                className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${
                                    selectedSpice === spice 
                                    ? 'bg-red-600 text-white border-red-600 shadow-md' 
                                    : 'bg-white text-gray-700 border-gray-200 hover:border-red-600'
                                }`}
                            >
                                {spice}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {availableVariations.length > 0 && (
                <div>
                    <h3 className="text-md font-semibold text-gray-900 mb-2">Add-ons</h3>
                    <div className="flex flex-wrap gap-2">
                        {availableVariations.map(variation => (
                             <button
                                key={variation}
                                onClick={() => handleVariationChange(variation)}
                                aria-pressed={selectedVariations.includes(variation)}
                                className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-colors border ${
                                selectedVariations.includes(variation)
                                    ? 'bg-red-600 text-white border-red-600'
                                    : 'bg-gray-50 text-gray-800 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                                }`}
                            >
                                {variation}
                            </button>
                        ))}
                    </div>
                </div>
            )}
            
            <div>
                <label htmlFor="special-instructions" className="text-md font-semibold text-gray-900 mb-2 block">Special Instructions (Optional)</label>
                <textarea
                    id="special-instructions"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="e.g. Extra sauce, no napkins..."
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-md focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none transition"
                    rows={2}
                ></textarea>
            </div>
            
            <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <h3 className="text-md font-semibold text-gray-900">Quantity</h3>
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => setQuantity(q => Math.max(1, q - 1))} 
                        disabled={quantity <= 1}
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed text-gray-700"
                        aria-label="Decrease quantity"
                    >
                        <MinusIcon className="w-5 h-5" />
                    </button>
                    <span className="font-bold text-lg text-gray-900 w-8 text-center" aria-live="polite">{quantity}</span>
                    <button 
                        onClick={() => setQuantity(q => q + 1)}
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition text-gray-700"
                        aria-label="Increase quantity"
                    >
                        <PlusIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <button
                onClick={handleSubmit}
                className="w-full bg-red-600 text-white font-bold py-4 px-4 rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center text-md shadow-lg hover:shadow-xl transform active:scale-[0.98] duration-200"
            >
                <div className="flex justify-between items-center w-full">
                    <span>Add to Cart</span>
                    <span className="font-bold">PKR {totalPrice.toFixed(0)}</span>
                </div>
            </button>
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

export default ItemCustomizationModal;
