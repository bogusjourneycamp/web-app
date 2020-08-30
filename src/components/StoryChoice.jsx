import React from "react";
import styled from "styled-components";
import { CloseOutlined } from "@ant-design/icons";
import { NODE_TEXT_LENGTH } from "../utils/nodeConfig";
import AutoResizingTextArea from "./AutoResizingTextArea";
import ColorPalette from "../utils/colors";

const ChoiceText = styled(AutoResizingTextArea)`
    border-radius: 4px;
    font-weight: 300;
    border: 1px solid #d6d6d6;
    background: white;
    padding: 8px;
    font-family: Helvetica, sans-serif;
    resize: none;
    width: 100%;

    :focus {
        outline: none;
    }
`;

const ChoiceName = styled.div`
    font-size: 12px;
    margin: 12px 0 6px;
    display: flex;
    align-items: center;

    input {
        font-size: 12px;
        font-family: Helvetica, sans-serif;
        margin-left: 6px;
        width: 80px;
        padding: 2px 6px;

        :focus {
            outline: none;
        }
    }
`;

const RemoveButton = styled.button`
    align-items: center;
    background-color: transparent;
    border: none;
    border-radius: 50px;
    color: #d9534f !important;
    cursor: pointer;
    display: flex;
    font-family: Helvetica, sans-serif;
    font-size: 16px;
    font-weight: 300;
    justify-content: center;
    line-height: normal;
    margin-left: 8px;
    padding: 4px 6px;
    transition: color 200ms, border-color 200ms;
    vertical-align: inherit;

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

const Container = styled.div`
    background-color: rgba(255, 255, 255, 0.85);
    padding: 2px 10px 10px;
    border: 3px solid ${ColorPalette.CoffeeBean};
    margin-bottom: 10px;
`;

export const StoryChoice = ({
    choice,
    onClickRemove,
    onChangeChoiceTitle,
    onChangeSelectionText,
}) => {
    return (
        <Container className="story-choice">
            <ChoiceName>
                Reference{" "}
                <input
                    value={choice.name}
                    maxLength={NODE_TEXT_LENGTH}
                    onChange={(e) => {
                        onChangeChoiceTitle(e.target.value);
                    }}
                />
                <RemoveButton type="button" onClick={onClickRemove}>
                    <CloseOutlined />
                </RemoveButton>
            </ChoiceName>
            <ChoiceText
                id={`txt-choice-text-${choice.id}`}
                value={choice.selectionText}
                onChangeText={onChangeSelectionText}
                name="text"
                placeholder="Go for a walk"
            />
        </Container>
    );
};
