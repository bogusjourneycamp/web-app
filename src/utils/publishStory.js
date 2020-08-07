import { API_URL, CORS_PROXY_URL } from "./urls";

const publishStory = (storyNode) => {
    const url = `${CORS_PROXY_URL}/${API_URL}/story`;

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(storyNode),
    };

    return fetch(url, requestOptions);
};

export default publishStory;
