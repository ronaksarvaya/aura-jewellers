import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const SignIn = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Mock login call
        login('jane@example.com', 'password');
        navigate('/home');
    };

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
            {/* Left: Image */}
            <div className="hidden md:block relative bg-neutral-900">
                <img
                    src="https://images.unsplash.com/photo-1618403088890-3d1347cbdd3d?q=80&w=2070&auto=format&fit=crop"
                    alt="Jewellery Mood"
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute bottom-10 left-10 text-white max-w-sm">
                    <h2 className="text-4xl font-serif font-bold mb-4">Timeless Beauty</h2>
                    <p className="text-lg">Join our exclusive community and discover the art of elegance.</p>
                </div>
            </div>

            {/* Right: Form */}
            <div className="flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md">
                    <h1 className="text-3xl font-serif font-bold mb-2">Welcome Back</h1>
                    <p className="text-neutral-500 mb-8">Please enter your details to sign in.</p>

                    <form className="space-y-6" onSubmit={handleLogin}>
                        <Input label="Email" type="email" placeholder="jane@example.com" defaultValue="jane@example.com" />
                        <Input label="Password" type="password" placeholder="••••••••" defaultValue="password" />

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input type="checkbox" className="rounded border-neutral-300 text-black focus:ring-black" />
                                <span className="text-neutral-500">Remember me</span>
                            </label>
                            <a href="#" className="font-medium text-black hover:underline">Forgot password?</a>
                        </div>

                        <Button fullWidth size="lg">Sign In</Button>
                    </form>

                    <div className="mt-8 text-center text-sm text-neutral-500">
                        Don't have an account? <Link to="/register" className="font-medium text-black hover:underline">Sign up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
