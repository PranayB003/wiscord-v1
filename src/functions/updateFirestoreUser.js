import { doc, setDoc } from "firebase/firestore";
import { db } from "./../App";

const updateFirestoreUser = (userID, data) => {
    return setDoc(doc(db, "users", userID), data, {
        merge: true,
    });
};

export default updateFirestoreUser;
