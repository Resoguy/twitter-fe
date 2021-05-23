import React from 'react';
import s from './Image.module.scss';


const Image = ({
    icon: Icon,
    onClick,
    src,
    alt = ''
}) => {

    return (
        <a 
            className={s.imgBtn} 
            role='button' 
            onClick={onClick}>
            <Icon className={s.imgIcon} />
            <img
                className={s.img}
                src={src}
                alt={alt} />
        </a>
    )
}

export default Image;
