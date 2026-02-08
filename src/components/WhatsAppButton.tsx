"use client";

import { MessageCircle } from 'lucide-react';
import styles from './WhatsAppButton.module.css';

export default function WhatsAppButton() {
    const phoneNumber = "525512345678"; // Simulated number
    const message = "¡Hola! Quisiera informes sobre sus helados gourmet 🍦";

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <a
            href={whatsappUrl}
            className={styles.button}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contactar por WhatsApp"
        >
            <div className={styles.tooltip}>¿En qué podemos ayudarte?</div>
            <MessageCircle size={30} fill="currentColor" />
        </a>
    );
}
