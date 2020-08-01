import styled from 'styled-components';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { Layout } from '../components/Layout';

const rootNodeTestData = {
    title: 'The Man',
    location: '0_0',
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
const anglePerFiften = 7.5;
const tenOClockAngle = -210
const twoOClockAngle = 30


function nextLocation(location, dir){
  // TODO regex or somthing to validate location

  var split = location.split("_");

  let radius = parseInt(split[0]);
  let angle = parseFloat(split[1]);

  if(dir === "towards" && radius >0){
    return (radius-1)+"_"+angle
  } else if (dir === "away" && radius < alphabet.length - 1){
    return (radius+1)+"_"+angle
  }

  if(dir === "fastforward" && angle < twoOClockAngle){
    return radius+"_"+(angle+anglePerFiften)
  } else if (dir === "rewind" && angle > tenOClockAngle){
    return radius+"_"+(angle-anglePerFiften)
  }

  return location
}

function formatLocation(location){

  var split = location.split("_");

  let radius = parseInt(split[0]);
  let angle = parseFloat(split[1]);

  if(radius === 0){
    return "The Man"
  }

  let percentOfHour = (((angle%30)+30)%30)/30
  let minutes = (60*percentOfHour).toString().padStart(2, "0")

  let hour = (-1*(Math.floor(30/30)-3)).toString()

  let letter = alphabet[radius]

  return letter + " " +  hour + ":" + minutes
}

function Navigation(props) {
    return (
        <div id="navigation">
            <div id="navcenter">
            {formatLocation(props.location)}
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

export const ExplorePage = (props) => {
    const [exploreNode, setExploreNode] = useState(rootNodeTestData);

    const onNewLocation = (location) => {
        getNode(location).then((node) => {
            setExploreNode({
                ...exploreNode,
                title: node['title'] || 'Untitled',
                location: node['location'],
                text: node['text'],
                choices: node['choices'],
            });
        });
    };

    const onTakeAction = (action_name) => {
        let node = findNode(exploreNode, action_name);
        setExploreNode({
            ...exploreNode,
            text: node['text'],
            choices: node['choices'],
        });
    };

    return (
        <StyledContainer>
            <div id="explore">
                <div id="explore-story">
                    <Story
                        title={exploreNode.title}
                        text={exploreNode.text}
                        actions={exploreNode.choices}
                        onTakeAction={onTakeAction}
                    />
                </div>
                <div id="explore-navigation">
                    <Navigation location={exploreNode.location} onNewLocation={onNewLocation} />
                </div>
            </div>
        </StyledContainer>
    );
};
