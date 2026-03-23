import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import axios from 'axios';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            let url = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/contact` : 'http://localhost:5000/api/contact';
            await axios.post(url, formData);
            alert('Thank you for reaching out to us. We will get back to you shortly.');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was an issue sending your message. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-white pb-20 pt-[80px]">
            {/* Header */}
            <div className="bg-gold-50/50 py-16 md:py-24 mb-12 border-b border-gold-100">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <p className="text-sm font-medium tracking-[0.2em] text-gold-600 uppercase mb-4">Get In Touch</p>
                    <h1 className="text-4xl md:text-6xl font-serif font-medium mb-6 text-charcoal">Contact Us</h1>
                    <p className="text-neutral-500 max-w-2xl mx-auto leading-relaxed">
                        Whether you have a question about an existing fine jewelry piece, want to consult about a custom engagement ring, or simply want to say hello, we are here for you.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
                    {/* Contact Info */}
                    <div className="w-full lg:w-1/3">
                        <h2 className="text-2xl font-serif font-medium mb-8 text-charcoal">We are here to help</h2>
                        
                        <div className="space-y-10">
                            <div className="flex items-start gap-4">
                                <div className="mt-1 bg-neutral-100 p-3 rounded-full text-gold-600">
                                    <FiMapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm tracking-widest uppercase mb-2">Our Boutique</h3>
                                    <p className="text-neutral-500 text-sm leading-relaxed">
                                        123 Diamond Avenue<br />
                                        Bandra<br />
                                        Mumbai
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-4">
                                <div className="mt-1 bg-neutral-100 p-3 rounded-full text-gold-600">
                                    <FiPhone className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm tracking-widest uppercase mb-2">Phone</h3>
                                    <p className="text-neutral-500 text-sm mb-1">99999 99999</p>
                                    <p className="text-neutral-400 text-xs">Mon-Sat, 10am - 8pm EST</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-4">
                                <div className="mt-1 bg-neutral-100 p-3 rounded-full text-gold-600">
                                    <FiMail className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm tracking-widest uppercase mb-2">Email</h3>
                                    <p className="text-neutral-500 text-sm">adina@aurajewellers.com</p>
                                </div>
                            </div>
                        </div>

                       
                    </div>

                    {/* Contact Form */}
                    <div className="w-full lg:w-2/3">
                        <div className="bg-white border border-neutral-200 p-8 md:p-12 rounded-sm shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-50 rounded-bl-[100px] -z-10"></div>
                            
                            <h2 className="text-2xl font-serif font-medium mb-8">Send a Message</h2>
                            
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-900 mb-1">Full Name</label>
                                        <input 
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full border border-neutral-300 rounded-sm px-4 py-2 text-sm focus:outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal transition-colors bg-neutral-50/50"
                                            placeholder="Jane Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-900 mb-1">Email Address</label>
                                        <input 
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full border border-neutral-300 rounded-sm px-4 py-2 text-sm focus:outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal transition-colors bg-neutral-50/50"
                                            placeholder="jane@example.com"
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-neutral-900 mb-1">Subject</label>
                                    <select 
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full border border-neutral-300 rounded-sm px-4 py-2 text-sm focus:outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal transition-colors bg-neutral-50/50 cursor-pointer"
                                    >
                                        <option value="">Select a subject...</option>
                                        <option value="Customer Service">Customer Service & Care</option>
                                        <option value="Bespoke/Custom Design">Bespoke & Custom Design</option>
                                        <option value="Order Status">Order Status Inquiry</option>
                                        <option value="Press/Partnership">Press or Partnership</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-neutral-900">Your Message</label>
                                    <textarea 
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-neutral-300 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal transition-colors bg-neutral-50/50 min-h-[150px] resize-y"
                                        placeholder="How can we help you today?"
                                    />
                                </div>
                                
                                <div className="pt-4">
                                    <Button type="submit" className="w-full sm:w-auto px-10" disabled={isSubmitting}>
                                        {isSubmitting ? 'Sending...' : 'Send Message'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Map Placeholder */}
            <div className="w-full h-96 mt-24 bg-neutral-200 relative">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center grayscale mix-blend-multiply opacity-60"></div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-white p-4 shadow-xl rounded-full animate-bounce">
                        <FiMapPin className="w-6 h-6 text-charcoal" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
