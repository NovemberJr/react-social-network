import { authAPI } from '../api/api';
import { resultCodeEnum, LoginData } from '../typescript/types';
import { InferActionsTypes, RootState } from './store';
import { ThunkAction } from 'redux-thunk';

const initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isLogged: false as boolean,
    captchaUrl: null as string | null
}

type AuthState = typeof initialState

const authReducer = (state = initialState, action: Actions): AuthState => {
    switch (action.type) {
        case 'auth/SET_AUTH_USER_DATA':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export default authReducer

export const actions = {
    setAuthUserData: (id: number | null, email: string | null, login: string | null, isLogged: boolean) => ({
        type: 'auth/SET_AUTH_USER_DATA' as const,
        payload: { id, email, login, isLogged }
    })
}

type Actions = InferActionsTypes<typeof actions>

//thunks

export const getMe = (): ThunkAction<Promise<void>, RootState, unknown, Actions> => async (dispatch) => {
    const resp = await authAPI.getMe();
    if (resp.resultCode === resultCodeEnum.Success) {
        const { id, email, login } = resp.data;
        dispatch(actions.setAuthUserData(id, email, login, true))
    }
}

export const login = ({ email, password, remember, captcha }: LoginData): ThunkAction<Promise<void>, RootState, unknown, Actions> => async (dispatch) => {
    const resp = await authAPI.login(email, password, remember, captcha);
    if (resp.resultCode === resultCodeEnum.Success) {
        dispatch(getMe())
    } else if (resp.resultCode === resultCodeEnum.CaptchaIsRequired) {

    }
}

export const logout = (): ThunkAction<Promise<void>, RootState, unknown, Actions> => async (dispatch) => {
    const resp = await authAPI.logout();
    if (resp.resultCode === 0) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}
