import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Layout } from "../components/Layout";
import { CreateStoryView } from "../components/CreateStoryView";
import getNodeById from "../utils/getNodeById";
import updateNodeValue from "../utils/updateNodeValue";
import addChoiceToNode from "../utils/addChoiceToNode";
import removeChoiceFromNode from "../utils/removeChoiceFromNode";
import StoryGraphView from "../components/StoryGraphView";
import storyNodeToGraphData from "../utils/storyNodeToGraphData";
import { LINK_LENGTH } from "../utils/nodeConfig";
import publishStory from "../utils/publishStory";
import getGraphDataNodeFromStoryNode from "../utils/getGraphDataNodeFromStoryNode";
import emptyStoryData from "../utils/emptyStoryData.json";
import { API_URL } from "../utils/urls";

const StyledContainer = styled.div`
    display: flex;
    min-height: 500px;

    #view-create-story {
        flex: 1;
        border-left: 4px solid #373a3c;
    }

    #view-story-outline {
        min-height: 200px;
    }

    #view-loading {
        display: flex;
        width: 100%;
        height: auto;
        justify-content: center;
        align-items: center;
    }
`;

const updateNodeName = (graphData, nodeId, text) => {
    const node = graphData.nodes.find((n) => n.id === nodeId);

    if (node) {
        node.name = text;
    }
};

export const CreateStoryPage = ({ location }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [storyNode, setStoryNode] = useState(emptyStoryData);
    const [currentNodeId, setCurrentNodeId] = useState(emptyStoryData.id);
    const [graphData, setGraphData] = useState({ nodes: [], links: [] });
    const graphRef = useRef();
    const currentNode = getNodeById(storyNode, currentNodeId);

    const onChangeStoryText = (newText) => {
        const updatedNode = updateNodeValue(storyNode, currentNodeId, {
            storyText: newText,
        });

        if (updatedNode) {
            setStoryNode(updatedNode);
        }
    };

    const onClickAddChoice = () => {
        const result = addChoiceToNode(storyNode, currentNode.id);

        if (result && result.choiceNodeAdded) {
            setStoryNode(result.storyNode);

            // Add new graph node and link to graphData
            const newGraphNode = getGraphDataNodeFromStoryNode(
                result.choiceNodeAdded,
                currentNode.id
            );
            const newLink = {
                source: currentNode.id,
                target: result.choiceNodeAdded.id,
            };
            setGraphData({
                nodes: [...graphData.nodes, newGraphNode],
                links: [...graphData.links, newLink],
            });
        }
    };

    const onClickRemoveChoice = (choice) => {
        const newStoryNode = removeChoiceFromNode(
            storyNode,
            currentNodeId,
            choice.id
        );

        if (newStoryNode) {
            // This is a graph data representation of the new story node
            const newGraphData = storyNodeToGraphData(newStoryNode);

            // With the new story node graph representation, we're going to retrieve the existing
            // node/links to preserve its instance, so that the ForceGraph won't render the node
            // entering animations for all the nodes at once.
            const newNodes = newGraphData.nodes
                .map((newNode) =>
                    graphData.nodes.find((node) => node.id === newNode.id)
                )
                .filter((value) => value);

            const newLinks = newGraphData.links.map((newLink) =>
                graphData.links.find(
                    (link) =>
                        link.source.id === newLink.source &&
                        link.target.id === newLink.target
                )
            );

            setGraphData({
                nodes: newNodes,
                links: newLinks,
            });
            setStoryNode(newStoryNode);
        }
    };

    const onChangeSelectionText = (nodeId, newText) => {
        const updatedNode = updateNodeValue(storyNode, nodeId, {
            selectionText: newText,
        });

        if (updatedNode) {
            setStoryNode(updatedNode);
        }
    };

    const onChangeChoiceTitle = (nodeId, newTitle) => {
        const updatedNode = updateNodeValue(storyNode, nodeId, {
            name: newTitle,
        });

        if (updatedNode) {
            updateNodeName(graphData, nodeId, newTitle);
            setStoryNode(updatedNode);
        }
    };

    const onClickNode = (nodeId) => {
        setCurrentNodeId(nodeId);
    };

    const onClickPublish = async () => {
        publishStory(storyNode);
    };

    useEffect(() => {
        const fetchStory = async () => {
            const searchParams = new URLSearchParams(location.search || "");
            const storyLocation = searchParams.get("location");

            let fetchedStoryNode;

            if (storyLocation) {
                setIsLoading(true);

                try {
                    const response = await fetch(
                        `${API_URL}/story/${storyLocation}`
                    );
                    const result = await response.json();

                    // Result may come in as successful, but not as a storyNode
                    if (typeof result === "object") {
                        setStoryNode(result);
                        setCurrentNodeId(result.id);
                        fetchedStoryNode = result;
                    } else {
                        // eslint-disable-next-line no-alert
                        alert(
                            `There was an error fetching story from location: ${storyLocation}`
                        );
                    }
                } catch (error) {
                    // eslint-disable-next-line no-console
                    console.error("Error", error);
                    // eslint-disable-next-line no-alert
                    alert(
                        `There was an error fetching story from location: ${storyLocation}`
                    );
                }
                setIsLoading(false);
            }

            // Initialize graph data
            const nextGraphData = storyNodeToGraphData(
                fetchedStoryNode || storyNode,
                currentNodeId
            );
            setGraphData(nextGraphData);

            // Set link distance between nodes
            graphRef.current.d3Force("link").distance(LINK_LENGTH);
        };

        fetchStory();
    }, []);

    return (
        <Layout>
            <StyledContainer>
                {isLoading ? (
                    <div id="view-loading">Loading...</div>
                ) : (
                    <>
                        <StoryGraphView
                            data={graphData}
                            onClickNode={onClickNode}
                            selectedNode={currentNode}
                            graphRef={graphRef}
                        />
                        <CreateStoryView
                            storyNode={currentNode}
                            onChangeStoryText={onChangeStoryText}
                            onClickAddChoice={onClickAddChoice}
                            onClickRemoveChoice={onClickRemoveChoice}
                            onChangeSelectionText={onChangeSelectionText}
                            onChangeChoiceTitle={onChangeChoiceTitle}
                            onClickPublish={onClickPublish}
                        />
                    </>
                )}
            </StyledContainer>
        </Layout>
    );
};
