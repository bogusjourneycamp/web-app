const storyNodeToGraphData = (
    storyNode,
    selectedNodeId,
    nodes = [],
    links = [],
    level = 1
) => {
    nodes.push({
        id: storyNode.id,
        name: storyNode.name,
        group: level,
        isSelected: selectedNodeId === storyNode.id,
    });

    if (storyNode.choices && storyNode.choices.length > 0) {
        storyNode.choices.forEach((choice) => {
            links.push({
                source: storyNode.id,
                target: choice.id,
            });
            storyNodeToGraphData(
                choice,
                selectedNodeId,
                nodes,
                links,
                level + 1
            );
        });
    }

    return { nodes, links };
};

export default storyNodeToGraphData;
