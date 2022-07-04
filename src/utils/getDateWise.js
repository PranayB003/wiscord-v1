import sameDayOfYear from "./sameDayOfYear";

const getDateWise = (inputArray) => {
    let result = [];

    let previousDate = null;
    inputArray.forEach((data) => {
        const currentDate = new Date(data.createdAt * 1000);
        if (sameDayOfYear(currentDate, previousDate)) {
            const lastIndex = result.length - 1;
            result[lastIndex].push(data);
        } else {
            result.push([data]);
        }
        previousDate = currentDate;
    });

    return result;
};

export default getDateWise;
