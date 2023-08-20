import { applyMiddleware, combineReducers, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunkMiddleware from 'redux-thunk';
import appReducer from './appReducer';
import authReducer from './authReducer';
import dialogsReducer from './dialogsReducer';
import profileReducer from './profileReducer';
import usersReducer from './usersReducer';

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    dialogs: dialogsReducer,
    profile: profileReducer,
    users: usersReducer,
    form: formReducer
})

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store

export type RootState = ReturnType<typeof rootReducer>
export type InferActionsTypes<T> = T extends { [key: string]: (...args: any) => infer U } ? U : never
