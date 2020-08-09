import React from "react";
import styled from "styled-components";
import StoryExplorerHeader from "./StoryExplorerHeader";
import StoryExplorerTextView from "./StoryExplorerTextView";

const StyledContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const StoryView = ({
    selectionText,
    location,
    storyText,
    onTakeAction,
    actions,
}) => {
    return (
        <StyledContainer>
            <StoryExplorerHeader title={selectionText} location={location} />
            <StoryExplorerTextView
                storyText={storyText}
                onTakeAction={onTakeAction}
                actions={actions}
            />
        </StyledContainer>
    );
};

export default StoryView;
