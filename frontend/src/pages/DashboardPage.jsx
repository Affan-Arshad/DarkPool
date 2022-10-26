import React, { useState, useRef, useEffect } from "react";
import useProjectsStore from "../store/projectsStore";
import ProjectListItem from "../components/projects/ProjectListItem";
import AddProjectFormModal from "../components/projects/AddProjectFormModal";

const DashboardPage = () => {
    // access store
    const projectsStore = useProjectsStore();
    const balances = projectsStore.balances;
    const loading = projectsStore.loading;

    // fetch projects from api on first render
    useEffect(() => {
        projectsStore.fetchBalances()
    }, []);

    // state variables
    const [showAddForm, setShowAddForm] = useState(false);

    // show and hide add project form
    const handleShowAddProjectForm = () => {
        setShowAddForm(true);
    };

    const handleHideAddProjectForm = () => {
        setShowAddForm(false);
    };

    return (
        <>
            {loading ? (<h1>Loading...</h1>) :
                <div className="wrapper">
                    <h1 className="text-5xl text-center mb-6">Dashboard</h1>
                    <div className="grid sm:grid-cols-[1fr,1fr] justify-around gap-5 max-w-4xl m-auto">

                        <div className="w-full grid justify-items-center">
                            <div className="bg-blue-100 border-blue-700 text-blue-600 border-2 py-10 px-2 text-center font-bold max-w-md w-full">
                                <big className="block text-4xl">{Intl.NumberFormat().format(balances.totalBalance)}<small> MVR</small></big>
                                <big>Total Pool</big>
                            </div>
                        </div>

                        <div className="w-full grid justify-items-center">
                            <div className="bg-green-100 border-green-700 text-green-600 border-2 py-10 px-2 text-center font-bold max-w-md w-full">
                                <big className="block text-4xl">{Intl.NumberFormat().format(balances.availableBalance)}<small> MVR</small></big>
                                <big>Available Balance</big>
                            </div>
                        </div>

                        <div className="w-full grid justify-items-center">
                            <div className="bg-red-100 border-red-700 text-red-600 border-2 py-10 px-2 text-center font-bold max-w-md w-full">
                                <big className="block text-4xl">{Intl.NumberFormat().format(balances.activeProjectCosts)}<small> MVR</small></big>
                                <big>Active Costs</big>
                            </div>
                        </div>

                        <div className="w-full grid justify-items-center">
                            <div className="bg-cyan-100 border-cyan-700 text-cyan-600 border-2 py-10 px-2 text-center font-bold max-w-md w-full">
                                <big className="block text-4xl">{Intl.NumberFormat().format(balances.totalInvestors)}<small></small></big>
                                <big>Total Investors</big>
                            </div>
                        </div>

                    </div>
                </div>
            }
        </>
    );
};

export default DashboardPage;
