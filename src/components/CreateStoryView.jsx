import React, { useEffect } from 'react';
import styled from 'styled-components';
import { StoryChoice } from './StoryChoice';

const StyledContainer = styled.div`
    padding: 32px 24px;

    #txt-title,
    #txt-text {
        :focus {
            outline: none !important;
        }
    }

    #txt-title,
    #txt-text {
        display: block;
        border: none;

        ::placeholder {
            color: #ccc;
        }
    }

    #txt-title {
        font-family: Helvetica, sans-serif;
        font-size: 54px;
        font-weight: 300;
        margin-bottom: 24px;
    }

    #txt-text {
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
    onChangeChoiceText,
    onChangeChoiceTitle,
    storyNode,
}) => {
    useEffect(() => {
        const textInput = document.getElementById('txt-text');

        textInput.setAttribute('style', `height: ${textInput.scrollHeight}px;`);
    }, []);

    return (
        <StyledContainer id="view-create-story">
            <input
                id="txt-title"
                name="title"
                placeholder="Title"
                value={storyNode.name}
                onChange={(e) => onChangeStoryTitle(e.target.value)}
            />
            <textarea
                id="txt-text"
                value={storyNode.text}
                rows={1}
                onChange={(e) => {
                    onChangeStoryText(e.target.value);

                    // Resize height of text
                    e.target.setAttribute('style', 'height: auto;');
                    e.target.setAttribute(
                        'style',
                        `height: ${e.target.scrollHeight}px;`,
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
                        onClickRemove={() => onClickRemoveChoice(index)}
                        onChangeChoiceText={(text) => {
                            onChangeChoiceText(choice.id, text);
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
        </StyledContainer>
    );
};
