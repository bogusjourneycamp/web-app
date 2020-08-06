const getEnvironment = () => {
    switch (process.env.NODE_ENV) {
        case "development":
            return "dev";
        case "production":
            return "prod";
        default:
            throw new Error(
                `Why are we on this environment? ${process.env.NODE_ENV}`
            );
    }
};

export default getEnvironment;
