import styled from 'styled-components';
import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';

const loadingNode = {
    title: 'test',
    location: 'A_12:30',
    text: 'Welcome!',
    name: 'root',
    choices: [],
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

    #navigation {
        background: #ffffff;
        border: 1px solid #e5e5e5;
        box-sizing: border-box;
        border-radius: 4px;

        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 10px;
        grid-auto-rows: minmax(100px, auto);
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
    }
`;

function Actions(props) {
  let value = props.value
    return (
        <div id="actions">
            {value.map((item, index) => (
                <button onClick={() => props.onTakeAction(item.name)}>
                    {item.name}
                </button>
            ))}
        </div>
    );
  }

function nextLocation(location, dir){
  const alphabet = ["Man", "Esplanade", "A", "B", "C", "D", "E", "F", "G"]
  const clock = ['1:00', '1:15', '1:30', '1:45', '2:00', '2:15', '2:30', '2:45', '3:00', '3:15', '3:30', '3:45', '4:00', '4:15', '4:30', '4:45', '5:00', '5:15', '5:30', '5:45', '6:00', '6:15', '6:30', '6:45', '7:00', '7:15', '7:30', '7:45', '8:00', '8:15', '8:30', '8:45', '9:00', '9:15', '9:30', '9:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45', '12:00', '12:15', '12:30', '12:45']
  let split = location.split("_")
  let letter = split[0]
  let time = split[1]
  let letterInd = alphabet.indexOf(letter)
  let clockInd = clock.indexOf(time)
  
  if (dir === 'towards') {
    if (letterInd === 0) {
      return location
    }
    return alphabet[letterInd - 1] + "_" + time
  }
  else if (dir === 'away') {
    if (letterInd === alphabet.length - 1) {
      return location
    }
    return alphabet[letterInd + 1] + "_" + time
  }
  else if (dir === 'clockwise') {
    if (clockInd === clock.length - 1) {
      return letter + "_" + clock[0]
    }
    return letter + "_" + clock[clockInd + 1]
  }
  else if (dir === 'counter_clockwise') {
    if (clockInd === 0) {
      return letter + "_" + clock[clock.length - 1]
    }
    return letter + "_" + clock[clockInd - 1]
  }
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
            <button id = "navfastforward" onClick={() => props.onNewLocation(nextLocation(props.location, 'clockwise'))}>
                +:15
            </button>
            <button id = "navtowards" onClick={() => props.onNewLocation(nextLocation(props.location, 'towards'))}>
                &#x025EF;
            </button>
            <button id = "navrewind" onClick={() => props.onNewLocation(nextLocation(props.location, 'counter_clockwise'))}>
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
                <Link id="edit-button" to={{pathname: "/create-story", test: this.state}}>
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
    return <div id="story">
        <div id="story-top">
            <div id="title-div"><div id="title">{props.title}</div></div>
            <Edit />
            <Share />
        </div>
        <div id="story-bottom">
            <div id="story-text">{props.text}</div>
        </div>
        <Actions value={props.actions} onTakeAction={props.onTakeAction} />
    </div>;
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
    text: `Congratulations Explorer! You've discovered an unclaimed spot in this dusty land.
    Now it's time to write your own story and tell your own tale. Are you ready?`,
    name: '',
    choices: [],
  };
};

export class ExplorePage extends React.Component{
  constructor(props) {
    super(props);
    this.state = loadingNode
    const query = new URLSearchParams(this.props.location.search)
    this.onNewLocation = this.onNewLocation.bind(this)
    this.onTakeAction = this.onTakeAction.bind(this)
  }

  componentDidMount() {
    let url = `https://891y83rxbd.execute-api.us-east-1.amazonaws.com/prod/story?location=${this.state.location}`;
    let node = {}
    fetch(url)
      .then(res => res.json())
      .then((res) => {
        if (JSON.stringify(res) === '{}') {
          node = unclaimedNode(this.state.location)
        }
        else {
          node = res
        }
        this.setState({
          name: node["location"] || 'Untitled',
          location: node["location"],
          title: node["title"] || 'Untitled',
          text: node["text"],
          choices: node["choices"],
        })
      });
  }

  onTakeAction(action_name) {
    let node = findNode(this.state, action_name);
    this.setState({
      text: node["text"],
      choices: node["choices"],
    })
  }

  onNewLocation(location) {
    this.setState({location: location})
    let url = `https://891y83rxbd.execute-api.us-east-1.amazonaws.com/prod/story?location=${this.state.location}`;
    let node = {}
    fetch(url)
      .then(res => res.json())
      .then((res) => {
        if (JSON.stringify(res) === '{}') {
          node = unclaimedNode(location)
        }
        else {
          node = res
        }
        this.setState({
          name: node["location"] || 'Untitled',
          location: node["location"],
          title: node["title"] || 'Untitled',
          text: node["text"],
          choices: node["choices"],
        })
      });
    this.props.history.push({
      search: "?" + new URLSearchParams({location: location}).toString()
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
