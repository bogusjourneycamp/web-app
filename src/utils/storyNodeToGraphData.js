import getGraphDataNodeFromStoryNode from "./getGraphDataNodeFromStoryNode";

const storyNodeToGraphData = (
    storyNode,
    selectedNodeId,
    parentNodeId,
    nodes = [],
    links = [],
    level = 1
) => {
    nodes.push(getGraphDataNodeFromStoryNode(storyNode, parentNodeId));

    if (storyNode.choices && storyNode.choices.length > 0) {
        storyNode.choices.forEach((choice) => {
            links.push({
                source: storyNode.id,
                target: choice.id,
            });
            storyNodeToGraphData(
                choice,
                selectedNodeId,
                storyNode.id,
                nodes,
                links,
                level + 1
            );
        });
    }
    return { nodes, links };
};

export default storyNodeToGraphData;
