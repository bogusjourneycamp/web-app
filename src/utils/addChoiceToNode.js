import { v4 } from "uuid";
import fiveLetterWords from "./fiveLetterWords";

/**
 * Adds a choice to a specified node
 * @param {StoryNode} rootNode
 * @param {string} nodeId
 * @param {int} level
 * @returns The updated node, otherwise null
 */
const addChoiceToNode = (rootNode, nodeId, level = 0) => {
    const choiceName =
        fiveLetterWords[Math.floor(Math.random() * fiveLetterWords.length)];

    if (rootNode.id === nodeId) {
        const choiceNodeAdded = {
            id: v4(),
            name: choiceName,
            storyText: "",
            selectionText: "",
            choices: [],
        };

        return {
            storyNode: {
                ...rootNode,
                choices: [...rootNode.choices, choiceNodeAdded],
            },
            choiceNodeAdded,
        };
    }

    if (rootNode.choices && rootNode.choices.length > 0) {
        for (let i = 0; i < rootNode.choices.length; i += 1) {
            const result = addChoiceToNode(
                rootNode.choices[i],
                nodeId,
                level + 1,
                i
            );

            if (result) {
                // Not sure how else to update a choice efficiently
                // eslint-disable-next-line no-param-reassign
                rootNode.choices[i] = { ...result.storyNode };

                return { ...result, storyNode: { ...rootNode } };
            }
        }
    }

    return null;
};

export default addChoiceToNode;
