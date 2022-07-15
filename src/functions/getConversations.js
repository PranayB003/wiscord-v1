import { auth, db } from "../App";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
} from "firebase/firestore";

const converter = {
    toFirestore: (data) => data,
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return {
            id: snapshot.id,
            uidTo:
                data.participants[0] === auth.currentUser.uid
                    ? data.participants[1]
                    : data.participants[0],
        };
    },
};

const getConversations = async () => {
    const conversationQuery = query(
        collection(db, "directMessages").withConverter(converter),
        where("participants", "array-contains", auth.currentUser.uid)
    );

    const conversations = await getDocs(conversationQuery);
    const data = conversations.docs.map((convDoc) => {
        const convData = convDoc.data();
        return new Promise(async (resolve, reject) => {
            try {
                const userDoc = await getDoc(doc(db, "users", convData.uidTo));
                let userData;
                if (userDoc.exists()) {
                    userData = userDoc.data();
                } else {
                    userData = {
                        uid: convData.uidTo,
                        displayName: "[deleted user]",
                    };
                }
                resolve({
                    convID: convData.id,
                    user: userData,
                });
            } catch (error) {
                reject(error);
            }
        });
    });

    return Promise.all(data);
};

export default getConversations;
