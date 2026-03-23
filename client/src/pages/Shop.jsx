import React, { useState, useEffect } from 'react';

import FilterSidebar from '../components/shop/FilterSidebar';
import ProductCard from '../components/product/ProductCard';
import { FiFilter, FiX } from 'react-icons/fi';
import Button from '../components/common/Button';

// Mock Data with Reliable Images
const WOMENS_PRODUCTS = [
    { id: 'p1', name: 'Ethereal Diamond Ring', category: 'Rings', price: 1250, image: 'https://images.unsplash.com/photo-1589674668791-4889d2bba4c6?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', isNew: true },
    { id: 'p2', name: 'Golden Sun Necklace', category: 'Necklaces', price: 890, image: 'https://images.unsplash.com/photo-1610223515982-5bae48b7c2c2?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', isNew: true },
    { id: 'p3', name: 'Pearl Drop Earrings', category: 'Earrings', price: 450, image: 'https://plus.unsplash.com/premium_photo-1695792938561-e1123658a0ae?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', isNew: false },
    { id: 'p4', name: 'Sapphire Bracelet', category: 'Bracelets', price: 1500, image: 'https://images.unsplash.com/photo-1770722272510-ef28c6f57541?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', isNew: false },
    { id: 'p5', name: 'Vintage Gold Band', category: 'Rings', price: 650, image: 'https://images.unsplash.com/photo-1622398925373-3f91b1e275f5?q=80&w=874&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', isNew: false },
    { id: 'p6', name: 'Crystal Studs', category: 'Earrings', price: 220, image: 'https://images.unsplash.com/photo-1769078595478-5f756986b818?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', isNew: false },
    { id: 'p7', name: 'Rose Gold Pendant', category: 'Necklaces', price: 540, image: 'https://images.unsplash.com/photo-1631965004544-1762fc696476?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', isNew: false },
    { id: 'p8', name: 'Emerald Cut Ring', category: 'Rings', price: 2100, image: 'https://images.unsplash.com/photo-1685970732254-d2d1f43ddc7c?q=80&w=776&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', isNew: true }
];

const MENS_PRODUCTS = [
    { id: 'm1', name: "Men's Classic Platinum Band", category: "Rings", price: 2500, image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", isNew: true },
    { id: 'm2', name: "Men's Onyx Signet Ring", category: "Rings", price: 1200, image: "https://images.unsplash.com/photo-1612285127364-58ede3fa1686?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", isNew: false },
    { id: 'm3', name: "Men's Solid Gold Cuban Chain", category: "Necklaces", price: 1720, image: "https://plus.unsplash.com/premium_photo-1678730056371-eff9c5356a48?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", isNew: true },
    { id: 'm4', name: "Men's Leather & Silver Anchor Bracelet", category: "Bracelets", price: 1300, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070&auto=format&fit=crop", isNew: false },
];

const Shop = () => {
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [products, setProducts] = useState([]);
    const [genderMode, setGenderMode] = useState('All');

    useEffect(() => {
        const fetchProducts = () => {
            if (genderMode === 'Men') {
                setProducts(MENS_PRODUCTS);
            } else if (genderMode === 'Women') {
                setProducts(WOMENS_PRODUCTS);
            } else {
                // All
                setProducts([...WOMENS_PRODUCTS, ...MENS_PRODUCTS]);
            }
        };

        fetchProducts();
    }, [genderMode]);

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
                        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-8">
                            {/* Left Side: Gender Filter & Product Count */}
                            <div className="flex flex-col md:flex-row md:items-center gap-4">
                                <p className="text-neutral-500 text-sm hidden md:block">
                                    {products.length} Products
                                </p>
                                {/* Gender Switcher */}
                                <div className="flex bg-neutral-100 p-1 rounded-sm w-full md:w-auto mt-2 md:mt-0">
                                    <button
                                        className={`flex-1 md:flex-none px-6 py-1.5 text-sm font-medium rounded-sm transition-all duration-200 ${genderMode === 'All' ? 'bg-white shadow-sm text-black' : 'text-neutral-500 hover:text-black hover:bg-white/50'}`}
                                        onClick={() => setGenderMode('All')}
                                    >
                                        All
                                    </button>
                                    <button
                                        className={`flex-1 md:flex-none px-6 py-1.5 text-sm font-medium rounded-sm transition-all duration-200 ${genderMode === 'Men' ? 'bg-white shadow-sm text-black' : 'text-neutral-500 hover:text-black hover:bg-white/50'}`}
                                        onClick={() => setGenderMode('Men')}
                                    >
                                        Men
                                    </button>
                                    <button
                                        className={`flex-1 md:flex-none px-6 py-1.5 text-sm font-medium rounded-sm transition-all duration-200 ${genderMode === 'Women' ? 'bg-white shadow-sm text-black' : 'text-neutral-500 hover:text-black hover:bg-white/50'}`}
                                        onClick={() => setGenderMode('Women')}
                                    >
                                        Women
                                    </button>
                                </div>
                            </div>

                            {/* Right Side: Filters & Sort */}
                            <div className="flex items-center justify-between md:justify-end gap-4">
                                {/* Mobile Filter Button */}
                                <button
                                    className="lg:hidden flex items-center gap-2 text-sm font-medium"
                                    onClick={() => setShowMobileFilters(true)}
                                >
                                    <FiFilter /> Filters
                                </button>
                                {/* Mobile Product Count */}
                                <p className="md:hidden text-neutral-500 text-sm">{products.length} Products</p>

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
                            {products.length === 0 ? (
                                <div className="col-span-full py-12 text-center text-neutral-500">
                                    No products found.
                                </div>
                            ) : (
                                products.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))
                            )}
                        </div>

                       
                    </div>
                </div>
            </div>

            {/* Mobile Filters Modal */}
            {
                showMobileFilters && (
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
                )
            }
        </div >
    );
};

export default Shop;
