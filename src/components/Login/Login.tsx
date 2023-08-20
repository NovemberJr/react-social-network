import { connect } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { login } from '../../redux/authReducer';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { LoginData } from '../../typescript/types';

const mstp = (state: RootState): StateProps => ({
    captchaUrl: state.auth.captchaUrl,
    isLogged: state.auth.isLogged
})

const LoginForm = ({ handleSubmit, captchaUrl }: InjectedFormProps<LoginData, FormProps> & FormProps) => {
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

const LoginReduxForm = reduxForm<LoginData, FormProps>({ form: "login" })(LoginForm)

const Login = ({ captchaUrl, isLogged, login }: StateProps & DispatchProps) => {
    //useEffect(() => {}, [isLogged])
    const onSubmit = (data: LoginData) => {
        login(data)
    }

    if (isLogged) {
        return <Navigate to='/profile' />
    }

    return <div className='block'>
        <h3>Log in</h3>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
    </div>
}

export default connect<StateProps, DispatchProps, unknown, RootState>(mstp, { login })(Login)

type StateProps = {
    captchaUrl: string | null
    isLogged: boolean
}

type DispatchProps = {
    login: (data: LoginData) => void
}

type FormProps = {
    captchaUrl: string | null
}
