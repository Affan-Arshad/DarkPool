import create from "zustand";
import axios from "axios";

import errorMessage from "../helpers/errorMessage";

const apiUrl = "http://localhost:8000";

const investmentsStore = (set) => ({
    investments: [],
    investment: {},
    loading: false,
    error: null,

    fetchInvestments: (investor_id) => {
        set({ error: null, loading: true });
        if (investor_id)
            axios.get(`${apiUrl}/api/investors/${investor_id}/investments`)
                .then((response) => {
                    const investments = response.data;
                    set({ investments, loading: false });
                }).catch((error) => {
                    error = errorMessage(error, "fetchInvestments");
                    set({ error: error, loading: false });
                    throw Error("Something went wrong");
                })
        else
            axios.get(`${apiUrl}/api/investments`)
                .then((response) => {
                    const investments = response.data;
                    set({ investments, loading: false });
                }).catch((error) => {
                    error = errorMessage(error, "fetchInvestments");
                    set({ error: error, loading: false });
                    throw Error("Something went wrong");
                })
    },

    fetchInvestment: (investmentId) => {
        set({ error: null, loading: true });
        axios.get(`${apiUrl}/api/investments/${investmentId}`)
            .then((response) => {
                set({ investment: response.data, loading: false });
            }).catch((error) => {
                error = errorMessage(error, "fetchInvestment");
                set({ error: error, loading: false });
                throw Error("Something went wrong");
            })
    },

    addInvestment: async (investment) => {
        set({ error: null, loading: true });
        return axios.post(`${apiUrl}/api/investments`, investment)
            .then((response) => {
                set((state) => ({
                    investments: [...state.investments, response.data],
                    loading: false
                }));
            }).catch((error) => {
                error = errorMessage(error, "addInvestment");
                set({ error: error, loading: false });
                throw Error("Something went wrong");
            })
    },

    updateInvestment: async (investment) => {
        set({ error: null, loading: true });
        return axios.put(`${apiUrl}/api/investments/${investment.id}`, investment)
            .then((response) => {
                set((state) => ({
                    investment: [response.data],
                    loading: false
                }));
            }).catch((error) => {
                error = errorMessage(error, "updateInvestment");
                set({ error: error, loading: false });
                throw Error("Something went wrong");
            })
    },

    deleteInvestment: (investmentId) => {
        set({ error: null });
        axios.delete(`${apiUrl}/api/investments/${investmentId}`)
            .then((response) => {
                set((state) => ({
                    investments: state.investments.filter((p) => p.id !== investmentId)
                }));
            }).catch((error) => {
                error = errorMessage(error, "deleteInvestment");
                set({ error: error });
                throw Error("Something went wrong");
            });
    }
});

const useInvestmentsStore = create(
    investmentsStore
    // devtools(
    //     persist(investmentsStore, {
    //         name: "investments"
    //     })
    // )
);

export default useInvestmentsStore;
