import create from "zustand";
import axios from "axios";

import { devtools, persist } from "zustand/middleware";
import { v4 } from "uuid";

const projectsStore = (set, get) => ({
    projects: [],
    project: {},
    loading: false,
    error: null,
    fetchProjects: () => {
        set({ error: null, loading: true });
        axios.get("http://localhost:8000/api/projects")
            .then((response) => {
                const projects = response.data;
                set({ projects, loading: false });
            }).catch((error) => {
                error = error.response ? error.response.data.message : error.message;
                error = "projectsStore->fetchProjects(): " + error;
                set({ error: error, loading: false });
            })
    },

    fetchProject: (projectId) => {
        set({ error: null, loading: true });
        axios.get(`http://localhost:8000/api/projects/${projectId}`)
            .then((response) => {
                set({ project: response.data, loading: false });
            }).catch((error) => {
                error = error.response ? error.response.data.message : error.message;
                error = "projectsStore->fetchProject(): " + error;
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
                error = error.response ? error.response.data.message : error.message;
                error = "projectsStore->addProject(): " + error;
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
                error = error.response ? error.response.data.message : error.message;
                error = "projectsStore->deleteProject(): " + error;
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
