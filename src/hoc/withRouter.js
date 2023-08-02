import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const withRouter = (Component) => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const newComponent = (props) => {
        return <Component {...props} router={{ location, navigate, params }} />
    }
    return newComponent
}

export default withRouter