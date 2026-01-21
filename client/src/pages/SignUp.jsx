import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const SignUp = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        // Mock register
        register({ email: 'jane@example.com', firstName: 'Jane', lastName: 'Doe' });
        navigate('/home');
    };

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
            {/* Left: Image */}
            <div className="hidden md:block relative bg-neutral-900">
                <img
                    src="https://images.unsplash.com/photo-1531995811006-35cb42e1a022?q=80&w=2070&auto=format&fit=crop"
                    alt="Jewellery Art"
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute bottom-10 left-10 text-white max-w-sm">
                    <h2 className="text-4xl font-serif font-bold mb-4">Begin Your Journey</h2>
                    <p className="text-lg">Create an account to access exclusive collections and benefits.</p>
                </div>
            </div>

            {/* Right: Form */}
            <div className="flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md">
                    <h1 className="text-3xl font-serif font-bold mb-2">Create Account</h1>
                    <p className="text-neutral-500 mb-8">Enter your details to register.</p>

                    <form className="space-y-6" onSubmit={handleRegister}>
                        <div className="grid grid-cols-2 gap-4">
                            <Input label="First Name" placeholder="Jane" />
                            <Input label="Last Name" placeholder="Doe" />
                        </div>
                        <Input label="Email" type="email" placeholder="jane@example.com" />
                        <Input label="Password" type="password" placeholder="••••••••" />
                        <Input label="Confirm Password" type="password" placeholder="••••••••" />

                        <div className="flex items-center space-x-2 text-sm">
                            <input type="checkbox" className="rounded border-neutral-300 text-black focus:ring-black" required />
                            <span className="text-neutral-500">I agree to the <a href="#" className="underline text-black">Terms of Service</a> and <a href="#" className="underline text-black">Privacy Policy</a>.</span>
                        </div>

                        <Button fullWidth size="lg">Sign Up</Button>
                    </form>

                    <div className="mt-8 text-center text-sm text-neutral-500">
                        Already have an account? <Link to="/login" className="font-medium text-black hover:underline">Sign in</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
