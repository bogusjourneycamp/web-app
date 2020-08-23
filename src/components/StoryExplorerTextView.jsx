import React from "react";
import styled from "styled-components";
import Button from "./Button";
import ColorPalette from "../utils/colors";

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

const ChoiceButton = styled(Button)`
    border: 3px solid ${ColorPalette.CoffeeBean};
    border-radius: 100px;
    background-color: rgba(255, 255, 255, 0.5);
    font-size: 18px;
    font-weight: 100;
    line-height: 30px;
    margin: 10px 0;
    padding: 10px;
    text-align: center;
    transition: background-color 200ms;

    :hover {
        background-color: rgba(255, 255, 255, 1);
    }

    :focus {
        outline: none;
    }
`;

const StoryExplorerTextView = ({ storyText, choices, onTakeAction }) => {
    return (
        <StoryTextSection>
            <StoryText>{storyText}</StoryText>
            <ChoicesContainer>
                {choices.map((item, index) => (
                    <ChoiceButton
                        key={`action-${index}`}
                        onClick={() => onTakeAction(item.id)}
                    >
                        {item.selectionText}
                    </ChoiceButton>
                ))}
            </ChoicesContainer>
        </StoryTextSection>
    );
};

export default StoryExplorerTextView;
