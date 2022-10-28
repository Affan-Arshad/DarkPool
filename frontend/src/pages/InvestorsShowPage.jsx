import useInvestorsStore from "../store/investorsStore";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const InvestorsShowPage = () => {
    const { id } = useParams();
    const investorsStore = useInvestorsStore();
    const investor = investorsStore.investor;
    const loading = investorsStore.loading;

    useEffect(() => {
        investorsStore.fetchInvestor(id);

        return () => {
            // cancel
        }

        // eslint-disable-next-line
    }, [])


    return (
        <>
            {/* {loading ? (<h1 className="h-[50vh] justify-center flex items-center justify-items-center">Loading...</h1>) : */}
            {loading ? (<h1>Loading...</h1>) :
                <div>

                    <table className="w-full border-collapse text-sm">
                        <tbody>
                            <tr className="border-b">
                                <th className="w-[1px] whitespace-nowrap font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">Investor Name</th>
                                <td className="p-4 text-slate-500 dark:text-slate-400">{investor.name}</td>
                            </tr>
                            <tr className="border-b">
                                <th className="w-[1px] whitespace-nowrap font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">Account Name</th>
                                <td className="p-4 text-slate-500 dark:text-slate-400">{investor.account_name}</td>
                            </tr>
                            <tr className="border-b">
                                <th className="w-[1px] whitespace-nowrap font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">Account no.</th>
                                <td className="p-4 text-slate-500 dark:text-slate-400">{investor.account_no}</td>
                            </tr>
                            <tr className="border-b">
                                <th className="w-[1px] whitespace-nowrap font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">Deposit Total</th>
                                <td className="p-4 text-slate-500 dark:text-slate-400">{investor.deposits}</td>
                            </tr>
                            <tr className="border-b">
                                <th className="w-[1px] whitespace-nowrap font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">Total Profit</th>
                                <td className="p-4 text-slate-500 dark:text-slate-400">{investor.returns}</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            }
        </>
    );
};

export default InvestorsShowPage;
