import React, { useState, useEffect } from "react";
import useInvestorsStore from "../store/investorsStore";
import AddInvestorFormModal from "../components/investors/AddInvestorFormModal";
import { FaPlusSquare } from 'react-icons/fa';
import InvestorRowItem from "../components/investors/InvestorRowItem";
import EditInvestorFormModal from "../components/investors/EditInvestorFormModal";

const InvestorsIndexPage = () => {
    // access store
    const investorsStore = useInvestorsStore();
    const investors = investorsStore.investors;
    const loading = investorsStore.loading;
    const updateInvestor = investorsStore.updateInvestor;
    const addInvestor = investorsStore.addInvestor;

    // state variables
    const [showAddForm, setShowAddForm] = useState(false);
    const [editInvestor, setEditInvestor] = useState(null);

    // fetch investors from api on first render
    useEffect(() => {
        investorsStore.fetchInvestors()

        // eslint-disable-next-line 
    }, []);

    // get all investors after updating a investor
    const handleUpdateInvestor = async (investor) => {
        updateInvestor(investor)
            .then(() => {
                investorsStore.fetchInvestors();
            });

    }

    // show and hide add/edit investor forms
    const handleShowAddInvestorForm = () => {
        setShowAddForm(true);
    };

    const handleHideAddInvestorForm = () => {
        setShowAddForm(false);
    };

    const handleSetEditInvestor = (investor) => {
        setEditInvestor(investor);
    };

    const handleHideEditInvestorForm = () => {
        setEditInvestor(null);
    };

    return (
        <>
            {loading ? (<h1>Loading...</h1>) :
                <div>
                    {/* Page Title */}
                    <div className="flex justify-center items-end mb-3">
                        <h1 className="ml-auto text-xl">Investors</h1>

                        {/* Add Investor Button -> Shows Modal */}
                        <button
                            className="ml-auto text-blue-500 underline"
                            onClick={handleShowAddInvestorForm}
                        >
                            <FaPlusSquare className="text-xl text-green-500" />
                        </button>
                    </div>

                    {/* Investors Listing */}
                    <table className="border-collapse w-full border border-slate-400 dark:border-slate-500 bg-white dark:bg-slate-800 text-sm shadow-sm">
                        <thead className="bg-slate-50 dark:bg-slate-700">
                            <tr>
                                <th className="border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">Name</th>
                                <th className="border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">Account No.</th>
                                <th className="border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">Deposit Total</th>
                                <th className="border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">Total Profit</th>
                                <th className="border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {investors &&
                                investors.map((p) => <InvestorRowItem handleSetEditInvestor={handleSetEditInvestor} key={p.id} investor={p} />)}
                        </tbody>
                    </table>
                    {/* {investors &&
                        investors.map((p) => <InvestorListItem key={p.id} investor={p} />)} */}

                    {/* Hidden Add Modal */}
                    {showAddForm && (
                        <AddInvestorFormModal
                            handleHideInvestorForm={handleHideAddInvestorForm}
                            addInvestor={addInvestor}
                        />
                    )}

                    {editInvestor && (
                        <EditInvestorFormModal
                            handleHideInvestorForm={handleHideEditInvestorForm}
                            investor={editInvestor}
                            updateInvestor={handleUpdateInvestor}
                        />
                    )}
                </div>
            }
        </>
    );
};

export default InvestorsIndexPage;
