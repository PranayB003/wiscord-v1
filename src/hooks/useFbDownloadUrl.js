import { useCallback, useState } from "react";

import { getDownloadURL } from "firebase/storage";

const useFbDownloadURL = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const downloadURL = useCallback(async (storageRef) => {
        setLoading(true);
        setError(null);
        try {
            const url = await getDownloadURL(storageRef);
            setLoading(false);
            return url;
        } catch (error) {
            setLoading(false);
            setError(error);
            return null;
        }
    }, []);

    return [downloadURL, loading, error];
};

export default useFbDownloadURL;
