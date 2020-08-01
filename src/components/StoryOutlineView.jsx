import styled from 'styled-components';
import React from 'react';

const StyledContainer = styled.div`
    .node-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .node {
        border: 1px solid #696969;
        border-radius: 50%;
        display: inline-block;
        font-size: 12px;
        height: 48px;
        margin: 0 5px;
        text-align: center;
        width: 48px;
        transition: background-color 200ms;

        cursor: pointer;

        :focus {
            outline: none;
        }

        :hover {
            background-color: #d3d3d3;
        }

        :active {
            background-color: #ababab;
        }

        &.selected {
            border-width: 3px;
            background-color: white;
        }

        &.selected-child {
            border-width: 3px;
        }
    }

    .children-container {
        display: flex;
        margin-top: 10px;
    }
`;

const getStoryNodeDisplay = (
    rootNode,
    onClickNode,
    currentNodeId,
    parentNodeId,
    level = 0,
) => {
    const hasChildren = rootNode.choices && rootNode.choices.length > 0;

    return (
        <div
            className={`node-container container-lv-${level}`}
            key={rootNode.id}
        >
            <button
                type="button"
                className={`node node-lv-${level} ${
                    rootNode.id === currentNodeId ? 'selected' : ''
                } ${parentNodeId === currentNodeId ? 'selected-child' : ''}`}
                onClick={() => onClickNode(rootNode.id)}
            >
                {rootNode.name}
            </button>
            {hasChildren && (
                <div className={`children-container children-lv-${level}`}>
                    {rootNode.choices.map((node, index) => {
                        return getStoryNodeDisplay(
                            node,
                            onClickNode,
                            currentNodeId,
                            rootNode.id,
                            level + 1,
                            index,
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export const StoryOutlineView = ({ storyNode, onClickNode, currentNodeId }) => {
    return (
        <StyledContainer id="view-story-outline">
            {getStoryNodeDisplay(storyNode, onClickNode, currentNodeId)}
        </StyledContainer>
    );
};
