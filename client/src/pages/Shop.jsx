import React, { useState } from 'react';
import FilterSidebar from '../components/shop/FilterSidebar';
import ProductCard from '../components/product/ProductCard';
import { FiFilter, FiX } from 'react-icons/fi';
import Button from '../components/common/Button';

// Mock Data with Reliable Images
const PRODUCTS = [
    { id: 1, name: 'Ethereal Diamond Ring', category: 'Rings', price: 1250, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2070&auto=format&fit=crop', isNew: true },
    { id: 2, name: 'Golden Sun Necklace', category: 'Necklaces', price: 890, image: 'https://images.unsplash.com/photo-1599643477877-5313557d80fe?q=80&w=1974&auto=format&fit=crop', isNew: true },
    { id: 3, name: 'Pearl Drop Earrings', category: 'Earrings', price: 450, image: 'https://images.unsplash.com/photo-1535632787350-4e48bc094aa9?q=80&w=1974&auto=format&fit=crop', isNew: false },
    { id: 4, name: 'Sapphire Bracelet', category: 'Bracelets', price: 1500, image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070&auto=format&fit=crop', isNew: false },
    { id: 5, name: 'Vintage Gold Band', category: 'Rings', price: 650, image: 'https://images.unsplash.com/photo-1603561591411-cd7eb5a1b5b3?q=80&w=2069&auto=format&fit=crop', isNew: false },
    { id: 6, name: 'Crystal Studs', category: 'Earrings', price: 220, image: 'https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=2070&auto=format&fit=crop', isNew: false },
];

const Shop = () => {
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    return (
        <div className="min-h-screen bg-white pb-20 pt-[80px]">
            {/* Header */}
            <div className="bg-gold-50/50 py-16 md:py-24 mb-12 border-b border-gold-100">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <p className="text-sm font-medium tracking-[0.2em] text-gold-600 uppercase mb-4">The Collection</p>
                    <h1 className="text-4xl md:text-6xl font-serif font-medium mb-6 text-charcoal">Shop All Jewellery</h1>
                    <p className="text-neutral-500 max-w-2xl mx-auto leading-relaxed">
                        Discover our complete collection of handcrafted heirlooms. Each piece tells a story of elegance and timeless beauty.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:block w-64 flex-shrink-0">
                        <FilterSidebar />
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Toolbar */}
                        <div className="flex items-center justify-between mb-8">
                            <p className="text-neutral-500 text-sm">{PRODUCTS.length} Products</p>
                            <div className="flex items-center gap-4">
                                {/* Mobile Filter Button */}
                                <button
                                    className="lg:hidden flex items-center gap-2 text-sm font-medium"
                                    onClick={() => setShowMobileFilters(true)}
                                >
                                    <FiFilter /> Filters
                                </button>

                                {/* Sort Dropdown (Simple) */}
                                <select className="text-sm border-none focus:ring-0 bg-transparent font-medium cursor-pointer">
                                    <option>Sort by: Featured</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                    <option>Newest</option>
                                </select>
                            </div>
                        </div>

                        {/* Product Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                            {PRODUCTS.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {/* Pagination (Simple) */}
                        <div className="mt-16 flex justify-center">
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" disabled>Previous</Button>
                                <Button variant="primary" size="sm" className="w-10 h-10 p-0 flex items-center justify-center">1</Button>
                                <Button variant="outline" size="sm" className="w-10 h-10 p-0 flex items-center justify-center border-transparent hover:bg-neutral-100">2</Button>
                                <Button variant="outline" size="sm" className="w-10 h-10 p-0 flex items-center justify-center border-transparent hover:bg-neutral-100">3</Button>
                                <Button variant="outline" size="sm">Next</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Filters Modal */}
            {showMobileFilters && (
                <div className="fixed inset-0 z-50 flex lg:hidden">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilters(false)} />
                    <div className="relative w-[80%] max-w-sm ml-auto bg-white h-full shadow-2xl overflow-y-auto">
                        <div className="p-6 flex items-center justify-between border-b border-neutral-100">
                            <h3 className="text-xl font-serif font-bold">Filters</h3>
                            <button onClick={() => setShowMobileFilters(false)}><FiX className="h-6 w-6" /></button>
                        </div>
                        <div className="p-6">
                            <FilterSidebar />
                            <div className="mt-8 pt-6 border-t border-neutral-100">
                                <Button fullWidth onClick={() => setShowMobileFilters(false)}>Show Results</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Shop;
