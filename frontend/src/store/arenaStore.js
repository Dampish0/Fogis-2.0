import { create } from 'zustand';
import axios from 'axios';

const apiURL = 'http://localhost:5001';

export const useArenaStore = create((set, get) => ({
    arenas: [],
    total: 0,
    selectedArena: null,
    loading: false,
    error: null,

    fetchArenas: async (params = {}) => {
        set({ loading: true, error: null });
        try {
            const { page = 1, limit = 10, ...filters } = params;
            const response = await axios.get(`${apiURL}/api/arenas`, {
                params: { page, limit, ...filters },
                withCredentials: true,
            });
            set({
                arenas: response.data.arenas,
                total: response.data.total,
                loading: false,
                error: null,
            });
        } catch (error) {
            set({
                error: error.response?.data?.message || "Misslyckades att hämta arenor",
                loading: false,
            });
        }
    },

    fetchArenaById: async (id) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${apiURL}/api/arenas/${id}`, {
                withCredentials: true,
            });
            set({
                selectedArena: response.data,
                loading: false,
                error: null,
            });
        } catch (error) {
            set({
                error: error.response?.data?.message || "Misslyckades att hämta arena",
                loading: false,
            });
        }
    },

    createArena: async (arenaData) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post(`${apiURL}/api/arenas`, arenaData, {
                withCredentials: true,
            });
            set((state) => ({
                arenas: [...state.arenas, response.data],
                loading: false,
                error: null,
            }));
            return response.data;
        } catch (error) {
            set({
                error: error.response?.data?.message || "Misslyckades att skapa arena",
                loading: false,
            });
            throw error;
        }
    },

    updateArena: async (id, updates) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.put(`${apiURL}/api/arenas/${id}`, updates, {
                withCredentials: true,
            });
            set((state) => ({
                arenas: state.arenas.map((arena) =>
                    arena._id === id ? response.data : arena
                ),
                selectedArena: state.selectedArena && state.selectedArena._id === id ? response.data : state.selectedArena,
                loading: false,
                error: null,
            }));
            return response.data;
        } catch (error) {
            set({
                error: error.response?.data?.message || "Misslyckades att uppdatera arena",
                loading: false,
            });
            throw error;
        }
    },

    deleteArena: async (id) => {
        set({ loading: true, error: null });
        try {
            await axios.delete(`${apiURL}/api/arenas/${id}`, {
                withCredentials: true,
            });
            set((state) => ({
                arenas: state.arenas.filter((arena) => arena._id !== id),
                selectedArena: state.selectedArena && state.selectedArena._id === id ? null : state.selectedArena,
                loading: false,
                error: null,
            }));
        } catch (error) {
            set({
                error: error.response?.data?.message || "Misslyckades att ta bort arena",
                loading: false,
            });
            throw error;
        }
    },

    clearSelectedArena: () => set({ selectedArena: null }),
    clearError: () => set({ error: null }),
}));

export default useArenaStore;