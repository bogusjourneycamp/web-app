import React from "react";
import styled from "styled-components";
import StoryExplorerHeader from "./StoryExplorerHeader";
import StoryExplorerTextView from "./StoryExplorerTextView";
import LinkButton from "./LinkButton";
import StoryFrame from "./StoryFrame";

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

    a {
        min-width: 120px;
    }

    a:first-child {
        margin-right: 10px;
    }
`;

const StoryView = ({ storyNode, onTakeAction, loading }) => {
    if (loading || !storyNode) {
        return (
            <StyledContainer id="view-story">
                <StoryFrame>Loading...</StoryFrame>
            </StyledContainer>
        );
    }

    const { selectionText, location, storyText, choices } = storyNode;
    let editButtonTitle = "Edit";

    if (selectionText === "Open Playa") {
        editButtonTitle = "Create";
    }

    return (
        <StyledContainer id="view-story">
            <StoryFrame>
                <StoryExplorerHeader
                    title={selectionText}
                    location={location}
                    editButtonTitle={editButtonTitle}
                />
                <StoryExplorerTextView
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
                    to={{
                        pathname: "/create-story",
                        search: location
                            ? new URLSearchParams({ location }).toString()
                            : undefined,
                    }}
                >
                    {editButtonTitle}
                </LinkButton>
            </ButtonsContainer>
        </StyledContainer>
    );
};

export default StoryView;
