import { API_URL } from "./urls";

const publishStory = (storyNode) => {
    const url = `${API_URL}/story?location=${storyNode.location}`;

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(storyNode),
    };

    return fetch(url, requestOptions);
};

export default publishStory;
