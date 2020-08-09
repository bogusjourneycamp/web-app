import { notification } from "antd";
import getUnclaimedNode from "./getUnclaimedNode";
import isEmptyObject from "./isEmptyObject";
import { API_URL } from "./urls";

const fetchNode = async (location) => {
    const url = `${API_URL}/story/${location}`;
    const errorMessage = `Failed to fetch story at location: ${location}`;

    if (!location) {
        throw new Error("Somehow got empty location");
    }

    try {
        const response = await fetch(url);
        const result = await response.json();

        if (typeof result === "string") {
            notification.error({
                message: errorMessage,
            });
            return null;
        }

        if (isEmptyObject(result)) {
            return getUnclaimedNode(location);
        }

        return result;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);

        notification.error({
            message: errorMessage,
        });
        return null;
    }
};

export default fetchNode;
