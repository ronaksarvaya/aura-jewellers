import React from 'react';

const Admin = () => {
    return (
        <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
            <div className="bg-white p-8 shadow-lg rounded-lg text-center">
                <h1 className="text-3xl font-serif font-bold text-charcoal mb-4">Admin Dashboard</h1>
                <p className="text-neutral-500 mb-6">Restricted Access. Admin features coming soon.</p>
                <a href="/" className="text-gold-600 hover:text-gold-700 font-medium underline">Return Home</a>
            </div>
        </div>
    );
};

export default Admin;
