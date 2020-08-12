const getResetNode = (location) => {
    return {
        selectionText: "",
        location,
        storyText: "",
        name: "root",
        choices: [],
    };
};

export default getResetNode;
