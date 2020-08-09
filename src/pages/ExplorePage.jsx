import styled from "styled-components";
import React from "react";
import { Layout } from "../components/Layout";
import { API_URL } from "../utils/urls";
import storyTestData from "../utils/storyTestData.json";
import StoryNavigationView from "../components/StoryNavigationView";
import getUnclaimedNode from "../utils/getUnclaimedNode";
import getNodeById from "../utils/getNodeById";
import StoryView from "../components/StoryView";

const StyledContainer = styled.div``;

export class ExplorePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = storyTestData;
        this.onNewLocation = this.onNewLocation.bind(this);
        this.onTakeAction = this.onTakeAction.bind(this);
    }

    componentDidMount() {
        const url = `${API_URL}/story/${this.state.location}`;
        let node = {};
        fetch(url)
            .then((res) => res.json())
            .then((res) => {
                if (JSON.stringify(res) === "{}") {
                    node = getUnclaimedNode(this.state.location);
                } else {
                    node = res;
                }
                this.setState({
                    name: node.selectionText,
                    location: node.location,
                    selectionText: node.selectionText,
                    storyText: node.storyText,
                    choices: node.choices,
                });
            });
    }

    onTakeAction(nodeId) {
        const node = getNodeById(this.state, nodeId);

        this.setState({
            storyText: node.storyText,
            choices: node.choices,
        });
    }

    onNewLocation(location) {
        this.setState({ location });
        const url = `${API_URL}/story/${location}`;
        let node = {};
        fetch(url)
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                if (JSON.stringify(res) === "{}") {
                    node = getUnclaimedNode(location);
                } else {
                    node = res;
                }
                this.setState({
                    name: node.selectionText,
                    location: node.location,
                    selectionText: node.selectionText,
                    storyText: node.storyText,
                    choices: node.choices,
                });
            });
        this.props.history.push({
            search: `?${new URLSearchParams({ location }).toString()}`,
        });
    }

    render() {
        return (
            <Layout>
                <StyledContainer>
                    <StoryView
                        selectionText={this.state.selectionText}
                        storyText={this.state.storyText}
                        actions={this.state.choices}
                        onTakeAction={this.onTakeAction}
                        location={this.state.location}
                    />
                    <StoryNavigationView
                        location={this.state.location}
                        onClickLocation={this.onNewLocation}
                    />
                </StyledContainer>
            </Layout>
        );
    }
}
