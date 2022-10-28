import useInvestorStore from "../../store/investorsStore";
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

const InvestorRowItem = (props) => {
    const { investor, handleSetEditInvestor } = props;
    const deleteInvestor = useInvestorStore((state) => state.deleteInvestor);

    const handleDelete = (investor) => {
        deleteInvestor(investor.id);
    };
    return (
        <>
            <tr>
                <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{investor.name}</td>
                <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{investor.account_no}</td>
                <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{Intl.NumberFormat().format(investor.deposits)}</td>
                <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{Intl.NumberFormat().format(investor.returns)}</td>
                <td className="text-center border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                    <Link to={`/investors/${investor.id}`}>
                        <FaEye className="inline mr-2 text-blue-500" />
                    </Link>
                    <FaEdit onClick={() => handleSetEditInvestor(investor)} className="inline mr-2 cursor-pointer text-yellow-500" />
                    <FaTrash onClick={() => handleDelete(investor)} className="cursor-pointer inline mr-2 last:mr-0 text-red-500" />
                </td>
            </tr>
            {/* <div className="flex justify-between border-b items-center">
                <Link to={`/investors/${investor.id}`}>
                    <h1>{investor.name}</h1>
                </Link>
                <button className="p-1" onClick={handleDelete}>
                    x
                </button>
            </div> */}
        </>
    );
};

export default InvestorRowItem;
