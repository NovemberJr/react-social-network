import React from 'react';
import ProfileStatus from './ProfileStatus';

/*{ facebook, github, instagram, mainLink, twitter, vk, website, youtube }*/
const Contacts = (props) => {
    const contacts = Object.entries(props).filter(el => el[1] !== null);
    if (contacts.length === 0) return <></>;
    return <ul className='profile__contacts'>
        {contacts.map((el, i) => (<li className='profile__contact' key={`contact${i}`}>
            {el[0]}: <a href={`http://${el[1]}`}>{el[1]}</a>
        </li>))}
    </ul>
}

const Profile = ({ profile, status, myId, posts, newPostText, updateNewPostField, addPost, updateStatus }) => {
    const onNewPostChange = (e) => {
        const newText = e.target.value;
        updateNewPostField(newText)
    }
    const onClick = () => {
        if (newPostText === '') return;
        addPost() 
    }

    //const uploadClick = () => {}

    return <div className='profile'>
        <div className='profile__main block'>
            <img className='profile__pic' src={profile.photos.large} alt='' />
            {/*profile.userId === myId &&<div>
                <button className='profile__upload button' onclick={uploadClick} >Upload</button>
</div>*/}
            <h2 className='profile__name'>{profile.fullName}</h2>
            <div>
                <ProfileStatus status={status} updateStatus={updateStatus} />
            </div>
            <p className='profile__about'>{profile.aboutMe === null ? '-----' : profile.aboutMe}</p>
            <Contacts {...profile.contacts} />
        </div>
        <div className='profile__posts'>
            <div className='profile__new-post block'>
                <input type='text' onChange={onNewPostChange} value={newPostText} placeholder='New post' className='profile__input'></input>
                <button onClick={onClick} className='profile__send button'>Add post</button>
            </div>
            {posts.toReversed().map(el => <div className='profile__post block' key={el.id}>
                {el.text}
            </div>)}
        </div>
    </div>
}

export default Profile