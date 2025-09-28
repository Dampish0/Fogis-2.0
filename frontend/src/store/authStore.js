import {create } from 'zustand';
import axios from 'axios';

const apiURL =  'http://localhost:5001';
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    loading: false,
    isCheckingAuth: true,

    register: async (name, email, password) => {
        set({loading: true, error: null});
        try {
            const response = await axios.post(`${apiURL}/api/auth/createuser`, {name, email, password}, {withCredentials: true});
            set({user: response.data.user, isAuthenticated: true, loading: false});
        } catch (error) {
            set({error: error.response?.data?.message || "Misslyckades att registrerar", loading: false});
            throw error;
        }
    },

    login: async (email, password) => {
        set({loading: true, error: null});
        try {
            const response = await axios.post(`${apiURL}/api/auth/login`, {email, password}, {withCredentials: true});
            if(response.data.success === false){
                set({error: response.data.message, loading: false, isAuthenticated: false, user: null});
                return;
            }
            set({user: response.data.user, isAuthenticated: true, error: null, loading: false});
        } catch (error) {
            set({error: error.response?.data?.message || "Misslyckades att logga in", loading: false});
            throw error;
        }
    },
    logout: async () => {
        set({loading: true, error: null});
        try {
            await axios.post(`${apiURL}/api/auth/logout`, {}, {withCredentials: true});
            set({user: null, isAuthenticated: false, loading: false});
        } catch (error) {
            set({error: error.response?.data?.message || "Misslyckades att logga ut", loading: false});
            throw error;
        }
    },
    checkAuth: async () => {
        set({isCheckingAuth: true, error: null});
        try {
            const response = await axios.get(`${apiURL}/api/auth/check-auth`, {withCredentials: true});
            if(response.data.success === false){
                set({user: null, isAuthenticated: false, isCheckingAuth: false});
                return;
            }
            set({user: response.data.user, isAuthenticated: true, isCheckingAuth: false});
        } catch (error) {
            set({user: null, isAuthenticated: false, isCheckingAuth: false, error: null});
            throw error;
        }
    },

    sendPassResetRequest: async (email) => {
        set({loading: true, error: null});
        try {
            await axios.post(`${apiURL}/api/auth/forgotpass`, {email: email}, {withCredentials: true});
            set({loading: false});
        } catch (error) {
            set({error: error.response?.data?.message || "Misslyckades att skicka återställningslänk", loading: false});
            throw error;
        }
    },

    resetPassword: async (token, newPassword) => {
        set({loading: true, error: null});
        try {
            await axios.post(`${apiURL}/api/auth/resetpass/${token}`, {password: newPassword}, {withCredentials: true});
            set({loading: false});
        } catch (error) {
            set({error: error.response?.data?.message || "Misslyckades att återställa lösenord", loading: false});
            throw error;
        }
    },


}));

export default useAuthStore;