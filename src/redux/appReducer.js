//import { authAPI } from '../api/api';
import { getMe } from './authReducer';

const SET_INITIALIZED = 'app/SET_INITIALIZED';

const initialState = {
    isInitialized: false,
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZED:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export default appReducer

//action creators

export const setInitialized = () => ({
    type: SET_INITIALIZED,
    payload: {
        isInitialized: true
    }
})

//thunks

export const initApp = () => async (dispatch) => {
    await dispatch(getMe());
    dispatch(setInitialized())
}

