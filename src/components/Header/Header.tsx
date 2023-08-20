import { connect } from 'react-redux';
import { logout } from '../../redux/authReducer';
import { NavLink } from 'react-router-dom';
import './Header.css';
import { RootState } from '../../redux/store';

const mstp = (state: RootState): StateProps => ({
    isAppInitialized: state.app.isInitialized,
    isLogged: state.auth.isLogged,
    user: state.auth.login
})

const Header = ({ isAppInitialized, isLogged, user, logout }: StateProps & DispatchProps) => {
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

export default connect<StateProps, DispatchProps, unknown, RootState>(mstp, { logout })(Header)

type StateProps = {
    isAppInitialized: boolean,
    isLogged: boolean,
    user: string | null
}

type DispatchProps = {
    logout: () => void
}
