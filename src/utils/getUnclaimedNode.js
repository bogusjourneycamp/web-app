const getUnclaimedNode = (location) => {
    return {
        selectionText: "Open Playa",
        location,
        storyText: `Congratulations Explorer! You've discovered an unclaimed spot in this dusty land.\n\nNow it's time to write your own story and tell your own tale. Are you ready?`,
        name: "",
        choices: [],
    };
};

export default getUnclaimedNode;
