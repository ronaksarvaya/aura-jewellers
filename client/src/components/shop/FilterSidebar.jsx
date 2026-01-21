import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const FilterSection = ({ title, options }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="border-b border-neutral-200 py-6 last:border-0">
            <button
                className="flex items-center justify-between w-full text-left font-medium text-neutral-900 mb-2 focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{title}</span>
                {isOpen ? <FiChevronUp /> : <FiChevronDown />}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="pt-2 space-y-2">
                            {options.map((option) => (
                                <label key={option} className="flex items-center space-x-3 cursor-pointer group">
                                    <div className="relative flex items-center">
                                        <input type="checkbox" className="peer h-4 w-4 border-neutral-300 rounded text-black focus:ring-black" />
                                    </div>
                                    <span className="text-sm text-neutral-600 group-hover:text-black transition-colors">{option}</span>
                                </label>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FilterSidebar = () => {
    return (
        <div className="w-full">
            <h3 className="text-lg font-serif font-bold mb-6">Filters</h3>
            <FilterSection
                title="Category"
                options={['Necklaces', 'Earrings', 'Rings', 'Bracelets', 'Sets', 'Anklets']}
            />
            <FilterSection
                title="Metal"
                options={['Gold (18k)', 'Gold (14k)', 'Rose Gold', 'Silver', 'Platinum']}
            />
            <FilterSection
                title="Price"
                options={['Under $100', '$100 - $500', '$500 - $1,000', '$1,000 - $5,000', 'Over $5,000']}
            />
            <FilterSection
                title="Stone"
                options={['Diamond', 'Sapphire', 'Emerald', 'Ruby', 'Pearl', 'Opal']}
            />
        </div>
    );
};

export default FilterSidebar;
