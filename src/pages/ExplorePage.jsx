import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Layout } from "../components/Layout";
import StoryNavigationView from "../components/StoryNavigationView";
import getNodeById from "../utils/getNodeById";
import StoryView from "../components/StoryView";
import fetchNode from "../utils/fetchNode";

const StyledContainer = styled.div`
    padding: 12px;
    display: flex;

    #view-story {
        flex: 1;
    }

    #view-story-navigation {
        width: 30%;
        min-width: 250px;
        max-width: 300px;
        margin-left: 20px;
    }
`;

const ExplorePage = ({ history, location }) => {
    const [storyNode, setStoryNode] = useState();
    const [loading, setLoading] = useState(false);
    const searchParams = location.search
        ? new URLSearchParams(location.search)
        : undefined;
    const currentLocation = searchParams ? searchParams.get("location") : "Man";

    const loadStory = async (storyLocation) => {
        setLoading(true);

        const node = await fetchNode(storyLocation, false);

        if (node) {
            setStoryNode(node);
        }

        setLoading(false);
        return node;
    };

    const onTakeAction = (nodeId) => {
        const node = getNodeById(storyNode, nodeId);

        if (node) {
            setStoryNode(node);
        }
    };

    const onClickLocation = async (storyLocation) => {
        const node = await loadStory(storyLocation);

        // Only go to the location if there's a valid node there
        if (node) {
            history.push({
                search: `?${new URLSearchParams({
                    location: storyLocation,
                }).toString()}`,
            });
        }
    };

    useEffect(() => {
        loadStory(currentLocation);
    }, []);

    return (
        <Layout>
            <StyledContainer>
                <StoryView
                    storyNode={storyNode}
                    onTakeAction={onTakeAction}
                    loading={loading}
                />
                <StoryNavigationView
                    location={currentLocation}
                    onClickLocation={onClickLocation}
                />
            </StyledContainer>
        </Layout>
    );
};

export default ExplorePage;
