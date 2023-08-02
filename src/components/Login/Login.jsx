import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { login } from '../../redux/authReducer';
import { Navigate } from 'react-router-dom';

const mstp = state => ({
    isLogged: state.auth.isLogged
})

const LoginForm = ({ handleSubmit }) => {
    return <form onSubmit={handleSubmit} className='login__form'>
        <div>
            <Field component='input' name='email' placeholder='Email' className='login__input' />
        </div>
        <div>
            <Field component='input' name='password' type='password' placeholder='Password' className='login__input' />
        </div>
        <div>
            <Field component='input' name='remember' type='checkbox' />Remember me
        </div>
        <div>
            <button>Login</button>
        </div>
    </form>
}

const LoginReduxForm = reduxForm({ form: "login" })(LoginForm)

const Login = ({ isLogged, login }) => {
    //useEffect(() => {}, [isLogged])
    const onSubmit = (data) => {
        login(data)
    }

    if (isLogged) {
        return <Navigate to='/profile' />
    }

    return <div className='block'>
        <h3>Log in</h3>
        <LoginReduxForm onSubmit={onSubmit} />
    </div>
}

export default connect(mstp, { login })(Login)