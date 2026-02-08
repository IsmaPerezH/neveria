"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import styles from './page.module.css';
import Reveal from '@/components/Reveal';
import { Check, CreditCard, Truck, User, ArrowRight, ArrowLeft, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

type Step = 1 | 2 | 3 | 4;

export default function CheckoutPage() {
    const router = useRouter();
    const { items, totalPrice, clearCart } = useCart();
    const [step, setStep] = useState<Step>(1);
    const [mounted, setMounted] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        zip: '',
        shippingMethod: 'standard',
        paymentMethod: 'card'
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    if (items.length === 0 && step !== 4) {
        return (
            <div className="container section text-center">
                <Reveal>
                    <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
                        <ShoppingBag size={64} color="var(--color-text-muted)" />
                    </div>
                    <h1 className="title-display">Tu carrito está vacío</h1>
                    <p style={{ marginTop: '1rem', color: 'var(--color-text-muted)' }}>No puedes hacer un pedido sin helados.</p>
                    <Link href="/sabores" className="btn-primary" style={{ marginTop: '2rem' }}>Ir a Sabores</Link>
                </Reveal>
            </div>
        );
    }

    const handleNext = () => {
        if (step < 4) setStep((step + 1) as Step);
        if (step === 3) {
            // Simulate final confirmation
            setTimeout(() => {
                setStep(4);
                clearCart();
            }, 1500);
        }
    };

    const handleBack = () => {
        if (step > 1) setStep((step - 1) as Step);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const renderStepIndicator = () => (
        <div className={styles.stepper}>
            {[1, 2, 3, 4].map((s) => (
                <div
                    key={s}
                    className={`${styles.stepItem} ${step >= s ? styles.stepActive : ''} ${step > s ? styles.stepDone : ''}`}
                >
                    <div className={styles.stepIcon}>
                        {step > s ? <Check size={16} /> : s}
                    </div>
                    <span className={styles.stepLabel}>
                        {s === 1 ? 'Datos' : s === 2 ? 'Envío' : s === 3 ? 'Pago' : 'Listo'}
                    </span>
                </div>
            ))}
            <div className={styles.progressLine}>
                <div className={styles.progressFill} style={{ width: `${((step - 1) / 3) * 100}%` }} />
            </div>
        </div>
    );

    return (
        <div className="container">
            <div className={styles.pageWrapper}>
                <Reveal>
                    <h1 className={styles.pageTitle}>Finalizar Pedido</h1>
                </Reveal>

                {renderStepIndicator()}

                <div className={styles.mainGrid}>
                    {/* Main Form Content */}
                    <div className={styles.formContent}>
                        {step === 1 && (
                            <Reveal key="step1">
                                <h2 className={styles.stepTitle}><User size={24} /> Datos de Entrega</h2>
                                <div className={styles.inputGrid}>
                                    <div className={styles.inputGroup}>
                                        <label>Nombre Completo</label>
                                        <input name="name" type="text" placeholder="Juan Pérez" value={formData.name} onChange={handleInputChange} />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Correo Electrónico</label>
                                        <input name="email" type="email" placeholder="juan@ejemplo.com" value={formData.email} onChange={handleInputChange} />
                                    </div>
                                    <div className={styles.inputGroup} style={{ gridColumn: 'span 2' }}>
                                        <label>Dirección</label>
                                        <input name="address" type="text" placeholder="Calle Falsa 123, Colonia Centro" value={formData.address} onChange={handleInputChange} />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Ciudad</label>
                                        <input name="city" type="text" placeholder="México DF" value={formData.city} onChange={handleInputChange} />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Código Postal</label>
                                        <input name="zip" type="text" placeholder="12345" value={formData.zip} onChange={handleInputChange} />
                                    </div>
                                </div>
                            </Reveal>
                        )}

                        {step === 2 && (
                            <Reveal key="step2">
                                <h2 className={styles.stepTitle}><Truck size={24} /> Método de Envío</h2>
                                <div className={styles.optionList}>
                                    <label className={`${styles.optionItem} ${formData.shippingMethod === 'standard' ? styles.optionActive : ''}`}>
                                        <input type="radio" name="shippingMethod" value="standard" checked={formData.shippingMethod === 'standard'} onChange={handleInputChange} />
                                        <div className={styles.optionInfo}>
                                            <span className={styles.optionName}>Envío Estándar (Gratis)</span>
                                            <span className={styles.optionDesc}>Entrega en 30-45 minutos.</span>
                                        </div>
                                    </label>
                                    <label className={`${styles.optionItem} ${formData.shippingMethod === 'express' ? styles.optionActive : ''}`}>
                                        <input type="radio" name="shippingMethod" value="express" checked={formData.shippingMethod === 'express'} onChange={handleInputChange} />
                                        <div className={styles.optionInfo}>
                                            <span className={styles.optionName}>Envío Prioritario ($20.00)</span>
                                            <span className={styles.optionDesc}>Entrega en 15-20 minutos (Prioridad alta).</span>
                                        </div>
                                    </label>
                                </div>
                            </Reveal>
                        )}

                        {step === 3 && (
                            <Reveal key="step3">
                                <h2 className={styles.stepTitle}><CreditCard size={24} /> Método de Pago</h2>
                                <div className={styles.optionList}>
                                    <label className={`${styles.optionItem} ${formData.paymentMethod === 'card' ? styles.optionActive : ''}`}>
                                        <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === 'card'} onChange={handleInputChange} />
                                        <div className={styles.optionInfo}>
                                            <span className={styles.optionName}>Tarjeta de Crédito / Débito</span>
                                            <span className={styles.optionDesc}>Pago seguro cifrado.</span>
                                        </div>
                                    </label>
                                    <label className={`${styles.optionItem} ${formData.paymentMethod === 'cash' ? styles.optionActive : ''}`}>
                                        <input type="radio" name="paymentMethod" value="cash" checked={formData.paymentMethod === 'cash'} onChange={handleInputChange} />
                                        <div className={styles.optionInfo}>
                                            <span className={styles.optionName}>Pago contra entrega</span>
                                            <span className={styles.optionDesc}>Paga al recibir tus helados.</span>
                                        </div>
                                    </label>
                                </div>

                                {formData.paymentMethod === 'card' && (
                                    <div className={styles.cardForm} style={{ marginTop: '2rem' }}>
                                        <div className={styles.inputGroup}>
                                            <label>Número de Tarjeta</label>
                                            <input type="text" placeholder="**** **** **** ****" />
                                        </div>
                                        <div style={{ display: 'flex', gap: '1rem' }}>
                                            <div className={styles.inputGroup}>
                                                <label>Vencimiento</label>
                                                <input type="text" placeholder="MM/YY" />
                                            </div>
                                            <div className={styles.inputGroup}>
                                                <label>CVV</label>
                                                <input type="text" placeholder="***" />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </Reveal>
                        )}

                        {step === 4 && (
                            <Reveal key="step4" className={styles.successState}>
                                <div className={styles.checkCircle}>
                                    <Check size={48} />
                                </div>
                                <h2 className={styles.successTitle}>¡Pedido Recibido! 🍦</h2>
                                <p className={styles.successText}>
                                    Gracias por tu compra, <strong>{formData.name}</strong>. Tus helados están siendo preparados con ingredientes frescos y llegarán pronto a <strong>{formData.address}</strong>.
                                </p>
                                <div className={styles.orderNumber}>Número de Pedido: #INV-{Math.floor(Math.random() * 900000) + 100000}</div>
                                <Link href="/" className="btn-primary" style={{ marginTop: '2.5rem' }}>Volver al Inicio</Link>
                            </Reveal>
                        )}

                        {step < 4 && (
                            <div className={styles.navigation}>
                                <button
                                    onClick={handleBack}
                                    className={styles.backButton}
                                    style={{ visibility: step === 1 ? 'hidden' : 'visible' }}
                                >
                                    <ArrowLeft size={18} /> Atrás
                                </button>
                                <button onClick={handleNext} className="btn-primary">
                                    {step === 3 ? 'Finalizar Compra' : 'Continuar'} <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Order Summary Sidebar */}
                    {step < 4 && (
                        <div className={styles.sidebar}>
                            <div className={styles.summaryBox}>
                                <h3 className={styles.summaryTitle}>Resumen de Pedido</h3>
                                <div className={styles.summaryList}>
                                    {items.map((item) => (
                                        <div key={item.id} className={styles.summaryItem}>
                                            <div className={styles.summaryItemInfo}>
                                                <span className={styles.itemQty}>{item.quantity}x</span>
                                                <span className={styles.itemName}>{item.name}</span>
                                            </div>
                                            <span className={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className={styles.totals}>
                                    <div className={styles.totalRow}>
                                        <span>Subtotal</span>
                                        <span>${totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className={styles.totalRow}>
                                        <span>Envío</span>
                                        <span>{formData.shippingMethod === 'express' ? '$20.00' : 'Gratis'}</span>
                                    </div>
                                    <div className={`${styles.totalRow} ${styles.grandTotal}`}>
                                        <span>Total</span>
                                        <span>${(totalPrice + (formData.shippingMethod === 'express' ? 20 : 0)).toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
