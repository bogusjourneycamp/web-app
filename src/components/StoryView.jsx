import React from "react";
import styled from "styled-components";
import StoryExplorerHeader from "./StoryExplorerHeader";
import StoryExplorerTextView from "./StoryExplorerTextView";
import storyNodeToGraphData from "../utils/storyNodeToGraphData"

const StyledContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;


const StoryView = ({ storyNode, onTakeAction }) => {
    const { selectionText, location, storyText, choices } = storyNode;
    let editButtonTitle = "Edit";

    if (selectionText === "Open Playa") {
        editButtonTitle = "Create";
	}
	if storyNode
	const thing = storyNodeToGraphData(storyNode, storyNode.id)
	console.log("i ",thing )
    return (
        <StyledContainer>
            <StoryExplorerHeader title={selectionText} location={location} editButtonTitle={editButtonTitle} />
            <StoryExplorerTextView
                storyText={storyText}
                onTakeAction={onTakeAction}
                choices={choices}
            />
        </StyledContainer>
    );
};

export default StoryView;
