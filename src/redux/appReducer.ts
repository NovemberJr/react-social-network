import { getMe } from './authReducer';
import { InferActionsTypes, RootState } from './store';
import { ThunkAction } from 'redux-thunk';

const initialState = {
    isInitialized: false
}

type AppState = typeof initialState

const appReducer = (state = initialState, action: Actions): AppState => {
    switch (action.type) {
        case 'app/SET_INITIALIZED':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export default appReducer

export const actions = {
    setInitialized: () => ({
        type: 'app/SET_INITIALIZED' as const,
        payload: { isInitialized: true }
    })
}

type Actions = InferActionsTypes<typeof actions>

//thunks

export const initApp = (): ThunkAction<Promise<void>, RootState, unknown, Actions> => async (dispatch) => {
    await dispatch(getMe());
    dispatch(actions.setInitialized())
}

