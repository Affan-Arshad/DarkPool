import CostFormModal from "./CostFormModal";

const EditCostFormModal = (props) => {
    const { handleHideCostForm, cost, updateCost } = props;

    const defaultFormData = { ...cost }

    return (
        <CostFormModal
            modalTitle="Edit Cost"
            submitFormData={updateCost}
            handleHideCostForm={handleHideCostForm}
            defaultFormData={defaultFormData}
        />
    );
};

export default EditCostFormModal;
