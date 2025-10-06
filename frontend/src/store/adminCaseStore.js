import { create } from 'zustand';
import axios from 'axios';

const apiURL = 'http://localhost:5001';

export const useAdminCaseStore = create((set, get) => ({
    cases: [],
    caseDetail: null,
    loading: false,
    error: null,

    fetchCases: async (params = {}) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${apiURL}/api/admincase`, {
                params,
                withCredentials: true,
            });
            set({ cases: response.data, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Kunde inte hämta ärenden", loading: false });
        }
    },

    fetchCaseById: async (id) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${apiURL}/api/admincase/${id}`, { withCredentials: true });
            set({ caseDetail: response.data, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Kunde inte hämta ärendet", loading: false });
        }
    },

    createCase: async (caseData) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post(`${apiURL}/api/admincase`, caseData, { withCredentials: true });
            set((state) => ({
                cases: [response.data, ...state.cases],
                loading: false,
            }));
        } catch (error) {
            set({ error: error.response?.data?.message || "Kunde inte skapa ärende", loading: false });
            throw error;
        }
    },

    updateCase: async (id, updates) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.put(`${apiURL}/api/admincase/${id}`, updates, { withCredentials: true });
            set((state) => ({
                cases: state.cases.map((c) => (c._id === id ? response.data : c)),
                caseDetail: response.data,
                loading: false,
            }));
        } catch (error) {
            set({ error: error.response?.data?.message || "Kunde inte uppdatera ärende", loading: false });
            throw error;
        }
    },

    claimCase: async (id) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post(`${apiURL}/api/admincase/${id}/claim`, {}, { withCredentials: true });
            set((state) => ({
                cases: state.cases.map((c) => (c._id === id ? response.data : c)),
                caseDetail: response.data,
                loading: false,
            }));
        } catch (error) {
            set({ error: error.response?.data?.message || "Kunde inte ta ärendet", loading: false });
            throw error;
        }
    },

    clearError: () => set({ error: null }),
    clearCaseDetail: () => set({ caseDetail: null }),
}));

export default useAdminCaseStore;