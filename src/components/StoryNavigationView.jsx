import React from "react";
import styled from "styled-components";
import formatLocation from "../utils/formatLocation";
import Button from "./Button";
import getNextLocation from "../utils/getNextLocation";

const StyledContainer = styled.div`
    margin: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    button {
        font-size: 18px;
    }

    #nav-fast-foward {
        grid-column: 1;
        grid-row: 2;
    }

    #nav-rewind {
        grid-column: 3;
        grid-row: 2;
    }

    #nav-towards {
        grid-column: 2;
        grid-row: 1;
    }

    #nav-away {
        grid-column: 2;
        grid-row: 3;
    }

    #nav-center {
        grid-column: 2;
        grid-row: 2;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const Grid = styled.div`
    order: 1;
    flex-grow: 2;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 0px;
    grid-auto-rows: 50px;
`;

const StoryNavigationView = ({ location, onClickLocation }) => {
    // <img id="man-pic" src="https://o7fe62guj6g73vlj30xpogpm-wpengine.netdna-ssl.com/wp-content/uploads/2020/01/BMJ_2020ManBase-665x375.png" alt="The Man" />
    return (
        <StyledContainer>
            <Grid>
                <div id="nav-center">{formatLocation(location)}</div>
                <Button
                    id="nav-away"
                    onClick={() => {
                        onClickLocation(getNextLocation(location, "away"));
                    }}
                >
                    Away From Man
                    <br />
                    &#8595;
                </Button>
                <Button
                    id="nav-fast-foward"
                    onClick={() => {
                        onClickLocation(getNextLocation(location, "clockwise"));
                    }}
                >
                    &#8598; Clockwise
                </Button>
                <Button
                    id="nav-towards"
                    onClick={() => {
                        onClickLocation(getNextLocation(location, "towards"));
                    }}
                >
                    &#8593;
                    <br />
                    Toward Man
                </Button>
                <Button
                    id="nav-rewind"
                    onClick={() => {
                        onClickLocation(
                            getNextLocation(location, "counter_clockwise")
                        );
                    }}
                >
                    Counter-clockwise &#8599;
                </Button>
            </Grid>
        </StyledContainer>
    );
};

export default StoryNavigationView;
