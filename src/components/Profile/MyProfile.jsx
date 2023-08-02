import React from 'react';
import Profile from './ProfileContainer';
import authRedirect from '../../hoc/withAuth';

const MyProfile = ({ id }) => {
    return <Profile myId={id} />
}

export default authRedirect(MyProfile)
