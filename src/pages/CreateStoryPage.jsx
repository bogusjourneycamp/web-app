import React, { useState, useEffect, useRef } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { notification, Switch } from "antd";
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
import { FONT_COLOR_MAIN } from "../utils/styleConfig";
import fetchNode from "../utils/fetchNode";
import getMutatedGraphData from "../utils/getMutatedGraphData";

const StyledContainer = styled.div`
    display: flex;
    min-height: 500px;

    #view-create-story {
        flex: 1;
        border-left: 4px solid ${FONT_COLOR_MAIN};
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

export const CreateStoryPage = ({ history, location }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [storyNode, setStoryNode] = useState(emptyStoryData);
    const [currentNodeId, setCurrentNodeId] = useState(emptyStoryData.id);
    const [graphData, setGraphData] = useState({ nodes: [], links: [] });
    const graphRef = useRef();
    const currentNode = getNodeById(storyNode, currentNodeId);

    const searchParams = new URLSearchParams(location.search || "");
    const storyLocation = searchParams.get("location");

    // Should be empty string if Creating, or filled string if Editing. Should only be -1 on refresh.
    const passphraseSet = location.state.passphraseSet || false;
    const passphrase = location.state.passphrase || "";

    const updateGraphData = (newStoryNode) => {
        const newGraphData = storyNodeToGraphData(newStoryNode, currentNodeId);

        setGraphData(getMutatedGraphData(graphData, newGraphData));
    };

    const onChangeStoryText = (newText) => {
        const storyText = newText;
        const newStoryNode = updateNodeValue(storyNode, currentNodeId, {
            storyText,
        });

        if (newStoryNode) {
            setStoryNode(newStoryNode);

            // Update only if storyText changes from empty to something or something to nothing.
            // So it wouldn't update graphData everytime something is typed.
            if (Boolean(storyText) !== Boolean(currentNode.storyText)) {
                updateGraphData(newStoryNode);
            }
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
            updateGraphData(newStoryNode);
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
        const response = await publishStory(storyNode);

        if (response.status === 200) {
            const passphrase = await response.json();
            history.push({
                pathname: "/get-pw",
                state: {"password": passphrase, "mapLocation": storyLocation},
            });
        }
        else { 
            notification.error({
                message: "We're so sorry, we're experiencing technical difficulties! Email charliegsummers@gmail.com right away and we'll help you publish your story. Thanks!",
                duration: 0
            });
        }
        
    };

    useEffect(() => {
        const fetchStory = async () => {
            let fetchedStoryNode;

            if (storyLocation) {
                setIsLoading(true);

                try {
                    const node = await fetchNode(storyLocation, true);

                    if (node) {
                        const resultWithDefaults = {
                            id: "A",
                            selectionText: "",
                            location: storyLocation,
                            storyText: "",
                            name: "root",
                            passphrase: passphrase,
                            choices: [],
                            ...node,
                        };

                        setStoryNode(resultWithDefaults);
                        setCurrentNodeId(resultWithDefaults.id);
                        fetchedStoryNode = resultWithDefaults;
                    }
                } catch (error) {
                    // eslint-disable-next-line no-console
                    console.error("Error", error);
                    notification.error(
                        `Error fetching node at location: ${location}`
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
            if (graphRef.current != null) {
                graphRef.current.d3Force("link").distance(LINK_LENGTH);
            }
        };

        fetchStory();
    }, []);

    // Redirect if no passphrase passed (normally due to refresh)
    if (!passphraseSet) {
        notification.warning({message: "Could not find passphrase...\nRedirecting to Explore"})

        return <Redirect to={`/?location=${storyLocation}`} />
    }
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
                            rootNode={storyNode}
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
