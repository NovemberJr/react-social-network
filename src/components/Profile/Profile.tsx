import ProfileStatus from './ProfileStatus';
import { ContactsData, PostData, ProfileData } from '../../typescript/types';

const Contacts = ({ contacts }: { contacts: ContactsData }) => {
    const filteredContacts = Object.entries(contacts).filter(el => el[1] !== null);
    if (filteredContacts.length === 0) return <></>;
    return <ul className='profile__contacts'>
        {filteredContacts.map((el, i) => (<li className='profile__contact' key={`contact${i}`}>
            {el[0]}: <a href={`http://${el[1]}`}>{el[1]}</a>
        </li>))}
    </ul>
}

const Profile = ({ profile, status, myId, posts, newPostText, updateNewPostField, addPost, updateStatus }: ProfileProps) => {
    const onNewPostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateNewPostField(e.target.value)
    }

    const handleAddPostClick = () => {
        if (newPostText === '') return;
        addPost()
    }

    //const handleUploadClick = () => {}

    if (profile === null) return <></>
    
    const photoUrl = profile.photos.large ? profile.photos.large : undefined;
    const postsReversed = [...posts].reverse();

    return <div className='profile'>
        <div className='profile__main block'>
            <img className='profile__pic' src={photoUrl} alt='' />
            {/*profile.userId === myId &&<div>
                <button className='profile__upload button' onclick={uploadClick} >Upload</button>
            </div>*/}
            <h2 className='profile__name'>{profile.fullName}</h2>
            <div>
                <ProfileStatus status={status} updateStatus={updateStatus} />
            </div>
            <p className='profile__about'>{profile.aboutMe === null ? '-----' : profile.aboutMe}</p>
            <Contacts contacts={profile.contacts} />
        </div>
        <div className='profile__posts'>
            <div className='profile__new-post block'>
                <input type='text' onChange={onNewPostChange} value={newPostText} placeholder='New post' className='profile__input'></input>
                <button onClick={handleAddPostClick} className='profile__send button'>Add post</button>
            </div>
            {postsReversed.map(el => <div className='profile__post block' key={el.id}>
                {el.text}
            </div>)}
        </div>
    </div>
}

export default Profile

type ProfileProps = {
    profile: ProfileData | null
    status: string
    posts: Array<PostData>
    newPostText: string
    myId?: number
    updateNewPostField: (text: string) => void
    addPost: () => void
    updateStatus: (text: string) => void
}
