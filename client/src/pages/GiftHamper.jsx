import React, { useState } from 'react';
import Button from '../components/common/Button';
import { FiCheck, FiGift } from 'react-icons/fi';

const GiftHamper = () => {
    const [step, setStep] = useState(1);
    const [selectedBox, setSelectedBox] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);

    const boxes = [
        { id: 1, name: 'Signature Black Box', price: 20, image: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=2115&auto=format&fit=crop' },
        { id: 2, name: 'Velvet Rose Box', price: 35, image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2040&auto=format&fit=crop' }
    ];

    const products = [
        { id: 101, name: 'Ethereal Diamond Ring', price: 1250, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2070&auto=format&fit=crop' },
        { id: 103, name: 'Pearl Drop Earrings', price: 450, image: 'https://images.unsplash.com/photo-1535632787350-4e48bc094aa9?q=80&w=1974&auto=format&fit=crop' },
        { id: 102, name: 'Golden Sun Necklace', price: 890, image: 'https://images.unsplash.com/photo-1599643477877-5313557d80fe?q=80&w=1974&auto=format&fit=crop' },
    ];

    const toggleItem = (item) => {
        if (selectedItems.find(i => i.id === item.id)) {
            setSelectedItems(selectedItems.filter(i => i.id !== item.id));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
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

                <div className="bg-white rounded-sm shadow-sm p-8 max-w-5xl mx-auto">
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
                                            <p className="text-neutral-500">+${box.price}</p>
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
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {products.map(product => {
                                    const isSelected = selectedItems.find(i => i.id === product.id);
                                    return (
                                        <div
                                            key={product.id}
                                            className={`relative cursor-pointer border rounded-sm overflow-hidden transition-all ${isSelected ? 'border-black' : 'border-neutral-200'}`}
                                            onClick={() => toggleItem(product)}
                                        >
                                            {isSelected && (
                                                <div className="absolute top-2 right-2 z-10 bg-black text-white rounded-full p-1">
                                                    <FiCheck className="w-4 h-4" />
                                                </div>
                                            )}
                                            <div className="h-48 bg-neutral-100">
                                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="p-4">
                                                <h3 className="font-medium text-sm">{product.name}</h3>
                                                <p className="text-neutral-500 text-sm">${product.price}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="mt-8 flex justify-between">
                                <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                                <Button onClick={() => setStep(3)} disabled={selectedItems.length === 0}>Next: Review</Button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="text-center max-w-lg mx-auto">
                            <FiGift className="w-16 h-16 mx-auto mb-6 text-neutral-900" />
                            <h2 className="text-2xl font-serif font-bold mb-6">Hamper Summary</h2>

                            <div className="bg-neutral-50 p-6 rounded-sm text-left mb-8 space-y-4">
                                <div className="flex justify-between font-medium">
                                    <span>Packaging: {selectedBox?.name}</span>
                                    <span>${selectedBox?.price}</span>
                                </div>
                                <div className="border-t border-neutral-200 pt-4 space-y-2">
                                    {selectedItems.map(item => (
                                        <div key={item.id} className="flex justify-between text-sm text-neutral-600">
                                            <span>{item.name}</span>
                                            <span>${item.price}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="border-t border-neutral-200 pt-4 flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span>${(selectedBox?.price || 0) + selectedItems.reduce((acc, i) => acc + i.price, 0)}</span>
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
                                <Button>Add Hamper to Cart</Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GiftHamper;
