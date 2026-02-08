"use client";

import { useEffect, useRef, useState, ReactNode, CSSProperties } from 'react';

interface RevealProps {
    children: ReactNode;
    delay?: 'slow' | 'slower' | 'normal';
    className?: string;
    style?: CSSProperties;
}

export default function Reveal({ children, delay = 'normal', className = '', style }: RevealProps) {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        const current = domRef.current;
        if (current) {
            observer.observe(current);
        }

        return () => {
            if (current) {
                observer.unobserve(current);
            }
        };
    }, []);

    const delayClass = delay === 'slow' ? 'reveal_slow' : delay === 'slower' ? 'reveal_slower' : '';

    return (
        <div
            ref={domRef}
            className={`reveal ${isVisible ? 'reveal_visible' : ''} ${delayClass} ${className}`}
            style={style}
        >
            {children}
        </div>
    );
}
