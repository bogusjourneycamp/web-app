export const publishStory = async (storyNode) => {
    const url = `https://891y83rxbd.execute-api.us-east-1.amazonaws.com/prod/story?location=${storyNode.location}`;
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(storyNode)
    };
    const res = await fetch(url, requestOptions)
    return res.json();
};
