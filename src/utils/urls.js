import isDev from "./isDev";

const CORS_PROXY = `https://cors-anywhere.herokuapp.com/`;

export const API_URL = `${
    isDev() ? CORS_PROXY : ""
}https://ja22kxm0gk.execute-api.us-east-1.amazonaws.com/dev`;

const Urls = {
    API_URL,
};

export default Urls;
