import { auth, db } from "../App";
import { collection, getDocs, query, where } from "firebase/firestore";

const getConversations = () => {
    const conversationQuery = query(
        collection(db, "directMessages"),
        where("participants", "array-contains", auth.currentUser.uid)
    );

    return getDocs(conversationQuery);
};

export default getConversations;
