import React from "react";
import ForceGraph from "react-force-graph-2d";
import styled from "styled-components";
import drawNodeBorder from "../utils/drawNodeBorder";
import drawNodeBody from "../utils/drawNodeBody";
import drawText from "../utils/drawText";
import { NODE_FONT_SIZE, NODE_SIZE } from "../utils/nodeConfig";

const StyledContainer = styled.div`
    width: 500px;
    height: 500px;
`;

const getLinkColor = () => "#C4C4C4";

const StoryGraphView = ({ data, onClickNode, selectedNode, graphRef }) => (
    <StyledContainer id="view-story-outline">
        <ForceGraph
            ref={graphRef}
            width={500}
            height={500}
            graphData={data}
            linkDirectionalArrowLength={4}
            linkDirectionalArrowRelPos={1}
            linkDirectionalArrowColor={getLinkColor}
            linkColor={getLinkColor}
            linkOpacity={1}
            onNodeClick={(node) => {
                onClickNode(node.id);
            }}
            nodeVal={NODE_SIZE}
            nodeCanvasObject={(node, ctx, globalScale) => {
                const fontSize = NODE_FONT_SIZE / globalScale;
                const isSelectedNode = node.id === selectedNode.id;
                const isChildNode = node.parentNodeId === selectedNode.id;

                if (isSelectedNode || isChildNode) {
                    drawNodeBorder(node, ctx);
                }

                drawNodeBody(node, ctx, selectedNode.id);
                drawText(node, ctx, node.name, fontSize);
            }}
        />
    </StyledContainer>
);

export default StoryGraphView;
