import React, { useState, useRef, useEffect } from 'react';
import { FiMessageSquare, FiX, FiSend, FiMinimize2 } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../common/Button';
import Input from '../common/Input';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! Welcome to Aura Jewellery. How can I assist you today?", sender: 'bot' }
    ]);
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const userMessage = { id: Date.now(), text: inputText, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInputText('');

        // Mock Bot Response
        setTimeout(() => {
            let botText = "Thank you for your message. One of our concierges will get back to you shortly.";
            if (inputText.toLowerCase().includes('order')) {
                botText = "To track an order, please visit our Support page or provide your Order ID.";
            } else if (inputText.toLowerCase().includes('return')) {
                botText = "You can request a return within 30 days of purchase via our Support page.";
            }

            setMessages(prev => [...prev, { id: Date.now() + 1, text: botText, sender: 'bot' }]);
        }, 1000);
    };

    return (
        <>
            {/* Floating Button */}
            {!isOpen && (
                <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-50 bg-black text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                >
                    <FiMessageSquare className="w-6 h-6" />
                </motion.button>
            )}

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-6 right-6 z-50 w-80 md:w-96 bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col border border-neutral-200 h-[500px]"
                    >
                        {/* Header */}
                        <div className="bg-black text-white p-4 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <span className="font-serif font-bold">Aura Concierge</span>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="hover:text-neutral-300">
                                <FiMinimize2 />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div
                                        className={`max-w-[80%] rounded-lg p-3 text-sm ${msg.sender === 'user' ? 'bg-black text-white rounded-br-none' : 'bg-white border border-neutral-200 text-neutral-800 rounded-bl-none shadow-sm'}`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-white border-t border-neutral-100">
                            <form onSubmit={handleSend} className="flex gap-2">
                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    placeholder="Type a message..."
                                    className="flex-1 border-neutral-300 rounded-md focus:ring-black focus:border-black text-sm"
                                />
                                <button type="submit" className="bg-black text-white p-2 rounded-md hover:bg-neutral-800 transition">
                                    <FiSend />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Chatbot;
