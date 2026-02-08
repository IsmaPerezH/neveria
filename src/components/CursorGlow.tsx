"use client";

import { useEffect, useState } from 'react';

export default function CursorGlow() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                pointerEvents: 'none',
                zIndex: 9999,
                background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(217, 4, 41, 0.05), transparent 80%)`,
                transition: 'background 0.3s ease-out',
            }}
            className="hide-mobile"
        />
    );
}
