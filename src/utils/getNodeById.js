const getNodeById = (rootNode, nodeId) => {
    if (rootNode.id === nodeId || !rootNode) {
        return rootNode;
    }

    if (rootNode.choices && rootNode.choices.length > 0) {
        for (let i = 0; i < rootNode.choices.length; i += 1) {
            const childNode = getNodeById(rootNode.choices[i], nodeId);

            if (childNode) {
                return childNode;
            }
        }
    }

    return null;
};

export default getNodeById;
