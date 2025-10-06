import { create } from 'zustand';
import axios from 'axios';

const apiURL = 'http://localhost:5001';

export const useSeriesStore = create((set) => ({
    seriesList: [],
    selectedSeries: null,
    loading: false,
    error: null,

    fetchSeries: async (params = {}) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${apiURL}/api/series`, { params, withCredentials: true });
            set({ seriesList: response.data, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Misslyckades att hämta serier", loading: false });
        }
    },

    fetchSeriesById: async (id) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${apiURL}/api/series/${id}`, { withCredentials: true });
            set({ selectedSeries: response.data, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Misslyckades att hämta serien", loading: false });
        }
    },

    createSeries: async (seriesData) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post(`${apiURL}/api/series`, seriesData, { withCredentials: true });
            set((state) => ({
                seriesList: [...state.seriesList, response.data],
                loading: false
            }));
        } catch (error) {
            set({ error: error.response?.data?.message || "Misslyckades att skapa serien", loading: false });
            throw error;
        }
    },

    updateSeries: async (id, updates) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.put(`${apiURL}/api/series/${id}`, updates, { withCredentials: true });
            set((state) => ({
                seriesList: state.seriesList.map(s => s._id === id ? response.data : s),
                selectedSeries: state.selectedSeries && state.selectedSeries._id === id ? response.data : state.selectedSeries,
                loading: false
            }));
        } catch (error) {
            set({ error: error.response?.data?.message || "Misslyckades att uppdatera serien", loading: false });
            throw error;
        }
    },

    deleteSeries: async (id) => {
        set({ loading: true, error: null });
        try {
            await axios.delete(`${apiURL}/api/series/${id}`, { withCredentials: true });
            set((state) => ({
                seriesList: state.seriesList.filter(s => s._id !== id),
                selectedSeries: state.selectedSeries && state.selectedSeries._id === id ? null : state.selectedSeries,
                loading: false
            }));
        } catch (error) {
            set({ error: error.response?.data?.message || "Misslyckades att ta bort serien", loading: false });
            throw error;
        }
    },

    clearSelectedSeries: () => set({ selectedSeries: null }),
}));

export default useSeriesStore;