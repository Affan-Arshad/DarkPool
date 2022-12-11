import ProjectFormModal from "./ProjectFormModal";

const AddProjectFormModal = (props) => {
    const { handleHideProjectForm, addProject } = props;

    const defaultFormData = {
        name: "",
        client_name: "",
        reference_no: "",
        start_date: "",
        estimated_cost: "",
        proposed_price: "",
        company_profit_percent: "",
        status: "Ongoing"
    };

    return (
        <ProjectFormModal
            modalTitle="Add Project"
            submitFormData={addProject}
            handleHideProjectForm={handleHideProjectForm}
            defaultFormData={defaultFormData}
        />
    );
};

export default AddProjectFormModal;
