import { API_URL } from "./urls";

const publishStory = (storyNode) => {
    const url = `${API_URL}/stories`;

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(storyNode),
    };

    return fetch(url, requestOptions);
};

export default publishStory;
