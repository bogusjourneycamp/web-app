import getUnclaimedNode from "./getUnclaimedNode";
import isEmptyObject from "./isEmptyObject";
import { API_URL } from "./urls";

const fetchNode = async (location) => {
    const url = `${API_URL}/story/${location}`;

    if (!location) {
        throw new Error("Somehow got empty location");
    }

    try {
        const response = await fetch(url);
        const result = await response.json();

        if (isEmptyObject(result)) {
            return getUnclaimedNode(location);
        }

        return result;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }

    return getUnclaimedNode(location);
};

export default fetchNode;
