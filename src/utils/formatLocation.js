const formatLocation = (location) => {
    if (location === "Man") {
        return "The Man"
    }
    const split = location.split("_");
    return `${split[0]} & ${split[1]}`;
};

export default formatLocation;
