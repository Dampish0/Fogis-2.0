import { create } from 'zustand';
import axios from 'axios';
import { getApiURL } from './apiURL';

const apiURL = getApiURL('/api/team');
axios.defaults.withCredentials = true;

export const useTeamStore = create((set) => ({
    teams: [],
    team: null,
    total: 0,
    currentPage: 1,
    totalPages: 1,
    loading: false,
    error: null,

    fetchTeams: async (params = {}) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${apiURL}`,  { params: params } );
            set({
                teams: response.data.teams,
                total: response.data.total,
                currentPage: response.data.currentPage || params.page || 1,
                totalPages: response.data.totalPages || 1,
                loading: false,
                error: null,
            });
        } catch (error) {
            set({
                error: error.response?.data?.message || "Misslyckades att hämta lag",
                loading: false,
            });
        }
    },

    fetchTeamById: async (id) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${apiURL}/${id}`);
            set({ team: response.data, loading: false, error: null });
        } catch (error) {
            set({
                error: error.response?.data?.message || "Misslyckades att hämta lag",
                loading: false,
            });
        }
    },

    createTeam: async (teamData) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post(`${apiURL}`, teamData);
            set({ loading: false, error: null, team: response.data });
            return response.data;
        } catch (error) {
            set({
                error: error.response?.data?.message || "Misslyckades att skapa lag",
                loading: false,
            });
            throw error;
        }
    },

    updateTeam: async (id, updates) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.put(`${apiURL}/${id}`, updates);
            set({ team: response.data, loading: false, error: null });
            return response.data;
        } catch (error) {
            set({
                error: error.response?.data?.message || "Misslyckades att uppdatera lag",
                loading: false,
            });
            throw error;
        }
    },

    deleteTeam: async (id) => {
        set({ loading: true, error: null });
        try {
            await axios.delete(`${apiURL}/${id}`);
            set({ loading: false, error: null });
        } catch (error) {
            set({
                error: error.response?.data?.message || "Misslyckades att ta bort lag",
                loading: false,
            });
            throw error;
        }
    },

    clearTeam: () => set({ team: null }),
}));

export default useTeamStore;