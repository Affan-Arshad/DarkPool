import useProjectStore from "../../store/projectsStore";
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

const ProjectRowItem = (props) => {
    const { project, handleSetEditProject } = props;
    const deleteProject = useProjectStore((state) => state.deleteProject);

    const handleDelete = () => {
        deleteProject(project.id);
    };
    return (
        <>
            <tr>
                <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{project.name}</td>
                <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{project.status}</td>
                <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{Intl.NumberFormat().format(project.estimated_cost)}</td>
                <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{Intl.NumberFormat().format(project.costs_sum_amount)}</td>
                <td className="text-center border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                    <Link to={`/Projects/${project.id}`}>
                        <FaEye className="inline mr-2 text-blue-500" />
                    </Link>
                    <FaEdit onClick={() => handleSetEditProject(project)} className="inline mr-2 cursor-pointer text-yellow-500" />
                    <FaTrash className="cursor-not-allowed inline mr-2 last:mr-0 text-red-500" />
                </td>
            </tr>
            {/* <div className="flex justify-between border-b items-center">
                <Link to={`/Projects/${project.id}`}>
                    <h1>{project.name}</h1>
                </Link>
                <button className="p-1" onClick={handleDelete}>
                    x
                </button>
            </div> */}
        </>
    );
};

export default ProjectRowItem;
