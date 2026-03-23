import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiHeart, FiTrendingUp } from 'react-icons/fi';

const About = () => {
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <div className="min-h-screen bg-neutral-50 pt-24 pb-12">
            {/* Hero Section */}
            <section className="container mx-auto px-4 md:px-6 mb-16 md:mb-24">
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className="max-w-4xl mx-auto text-center"
                >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-charcoal mb-6">
                        Crafting Timeless Elegance
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-600 leading-relaxed font-light">
                        At Aura Jewellers, we believe that every piece of jewelry tells a unique story. 
                        Since our inception, we have been dedicated to creating exquisite pieces that 
                        celebrate life's most precious moments.
                    </p>
                </motion.div>
            </section>

            {/* Our Story */}
            <section className="bg-white py-16 md:py-24 mb-16 md:mb-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-3xl mx-auto text-center">
                        <motion.h2 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeIn}
                            className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-8"
                        >
                            Our Heritage
                        </motion.h2>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeIn}
                            className="space-y-6 text-neutral-600 leading-relaxed"
                        >
                            <p>
                                What started as a small, passionate endeavor has blossomed into a hallmark of luxury 
                                and trust. Aura Jewellers was founded on the principle that luxury should be an experience, 
                                an emotion that you carry with you.
                            </p>
                            <p>
                                We source only the finest materials—ethically mined diamonds, vibrant gemstones, and 
                                premium metals. Our master artisans blend traditional techniques with modern aesthetics 
                                to create jewelry that isn't just worn, but cherished for generations.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal">Our Values</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: <FiAward className="h-8 w-8" />,
                            title: "Uncompromising Quality",
                            description: "Every piece undergoes rigorous quality checks to ensure perfection in every detail, from the cut of the stone to the polish of the metal."
                        },
                        {
                            icon: <FiHeart className="h-8 w-8" />,
                            title: "Ethical Sourcing",
                            description: "We are committed to sustainability. Our diamonds and gemstones are conflict-free, ensuring peace of mind with your purchase."
                        },
                        {
                            icon: <FiTrendingUp className="h-8 w-8" />,
                            title: "Master Craftsmanship",
                            description: "Our artisans possess decades of experience, pouring their passion and precision into bringing each unique design to life."
                        }
                    ].map((value, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="bg-white p-8 rounded-xl shadow-sm border border-neutral-100 text-center hover:shadow-md transition-shadow"
                        >
                            <div className="w-16 h-16 bg-gold-50 text-gold-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                {value.icon}
                            </div>
                            <h3 className="text-xl font-serif font-bold text-charcoal mb-4">{value.title}</h3>
                            <p className="text-neutral-600 leading-relaxed font-light">{value.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default About;
