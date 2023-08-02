import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: {}
});

export const securityAPI = {
    getCaptcha: async () => {
        const response = await axiosInstance.get('/security/get-captcha-url');
        if (response.data.resultCode === 0) {
            //url: required(string
        }
    }
}

export const authAPI = {
    me: async () => {
        const resp = await axiosInstance.get('/auth/me');
        return resp.data
    },
    login: async (email, password, rememberMe = false, captcha = null) => {
        const resp = await axiosInstance.post('/auth/login', { email, password, rememberMe, captcha });
        return resp.data
    },
    logout: async () => {
        const resp = await axiosInstance.delete('/auth/login');
        return resp.data
    },
}

export const usersAPI = {
    getUsers: async (count = 10, page = 1, term, friend) => {
        const resp = await axiosInstance.get(`/users?count=${count}&page=${page}`);
        return resp.data
    }
}

export const profileAPI = {
    async setProfile () {
        const resp = await axiosInstance.put('/profile');
        return resp.data
    },
    async setPhoto () {
        const resp = await axiosInstance.put('/profile/photo');
        return resp.data
    },
    async setStatus (status) {
        const resp = await axiosInstance.put('/profile/status', { status });
        return resp.data
    },
    async getStatus (userId = 2) {
        const resp = await axiosInstance.get(`/profile/status/${userId}`);
        return resp.data
    },
    async getProfile (userId = 2) {
        const resp = await axiosInstance.get(`/profile/${userId}`);
        if (resp.status === 200) {
            return resp.data
        }
    }
}

export const followAPI = {
    isFollowed: async (userId) => {
        const resp = await axiosInstance.get(`/follow/${userId}`);
        return resp.data
    },
    follow: async (userId) => {
        const resp = await axiosInstance.post(`/follow/${userId}`);
        return resp.data;
    },
    unfollow: async (userId) => {
        const resp = await axiosInstance.delete(`/follow/${userId}`);
        return resp.data
    }
}
