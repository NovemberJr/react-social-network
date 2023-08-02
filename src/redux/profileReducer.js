import { profileAPI } from '../api/api';

const SET_LOADED = 'profile/SET_LOADED';
const SET_PROFILE = 'profile/SET_PROFILE';
const SET_STATUS = 'profile/SET_STATUS';
const UPDATE_NEW_POST_FIELD = 'profile/UPDATE_NEW_POST_FIELD';
const ADD_POST = 'profile/ADD_POST';

const initialState = {
    profile: null,
    status: '',
    newPostText: '',
    posts: [
        {id: 1, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
        {id: 2, text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}
    ],
    isLoaded: false
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADED:
        case SET_PROFILE:
        case SET_STATUS:
        case UPDATE_NEW_POST_FIELD:
            return {
                ...state,
                ...action.payload
            }
        case ADD_POST:
        const length = state.posts.length;
        const posts = [
            ...state.posts,
            {id: length + 1, text: state.newPostText}
        ]
        return {
            ...state,
            posts,
            newPostText: ''
        }
        default:
            return state
    }
}

export default profileReducer

//action creators

export const setLoaded = (isLoaded) => ({
    type: SET_LOADED,
    payload: {
        isLoaded: isLoaded
    }
})

export const setProfile = (profileData) => ({
    type: SET_PROFILE,
    payload: {
        profile: profileData
    }
})

export const setStatus = (status) => ({
    type: SET_STATUS,
    payload: {
        status: status
    }
})

export const updateNewPostField = (newText) => ({
    type: UPDATE_NEW_POST_FIELD,
    payload: {
        newPostText: newText
    }
})

export const addPost = () => ({
    type: ADD_POST
})

//thunks

export const getProfile = (userId) => async (dispatch) => {
    Promise.all([
        profileAPI.getProfile(userId).then(profileData => {
            dispatch(setProfile(profileData));
        }),
        profileAPI.getStatus(userId).then(status => {
            dispatch(setStatus(status))
        })
    ]).then(() => {
        dispatch(setLoaded(true))
    })
}

export const updateStatus = (status) => async (dispatch) => {
    profileAPI.setStatus(status);
}
