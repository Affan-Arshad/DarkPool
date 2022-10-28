import InvestorFormModal from "./InvestorFormModal";

const AddInvestorFormModal = (props) => {
    const { handleHideInvestorForm, addInvestor } = props;
    const defaultFormData = {};
    return (
        <InvestorFormModal
            modalTitle="Add Investor"
            submitFormData={addInvestor}
            handleHideInvestorForm={handleHideInvestorForm}
            defaultFormData={defaultFormData}
        />
    );
};

export default AddInvestorFormModal;
