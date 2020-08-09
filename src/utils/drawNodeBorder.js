import { NODE_RADIUS } from "./nodeConfig";

const drawNodeBorder = (node, ctx, color = "#696969") => {
    ctx.beginPath();
    ctx.arc(node.x, node.y, NODE_RADIUS + 1, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
};

export default drawNodeBorder;
