"use client";

import { useAuth } from '@/context/AuthContext';
import styles from './page.module.css';
import Reveal from '@/components/Reveal';
import Image from 'next/image';
import { Settings, Package, Heart, LogOut, Trophy, CreditCard, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function ProfilePage() {
    const { user, isLoggedIn, login, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('orders');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    if (!isLoggedIn) {
        return (
            <div className="container section">
                <Reveal className={styles.loginCard}>
                    <div className={styles.loginIcon}>
                        <Image src="/avatar-1.png" width={100} height={100} alt="Avatar login" className={styles.loginAvatar} />
                    </div>
                    <h1>Bienvenue al Club</h1>
                    <p>Inicia sesión para ver tu historial de compras y puntos de lealtad.</p>
                    <button onClick={login} className="btn-primary" style={{ marginTop: '2rem' }}>
                        Simular Inicio de Sesión
                    </button>
                </Reveal>
            </div>
        );
    }

    return (
        <div className="container">
            <div className={styles.profileGrid}>
                {/* Sidebar */}
                <aside className={styles.sidebar}>
                    <Reveal>
                        <div className={styles.userCard}>
                            <div className={styles.avatarWrapper}>
                                <img src={user?.avatar} alt={user?.name} className={styles.avatar} />
                                <div className={styles.badge}>{user?.tier}</div>
                            </div>
                            <h2 className={styles.userName}>{user?.name}</h2>
                            <p className={styles.userEmail}>{user?.email}</p>

                            <div className={styles.loyaltyBox}>
                                <div className={styles.loyaltyHeader}>
                                    <Trophy size={16} color="var(--color-secondary)" />
                                    <span>Nivel {user?.tier}</span>
                                </div>
                                <div className={styles.pointsRow}>
                                    <span className={styles.pointsValue}>{user?.points}</span>
                                    <span className={styles.pointsLabel}>puntos</span>
                                </div>
                                <div className={styles.progressBar}>
                                    <div className={styles.progressFill} style={{ width: '75%' }} />
                                </div>
                                <p className={styles.nextTierText}>Te faltan 250 pts para el nivel Maestro</p>
                            </div>
                        </div>

                        <nav className={styles.sideNav}>
                            <button
                                className={`${styles.navBtn} ${activeTab === 'orders' ? styles.navActive : ''}`}
                                onClick={() => setActiveTab('orders')}
                            >
                                <Package size={20} /> Historial de Pedidos
                            </button>
                            <button
                                className={`${styles.navBtn} ${activeTab === 'favs' ? styles.navActive : ''}`}
                                onClick={() => setActiveTab('favs')}
                            >
                                <Heart size={20} /> Sabores Favoritos
                            </button>
                            <button
                                className={`${styles.navBtn} ${activeTab === 'settings' ? styles.navActive : ''}`}
                                onClick={() => setActiveTab('settings')}
                            >
                                <Settings size={20} /> Configuración
                            </button>
                            <button onClick={logout} className={`${styles.navBtn} ${styles.logoutBtn}`}>
                                <LogOut size={20} /> Cerrar Sesión
                            </button>
                        </nav>
                    </Reveal>
                </aside>

                {/* Main Content */}
                <main className={styles.mainContent}>
                    {activeTab === 'orders' && (
                        <Reveal key="orders">
                            <h1 className={styles.sectionTitle}>Tus Compras Pasadas</h1>
                            <div className={styles.ordersList}>
                                {user?.orders.map((order) => (
                                    <div key={order.id} className={styles.orderCard}>
                                        <div className={styles.orderHeader}>
                                            <div>
                                                <span className={styles.orderId}>#INV-{order.id}</span>
                                                <span className={styles.orderDate}>{order.date}</span>
                                            </div>
                                            <span className={`${styles.statusBadge} ${styles[order.status.toLowerCase().replace(' ', '')]}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <div className={styles.orderContent}>
                                            <div className={styles.orderItems}>
                                                {order.items.join(', ')}
                                            </div>
                                            <div className={styles.orderTotal}>
                                                <span>Total:</span>
                                                <strong>${order.total.toFixed(2)}</strong>
                                            </div>
                                        </div>
                                        <button className={styles.orderAction}>
                                            Ver Detalles <ChevronRight size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    )}

                    {activeTab === 'favs' && (
                        <Reveal key="favs">
                            <h1 className={styles.sectionTitle}>Sabores que Amas</h1>
                            <div className={styles.favsPlaceholder}>
                                <Heart size={48} color="var(--color-primary)" style={{ opacity: 0.3, marginBottom: '1.5rem' }} />
                                <p>Aún no has guardado sabores favoritos.</p>
                                <Link href="/sabores" className="btn-primary" style={{ marginTop: '1.5rem' }}>Explorar Catálogo</Link>
                            </div>
                        </Reveal>
                    )}

                    {activeTab === 'settings' && (
                        <Reveal key="settings">
                            <h1 className={styles.sectionTitle}>Personalización de Perfil</h1>
                            <div className={styles.settingsForm}>
                                <div className={styles.inputGroup}>
                                    <label>Nombre Público</label>
                                    <input type="text" defaultValue={user?.name} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Notificaciones</label>
                                    <div className={styles.checkboxGroup}>
                                        <input type="checkbox" defaultChecked id="notif-1" />
                                        <label htmlFor="notif-1">Recibir ofertas exclusivas por email</label>
                                    </div>
                                </div>
                                <button className="btn-primary" style={{ width: 'fit-content' }}>Guardar Cambios</button>
                            </div>
                        </Reveal>
                    )}
                </main>
            </div>
        </div>
    );
}
