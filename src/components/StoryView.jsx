import React, { useState } from "react";
import styled from "styled-components";
import StoryExplorerHeader from "./StoryExplorerHeader";
import StoryExplorerTextView from "./StoryExplorerTextView";
import storyNodeToGraphData from "../utils/storyNodeToGraphData"
import getNodeById from "../utils/getNodeById"

const StyledContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;


const StoryView = ({ storyNode, onTakeAction, onBack }) => {
    let { selectionText, location, storyText, choices } = storyNode;
    let editButtonTitle = "Edit";	
	if (selectionText === "Open Playa") {
		editButtonTitle = "Create";
	}

	return (
        <StyledContainer>
            <StoryExplorerHeader title={selectionText} location={location} editButtonTitle={editButtonTitle} storyNode={storyNode} onBack={onBack}/>
            <StoryExplorerTextView
				storyNode={storyNode}
                storyText={storyText}
                onTakeAction={onTakeAction}
                choices={choices}
            />
        </StyledContainer>
    );
};

export default StoryView;
