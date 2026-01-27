import React, { useState, useRef, useEffect } from 'react';
import { FiMessageSquare, FiX, FiSend, FiMinimize2, FiLoader } from 'react-icons/fi'; // Added FiLoader
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../common/Button';
import Input from '../common/Input';
import { chatWithAi } from '../../services/api';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! Welcome to Aura Jewellery. How can I assist you today?", sender: 'bot' }
    ]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const userText = inputText;
        const userMessage = { id: Date.now(), text: userText, sender: 'user' };

        setMessages(prev => [...prev, userMessage]);
        setInputText('');
        setIsLoading(true);

        try {
            // Map messages to Gemini history format
            // Limit history to last 10 turns to avoid token limits if necessary
            // Filter out the initial welcome message (id: 1) or any leading bot messages to ensure history starts with 'user'
            const history = messages
                .filter(msg => msg.id !== 1) // Remove initial welcome message
                .slice(-19) // Keep last ~20 messages (excluding current user message which is separate)
                .map(msg => ({
                    role: msg.sender === 'user' ? 'user' : 'model',
                    parts: [{ text: msg.text }]
                }));

            const data = await chatWithAi(userText, history);

            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: data.text,
                sender: 'bot'
            }]);
        } catch (error) {
            console.error('Chat Error:', error);
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: "I apologize, but I'm having trouble connecting at the moment. Please try again later.",
                sender: 'bot'
            }]);
        } finally {
            setIsLoading(false);
        }
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
                                        className={`max-w-[85%] rounded-lg p-3 text-sm whitespace-pre-wrap ${msg.sender === 'user' ? 'bg-black text-white rounded-br-none' : 'bg-white border border-neutral-200 text-neutral-800 rounded-bl-none shadow-sm'}`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white border border-neutral-200 p-3 rounded-lg rounded-bl-none shadow-sm">
                                        <div className="flex gap-1">
                                            <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                    </div>
                                </div>
                            )}
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
                                    disabled={isLoading}
                                    className="flex-1 border-neutral-300 rounded-md focus:ring-black focus:border-black text-sm disabled:opacity-50"
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !inputText.trim()}
                                    className="bg-black text-white p-2 rounded-md hover:bg-neutral-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? <FiLoader className="animate-spin" /> : <FiSend />}
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
