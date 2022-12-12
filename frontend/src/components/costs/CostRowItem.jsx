import useCostStore from "../../store/costsStore";
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

const CostRowItem = (props) => {
    const { cost, handleSetEditCost } = props;
    const deleteCost = useCostStore((state) => state.deleteCost);

    const handleDelete = (cost) => {
        deleteCost(cost.project_id, cost.id);
    };
    return (
        <>
            <tr>
                <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{cost.date}</td>
                <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{cost.description}</td>
                <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{Intl.NumberFormat().format(cost.amount)}</td>
                <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{cost.investors_ratio ? Object.keys(cost.investors_ratio).length : "refresh"}</td>
                <td className="text-center border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                    {/* <Link to={`/costs/${cost.id}`}>
                        <FaEye className="inline mr-2 text-blue-500" />
                    </Link> */}
                    <FaEdit onClick={() => handleSetEditCost(cost)} className="inline mr-2 cursor-pointer text-yellow-500" />
                    <FaTrash onClick={() => handleDelete(cost)} className="cursor-pointer inline mr-2 last:mr-0 text-red-500" />
                </td>

            </tr>
            {/* <div className="flex justify-between border-b items-center">
                <Link to={`/costs/${cost.id}`}>
                    <h1>{cost.name}</h1>
                </Link>
                <button className="p-1" onClick={handleDelete}>
                    x
                </button>
            </div> */}
        </>
    );
};

export default CostRowItem;
