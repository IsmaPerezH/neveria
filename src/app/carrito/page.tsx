"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import styles from './page.module.css';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

export default function CartPage() {
    const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();

    if (items.length === 0) {
        return (
            <div className={styles.container}>
                <h1 className={styles.heading}>Tu Carrito</h1>
                <div className={styles.emptyState}>
                    <ShoppingBag size={80} color="var(--color-primary)" style={{ marginBottom: '2rem', opacity: 0.3 }} />
                    <p>Tu carrito está tristemente vacío.</p>
                    <a href="/sabores" className="btn-primary" style={{ marginTop: '2rem' }}>Explorar Sabores</a>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Tu Carrito Gourmet</h1>

            <div className={styles.cartList}>
                {items.map((item) => (
                    <div key={item.id} className={styles.cartItem}>
                        <div className={styles.itemImageWrapper}>
                            <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} />
                        </div>

                        <div className={styles.itemInfo}>
                            <div className={styles.itemName}>{item.name}</div>
                            <div className={styles.itemPrice}>${item.price.toFixed(2)}</div>
                        </div>

                        <div className={styles.quantityControls}>
                            <button
                                className={styles.qtyBtn}
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                aria-label="Disminuir cantidad"
                            >
                                <Minus size={16} />
                            </button>
                            <span className={styles.qtyValue}>{item.quantity}</span>
                            <button
                                className={styles.qtyBtn}
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                aria-label="Aumentar cantidad"
                            >
                                <Plus size={16} />
                            </button>
                        </div>

                        <div className={styles.itemTotal}>
                            ${(item.price * item.quantity).toFixed(2)}
                        </div>

                        <button
                            className={styles.removeBtn}
                            onClick={() => removeFromCart(item.id)}
                            title="Eliminar"
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>
                ))}
            </div>

            <div className={styles.summary}>
                <div className={styles.totalRow}>
                    <span>Total:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                </div>

                <Link href="/checkout" className={`btn-primary ${styles.checkoutBtn}`}>
                    Proceder al Pago
                </Link>

                <button
                    onClick={clearCart}
                    style={{ width: '100%', marginTop: '1rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                    <Trash2 size={14} />
                    <span>Vaciar Carrito</span>
                </button>
            </div>
        </div>
    );
}
