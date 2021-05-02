import React from 'react';
import {Link} from 'react-router-dom';
import s from './Toolbar.module.scss';


const Toolbar = () => (
    <nav className={s.toolbar}>
        <Link className={s.brandLogo} to="/">
            Twitter App
        </Link>

        <ul className={s.toolbarList}>
            <li className={s.toolbarItem}>
                <Link className={s.toolbarLink} to="/login">
                    Login
                </Link>
            </li>
            <li className={s.toolbarItem}>
                <Link className={s.toolbarLink} to="/register">
                    Register
                </Link>
            </li>
        </ul>
    </nav>
)

export default Toolbar;
