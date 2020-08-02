import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Layout } from "../components/Layout";
import { CreateStoryView } from "../components/CreateStoryView";
import getNodeById from "../utils/getNodeById";
import updateNodeValue from "../utils/updateNodeValue";
import addChoiceToNode from "../utils/addChoiceToNode";
import removeChoiceFromNode from "../utils/removeChoiceFromNode";
import StoryGraphView from "../components/StoryGraphView";
import storyNodeToGraphData from "../utils/storyNodeToGraphData";

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

export const CreateStoryPage = () => {
    const [storyNode, setStoryNode] = useState(rootNodeTestData);
    const [currentNodeId, setCurrentNodeId] = useState(rootNodeTestData.id);
    const [graphData, setGraphData] = useState({ nodes: [], links: [] });
    const currentNode = getNodeById(storyNode, currentNodeId);

    const updateGraphData = () => {
        const nextGraphData = storyNodeToGraphData(storyNode, currentNodeId);
        setGraphData(nextGraphData);
    };

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
            updateGraphData();
        }
    };

    const onClickAddChoice = () => {
        const newNode = addChoiceToNode(storyNode, currentNode.id);

        if (newNode) {
            setStoryNode(newNode);
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
            setStoryNode(updatedNode);
        }
    };

    const onClickNode = (nodeId) => {
        setCurrentNodeId(nodeId);
    };

    useEffect(() => {
        updateGraphData();
    }, [currentNodeId, storyNode]);

    return (
        <Layout>
            <StyledContainer>
                <StoryGraphView data={graphData} onClickNode={onClickNode} />
                <CreateStoryView
                    storyNode={currentNode}
                    onChangeStoryText={onChangeStoryText}
                    onChangeStoryTitle={onChangeStoryTitle}
                    onClickAddChoice={onClickAddChoice}
                    onClickRemoveChoice={onClickRemoveChoice}
                    onChangeChoiceText={onChangeChoiceText}
                    onChangeChoiceTitle={onChangeChoiceTitle}
                />
            </StyledContainer>
        </Layout>
    );
};
