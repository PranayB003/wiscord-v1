const sameDayOfYear = (date1, date2) => {
    if (date1 && date2) {
        const sameDate = date1.getDate() === date2.getDate();
        const sameMonth = date1.getMonth() === date2.getMonth();
        const sameYear = date1.getFullYear() === date2.getFullYear();

        return sameDate && sameMonth && sameYear;
    } else {
        return false;
    }
};

export default sameDayOfYear;
