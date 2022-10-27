const errorMessage = (e, from = "") => {
    let error = e.response ? e.response.data.message : e.message;
    if (from) error = from + ": " + error;
    return error;
}

export default errorMessage;