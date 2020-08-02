/**
 * Updates a value in the node graph given a nodeId
 * @param {StoryNode} rootNode
 * @param {string} nodeId
 * @param {Map} valueMap
 * @param {int} level
 * @param {int} siblingIndex
 * @returns The updated node, otherwise null
 */
const updateNodeValue = (rootNode, nodeId, valueMap) => {
    if (rootNode.id === nodeId) {
        return {
            ...rootNode,
            ...valueMap,
        };
    }

    if (rootNode.choices && rootNode.choices.length > 0) {
        for (let i = 0; i < rootNode.choices.length; i += 1) {
            const childNode = updateNodeValue(
                rootNode.choices[i],
                nodeId,
                valueMap,
            );

            if (childNode) {
                // Not sure how else to update a choice efficiently
                // eslint-disable-next-line no-param-reassign
                rootNode.choices[i] = { ...childNode };

                return { ...rootNode };
            }
        }
    }

    return null;
};

export default updateNodeValue;
