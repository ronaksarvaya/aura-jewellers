import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedCategories from '../components/home/FeaturedCategories';
import ProductCard from '../components/product/ProductCard';
import Button from '../components/common/Button';
import { motion } from 'framer-motion';

// Mock Data for New Arrivals
const newArrivals = [
    { id: 101, name: 'Ethereal Diamond Ring', category: 'Rings', price: 1250, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2070&auto=format&fit=crop', isNew: true },
    { id: 102, name: 'Golden Sun Necklace', category: 'Necklaces', price: 890, image: 'https://images.unsplash.com/photo-1599643477877-5313557d80fe?q=80&w=1974&auto=format&fit=crop', isNew: true },
    { id: 103, name: 'Pearl Drop Earrings', category: 'Earrings', price: 450, image: 'https://images.unsplash.com/photo-1535632787350-4e48bc094aa9?q=80&w=1974&auto=format&fit=crop', isNew: true },
    { id: 104, name: 'Sapphire Bracelet', category: 'Bracelets', price: 1500, image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070&auto=format&fit=crop', isNew: false },
];

const Home = () => {
    return (
        <>
            <Hero />
            <FeaturedCategories />

            {/* New Arrivals Section */}
            <section className="py-24 bg-gold-50/30">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-12 border-b border-gold-200 pb-6">
                        <div>
                            <span className="text-sm font-medium tracking-[0.2em] text-gold-600 uppercase mb-2 block">Latest Collection</span>
                            <h2 className="text-3xl md:text-5xl font-serif font-medium text-charcoal">New Arrivals</h2>
                        </div>
                        <Button variant="outline" className="mt-4 md:mt-0 border-charcoal text-charcoal hover:bg-charcoal hover:text-white">View All</Button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {newArrivals.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust/Why Us Section */}
            <section className="py-24 bg-charcoal text-white text-center">
                <div className="container mx-auto px-4 md:px-6">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-16">The Aura Promise</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                        <div className="group">
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl group-hover:bg-gold-500 transition-colors duration-500">✨</div>
                            <h3 className="text-xl font-serif mb-3">Authentic Beauty</h3>
                            <p className="text-white/60 text-sm leading-relaxed">Every stone is globally certified and ethically sourced, ensuring peace of mind with every purchase.</p>
                        </div>
                        <div className="group">
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl group-hover:bg-gold-500 transition-colors duration-500">🛠️</div>
                            <h3 className="text-xl font-serif mb-3">Lifetime Warranty</h3>
                            <p className="text-white/60 text-sm leading-relaxed">We stand firmly by our craftsmanship, offering lifetime repairs and complimentary maintenance.</p>
                        </div>
                        <div className="group">
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl group-hover:bg-gold-500 transition-colors duration-500">🎁</div>
                            <h3 className="text-xl font-serif mb-3">Premium Packaging</h3>
                            <p className="text-white/60 text-sm leading-relaxed">Unboxing is an experience. Each piece arrives in our signature scented box, ready for gifting.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
