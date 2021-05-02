import React from 'react';
import s from './Button.module.scss';


const Button = ({children, onClick, type = 'button'}) => (
    <button 
        className={s.button}
        type={type}
        onClick={onClick}>
        {children}
    </button>
)

export default Button;
