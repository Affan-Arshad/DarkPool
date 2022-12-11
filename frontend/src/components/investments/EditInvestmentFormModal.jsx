import InvestmentFormModal from "./InvestmentFormModal";

const EditInvestmentFormModal = (props) => {
    const { handleHideInvestmentForm, investment, updateInvestment } = props;

    const defaultFormData = { ...investment }

    return (
        <InvestmentFormModal
            modalTitle="Edit Investment"
            submitFormData={updateInvestment}
            handleHideInvestmentForm={handleHideInvestmentForm}
            defaultFormData={defaultFormData}
        />
    );
};

export default EditInvestmentFormModal;
