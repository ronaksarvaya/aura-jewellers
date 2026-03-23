import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { FiCheck, FiGift } from 'react-icons/fi';
import { useHamper } from '../context/HamperContext';
import { useCart } from '../context/CartContext';

const GiftHamper = () => {
    const { saveHamper } = useHamper();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [selectedBox, setSelectedBox] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [hamperName, setHamperName] = useState('My Custom Hamper');
    const [hamperNote, setHamperNote] = useState('');

    const boxes = [
        { id: 'box-1', name: 'Signature Black Box', price: 20, image: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=2115&auto=format&fit=crop' },
        { id: 'box-2', name: 'Velvet Rose Box', price: 35, image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2040&auto=format&fit=crop' }
    ];

    const HARDCODED_PRODUCTS = [
        { id: 'p1', name: 'Ethereal Diamond Ring', price: 1250, image: 'https://images.unsplash.com/photo-1589674668791-4889d2bba4c6?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: 'p2', name: 'Golden Sun Necklace', price: 890, image:'https://images.unsplash.com/photo-1610223515982-5bae48b7c2c2?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: 'p3', name: 'Pearl Drop Earrings', price: 450, image: 'https://plus.unsplash.com/premium_photo-1695792938561-e1123658a0ae?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: 'p4', name: 'Sapphire Bracelet', price: 1500, image: 'https://images.unsplash.com/photo-1770722272510-ef28c6f57541?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: 'p5', name: 'Vintage Gold Band', price: 650, image: 'https://images.unsplash.com/photo-1622398925373-3f91b1e275f5?q=80&w=874&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: 'p6', name: 'Crystal Studs', price: 220, image: 'https://images.unsplash.com/photo-1769078595478-5f756986b818?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: 'p7', name: 'Rose Gold Pendant', price: 540, image: 'https://images.unsplash.com/photo-1631965004544-1762fc696476?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: 'p8', name: 'Emerald Cut Ring', price: 2100, image: 'https://images.unsplash.com/photo-1685970732254-d2d1f43ddc7c?q=80&w=776&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
         ];

    useEffect(() => {
        setProducts(HARDCODED_PRODUCTS);
    }, []);

    const toggleItem = (item) => {
        if (selectedItems.find(i => i.id === item.id)) {
            setSelectedItems(selectedItems.filter(i => i.id !== item.id));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };

    const calculateTotal = () => {
        return (selectedBox?.price || 0) + selectedItems.reduce((acc, i) => acc + i.price, 0);
    };

    const handleSaveHamper = () => {
        saveHamper({
            name: hamperName,
            note: hamperNote,
            box: selectedBox,
            items: selectedItems,
            totalPrice: calculateTotal(),
            image: selectedBox?.image
        });
        navigate('/account');
    };

    const handleAddToCart = () => {
        const uniqueId = 'hamper_' + Date.now();
        addToCart({
            id: uniqueId,
            name: hamperName || 'Custom Gift Hamper',
            price: calculateTotal(),
            image: selectedBox?.image || '',
            isHamper: true,
            note: hamperNote,
            items: selectedItems
        }, 1, { size: 'Custom', metal: 'Mixed' });
        navigate('/cart');
    };

    return (
        <div className="min-h-screen bg-neutral-50 py-12 md:py-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">Curate Your Gift Hamper</h1>
                    <p className="text-neutral-500">Create a personalized unboxing experience in 3 simple steps.</p>
                </div>

                {/* Progress Steps */}
                <div className="flex justify-center mb-12">
                    <div className="flex items-center space-x-4">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-black text-white' : 'bg-neutral-200 text-neutral-500'}`}>1</span>
                        <div className="w-12 h-px bg-neutral-200" />
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-black text-white' : 'bg-neutral-200 text-neutral-500'}`}>2</span>
                        <div className="w-12 h-px bg-neutral-200" />
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-black text-white' : 'bg-neutral-200 text-neutral-500'}`}>3</span>
                    </div>
                </div>

                <div className="bg-white rounded-sm shadow-sm p-4 md:p-8 max-w-5xl mx-auto">
                    {step === 1 && (
                        <div>
                            <h2 className="text-2xl font-serif font-bold mb-6 text-center">Select Your Packaging</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {boxes.map(box => (
                                    <div
                                        key={box.id}
                                        className={`cursor-pointer border rounded-sm overflow-hidden transition-all duration-300 ${selectedBox?.id === box.id ? 'border-charcoal ring-1 ring-charcoal shadow-md scale-[1.02]' : 'border-transparent bg-white hover:shadow-lg'}`}
                                        onClick={() => setSelectedBox(box)}
                                    >
                                        <div className="h-64 bg-neutral-100 overflow-hidden">
                                            <img src={box.image} alt={box.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                                        </div>
                                        <div className="p-4 text-center">
                                            <h3 className="font-bold text-lg">{box.name}</h3>
                                            <p className="text-neutral-500">+₹{box.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 flex justify-end">
                                <Button onClick={() => setStep(2)} disabled={!selectedBox}>Next: Select Jewellery</Button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div>
                            <h2 className="text-2xl font-serif font-bold mb-6 text-center">Select Jewellery Items</h2>
                            {products.length === 0 ? (
                                <p className="text-center py-8 text-neutral-500">Loading mastercrafted pieces...</p>
                            ) : (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                                    {products.map(product => {
                                        const isSelected = selectedItems.find(i => i.id === product.id);
                                        return (
                                            <div
                                                key={product.id}
                                                className={`relative cursor-pointer border rounded-sm overflow-hidden transition-all ${isSelected ? 'border-black ring-1 ring-black shadow-md' : 'border-neutral-200 hover:border-neutral-300'}`}
                                                onClick={() => toggleItem(product)}
                                            >
                                                {isSelected && (
                                                    <div className="absolute top-2 right-2 z-10 bg-black text-white rounded-full p-1">
                                                        <FiCheck className="w-4 h-4" />
                                                    </div>
                                                )}
                                                <div className="h-40 md:h-48 bg-neutral-100">
                                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="p-3 md:p-4 bg-white">
                                                    <h3 className="font-medium text-xs md:text-sm truncate">{product.name}</h3>
                                                    <p className="text-neutral-500 text-xs md:text-sm mt-1">₹{product.price}</p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                            <div className="mt-8 flex justify-between">
                                <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                                <Button onClick={() => setStep(3)} disabled={selectedItems.length === 0}>Next: Review</Button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="max-w-2xl mx-auto">
                            <div className="text-center mb-8">
                                <FiGift className="w-16 h-16 mx-auto mb-4 text-neutral-900" />
                                <h2 className="text-2xl font-serif font-bold">Personalize & Review</h2>
                                <p className="text-neutral-500 mt-2">Almost exactly how you imagined.</p>
                            </div>

                            <div className="bg-white border border-neutral-200 p-6 rounded-sm mb-8 space-y-6">
                                <div>
                                    <Input 
                                        label="Hamper Name" 
                                        value={hamperName} 
                                        onChange={(e) => setHamperName(e.target.value)}
                                        placeholder="E.g., Wedding Gift for Sarah"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-neutral-900">Personal Note (Optional)</label>
                                    <textarea 
                                        className="w-full border border-neutral-200 rounded-sm px-4 py-2 text-sm focus:outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal transition-colors bg-white min-h-[100px]"
                                        value={hamperNote}
                                        onChange={(e) => setHamperNote(e.target.value)}
                                        placeholder="Add a heartfelt message..."
                                    />
                                </div>
                            </div>

                            <div className="bg-neutral-50 p-6 rounded-sm mb-8">
                                <h3 className="font-bold mb-4 font-serif text-lg">Hamper Contents</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between font-medium text-sm border-b border-neutral-200 pb-3">
                                        <span>Packaging: {selectedBox?.name}</span>
                                        <span>₹{selectedBox?.price}</span>
                                    </div>
                                    <div className="pt-2 space-y-3 border-b border-neutral-200 pb-4">
                                        {selectedItems.map(item => (
                                            <div key={item.id} className="flex gap-4 items-center">
                                                <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-sm border border-neutral-200" />
                                                <span className="flex-1 text-sm font-medium">{item.name}</span>
                                                <span className="text-sm">₹{item.price}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="pt-2 flex justify-between font-bold text-xl text-neutral-900">
                                        <span>Total</span>
                                        <span>₹{calculateTotal()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-between gap-4">
                                <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button variant="outline" onClick={handleSaveHamper}>Save for Later</Button>
                                    <Button onClick={handleAddToCart}>Add to Cart - ₹{calculateTotal()}</Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GiftHamper;
