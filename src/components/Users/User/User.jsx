import React from 'react';
import { NavLink } from 'react-router-dom';

const User = ({ followed, id, name, photos, status, uniqueUrlName, disabledFollow, isLogged, followUnfollowCallback }) => {
    const photo = photos.small ? photos.small : '';

    const followClick = () => {
        followUnfollowCallback(id, true)
    }
    const unfollowClick = () => {
        followUnfollowCallback(id, false)
    }

    return <li className='user'>
        <div className='user__photo-wrap'>
            <img className='user__photo' src={photo} alt=''></img>
        </div>
        <div className='user__info'>
            <div className='user__info-line'>
                <NavLink to={`/profile/${id}`}>{name}</NavLink>
            </div>
            <div className='user__info-line'>
                <span className='user__status'>{status ? status : '-----'}</span>
            </div>
            {isLogged && <div className='user__info-line'>
                {followed ?
                (<button onClick={unfollowClick} disabled={disabledFollow}>Unfollow</button>):
                (<button onClick={followClick} disabled={disabledFollow}>Follow</button>)}
            </div>}
        </div>
    </li>
}

export default User
