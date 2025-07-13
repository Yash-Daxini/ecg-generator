import React from 'react'

interface ECGInputProps {
    label: string;
    value?: number;
    htmlFor?: string;
    step?: number;
    min?: number;
    max?: number;
    id?: string;
    onChange: (value: any) => void;
}

const ECGInput: React.FC<ECGInputProps> = ({
    label,
    value,
    htmlFor,
    step,
    min,
    max,
    id,
    onChange
}) => {
    return (
        <div className="param-group">
            <label htmlFor={htmlFor}>{label}</label>
            <input
                type="number"
                id={id}
                value={value}
                step={step}
                min={min}
                max={max}
                onChange={onChange} />
        </div>
    )
}

export default ECGInput