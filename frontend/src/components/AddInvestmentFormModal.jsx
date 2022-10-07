import { useRef, useState } from "react";
import useInvestmentsStore from "../store/investmentsStore";
import Modal from "../components/Modal";
import { useParams } from "react-router-dom";

const AddInvestmentFormModal = (props) => {
    const { handleHideAddInvestmentForm } = props;
    const { investorId } = useParams();

    // access store
    const { addInvestment } = useInvestmentsStore((state) => ({
        addInvestment: state.addInvestment
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
        formData.investor_id = investorId;
        addInvestment(formData);

        // reset form
        setFormData({});
        handleHideAddInvestmentForm();
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
                    <label>amount</label>
                    <input
                        autoFocus
                        required
                        name="amount"
                        value={formData.amount}
                        onChange={handleFormDataChange}
                        placeholder="amount"
                        className="border p-2 w-full mb-2"
                    />
                </div>

                <div className="mt-2">
                    <label>date</label>
                    <input
                        required
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleFormDataChange}
                        className="border p-2 w-full mb-2"
                    />
                </div>

                <button type="submit" hidden ref={formSubmitButton}></button>
            </form>
        </>
    );

    return (
        <Modal
            modalTitle="Create Investment"
            modalBody={form}
            handleModalHide={handleHideAddInvestmentForm}
            handleModalSubmit={handleModalSubmit}
            submitText="Submit"
        />
    );
};

export default AddInvestmentFormModal;
