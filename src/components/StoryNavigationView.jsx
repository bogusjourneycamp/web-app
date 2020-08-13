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
        display: flex;
        align-items: center;
        justify-content: center;
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

    #img {
        width: 200px;
        height: 400px;
        object-fit: cover;
        display:block;
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

const images = require.context('../../public/man_svgs', true);

const StoryNavigationView = ({ location, onClickLocation }) => {
    const atMan = location === "Man";

    const svgFile = atMan ? "man_svgs/Esplanade_12__00.svg" : "man_svgs/" + location.replace(":", "__") + ".svg";

    const downArrowText = atMan ? "Toward 6:00" : "Away Form Man";
    const leftArrowText = atMan ? "Toward 9:00" : "Clockwise";
    const upArrowText = atMan ? "Toward 12:00" : "Toward Man";
    const rightArrowText = atMan ? "Toward 3:00" : "Counter-clockwise";

    return (
        <StyledContainer>
            <div><img id="img" src={svgFile}/></div>
            <Grid>
                <div id="nav-center">
                    {formatLocation(location)}
                </div>
                <Button
                    id="nav-away"
                    onClick={() => {
                        onClickLocation(getNextLocation(location, "away"));
                    }}
                >
                    {downArrowText}
                    <br />
                    &#8595;
                </Button>
                <Button
                    id="nav-fast-foward"
                    onClick={() => {
                        onClickLocation(getNextLocation(location, "clockwise"));
                    }}
                >
                    &#8598; {leftArrowText}
                </Button>
                <Button
                    id="nav-towards"
                    onClick={() => {
                        onClickLocation(getNextLocation(location, "towards"));
                    }}
                >
                    &#8593;
                    <br />
                    {upArrowText}
                </Button>
                <Button
                    id="nav-rewind"
                    onClick={() => {
                        onClickLocation(
                            getNextLocation(location, "counter_clockwise")
                        );
                    }}
                >
                    {rightArrowText} &#8599;
                </Button>
            </Grid>
        </StyledContainer>
    );
};

export default StoryNavigationView;
