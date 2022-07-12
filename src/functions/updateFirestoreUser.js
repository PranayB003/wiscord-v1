import { doc, setDoc } from "firebase/firestore";
import { db } from "./../App";

const updateFirestoreUser = (user) => {
    return setDoc(
        doc(db, "users", user.uid),
        {
            uid: user.uid,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL,
            displayName: user.displayName,
        },
        {
            merge: true,
        }
    );
};

export default updateFirestoreUser;
