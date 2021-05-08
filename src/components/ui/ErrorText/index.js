import React from 'react';
import s from './ErrorText.module.scss';


const ErrorText = ({children}) => (
    <p className={s.errorText}>{children}</p>
);

export default ErrorText;
