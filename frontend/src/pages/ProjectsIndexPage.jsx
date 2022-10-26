import React, { useState, useRef, useEffect } from "react";
import useProjectsStore from "../store/projectsStore";
import ProjectListItem from "../components/ProjectListItem";
import AddProjectFormModal from "../components/AddProjectFormModal";
import { FaPlusSquare } from 'react-icons/fa';
import ProjectRowItem from "../components/ProjectRowItem";

const ProjectsIndexPage = () => {
    // access store
    const projectsStore = useProjectsStore();
    const projects = projectsStore.projects;
    const loading = projectsStore.loading;

    // state variables
    const [showAddForm, setShowAddForm] = useState(false);

    // fetch projects from api on first render
    useEffect(() => {
        projectsStore.fetchProjects()
    }, []);

    // show and hide add project form
    const handleShowAddProjectForm = () => {
        setShowAddForm(true);
    };

    const handleHideAddProjectForm = () => {
        setShowAddForm(false);
    };

    return (
        <>
            {loading ? (<h1>Loading...</h1>) :
                <div>
                    {/* Page Title */}
                    <div className="flex justify-center items-end mb-3">
                        <h1 className="ml-auto text-xl">Projects</h1>

                        {/* Add Project Button -> Shows Modal */}
                        <button
                            className="ml-auto text-blue-500 underline"
                            onClick={handleShowAddProjectForm}
                        >
                            <FaPlusSquare className="text-xl text-green-500" />
                        </button>
                    </div>

                    {/* Projects Listing */}
                    <table className="border-collapse w-full border border-slate-400 dark:border-slate-500 bg-white dark:bg-slate-800 text-sm shadow-sm">
                        <thead className="bg-slate-50 dark:bg-slate-700">
                            <tr>
                                <th className="border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">Name</th>
                                <th className="border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">Status</th>
                                <th className="border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">Estimated Cost</th>
                                <th className="border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">Realized Cost</th>
                                <th className="border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects &&
                                projects.map((p) => <ProjectRowItem key={p.id} project={p} />)}
                        </tbody>
                    </table>
                    {/* {projects &&
                        projects.map((p) => <ProjectListItem key={p.id} project={p} />)} */}

                    {/* Hidden Modal */}
                    {showAddForm && (
                        <AddProjectFormModal
                            handleHideAddProjectForm={handleHideAddProjectForm}
                        />
                    )}
                </div>
            }
        </>
    );
};

export default ProjectsIndexPage;
