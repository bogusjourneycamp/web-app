const getGraphDataNodeFromStoryNode = (storyNode, parentNodeId) => ({
    id: storyNode.id,
    name: storyNode.name,
    parentNodeId,
});

export default getGraphDataNodeFromStoryNode;
