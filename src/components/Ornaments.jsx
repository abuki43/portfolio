import React from 'react';

// Elegant flourish divider
export const Flourish = ({ className = '' }) => (
    <div className={`flourish ${className}`}>
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M12 2C12 2 8 6 8 10C8 12 9 13 10 13C11 13 12 12 12 10C12 12 13 13 14 13C15 13 16 12 16 10C16 6 12 2 12 2Z"
                fill="currentColor"
                opacity="0.6"
            />
            <circle cx="12" cy="17" r="1.5" fill="currentColor" />
            <circle cx="12" cy="21" r="1" fill="currentColor" opacity="0.5" />
        </svg>
    </div>
);

// Star ornament for accent
export const StarOrnament = ({ size = 16, className = '' }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path
            d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z"
            fill="currentColor"
        />
    </svg>
);

// Decorative corner ornament
export const CornerOrnament = ({ className = '', flip = false }) => (
    <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{ transform: flip ? 'scale(-1, 1)' : 'none' }}
    >
        <path
            d="M2 38C2 20 20 2 38 2"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.4"
        />
        <path
            d="M6 38C6 22 22 6 38 6"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeLinecap="round"
            opacity="0.25"
        />
        <circle cx="38" cy="2" r="1.5" fill="currentColor" opacity="0.4" />
    </svg>
);

// Section divider with ornament
export const SectionDivider = ({ className = '' }) => (
    <div className={`flex items-center justify-center py-8 ${className}`}>
        <div className="flex-1 max-w-[120px] h-px bg-gradient-to-r from-transparent to-sepia opacity-30" />
        <StarOrnament size={12} className="mx-4 text-sepia opacity-40" />
        <div className="flex-1 max-w-[120px] h-px bg-gradient-to-l from-transparent to-sepia opacity-30" />
    </div>
);

// Mail ornament for contact section
export const MailOrnament = ({ size = 32, className = '' }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <rect
            x="3"
            y="7"
            width="26"
            height="18"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.5"
        />
        <path
            d="M3 9L16 18L29 9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <circle cx="16" cy="3" r="1" fill="currentColor" opacity="0.5" />
        <circle cx="16" cy="29" r="1" fill="currentColor" opacity="0.5" />
    </svg>
);

// Bullet separator for inline lists
export const BulletSeparator = ({ className = '' }) => (
    <span className={`mx-3 text-sepia opacity-40 ${className}`}>•</span>
);
