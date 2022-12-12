import React, { useState, useEffect } from "react";
import useCostsStore from "../store/costsStore";
import AddCostFormModal from "../components/costs/AddCostFormModal";
import { FaPlusSquare } from 'react-icons/fa';
import CostRowItem from "../components/costs/CostRowItem";
import EditCostFormModal from "../components/costs/EditCostFormModal";

const CostsIndexPage = (props) => {

    const { projectId } = props;

    // access store
    const costsStore = useCostsStore();
    const costs = costsStore.costs;
    const loading = costsStore.loading;
    const error = costsStore.error;
    const updateCost = costsStore.updateCost;
    const addCost = costsStore.addCost;

    // state variables
    const [showAddForm, setShowAddForm] = useState(false);
    const [editCost, setEditCost] = useState(null);

    // fetch costs from api on first render
    useEffect(() => {
        if (projectId)
            costsStore.fetchCosts(projectId)

        // eslint-disable-next-line 
    }, []);

    // get all costs after updating a cost
    const handleUpdateCost = async (cost) => {
        updateCost(projectId, cost)
            .then(() => {
                costsStore.fetchCosts(projectId);
            });
    }

    // get all costs after updating a cost
    const handleAddCost = async (cost) => {
        addCost(projectId, cost)
            .then(() => {
                costsStore.fetchCosts(projectId);
            });
    }


    // show and hide add/edit cost forms
    const handleShowAddCostForm = () => {
        setShowAddForm(true);
    };

    const handleHideAddCostForm = () => {
        setShowAddForm(false);
    };

    const handleSetEditCost = (cost) => {
        setEditCost(cost);
    };

    const handleHideEditCostForm = () => {
        setEditCost(null);
    };

    return (
        <>
            {loading ? (<h1>Loading...</h1>) :
                <div>
                    {/* Page Title */}
                    <div className="flex justify-center items-end mb-3">
                        <h1 className="ml-auto text-xl">Costs</h1>

                        {/* Add Cost Button -> Shows Modal */}
                        <button
                            className="ml-auto text-blue-500 underline"
                            onClick={handleShowAddCostForm}
                        >
                            <FaPlusSquare className="text-xl text-green-500" />
                        </button>
                    </div>

                    {/* Costs Listing */}
                    <table className="border-collapse w-full border border-slate-400 dark:border-slate-500 bg-white dark:bg-slate-800 text-sm shadow-sm">
                        <thead className="bg-slate-50 dark:bg-slate-700">
                            <tr>
                                <th className="border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">Date</th>
                                <th className="border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">Description</th>
                                <th className="border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">Amount</th>
                                <th className="border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">Investors</th>
                                <th className="border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {costs
                                ? costs.map((p) => <CostRowItem handleSetEditCost={handleSetEditCost} key={p.id} cost={p} />)
                                : <tr className="text-center"><td className="p-4" colSpan={5}>No Costs Yet</td></tr>
                            }
                        </tbody>
                    </table>
                    {/* {costs &&
                        costs.map((p) => <CostListItem key={p.id} cost={p} />)} */}

                    {/* Hidden Add Modal */}
                    {showAddForm && (
                        <AddCostFormModal
                            handleHideCostForm={handleHideAddCostForm}
                            addCost={handleAddCost}
                        />
                    )}

                    {editCost && (
                        <EditCostFormModal
                            handleHideCostForm={handleHideEditCostForm}
                            cost={editCost}
                            updateCost={handleUpdateCost}
                        />
                    )}
                </div>
            }
        </>
    );
};

export default CostsIndexPage;
