import React, { useState } from 'react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const Support = () => {
    const [activeTab, setActiveTab] = useState('tracking');

    return (
        <div className="min-h-screen bg-white py-12 md:py-20">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8 text-center">Customer Support</h1>

                <div className="flex justify-center mb-12 border-b border-neutral-200">
                    <button
                        onClick={() => setActiveTab('tracking')}
                        className={`px-6 py-4 font-medium text-sm transition-colors border-b-2 ${activeTab === 'tracking' ? 'border-black text-black' : 'border-transparent text-neutral-500 hover:text-black'}`}
                    >
                        Order Tracking
                    </button>
                    <button
                        onClick={() => setActiveTab('returns')}
                        className={`px-6 py-4 font-medium text-sm transition-colors border-b-2 ${activeTab === 'returns' ? 'border-black text-black' : 'border-transparent text-neutral-500 hover:text-black'}`}
                    >
                        Returns & Exchanges
                    </button>
                    <button
                        onClick={() => setActiveTab('repairs')}
                        className={`px-6 py-4 font-medium text-sm transition-colors border-b-2 ${activeTab === 'repairs' ? 'border-black text-black' : 'border-transparent text-neutral-500 hover:text-black'}`}
                    >
                        Repairs
                    </button>
                </div>

                <div className="bg-neutral-50 p-8 rounded-sm">
                    {activeTab === 'tracking' && (
                        <div className="max-w-md mx-auto text-center">
                            <h2 className="text-2xl font-serif font-bold mb-4">Track Your Order</h2>
                            <p className="text-neutral-500 mb-8">Enter your order ID and email to see the status of your shipment.</p>
                            <form className="space-y-4 text-left">
                                <Input label="Order ID" placeholder="AURA-XXXX" />
                                <Input label="Email Address" type="email" placeholder="jane@example.com" />
                                <Button fullWidth>Track Order</Button>
                            </form>
                        </div>
                    )}

                    {activeTab === 'returns' && (
                        <div className="max-w-xl mx-auto">
                            <h2 className="text-2xl font-serif font-bold mb-4">Request a Return</h2>
                            <p className="text-neutral-500 mb-8">We accept returns within 30 days of purchase. Please fill out the form below.</p>
                            <form className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <Input label="Order ID" placeholder="AURA-XXXX" />
                                    <Input label="Email" type="email" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-neutral-700 block mb-2">Reason for Return</label>
                                    <select className="w-full rounded-md border-neutral-300 p-2 text-sm">
                                        <option>Does not fit</option>
                                        <option>Quality issue</option>
                                        <option>Changed mind</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <Button fullWidth>Submit Request</Button>
                            </form>
                        </div>
                    )}

                    {activeTab === 'repairs' && (
                        <div className="max-w-xl mx-auto">
                            <h2 className="text-2xl font-serif font-bold mb-4">Jewellery Repair Service</h2>
                            <p className="text-neutral-500 mb-8">We offer lifetime repair services for all Aura Jewellery pieces.</p>
                            <form className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <Input label="Full Name" />
                                    <Input label="Email" type="email" />
                                </div>
                                <Input label="Product Name / SKU" placeholder="e.g. Diamond Ring" />
                                <div>
                                    <label className="text-sm font-medium text-neutral-700 block mb-2">Describe the Issue</label>
                                    <textarea className="w-full rounded-md border-neutral-300 p-2 text-sm h-32" placeholder="Tell us what needs fixing..."></textarea>
                                </div>
                                <Button fullWidth>Request Repair Estimate</Button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Support;
