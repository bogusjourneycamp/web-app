const formatLocation = (location) => {
    const split = location.split("_");
    return `${split[0]} & ${split[1]}`;
};

export default formatLocation;
