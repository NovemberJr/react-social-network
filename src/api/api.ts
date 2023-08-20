import axios from 'axios';
import { ProfileData, ServerResponse, UserData } from '../typescript/types';

const axiosInstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: {}
});

/*
export const securityAPI = {
    getCaptcha: async () => {
        const response = await axiosInstance.get('/security/get-captcha-url');
        if (response.data.resultCode === 0) {
            //url: required(string
        }
    }
}
*/

type GetMe = { id: number, login: string, email: string }

export const authAPI = {
    getMe: async (): Promise<ServerResponse<GetMe>> => {
        const resp = await axiosInstance.get('/auth/me');
        return resp.data
    },
    login: async (email: string, password: string, rememberMe = false, captcha = null): Promise<ServerResponse> => {
        const resp = await axiosInstance.post('/auth/login', { email, password, rememberMe, captcha });
        return resp.data
    },
    logout: async (): Promise<ServerResponse> => {
        const resp = await axiosInstance.delete('/auth/login');
        return resp.data
    },
}

type GetUsersResponse = {
    error: null
    items: Array<UserData>
    totalCount: number
}

export const usersAPI = {
    getUsers: async (count = 10, page = 1, term?: string, friend?: string): Promise<GetUsersResponse> => {
        const resp = await axiosInstance.get(`/users?count=${count}&page=${page}`);
        return resp.data
    }
}

export const profileAPI = {
    /*async setProfile () {
        const resp = await axiosInstance.put('/profile');
        return resp.data
    },*/
    /*async setPhoto () {
        const resp = await axiosInstance.put('/profile/photo');
        return resp.data
    },*/
    async setStatus (status: string): Promise<ServerResponse> {
        const resp = await axiosInstance.put('/profile/status', { status });
        return resp.data
    },
    async getStatus (userId: number): Promise<string|null> {
        const resp = await axiosInstance.get(`/profile/status/${userId}`);
        return resp.data
    },
    async getProfile (userId: number): Promise<ProfileData> {
        const resp = await axiosInstance.get(`/profile/${userId}`);
        return resp.data
    }
}

export const followAPI = {
    /*isFollowed: async (userId: number) => {
        const resp = await axiosInstance.get(`/follow/${userId}`);
        return resp.data
    },*/
    follow: async (userId: number): Promise<ServerResponse> => {
        const resp = await axiosInstance.post(`/follow/${userId}`);
        return resp.data;
    },
    unfollow: async (userId: number): Promise<ServerResponse> => {
        const resp = await axiosInstance.delete(`/follow/${userId}`);
        return resp.data
    }
}
