import { FONT_FAMILY_MONOSPACE } from "./styleConfig";

const drawText = (node, ctx, text, fontSize, color = "black") => {
    ctx.font = `${fontSize}px ${FONT_FAMILY_MONOSPACE}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = color;
    ctx.fillText(text, node.x, node.y);
};

export default drawText;
