import useProjectStore from "../store/projectsStore";
import { Link } from "react-router-dom";

const ProjectListItem = (props) => {
    const { project } = props;
    const deleteProject = useProjectStore((state) => state.deleteProject);

    const handleDelete = () => {
        deleteProject(project.id);
    };
    return (
        <div className="flex justify-between border-b items-center">
            <Link to={`/Projects/${project.id}`}>
                <h1>{project.name}</h1>
            </Link>
            <button className="p-1" onClick={handleDelete}>
                x
            </button>
        </div>
    );
};

export default ProjectListItem;
