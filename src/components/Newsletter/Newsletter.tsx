import styles from './Newsletter.module.css';
import Reveal from '../Reveal';
import { Gift, Send } from 'lucide-react';

export default function Newsletter() {
    return (
        <section className={styles.section}>
            <div className={styles.bgPattern} />
            <div className={`container ${styles.content}`}>
                <Reveal>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                        <Gift size={48} color="var(--color-secondary)" />
                    </div>
                    <h2 className={styles.heading}>¡Únete al Club Gourmet!</h2>
                    <p className={styles.text}>
                        Suscríbete y recibe un cupón exclusivo para un topping premium en tu próxima visita.
                    </p>
                    <form className={styles.form}>
                        <input type="email" placeholder="Tu correo electrónico" className={styles.input} required />
                        <button type="submit" className={styles.button}>
                            <span>Suscribirme</span>
                            <Send size={18} style={{ marginLeft: '0.5rem' }} />
                        </button>
                    </form>
                </Reveal>
            </div>
        </section>
    );
}
