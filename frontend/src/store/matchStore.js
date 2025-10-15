import { create } from 'zustand';
import axios from 'axios';

const apiURL = 'http://localhost:5001';
axios.defaults.withCredentials = true;

export const useMatchStore = create((set) => ({
    matches: [],
    match: null,
    totalPages: 1,
    currentPage: 1,
    matchloading: false,
    error: null,

    fetchMatches: async (params = {}) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${apiURL}/api/match`, { params });
            set({
                matches: response.data.matches,
                totalPages: response.data.totalPages,
                currentPage: response.data.currentPage,
                loading: false,
                error: null,
            });
        } catch (error) {
            set({
                error: error.response?.data?.message || "Misslyckades att hämta matcher",
                loading: false,
            });
        }
    },

    fetchMatchById: async (id) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${apiURL}/api/match/${id}`);
            set({ match: response.data.match, loading: false, error: null });
        } catch (error) {
            set({
                error: error.response?.data?.message || "Misslyckades att hämta match",
                loading: false,
            });
        }
    },

    createMatch: async (matchData) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post(`${apiURL}/api/match`, matchData);
            set({ loading: false, error: null });
            return response.data.Match;
        } catch (error) {
            set({
                error: error.response?.data?.message || "Misslyckades att skapa match",
                loading: false,
            });
            throw error;
        }
    },

    updateMatch: async (id, updates) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.put(`${apiURL}/api/match/${id}`, updates);
            set({ match: response.data.match, loading: false, error: null });
            return response.data.match;
        } catch (error) {
            set({
                error: error.response?.data?.message || "Misslyckades att uppdatera match",
                loading: false,
            });
            throw error;
        }
    },

    deleteMatch: async (id) => {
        set({ loading: true, error: null });
        try {
            await axios.delete(`${apiURL}/api/match/${id}`);
            set({ loading: false, error: null });
        } catch (error) {
            set({
                error: error.response?.data?.message || "Misslyckades att ta bort match",
                loading: false,
            });
            throw error;
        }
    },

    clearMatch: () => set({ match: null }),
}));

export default useMatchStore;