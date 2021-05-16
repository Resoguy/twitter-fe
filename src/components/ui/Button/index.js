import React from 'react';
import s from './Button.module.scss';


const Button = ({
    children, 
    className = '',
    onClick, 
    type = 'button', 
    loading = false, 
    disabled = false,
    icon: Icon
}) => (
    <button 
        className={`${s.button} ${loading ? s.loading : ''} ${Icon && !children ? s.iconBtn : ''} ${className}`}
        type={type}
        disabled={loading || disabled}
        onClick={onClick}>
        {Icon && <Icon className={children ? s.icon : ''} />}
        {children && (loading ? '...Loading' : children)}
    </button>
)

export default Button;
