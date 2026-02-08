"use client";

import { useState } from 'react';
import styles from './page.module.css';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';

const FLAVOR_COLORS: Record<string, string> = {
    'Fresa Silvestre': '#FF6B6B',
    'Chocolate Belga': '#4A3728',
    'Vainilla de Papantla': '#FFF5E1',
    'Menta Granizada': '#A8E6CF',
};

export default function PersonalizarPage() {
    const { addToCart } = useCart();
    const [base, setBase] = useState<'cono' | 'vaso'>('cono');
    const [scoopsCount, setScoopsCount] = useState<number>(2);
    const [selectedFlavors, setSelectedFlavors] = useState<string[]>(['Fresa Silvestre', 'Chocolate Belga', 'Vainilla de Papantla']);

    const handleFlavorSelect = (index: number, flavor: string) => {
        const newFlavors = [...selectedFlavors];
        newFlavors[index] = flavor;
        setSelectedFlavors(newFlavors);
    };

    const totalPrice = 30 + (scoopsCount * 15); // Base price + per scoop

    const handleAddCustomToCart = () => {
        const customProduct = {
            id: `custom-${Date.now()}`,
            name: `Helado Personalizado (${scoopsCount} bolas)`,
            description: `${base === 'cono' ? 'Cono' : 'Vaso'} con: ${selectedFlavors.slice(0, scoopsCount).join(', ')}`,
            price: totalPrice,
            image: base === 'cono' ? '/ice-cream-hero.png' : '/vanilla-scoop.png', // Placeholder image
            category: 'helado' as const,
        };
        addToCart(customProduct);
        alert('¡Helado personalizado añadido al carrito!');
    };

    return (
        <div className="container section">
            <h1 className="title-display text-center" style={{ marginBottom: '3rem' }}>Diseña tu Obra Maestra</h1>

            <div className={styles.container}>
                {/* Visualizer */}
                <div className={styles.visualizer}>
                    <div className={styles.iceCreamDisplay}>
                        {/* Base: Cone or Cup */}
                        <div
                            className={styles.base}
                            style={{
                                background: base === 'cono' ? 'navajowhite' : 'lightcyan',
                                clipPath: base === 'cono' ? 'polygon(0 0, 100% 0, 50% 100%)' : 'polygon(0 0, 100% 0, 85% 100%, 15% 100%)',
                                border: '2px solid rgba(0,0,0,0.1)'
                            }}
                        >
                            {base === 'cono' && <div style={{ width: '100%', height: '100%', backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.05) 10px, rgba(0,0,0,0.05) 11px)' }} />}
                        </div>

                        {/* Scoops */}
                        {[...Array(scoopsCount)].map((_, i) => (
                            <div
                                key={i}
                                className={styles.scoop}
                                style={{
                                    backgroundColor: FLAVOR_COLORS[selectedFlavors[i]] || '#eee',
                                    zIndex: 20 - i,
                                    transform: `translateY(${i * 20}px) scale(${1 - (i * 0.05)})`,
                                }}
                            />
                        ))}
                    </div>

                    <div className={styles.summary}>
                        <div className={styles.price}>${totalPrice.toFixed(2)}</div>
                        <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                            {base === 'cono' ? 'Cono' : 'Vaso'} + {scoopsCount} bolas de pura felicidad.
                        </p>
                        <button className={styles.addToCartBtn} onClick={handleAddCustomToCart}>
                            Añadir al Carrito
                        </button>
                    </div>
                </div>

                {/* Controls */}
                <div className={styles.controls}>
                    {/* Base Selection */}
                    <div className={styles.optionGroup}>
                        <h3>1. Elige tu Base</h3>
                        <div className={styles.buttonGrid}>
                            <button
                                className={`${styles.choiceBtn} ${base === 'cono' ? styles.active : ''}`}
                                onClick={() => setBase('cono')}
                            >
                                🍦 Cono Crujiente
                            </button>
                            <button
                                className={`${styles.choiceBtn} ${base === 'vaso' ? styles.active : ''}`}
                                onClick={() => setBase('vaso')}
                            >
                                🥣 Vaso Elegante
                            </button>
                        </div>
                    </div>

                    {/* Scoops Count */}
                    <div className={styles.optionGroup}>
                        <h3>2. ¿Cuántas bolas quieres?</h3>
                        <div className={styles.buttonGrid}>
                            {[1, 2, 3].map(num => (
                                <button
                                    key={num}
                                    className={`${styles.choiceBtn} ${scoopsCount === num ? styles.active : ''}`}
                                    onClick={() => setScoopsCount(num)}
                                >
                                    {num} {num === 1 ? 'Bola' : 'Bolas'}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Flavor Selection */}
                    <div className={styles.optionGroup}>
                        <h3>3. Selecciona tus Sabores</h3>
                        {[...Array(scoopsCount)].map((_, i) => (
                            <div key={i} style={{ marginBottom: '1.5rem' }}>
                                <p style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem', opacity: 0.7 }}>BOLA {i + 1}</p>
                                <div className={styles.buttonGrid}>
                                    {products.filter(p => p.category === 'helado').map(flavor => (
                                        <div key={flavor.id} style={{ textAlign: 'center' }}>
                                            <button
                                                className={`${styles.flavorBtn} ${selectedFlavors[i] === flavor.name ? styles.selected : ''}`}
                                                style={{ backgroundColor: FLAVOR_COLORS[flavor.name] }}
                                                onClick={() => handleFlavorSelect(i, flavor.name)}
                                                title={flavor.name}
                                            />
                                            <span className={styles.flavorLabel}>{flavor.name.split(' ')[0]}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
