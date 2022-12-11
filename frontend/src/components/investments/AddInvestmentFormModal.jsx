import InvestmentFormModal from "./InvestmentFormModal";

const AddInvestmentFormModal = (props) => {
    const { handleHideInvestmentForm, addInvestment } = props;

    const defaultFormData = {
        amount: "",
        date: ""
    }

    return (
        <InvestmentFormModal
            modalTitle="Add Investment"
            submitFormData={addInvestment}
            handleHideInvestmentForm={handleHideInvestmentForm}
            defaultFormData={defaultFormData}
        />
    );
};

export default AddInvestmentFormModal;
