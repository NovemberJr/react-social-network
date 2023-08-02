import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

const authRedirect = (Component) => {
    const mstp = state => ({
        id: state.auth.id,
        isLogged: state.auth.isLogged,
    })

    const redirectionComponent = (props) => {
        if (!props.isLogged) return <Navigate to='/login' />
        return <Component {...props} />
    }

    return connect(mstp, null)(redirectionComponent)
}

export default authRedirect
