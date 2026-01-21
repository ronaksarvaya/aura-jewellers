import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { FiCheckCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Checkout = () => {
    const { cartItems, cartTotal } = useCart();
    const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
    const [loading, setLoading] = useState(false);

    // Mock Submit
    const handleShippingSubmit = (e) => {
        e.preventDefault();
        setStep(2);
    };

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStep(3);
        }, 2000);
    };

    if (step === 3) {
        return (
            <div className="min-h-screen bg-neutral-50 flex items-center justify-center py-20 px-4">
                <div className="bg-white p-8 md:p-12 rounded-lg shadow-sm text-center max-w-md w-full">
                    <FiCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                    <h2 className="text-3xl font-serif font-bold mb-4">Order Placed!</h2>
                    <p className="text-neutral-500 mb-8">Thank you for your purchase. You will receive an email confirmation shortly.</p>
                    <div className="bg-neutral-50 p-4 rounded text-left mb-6">
                        <p className="text-sm font-bold mb-2">Order #AURA-{Math.floor(Math.random() * 10000)}</p>
                        <p className="text-sm text-neutral-500">Estimated Delivery: 3-5 Business Days</p>
                    </div>
                    <Link to="/">
                        <Button fullWidth>Continue Shopping</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen pb-20 pt-10">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

                    {/* Left Column: Forms */}
                    <div>
                        <div className="flex items-center space-x-4 mb-8 text-sm font-medium">
                            <span className={`px-3 py-1 rounded-full ${step === 1 ? 'bg-black text-white' : 'bg-neutral-100 text-neutral-500'}`}>1. Shipping</span>
                            <div className="w-8 h-px bg-neutral-200" />
                            <span className={`px-3 py-1 rounded-full ${step === 2 ? 'bg-black text-white' : 'bg-neutral-100 text-neutral-500'}`}>2. Payment</span>
                        </div>

                        {step === 1 && (
                            <form onSubmit={handleShippingSubmit} className="space-y-6">
                                <h2 className="text-2xl font-serif font-bold mb-6">Shipping Details</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <Input label="First Name" placeholder="Jane" required />
                                    <Input label="Last Name" placeholder="Doe" required />
                                </div>
                                <Input label="Address" placeholder="123 Luxury Lane" required />
                                <div className="grid grid-cols-2 gap-4">
                                    <Input label="City" placeholder="New York" required />
                                    <Input label="Zip Code" placeholder="10001" required />
                                </div>
                                <Input label="Email" type="email" placeholder="jane@example.com" required />
                                <Input label="Phone" placeholder="+1 (555) 000-0000" required />

                                <Button type="submit" fullWidth className="mt-8">Continue to Payment</Button>
                            </form>
                        )}

                        {step === 2 && (
                            <form onSubmit={handlePaymentSubmit} className="space-y-6">
                                <h2 className="text-2xl font-serif font-bold mb-6">Payment Method</h2>
                                <div className="p-4 border border-neutral-200 rounded-sm mb-6 bg-neutral-50">
                                    <p className="text-sm text-neutral-500 mb-2">Secure SSL Encryption</p>
                                    <div className="flex space-x-2">
                                        {/* Payment Icons placeholders */}
                                        <div className="h-6 w-10 bg-neutral-200 rounded"></div>
                                        <div className="h-6 w-10 bg-neutral-200 rounded"></div>
                                    </div>
                                </div>

                                <Input label="Card Number" placeholder="0000 0000 0000 0000" required />
                                <div className="grid grid-cols-2 gap-4">
                                    <Input label="Expiry Date" placeholder="MM/YY" required />
                                    <Input label="CVC" placeholder="123" required />
                                </div>
                                <Input label="Cardholder Name" placeholder="Jane Doe" required />

                                <div className="flex gap-4 mt-8">
                                    <Button variant="outline" type="button" onClick={() => setStep(1)} fullWidth>Back</Button>
                                    <Button type="submit" fullWidth loading={loading}>Pay Now</Button>
                                </div>
                            </form>
                        )}
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="bg-neutral-50 p-8 rounded-sm h-fit">
                        <h3 className="text-lg font-serif font-bold mb-6">Your Order</h3>
                        <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
                            {cartItems.map((item, idx) => (
                                <div key={`${item.id}-${idx}`} className="flex gap-4">
                                    <div className="w-16 h-16 bg-white rounded-sm overflow-hidden flex-shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">{item.name}</p>
                                        <p className="text-xs text-neutral-500">Qty: {item.quantity} | {item.size}</p>
                                    </div>
                                    <p className="text-sm font-medium">${(item.price * item.quantity).toLocaleString()}</p>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-neutral-200 pt-4 space-y-2 text-sm text-neutral-600">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>${cartTotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                        </div>

                        <div className="border-t border-neutral-200 pt-4 mt-4 flex justify-between font-bold text-lg text-neutral-900">
                            <span>Total</span>
                            <span>${cartTotal.toLocaleString()}</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Checkout;
