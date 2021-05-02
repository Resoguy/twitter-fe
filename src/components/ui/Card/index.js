import React from 'react';
import s from './Card.module.scss';


const Card = ({children}) => (
    <div className={s.card}>
        {children}
    </div>
)

export default Card;
