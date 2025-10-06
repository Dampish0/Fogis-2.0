import { create } from 'zustand';
import axios from 'axios';

const apiURL = 'http://localhost:5001';

export const useClubStore = create((set, get) => ({
    clubs: [],
    club: null,
    loading: false,
    error: null,
    total: 0,

    fetchClubs: async (params = {}) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${apiURL}/api/clubs`, {
                params,
                withCredentials: true,
            });
            set({ clubs: response.data, loading: false, error: null });
        } catch (error) {
            set({
                error: error.response?.data?.message || "Kunde inte hämta klubbar",
                loading: false,
            });
        }
    },

    fetchClubById: async (id) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${apiURL}/api/clubs/${id}`, {
                withCredentials: true,
            });
            set({ club: response.data, loading: false, error: null });
        } catch (error) {
            set({
                error: error.response?.data?.message || "Kunde inte hämta klubb",
                loading: false,
            });
        }
    },

    createClub: async (clubData) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post(`${apiURL}/api/clubs`, clubData, {
                withCredentials: true,
            });
            set((state) => ({
                clubs: [...state.clubs, response.data],
                loading: false,
                error: null,
            }));
            return response.data;
        } catch (error) {
            set({
                error: error.response?.data?.message || "Kunde inte skapa klubb",
                loading: false,
            });
            throw error;
        }
    },

    updateClub: async (id, updates) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.put(`${apiURL}/api/clubs/${id}`, updates, {
                withCredentials: true,
            });
            set((state) => ({
                clubs: state.clubs.map((club) =>
                    club._id === id ? response.data : club
                ),
                club: response.data,
                loading: false,
                error: null,
            }));
            return response.data;
        } catch (error) {
            set({
                error: error.response?.data?.message || "Kunde inte uppdatera klubb",
                loading: false,
            });
            throw error;
        }
    },

    deleteClub: async (id) => {
        set({ loading: true, error: null });
        try {
            await axios.delete(`${apiURL}/api/clubs/${id}`, {
                withCredentials: true,
            });
            set((state) => ({
                clubs: state.clubs.filter((club) => club._id !== id),
                loading: false,
                error: null,
            }));
        } catch (error) {
            set({
                error: error.response?.data?.message || "Kunde inte ta bort klubb",
                loading: false,
            });
            throw error;
        }
    },

    clearError: () => set({ error: null }),
}));

export default useClubStore;