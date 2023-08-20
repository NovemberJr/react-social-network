import { useEffect } from 'react';
import { connect } from 'react-redux';
import { actions, getProfile, updateStatus } from '../../redux/profileReducer';
import { useParams } from 'react-router-dom';
import Profile from './Profile';
import './Profile.css';
import { PostData, ProfileData } from '../../typescript/types';
import { RootState } from '../../redux/store';

const mstp = (state: RootState): StateProps => ({
    profile: state.profile.profile,
    status: state.profile.status,
    newPostText: state.profile.newPostText,
    posts: state.profile.posts,
    isLoaded: state.profile.isLoaded
})

const ProfileContainer = ({ isLoaded, profile, getProfile, setLoaded, ...props }: StateProps & DispatchProps & OwnProps) => {
    const params = useParams();
    let userId: number;
    if (params.userId) {
        userId = +params.userId
    } else if (props.myId) {
        userId = props.myId
    } else {
        throw new Error('Cannot set profile id')
    }

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

export default connect<StateProps, DispatchProps, OwnProps, RootState>(mstp, {
    updateNewPostField: actions.updateNewPostField,
    addPost: actions.addPost,
    setLoaded: actions.setLoaded,
    getProfile,
    updateStatus
})(ProfileContainer)

type StateProps = {
    profile: ProfileData | null
    status: string
    newPostText: string
    posts: Array<PostData>
    isLoaded: boolean
}

type DispatchProps = {
    getProfile: (userId: number) => void
    updateNewPostField: (text: string) => void
    addPost: () => void
    updateStatus: (text: string) => void
    setLoaded: (isLoaded: boolean) => void
}

type OwnProps = {
    myId?: number
}
