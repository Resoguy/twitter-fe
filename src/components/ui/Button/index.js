import React from 'react';
import s from './Button.module.scss';


const Button = ({
    children, 
    onClick, 
    type = 'button', 
    loading = false, 
    disabled = false
}) => (
    <button 
        className={`${s.button} ${loading ? s.loading : ''}`}
        type={type}
        disabled={loading || disabled}
        onClick={onClick}>
        {loading ? '...Loading' : children}
    </button>
)

export default Button;
