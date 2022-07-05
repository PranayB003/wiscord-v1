import sameDayOfYear from "./sameDayOfYear";

const groupByDate = (inputArray) => {
    let result = [];

    let previousDate = null;
    inputArray.forEach((data) => {
        const createdAt = data.createdAt;
        const currentDate = createdAt
            ? new Date(createdAt.seconds * 1000)
            : new Date();
        const newData = {
            ...data,
            createdAt: currentDate,
        };
        if (sameDayOfYear(currentDate, previousDate)) {
            const lastIndex = result.length - 1;
            result[lastIndex].push(newData);
        } else {
            result.push([newData]);
        }
        previousDate = currentDate;
    });

    return result;
};

export default groupByDate;
