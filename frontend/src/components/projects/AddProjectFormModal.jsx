import ProjectFormModal from "./ProjectFormModal";

const AddProjectFormModal = (props) => {
    const { handleHideProjectForm, defaultFormData, addProject } = props;

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
