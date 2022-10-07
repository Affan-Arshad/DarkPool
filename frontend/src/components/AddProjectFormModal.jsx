import { useRef, useState } from "react";
import useProjectsStore from "../store/projectsStore";
import Modal from "../components/Modal";

const AddProjectFormModal = (props) => {
    const { handleHideAddProjectForm } = props;

    // access store
    const { addProject } = useProjectsStore((state) => ({
        addProject: state.addProject
    }));

    // status options
    const STATUSES = {
        'WIP': 'Ongoing',
        'Completed': 'Completed'
    };

    // default form
    const DEFAULT_FORM_DATA = { status: STATUSES['WIP'] };

    // state variables
    const [formData, setFormData] = useState(DEFAULT_FORM_DATA);

    // handle form data change
    const handleFormDataChange = (event) => {
        setFormData((old) => ({
            ...old,
            [event.target.name]: event.target.value
        }));
    };

    // handle add project form submission
    const handleFormSubmit = (event) => {
        event.preventDefault();

        // dont send these fields if not completed
        if (formData.status !== "Completed") {
            formData.completed_date = null;
            formData.realized_amount = null;
        }
        // add the project
        addProject(formData);

        // reset form
        setFormData(DEFAULT_FORM_DATA);
        handleHideAddProjectForm();
    };

    // ref to form submit button element
    const formSubmitButton = useRef();

    // handle click of modal submit button separately because it is placed outside of the form inside the modal
    const handleModalSubmit = () => {
        formSubmitButton.current.click();
    };

    const form = (
        <>
            <form onSubmit={handleFormSubmit}>
                <div className="mt-2">
                    <label>Project Name</label>
                    <input
                        autoFocus
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleFormDataChange}
                        placeholder="Project Name"
                        className="border p-2 w-full mb-2"
                    />
                </div>

                <div className="mt-2">
                    <label>Client name</label>
                    <input
                        required
                        name="client_name"
                        value={formData.client_name}
                        onChange={handleFormDataChange}
                        placeholder="client_name"
                        className="border p-2 w-full mb-2"
                    />
                </div>

                <div className="mt-2">
                    <label>reference_no</label>
                    <input
                        required
                        name="reference_no"
                        value={formData.reference_no}
                        onChange={handleFormDataChange}
                        placeholder="reference_no"
                        className="border p-2 w-full mb-2"
                    />
                </div>

                <div className="mt-2">
                    <label>start_date</label>
                    <input
                        required
                        name="start_date"
                        value={formData.start_date}
                        onChange={handleFormDataChange}
                        placeholder="start_date"
                        className="border p-2 w-full mb-2"
                        type="date"
                    />
                </div>

                <div className="mt-2">
                    <label>estimated_cost</label>
                    <input
                        required
                        name="estimated_cost"
                        value={formData.estimated_cost}
                        onChange={handleFormDataChange}
                        placeholder="estimated_cost"
                        className="border p-2 w-full mb-2"
                        type="number"
                    />
                </div>

                <div className="mt-2">
                    <label>proposed_price</label>
                    <input
                        required
                        name="proposed_price"
                        value={formData.proposed_price}
                        onChange={handleFormDataChange}
                        placeholder="proposed_price"
                        className="border p-2 w-full mb-2"
                        type="number"
                    />
                </div>

                <div className="mt-2">
                    <label>company_profit_percent</label>
                    <input
                        required
                        name="company_profit_percent"
                        value={formData.company_profit_percent}
                        onChange={handleFormDataChange}
                        placeholder="company_profit_percent"
                        className="border p-2 w-full mb-2"
                        type="number"
                        min="0"
                        max="100"
                        step="1"
                    />
                </div>

                <div className="mt-2">
                    <label>status</label>
                    <select
                        required
                        name="status"
                        value={formData.status}
                        onChange={handleFormDataChange}
                        className="border p-2 w-full mb-2"
                    >
                        {
                            Object.keys(STATUSES).map(v => (
                                <option value={v}>{STATUSES[v]}</option>
                            ))
                        }
                    </select>
                </div>

                {formData.status === "Completed" &&
                    (<>
                        <div className="mt-2">
                            <label>completed_date</label>
                            <input
                                required
                                name="completed_date"
                                value={formData.completed_date}
                                onChange={handleFormDataChange}
                                placeholder="completed_date"
                                className="border p-2 w-full mb-2"
                                type="date"
                            />
                        </div>

                        <div className="mt-2">
                            <label>realized_amount</label>
                            <input
                                required
                                name="realized_amount"
                                value={formData.realized_amount}
                                onChange={handleFormDataChange}
                                placeholder="realized_amount"
                                className="border p-2 w-full mb-2"
                                type="number"
                            />
                        </div>
                    </>
                    )
                }

                <button type="submit" hidden ref={formSubmitButton}></button>
            </form>
        </>
    );

    return (
        <Modal
            modalTitle="Create Project"
            modalBody={form}
            handleModalHide={handleHideAddProjectForm}
            handleModalSubmit={handleModalSubmit}
            submitText="Submit"
        />
    );
};

export default AddProjectFormModal;
