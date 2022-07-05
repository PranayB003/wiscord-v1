import sameDayOfYear from "./sameDayOfYear";

const sameTime = (date1, date2) => {
    if (date1 && date2) {
        const sameDate = sameDayOfYear(date1, date2);
        const sameHour = date1.getHours() === date2.getHours();
        const sameMinute = date1.getMinutes() === date2.getMinutes();

        return sameDate && sameHour && sameMinute;
    } else {
        return false;
    }
};

export default sameTime;
