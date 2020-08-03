import { NODE_RADIUS } from "./nodeConfig";

const drawNodeBorder = (node, ctx) => {
    ctx.beginPath();
    ctx.arc(node.x, node.y, NODE_RADIUS + 1, 0, 2 * Math.PI, false);
    ctx.fillStyle = "#696969";
    ctx.fill();
};

export default drawNodeBorder;
