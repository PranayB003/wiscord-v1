import sameDayOfYear from "./sameDayOfYear";
import sameTime from "./sameTime";

const groupByTimeUser = (inputArray) => {
    let result = [];

    let previousDate = null;
    let previousUid = null;

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
            const lastDateIndex = result.length - 1;
            if (
                sameTime(currentDate, previousDate) &&
                data.uid === previousUid
            ) {
                const lastTimeIndex = result[lastDateIndex].length - 1;
                result[lastDateIndex][lastTimeIndex].push(newData);
            } else {
                result[lastDateIndex].push([newData]);
            }
        } else {
            result.push([[newData]]);
        }

        previousDate = currentDate;
        previousUid = data.uid;
    });

    return result;
};

export default groupByTimeUser;
