import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiStar, FiTruck, FiShield, FiPackage, FiHeart } from 'react-icons/fi';
import Button from '../components/common/Button';
import { motion } from 'framer-motion';

const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [selectedMetal, setSelectedMetal] = useState('18k Gold');
    const [selectedSize, setSelectedSize] = useState('6');

    // Mock Product Data
    const product = {
        id: id || 101,
        name: 'Ethereal Diamond Ring',
        price: 1250,
        rating: 4.9,
        reviews: 128,
        description: 'A masterpiece of craftsmanship, this ring features a brilliant-cut diamond set in 18k gold. Designed to capture light from every angle, it symbolizes eternal beauty and grace.',
        images: [
            'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1603561591411-cd7eb5a1b5b3?q=80&w=2069&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1629224316810-9d8805b95076?q=80&w=2070&auto=format&fit=crop',
        ],
        metals: ['18k Gold', '14k Gold', 'Platinum', 'Rose Gold'],
        sizes: ['5', '6', '7', '8', '9'],
    };

    return (
        <div className="bg-white min-h-screen py-12 md:py-24 pt-[120px]">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">

                    {/* Left: Image Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-square bg-neutral-100 overflow-hidden relative group">
                            <motion.img
                                key={selectedImage}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                src={product.images[selectedImage]}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {product.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImage(idx)}
                                    className={`aspect-square bg-neutral-100 overflow-hidden border transition-all ${selectedImage === idx ? 'border-charcoal' : 'border-transparent hover:border-neutral-300'}`}
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Product Info */}
                    <div className="flex flex-col pt-4">
                        <div className="mb-10 border-b border-neutral-100 pb-10">
                            <div className="flex items-center text-xs font-medium tracking-wide text-charcoal mb-4 uppercase">
                                <span className="text-gold-500 mr-2">New Arrival</span>
                                <span className="text-neutral-300 mx-2">|</span>
                                <div className="flex items-center text-neutral-900">
                                    <FiStar className="fill-gold-400 text-gold-400 mr-1" />
                                    <span>{product.rating}</span>
                                    <span className="text-neutral-400 ml-1">({product.reviews} reviews)</span>
                                </div>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-serif font-medium mb-6 text-charcoal leading-tight">{product.name}</h1>
                            <p className="text-2xl font-light text-charcoal mb-8">${product.price.toLocaleString()}</p>
                            <p className="text-neutral-500 leading-relaxed mb-8 font-light">
                                {product.description}
                            </p>
                        </div>

                        {/* Variants */}
                        <div className="space-y-8 mb-10">
                            <div>
                                <label className="text-xs font-bold text-charcoal uppercase tracking-widest mb-3 block">Metal</label>
                                <div className="flex flex-wrap gap-3">
                                    {product.metals.map(metal => (
                                        <button
                                            key={metal}
                                            onClick={() => setSelectedMetal(metal)}
                                            className={`px-5 py-3 border text-sm transition-all ${selectedMetal === metal ? 'border-charcoal bg-charcoal text-white' : 'border-neutral-200 text-neutral-600 hover:border-charcoal'}`}
                                        >
                                            {metal}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-charcoal uppercase tracking-widest mb-3 block">Size</label>
                                <div className="flex flex-wrap gap-3">
                                    {product.sizes.map(size => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`w-12 h-12 border text-sm flex items-center justify-center transition-all ${selectedSize === size ? 'border-charcoal bg-charcoal text-white' : 'border-neutral-200 text-neutral-600 hover:border-charcoal'}`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-10">
                            <div className="flex items-center border border-neutral-200 w-max">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-5 py-4 hover:bg-neutral-50 transition">-</button>
                                <span className="px-5 font-medium min-w-[3rem] text-center">{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)} className="px-5 py-4 hover:bg-neutral-50 transition">+</button>
                            </div>
                            <Button size="lg" className="flex-1 py-4 text-sm tracking-widest uppercase" onClick={() => addToCart(product, quantity, { size: selectedSize, metal: selectedMetal })}>
                                Add to Cart - ${(product.price * quantity).toLocaleString()}
                            </Button>
                            <button className="p-4 border border-neutral-200 hover:border-charcoal transition-colors " title="Add to Wishlist">
                                <FiHeart className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Upsell / Value Props */}
                        <div className="grid grid-cols-3 gap-4 text-center border-t border-neutral-100 pt-8">
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-12 h-12 bg-gold-50 rounded-full flex items-center justify-center text-gold-600"><FiTruck className="w-5 h-5" /></div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-charcoal/80">Free Shipping</span>
                            </div>
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-12 h-12 bg-gold-50 rounded-full flex items-center justify-center text-gold-600"><FiShield className="w-5 h-5" /></div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-charcoal/80">Lifetime Warranty</span>
                            </div>
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-12 h-12 bg-gold-50 rounded-full flex items-center justify-center text-gold-600"><FiPackage className="w-5 h-5" /></div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-charcoal/80">Premium Box</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
