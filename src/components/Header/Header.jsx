import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../redux/authReducer';
import { NavLink } from 'react-router-dom';
import './Header.css';

const mstp = (state) => ({
    isAppInitialized: state.app.isInitialized,
    isLogged: state.auth.isLogged,
    user: state.auth.login
})

const Header = ({ isAppInitialized, isLogged, user, logout }) => {
    const logoutClick = () => {
        logout()
    }

    return <header className='header'>
        <div className='container'>
            <div className='header__content'>
                {isAppInitialized ? (<>
                    {isLogged ? (<>
                        <span className='header__user'>{user}</span>
                        <button className='header__button' onClick={logoutClick}>Logout</button>
                    </>) : (<>
                        <span className='header__user'>You are not authorized</span>
                        <NavLink to='/login'>Log in</NavLink>
                    </>)}
                </>) : <></>}
            </div>
        </div>
    </header>
}

export default connect(mstp, { logout })(Header)
