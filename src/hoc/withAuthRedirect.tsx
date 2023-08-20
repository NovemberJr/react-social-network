import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../redux/store';

type AuthProps = {
    id: number | null
    isLogged: boolean
}

const withAuthRedirect = (Component: React.FC<any>) => {
    const mstp = (state: RootState): AuthProps => ({
        id: state.auth.id,
        isLogged: state.auth.isLogged,
    })

    const redirectionComponent = (props: AuthProps) => {
        if (!props.isLogged) return (<Navigate to='/login' />)
        return <Component id={props.id as number} />
    }

    return connect<AuthProps, unknown, unknown, RootState>(mstp)(redirectionComponent)
}

export default withAuthRedirect
