import useProjectsStore from "../store/projectsStore";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const ProjectsShowPage = () => {
    const { id } = useParams();
    const projectsStore = useProjectsStore();
    const project = projectsStore.project;
    const loading = projectsStore.loading;

    useEffect(() => {
        projectsStore.fetchProject(id);

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
                                <th className="w-[1px] whitespace-nowrap font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">Project Name</th>
                                <td className="p-4 text-slate-500 dark:text-slate-400">{project.name}</td>
                            </tr>
                            <tr className="border-b">
                                <th className="w-[1px] whitespace-nowrap font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">Client</th>
                                <td className="p-4 text-slate-500 dark:text-slate-400">{project.client_name}</td>
                            </tr>
                            <tr className="border-b">
                                <th className="w-[1px] whitespace-nowrap font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">Reference no.</th>
                                <td className="p-4 text-slate-500 dark:text-slate-400">{project.reference_no}</td>
                            </tr>
                            <tr className="border-b">
                                <th className="w-[1px] whitespace-nowrap font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">Start Date</th>
                                <td className="p-4 text-slate-500 dark:text-slate-400">{project.start_date}</td>
                            </tr>
                            <tr className="border-b">
                                <th className="w-[1px] whitespace-nowrap font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">Estimated Cost</th>
                                <td className="p-4 text-slate-500 dark:text-slate-400">{Intl.NumberFormat().format(project.estimated_cost)}</td>
                            </tr>
                            <tr className="border-b">
                                <th className="w-[1px] whitespace-nowrap font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">Realized Cost</th>
                                <td className="p-4 text-slate-500 dark:text-slate-400">{Intl.NumberFormat().format(project.costs_sum_amount)}</td>
                            </tr>
                            <tr className="border-b">
                                <th className="w-[1px] whitespace-nowrap font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">Proposed Price</th>
                                <td className="p-4 text-slate-500 dark:text-slate-400">{Intl.NumberFormat().format(project.proposed_price)}</td>
                            </tr>
                            <tr className="border-b">
                                <th className="w-[1px] whitespace-nowrap font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">Company Profit %</th>
                                <td className="p-4 text-slate-500 dark:text-slate-400">{project.company_profit_percent}</td>
                            </tr>
                            <tr className="border-b">
                                <th className="w-[1px] whitespace-nowrap font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">Status</th>
                                <td className="p-4 text-slate-500 dark:text-slate-400">{project.status}</td>
                            </tr>
                            <tr className="border-b">
                                <th className="w-[1px] whitespace-nowrap font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">Completed Date</th>
                                <td className="p-4 text-slate-500 dark:text-slate-400">{project.completed_date}</td>
                            </tr>
                            <tr className="border-b">
                                <th className="w-[1px] whitespace-nowrap font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">Realized Amount</th>
                                <td className="p-4 text-slate-500 dark:text-slate-400">{Intl.NumberFormat().format(project.realized_amount)}</td>
                            </tr>
                            <tr className="border-b">
                                <th className="w-[1px] whitespace-nowrap font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">P/L</th>
                                <td className="p-4 text-slate-500 dark:text-slate-400">{Intl.NumberFormat().format(project.profit_loss)}</td>
                            </tr>
                            <tr className="border-b">
                                <th className="w-[1px] whitespace-nowrap font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">Company P/L</th>
                                <td className="p-4 text-slate-500 dark:text-slate-400">{Intl.NumberFormat().format(project.company_profit_loss)}</td>
                            </tr>
                            <tr className="border-b">
                                <th className="w-[1px] whitespace-nowrap font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">Investors's Profit</th>
                                <td className="p-4 text-slate-500 dark:text-slate-400">{Intl.NumberFormat().format(project.shareable)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            }
        </>
    );
};

export default ProjectsShowPage;
