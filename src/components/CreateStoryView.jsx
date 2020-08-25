import React, { useEffect } from "react";
import styled from "styled-components";
import { StoryChoice } from "./StoryChoice";
import AutoResizingTextArea from "./AutoResizingTextArea";
import ColorPalette from "../utils/colors";

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
        border: 3px solid ${ColorPalette.CoffeeBean};

        ::placeholder {
            color: #ccc;
        }
    }

    #txt-selection-text {
        font-family: Helvetica, sans-serif;
        font-size: 54px;
        font-weight: 300;
        margin-bottom: 24px;
        width: 100%;
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

    #btn-add-choice {
        margin-right: 10px;
    }

    .story-choices {
        margin-top: 24px;
    }
`;

const StyledButton = styled.button`
    border: 3px solid #5cb85c;
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
                name="selectionText"
                onChange={(e) => {
                    onChangeSelectionText(storyNode.id, e.target.value);
                }}
                placeholder="Title"
                value={storyNode.selectionText}
            />
            <AutoResizingTextArea
                id="txt-story-text"
                value={storyNode.storyText}
                onChangeText={onChangeStoryText}
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
                Publish
            </StyledButton>
        </StyledContainer>
    );
};
