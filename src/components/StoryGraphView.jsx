import React from "react";
import ForceGraph from "react-force-graph-2d";

const StoryGraphView = ({ data, onClickNode }) => (
    <div id="view-story-outline" style={{ width: 500, height: 700 }}>
        <ForceGraph
            width={500}
            height={500}
            graphData={data}
            onNodeClick={(node) => {
                onClickNode(node.id);
            }}
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
    </div>
);

export default StoryGraphView;
