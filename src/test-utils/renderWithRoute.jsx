/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

// test utils file
function renderWithRouter(
    ui,
    { route = "/", history = createMemoryHistory({ initialEntries: [route] }) } = {}
) {
    const Wrapper = ({ children }) => {
        return (
            <Router history={history}>
                {React.cloneElement(children, { history, location: history.location })}
            </Router>
        );
    };

    return {
        ...render(ui, { wrapper: Wrapper }),
        // adding `history` to the returned utilities to allow us
        // to reference it in our tests (just try to avoid using
        // this to test implementation details).
        history,
    };
}

export default renderWithRouter;
