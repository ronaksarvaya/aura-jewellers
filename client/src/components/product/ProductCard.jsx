import React from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingBag } from 'react-icons/fi';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
    return (
        <div className="group relative">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
                {/* Badge */}
                {product.isNew && (
                    <span className="absolute top-0 left-0 z-10 bg-black text-white px-3 py-1 text-[10px] uppercase font-bold tracking-widest">New</span>
                )}

                {/* Image */}
                <Link to={`/product/${product.id}`}>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-110"
                    />
                    {/* Secondary Image on Hover (Optional) */}
                    {product.hoverImage && (
                        <img
                            src={product.hoverImage}
                            alt={product.name}
                            className="absolute inset-0 h-full w-full object-cover object-center opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        />
                    )}
                </Link>

                {/* Quick Actions (Floating on bottom) */}
                <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 flex justify-center gap-2">
                    <button className="bg-white/90 backdrop-blur text-black p-3 hover:bg-black hover:text-white transition-colors duration-300 rounded-sm" title="Add to Cart">
                        <FiShoppingBag className="h-4 w-4" />
                    </button>
                    <button className="bg-white/90 backdrop-blur text-black p-3 hover:bg-black hover:text-white transition-colors duration-300 rounded-sm" title="Add to Wishlist">
                        <FiHeart className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <div className="mt-4 text-center">
                <Link to={`/product/${product.id}`}>
                    <h3 className="text-base font-medium text-charcoal hover:text-gold-600 transition-colors font-serif tracking-wide">{product.name}</h3>
                </Link>
                <p className="mt-1 text-xs text-neutral-500 uppercase tracking-wider">{product.category}</p>
                <p className="mt-2 text-sm font-bold text-charcoal">${product.price.toLocaleString()}</p>
            </div>
        </div>
    );
};

export default ProductCard;
