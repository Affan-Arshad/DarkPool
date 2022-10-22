import create from "zustand";
import axios from "axios";

import { devtools, persist } from "zustand/middleware";
import { v4 } from "uuid";
import errorMessage from "../helpers/errorMessage";

const projectsStore = (set) => ({
    projects: [],
    project: {},
    balances: [],
    loading: false,
    error: null,
    fetchProjects: () => {
        set({ error: null, loading: true });
        axios.get("http://localhost:8000/api/projects")
            .then((response) => {
                const projects = response.data;
                set({ projects, loading: false });
            }).catch((error) => {
                error = errorMessage(error, "fetchProjects");
                set({ error: error, loading: false });
            })
    },

    fetchProject: (projectId) => {
        set({ error: null, loading: true });
        axios.get(`http://localhost:8000/api/projects/${projectId}`)
            .then((response) => {
                set({ project: response.data, loading: false });
            }).catch((error) => {
                error = errorMessage(error, "fetchProject");
                set({ error: error, loading: false });
            })
    },

    addProject: (project) => {
        set({ error: null, loading: true });
        axios.post("http://localhost:8000/api/projects", project)
            .then((response) => {
                set((state) => ({
                    projects: [...state.projects, response.data],
                    loading: false
                }));
            }).catch((error) => {
                error = errorMessage(error, "addProject");
                set({ error: error, loading: false });
            })
    },
    deleteProject: (projectId) => {
        set({ error: null })
        axios.delete(`http://localhost:8000/api/projects/${projectId}`)
            .then((response) => {
                set((state) => ({
                    projects: state.projects.filter((p) => p.id !== projectId)
                }));
            }).catch((error) => {
                error = errorMessage(error, "deleteProject");
                set({ error: error })
            });
    },
    setStatus: (projectId, status) => {
        set((state) => ({
            projects: state.projects.map((p) =>
                p.id === projectId ? { ...p, status: status } : p
            )
        }));
    }
    ,
    fetchBalances: () => {
        set({ error: null, loading: true });
        axios.get(`http://localhost:8000/api/balances`)
            .then((response) => {
                set((state) => ({
                    balances: response.data,
                    loading: false
                }));
            }).catch((error) => {
                error = errorMessage(error, "addProject");
                set({ error: error, loading: false });
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
