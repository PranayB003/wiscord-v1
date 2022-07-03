const getFirebaseErrorMessage = (err) => {
    let message = err.message
        .split(" ")[2]
        .replace(/(^\([a-z]+\/|\))/g, "")
        .split("-")
        .join(" ");

    return message;
};

export default getFirebaseErrorMessage;
