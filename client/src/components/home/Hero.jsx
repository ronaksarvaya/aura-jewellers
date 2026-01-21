import React from 'react';
import { motion } from 'framer-motion';
import Button from '../common/Button';

const Hero = () => {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-stone-900">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10, ease: "easeOut" }}
                    className="w-full h-full"
                >
                    <img
                        src="https://images.unsplash.com/photo-1629224316810-9d8805b95076?q=80&w=2070&auto=format&fit=crop"
                        alt="Aura Jewellery Hero"
                        className="w-full h-full object-cover opacity-80"
                    />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
            </div>

            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto text-white">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <p className="text-xs md:text-sm font-medium tracking-[0.3em] mb-6 uppercase text-gold-200">
                        Timeless Sophistication
                    </p>
                    <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif font-medium mb-8 leading-tight tracking-tight">
                        Elegance <span className="italic font-light text-gold-100">Redefined</span>
                    </h1>
                    <p className="max-w-lg mx-auto text-neutral-200 text-lg md:text-xl mb-10 font-light leading-relaxed">
                        Discover a collection where artistry meets eternity. Handcrafted with precision for the modern muse.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Button size="lg" className="bg-white text-black hover:bg-gold-50 border-none px-10 py-4 text-sm tracking-widest uppercase">
                            Shop Collection
                        </Button>
                        <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-10 py-4 text-sm tracking-widest uppercase">
                            View Lookbook
                        </Button>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
            >
                <span className="text-[10px] uppercase tracking-widest">Scroll</span>
                <div className="w-px h-12 bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
            </motion.div>
        </section>
    );
};

export default Hero;
