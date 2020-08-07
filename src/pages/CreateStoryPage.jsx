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
import storyTestData from "../utils/storyTestData.json";

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
    const [storyNode, setStoryNode] = useState(storyTestData);
    const [currentNodeId, setCurrentNodeId] = useState(storyTestData.id);
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
                    onClickAddChoice={onClickAddChoice}
                    onClickRemoveChoice={onClickRemoveChoice}
                    onChangeSelectionText={onChangeSelectionText}
                    onChangeChoiceTitle={onChangeChoiceTitle}
                    onClickPublish={onClickPublish}
                />
            </StyledContainer>
        </Layout>
    );
};
