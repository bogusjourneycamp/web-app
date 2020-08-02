import { NODE_RADIUS } from "./nodeConfig";

const drawNodeBody = (node, ctx, selectedNodeId) => {
    ctx.beginPath();
    ctx.arc(node.x, node.y, NODE_RADIUS, 0, 2 * Math.PI, false);
    ctx.fillStyle = node.id === selectedNodeId ? "#5CB85C" : "#C4C4C4";
    ctx.fill();
};

export default drawNodeBody;
