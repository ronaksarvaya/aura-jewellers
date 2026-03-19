import React, { createContext, useContext, useState, useEffect } from 'react';

const HamperContext = createContext();

export const useHamper = () => useContext(HamperContext);

export const HamperProvider = ({ children }) => {
    const [savedHampers, setSavedHampers] = useState([]);

    // Load from local storage
    useEffect(() => {
        const saved = localStorage.getItem('hampers');
        if (saved) {
            setSavedHampers(JSON.parse(saved));
        }
    }, []);

    // Save to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem('hampers', JSON.stringify(savedHampers));
    }, [savedHampers]);

    const saveHamper = (hamper) => {
        setSavedHampers((prev) => [...prev, { ...hamper, id: 'hamper_' + Date.now() }]);
    };

    const deleteHamper = (hamperId) => {
        setSavedHampers((prev) => prev.filter(h => h.id !== hamperId));
    };

    return (
        <HamperContext.Provider value={{ savedHampers, saveHamper, deleteHamper }}>
            {children}
        </HamperContext.Provider>
    );
};
