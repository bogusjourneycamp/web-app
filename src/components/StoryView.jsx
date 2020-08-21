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


const StoryView = ({ storyNode, onTakeAction }) => {
    const { selectionText, location, storyText, choices } = storyNode;
    let editButtonTitle = "Edit";
	const [storyPath, setStoryPath] = useState(0);
	const [isStoryPathSet, setIsStoryPathSet] = useState(0);
	let previousNode = null;
	const [rootNode, setRootNode] = useState(0);

    if (selectionText === "Open Playa") {
		editButtonTitle = "Create";
		setStoryPath(0);
		setIsStoryPathSet(1);
	}
	if (storyNode.name === "root" && isStoryPathSet === 0) {
		setStoryPath(storyNodeToGraphData(storyNode, storyNode.id));
		setIsStoryPathSet(1);
		setRootNode(storyNode);
	}
	if (storyPath) {
		for (let i = 0; i < storyPath.nodes.length; i++) {
			if (storyPath.nodes[i].id == storyNode.id) {
				previousNode = getNodeById(rootNode, storyPath.nodes[i].parentNodeId);
			}
		}
	}
	console.log(previousNode);
	return (
        <StyledContainer>
            <StoryExplorerHeader title={selectionText} location={location} editButtonTitle={editButtonTitle} previousNode={previousNode}/>
            <StoryExplorerTextView
                storyText={storyText}
                onTakeAction={onTakeAction}
                choices={choices}
            />
        </StyledContainer>
    );
};

export default StoryView;
