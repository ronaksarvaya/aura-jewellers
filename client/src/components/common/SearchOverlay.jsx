import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiSearch, FiArrowRight } from 'react-icons/fi';

const SearchOverlay = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            // Focus input logic could go here
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-[60] bg-white/95 backdrop-blur-sm flex flex-col pt-20 px-4 md:px-20"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 hover:bg-neutral-100 rounded-full transition-colors"
                    >
                        <FiX className="w-8 h-8 text-neutral-900" />
                    </button>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="max-w-4xl mx-auto w-full"
                    >
                        <div className="relative border-b-2 border-neutral-900">
                            <FiSearch className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 text-neutral-400" />
                            <input
                                type="text"
                                placeholder="Search for jewellery..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full bg-transparent py-4 pl-12 pr-4 text-3xl md:text-5xl font-serif placeholder:text-neutral-300 focus:outline-none"
                                autoFocus
                            />
                        </div>

                        {query && (
                            <div className="mt-8">
                                <p className="text-sm text-neutral-500 mb-4 uppercase tracking-wide">Suggestions</p>
                                <div className="space-y-4">
                                    {['Diamond Ring', 'Gold Necklace', 'Stud Earrings'].map(item => (
                                        <div key={item} className="flex items-center justify-between group cursor-pointer border-b border-neutral-100 pb-4">
                                            <span className="text-xl group-hover:pl-4 transition-all duration-300">{item}</span>
                                            <FiArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SearchOverlay;
