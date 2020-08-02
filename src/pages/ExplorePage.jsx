import styled from 'styled-components';
import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
// import { Layout } from '../components/Layout';

const rootNodeTestData = {
    title: 'The Man',
    location: '0_6:00',
    text: 'welcccccome',
    name: 'root',
    choices: [
        {
            name: 'also',
            choices: [{ name: 'boop', choices: [], text: 'undaddy' }],
            text: 'cat cow',
        },
        { name: 'alps', choices: [], text: 'snarky dog' },
        { name: 'army', choices: [], text: 'sneep snop' },
    ],
};

const StyledContainer = styled.div`
    background-color: #e5e5e5;

    #title {
        position: absolute;
        width: 600px;
        height: 79px;
        left: 49px;
        top: 58px;

        font-family: HelveticaNeue;
        font-size: 72px;
        line-height: 79px;
        /* identical to box height, or 110% */

        display: flex;
        align-items: flex-end;

        color: #373a3c;
    }

    #location {
        position: absolute;
        width: 600px;
        height: 79px;
        left: 49px;
        top: 100px;

        font-family: HelveticaNeue;
        font-size: 25px;
        line-height: 30px;
        /* identical to box height, or 110% */

        display: flex;
        align-items: flex-end;

        color: #373a3c;
    }

    #story-text {
        position: absolute;
        width: 916px;
        height: 632px;
        left: 49px;
        top: 182px;

        font-family: HelveticaNeue;
        font-size: 20px;
        line-height: 30px;
        /* or 150% */

        display: flex;

        color: #373a3c;
    }

    #actions {
        /* card */

        position: absolute;
        width: 916px;
        height: 68px;
        left: 49px;
        top: 842px;

        background: #ffffff;
        border: 1px solid #e5e5e5;
        box-sizing: border-box;
        border-radius: 4px;
    }

    #navigation {
        /* card */
        position: absolute;
        width: 300px;
        height: 68px;
        left: 49px;
        top: 910px;

        background: #ffffff;
        border: 1px solid #e5e5e5;
        box-sizing: border-box;
        border-radius: 4px;

        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 10px;
        grid-auto-rows: minmax(100px, auto);
    }

  }
    #navfastforward {
      grid-column: 3;
      grid-row: 2;
    }
    #navrewind {
      grid-column: 1;
      grid-row: 2;
    }
    #navtowards {
      grid-column: 2;
      grid-row: 1;
    }
    #navaway {
      grid-column: 2;
      grid-row: 3;
    }
    #navcenter {
      grid-column: 2;
      grid-row: 2;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    #share-button {
        position: absolute;
        height: 38px;
        width: 112px;
        top: 87px;
        left: 777px;

        border: 1px solid #0275d8;
        box-sizing: border-box;
        text-decoration: none;
    }

    #edit-button {
        position: absolute;
        height: 38px;
        width: 97px;
        top: 87px;
        left: 644px;

        border: 1px solid #0275d8;
        box-sizing: border-box;
        text-decoration: none;
    }

    #fancy-button {
        font-family: HelveticaNeue;
        font-size: 25px;
        /* identical to box height, or 84% */

        color: #0275d8;

        text-align: center;

        background: #ffffff;
        border-radius: 4px;
    }

    #edit-button:visited {
        color: #0275d8;
    }

    #share-button:visited {
        color: #0275d8;
    }
`;

function Actions(props) {
    return (
        <div id="actions">
            {props.value.map((item, index) => (
                <button onClick={() => props.onTakeAction(item.name)}>
                    {item.name}
                </button>
            ))}
        </div>
    );
}

const alphabet = ["0", "Esplanade", "A", "B", "C", "D", "E", "F", "G"]

// 30/4 = 7.5
const fifteenMinAngle = 7.5;

function timeToAngle(hour, minutes){
  return 30*(hour%12) + fifteenMinAngle * (minutes/15);
}
function angleToTime(angle){
  // 360/12 = 30
  let hour = Math.floor(angle/30)
  let minutes = (angle%30)*(15/fifteenMinAngle)
  if(hour === 0){
    hour = 12;
  }
  return hour + ":" + minutes.toString().padStart(2, "0")
}


function nextLocation(location, dir){
  var split = location.replace("_", ":").split(":")
  var letter = split[0]
  var hour = parseInt(split[1])
  var minutes = parseInt(split[2])

  // TODO special case for the man

  var letterInd = alphabet.indexOf(letter)
  if(dir === "towards" && letterInd>0){
    return alphabet[letterInd-1] + "_" + hour + ":" + minutes.toString().padStart(2, "0")
  } else if (dir === "away" && letterInd<alphabet.length - 1){
    return alphabet[letterInd+1] + "_" + hour + ":" + minutes.toString().padStart(2, "0")
  }
  if(dir === "fastforward"){
    return letter + "_" + angleToTime(timeToAngle(hour, minutes)+fifteenMinAngle)
  } else if (dir === "rewind"){
    return letter + "_" + angleToTime(timeToAngle(hour, minutes)-fifteenMinAngle)
  }

  return location;
}

function Navigation(props) {
    return (
        <div id="navigation">
            <div id="navcenter">
            {props.location}
            </div>
            <button id = "navaway" onClick={() => props.onNewLocation(nextLocation(props.location, 'away'))}>
                &#x025CB;
            </button>
            <button id = "navfastforward" onClick={() => props.onNewLocation(nextLocation(props.location, 'fastforward'))}>
                +:15
            </button>
            <button id = "navtowards" onClick={() => props.onNewLocation(nextLocation(props.location, 'towards'))}>
                &#x025EF;
            </button>
            <button id = "navrewind" onClick={() => props.onNewLocation(nextLocation(props.location, 'rewind'))}>
                -:15
            </button>
        </div>
    );
}

class Edit extends React.Component {
    render() {
        return (
            // For local!
            //             <div id="fancy-button"><a id="edit-button" href="http://localhost:3000/create-story">Edit</a></div>
            <div id="fancy-button">
                <Link id="edit-button" to="/create-story">
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
    const element = (
        <div>
            <div id="title">{props.title}</div>
            <Edit />
            <Share />
            <div id="story-text">{props.text}</div>
            <Actions value={props.actions} onTakeAction={props.onTakeAction} />
        </div>
    );
    return <div id="story">{element}</div>;
}

function findNode(root, name) {
    let toVisit = [root];
    while (toVisit.length > 0) {
        let node = toVisit.pop();
        if (node['name'] === name) {
            return node;
        } else {
            toVisit = toVisit.concat(node['choices']);
        }
    }
    return null;
}

function unclaimedNode(location){
  return {
    title: 'Open Playa',
    location: location,
    text: `Congradulations Explorer! You've discovered an unclaimed spot in this dusty land.
    Now it's time to write your own story and tell your own tale. Are you ready?`,
    name: '',
    choices: [],
  };
};

const getNode = async (location) => {
    /*
  If you run into CORS issues like I did.
  https://medium.com/@dtkatz/3-ways-to-fix-the-cors-error-and-how-access-control-allow-origin-works-d97d55946d9
  */
    let url = `https://891y83rxbd.execute-api.us-east-1.amazonaws.com/prod/story?location=${location}`;
    const res = await fetch(url);
    if (!res.ok){
      return unclaimedNode(location)
    };
    return res.json();
};

export class ExplorePage extends React.Component{
  constructor(props) {
    super(props);
    this.state = rootNodeTestData;
    this.onNewLocation = this.onNewLocation.bind(this)
    this.onTakeAction = this.onTakeAction.bind(this)
  }

  onTakeAction(action_name) {
    let node = findNode(this.state, action_name);
    this.setState({
      text: node["text"],
      choices: node["choices"],
    })
  }

  onNewLocation(location) {
    console.log(location)
    getNode(location).then((node) => {
      if(Object.keys(node).length === 0){
        node = unclaimedNode(location)
      }
      this.setState({
        name: node["name"]|| 'Untitled',
        location: node["location"],
        title: node["title"],
        text: node["text"],
        choices: node["choices"],
      })
    });
  }

  render() {
    return (
        <StyledContainer>
            <div id="explore">
                <div id="explore-story">
                    <Story
                        title={this.state.title}
                        text={this.state.text}
                        actions={this.state.choices}
                        onTakeAction={this.onTakeAction}
                    />
                </div>
                <div id="explore-navigation">
                    <Navigation location={this.state.location} onNewLocation={this.onNewLocation}/>
                </div>
            </div>
        </StyledContainer>
    );
  }
}
