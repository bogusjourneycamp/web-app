import React from "react";
import styled from "styled-components";
import Button from "./Button";
import getNextLocation from "../utils/getNextLocation";
import getWanderLocation from "../utils/getWanderLocation";
import ColorPalette from "../utils/colors";

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    button {
        align-items: center;
        display: flex;
        font-size: 18px;
        height: 100%;
        justify-content: center;
        width: 100%;
        grid-column: span 1;
        white-space: pre-wrap;
    }

    #nav-rewind {
        grid-column: 1;
        grid-row: 1;
    }

    #nav-towards {
        grid-column: 2;
        grid-row: 1;
    }

    #nav-fast-foward {
        grid-column: 3;
        grid-row: 1;
    }

    #nav-away {
        grid-column: 2;
        grid-row: 2;
    }

    #nav-wander {
        grid-column: 3;
        grid-row: 3;
    }
`;

const Grid = styled.div`
    order: 1;
    flex-grow: 2;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-gap: 2px;
    grid-auto-rows: 100px;

    button {
        border: 3px solid ${ColorPalette.CoffeeBean};
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        font-size: 14px;
        justify-content: flex-start;
        margin: 2px;
        padding: 6px 10px;
        transition: background-color 200ms;

        :hover {
            background-color: white;
        }
    }
`;

const Text = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;

const Direction = styled.div``;

const Location = styled.div`
    font-size: 28px;
    font-weight: 600;
    text-align: center;
`;

const TheMan = styled.img`
    width: 100%;
    margin: 10px 0 20px;
    object-fit: cover;
    display: block;
`;

const StoryNavigationView = ({ location, onClickLocation }) => {
    let locationDisplay = location;
    const atMan = location === "Man";

    const pngFile = atMan
        ? "burning_man_pngs/Esplanade_6__00.png"
        : `burning_man_pngs/${location.replace(":", "__")}.png`;

    const locationData = location.split("_");

    if (locationData.length > 1) {
        const letter = locationData[0];
        const time = locationData[1];
        locationDisplay = `${time} & ${letter}`;
    }

    const upText = atMan ? "Toward 12:00" : "Toward Man";
    const downText = atMan ? "Toward 6:00" : "Away From Man";
    const leftText = atMan ? "Toward 9:00" : "Clockwise";
    const rightText = atMan ? "Toward 3:00" : "Counter Clockwise";

    return (
        <StyledContainer id="view-story-navigation">
            <div>
                <Location>{locationDisplay}</Location>
                <div>
                    <TheMan src={pngFile} alt="The Man" />
                </div>
            </div>
            <Grid>
                <Button
                    id="nav-towards"
                    onClick={() => {
                        onClickLocation(getNextLocation(location, "towards"));
                    }}
                >
                    <Direction>&#8593;</Direction>
                    <Text>{upText}</Text>
                </Button>
                <Button
                    id="nav-away"
                    onClick={() => {
                        onClickLocation(getNextLocation(location, "away"));
                    }}
                >
                    <Text>{downText}</Text>
                    <Direction>&#8595;</Direction>
                </Button>
                <Button
                    id="nav-rewind"
                    onClick={() => {
                        onClickLocation(getNextLocation(location, "clockwise"));
                    }}
                >
                    <Direction>&#8598;</Direction>
                    <Text>{leftText}</Text>
                </Button>

                <Button
                    id="nav-fast-foward"
                    onClick={() => {
                        onClickLocation(getNextLocation(location, "counter_clockwise"));
                    }}
                >
                    <Direction>&#8599;</Direction>
                    <Text>{rightText}</Text>
                </Button>

                <Button
                    id="nav-wander"
                    onClick={async () => {
                        onClickLocation(await getWanderLocation());
                    }}
                >
                    <Direction>?</Direction>
                    <Text>Wander</Text>
                </Button>
            </Grid>
        </StyledContainer>
    );
};

export default StoryNavigationView;
