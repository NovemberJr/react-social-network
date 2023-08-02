import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './Users.css';
import { getUsers, followUnfollowCallback } from '../../redux/usersReducer';
import User from './User/User';
import Paginator from '../UI/Paginator';

const mstp = (state) => ({
    isLogged: state.auth.isLogged,
    users: state.users.users,
    totalUsersCount: state.users.totalUsersCount,
    usersPerPage: state.users.usersPerPage,
    disabledButtons: state.users.disabledButtons
})

const Users = ({ isLogged, users, totalUsersCount, usersPerPage, disabledButtons, followUnfollowCallback, getUsers }) => {
    let [usersPage, setUsersPage] = useState(1);
    useEffect(() => {
        getUsers(usersPerPage)
    }, [getUsers, usersPerPage]);

    const pagesCount = Math.ceil(totalUsersCount / usersPerPage);
    
    const pageCallback = (usersPage) => {
        getUsers(usersPerPage, usersPage);
        setUsersPage(usersPage);
    }

    return <div className='users block'>
        <Paginator totalPages={pagesCount} currentPage={usersPage} pagesGroupSize={20} pageCallback={pageCallback} />
        <ul className='users__list'>
            {users.map(el => <User {...el} isLogged={isLogged} followUnfollowCallback={followUnfollowCallback} key={`user/${el.id}`} disabledFollow={disabledButtons.includes(el.id)} />)}
        </ul>
    </div>
}

export default connect(mstp, { getUsers, followUnfollowCallback })(Users)

/*
count: (integer - default: 10 - maximum: 100)
page size (how many items will be returned in response)

page: (integer - default: 1)
number of portion of items

term: (string)
user name string for searching

friend: (boolean)
if true, then find only followed users, false - only not followed users, if omit parameter - all users
*/
