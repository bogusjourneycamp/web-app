import styled from "styled-components";
import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import { API_URL } from "../utils/urls";
import storyTestData from "../utils/storyTestData.json";

const loadingNode = {
    location: "A_12:30",
    selectionText: "text",
    storyText: "Welcome!",
    name: "root",
    choices: {},
};

const StyledContainer = styled.div`
    #location {
        font-family: HelveticaNeue;
        font-size: 25px;
        line-height: 30px;
        /* identical to box height, or 110% */

        display: flex;
        align-items: flex-end;

        color: #373a3c;
    }

    #actions {
        background: #ffffff;
        border: 1px solid #e5e5e5;
        box-sizing: border-box;
        border-radius: 4px;
    }

    #outer-nav {
        margin: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #man-pic {
        order: 2
        flex-grow: 1;
        width: 300px;
        height: 200px;
    }

    #navigation {
        order: 1
        flex-grow: 2;

        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 0px;
        grid-auto-rows: 50px;
    }

    #navfastforward {
        font-size: 18px;
        font-family: HelveticaNeue;
        grid-column: 1;
        grid-row: 2;
    }
    #navrewind {
        font-size: 18px;
        font-family: HelveticaNeue;
        grid-column: 3;
        grid-row: 2;
    }
    #navtowards {
        font-size: 18px;
        font-family: HelveticaNeue;
        grid-column: 2;
        grid-row: 1;
    }
    #navaway {
        font-size: 18px;
        font-family: HelveticaNeue;
        grid-column: 2;
        grid-row: 3;
    }
    #navcenter {
        font-family: HelveticaNeue;
        grid-column: 2;
        grid-row: 2;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #story {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    #story-top {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
    }

    #title-div {
        display: flex;
        flex-grow: 8;
    }

    #title {
        font-family: HelveticaNeue;
        font-size: 72px;
        line-height: 79px;
        /* identical to box height, or 110% */

        display: flex;

        color: #373a3c;
        margin: 40px;
    }

    #share-button {
        font-family: HelveticaNeue;
        font-size: 25px;
        color: #0275d8;

        text-decoration: none;
        text-align: center;
        text-align: center;
        vertical-align: middle;
        height: 38px;
        flex-grow: 1;
    }

    #edit-button {
        font-family: HelveticaNeue;
        font-size: 25px;
        color: #0275d8;

        text-decoration: none;
        text-align: center;
        vertical-align: middle;
        height: 38px;

        flex-frow: 1;
    }

    #fancy-button {
        border: 1px solid #0275d8;
        box-sizing: border-box;
        text-align: center;
        vertical-align: middle;
        width: 110px;
        height: 38px;
        margin: 20px;
    }

    #edit-button:visited {
        color: #0275d8;
    }

    #share-button:visited {
        color: #0275d8;
    }

    #story-text {
        font-family: HelveticaNeue;
        font-size: 20px;
        line-height: 30px;
        margin: 20px;

        display: flex;

        color: #373a3c;
        white-space: pre-wrap;
    }

    #actions {
        display: flex;
        flex-direction: column;
    }

    #action-button {
        border: 1px solid #E5E5E5;
        background: #FFFFFF;
        margin: 10px;
        padding: 10px;
        font-size: 20px;
        line-height: 30px;
    }
`;

function Actions(props) {
    let value = props.value;
    return (
        <div id="actions">
            {value.map((item, index) => (
                <button
                    id="action-button"
                    onClick={() => props.onTakeAction(item["name"])}
                >
                    {item["selectionText"]}
                </button>
            ))}
        </div>
    );
}

function nextLocation(location, dir) {
    const alphabet = ["Man", "Esplanade", "A", "B", "C", "D", "E", "F", "G"];
    const clock = [
        "1:00",
        "1:15",
        "1:30",
        "1:45",
        "2:00",
        "2:15",
        "2:30",
        "2:45",
        "3:00",
        "3:15",
        "3:30",
        "3:45",
        "4:00",
        "4:15",
        "4:30",
        "4:45",
        "5:00",
        "5:15",
        "5:30",
        "5:45",
        "6:00",
        "6:15",
        "6:30",
        "6:45",
        "7:00",
        "7:15",
        "7:30",
        "7:45",
        "8:00",
        "8:15",
        "8:30",
        "8:45",
        "9:00",
        "9:15",
        "9:30",
        "9:45",
        "10:00",
        "10:15",
        "10:30",
        "10:45",
        "11:00",
        "11:15",
        "11:30",
        "11:45",
        "12:00",
        "12:15",
        "12:30",
        "12:45",
    ];
    let split = location.split("_");
    let letter = split[0];
    let time = split[1];
    let letterInd = alphabet.indexOf(letter);
    let clockInd = clock.indexOf(time);

    if (dir === "towards") {
        if (letterInd === 0) {
            return location;
        }
        return alphabet[letterInd - 1] + "_" + time;
    } else if (dir === "away") {
        if (letterInd === alphabet.length - 1) {
            return location;
        }
        return alphabet[letterInd + 1] + "_" + time;
    } else if (dir === "clockwise") {
        if (clockInd === clock.length - 1) {
            return letter + "_" + clock[0];
        }
        return letter + "_" + clock[clockInd + 1];
    } else if (dir === "counter_clockwise") {
        if (clockInd === 0) {
            return letter + "_" + clock[clock.length - 1];
        }
        return letter + "_" + clock[clockInd - 1];
    }
}

function Navigation(props) {
    //<img id="man-pic" src="https://o7fe62guj6g73vlj30xpogpm-wpengine.netdna-ssl.com/wp-content/uploads/2020/01/BMJ_2020ManBase-665x375.png" alt="The Man" />
    return (
        <div id="outer-nav">
            <div id="navigation">
                <div id="navcenter">{props.location}</div>
                <button
                    id="navaway"
                    onClick={() =>
                        props.onNewLocation(
                            nextLocation(props.location, "away")
                        )
                    }
                >
                    Away From Man
                    <br />
                    &#8595;
                </button>
                <button
                    id="navfastforward"
                    onClick={() =>
                        props.onNewLocation(
                            nextLocation(props.location, "clockwise")
                        )
                    }
                >
                    &#8598; Clockwise
                </button>
                <button
                    id="navtowards"
                    onClick={() =>
                        props.onNewLocation(
                            nextLocation(props.location, "towards")
                        )
                    }
                >
                    &#8593;
                    <br />
                    Toward Man
                </button>
                <button
                    id="navrewind"
                    onClick={() =>
                        props.onNewLocation(
                            nextLocation(props.location, "counter_clockwise")
                        )
                    }
                >
                    Counter-clockwise &#8599;
                </button>
            </div>
        </div>
    );
}

class Edit extends React.Component {
    render() {
        return (
            <div id="fancy-button">
                <Link
                    id="edit-button"
                    to={{ pathname: "/create-story", test: this.state }}
                >
                    Edit
                </Link>
            </div>
        );
    }
}

class Share extends React.Component {
    render() {
        return (
            //             TODO link here
            <div id="fancy-button">
                <div id="share-button">Share</div>
            </div>
        );
    }
}

function Story(props) {
    return (
        <div id="story">
            <div id="story-top">
                <div id="title-div">
                    <div id="title">{props.title}</div>
                </div>
                <Edit />
                <Share />
            </div>
            <div id="story-bottom">
                <div id="story-text">{props.text}</div>
                <Actions
                    value={props.actions}
                    onTakeAction={props.onTakeAction}
                />
            </div>
        </div>
    );
}

function findNode(root, name) {
    let toVisit = [root];
    while (toVisit.length > 0) {
        let node = toVisit.pop();
        if (node["name"] === name) {
            return node;
        } else {
            for (let key of Object.keys(node["choices"])) {
                toVisit.push(node["choices"][key]);
            }
        }
    }
    return null;
}

function unclaimedNode(location) {
    return {
        selectionText: "Open Playa",
        location: location,
        storyText: `Congratulations Explorer! You've discovered an unclaimed spot in this dusty land.
    Now it's time to write your own story and tell your own tale. Are you ready?`,
        name: "",
        choices: [],
    };
}

export class ExplorePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = storyTestData;
        const query = new URLSearchParams(this.props.location.search);
        this.onNewLocation = this.onNewLocation.bind(this);
        this.onTakeAction = this.onTakeAction.bind(this);
    }

    componentDidMount() {
        let url = `${API_URL}/story/${this.state.location}`;
        let node = {};
        fetch(url)
            .then((res) => res.json())
            .then((res) => {
                if (JSON.stringify(res) === "{}") {
                    node = unclaimedNode(this.state.location);
                } else {
                    node = res;
                }
                this.setState({
                    name: node["selectionText"],
                    location: node["location"],
                    title: node["selectionText"],
                    text: node["storyText"],
                    choices: node["choices"],
                });
            });
    }

    onTakeAction(action_name) {
        let node = findNode(this.state, action_name);
        this.setState({
            text: node["storyText"],
            choices: node["choices"],
        });
    }

    onNewLocation(location) {
        this.setState({ location: location });
        let url = `${API_URL}/story/${location}`;
        let node = {};
        fetch(url)
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                if (JSON.stringify(res) === "{}") {
                    node = unclaimedNode(location);
                } else {
                    node = res;
                }
                this.setState({
                    name: node["selectionText"],
                    location: node["location"],
                    title: node["selectionText"],
                    text: node["storyText"],
                    choices: node["choices"],
                });
            });
        this.props.history.push({
            search:
                "?" + new URLSearchParams({ location: location }).toString(),
        });
    }

    render() {
        return (
            <Layout>
                <StyledContainer>
                    <Story
                        title={this.state.title}
                        text={this.state.text}
                        actions={this.state.choices}
                        onTakeAction={this.onTakeAction}
                    />
                    <Navigation
                        location={this.state.location}
                        getNode={this.getNode}
                        onNewLocation={this.onNewLocation}
                    />
                </StyledContainer>
            </Layout>
        );
    }
}
