import { API_URL } from "./urls";

const publishStory = (storyNode) => {
    const url = `${API_URL}/story`;

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(storyNode),
    };

    return fetch(url, requestOptions);
};

export default publishStory;
