import {create } from 'zustand';
import axios from 'axios';

const apiURL =  'http://localhost:5001';
export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    loading: false,
    isCheckingAuth: true,

    register: async (name, email, password) => {
        set({loading: true, error: null});
        try {
            const response = await axios.post(`${apiURL}/api/auth/createuser`, {name, email, password});
            set({user: response.data.user, isAuthenticated: true, loading: false});
        } catch (error) {
            set({error: error.response.data.message, loading: false});
        }
    },

    login: async (email, password) => {
        set({loading: true, error: null});
        try {
            const response = await axios.post(`${apiURL}/api/auth/login`, {email, password});
            set({user: response.data.user, isAuthenticated: true, loading: false});
        } catch (error) {
            set({error: error.response.data.message, loading: false});
        }
    },
    logout: async () => {
        set({loading: true, error: null});
        try {
            await axios.post(`${apiURL}/api/auth/logout`, {});
            set({user: null, isAuthenticated: false, loading: false});
        } catch (error) {
            set({error: error.response.data.message, loading: false});
        }
    },
    checkAuth: async () => {
        set({isCheckingAuth: true});
        try {
            const response = await axios.get(`${apiURL}/api/auth/check-auth`);
            set({user: response.data.user, isAuthenticated: true, isCheckingAuth: false});
        } catch (error) {
            set({user: null, isAuthenticated: false, isCheckingAuth: false});
        }
    },

    resetPassword: async (token, newPassword) => {
        set({loading: true, error: null});
        try {
            await axios.post(`${apiURL}/api/auth/resetpass/${token}`, {password: newPassword});
            set({loading: false});
        } catch (error) {
            set({error: error.response.data.message, loading: false});
        }
    },


}));

export default useAuthStore;