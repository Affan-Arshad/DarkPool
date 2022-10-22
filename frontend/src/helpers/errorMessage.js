const errorMessage = (e, from = "") => {
    let error = e.response ? e.response.data.message : e.message;
    from ? error = from + ": " + error : error = error;
    return error;
}

export default errorMessage;