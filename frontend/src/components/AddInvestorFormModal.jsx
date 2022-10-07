import { useRef, useState } from "react";
import useInvestorsStore from "../store/investorsStore";
import Modal from "../components/Modal";

const AddInvestorFormModal = (props) => {
    const { handleHideAddInvestorForm } = props;

    // access store
    const { addInvestor } = useInvestorsStore((state) => ({
        addInvestor: state.addInvestor
    }));

    // state variables
    const [formData, setFormData] = useState({});

    // handle form data change
    const handleFormDataChange = (event) => {
        setFormData((old) => ({
            ...old,
            [event.target.name]: event.target.value
        }));
    };

    // handle add investor form submission
    const handleFormSubmit = (event) => {
        event.preventDefault();

        // add the investor
        addInvestor(formData);

        // reset form
        setFormData({});
        handleHideAddInvestorForm();
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
                    <label>Investor Name</label>
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
                    <label>Account Number</label>
                    <input
                        required
                        name="account_no"
                        value={formData.account_no}
                        onChange={handleFormDataChange}
                        placeholder="account_no"
                        className="border p-2 w-full mb-2"
                    />
                </div>

                <div className="mt-2">
                    <label>account_name</label>
                    <input
                        required
                        name="account_name"
                        value={formData.account_name}
                        onChange={handleFormDataChange}
                        placeholder="account_name"
                        className="border p-2 w-full mb-2"
                    />
                </div>
                <button type="submit" hidden ref={formSubmitButton}></button>
            </form>
        </>
    );

    return (
        <Modal
            modalTitle="Create Investor"
            modalBody={form}
            handleModalHide={handleHideAddInvestorForm}
            handleModalSubmit={handleModalSubmit}
            submitText="Submit"
        />
    );
};

export default AddInvestorFormModal;
