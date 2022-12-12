import { useRef, useState } from "react";
import Modal from "../Modal";

const CostFormModal = (props) => {
    const { modalTitle, handleHideCostForm, submitFormData, defaultFormData } = props;

    // state variables
    const [formData, setFormData] = useState(defaultFormData);

    // handle form data change
    const handleFormDataChange = (event) => {
        setFormData((old) => ({
            ...old,
            [event.target.name]: event.target.value
        }));
    };

    // handle add investment form submission
    const handleFormSubmit = (event) => {
        event.preventDefault();

        // add the investment
        submitFormData(formData);

        // reset form
        setFormData(defaultFormData);
        handleHideCostForm();
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
                    <label>Description</label>
                    <input
                        autoFocus
                        required
                        name="description"
                        value={formData.description}
                        onChange={handleFormDataChange}
                        placeholder="Description"
                        className="border p-2 w-full mb-2"
                    />
                </div>
                <div className="mt-2">
                    <label>Amount</label>
                    <input
                        required
                        name="amount"
                        value={formData.amount}
                        onChange={handleFormDataChange}
                        placeholder="Amount"
                        className="border p-2 w-full mb-2"
                    />
                </div>

                <div className="mt-2">
                    <label>Date</label>
                    <input
                        required
                        name="date"
                        value={formData.date}
                        onChange={handleFormDataChange}
                        className="border p-2 w-full mb-2"
                        type="date"
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
            handleModalHide={handleHideCostForm}
            handleModalSubmit={handleModalSubmit}
            submitText="Submit"
        />
    );
};

export default CostFormModal;
