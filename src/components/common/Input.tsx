import React from 'react'

export interface InputProps {
    type?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    disabled?: boolean;
}

const Input: React.FC<InputProps> = ({ type, placeholder, value, onChange, className, disabled }: InputProps) => {
    return (
        <input
            type={type || 'text'}
            placeholder={placeholder || ''}
            value={value || ''}
            onChange={onChange}
            className={`border rounded p-2 ${className || ''}`}
            disabled={disabled || false}
        />
    )
}

export default Input