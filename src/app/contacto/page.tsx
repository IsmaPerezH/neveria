"use client";

import React, { useState } from 'react';
import styles from './page.module.css';
import Reveal from '@/components/Reveal';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        // In a real app, you'd send the form data here
    };

    return (
        <div className="container">
            <div className="section">
                <Reveal>
                    <h1 className={styles.pageTitle}>Conectemos</h1>
                    <p className={styles.pageSubtitle}>¿Tienes un evento especial o alguna duda molecular? Estamos aquí para ayudarte.</p>
                </Reveal>

                <div className={styles.contactGrid}>
                    {/* Contact Info */}
                    <div className={styles.infoColumn}>
                        <Reveal delay="normal">
                            <div className={styles.infoCard}>
                                <div className={styles.infoItem}>
                                    <div className={styles.iconWrapper}>
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h3 className={styles.infoHeading}>Ubicación</h3>
                                        <p className={styles.infoText}>Av. de las Delicias 456, Col. Gourmet, Ciudad de México</p>
                                    </div>
                                </div>

                                <div className={styles.infoItem}>
                                    <div className={styles.iconWrapper}>
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h3 className={styles.infoHeading}>Teléfono</h3>
                                        <p className={styles.infoText}>+52 55 1234 5678</p>
                                    </div>
                                </div>

                                <div className={styles.infoItem}>
                                    <div className={styles.iconWrapper}>
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h3 className={styles.infoHeading}>Email</h3>
                                        <p className={styles.infoText}>hola@neveriaartesanal.com</p>
                                    </div>
                                </div>

                                <div className={styles.infoItem}>
                                    <div className={styles.iconWrapper}>
                                        <Clock size={24} />
                                    </div>
                                    <div>
                                        <h3 className={styles.infoHeading}>Horarios</h3>
                                        <p className={styles.infoText}>Lun - Vie: 12:00 PM - 10:00 PM</p>
                                        <p className={styles.infoText}>Sáb - Dom: 10:00 AM - 11:00 PM</p>
                                    </div>
                                </div>
                            </div>
                        </Reveal>

                        {/* Map Placeholder */}
                        <Reveal delay="slow" className={styles.mapContainer}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.661159954056!2d-99.16744462391266!3d19.426981881850117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff35f5bd1563%3A0x6c9945037d6e897!2sEl%20Angel%20de%20la%20Independencia!5e0!3m2!1sen!2smx!4v1707420000000!5m2!1sen!2smx"
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </Reveal>
                    </div>

                    {/* Contact Form */}
                    <div className={styles.formColumn}>
                        <Reveal delay="slower">
                            {!submitted ? (
                                <form className={styles.contactForm} onSubmit={handleSubmit}>
                                    <div className={styles.formHeader}>
                                        <MessageSquare size={32} color="var(--color-primary)" />
                                        <h2>Envíanos un Mensaje</h2>
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label>Nombre</label>
                                        <input type="text" placeholder="Tu nombre artístico" required />
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label>Email</label>
                                        <input type="email" placeholder="tu@email.com" required />
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label>Asunto</label>
                                        <select className={styles.select}>
                                            <option>Consulta General</option>
                                            <option>Pedido para Evento</option>
                                            <option>Sugerencia de Sabor</option>
                                            <option>Quejas y Dulces</option>
                                        </select>
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label>Mensaje</label>
                                        <textarea rows={5} placeholder="Cuéntanos tus antojos..." required></textarea>
                                    </div>

                                    <button type="submit" className="btn-primary">
                                        <span>Enviar Mensaje</span>
                                        <Send size={18} style={{ marginLeft: '0.8rem' }} />
                                    </button>
                                </form>
                            ) : (
                                <div className={styles.successMessage}>
                                    <CheckCircle2 size={64} color="var(--color-secondary)" />
                                    <h2>¡Mensaje Recibido!</h2>
                                    <p>Nuestro equipo de alquimistas te responderá en menos de lo que tarda en derretirse un helado al sol.</p>
                                    <button onClick={() => setSubmitted(false)} className={styles.resetBtn}>
                                        Enviar otro mensaje
                                    </button>
                                </div>
                            )}
                        </Reveal>
                    </div>
                </div>
            </div>
        </div>
    );
}
