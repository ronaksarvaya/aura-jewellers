import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming we might want to redirect inside util, but better to do it in pages.

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // Check localStorage for persisted session
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('aura_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = (email, password) => {
        // Mock authentication
        const mockUser = {
            id: '1',
            email,
            name: 'Jane Doe',
            profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150'
        };
        setUser(mockUser);
        localStorage.setItem('aura_user', JSON.stringify(mockUser));
        return true;
    };

    const register = (userData) => {
        const mockUser = {
            id: '2',
            email: userData.email,
            name: `${userData.firstName} ${userData.lastName}`,
            profileImage: null
        };
        setUser(mockUser);
        localStorage.setItem('aura_user', JSON.stringify(mockUser));
        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('aura_user');
    };

    const value = {
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
