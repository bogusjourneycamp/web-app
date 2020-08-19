import React, { useState } from "react";
import ForceGraph from "react-force-graph-2d";
import styled from "styled-components";
import drawNodeBorder from "../utils/drawNodeBorder";
import drawNodeBody from "../utils/drawNodeBody";
import drawText from "../utils/drawText";
import { NODE_FONT_SIZE, NODE_SIZE } from "../utils/nodeConfig";
import getNodePath from "../utils/getNodePath";
import getNodeById from "../utils/getNodeById";
import ColorPalette from "../utils/colors";

const StyledContainer = styled.div`
    width: 500px;
    height: 500px;
`;

const StoryGraphView = ({
    data,
    onClickNode,
    selectedNode,
    graphRef,
    rootNode,
}) => {
    const [highlightedLinks, setHighlightedLinks] = useState(new Set());
    const [highlightedNodes, setHighlightedNodes] = useState(new Set());

    const getLinkColor = (link) =>
        highlightedLinks.has(link)
            ? ColorPalette.NodeGreen
            : ColorPalette.NodeGray;

    const updateHightlights = (hoveredGraphNode) => {
        if (hoveredGraphNode) {
            const storyNode = getNodeById(rootNode, hoveredGraphNode.id);

            highlightedLinks.clear();
            highlightedNodes.clear();

            if (storyNode) {
                const nodePath = getNodePath(rootNode, storyNode);

                if (nodePath.length > 1) {
                    for (let i = 0; i < nodePath.length - 1; i += 1) {
                        const nodeSource = nodePath[i];
                        const nodeTarget = nodePath[i + 1];

                        data.links.forEach((link) => {
                            if (
                                link.source.id === nodeSource.id &&
                                link.target.id === nodeTarget.id
                            ) {
                                highlightedLinks.add(link);
                            }
                        });
                        data.nodes.forEach((node) => {
                            if (
                                node.id === nodeSource.id ||
                                node.id === nodeTarget.id
                            ) {
                                highlightedNodes.add(node);
                            }
                        });

                        setHighlightedLinks(highlightedLinks);
                        setHighlightedNodes(highlightedNodes);
                    }
                }
            }
        }
    };

    return (
        <StyledContainer id="view-story-outline">
            <ForceGraph
                ref={graphRef}
                width={500}
                height={500}
                graphData={data}
                linkDirectionalArrowLength={(link) => {
                    return highlightedLinks.has(link) ? 1 : 4;
                }}
                linkDirectionalArrowRelPos={1}
                linkDirectionalArrowColor={getLinkColor}
                linkColor={getLinkColor}
                linkOpacity={1}
                onNodeClick={(node) => {
                    updateHightlights(node);
                    onClickNode(node.id);
                }}
                linkWidth={(link) => (highlightedLinks.has(link) ? 2 : 1)}
                nodeVal={NODE_SIZE}
                nodeCanvasObject={(node, ctx, globalScale) => {
                    const fontSize = NODE_FONT_SIZE / globalScale;
                    const isSelectedNode = node.id === selectedNode.id;
                    const isChildNode = node.parentNodeId === selectedNode.id;
                    const isHighlighted = highlightedNodes.has(node);

                    if (isSelectedNode || isChildNode || isHighlighted) {
                        drawNodeBorder(
                            node,
                            ctx,
                            isHighlighted || isSelectedNode
                                ? ColorPalette.NodeGreen
                                : undefined
                        );
                    }

                    let nodeColor;

                    if (!node.metaData.hasStoryText) {
                        nodeColor = ColorPalette.NodeRed;
                    } else if (isSelectedNode) {
                        nodeColor = ColorPalette.NodeGreen;
                    }

                    drawNodeBody(node, ctx, nodeColor);
                    drawText(node, ctx, node.name, fontSize);
                }}
            />
        </StyledContainer>
    );
};

export default StoryGraphView;
