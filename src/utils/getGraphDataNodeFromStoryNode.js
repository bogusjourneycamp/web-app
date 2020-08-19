const getGraphDataNodeFromStoryNode = (storyNode, parentNodeId) => ({
    id: storyNode.id,
    name: storyNode.name,
    parentNodeId,
    metaData: {
        hasStoryText: Boolean(storyNode.storyText),
    },
});

export default getGraphDataNodeFromStoryNode;
