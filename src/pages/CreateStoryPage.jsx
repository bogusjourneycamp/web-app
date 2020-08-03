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

const rootNodeTestData = {
    id: "A",
    location: "B_4:15",
    text: "lorem ipsum",
    name: "root",
    choices: [
        {
            id: "B",
            name: "also",
            choices: [
                {
                    id: "C",
                    name: "boop",
                    choices: [
                        {
                            id: "D",
                            name: "king",
                            choices: [],
                            text: "yes, please",
                        },
                        {
                            id: "E",
                            name: "queen",
                            choices: [],
                            text: "no, thank you",
                        },
                    ],
                    text: "undaddy",
                },
            ],
            text: "cat cow",
        },
        { id: "F", name: "alps", choices: [], text: "snarky dog" },
        { id: "G", name: "army", choices: [], text: "sneep snop" },
    ],
};

const StyledContainer = styled.div`
    display: flex;

    #view-create-story {
        flex: 1;
        border-left: 4px solid #373a3c;
    }

    #view-story-outline {
        width: 80%;
        min-height: 200px;
    }
`;

const updateNodeName = (graphData, nodeId, text) => {
    const node = graphData.nodes.find((n) => n.id === nodeId);

    if (node) {
        node.name = text;
    }
};

export const CreateStoryPage = () => {
    const [storyNode, setStoryNode] = useState(rootNodeTestData);
    const [currentNodeId, setCurrentNodeId] = useState(rootNodeTestData.id);
    const [graphData, setGraphData] = useState({ nodes: [], links: [] });
    const graphRef = useRef();
    const currentNode = getNodeById(storyNode, currentNodeId);

    const onChangeStoryText = (newText) => {
        const updatedNode = updateNodeValue(storyNode, currentNodeId, {
            text: newText,
        });

        if (updatedNode) {
            setStoryNode(updatedNode);
        }
    };

    const onChangeStoryTitle = (newTitle) => {
        const updatedNode = updateNodeValue(storyNode, currentNodeId, {
            name: newTitle,
        });

        if (updatedNode) {
            setStoryNode(updatedNode);
            updateNodeName(graphData, currentNodeId, newTitle);
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

    const onClickRemoveChoice = (indexToRemove) => {
        const newNode = removeChoiceFromNode(
            storyNode,
            currentNodeId,
            indexToRemove
        );

        if (newNode) {
            setStoryNode(newNode);
        }
    };

    const onChangeChoiceText = (nodeId, newText) => {
        const updatedNode = updateNodeValue(storyNode, nodeId, {
            text: newText,
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
        // Initialize graph data
        const nextGraphData = storyNodeToGraphData(storyNode, currentNodeId);
        setGraphData(nextGraphData);

        // Set link distance between nodes
        graphRef.current.d3Force("link").distance(LINK_LENGTH);
    }, []);

    return (
        <Layout>
            <StyledContainer>
                <StoryGraphView
                    data={graphData}
                    onClickNode={onClickNode}
                    selectedNode={currentNode}
                    graphRef={graphRef}
                />
                <CreateStoryView
                    storyNode={currentNode}
                    onChangeStoryText={onChangeStoryText}
                    onChangeStoryTitle={onChangeStoryTitle}
                    onClickAddChoice={onClickAddChoice}
                    onClickRemoveChoice={onClickRemoveChoice}
                    onChangeChoiceText={onChangeChoiceText}
                    onChangeChoiceTitle={onChangeChoiceTitle}
                    onClickPublish={onClickPublish}
                />
            </StyledContainer>
        </Layout>
    );
};
