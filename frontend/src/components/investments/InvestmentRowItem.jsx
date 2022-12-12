import useInvestmentStore from "../../store/investmentsStore";
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

const InvestmentRowItem = (props) => {
    const { investment, handleSetEditInvestment } = props;
    const deleteInvestment = useInvestmentStore((state) => state.deleteInvestment);

    const handleDelete = (investment) => {
        deleteInvestment(investment.id);
    };
    return (
        <>
            <tr>
                <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{Intl.NumberFormat().format(investment.amount)}</td>
                <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{investment.date}</td>
                <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                    {investment.type}
                    {investment.project &&
                        <>
                            {" from"} <Link to={`/projects/${investment.project.id}`}>
                                {investment.project.name}
                            </Link>
                        </>
                    }
                </td>
                <td className="text-center border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                    {/* <Link to={`/investments/${investment.id}`}>
                        <FaEye className="inline mr-2 text-blue-500" />
                    </Link>
                    <FaEdit onClick={() => handleSetEditInvestment(investment)} className="inline mr-2 cursor-pointer text-yellow-500" />
                    <FaTrash onClick={() => handleDelete(investment)} className="cursor-pointer inline mr-2 last:mr-0 text-red-500" /> */}
                </td>
            </tr>
            {/* <div className="flex justify-between border-b items-center">
                <Link to={`/investments/${investment.id}`}>
                    <h1>{investment.name}</h1>
                </Link>
                <button className="p-1" onClick={handleDelete}>
                    x
                </button>
            </div> */}
        </>
    );
};

export default InvestmentRowItem;
