const drawText = (node, ctx, text, fontSize) => {
    ctx.font = `${fontSize}px Sans-Serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "black";
    ctx.fillText(text, node.x, node.y);
};

export default drawText;
