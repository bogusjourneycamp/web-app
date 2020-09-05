import { notification } from "antd";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Layout } from "../components/Layout";
import StoryNavigationView from "../components/StoryNavigationView";
import getNodeById from "../utils/getNodeById";
import StoryView from "../components/StoryView";
import fetchNode from "../utils/fetchNode";
import storyNodeToGraphData from "../utils/storyNodeToGraphData";

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
    const [rootNode, setStoryNode] = useState();
    const [currentNode, setCurrentNode] = useState(rootNode);
    const [loading, setLoading] = useState(false);

    const searchParams = location.search ? new URLSearchParams(location.search) : undefined;
    let currentLocation = searchParams ? searchParams.get("location") : "Man";

    if (!currentLocation) {
        currentLocation = "Man";
    }

    const loadStory = async (storyLocation) => {
        setLoading(true);

        const node = await fetchNode(storyLocation, false);

        if (node) {
            setStoryNode(node);
            setCurrentNode(node);
        }

        setLoading(false);
        return node;
    };

    const onTakeAction = (nodeId) => {
        const node = getNodeById(rootNode, nodeId);

        if (node) {
            setCurrentNode(node);
        }
    };

    const onBack = () => {
        const storyPath = storyNodeToGraphData(rootNode, currentNode.id);
        let previousNodeId = null;

        if (storyPath) {
            for (let i = 0; i < storyPath.nodes.length; i += 1) {
                if (storyPath.nodes[i].id === currentNode.id) {
                    previousNodeId = storyPath.nodes[i].parentNodeId;
                    break;
                }
            }
        }

        const previousNode = getNodeById(rootNode, previousNodeId);

        if (previousNode) {
            setCurrentNode(previousNode);
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

    const onEditPasswordSuccess = async (editPassword) => {
        history.push({
            pathname: "/create-story",
            search: `?${new URLSearchParams({
                location: currentLocation,
            }).toString()}`,
            state: { passphrase: editPassword, passphraseSet: true },
        });
    };

    const onEditPasswordError = async () => {
        notification.error({ message: "Invalid passphrase!" });
    };

    useEffect(() => {
        loadStory(currentLocation);
    }, []);

    return (
        <Layout>
            <StyledContainer>
                <StoryView
                    rootNode={rootNode}
                    storyNode={currentNode}
                    onTakeAction={onTakeAction}
                    onBack={onBack}
                    loading={loading}
                    onEditPasswordSuccess={onEditPasswordSuccess}
                    onEditPasswordError={onEditPasswordError}
                />
                <StoryNavigationView location={currentLocation} onClickLocation={onClickLocation} />
            </StyledContainer>
        </Layout>
    );
};

export default ExplorePage;
