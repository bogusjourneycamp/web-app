import { notification } from "antd";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Layout } from "../components/Layout";
import StoryNavigationView from "../components/StoryNavigationView";
import getNodeById from "../utils/getNodeById";
import StoryView from "../components/StoryView";
import fetchNode from "../utils/fetchNode";
import storyNodeToGraphData from "../utils/storyNodeToGraphData"

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
    const [rootNode, setRootNode] = useState(0);
    const [editPassword, setEditPassword] = useState(" ");

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

    const onTakeAction = (previousId, nodeId) => {
        const previousNode = getNodeById(storyNode, previousId);
        const node = getNodeById(storyNode, nodeId);
        if (previousNode && previousNode.name === "root") {
            setRootNode(previousNode);
        }
        if (node) {
            setStoryNode(node);
        }
    };
	
    const onBack = () => {
        const storyPath = storyNodeToGraphData(rootNode, rootNode.id);
        let previousNodeId = null;
        if (storyPath) {
            for (let i = 0; i < storyPath.nodes.length; i++) {
                if (storyPath.nodes[i].id === storyNode.id) {
                    previousNodeId = storyPath.nodes[i].parentNodeId;
                    break;
                }
            }
        }
        const previousNode = getNodeById(rootNode, previousNodeId);
        if (previousNode) {
            setStoryNode(previousNode);
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

    const onClickEditPasswordSuccess = async () => {
        history.push({
            pathname: "/create-story",
            search: `?${new URLSearchParams({
                location: currentLocation,
            }).toString()}`,
            state: {"passphrase": editPassword},
        });
    };

    const onClickEditPasswordFailure = async () => {
        notification.error({message: "Invalid passphrase!"});

        history.push({
            search: `?${new URLSearchParams({
                location: currentLocation,
            }).toString()}`,
        });
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
                    onBack={onBack}
                    loading={loading}
                    editPassword={editPassword}
                    setEditPassword={setEditPassword}
                    onClickEditPasswordSuccess={onClickEditPasswordSuccess}
                    onClickEditPasswordFailure={onClickEditPasswordFailure}
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
