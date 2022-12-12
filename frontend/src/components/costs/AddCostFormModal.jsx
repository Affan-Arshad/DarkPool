import CostFormModal from "./CostFormModal";

const AddCostFormModal = (props) => {
    const { handleHideCostForm, addCost } = props;

    const defaultFormData = {
        amount: "",
        description: "",
        date: ""
    }

    return (
        <CostFormModal
            modalTitle="Add Cost"
            submitFormData={addCost}
            handleHideCostForm={handleHideCostForm}
            defaultFormData={defaultFormData}
        />
    );
};

export default AddCostFormModal;
