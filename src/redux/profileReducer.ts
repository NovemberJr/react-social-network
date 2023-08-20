import { profileAPI } from '../api/api';
import { ProfileData, PostData } from '../typescript/types';
import { RootState, InferActionsTypes } from './store';
import { ThunkAction } from 'redux-thunk';

const initialState = {
    profile: null as ProfileData | null,
    status: '',
    newPostText: '',
    posts: [
        {id: 1, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
        {id: 2, text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}
    ] as Array<PostData>,
    isLoaded: false
}

type ProfileState = typeof initialState

const profileReducer = (state = initialState, action: Actions): ProfileState => {
    switch (action.type) {
        case 'profile/SET_LOADED':
        case 'profile/SET_PROFILE':
        case 'profile/SET_STATUS':
        case 'profile/UPDATE_NEW_POST_FIELD':
            return {
                ...state,
                ...action.payload
            }
        case 'profile/ADD_POST':
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

export const actions = {
    setLoaded: (isLoaded: boolean) => ({
        type: 'profile/SET_LOADED' as const,
        payload: {
            isLoaded: isLoaded
        }
    }),
    setProfile: (profileData: ProfileData) => ({
        type: 'profile/SET_PROFILE' as const,
        payload: {
            profile: profileData
        }
    }),
    setStatus: (status: string) => ({
        type: 'profile/SET_STATUS' as const,
        payload: {
            status: status
        }
    }),
    updateNewPostField: (newText: string) => ({
        type: 'profile/UPDATE_NEW_POST_FIELD' as const,
        payload: {
            newPostText: newText
        }
    }),
    addPost: () => ({
        type: 'profile/ADD_POST' as const
    })
}

type Actions = InferActionsTypes<typeof actions>

//thunks

export const getProfile = (userId: number): ThunkAction<Promise<void>, RootState, unknown, any> => async (dispatch) => {
    Promise.all([
        profileAPI.getProfile(userId).then((profileData) => {
            dispatch(actions.setProfile(profileData));
        }),
        profileAPI.getStatus(userId).then(status => {
            dispatch(actions.setStatus(status === null ? '' : status))
        })
    ]).then(() => {
        dispatch(actions.setLoaded(true))
    })
}

export const updateStatus = (status: string): ThunkAction<Promise<void>, RootState, unknown, any> => async (dispatch) => {
    profileAPI.setStatus(status);
}
