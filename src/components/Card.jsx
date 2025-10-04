import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Rewriting icons as standard functions can be easier for beginners to understand.
function PlusIcon({ className = "w-4 h-4" }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
        </svg>
    );
}

function MinusIcon({ className = "w-4 h-4" }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
        </svg>
    );
}

/**
 * A compact, reusable food item card with quantity and plate size selectors.
 * Designed with a modern dark theme for dynamic rendering in a menu.
 */
export function FoodItemCard({
    productId,
    imageUrl,
    title,
    basePrice,
    onAddToCart
}) {
    // The 'useState' hook lets us add state (memory) to our component.
    // 'quantity' holds the current number, and 'setQuantity' is the function to update it.
    const [quantity, setQuantity] = useState(1);
    const [plateSize, setPlateSize] = useState('full'); // 'half' or 'full'

    // --- Event Handlers ---
    function handleIncrement() {
        setQuantity(currentQuantity => currentQuantity + 1);
    }
    function handleDecrement() {
        // Prevent quantity from going below 1
        setQuantity(currentQuantity => (currentQuantity > 1 ? currentQuantity - 1 : 1));
    }

    function handleAddToCart() {
        const priceModifier = plateSize === 'full' ? 1 : 0.6;
        const finalPrice = basePrice * priceModifier * quantity;

        if (onAddToCart) {
            onAddToCart({ productId, title, quantity, plateSize, finalPrice });
        }
    };

    // --- Derived State ---
    // This value is recalculated every time the component re-renders (e.g., when state changes)
    const currentPrice = (basePrice * (plateSize === 'full' ? 1 : 0.6) * quantity).toFixed(2);

    return (
        <div className="group w-full max-w-xs bg-gray-900 border border-gray-800 rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gray-700/30">
            {/* Image Section */}
            <div className="relative h-40">
                <img
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    src={imageUrl}
                    alt={`Image of ${title}`}
                />
                
            </div>

            {/* Content Section */}
            <div className="p-4 flex flex-col">
                <h5 className="text-xl font-bold tracking-tight text-white mb-1 truncate">{title}</h5>
                <p className="text-2xl font-black text-white mb-3">${currentPrice}</p>

                {/* Plate Size Selector */}
                <div className="flex rounded-md shadow-sm mb-3">
                    <button
                        onClick={() => setPlateSize('half')}
                        className={`flex-1 rounded-l-md px-3 py-1.5 text-xs font-semibold transition-colors duration-200 ${
                            plateSize === 'half' ? 'bg-gray-200 text-black' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                    >
                        Half
                    </button>
                    <button
                        onClick={() => setPlateSize('full')}
                        className={`flex-1 rounded-r-md px-3 py-1.5 text-xs font-semibold transition-colors duration-200 ${
                            plateSize === 'full' ? 'bg-gray-200 text-black' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                    >
                        Full
                    </button>
                </div>

                {/* Quantity and Add to Cart */}
                <div className="flex items-center justify-between gap-3">
                    {/* Quantity Control */}
                    <div className="flex items-center rounded-md bg-gray-800">
                        <button onClick={handleDecrement} className="p-2 text-white transition-colors hover:bg-gray-700 rounded-l-md">
                            <MinusIcon />
                        </button>
                        <span className="px-3 text-md font-bold text-white select-none">{quantity}</span>
                        <button onClick={handleIncrement} className="p-2 text-white transition-colors hover:bg-gray-700 rounded-r-md">
                            <PlusIcon />
                        </button>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        onClick={handleAddToCart}
                        className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-bold text-center text-black bg-gray-200 rounded-lg hover:bg-white focus:ring-4 focus:ring-gray-400 transition-colors"
                    >
                        Add To Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

/**
 * This is the main App component that demonstrates how to dynamically
 * render multiple FoodItemCard components.
 */
export default function App() {
    // Sample data for our food menu
    const menuItems = [
        { id: 'fr-01', name: 'Paneer Tikki Burger', img: 'https://images.unsplash.com/photo-1512152272829-e3139592d56f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9&s=599926c9518edbf16b6b71306ecc0124', price: 15.50 },
        { id: 'ns-02', name: 'Hakka Noodles', img: 'https://media.istockphoto.com/id/1158159302/photo/schezwan-hakka-noodles-served-in-a-bowl-top-view.webp?b=1&s=170667a&w=0&k=20&c=cADTbt5sPTQEV45Mus0aygWq7-jnQKcNglyktDUri5M=', price: 12.00 },
        { id: 'dm-03', name: 'Farmhouse Pizza', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max', price: 29.00 },
        { id: 'sp-04', name: 'Cold Coffee', img: 'https://media.istockphoto.com/id/583972478/photo/latte-macchiato-with-whipped-cream-serving-silver-spoon-and-pitcher.jpg?b=1&s=170667a&w=0&k=20&c=JPuZwyzP2tYxTjySb2N5uS-YZFGul6D6nHc_diwthes=', price: 9.00 },
    ];

    // Handler function that receives the details from the card
    const handleAddToCart = (itemDetails) => {
        console.log('Adding to cart:', itemDetails);
        alert(`${itemDetails.quantity}x ${itemDetails.plateSize} plate of ${itemDetails.title} added! Final Price: $${itemDetails.finalPrice.toFixed(2)}`);
    };

    return (
        <div className="bg-gray-900 min-h-screen font-sans p-4 sm:p-6 lg:p-8 relative overflow-hidden">
            {/* Decorative background blur shapes */}
            <div className="absolute top-0 -left-10 w-96 h-96 bg-gray-800 rounded-full filter blur-3xl opacity-50"></div>
            <div className="absolute bottom-0 -right-10 w-96 h-96 bg-gray-700 rounded-full filter blur-3xl opacity-50"></div>
            <div className="container mx-auto relative z-10">
                {/* This is how you render the cards dynamically */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                    {menuItems.map((item) => (
                        <FoodItemCard
                            key={item.id}
                            productId={item.id}
                            title={item.name}
                            imageUrl={item.img}
                            basePrice={item.price}
                            onAddToCart={handleAddToCart}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

