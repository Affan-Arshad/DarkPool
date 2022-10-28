import { useRef, useState } from "react";
import Modal from "../Modal";

const InvestorFormModal = (props) => {
    const { modalTitle, handleHideInvestorForm, submitFormData, defaultFormData } = props;

    // state variables
    const [formData, setFormData] = useState(defaultFormData);

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

        // add the project
        submitFormData(formData);

        // reset form
        setFormData(defaultFormData);
        handleHideInvestorForm();
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
                    <label>Name</label>
                    <input
                        autoFocus
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleFormDataChange}
                        placeholder="Investor Name"
                        className="border p-2 w-full mb-2"
                    />
                </div>

                <div className="mt-2">
                    <label>Account name</label>
                    <input
                        required
                        name="account_name"
                        value={formData.account_name}
                        onChange={handleFormDataChange}
                        placeholder="Account Name"
                        className="border p-2 w-full mb-2"
                    />
                </div>

                <div className="mt-2">
                    <label>Account No</label>
                    <input
                        type="number"
                        required
                        name="account_no"
                        value={formData.account_no}
                        onChange={handleFormDataChange}
                        placeholder="Account Number"
                        className="border p-2 w-full mb-2"
                    />
                </div>


                <button type="submit" hidden ref={formSubmitButton}></button>
            </form>
        </>
    );

    return (
        <Modal
            modalTitle={modalTitle}
            modalBody={form}
            handleModalHide={handleHideInvestorForm}
            handleModalSubmit={handleModalSubmit}
            submitText="Submit"
        />
    );
};

export default InvestorFormModal;
