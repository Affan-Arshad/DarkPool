import ProjectFormModal from "./ProjectFormModal";

const EditProjectFormModal = (props) => {
    const { handleHideProjectForm, project, updateProject } = props;

    return (
        <ProjectFormModal
            modalTitle="Edit Project"
            submitFormData={updateProject}
            handleHideProjectForm={handleHideProjectForm}
            defaultFormData={project}
        />
    );
};

export default EditProjectFormModal;
