import getEnvironment from "./getEnvironment";

export const API_URL = `https://ja22kxm0gk.execute-api.us-east-1.amazonaws.com/${getEnvironment()}`;

const Urls = {
    API_URL,
};

export default Urls;
