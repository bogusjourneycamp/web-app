import React from "react";
import styled from "styled-components";
import { StoryChoice } from "./StoryChoice";
import AutoResizingTextArea from "./AutoResizingTextArea";
import ColorPalette from "../utils/colors";
import { ButtonLink } from "./ButtonLink";

const StyledContainer = styled.div`
    padding: 32px 24px;

    #btn-add-choice {
        margin-right: 10px;
    }

    .story-choices {
        margin-top: 12px;
    }
`;

const SelectionText = styled.input`
    background-color: rgba(255, 255, 255, 0.85);
    border: none;
    border: 3px solid ${ColorPalette.CoffeeBean};
    display: block;
    font-family: Helvetica, sans-serif;
    font-size: 32px;
    font-weight: 300;
    margin-bottom: 24px;
    padding: 10px;
    width: 100%;

    ::placeholder {
        color: #ccc;
    }

    :focus {
        outline: none !important;
    }
`;

const StoryText = styled(AutoResizingTextArea)`
    background-color: rgba(255, 255, 255, 0.85);
    border: none;
    border: 3px solid ${ColorPalette.CoffeeBean};
    box-sizing: border-box;
    display: block;
    font-family: Helvetica, sans-serif;
    font-size: 18px;
    font-weight: 300;
    line-height: 30px;
    margin-bottom: 12px;
    padding: 10px;
    resize: none;
    width: 100%;

    :focus {
        outline: none !important;
    }
    ::placeholder {
        color: #ccc;
    }
`;

const InstructionsContainer = styled.div`
    font-weight: bold;
    letter-spacing: 1px;
    margin: 20px 0;
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
    return (
        <StyledContainer id="view-create-story">
            <SelectionText
                id="txt-selection-text"
                name="selectionText"
                onChange={(e) => {
                    onChangeSelectionText(storyNode.id, e.target.value);
                }}
                placeholder="Title"
                value={storyNode.selectionText}
            />
            <StoryText
                id="txt-story-text"
                value={storyNode.storyText}
                onChangeText={onChangeStoryText}
                name="text"
                placeholder="Once upon a time, I was looking for blue waffles..."
            />

            <ButtonLink id="btn-add-choice" type="button" onClick={onClickAddChoice}>
                Add a choice
            </ButtonLink>
            <ButtonLink id="btn-publish" type="button" onClick={onClickPublish}>
                Publish
            </ButtonLink>

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

            <InstructionsContainer>
                The visualizer on the right is interactive! You can click on the circles to add the
                text to that choice. You only need to hit publish once you&apos;re ready to share
                your story with the world.
            </InstructionsContainer>
        </StyledContainer>
    );
};
