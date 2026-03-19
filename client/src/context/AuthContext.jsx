import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    useEffect(() => {
        // Hydrate from localStorage
        const savedUser = localStorage.getItem('aura_user');
        const savedToken = localStorage.getItem('aura_token');
        if (savedUser && savedToken) {
            setUser(JSON.parse(savedUser));
            setToken(savedToken);
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            setUser(data);
            setToken(data.token);
            localStorage.setItem('aura_user', JSON.stringify(data));
            localStorage.setItem('aura_token', data.token);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const register = async (userData) => {
        try {
            const payload = {
                name: `${userData.firstName} ${userData.lastName}`.trim(),
                email: userData.email,
                password: userData.password
            };

            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            setUser(data);
            setToken(data.token);
            localStorage.setItem('aura_user', JSON.stringify(data));
            localStorage.setItem('aura_token', data.token);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('aura_user');
        localStorage.removeItem('aura_token');
    };

    // Auto-logout helper for components encountering 401s API wide
    const handleAuthError = (err) => {
        if (err?.message?.includes('401') || err?.status === 401) {
            logout();
        }
    };

    const value = {
        user,
        token,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
        handleAuthError
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
