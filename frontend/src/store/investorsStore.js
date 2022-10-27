import create from "zustand";
import axios from "axios";

import errorMessage from "../helpers/errorMessage";

const investorsStore = (set) => ({
    investors: [],
    investor: {},
    loading: false,
    error: null,
    apiUrl: "http://192.168.18.3:8000",

    fetchInvestors: () => {
        set({ error: null, loading: true });
        axios.get(`${this.apiUrl}/api/investors`)
            .then((response) => {
                const investors = response.data;
                set({ investors, loading: false });
            }).catch((error) => {
                error = errorMessage(error, "fetchInvestors");
                set({ error: error, loading: false });
            })
    },

    fetchInvestor: (investorId) => {
        set({ error: null, loading: true });
        axios.get(`${this.apiUrl}/api/investors/${investorId}`)
            .then((response) => {
                set({ investor: response.data, loading: false });
            }).catch((error) => {
                error = errorMessage(error, "fetchInvestor");
                set({ error: error, loading: false });
            })
    },

    addInvestor: (investor) => {
        set({ error: null, loading: true });
        axios.post(`${this.apiUrl}/api/investors`, investor)
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

    deleteInvestor: (investorId) => {
        set({ error: null })
        axios.delete(`${this.apiUrl}/api/investors/${investorId}`)
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
