import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { logout } from '../../store/thunks';
import s from './Toolbar.module.scss';


const Toolbar = ({ isAuthenticated, logout }) => (
    <nav className={s.toolbar}>
        <Link className={s.brandLogo} to="/">
            Twitter App
        </Link>

        <ul className={s.toolbarList}>
            {
                !isAuthenticated ?
                    <>
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
                    </> :
                    <li className={s.toolbarItem}>
                        <a href="#" className={s.toolbarLink} onClick={logout}>
                            Logout
                        </a>
                    </li>
            }
        </ul>
    </nav>
);

const mapStateToProps = state => ({
    isAuthenticated: !!state.auth.user
})

const mapDispatchToProps = {
    logout
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
