import { NODE_RADIUS } from "./nodeConfig";
import ColorPalette from "./colors";

const drawNodeBody = (node, ctx, color = ColorPalette.NodeGray) => {
    ctx.beginPath();
    ctx.arc(node.x, node.y, NODE_RADIUS, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
};

export default drawNodeBody;
