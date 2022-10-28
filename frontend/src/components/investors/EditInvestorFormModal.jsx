import InvestorFormModal from "./InvestorFormModal";

const EditInvestorFormModal = (props) => {
    const { handleHideInvestorForm, investor, updateInvestor } = props;

    return (
        <InvestorFormModal
            modalTitle="Edit Investor"
            submitFormData={updateInvestor}
            handleHideInvestorForm={handleHideInvestorForm}
            defaultFormData={investor}
        />
    );
};

export default EditInvestorFormModal;
