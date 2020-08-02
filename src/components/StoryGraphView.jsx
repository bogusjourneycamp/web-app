import React from "react";
import ForceGraph from "react-force-graph-2d";
import styled from "styled-components";

const StyledContainer = styled.div`
    width: 500px;
    height: 500px;
`;

const getLinkColor = () => "#C4C4C4";

const StoryGraphView = ({ data, onClickNode }) => (
    <StyledContainer id="view-story-outline">
        <ForceGraph
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
            nodeVal={6.2}
            nodeCanvasObject={(node, ctx, globalScale) => {
                const label = node.name;
                const fontSize = 12 / globalScale;
                ctx.font = `${fontSize}px Sans-Serif`;

                ctx.beginPath();
                ctx.arc(node.x, node.y, 10, 0, 2 * Math.PI, false);
                ctx.fillStyle = node.isSelected ? "#5CB85C" : "#C4C4C4";
                ctx.fill();

                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillStyle = "black";
                ctx.fillText(label, node.x, node.y);
            }}
        />
    </StyledContainer>
);

export default StoryGraphView;
