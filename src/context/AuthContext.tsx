"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
    name: string;
    email: string;
    avatar: string;
    tier: 'Bronce' | 'Plata' | 'Oro' | 'Diamante';
    points: number;
    orders: Array<{
        id: string;
        date: string;
        total: number;
        status: 'Entregado' | 'En camino' | 'Cancelado';
        items: string[];
    }>;
}

interface AuthContextType {
    user: User | null;
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUser: User = {
    name: "Gourmet Explorer",
    email: "hola@neveria.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    tier: "Diamante",
    points: 1250,
    orders: [
        {
            id: "4582",
            date: "2026-02-01",
            total: 145.00,
            status: "Entregado",
            items: ["Fresa Silvestre", "Chocolate Belga"]
        },
        {
            id: "4912",
            date: "2026-01-15",
            total: 85.00,
            status: "Entregado",
            items: ["Torre Gourmet"]
        }
    ]
};

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Sync with localStorage to persist "login" state in this demo
    useEffect(() => {
        const savedAuth = localStorage.getItem('neveria_auth');
        if (savedAuth === 'true') {
            setUser(mockUser);
            setIsLoggedIn(true);
        }
    }, []);

    const login = () => {
        setUser(mockUser);
        setIsLoggedIn(true);
        localStorage.setItem('neveria_auth', 'true');
    };

    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem('neveria_auth');
    };

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
