/*
import { useLocation, useNavigate, useParams } from 'react-router-dom';

type RouterProps = {
    router: {
        location: ReturnType<typeof useLocation>
        navigate: ReturnType<typeof useNavigate>
        params: ReturnType<typeof useParams>    
    }
}

const withRouter = (Component: React.FC<RouterProps>) => {
    const router = {
        location: useLocation(),
        navigate: useNavigate(),
        params: useParams()
    }

    const newComponent = () => {
        return <Component router={router} />
    }

    return newComponent
}

export default withRouter
*/