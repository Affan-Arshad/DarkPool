import create from "zustand";
import axios from "axios";

import errorMessage from "../helpers/errorMessage";

const apiUrl = "http://localhost:8000";

const projectsStore = (set) => ({
    projects: [],
    project: {},
    balances: [],
    loading: false,
    error: null,

    fetchProjects: () => {
        set({ error: null, loading: true });
        axios.get(`${apiUrl}/api/projects`)
            .then((response) => {
                const projects = response.data;
                set({ projects, loading: false });
            }).catch((error) => {
                error = errorMessage(error, "fetchProjects");
                set({ error: error, loading: false });
                throw Error("Something went wrong");
            })
    },

    fetchProject: (projectId) => {
        set({ error: null, loading: true });
        axios.get(`${apiUrl}/api/projects/${projectId}`)
            .then((response) => {
                set({ project: response.data, loading: false });
            }).catch((error) => {
                error = errorMessage(error, "fetchProject");
                set({ error: error, loading: false });
                throw Error("Something went wrong");
            })
    },

    addProject: (project) => {
        set({ error: null, loading: true });
        axios.post(`${apiUrl}/api/projects`, project)
            .then((response) => {
                set((state) => ({
                    projects: [...state.projects, response.data],
                    loading: false
                }));
            }).catch((error) => {
                error = errorMessage(error, "addProject");
                set({ error: error, loading: false });
                throw Error("Something went wrong");
            })
    },

    updateProject: async (project) => {
        set({ error: null, loading: true });
        return axios.put(`${apiUrl}/api/projects/${project.id}`, project)
            .then((response) => {
                set((state) => ({
                    project: [response.data],
                    loading: false
                }));
            }).catch((error) => {
                error = errorMessage(error, "updateProject");
                set({ error: error, loading: false });
                throw Error("Something went wrong");
            })
    },

    deleteProject: (projectId) => {
        set({ error: null });
        axios.delete(`${apiUrl}/api/projects/${projectId}`)
            .then((response) => {
                set((state) => ({
                    projects: state.projects.filter((p) => p.id !== projectId)
                }));
            }).catch((error) => {
                error = errorMessage(error, "deleteProject");
                set({ error: error })
                throw Error("Something went wrong");
            });
    },

    setStatus: (projectId, status) => {
        set((state) => ({
            projects: state.projects.map((p) =>
                p.id === projectId ? { ...p, status: status } : p
            )
        }));
    },

    fetchBalances: () => {
        set({ error: null, loading: true });
        axios.get(`${apiUrl}/api/balances`)
            .then((response) => {
                set((state) => ({
                    balances: response.data,
                    loading: false
                }));
            }).catch((error) => {
                error = errorMessage(error, "fetchBalances");
                set({ error: error, loading: false });
                throw Error("Something went wrong");
            })
    }
});

const useProjectsStore = create(
    projectsStore
    // devtools(
    //     persist(projectsStore, {
    //         name: "projects"
    //     })
    // )
);

export default useProjectsStore;
