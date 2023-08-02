import { usersAPI, followAPI } from '../api/api';

const SET_USERS = 'users/SET_USERS';
const CONFIRM_FOLLOW_UNFOLLOW = 'users/CONFIRM_FOLLOW';
const DISABLE_FOLLOW_BUTTON = 'users/DISABLE_FOLLOW_BUTTON';

const initialState = {
    users: [],
    totalUsersCount: null,
    usersPerPage: 10,
    disabledButtons: []
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case DISABLE_FOLLOW_BUTTON:
            let newDisabledButtons = action.disable ? 
                state.disabledButtons.concat([action.userId]) :
                state.disabledButtons.filter(el => el !== action.userId)
            return {
                ...state,
                disabledButtons: newDisabledButtons
            }
        case CONFIRM_FOLLOW_UNFOLLOW:
            return {
                ...state,
                users: state.users.map(el => el.id === action.userId ? {...el, followed: action.newFollowState} : el)
            }
        case SET_USERS:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export default usersReducer

//action creators

export const setUsers = (users) => ({
    type: SET_USERS,
    payload: {
        users: users.items,
        totalUsersCount: users.totalCount
    }
})

export const confirmFollowUnfollow = (userId, newFollowState) => ({
    type: CONFIRM_FOLLOW_UNFOLLOW,
    userId: userId,
    newFollowState: newFollowState
})

export const disableFollowButton = (userId, disable) => ({
    type: DISABLE_FOLLOW_BUTTON,
    userId: userId,
    disable: disable
})

//thunks

export const getUsers = (count, page) => async (dispatch) => {
    const resp = await usersAPI.getUsers(count, page);
    dispatch(setUsers(resp));
}

export const followUnfollowCallback = (userId, newFollowState) => async (dispatch) => {
    dispatch(disableFollowButton(userId, true));
    const resp = newFollowState ?
        await followAPI.follow(userId):
        await followAPI.unfollow(userId);
    if (resp.resultCode === 0) {
        dispatch(confirmFollowUnfollow(userId, newFollowState));
        dispatch(disableFollowButton(userId, false))
    }
}
