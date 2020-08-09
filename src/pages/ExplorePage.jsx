import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Layout } from "../components/Layout";
import storyTestData from "../utils/storyTestData.json";
import StoryNavigationView from "../components/StoryNavigationView";
import getNodeById from "../utils/getNodeById";
import StoryView from "../components/StoryView";
import fetchNode from "../utils/fetchNode";

const StyledContainer = styled.div``;

const ExplorePage = ({ history }) => {
    const [storyNode, setStoryNode] = useState(storyTestData);

    const onTakeAction = (nodeId) => {
        const node = getNodeById(storyNode, nodeId);

        setStoryNode({
            ...storyNode,
            storyText: node.storyText,
            choices: node.choices,
        });
    };

    const onClickLocation = async (location) => {
        const node = await fetchNode(location);

        setStoryNode(node);

        history.push({
            search: `?${new URLSearchParams({ location }).toString()}`,
        });
    };

    useEffect(() => {
        const loadStory = async () => {
            const node = await fetchNode(storyNode.location);
            setStoryNode(node);
        };

        loadStory();
    }, []);

    return (
        <Layout>
            <StyledContainer>
                <StoryView storyNode={storyNode} onTakeAction={onTakeAction} />
                <StoryNavigationView
                    location={storyNode.location}
                    onClickLocation={onClickLocation}
                />
            </StyledContainer>
        </Layout>
    );
};

export default ExplorePage;
