import { create } from 'zustand';
import axios from 'axios';

const apiURL = 'http://localhost:5001';

export const usePlayerStore = create((set, get) => ({
    players: [],
    player: null,
    loading: false,
    error: null,
    total: 0,

    fetchPlayers: async (params = {}) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${apiURL}/api/players`, {
                params,
                withCredentials: true,
            });
            set({ players: response.data, loading: false });
        } catch (error) {
            set({
                error: error.response?.data?.message || "Kunde inte hämta spelare",
                loading: false,
            });
        }
    },

    fetchPlayerById: async (id) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${apiURL}/api/players/${id}`, {
                withCredentials: true,
            });
            set({ player: response.data, loading: false });
        } catch (error) {
            set({
                error: error.response?.data?.message || "Kunde inte hämta spelare",
                loading: false,
            });
        }
    },

    createPlayer: async (playerData) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post(`${apiURL}/api/players`, playerData, {
                withCredentials: true,
            });
            set((state) => ({
                players: [...state.players, response.data],
                loading: false,
            }));
            return response.data;
        } catch (error) {
            set({
                error: error.response?.data?.message || "Kunde inte skapa spelare",
                loading: false,
            });
            throw error;
        }
    },

    updatePlayer: async (id, updates) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.put(`${apiURL}/api/players/${id}`, updates, {
                withCredentials: true,
            });
            set((state) => ({
                players: state.players.map((p) =>
                    p._id === id ? response.data : p
                ),
                loading: false,
            }));
            return response.data;
        } catch (error) {
            set({
                error: error.response?.data?.message || "Kunde inte uppdatera spelare",
                loading: false,
            });
            throw error;
        }
    },

    deletePlayer: async (id) => {
        set({ loading: true, error: null });
        try {
            await axios.delete(`${apiURL}/api/players/${id}`, {
                withCredentials: true,
            });
            set((state) => ({
                players: state.players.filter((p) => p._id !== id),
                loading: false,
            }));
        } catch (error) {
            set({
                error: error.response?.data?.message || "Kunde inte ta bort spelare",
                loading: false,
            });
            throw error;
        }
    },

    clearError: () => set({ error: null }),
    clearPlayer: () => set({ player: null }),
}));

export default usePlayerStore;