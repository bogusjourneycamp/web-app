import React, { useState } from "react";
import styled from "styled-components";
import StoryExplorerHeader from "./StoryExplorerHeader";
import StoryExplorerTextView from "./StoryExplorerTextView";
import LinkButton from "./LinkButton";
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
        margin-left: 20px;
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
    storyNode,
    onTakeAction,
    onBack,
    onClickEditPasswordSuccess,
    onClickEditPasswordFailure,
    loading,
}) => {
    const [editPassword, setEditPassword] = useState("");

    if (loading || !storyNode) {
        return (
            <StyledContainer id="view-story">
                <StoryFrame>Loading...</StoryFrame>
            </StyledContainer>
        );
    }

    const { selectionText, location, storyText, choices } = storyNode;

    let isCreatePage = selectionText === "Open Playa";

    let editButtonTitle = "Edit";
    let editPasswordInputType = "text";

    if (isCreatePage) {
        editButtonTitle = "Create";
        editPasswordInputType = "hidden";
    }

    let isRootNode = 0;	

    if (storyNode.name === "root" || selectionText === "Open Playa") {
        isRootNode = 1;
    }

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
            </StoryFrame>

            <ButtonsContainer>
                {/* TODO: Link to report */}
                <LinkButton id="btn-report">Report</LinkButton>
                <LinkButton
                    id="btn-edit"
                    onClick={async () => {
                        const response = await fetch(
                            `${API_URL}/story/check_passphrase/${location}`,
                            {
                                method: "POST",
                                headers: {"Content-Type": "application/json"},
                                body: JSON.stringify({"passphrase": editPassword})
                            }
                        );

                        let validEditPassphrase = await response.json()

                        if (validEditPassphrase && onClickEditPasswordSuccess) {
                            onClickEditPasswordSuccess();
                        } else {
                            onClickEditPasswordFailure();
                        }
                    }}
                >
                    {editButtonTitle}
                </LinkButton>
                <input
                    id="input-edit-password"
                    value={editPassword}
                    onChange={(e) => setEditPassword(e.target.value)}
                    placeholder="Edit passphrase"
                    type={editPasswordInputType}
                />
            </ButtonsContainer>
        </StyledContainer>
    );
};

export default StoryView;
