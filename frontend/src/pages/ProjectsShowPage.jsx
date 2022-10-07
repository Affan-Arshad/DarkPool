import useProjectsStore from "../store/projectsStore";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const ProjectsShowPage = () => {
    const { id } = useParams();
    const projectsStore = useProjectsStore();
    const project = projectsStore.project;
    const loading = projectsStore.loading;
    const error = projectsStore.error;

    useEffect(() => {
        projectsStore.fetchProject(id);

        return () => {
            // cancel
        }
    }, [])


    return (
        <>
            {loading ? (<h1>Loading...</h1>) :
                <div>
                    {project.name} {project.client_name} {project.reference_no}
                </div>
            }
        </>
    );
};

export default ProjectsShowPage;
