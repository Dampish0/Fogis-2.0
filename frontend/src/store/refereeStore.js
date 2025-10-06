import { create } from 'zustand';
import axios from 'axios';

const apiURL = 'http://localhost:5001';

export const useRefereeStore = create((set, get) => ({
    referees: [],
    referee: null,
    matches: [],
    loading: false,
    error: null,
    total: 0,

    // params are filters
    fetchReferees: async (params = {}) => {
        set({ loading: true, error: null });
        try {
            const { page = 1, limit = 10, ...filters } = params;
            const response = await axios.get(`${apiURL}/api/referee`, {
                params: { page, limit, ...filters },
                withCredentials: true,
            });
            set({ referees: response.data, loading: false, error: null });
        } catch (error) {
            set({ error: error.response?.data?.message || "Kunde inte hämta domare", loading: false });
        }
    },

    fetchRefereeById: async (id) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${apiURL}/api/referee/${id}`, { withCredentials: true });
            set({ referee: response.data, loading: false, error: null });
        } catch (error) {
            set({ error: error.response?.data?.message || "Kunde inte hämta domare", loading: false });
        }
    },

    createReferee: async (refereeData) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post(`${apiURL}/api/referee`, refereeData, { withCredentials: true });
            set({ loading: false, error: null });
            //refresh the list
            get().fetchReferees();
            return response.data;
        } catch (error) {
            set({ error: error.response?.data?.message || "Kunde inte skapa domare", loading: false });
            throw error;
        }
    },

    updateReferee: async (id, updates) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.put(`${apiURL}/api/referee/${id}`, updates, { withCredentials: true });
            set({ referee: response.data, loading: false, error: null });
            return response.data;
        } catch (error) {
            set({ error: error.response?.data?.message || "Kunde inte uppdatera domare", loading: false });
            throw error;
        }
    },

    deleteReferee: async (id) => {
        set({ loading: true, error: null });
        try {
            await axios.delete(`${apiURL}/api/referee/${id}`, { withCredentials: true });
            set({ loading: false, error: null });
        } catch (error) {
            set({ error: error.response?.data?.message || "Kunde inte ta bort domare", loading: false });
            throw error;
        }
    },

    fetchRefereeMatches: async (id, params = {}) => {
        set({ loading: true, error: null });
        try {
            const { page = 1, limit = 10, ...filters } = params;
            const response = await axios.get(`${apiURL}/api/referee/history/${id}`, {
                params: { page, limit, ...filters },
                withCredentials: true,
            });
            set({ matches: response.data, loading: false, error: null });
        } catch (error) {
            set({ error: error.response?.data?.message || "Kunde inte hämta matcher", loading: false });
        }
    },

    clearError: () => set({ error: null }),
}));

export default useRefereeStore;