import { authAPI } from '../api/api';

const SET_AUTH_USER_DATA = 'auth/SET_AUTH_USER_DATA';

const initialState = {
    id: null,
    email: null,
    login: null,
    isLogged: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export default authReducer

//action creators

export const setAuthUserData = (id, email, login, isLogged) => ({
    type: SET_AUTH_USER_DATA,
    payload: { id, email, login, isLogged }
})

//thunks

export const getMe = () => async (dispatch) => {
    const resp = await authAPI.me();
    if (resp.resultCode === 0) {
        const { id, email, login } = resp.data;
        dispatch(setAuthUserData(id, email, login, true))
    }
}

export const login = ({ email, password, remember, captcha }) => async (dispatch) => {
    const resp = await authAPI.login(email, password, remember, captcha);
    if (resp.resultCode === 0) {
        dispatch(getMe())
    }
}

export const logout = () => async (dispatch) => {
    const resp = await authAPI.logout();
    if (resp.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}
