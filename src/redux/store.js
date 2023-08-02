import { applyMiddleware, combineReducers, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunkMiddleware from 'redux-thunk';
import appReducer from './appReducer';
import authReducer from './authReducer';
import dialogsReducer from './dialogsReducer';
import profileReducer from './profileReducer';
import usersReducer from './usersReducer';

const reducers = combineReducers({
    app: appReducer,
    auth: authReducer,
    dialogs: dialogsReducer,
    profile: profileReducer,
    users: usersReducer,
    form: formReducer
})

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store