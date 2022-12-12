import React, { useState, useEffect } from "react";
import useInvestmentsStore from "../store/investmentsStore";
import AddInvestmentFormModal from "../components/investments/AddInvestmentFormModal";
import { FaPlusSquare } from 'react-icons/fa';
import InvestmentRowItem from "../components/investments/InvestmentRowItem";
import EditInvestmentFormModal from "../components/investments/EditInvestmentFormModal";

const InvestmentsIndexPage = (props) => {

    const { investorId } = props;

    // access store
    const investmentsStore = useInvestmentsStore();
    const investments = investmentsStore.investments;
    const loading = investmentsStore.loading;
    const updateInvestment = investmentsStore.updateInvestment;
    const addInvestment = investmentsStore.addInvestment;

    // state variables
    const [showAddForm, setShowAddForm] = useState(false);
    const [editInvestment, setEditInvestment] = useState(null);

    // fetch investments from api on first render
    useEffect(() => {
        if (investorId)
            investmentsStore.fetchInvestments(investorId)

        // eslint-disable-next-line 
    }, []);

    // get all investments after updating a investment
    const handleUpdateInvestment = async (investment) => {
        updateInvestment(investment)
            .then(() => {
                investmentsStore.fetchInvestments(investorId);
            });
    }

    // get all investments after updating a investment
    const handleAddInvestment = async (investment) => {
        // set values that user should not be able to change
        investment.type = "investment";
        investment.investor_id = investorId;

        addInvestment(investment)
            .then(() => {
                investmentsStore.fetchInvestments(investorId);
            });
    }


    // show and hide add/edit investment forms
    const handleShowAddInvestmentForm = () => {
        setShowAddForm(true);
    };

    const handleHideAddInvestmentForm = () => {
        setShowAddForm(false);
    };

    const handleSetEditInvestment = (investment) => {
        setEditInvestment(investment);
    };

    const handleHideEditInvestmentForm = () => {
        setEditInvestment(null);
    };

    return (
        <>
            {loading ? (<h1>Loading...</h1>) :
                <div>
                    {/* Page Title */}
                    <div className="flex justify-center items-end mb-3">
                        <h1 className="ml-auto text-xl">Investments</h1>

                        {/* Add Investment Button -> Shows Modal */}
                        <button
                            className="ml-auto text-blue-500 underline"
                            onClick={handleShowAddInvestmentForm}
                        >
                            <FaPlusSquare className="text-xl text-green-500" />
                        </button>
                    </div>

                    {/* Investments Listing */}
                    <table className="border-collapse w-full border border-slate-400 dark:border-slate-500 bg-white dark:bg-slate-800 text-sm shadow-sm">
                        <thead className="bg-slate-50 dark:bg-slate-700">
                            <tr>
                                <th className="border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">Amount</th>
                                <th className="border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">Date</th>
                                <th className="border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">Type</th>
                                <th className="border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {investments
                                ? investments.map((p) => <InvestmentRowItem handleSetEditInvestment={handleSetEditInvestment} key={p.id} investment={p} />)
                                : <tr className="text-center"><td className="p-4" colSpan={5}>No Investments Yet</td></tr>
                            }
                        </tbody>
                    </table>
                    {/* {investments &&
                        investments.map((p) => <InvestmentListItem key={p.id} investment={p} />)} */}

                    {/* Hidden Add Modal */}
                    {showAddForm && (
                        <AddInvestmentFormModal
                            handleHideInvestmentForm={handleHideAddInvestmentForm}
                            addInvestment={handleAddInvestment}
                        />
                    )}

                    {editInvestment && (
                        <EditInvestmentFormModal
                            handleHideInvestmentForm={handleHideEditInvestmentForm}
                            investment={editInvestment}
                            updateInvestment={handleUpdateInvestment}
                        />
                    )}
                </div>
            }
        </>
    );
};

export default InvestmentsIndexPage;
