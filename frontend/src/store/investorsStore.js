import create from "zustand";
import axios from "axios";

import errorMessage from "../helpers/errorMessage";

const apiUrl = "http://localhost:8000";

const investorsStore = (set) => ({
    investors: [],
    investor: {},
    loading: false,
    error: null,

    fetchInvestors: () => {
        set({ loading: true });
        axios.get(`${apiUrl}/api/investors`)
            .then((response) => {
                const investors = response.data;
                set({ investors, loading: false });
            }).catch((error) => {
                error = errorMessage(error, "fetchInvestors");
                set({ error: error, loading: false });
            })
    },

    fetchInvestor: (investorId) => {
        set({ loading: true });
        axios.get(`${apiUrl}/api/investors/${investorId}`)
            .then((response) => {
                set({ investor: response.data, loading: false });
            }).catch((error) => {
                error = errorMessage(error, "fetchInvestor");
                set({ error: error, loading: false });
            })
    },

    addInvestor: (investor) => {
        set({ loading: true });
        axios.post(`${apiUrl}/api/investors`, investor)
            .then((response) => {
                set((state) => ({
                    investors: [...state.investors, response.data],
                    loading: false
                }));
            }).catch((error) => {
                error = errorMessage(error, "addInvestor");
                set({ error: error, loading: false });
            })
    },

    updateInvestor: async (investor) => {
        set({ loading: true });
        return axios.put(`${apiUrl}/api/investors/${investor.id}`, investor)
            .then((response) => {
                set((state) => ({
                    investor: [response.data],
                    loading: false
                }));
            }).catch((error) => {
                error = errorMessage(error, "updateInvestor");
                set({ error: error, loading: false });
            })
    },

    deleteInvestor: (investorId) => {
        axios.delete(`${apiUrl}/api/investors/${investorId}`)
            .then((response) => {
                set((state) => ({
                    investors: state.investors.filter((p) => p.id !== investorId)
                }));
            }).catch((error) => {
                error = errorMessage(error, "deleteInvestor");
                set({ error: error })
            });
    }
});

const useInvestorsStore = create(
    investorsStore
    // devtools(
    //     persist(investorsStore, {
    //         name: "investors"
    //     })
    // )
);

export default useInvestorsStore;
