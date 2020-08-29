import React, { useState } from "react";
import { notification } from "antd";
import styled from "styled-components";
import StoryExplorerHeader from "./StoryExplorerHeader";
import StoryExplorerTextView from "./StoryExplorerTextView";
import GiftAStoryButton from "./GiftAStoryButton";
import { LinkButton, LinkLikeButton } from "./LinkButton";
import StoryFrame from "./StoryFrame";
import { API_URL } from "../utils/urls";

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const ButtonsContainer = styled.div`
    display: flex;
    margin-top: 10px;

    #btn-report {
        margin-left: 10px;
        margin-right: 10px;
        width: 120px;
    }

    #input-edit-password {
        margin-left: 10px;
        padding: 0 10px;
    }

    a {
        min-width: 120px;
    }

    a:first-child {
        margin-right: 10px;
    }
`;

const StoryView = ({
    rootNode,
    storyNode,
    onTakeAction,
    onBack,
    editPassword,
    setEditPassword,
    onEditPasswordSuccess,
    onEditPasswordError,
    onGiftingSuccess,
    onGiftingError,
    loading,
}) => {
    const [reported, setReported] = useState(false);

    if (loading || !storyNode) {
        return (
            <StyledContainer id="view-story">
                <StoryFrame>Loading...</StoryFrame>
            </StyledContainer>
        );
    }

    const { selectionText, storyText, choices } = storyNode;
    const { location } = rootNode;

    const isCreatePage = selectionText === "Open Playa";
    const isRootNode =
        storyNode.name === "root" || selectionText === "Open Playa";
    const editButtonTitle = isCreatePage ? "Create" : "Edit";
    const editPasswordInputType = isCreatePage ? "hidden" : "text";

    const checkPassphrase = async (successCallback, errorCallback) => {
        if (!editPassword || !editPassword.trim()) {
            notification.error({
                message: "Please enter a passphrase to edit this story",
            });
            return;
        }

        const response = await fetch(
            `${API_URL}/story/check_passphrase/${location}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    passphrase: editPassword,
                }),
            }
        );
        const result = await response.json();
        const isValid = result && typeof result === "boolean";

        if (isValid && successCallback) {
            successCallback();
        } else if (!isValid && errorCallback) {
            errorCallback();
        } else {
            notification.error(
                "Something went wrong. Please shoot an email to charliegsummers@gmail.com"
            );
        }
    };

    return (
        <StyledContainer id="view-story">
            <StoryFrame>
                <StoryExplorerHeader
                    title={selectionText}
                    location={location}
                    editButtonTitle={editButtonTitle}
                    isRootNode={isRootNode}
                    onBack={onBack}
                />
                <StoryExplorerTextView
                    storyNode={storyNode}
                    storyText={storyText}
                    onTakeAction={onTakeAction}
                    choices={choices}
                />
                <GiftAStoryButton
                    id="btn-gift-a-story"
                    isCreatePage={isCreatePage}
                    onClick={async () => {
                        checkPassphrase(onGiftingSuccess, onGiftingError);
                    }}
                >
                    Gift a Story :)
                </GiftAStoryButton>
            </StoryFrame>

            <ButtonsContainer>
                <LinkLikeButton
                    id="btn-report"
                    onClick={async () => {
                        setReported(true);
                        const response = await fetch(
                            `${API_URL}/story/${location}/report`,
                            {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ storyNode }),
                            }
                        );

                        if (!response.ok) {
                            setReported(false);
                        }

                        notification.info({
                            message: "Successfully reported page",
                        });
                    }}
                    disabled={reported}
                >
                    Report
                </LinkLikeButton>
                <LinkButton
                    id="btn-edit"
                    onClick={async () => {
                        checkPassphrase(
                            onEditPasswordSuccess,
                            onEditPasswordError
                        );
                    }}
                >
                    {editButtonTitle}
                </LinkButton>
                <input
                    id="input-edit-password"
                    value={editPassword}
                    onChange={(e) => setEditPassword(e.target.value)}
                    placeholder="Passphrase for Edit"
                    type={editPasswordInputType}
                />
            </ButtonsContainer>
        </StyledContainer>
    );
};

export default StoryView;
