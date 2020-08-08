const isStoryNode = (obj) => {
    return (
        obj.id &&
        Array.isArray(obj.choices) &&
        typeof obj.selectionText === "string"
    );
};

export default isStoryNode;
