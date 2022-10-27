import ProjectFormModal from "./ProjectFormModal";

const AddProjectFormModal = (props) => {
    const { handleHideProjectForm, addProject } = props;
    const defaultFormData = { status: "Ongoing" };
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
