import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const categories = [
    {
        id: 1,
        name: 'Necklaces',
        image: 'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=1974&auto=format&fit=crop',
        link: '/shop/necklaces'
    },
    {
        id: 2,
        name: 'Earrings',
        image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1974&auto=format&fit=crop',
        link: '/shop/earrings'
    },
    {
        id: 3,
        name: 'Fine Rings',
        image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2070&auto=format&fit=crop',
        link: '/shop/rings'
    }
];

const FeaturedCategories = () => {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <p className="text-sm font-medium tracking-[0.2em] mb-3 text-gold-500 uppercase">Our Collections</p>
                    <h2 className="text-4xl md:text-5xl font-serif font-medium mb-6 text-charcoal">Curated Excellence</h2>
                    <div className="w-20 h-px bg-gold-300 mx-auto" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {categories.map((cat, index) => (
                        <motion.div
                            key={cat.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
                            className="group relative h-[500px] overflow-hidden cursor-pointer"
                        >
                            <Link to={cat.link} className="block w-full h-full">
                                <div className="absolute inset-0 bg-neutral-200">
                                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:bg-black/40 transition-colors duration-500" />
                                <div className="absolute bottom-8 left-8 text-white z-10">
                                    <h3 className="text-3xl font-serif font-light mb-2">{cat.name}</h3>
                                    <span className="inline-block text-xs font-bold tracking-widest uppercase border-b border-white pb-1 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                        Explore Collection
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedCategories;
