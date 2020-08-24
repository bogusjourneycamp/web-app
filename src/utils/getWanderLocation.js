import { API_URL } from "./urls";

const getWanderLocation = async () => {
    const response = await fetch(
        `${API_URL}/story/wander`
    );

    const wanderLocation = await response.json();

    return wanderLocation;
};

export default getWanderLocation;
