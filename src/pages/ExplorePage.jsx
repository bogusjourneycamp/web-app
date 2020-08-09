import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Layout } from "../components/Layout";
import storyTestData from "../utils/storyTestData.json";
import StoryNavigationView from "../components/StoryNavigationView";
import getNodeById from "../utils/getNodeById";
import StoryView from "../components/StoryView";
import fetchNode from "../utils/fetchNode";

const StyledContainer = styled.div``;

const ExplorePage = ({ history, location }) => {
    const [storyNode, setStoryNode] = useState(storyTestData);
    const searchParams = location.search
        ? new URLSearchParams(location.search)
        : undefined;
    const currentLocation = searchParams
        ? searchParams.get("location")
        : storyNode.location;

    const loadStory = async (storyLocation) => {
        const node = await fetchNode(storyLocation);

        if (node) {
            setStoryNode(node);
        }
    };

    const onTakeAction = (nodeId) => {
        const node = getNodeById(storyNode, nodeId);

        if (node) {
            setStoryNode(node);
        }
    };

    const onClickLocation = async (storyLocation) => {
        await loadStory(storyLocation);

        history.push({
            search: `?${new URLSearchParams({
                location: storyLocation,
            }).toString()}`,
        });
    };

    useEffect(() => {
        loadStory(currentLocation);
    }, []);

    return (
        <Layout>
            <StyledContainer>
                <StoryView storyNode={storyNode} onTakeAction={onTakeAction} />
                <StoryNavigationView
                    location={currentLocation}
                    onClickLocation={onClickLocation}
                />
            </StyledContainer>
        </Layout>
    );
};

export default ExplorePage;
