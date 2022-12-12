const errorMessage = (e, from = "") => {
    let error = null;
    if (e.response) error = e.response.data.message;
    else if (error.message) error = e.message;
    if (error && from) error = from + ": " + error;

    return error;
}

export default errorMessage;