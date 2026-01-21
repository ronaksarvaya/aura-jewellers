import React from 'react';
import { matchPath } from 'react-router-dom';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { CgSpinner } from 'react-icons/cg';

const Button = ({
    children,
    variant = 'primary', // primary, secondary, outline, ghost
    size = 'md', // sm, md, lg
    fullWidth = false,
    loading = false,
    className,
    disabled,
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-charcoal text-white hover:bg-black border border-transparent shadow-sm hover:shadow-md tracking-widest uppercase text-xs',
        secondary: 'bg-gold-500 text-white hover:bg-gold-600 border border-transparent shadow-sm tracking-widest uppercase text-xs', // Gold color
        outline: 'bg-transparent border border-neutral-300 text-neutral-900 hover:border-black hover:bg-neutral-50 tracking-widest uppercase text-xs',
        ghost: 'bg-transparent text-neutral-700 hover:text-black hover:bg-neutral-100',
    };

    const sizes = {
        sm: 'text-xs px-3 py-1.5',
        md: 'text-sm px-5 py-2.5',
        lg: 'text-base px-6 py-3.5',
    };

    return (
        <button
            className={twMerge(
                baseStyles,
                variants[variant],
                sizes[size],
                fullWidth ? 'w-full' : '',
                className
            )}
            disabled={disabled || loading}
            {...props}
        >
            {loading && <CgSpinner className="animate-spin mr-2 h-5 w-5" />}
            {children}
        </button>
    );
};

export default Button;
