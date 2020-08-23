const getNodePath = (startNode, endNode, nodePath = []) => {
    if (!startNode || !endNode) {
        return null;
    }

    if (startNode.id === endNode.id) {
        return [...nodePath, endNode];
    }

    if (startNode.choices && startNode.choices.length > 0) {
        for (let i = 0; i < startNode.choices.length; i += 1) {
            const path = getNodePath(startNode.choices[i], endNode, [
                ...nodePath,
                startNode,
            ]);

            if (path) {
                return path;
            }
        }
    }

    return null;
};

export default getNodePath;
