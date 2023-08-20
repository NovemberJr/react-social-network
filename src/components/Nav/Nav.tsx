import { NavLink } from 'react-router-dom';

const Nav = () => {
    return <nav className='nav'>
        <div>
            <NavLink to='/profile' className='nav__link'>
                <span className='nav__text'>My Profile</span>
            </NavLink>
        </div>
        <div>
            <NavLink to='/dialogs' className='nav__link'>
                <span className='nav__text'>Dialogs</span>
            </NavLink>
        </div>
        <div>
            <NavLink to='/users' className='nav__link'>
                <span className='nav__text'>Users</span>
            </NavLink>
        </div>
    </nav>
}

export default Nav