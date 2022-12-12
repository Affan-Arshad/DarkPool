import create from "zustand";
import axios from "axios";

import errorMessage from "../helpers/errorMessage";

const apiUrl = "http://localhost:8000";

const costsStore = (set) => ({
    costs: [],
    cost: {},
    loading: false,
    error: null,

    fetchCosts: (project_id) => {
        set({ error: null, loading: true });
        axios.get(`${apiUrl}/api/projects/${project_id}/costs`)
            .then((response) => {
                const costs = response.data;
                set({ costs, loading: false });
            }).catch((error) => {
                error = errorMessage(error, "fetchCosts");
                set({ error: error, loading: false });
                throw Error("Something went wrong");
            });
    },

    fetchCost: (projectId, costId) => {
        set({ error: null, loading: true });
        axios.get(`${apiUrl}/api/projects/${projectId}/costs/${costId}`)
            .then((response) => {
                set({ cost: response.data, loading: false });
            }).catch((error) => {
                error = errorMessage(error, "fetchCost");
                set({ error: error, loading: false });
                throw Error("Something went wrong");
            })
    },

    addCost: async (projectId, cost) => {
        set({ error: null, loading: true });
        return axios.post(`${apiUrl}/api/projects/${projectId}/costs`, cost)
            .then((response) => {
                set((state) => ({
                    costs: [...state.costs, response.data],
                    loading: false
                }));
            }).catch((error) => {
                error = errorMessage(error, "addCost");
                set({ error: error, loading: false });
                throw Error("Something went wrong");
            })
    },

    updateCost: async (projectId, cost) => {
        set({ error: null, loading: true });
        return axios.put(`${apiUrl}/api/projects/${projectId}/costs/${cost.id}`, cost)
            .then((response) => {
                set((state) => ({
                    cost: [response.data],
                    loading: false
                }));
            }).catch((error) => {
                error = errorMessage(error, "updateCost");
                set({ error: error, loading: false });
                throw Error("Something went wrong");
            })
    },

    deleteCost: (projectId, costId) => {
        set({ error: null });
        axios.delete(`${apiUrl}/api/projects/${projectId}/costs/${costId}`)
            .then((response) => {
                set((state) => ({
                    costs: state.costs.filter((c) => c.id !== costId)
                }));
            }).catch((error) => {
                error = errorMessage(error, "deleteCost");
                set({ error: error })
                throw Error("Something went wrong");
            });
    }
});

const useCostsStore = create(
    costsStore
    // devtools(
    //     persist(costsStore, {
    //         name: "costs"
    //     })
    // )
);

export default useCostsStore;
