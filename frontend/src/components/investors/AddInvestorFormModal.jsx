import InvestorFormModal from "./InvestorFormModal";

const AddInvestorFormModal = (props) => {
    const { handleHideInvestorForm, addInvestor } = props;
    const defaultFormData = {
        name: "",
        account_name: "",
        account_no: ""
    };
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
