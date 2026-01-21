import React, { useState } from 'react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { FiPackage, FiUser, FiHeart, FiLogOut } from 'react-icons/fi';

const Account = () => {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className="min-h-screen bg-neutral-50 py-12 md:py-20">
            <div className="container mx-auto px-4 md:px-6">
                <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8">My Account</h1>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Tabs */}
                    <div className="w-full md:w-64 flex-shrink-0 bg-white rounded-sm shadow-sm p-4 h-fit">
                        <div className="flex flex-col space-y-2">
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${activeTab === 'profile' ? 'bg-black text-white' : 'text-neutral-600 hover:bg-neutral-100'}`}
                            >
                                <FiUser className="w-4 h-4" /> Profile
                            </button>
                            <button
                                onClick={() => setActiveTab('orders')}
                                className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${activeTab === 'orders' ? 'bg-black text-white' : 'text-neutral-600 hover:bg-neutral-100'}`}
                            >
                                <FiPackage className="w-4 h-4" /> My Orders
                            </button>
                            <button
                                onClick={() => setActiveTab('wishlist')}
                                className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${activeTab === 'wishlist' ? 'bg-black text-white' : 'text-neutral-600 hover:bg-neutral-100'}`}
                            >
                                <FiHeart className="w-4 h-4" /> Wishlist
                            </button>
                            <div className="pt-4 border-t border-neutral-100 mt-2">
                                <button className="flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium text-red-500 hover:bg-red-50 w-full">
                                    <FiLogOut className="w-4 h-4" /> Sign Out
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-white rounded-sm shadow-sm p-8">
                        {activeTab === 'profile' && (
                            <div className="space-y-8">
                                <h2 className="text-xl font-serif font-bold border-b border-neutral-100 pb-4">Personal Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input label="First Name" defaultValue="Jane" />
                                    <Input label="Last Name" defaultValue="Doe" />
                                    <Input label="Email" defaultValue="jane@example.com" disabled />
                                    <Input label="Phone" defaultValue="+1 555 000 0000" />
                                </div>
                                <Button>Save Changes</Button>
                            </div>
                        )}

                        {activeTab === 'orders' && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-serif font-bold border-b border-neutral-100 pb-4">Order History</h2>
                                {/* Mock Order */}
                                <div className="border border-neutral-200 rounded-sm p-6">
                                    <div className="flex flex-wrap justify-between items-center mb-4 pb-4 border-b border-neutral-100">
                                        <div>
                                            <p className="font-bold">Order #AURA-4829</p>
                                            <p className="text-sm text-neutral-500">Placed on Jan 15, 2026</p>
                                        </div>
                                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase">Delivered</span>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-16 h-16 bg-neutral-100 rounded-sm overflow-hidden"><img src="https://images.unsplash.com/photo-1603561591411-cd7eb5a1b5b3?q=80&w=2069&auto=format&fit=crop" alt="" className="w-full h-full object-cover" /></div>
                                        <div>
                                            <p className="font-medium text-sm">Ethereal Diamond Ring</p>
                                            <p className="text-xs text-neutral-500">Qty: 1</p>
                                        </div>
                                        <div className="ml-auto font-medium text-sm">$1,250</div>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-neutral-100 text-right">
                                        <span className="text-sm font-medium mr-2">Total:</span>
                                        <span className="font-bold text-lg">$1,250</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'wishlist' && (
                            <div>
                                <h2 className="text-xl font-serif font-bold border-b border-neutral-100 pb-4">My Wishlist</h2>
                                <p className="text-neutral-500 mt-4">Your wishlist is empty.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;
