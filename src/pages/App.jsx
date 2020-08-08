import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { CreateStoryPage } from "./CreateStoryPage";
import { ExplorePage } from "./ExplorePage";

export const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={ExplorePage} />
                    <Route path="/create-story" component={CreateStoryPage} />
                </Switch>
            </BrowserRouter>
        </div>
    );
};
