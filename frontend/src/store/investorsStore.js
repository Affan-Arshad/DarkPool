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
        set({ error: null, loading: true });
        axios.get(`${apiUrl}/api/investors`)
            .then((response) => {
                const investors = response.data;
                set({ investors, loading: false });
            }).catch((error) => {
                error = errorMessage(error, "fetchInvestors");
                set({ error: error, loading: false });
                throw Error("Something went wrong");
            })
    },

    fetchInvestor: (investorId) => {
        set({ error: null, loading: true });
        axios.get(`${apiUrl}/api/investors/${investorId}`)
            .then((response) => {
                set({ investor: response.data, loading: false });
            }).catch((error) => {
                error = errorMessage(error, "fetchInvestor");
                set({ error: error, loading: false });
                throw Error("Something went wrong");
            })
    },

    addInvestor: (investor) => {
        set({ error: null, loading: true });
        axios.post(`${apiUrl}/api/investors`, investor)
            .then((response) => {
                set((state) => ({
                    investors: [...state.investors, response.data],
                    loading: false
                }));
            }).catch((error) => {
                error = errorMessage(error, "addInvestor");
                set({ error: error, loading: false });
                throw Error("Something went wrong");
            })
    },

    updateInvestor: async (investor) => {
        set({ error: null, loading: true });
        return axios.put(`${apiUrl}/api/investors/${investor.id}`, investor)
            .then((response) => {
                set((state) => ({
                    investor: [response.data],
                    loading: false
                }));
            }).catch((error) => {
                error = errorMessage(error, "updateInvestor");
                set({ error: error, loading: false });
                throw Error("Something went wrong");
            })
    },

    deleteInvestor: (investorId) => {
        set({ error: null });
        axios.delete(`${apiUrl}/api/investors/${investorId}`)
            .then((response) => {
                set((state) => ({
                    investors: state.investors.filter((p) => p.id !== investorId)
                }));
            }).catch((error) => {
                error = errorMessage(error, "deleteInvestor");
                set({ error: error })
                throw Error("Something went wrong");
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
