const messageConverter = {
    toFirestore: (data) => data,
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return {
            id: snapshot.id,
            body: data.body,
            createdAt: data.createdAt,
            phoneNumber: data.phoneNumber,
            uid: data.uid,
        };
    },
};

export default messageConverter;
