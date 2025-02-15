/**
 * Removes a choice from a specified node
 * @param {StoryNode} rootNode
 * @param {string} nodeId
 * @param {int} indexToRemove
 * @returns The updated node, otherwise null
 */
const removeChoiceFromNode = (rootNode, nodeId, choiceId) => {
    if (rootNode.id === nodeId) {
        return {
            ...rootNode,
            choices: rootNode.choices.filter(
                (choice) => choice.id !== choiceId
            ),
        };
    }

    if (rootNode.choices && rootNode.choices.length > 0) {
        for (let i = 0; i < rootNode.choices.length; i += 1) {
            const childNode = removeChoiceFromNode(
                rootNode.choices[i],
                nodeId,
                choiceId
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

export default removeChoiceFromNode;
