import styled from "styled-components";
import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import { API_URL } from "../utils/urls";

const rootNodeTestData = {
    id: "A",
    title: "A burgin's first exploration",
    location: "B_4:15",
    text: "It's noon on Monday, the second official day of Burning Man, and you’re a virgin burner. After spending all day yesterday setting up camp, you get ready to dress up and head out on your first exploration of Black Rock City. You head into your tent to pick out an outfit.\n\nAfter all, radical self-expression is one of Burning Man’s 10 principles. And the costumes and outfits people wear make the city come to life with wonder.\n\nWhich of these do you choose to wear?",
    name: "root",
    choices: {
        "Gold sequin vest": {
            id: "B",
            name: "Gold",
            text: "Wow, you look amazing! You pack a giant canister of water in your backpack, hop on your bike, and begin pedaling down street 4:30 toward Esplanade, the main drag in Black Rock City that borders the open desert. You hear a person wearing a rainbow tutu yell \"You Look AMAZING\" your way as you travel past their camp. And give them a smile, wave and huge THANK YOUUU!! as you pass. A block later in the intersection you see a man in a red and black tuxedo standing next to a woman in a gigantic feather headdress handing something out to passerbys.\n\nIt's hot and you need a sip of water anyway so you slow down where they are and approach the dapper couple.\n\n\"It's the greatest show of the century!\" the man says.\n\n\"You are just in time!\" says the woman, staring directly at you.\n\nShe hands you a shiny golden ticket with their camp name on it: Trapeze Siege\n\n\"Next show begins in 5 minutes,\" she says.",
            choices: {
                "Accept the offer, park your bike and head inside": {
                    id: "C",
                    name: "Park1",
                    text: "A shirtless man in a dusty hat and leather vest helps you to your seat and a girl in a leotard and green fishnet tights sitting on the same bench strikes up conversation. She tells you about her camp, which she says is right on Esplanade. There's a roller rink there and she asks if you'd like to check it out.\n\n\"We can hit the circus swings after!\" she exclaims.\n\nShe introduces her to her two other friends, who'd she met at a makeshift dumpling restaurant an hour before.\n\nBut first: they came for the \"greatest show of the century,\" and it's about to begin. The new gang of friends watch as a woman wearing a fluorescent leotard swings to the other side of the tent, dozens of feet above a net over the floor.\n\nA saxophonist plays rhythmic tunes as the trapezists swing around an aerialist in the center, who is climbing toward the sky on a ribbon of gold silk.\n\nAfter about 15 minutes, as the show nears its end, the girl in the green fishnets grabs you by the hand. \"Come on, we're going!\" she says. \"Adventure awaits!\"",
                    choices: {},
                },
                "Ask if they need an assistant (and insist that they do!)": {
                    id: "D",
                    name: "Ask1",
                    text: "\"Of course we need an assistant!\" the man exclaims! \"We thought you’d never ask.\"\n\nThe woman with the feathers grabs your hand and brings you around to the back of the tent.\n\n\"We’re going to teach you how to trapeze!\" she exclaims. She says their camp hosts trapeze shows twice daily and that they spend the first few days of Burning Man training volunteers to be in their shows later in the week.\n\nYou say you're so excited, consent to participate, and spend the next 30 minutes learning the basics of trapeze, feeling the adrenaline rush as you learn to swing and sometimes falling into the net. You have so much fun hanging out with the camp that they invite you to stay for dinner.\n\nYou meet trapeze artists and aerialists from all over the world and listen eagerly as they swap stories on show business and mid-air stunts. You've become fast friends with the eclectic group at Striptease Siege and look forward to returning for your big show appearance, where you'll soar across the tent with your new trapeze skills.\n\nCongratulations, participation has unlocked you new friends who live all around the world -- and opportunity to become a part of the entertainment for your fellow Black Rock City citizens.",
                    choices: {},
                },
                "Politely turn down their offer and keep pedaling toward Esplanade": {
                    id: "E",
                    name: "Pedal1",
                    text: "You keep riding until you reach Esplanade. There, you see a crowd of people around a giant art structure in inner playa and go to check it out. As you get within 100 feet, you realize that an organist is playing a familiar soulful tune on an organ as tesla coils zap above his head.\n\nThe artist has set up shop near an art piece that looks like a giant naked woman, with rungs in place of lungs that people have climbed up to get a better view. You ascend the ladder into the giant woman's body and find a flat nook to settle down. You can see more of Black Rock City and playa from way up here.\n\n\"There’s the man!!\" Right there. Standing tall in the center of everything and for a minute you're in awe that you're really here -- at Burning Man. After all that work to prepare and all the doubt whether it was worth it, you now find yourself suspended inside a steel woman's naked body staring at a white, dusty land that looks like another planet.\n\nA loud thunderous song begins playing from the tesla organ, and when you look back down at the organist you realize he's now surrounded by a choir. Magical sounds begin to float up to your ears, and you relax into the surreal moment.",
                    choices: {},
                },
            },
        },
        "Unicorn onesie": {
            id: "F",
            name: "Unicorn",
            text: "Wow, you look amazing! You pack a giant canister of water in your backpack, hop on your bike, and begin pedaling down street 4:30 toward Esplanade, the main drag in Black Rock City that borders the open desert. You hear a person wearing a rainbow tutu yell \"You Look AMAZING\" your way as you travel past their camp. And give them a smile, wave and huge THANK YOUUU!! as you pass. A block later in the intersection you see a man in a red and black tuxedo standing next to a woman in a gigantic feather headdress handing something out to passerbys.\n\nIt's hot and you need a sip of water anyway so you slow down where they are and approach the dapper couple.\n\n\"It's the greatest show of the century!\" the man says.\n\n\"You are just in time!\" says the woman, staring directly at you.\n\nShe hands you a shiny golden ticket with their camp name on it: Trapeze Siege\n\n\"Next show begins in 5 minutes,\" she says.",
            choices: {
                "Accept the offer, park your bike and head inside": {
                    id: "G",
                    name: "Park2",
                    text: "A shirtless man in a dusty hat and leather vest helps you to your seat and a girl in a leotard and green fishnet tights sitting on the same bench strikes up conversation. She tells you about her camp, which she says is right on Esplanade. There's a roller rink there and she asks if you'd like to check it out.\n\n\"We can hit the circus swings after!\" she exclaims.\n\nShe introduces her to her two other friends, who'd she met at a makeshift dumpling restaurant an hour before.\n\nBut first: they came for the \"greatest show of the century,\" and it's about to begin. The new gang of friends watch as a woman wearing a fluorescent leotard swings to the other side of the tent, dozens of feet above a net over the floor.\n\nA saxophonist plays rhythmic tunes as the trapezists swing around an aerialist in the center, who is climbing toward the sky on a ribbon of gold silk.\n\nAfter about 15 minutes, as the show nears its end, the girl in the green fishnets grabs you by the hand. \"Come on, we're going!\" she says. \"Adventure awaits!\"",
                    choices: {},
                },
                "Ask if they need an assistant (and insist that they do!)": {
                    id: "H",
                    name: "Ask2",
                    text: "\"Of course we need an assistant!\" the man exclaims! \"We thought you’d never ask.\"\n\nThe woman with the feathers grabs your hand and brings you around to the back of the tent.\n\n\"We’re going to teach you how to trapeze!\" she exclaims. She says their camp hosts trapeze shows twice daily and that they spend the first few days of Burning Man training volunteers to be in their shows later in the week.\n\nYou say you're so excited, consent to participate, and spend the next 30 minutes learning the basics of trapeze, feeling the adrenaline rush as you learn to swing and sometimes falling into the net. You have so much fun hanging out with the camp that they invite you to stay for dinner.\n\nYou meet trapeze artists and aerialists from all over the world and listen eagerly as they swap stories on show business and mid-air stunts. You've become fast friends with the eclectic group at Striptease Siege and look forward to returning for your big show appearance, where you'll soar across the tent with your new trapeze skills.\n\nCongratulations, participation has unlocked you new friends who live all around the world -- and opportunity to become a part of the entertainment for your fellow Black Rock City citizens.",
                    choices: {},
                },
                "Politely turn down their offer and keep pedaling toward Esplanade": {
                    id: "I",
                    name: "Pedal2",
                    text: "You keep riding until you reach Esplanade. There, you see a crowd of people around a giant art structure in inner playa and go to check it out. As you get within 100 feet, you realize that an organist is playing a familiar soulful tune on an organ as tesla coils zap above his head.\n\nThe artist has set up shop near an art piece that looks like a giant naked woman, with rungs in place of lungs that people have climbed up to get a better view. You ascend the ladder into the giant woman's body and find a flat nook to settle down. You can see more of Black Rock City and playa from way up here.\n\n\"There’s the man!!\" Right there. Standing tall in the center of everything and for a minute you're in awe that you're really here -- at Burning Man. After all that work to prepare and all the doubt whether it was worth it, you now find yourself suspended inside a steel woman's naked body staring at a white, dusty land that looks like another planet.\n\nA loud thunderous song begins playing from the tesla organ, and when you look back down at the organist you realize he's now surrounded by a choir. Magical sounds begin to float up to your ears, and you relax into the surreal moment.",
                    choices: {},
                },
            },
        },
        "Your birthday suit": {
            id: "J",
            name: "Suit",
            text: "Wow, you look amazing! You pack a giant canister of water in your backpack, hop on your bike, and begin pedaling down street 4:30 toward Esplanade, the main drag in Black Rock City that borders the open desert. You hear a person wearing a rainbow tutu yell \"You Look AMAZING\" your way as you travel past their camp. And give them a smile, wave and huge THANK YOUUU!! as you pass. A block later in the intersection you see a man in a red and black tuxedo standing next to a woman in a gigantic feather headdress handing something out to passerbys.\n\nIt's hot and you need a sip of water anyway so you slow down where they are and approach the dapper couple.\n\n\"It's the greatest show of the century!\" the man says.\n\n\"You are just in time!\" says the woman, staring directly at you.\n\nShe hands you a shiny golden ticket with their camp name on it: Trapeze Siege\n\n\"Next show begins in 5 minutes,\" she says.",
            choices: {
                "Accept the offer, park your bike and head inside": {
                    id: "K",
                    name: "Park3",
                    text: "A shirtless man in a dusty hat and leather vest helps you to your seat and a girl in a leotard and green fishnet tights sitting on the same bench strikes up conversation. She tells you about her camp, which she says is right on Esplanade. There's a roller rink there and she asks if you'd like to check it out.\n\n\"We can hit the circus swings after!\" she exclaims.\n\nShe introduces her to her two other friends, who'd she met at a makeshift dumpling restaurant an hour before.\n\nBut first: they came for the \"greatest show of the century,\" and it's about to begin. The new gang of friends watch as a woman wearing a fluorescent leotard swings to the other side of the tent, dozens of feet above a net over the floor.\n\nA saxophonist plays rhythmic tunes as the trapezists swing around an aerialist in the center, who is climbing toward the sky on a ribbon of gold silk.\n\nAfter about 15 minutes, as the show nears its end, the girl in the green fishnets grabs you by the hand. \"Come on, we're going!\" she says. \"Adventure awaits!\"",
                    choices: {},
                },
                "Ask if they need an assistant (and insist that they do!)": {
                    id: "L",
                    name: "Ask3",
                    text: "\"Of course we need an assistant!\" the man exclaims! \"We thought you’d never ask.\"\n\nThe woman with the feathers grabs your hand and brings you around to the back of the tent.\n\n\"We’re going to teach you how to trapeze!\" she exclaims. She says their camp hosts trapeze shows twice daily and that they spend the first few days of Burning Man training volunteers to be in their shows later in the week.\n\nYou say you're so excited, consent to participate, and spend the next 30 minutes learning the basics of trapeze, feeling the adrenaline rush as you learn to swing and sometimes falling into the net. You have so much fun hanging out with the camp that they invite you to stay for dinner.\n\nYou meet trapeze artists and aerialists from all over the world and listen eagerly as they swap stories on show business and mid-air stunts. You've become fast friends with the eclectic group at Striptease Siege and look forward to returning for your big show appearance, where you'll soar across the tent with your new trapeze skills.\n\nCongratulations, participation has unlocked you new friends who live all around the world -- and opportunity to become a part of the entertainment for your fellow Black Rock City citizens.",
                    choices: {},
                },
                "Politely turn down their offer and keep pedaling toward Esplanade": {
                    id: "M",
                    name: "Pedal3",
                    text: "You keep riding until you reach Esplanade. There, you see a crowd of people around a giant art structure in inner playa and go to check it out. As you get within 100 feet, you realize that an organist is playing a familiar soulful tune on an organ as tesla coils zap above his head.\n\nThe artist has set up shop near an art piece that looks like a giant naked woman, with rungs in place of lungs that people have climbed up to get a better view. You ascend the ladder into the giant woman's body and find a flat nook to settle down. You can see more of Black Rock City and playa from way up here.\n\n\"There’s the man!!\" Right there. Standing tall in the center of everything and for a minute you're in awe that you're really here -- at Burning Man. After all that work to prepare and all the doubt whether it was worth it, you now find yourself suspended inside a steel woman's naked body staring at a white, dusty land that looks like another planet.\n\nA loud thunderous song begins playing from the tesla organ, and when you look back down at the organist you realize he's now surrounded by a choir. Magical sounds begin to float up to your ears, and you relax into the surreal moment.",
                    choices: {},
                },
            },
        },
    },
};
const loadingNode = {
    title: 'test',
    location: 'A_12:30',
    text: 'Welcome!',
    name: 'root',
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
            {Object.keys(value).map((key, index) => (
                <button id="action-button" onClick={() => props.onTakeAction(value[key].name)}>
                    {key}
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
                        props.onNewLocation(nextLocation(props.location, "away"))
                    }
                >
                    Away From Man<br />&#8595;
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
                        props.onNewLocation(nextLocation(props.location, "towards"))
                    }
                >
                    &#8593;<br />Toward Man
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
                <div id="title-div"><div id="title">{props.title}</div></div>
                <Edit />
                <Share />
            </div>
            <div id="story-bottom">
                <div id="story-text">{props.text}</div>
                <Actions value={props.actions} onTakeAction={props.onTakeAction} />
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
            for (let key of Object.keys(node['choices'])) {
                toVisit.push(node['choices'][key])
            }
        }
    }
    return null;
}

function unclaimedNode(location) {
    return {
        title: "Open Playa",
        location: location,
        text: `Congratulations Explorer! You've discovered an unclaimed spot in this dusty land.
    Now it's time to write your own story and tell your own tale. Are you ready?`,
        name: "",
        choices: [],
    };
}

export class ExplorePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = rootNodeTestData;
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
                    name: node["location"] || "Untitled",
                    location: node["location"],
                    title: node["title"] || "Untitled",
                    text: node["text"],
                    choices: node["choices"],
                });
            });
    }

    onTakeAction(action_name) {
        let node = findNode(this.state, action_name);
        this.setState({
            text: node["text"],
            choices: node["choices"],
        });
    }

    onNewLocation(location) {
        this.setState({ location: location });
        let url = `${API_URL}/story/${this.state.location}`;
        let node = {};
        fetch(url)
            .then((res) => res.json())
            .then((res) => {
                if (JSON.stringify(res) === "{}") {
                    node = unclaimedNode(location);
                } else {
                    node = res;
                }
                this.setState({
                    name: node["location"] || "Untitled",
                    location: node["location"],
                    title: node["title"] || "Untitled",
                    text: node["text"],
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
