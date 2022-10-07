import create from "zustand";
import axios from "axios";

import { devtools, persist } from "zustand/middleware";
import { v4 } from "uuid";

const investorsStore = (set) => ({
    investors: [],
    investor: {},
    loading: false,
    error: null,

    fetchInvestors: () => {
        set({ error: null, loading: true });
        axios.get("http://localhost:8000/api/investors")
            .then((response) => {
                const investors = response.data;
                set({ investors, loading: false });
            }).catch((error) => {
                error = error.response ? error.response.data.message : error.message;
                error = "investorsStore->fetchInvestors(): " + error;
                set({ error: error, loading: false });
            })
    },

    fetchInvestor: (investorId) => {
        set({ error: null, loading: true });
        axios.get(`http://localhost:8000/api/investors/${investorId}`)
            .then((response) => {
                set({ investor: response.data, loading: false });
            }).catch((error) => {
                error = error.response ? error.response.data.message : error.message;
                error = "investorsStore->fetchInvestor(): " + error;
                set({ error: error, loading: false });
            })
    },

    addInvestor: (investor) => {
        set({ error: null, loading: true });
        axios.post("http://localhost:8000/api/investors", investor)
            .then((response) => {
                set((state) => ({
                    investors: [...state.investors, response.data],
                    loading: false
                }));
            }).catch((error) => {
                error = error.response ? error.response.data.message : error.message;
                error = "investorsStore->addInvestor(): " + error;
                set({ error: error, loading: false });
            })
    },

    deleteInvestor: (investorId) => {
        set({ error: null })
        axios.delete(`http://localhost:8000/api/investors/${investorId}`)
            .then((response) => {
                set((state) => ({
                    investors: state.investors.filter((p) => p.id !== investorId)
                }));
            }).catch((error) => {
                error = error.response ? error.response.data.message : error.message;
                error = "investorsStore->deleteInvestor(): " + error;
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
