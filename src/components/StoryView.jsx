import React from "react";
import styled from "styled-components";
import StoryExplorerHeader from "./StoryExplorerHeader";
import StoryExplorerTextView from "./StoryExplorerTextView";
import getNodePath from "../utils/getNodePath";
import {previousLocation} from '../utils/getNextLocation';

const StyledContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;
const GetPreviousLocation = ({storyNode}) => {
    // const nodePath = getNodePath(storyNode);

    // if (!nodePath) {
    //     return (null);
    // }
    // if (nodePath && nodePath === 1) {
    //     return (null);
    // }
    // const previousLocation = nodePath[nodePath.length - 2].location;
    return ("gdf");
};

const StoryView = ({ storyNode, onTakeAction }) => {
    const { selectionText, location, storyText, choices } = storyNode;
    let editButtonTitle = "Edit";
    if (selectionText === "Open Playa") {
        editButtonTitle = "Create";
    }
	console.log(previousLocation)
    
    return (
        <StyledContainer>
            <StoryExplorerHeader title={selectionText} location={location} editButtonTitle={editButtonTitle} previousLocation={previousLocation} />
            <StoryExplorerTextView
                storyText={storyText}
                onTakeAction={onTakeAction}
                choices={choices}
            />
        </StyledContainer>
    );
};

export default StoryView;
