import React from "react";
import styled from "styled-components";
import StoryButton from "./StoryButton";

const StoryTextSection = styled.div`
    margin: 10px 20px 20px 20px;
`;

const StoryText = styled.p`
    display: flex;
    font-weight: 100;
    font-size: 16px;
    white-space: pre-wrap;
`;

const ChoicesContainer = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
`;

const StoryExplorerTextView = ({storyNode, storyText, choices, onTakeAction }) => {
    return (
        <StoryTextSection>
            <StoryText>{storyText}</StoryText>
            <ChoicesContainer>
                {choices.map((item, index) => (
                    <StoryButton
                        key={`action-${index}`}
                        onClick={() => onTakeAction(storyNode.id, item.id)}
                    >
                        {item.selectionText}
                    </StoryButton>
                ))}
            </ChoicesContainer>
        </StoryTextSection>
    );
};

export default StoryExplorerTextView;
