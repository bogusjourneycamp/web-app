import React, { useState } from "react";
import { notification } from "antd";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import StoryExplorerHeader from "./StoryExplorerHeader";
import StoryExplorerTextView from "./StoryExplorerTextView";
import LinkButton from "./LinkButton";
import StoryFrame from "./StoryFrame";
import { API_URL } from "../utils/urls";
import ColorPalette from "../utils/colors";
import { ButtonLink } from "./ButtonLink";

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

    #link-gift-a-story {
        margin-left: 20px;
    }
`;

const ButtonsContainer = styled.div`
    display: flex;
    margin-top: 10px;

    #btn-report {
        margin-left: 10px;
        margin-right: 10px;
    }

    #input-edit-password {
        margin-left: 10px;
        padding: 0 10px;
    }

    a,
    button {
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
    onEditPasswordSuccess,
    onEditPasswordError,
    loading,
}) => {
    const [editPassword, setEditPassword] = useState("");
    const [reported, setReported] = useState(false);
    const [reporting, setReporting] = useState(false);
    const location = useLocation();
    const searchParam = new URLSearchParams(location.search ? location.search.slice(1) : "");

    if (loading || !storyNode) {
        return (
            <StyledContainer id="view-story">
                <StoryFrame>Loading...</StoryFrame>
            </StyledContainer>
        );
    }

    const { selectionText, storyText, choices } = storyNode;
    const { location: storyLocation = searchParam.get("location") } = rootNode;

    const searchParams = location.search || `?location=${storyLocation}`;
    const isCreatePage = selectionText === "Open Playa";
    const isRootNode = storyNode.name === "root" || selectionText === "Open Playa";
    let reportButtonText = reported ? "Reported" : "Report";

    if (reporting) {
        reportButtonText = "Reporting";
    }

    const checkPassphrase = async (successCallback, errorCallback) => {
        if (!editPassword || !editPassword.trim()) {
            notification.error({
                message: "Please enter a passphrase to edit this story",
            });
            return;
        }

        const response = await fetch(`${API_URL}/story/check_passphrase/${storyLocation}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                passphrase: editPassword,
            }),
        });
        const result = await response.json();
        const isValid = result && typeof result === "boolean";

        if (isValid && successCallback) {
            successCallback(editPassword);
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
                    location={storyLocation}
                    isRootNode={isRootNode}
                    onBack={onBack}
                />
                <StoryExplorerTextView
                    storyNode={storyNode}
                    storyText={storyText}
                    onTakeAction={onTakeAction}
                    choices={choices}
                />
                {isCreatePage && (
                    <LinkButton
                        id="link-gift-a-story"
                        backgroundcolor={ColorPalette.NodeGreen}
                        to={{
                            pathname: "/create-story",
                            search: searchParams,
                            state: { passphrase: editPassword, passphraseSet: true },
                        }}
                    >
                        Gift a Story :)
                    </LinkButton>
                )}
            </StoryFrame>

            <ButtonsContainer>
                <ButtonLink
                    id="btn-report"
                    onClick={async () => {
                        setReporting(true);

                        const response = await fetch(`${API_URL}/story/${storyLocation}/report`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ storyNode }),
                        });

                        setReported(response.ok);
                        setReporting(false);

                        if (response.ok) {
                            notification.info({
                                message: "Successfully reported page",
                            });
                        } else {
                            notification.info({
                                message:
                                    "Failed to report page. Please contact charliegsummers@gmail.com",
                            });
                        }
                    }}
                    disabled={reported}
                    loading={reporting}
                >
                    {reportButtonText}
                </ButtonLink>

                {isCreatePage ? (
                    <LinkButton
                        id="link-create"
                        to={{
                            pathname: "/create-story",
                            search: searchParams,
                            state: { passphrase: editPassword, passphraseSet: true },
                        }}
                    >
                        Create
                    </LinkButton>
                ) : (
                    <>
                        <ButtonLink
                            id="btn-edit"
                            onClick={async () => {
                                checkPassphrase(onEditPasswordSuccess, onEditPasswordError);
                            }}
                        >
                            Edit
                        </ButtonLink>
                        <input
                            id="input-edit-password"
                            data-testid="input-edit-password"
                            value={editPassword}
                            onChange={(e) => setEditPassword(e.target.value)}
                            placeholder="Passphrase for Edit"
                            type="text"
                        />
                    </>
                )}
            </ButtonsContainer>
        </StyledContainer>
    );
};

export default StoryView;
