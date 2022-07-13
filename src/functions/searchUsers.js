import { db } from "../App";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

const searchUsers = (searchString) => {
    const userQuery = query(
        collection(db, "users"),
        where("displayName", ">=", searchString),
        where("displayName", "<=", searchString + "\uf8ff"),
        orderBy("displayName")
    );

    return getDocs(userQuery);
};

export default searchUsers;
