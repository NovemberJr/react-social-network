import Profile from './ProfileContainer';
import withAuthRedirect from '../../hoc/withAuthRedirect';

const MyProfile = ({ id }: { id: number }) => {
    return <Profile myId={id} />
}

export default withAuthRedirect(MyProfile)
