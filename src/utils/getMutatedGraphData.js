// It's actually semi mutated. But enough to make sure the ForceGraph doesn't trigger the opening animation.
const getMutatedGraphData = (originalGraphData, newGraphData) => {
    const newNodes = newGraphData.nodes
        .map((newNode) => {
            const originalNode = originalGraphData.nodes.find(
                (node) => node.id === newNode.id
            );

            if (originalNode) {
                originalNode.metaData = {
                    ...originalNode.metaData,
                    ...newNode.metaData,
                };
            }
            return originalNode;
        })
        .filter((value) => value);

    const newLinks = newGraphData.links
        .map((newLink) =>
            originalGraphData.links.find(
                (link) =>
                    link.source.id === newLink.source &&
                    link.target.id === newLink.target
            )
        )
        .filter((value) => value);

    return {
        nodes: newNodes,
        links: newLinks,
    };
};

export default getMutatedGraphData;
