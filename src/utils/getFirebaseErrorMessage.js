const getFirebaseErrorMessage = (err) => {
    let message = err.code
        .replace(/(^[a-z]+\/)/g, "")
        .split("-")
        .join(" ");

    return message;
};

export default getFirebaseErrorMessage;
