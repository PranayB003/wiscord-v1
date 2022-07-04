const getFormattedDate = (date = new Date()) => {
    const monthMap = [
        "January",
        "Febuary",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const result = `${
        monthMap[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;

    return result;
};

export default getFormattedDate;
