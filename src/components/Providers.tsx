"use client";

import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { ReviewProvider } from "@/context/ReviewContext";
import { ThemeProvider } from "@/context/ThemeContext";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <AuthProvider>
                <ReviewProvider>
                    <CartProvider>
                        {children}
                    </CartProvider>
                </ReviewProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}
