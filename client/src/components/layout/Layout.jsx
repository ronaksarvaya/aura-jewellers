import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Chatbot from '../common/Chatbot';

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow pt-[80px]"> {/* Adjust pt for navbar height */}
                {children}
            </main>
            <Footer />
            <Chatbot />
        </div>
    );
};

export default Layout;
