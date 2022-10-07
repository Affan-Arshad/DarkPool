const Modal = (props) => {
    let {
        modalTitle,
        modalBody,
        handleModalHide,
        handleModalSubmit,
        submitText
    } = props;

    // set default values
    modalTitle = modalTitle ?? "missing prop: modalTitle";

    modalBody = modalBody ?? "missing prop: modalBody";

    handleModalHide =
        handleModalHide ??
        (() => {
            alert("missing prop: handleModalHide");
        });

    handleModalSubmit =
        handleModalSubmit ??
        (() => {
            alert("missing prop: handleModalSubmit");
        });

    submitText = submitText ?? "missing prop: submitText";

    return (
        <div className="relative z-10">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center ">
                    <div className="w-full max-w-2xl relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all">
                        <div className="bg-white p-6 pb-4 ">
                            <h3
                                className="text-lg font-medium leading-6 text-gray-900"
                                id="modal-title"
                            >
                                {modalTitle}
                            </h3>

                            {modalBody}
                        </div>
                        <div className="bg-gray-50 px-4 py-3 flex gap-2 justify-end">
                            <button
                                onClick={handleModalHide}
                                type="button"
                                className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleModalSubmit}
                                type="submit"
                                className="inline-flex w-full justify-center rounded-md border border-transparent bg-teal-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                                {submitText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
