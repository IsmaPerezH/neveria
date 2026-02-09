"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './Header.module.css';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Menu, X, IceCream, User, Sun, Moon } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';

export default function Header() {
    const { totalItems } = useCart();
    const { theme, toggleTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header className={styles.header}>
            <Link href="/" className={styles.logo} onClick={closeMenu}>
                <IceCream size={28} color="var(--color-primary)" />
                Nevería <span>Artesanal</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
                className={styles.menuToggle}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
            >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
                <Link href="/" className={styles.navLink} onClick={closeMenu}>
                    Inicio
                </Link>
                <Link href="/sabores" className={styles.navLink} onClick={closeMenu}>
                    Sabores
                </Link>
                <Link href="/personalizar" className={styles.navLink} onClick={closeMenu} style={{ color: 'var(--color-secondary)' }}>
                    Personalizar
                </Link>
                <Link href="/contacto" className={styles.navLink} onClick={closeMenu}>
                    Contacto
                </Link>

                <div className={styles.authWrapper}>
                    <Link href="/perfil" className={styles.profileLink} onClick={closeMenu} title="Perfil">
                        <User size={22} />
                    </Link>
                </div>

                <Link href="/carrito" className={styles.cartButton} onClick={closeMenu} title="Carrito">
                    <ShoppingCart size={22} />
                    {mounted && totalItems > 0 && (
                        <span className={styles.cartCount}>{totalItems}</span>
                    )}
                </Link>

                <button
                    className={styles.themeToggle}
                    onClick={toggleTheme}
                    aria-label="Cambiar tema"
                >
                    {mounted && (theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />)}
                </button>
            </nav>
        </header>
    );
}
