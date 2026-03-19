import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const SignUp = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(''); // clear error when typing
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
            return setError('Please fill in all fields.');
        }

        if (formData.password !== formData.confirmPassword) {
            return setError('Passwords do not match.');
        }

        setIsSubmitting(true);
        const result = await register(formData);
        
        if (result.success) {
            navigate('/home');
        } else {
            setError(result.error);
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
            <div className="hidden md:block relative bg-neutral-900">
                <img src="https://images.unsplash.com/photo-1599643478524-fb66f7f6f4ea?q=80&w=2070&auto=format&fit=crop" alt="Jewellery Craft" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-10 left-10 text-white max-w-sm">
                    <h2 className="text-4xl font-serif font-bold mb-4">Crafted for You</h2>
                    <p className="text-lg">Create an account to track orders, save favorites, and receive exclusive offers.</p>
                </div>
            </div>

            <div className="flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md">
                    <h1 className="text-3xl font-serif font-bold mb-2">Create Account</h1>
                    <p className="text-neutral-500 mb-8">Join Aura Jewellers today.</p>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm transition-all">
                            {error}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleRegister}>
                        <div className="grid grid-cols-2 gap-4">
                            <Input label="First Name" type="text" name="firstName" placeholder="Jane" value={formData.firstName} onChange={handleChange} />
                            <Input label="Last Name" type="text" name="lastName" placeholder="Doe" value={formData.lastName} onChange={handleChange} />
                        </div>
                        <Input label="Email" type="email" name="email" placeholder="jane@example.com" value={formData.email} onChange={handleChange} />
                        <Input label="Password" type="password" name="password" placeholder="••••••••" value={formData.password} onChange={handleChange} />
                        <Input label="Confirm Password" type="password" name="confirmPassword" placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} />

                        <div className="text-sm text-neutral-500">
                            By creating an account, you agree to our <a href="#" className="text-black hover:underline">Terms of Service</a> and <a href="#" className="text-black hover:underline">Privacy Policy</a>.
                        </div>

                        <Button fullWidth size="lg" disabled={isSubmitting}>
                            {isSubmitting ? 'Creating Account...' : 'Create Account'}
                        </Button>
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
