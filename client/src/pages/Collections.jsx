import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const COLLECTIONS = [
    {
        id: 1,
        name: 'Bridal Collection',
        description: 'Timeless pieces for your unforgettable day.',
        image: 'https://images.unsplash.com/photo-1704136404616-0fe61c322633?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        link: '/shop'
    },
    {
        id: 2,
        name: "Men's Essentials",
        description: 'Bold, masculine designs crafted for the modern gentleman.',
        image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070&auto=format&fit=crop',
        link: '/shop'
    },
    {
        id: 3,
        name: 'Everyday Elegance',
        description: 'Subtle luxury designed to be worn daily.',
        image: 'https://images.unsplash.com/photo-1601821765780-754fa98637c1?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        link: '/shop'
    },
];

const Collections = () => {
    return (
        <div className="min-h-screen bg-white pb-20 pt-[80px]">
            {/* Header */}
            <div className="bg-charcoal py-20 md:py-32 mb-12 text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1573408301145-b98c46544ea0?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-sm font-medium tracking-[0.2em] text-gold-500 uppercase mb-4"
                    >
                        Explore Our World
                    </motion.p>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-4xl md:text-6xl font-serif font-medium mb-6"
                    >
                        Curated Collections
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-white/70 max-w-2xl mx-auto leading-relaxed text-lg"
                    >
                        Every collection is a distinct expression of our heritage, craftsmanship, and commitment to timeless beauty. Find the pieces that speak to your soul.
                    </motion.p>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {COLLECTIONS.map((collection, index) => (
                        <motion.div
                            key={collection.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: (index % 3) * 0.1, ease: "easeOut" }}
                            className="group relative h-[450px] md:h-[550px] overflow-hidden rounded-sm"
                        >
                            <Link to={collection.link} className="block w-full h-full">
                                <div className="absolute inset-0 bg-neutral-200">
                                    <img 
                                        src={collection.image} 
                                        alt={collection.name} 
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:bg-black/40 transition-colors duration-500" />
                                <div className="absolute bottom-10 left-8 right-8 text-white z-10 text-center">
                                    <h3 className="text-3xl font-serif font-light mb-3">{collection.name}</h3>
                                    <p className="text-sm text-white/80 mb-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                                        {collection.description}
                                    </p>
                                    <span className="inline-block text-xs font-bold tracking-widest uppercase border-b border-gold-500 text-gold-500 pb-1 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200 hover:text-white hover:border-white">
                                        Discover
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
                
                {/* Brand Story Snippet */}
                <div className="mt-32 mb-16 text-center max-w-3xl mx-auto">
                    <div className="w-12 h-px bg-gold-400 mx-auto mb-8"></div>
                    <h2 className="text-3xl font-serif text-charcoal mb-6">A Legacy of Light</h2>
                    <p className="text-neutral-500 leading-relaxed">
                        At Aura, we believe that true luxury lies in the details. From the initial sketch to the final polish, our artisans pour their passion into creating heirloom-quality jewelry designed to illuminate your most precious moments.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Collections;
