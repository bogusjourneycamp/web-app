import React, { useEffect } from "react";
import styled from "styled-components";
import { StoryChoice } from "./StoryChoice";
import { NODE_TEXT_LENGTH } from "../utils/nodeConfig";

const StyledContainer = styled.div`
    padding: 32px 24px;

    #txt-selection-text,
    #txt-story-text {
        :focus {
            outline: none !important;
        }
    }

    #txt-selection-text,
    #txt-story-text {
        display: block;
        border: none;

        ::placeholder {
            color: #ccc;
        }
    }

    #txt-selection-text {
        font-family: Helvetica, sans-serif;
        font-size: 54px;
        font-weight: 300;
        margin-bottom: 24px;
    }

    #txt-story-text {
        box-sizing: border-box;
        font-family: Helvetica, sans-serif;
        font-size: 18px;
        font-weight: 300;
        line-height: 30px;
        margin-bottom: 12px;
        resize: none;
        width: 100%;
    }

    .story-choices {
        margin-top: 24px;
    }
`;

const StyledButton = styled.button`
    background-color: transparent;
    border: 1px solid #5cb85c;
    border-radius: 4px;
    color: #5cb85c;
    cursor: pointer;
    font-family: Helvetica, sans-serif;
    font-weight: 300;
    margin-top: 12px;
    padding: 6px 10px;
    transition: color 200ms, border-color 200ms;

    :hover {
        color: #458a45;
        border-color: #458a45;
    }

    :active {
        color: #85ca85;
        border-color: #85ca85;
    }

    :focus {
        outline: none !important;
    }
`;

export const CreateStoryView = ({
    onClickAddChoice,
    onClickRemoveChoice,
    onChangeStoryText,
    onChangeStoryTitle,
    onChangeSelectionText,
    onChangeChoiceTitle,
    storyNode,
    onClickPublish,
}) => {
    useEffect(() => {
        const textInput = document.getElementById("txt-story-text");

        textInput.setAttribute("style", `height: ${textInput.scrollHeight}px;`);
    }, []);

    return (
        <StyledContainer id="view-create-story">
            <input
                id="txt-selection-text"
                maxLength={NODE_TEXT_LENGTH}
                name="selectionText"
                onChange={(e) => onChangeStoryTitle(e.target.value)}
                placeholder="Title"
                value={storyNode.selectionText}
            />
            <textarea
                id="txt-story-text"
                value={storyNode.storyText}
                rows={1}
                onChange={(e) => {
                    onChangeStoryText(e.target.value);

                    // Resize height of text
                    e.target.setAttribute("style", "height: auto;");
                    e.target.setAttribute(
                        "style",
                        `height: ${e.target.scrollHeight}px;`
                    );
                }}
                name="text"
                placeholder="Once upon a time, I was looking for blue waffles..."
            />

            <div className="story-choices">
                {storyNode.choices.map((choice, index) => (
                    <StoryChoice
                        key={`choice-${index}`}
                        choice={choice}
                        onClickRemove={() => onClickRemoveChoice(choice)}
                        onChangeSelectionText={(text) => {
                            onChangeSelectionText(choice.id, text);
                        }}
                        onChangeChoiceTitle={(title) => {
                            onChangeChoiceTitle(choice.id, title);
                        }}
                    />
                ))}
            </div>

            <StyledButton
                id="btn-add-choice"
                type="button"
                onClick={onClickAddChoice}
            >
                + Add a choice
            </StyledButton>
            <StyledButton
                id="btn-publish"
                type="button"
                onClick={onClickPublish}
            >
                PUBLISH
            </StyledButton>
        </StyledContainer>
    );
};
