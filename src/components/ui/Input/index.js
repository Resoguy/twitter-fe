import React from 'react';
import {ErrorMessage} from 'formik';
import {ErrorText} from '../index';
import s from './Input.module.scss';


const Input = ({
    label, 
    placeholder, 
    type = 'text', 
    name, 
    value, 
    onChange, 
    block = false,
    error = false,
    marginless = false,
    cols = 30,
    rows = 5
}) => (
    <div className={`${s.formGroup} ${marginless ? s.marginless : ''}`}>
        {
            label &&
            <label>
                {label}
            </label>
        }

        {
            type === 'textarea' ?
            <textarea
                className={`${block ? s.block : ''} ${error ? s.error : ''}`}
                type={type}
                name={name}
                cols={cols}
                rows={rows}
                placeholder={placeholder}
                value={value}
                onChange={onChange}>
            </textarea> :
            <input
                className={`${block ? s.block : ''} ${error ? s.error : ''}`}
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange} />
        }

        {name && <ErrorMessage name={name} component={ErrorText} />}
    </div>
)

export default Input;
