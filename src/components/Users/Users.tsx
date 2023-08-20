import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './Users.css';
import { getUsers, followUnfollowCallback } from '../../redux/usersReducer';
import User from './User/User';
import Paginator from '../UI/Paginator';
import { RootState } from '../../redux/store';

type StateProps = {
    isLogged: boolean,
    users: Array<any>,
    totalUsersCount: number | null,
    usersPerPage: number,
    disabledButtons: Array<number>
}

type DispatchProps = {
    getUsers: (count: number, page: number) => void
    followUnfollowCallback: (userId: number, newFollowState: boolean) => void,
}

type OwnProps = {}  //Props defined directly in the parent component

const mstp = (state: RootState): StateProps => ({
    isLogged: state.auth.isLogged,
    users: state.users.users,
    totalUsersCount: state.users.totalUsersCount,
    usersPerPage: state.users.usersPerPage,
    disabledButtons: state.users.disabledButtons
})

const Users: React.FC<StateProps & DispatchProps & OwnProps> = ({ isLogged, users, totalUsersCount, usersPerPage, disabledButtons, followUnfollowCallback, getUsers }) => {
    let [usersPage, setUsersPage] = useState(1);
    useEffect(() => {
        getUsers(usersPerPage, 1)
    }, [getUsers, usersPerPage]);

    const pagesCount = totalUsersCount !== null ? Math.ceil(totalUsersCount / usersPerPage) : 0;
    
    const pageCallback = (usersPage: number) => {
        getUsers(usersPerPage, usersPage);
        setUsersPage(usersPage);
    }

    return <div className='users block'>
        <Paginator totalPages={pagesCount} currentPageNumber={usersPage} pagesGroupSize={20} pageCallback={pageCallback} />
        <ul className='users__list'>
            {users.map(el => <User {...el} isLogged={isLogged} followUnfollowCallback={followUnfollowCallback} key={`user/${el.id}`} disabledFollow={disabledButtons.includes(el.id)} />)}
        </ul>
    </div>
}

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
    mstp,
    { getUsers, followUnfollowCallback }
)(Users)
