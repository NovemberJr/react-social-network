import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getProfile, setLoaded, updateNewPostField, addPost, updateStatus } from '../../redux/profileReducer';
import { useParams } from 'react-router-dom';
import Profile from './Profile';
import './Profile.css';

const mstp = (state) => ({
    profile: state.profile.profile,
    status: state.profile.status,
    newPostText: state.profile.newPostText,
    posts: state.profile.posts,
    isLoaded: state.profile.isLoaded
})

const ProfileContainer = ({ isLoaded, profile, getProfile, setLoaded, ...props }) => {
    const params = useParams();
    const userId = params.userId ? +params.userId : props.myId;

    useEffect(() => {
        if (!profile || profile.userId !== userId) {
            setLoaded(false);
            getProfile(userId);
        }
    }, [ profile, userId, setLoaded, getProfile ]);
    
    
    if (!isLoaded) {
        return <></>
    } else {
        return <Profile profile={profile} {...props} />
    }
}

export default connect(mstp, { getProfile, updateNewPostField, addPost, updateStatus, setLoaded })(ProfileContainer)