import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { CreateStoryPage } from "./CreateStoryPage";
import ExplorePage from "./ExplorePage";
import "antd/dist/antd.css";

export const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={ExplorePage} />
                <Route path="/create-story" component={CreateStoryPage} />
                <Route path="/help" component={() => {
                    window.location.href = 'https://docs.google.com/document/d/1KwhYLwNXCBU0NjuFu7Aeu-YlmGzhm2MG-jllClNY5Zo/edit?usp=sharing';
                    return null;
                }} />
            </Switch>
        </BrowserRouter>
    );
};
