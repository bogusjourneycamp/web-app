import React from "react";
import styled from "styled-components";
import { NODE_TEXT_LENGTH } from "../utils/nodeConfig";

const StyledChoiceText = styled.p`
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    font-weight: 300;
    margin: 0 0 20px 0;
    padding: 12px;
`;

const StyledChoiceName = styled.div`
    font-size: 12px;
    margin: 12px 0;
`;

const StyledRemoveButton = styled.button`
    background-color: transparent;
    border: 1px solid #d9534f;
    border-radius: 4px;
    color: #d9534f;
    cursor: pointer;
    font-family: Helvetica, sans-serif;
    font-size: 10px;
    font-weight: 300;
    margin-left: 8px;
    padding: 4px 6px;
    transition: color 200ms, border-color 200ms;

    :hover {
        color: #a33e3b;
        border-color: #a33e3b;
    }

    :active {
        color: #e37e7b;
        border-color: #e37e7b;
    }

    :focus {
        outline: none !important;
    }
`;

export const StoryChoice = ({
    choice,
    onClickRemove,
    onChangeChoiceTitle,
    onChangeSelectionText,
}) => {
    return (
        <div className="story-choice">
            <StyledChoiceName>
                Choice{" "}
                <input
                    value={choice.name}
                    maxLength={NODE_TEXT_LENGTH}
                    onChange={(e) => {
                        onChangeChoiceTitle(e.target.value);
                    }}
                />
                <StyledRemoveButton type="button" onClick={onClickRemove}>
                    X
                </StyledRemoveButton>
            </StyledChoiceName>
            <StyledChoiceText>
                <textarea
                    value={choice.selectionText}
                    onChange={(e) => {
                        onChangeSelectionText(e.target.value);
                    }}
                />
            </StyledChoiceText>
        </div>
    );
};
