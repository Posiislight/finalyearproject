import React, { useEffect, useRef } from 'react';
import { cn } from "../../lib/utils";

export const BentoItem = ({ className, children }) => {
    const itemRef = useRef(null);

    useEffect(() => {
        const item = itemRef.current;
        if (!item) return;

        const handleMouseMove = (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            item.style.setProperty('--mouse-x', `${x}px`);
            item.style.setProperty('--mouse-y', `${y}px`);
        };

        item.addEventListener('mousemove', handleMouseMove);

        return () => {
            item.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div 
            ref={itemRef} 
            className={cn(
                "group relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/40 backdrop-blur-sm p-8 transition-all duration-300 hover:border-gray-600",
                className
            )}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-0"
                style={{
                    background: `radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(255,255,255,0.06), transparent 40%)`
                }}
            />
            <div className="relative z-10 flex h-full flex-col gap-6">
                {children}
            </div>
        </div>
    );
};
