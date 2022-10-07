import { useEffect, useState } from "react";
import AddInvestorFormModal from "../components/AddInvestorFormModal";
import InvestorListItem from "../components/InvestorListItem";
import useInvestorsStore from "../store/investorsStore";

const InvestorsIndexPage = () => {
    // access store
    const investorsStore = useInvestorsStore();
    const investors = investorsStore.investors;
    const loading = investorsStore.loading;

    // fetch investors from api on first render
    useEffect(() => {
        investorsStore.fetchInvestors()
    }, []);

    // state variables
    const [showAddForm, setShowAddForm] = useState(false);

    // show and hide add project form
    const handleShowAddInvestorForm = () => {
        setShowAddForm(true);
    };

    const handleHideAddInvestorForm = () => {
        setShowAddForm(false);
    };

    return (
        <>
            {loading ? <p>loading...</p> :
                <>
                    {/* Hidden Modal */}
                    {showAddForm && (
                        <AddInvestorFormModal
                            handleHideAddInvestorForm={handleHideAddInvestorForm}
                        />
                    )}

                    {/* Add Investor Button -> Shows Modal */}
                    <button
                        className="text-blue-500 underline"
                        onClick={handleShowAddInvestorForm}
                    >
                        Add Investor
                    </button>

                    {/* Investors Listing */}
                    {investors &&
                        investors.map((investor) => (
                            <InvestorListItem key={investor.id} investor={investor} />
                        ))}
                </>
            }
        </>
    );
};

export default InvestorsIndexPage;
