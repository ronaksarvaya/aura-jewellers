import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext'; // Adjust path if needed, Navbar is in layout/
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiShoppingBag, FiUser, FiHeart, FiMenu, FiX } from 'react-icons/fi';
import SearchOverlay from '../common/SearchOverlay';
import clsx from 'clsx';

const Navbar = () => {
    const { cartCount } = useCart();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
        { name: 'Collections', path: '/collections' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <>
            <header
                className={clsx(
                    'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b border-transparent',
                    isScrolled
                        ? 'bg-white/90 backdrop-blur-md shadow-sm py-4 border-neutral-100'
                        : 'bg-transparent py-6 text-white' // Text white on transparent (Hero)
                )}
            >
                <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                    {/* Mobile Menu Button */}
                    <button
                        className={clsx("md:hidden focus:outline-none", isScrolled ? "text-charcoal" : "text-white")}
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        <FiMenu className="h-6 w-6" />
                    </button>

                    {/* Logo */}
                    <Link to="/" className={clsx("text-2xl font-serif font-bold tracking-tight uppercase", isScrolled ? "text-charcoal" : "text-white")}>
                        Aura
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                className={({ isActive }) =>
                                    clsx(
                                        'text-xs font-bold tracking-[0.15em] uppercase transition-all duration-200 hover:text-gold-500',
                                        isActive
                                            ? 'text-gold-500'
                                            : (isScrolled ? 'text-charcoal' : 'text-white/90')
                                    )
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Icons */}
                    <div className={clsx("flex items-center space-x-5 transition-colors", isScrolled ? "text-charcoal" : "text-white")}>
                        <button className="hover:text-gold-500 transition-colors" onClick={() => setIsSearchOpen(true)}>
                            <FiSearch className="h-5 w-5" />
                        </button>
                        <Link to="/wishlist" className="hidden md:block hover:text-gold-500 transition-colors">
                            <FiHeart className="h-5 w-5" />
                        </Link>
                        <Link to="/account" className="hover:text-gold-500 transition-colors">
                            <FiUser className="h-5 w-5" />
                        </Link>
                        <Link to="/cart" className="relative hover:text-gold-500 transition-colors">
                            <FiShoppingBag className="h-5 w-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 bg-gold-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '-100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '-100%' }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[60] bg-white flex flex-col"
                    >
                        <div className="flex items-center justify-between p-4 border-b border-neutral-100">
                            <span className="text-xl font-serif font-bold">Menu</span>
                            <button onClick={() => setIsMobileMenuOpen(false)}>
                                <FiX className="h-6 w-6" />
                            </button>
                        </div>
                        <nav className="flex-1 flex flex-col p-6 space-y-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="text-2xl font-serif text-neutral-900"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                        <div className="p-6 border-t border-neutral-100 flex justify-center space-x-8 text-neutral-500">
                            {/* Socials or extra links */}
                            <span>Instagram</span>
                            <span>Facebook</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
};

export default Navbar;
