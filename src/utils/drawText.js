import { FONT_FAMILY_MONOSPACE } from "./styleConfig";

const drawText = (node, ctx, text, fontSize) => {
    ctx.font = `${fontSize}px ${FONT_FAMILY_MONOSPACE}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "black";
    ctx.fillText(text, node.x, node.y);
};

export default drawText;
