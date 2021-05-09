import React from 'react';
import s from './Card.module.scss';


const Card = ({children, className = '', flex = false}) => (
    <div className={`${s.card} ${className} ${flex ? s.flex : ''}`}>
        {children}
    </div>
)

export default Card;
