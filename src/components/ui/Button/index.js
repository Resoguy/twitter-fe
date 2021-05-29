import React from 'react';
import cc from 'classcat';
import s from './Button.module.scss';


const Button = ({
    children, 
    className = '',
    variant = 'normal', // 'normal' | 'outline'
    onClick, 
    type = 'button', // 'button' | 'reset' | 'submit'
    loading = false, 
    disabled = false,
    icon: Icon
}) => (
    <button 
        className={cc([
            s.button,
            className,
            s[variant],
            {
                [s.loading]: loading,
                [s.iconBtn]: Icon && !children,
            }
        ])}
        type={type}
        disabled={loading || disabled}
        onClick={onClick}>
        {Icon && <Icon className={children ? s.icon : ''} />}
        {children && (loading ? '...Loading' : children)}
    </button>
)

export default Button;
