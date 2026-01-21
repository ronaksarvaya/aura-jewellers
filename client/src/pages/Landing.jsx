import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';

const Landing = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (isAuthenticated) {
            navigate('/home');
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="min-h-screen text-white relative overflow-hidden flex flex-col" style={{ backgroundColor: '#1a1a1a' }}>
            {/* Background Video/Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1531995811006-35cb42e1a022?q=80&w=2070&auto=format&fit=crop"
                    alt="Aura Background"
                    className="w-full h-full object-cover opacity-40 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </div>

            {/* Simple Header */}
            <header className="relative z-10 container mx-auto px-6 py-8 flex justify-between items-center">
                <div className="text-2xl font-serif font-bold tracking-widest uppercase text-white">Aura</div>
                <Link to="/login" className="text-sm font-medium tracking-widest uppercase hover:text-gold-400 transition-colors text-white">
                    Sign In
                </Link>
            </header>

            {/* Main Content */}
            <main className="relative z-10 flex-grow flex flex-col justify-center items-center text-center px-4">
                <div>
                    <p className="text-gold-400 text-xs md:text-sm tracking-[0.4em] uppercase mb-6">Enter the Realm of</p>
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-medium mb-8 tracking-tighter text-white">
                        Exquisite <br /> <span className="italic font-light text-white/80">Luxury</span>
                    </h1>
                    <p className="max-w-md mx-auto text-neutral-400 mb-12 leading-relaxed">
                        Join our exclusive community to access handcrafted heirlooms, personalized gifts, and a shopping experience like no other.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link to="/register">
                            <Button size="lg" className="bg-gold-500 text-white hover:bg-gold-600 border-none px-12 py-4 tracking-widest min-w-[200px]">
                                Join Now
                            </Button>
                        </Link>
                        <Link to="/admin">
                            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-12 py-4 tracking-widest min-w-[200px]">
                                Admin Portal
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>

            {/* Footer Minimal */}
            <footer className="relative z-10 py-8 text-center text-neutral-600 text-xs uppercase tracking-widest">
                &copy; {new Date().getFullYear()} Aura Jewellery. All rights reserved.
            </footer>
        </div>
    );
};

export default Landing;
