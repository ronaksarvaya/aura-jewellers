import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Input = forwardRef(({
    label,
    error,
    className,
    fullWidth = true,
    helperText,
    icon: Icon,
    ...props
}, ref) => {
    return (
        <div className={clsx('flex flex-col gap-1.5', fullWidth && 'w-full')}>
            {label && (
                <label className="text-sm font-medium text-neutral-700">
                    {label}
                </label>
            )}
            <div className="relative">
                {Icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                        <Icon className="h-5 w-5" />
                    </div>
                )}
                <input
                    ref={ref}
                    className={twMerge(
                        'flex h-10 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200',
                        Icon && 'pl-10',
                        error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
                        className
                    )}
                    {...props}
                />
            </div>
            {error && (
                <p className="text-xs text-red-500 mt-0.5">{error}</p>
            )}
            {helperText && !error && (
                <p className="text-xs text-neutral-500 mt-0.5">{helperText}</p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
