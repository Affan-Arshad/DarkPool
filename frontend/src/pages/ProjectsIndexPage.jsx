import React, { useState, useRef, useEffect } from "react";
import useProjectsStore from "../store/projectsStore";
import ProjectListItem from "../components/ProjectListItem";
import AddProjectFormModal from "../components/AddProjectFormModal";

const ProjectsIndexPage = () => {
    // access store
    const projectsStore = useProjectsStore();
    const projects = projectsStore.projects;
    const loading = projectsStore.loading;

    // fetch projects from api on first render
    useEffect(() => {
        projectsStore.fetchProjects()
    }, []);

    // state variables
    const [showAddForm, setShowAddForm] = useState(false);

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
                    {/* Hidden Modal */}
                    {showAddForm && (
                        <AddProjectFormModal
                            handleHideAddProjectForm={handleHideAddProjectForm}
                        />
                    )}

                    {/* Add Project Button -> Shows Modal */}
                    <button
                        className="text-blue-500 underline"
                        onClick={handleShowAddProjectForm}
                    >
                        Add Project
                    </button>

                    {/* Projects Listing */}
                    {projects &&
                        projects.map((p) => <ProjectListItem key={p.id} project={p} />)}
                </div>
            }
        </>
    );
};

export default ProjectsIndexPage;
