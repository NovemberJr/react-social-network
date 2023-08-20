import { usersAPI, followAPI } from '../api/api';
import { ThunkAction } from 'redux-thunk';
import { InferActionsTypes, RootState } from './store';
import { UserData, resultCodeEnum } from '../typescript/types';

const initialState = {
    users: [] as Array<UserData>,
    totalUsersCount: null as number | null,
    usersPerPage: 10,
    disabledButtons: [] as Array<number>
}

type UsersState =  typeof initialState

const usersReducer = (state = initialState, action: Actions): UsersState => {
    switch (action.type) {
        case 'users/DISABLE_FOLLOW_BUTTON':
            let newDisabledButtons = action.disable ? 
                state.disabledButtons.concat([action.userId]) :
                state.disabledButtons.filter(el => el !== action.userId)
            return {
                ...state,
                disabledButtons: newDisabledButtons
            }
        case 'users/CONFIRM_FOLLOW':
            return {
                ...state,
                users: state.users.map(el => el.id === action.userId ? {...el, followed: action.newFollowState} : el)
            }
        case 'users/SET_USERS':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export default usersReducer

export const actions = {
    setUsers: (users: any) => ({
        type: 'users/SET_USERS' as const,
        payload: {
            users: users.items,
            totalUsersCount: users.totalCount
        }
    }),
    confirmFollowUnfollow: (userId: number, newFollowState: boolean) => ({
        type: 'users/CONFIRM_FOLLOW' as const,
        userId: userId,
        newFollowState: newFollowState
    }),
    disableFollowButton: (userId: number, disable: boolean) => ({
        type: 'users/DISABLE_FOLLOW_BUTTON' as const,
        userId: userId,
        disable: disable
    })

}

type Actions = InferActionsTypes<typeof actions>

//thunks

export const getUsers = (count: number, page: number): ThunkAction<Promise<void>, RootState, unknown, Actions> => async (dispatch) => {
    const resp = await usersAPI.getUsers(count, page);
    dispatch(actions.setUsers(resp));
}

export const followUnfollowCallback = (userId: number, newFollowState: boolean): ThunkAction<Promise<void>, RootState, unknown, Actions> => async (dispatch) => {
    dispatch(actions.disableFollowButton(userId, true));
    const resp = newFollowState ?
        await followAPI.follow(userId):
        await followAPI.unfollow(userId);
    if (resp.resultCode === resultCodeEnum.Success) {
        dispatch(actions.confirmFollowUnfollow(userId, newFollowState));
        dispatch(actions.disableFollowButton(userId, false))
    }
}
