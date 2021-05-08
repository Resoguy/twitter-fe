import React from 'react';
import s from './Input.module.scss';


const Input = ({
    label, 
    placeholder, 
    type = 'text', 
    name, 
    value, 
    onChange, 
    block = false,
    error = false
}) => (
    <div className={s.formGroup}>
        <label>
            {label}
        </label>

        <input
            className={`${block ? s.block : ''} ${error ? s.error : ''}`}
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange} />
    </div>
)

export default Input;
