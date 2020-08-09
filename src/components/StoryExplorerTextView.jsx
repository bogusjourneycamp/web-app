import React from "react";
import styled from "styled-components";
import Button from "./Button";

const ActionButton = styled(Button)`
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    background: #ffffff;
    margin: 10px;
    padding: 10px;
    font-size: 18px;
    line-height: 30px;
    font-weight: 100;
    text-align: left;
`;

const ActionsContainer = styled.div`
    background: #ffffff;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    margin: 10px;
`;

const StoryText = styled.p`
    display: flex;
    font-weight: 100;
    font-size: 16px;
    letter-spacing: 1px;
    line-height: 30px;
    margin: 20px;
    white-space: pre-wrap;
`;

const StoryTextSection = styled.div``;

const StoryExplorerTextView = ({ storyText, actions, onTakeAction }) => {
    return (
        <StoryTextSection>
            <StoryText>{storyText}</StoryText>
            <ActionsContainer>
                {actions.map((item, index) => (
                    <ActionButton
                        key={`action-${index}`}
                        onClick={() => onTakeAction(item.id)}
                    >
                        {item.selectionText}
                    </ActionButton>
                ))}
            </ActionsContainer>
        </StoryTextSection>
    );
};

export default StoryExplorerTextView;
