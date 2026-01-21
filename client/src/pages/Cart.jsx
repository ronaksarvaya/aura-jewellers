import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import { FiTrash2, FiMinus, FiPlus, FiArrowRight } from 'react-icons/fi';

const Cart = () => {
    const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white px-4">
                <h2 className="text-3xl font-serif font-bold mb-4">Your Cart is Empty</h2>
                <p className="text-neutral-500 mb-8">Looks like you haven't added anything yet.</p>
                <Link to="/shop">
                    <Button>Start Shopping</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen py-12 md:py-20">
            <div className="container mx-auto px-4 md:px-6">
                <h1 className="text-3xl md:text-4xl font-serif font-bold mb-12">Shopping Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="hidden md:grid grid-cols-12 text-sm font-medium text-neutral-500 border-b border-neutral-200 pb-4">
                            <div className="col-span-6">Product</div>
                            <div className="col-span-2 text-center">Quantity</div>
                            <div className="col-span-2 text-right">Total</div>
                            <div className="col-span-2 text-right">Action</div>
                        </div>

                        {cartItems.map((item, index) => (
                            <div key={`${item.id}-${index}`} className="flex flex-col md:grid md:grid-cols-12 gap-4 items-center border-b border-neutral-100 pb-8 last:border-0 last:pb-0">
                                {/* Product Info */}
                                <div className="col-span-6 w-full flex items-center gap-4">
                                    <Link to={`/product/${item.id}`} className="w-20 h-20 bg-neutral-100 rounded-sm overflow-hidden flex-shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </Link>
                                    <div>
                                        <Link to={`/product/${item.id}`} className="font-medium text-neutral-900 hover:text-amber-700 transition">{item.name}</Link>
                                        <p className="text-sm text-neutral-500 mt-1">{item.metal}, Size {item.size}</p>
                                        <p className="md:hidden text-sm font-medium mt-1">${item.price.toLocaleString()}</p>
                                    </div>
                                </div>

                                {/* Quantity */}
                                <div className="col-span-2 flex items-center justify-center">
                                    <div className="flex items-center border border-neutral-200 rounded-sm">
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1, { size: item.size, metal: item.metal })} className="px-2 py-1 hover:bg-neutral-50 transition"><FiMinus className="w-3 h-3" /></button>
                                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1, { size: item.size, metal: item.metal })} className="px-2 py-1 hover:bg-neutral-50 transition"><FiPlus className="w-3 h-3" /></button>
                                    </div>
                                </div>

                                {/* Total */}
                                <div className="hidden md:block col-span-2 text-right font-medium">
                                    ${(item.price * item.quantity).toLocaleString()}
                                </div>

                                {/* Action */}
                                <div className="col-span-2 flex justify-end">
                                    <button onClick={() => removeFromCart(item.id, { size: item.size, metal: item.metal })} className="text-neutral-400 hover:text-red-500 transition">
                                        <FiTrash2 />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Checkout Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-neutral-50 p-6 rounded-sm space-y-4">
                            <h3 className="text-lg font-serif font-bold mb-4">Order Summary</h3>
                            <div className="flex justify-between text-sm text-neutral-600">
                                <span>Subtotal</span>
                                <span>${cartTotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm text-neutral-600">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="border-t border-neutral-200 pt-4 flex justify-between font-bold text-lg text-neutral-900">
                                <span>Total</span>
                                <span>${cartTotal.toLocaleString()}</span>
                            </div>

                            <Link to="/checkout" className="block w-full">
                                <Button fullWidth size="lg" className="mt-4 flex items-center justify-center gap-2">
                                    Proceed to Checkout <FiArrowRight />
                                </Button>
                            </Link>

                            <p className="text-xs text-center text-neutral-400 mt-4">
                                Taxes and shipping calculated at checkout.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
