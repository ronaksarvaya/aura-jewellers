import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../common/Input';
import Button from '../common/Button';

const Footer = () => {
    return (
        <footer className="bg-charcoal text-white pt-20 pb-10 border-t border-neutral-900">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Link to="/" className="text-3xl font-serif font-bold mb-6 block tracking-tight">AURA</Link>
                        <p className="text-neutral-400 leading-relaxed mb-6 text-sm">
                            Crafting timeless elegance for the modern soul. Ethically sourced, intentionally designed.
                        </p>
                        <div className="flex space-x-4">
                            {/* Social Icons Placeholder */}
                            <div className="w-8 h-8 bg-neutral-800 rounded-full hover:bg-gold-500 transition-colors cursor-pointer"></div>
                            <div className="w-8 h-8 bg-neutral-800 rounded-full hover:bg-gold-500 transition-colors cursor-pointer"></div>
                            <div className="w-8 h-8 bg-neutral-800 rounded-full hover:bg-gold-500 transition-colors cursor-pointer"></div>
                        </div>
                    </div>

                    {/* Shop */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-gold-500">Shop</h4>
                        <ul className="space-y-4 text-sm text-neutral-400">
                            <li><Link to="/shop" className="hover:text-white transition-colors">All Jewellery</Link></li>
                            <li><Link to="/shop/new" className="hover:text-white transition-colors">New Arrivals</Link></li>
                            <li><Link to="/shop/rings" className="hover:text-white transition-colors">Rings</Link></li>
                            <li><Link to="/shop/necklaces" className="hover:text-white transition-colors">Necklaces</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-gold-500">Support</h4>
                        <ul className="space-y-4 text-sm text-neutral-400">
                            <li><Link to="/support" className="hover:text-white transition-colors">Contact Us</Link></li>
                            <li><Link to="/support" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
                            <li><Link to="/support" className="hover:text-white transition-colors">Care Guide</Link></li>
                            <li><Link to="/support" className="hover:text-white transition-colors">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-gold-500">Newsletter</h4>
                        <p className="text-neutral-400 text-sm mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
                        <form className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-neutral-800 border-none text-white text-sm px-4 py-3 focus:ring-1 focus:ring-gold-500 w-full rounded-sm"
                            />
                            <Button fullWidth size="sm" className="bg-white text-charcoal hover:bg-gold-500 hover:text-white">Subscribe</Button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500">
                    <p>&copy; {new Date().getFullYear()} Aura Jewellery. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
