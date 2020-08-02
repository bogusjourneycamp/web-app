import { v4 } from 'uuid';

/**
 * Adds a choice to a specified node
 * @param {StoryNode} rootNode
 * @param {string} nodeId
 * @param {int} level
 * @returns The updated node, otherwise null
 */
const addChoiceToNode = (rootNode, nodeId, level = 0) => {
  if (rootNode.id === nodeId) {
    return {
      ...rootNode,
      choices: [
        ...rootNode.choices,
        {
          id: v4(), name: '', text: '', choices: [],
        },
      ],
    };
  }

  if (rootNode.choices && rootNode.choices.length > 0) {
    for (let i = 0; i < rootNode.choices.length; i += 1) {
      const childNode = addChoiceToNode(
        rootNode.choices[i],
        nodeId,
        level + 1,
        i,
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

export default addChoiceToNode;
