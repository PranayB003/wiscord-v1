const messageConverter = {
    toFirestore: (data) => data,
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return {
            id: snapshot.id,
            ...data,
        };
    },
};

export default messageConverter;
