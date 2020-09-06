import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, fireEvent, waitFor, cleanup } from "@testing-library/react";
import ExplorePage from "./ExplorePage";
import renderWithRouter from "../test-utils/renderWithRoute";

const testStoryNode = {
    id: "A",
    selectionText: "A burgin's first exploration",
    location: "B_4:15",
    storyText: "This is a test text",
    name: "root",
    choices: [],
};

const openPlayaNode = {
    id: "A",
    selectionText: "Open Playa",
    location: undefined,
    storyText: "",
    name: "root",
    choices: [],
};

beforeEach(() => {
    fetch.resetMocks();
    fetch.mockResponseOnce(JSON.stringify(testStoryNode));
});

afterEach(cleanup);

describe("Successfully renders", () => {
    test("Should render at home page with man as default location", async () => {
        const { getByTestId } = renderWithRouter(<ExplorePage />);

        await waitFor(() => getByTestId("view-story"));

        expect(getByTestId("story-location").textContent).toBe("Man");
    });

    test("Should render with location query", async () => {
        const { getByTestId } = renderWithRouter(<ExplorePage />, {
            route: "/?location=Esplanade_11%3A30",
        });

        await waitFor(() => getByTestId("view-story"));

        expect(getByTestId("story-location").textContent).toBe("11:30 & Esplanade");
    });

    test("Should default to man location when query doesn't include location", async () => {
        const { getByTestId } = renderWithRouter(<ExplorePage />, {
            route: "/?gibberish=not-good-stuff",
        });

        await waitFor(() => getByTestId("view-story"));

        expect(getByTestId("story-location").textContent).toBe("Man");
    });
});

describe("Page is functional", () => {
    test("Should be able to move clock counter clockwise", async () => {
        const history = createMemoryHistory();
        const { getByTestId, rerender } = render(
            <Router history={history}>
                <ExplorePage history={history} location={history.location} />
            </Router>
        );

        await waitFor(() => getByTestId("view-story"));

        fetch.mockResponse(JSON.stringify(openPlayaNode));

        fireEvent.click(getByTestId("nav-rewind"));
        await waitFor(() => getByTestId("view-story"));

        expect(history.location.search).toBe("?location=Esplanade_3%3A00");

        rerender(
            <Router history={history}>
                <ExplorePage history={history} location={history.location} />
            </Router>
        );

        await waitFor(() => getByTestId("view-story"));

        expect(getByTestId("story-location").textContent).toBe("3:00 & Esplanade");
    });

    test("Should be able to move clock clockwise", async () => {
        const history = createMemoryHistory();
        const { getByTestId, rerender } = render(
            <Router history={history}>
                <ExplorePage history={history} location={history.location} />
            </Router>
        );

        await waitFor(() => getByTestId("view-story"));

        fetch.mockResponse(JSON.stringify(openPlayaNode));

        fireEvent.click(getByTestId("nav-fast-forward"));
        await waitFor(() => getByTestId("view-story"));

        expect(history.location.search).toBe("?location=Esplanade_9%3A00");

        rerender(
            <Router history={history}>
                <ExplorePage history={history} location={history.location} />
            </Router>
        );

        await waitFor(() => getByTestId("view-story"));

        expect(getByTestId("story-location").textContent).toBe("9:00 & Esplanade");
    });

    test("Should be able to move clock forward", async () => {
        const history = createMemoryHistory();
        const { getByTestId, rerender } = render(
            <Router history={history}>
                <ExplorePage history={history} location={history.location} />
            </Router>
        );

        await waitFor(() => getByTestId("view-story"));

        fetch.mockResponse(JSON.stringify(openPlayaNode));

        fireEvent.click(getByTestId("nav-towards"));
        await waitFor(() => getByTestId("view-story"));

        expect(history.location.search).toBe("?location=Esplanade_12%3A00");

        rerender(
            <Router history={history}>
                <ExplorePage history={history} location={history.location} />
            </Router>
        );

        await waitFor(() => getByTestId("view-story"));

        expect(getByTestId("story-location").textContent).toBe("12:00 & Esplanade");
    });

    test("Should be able to move clock backwards", async () => {
        const history = createMemoryHistory();
        const { getByTestId, rerender } = render(
            <Router history={history}>
                <ExplorePage history={history} location={history.location} />
            </Router>
        );

        await waitFor(() => getByTestId("view-story"));

        fetch.mockResponse(JSON.stringify(openPlayaNode));

        fireEvent.click(getByTestId("nav-away"));
        await waitFor(() => getByTestId("view-story"));

        expect(history.location.search).toBe("?location=Esplanade_6%3A00");

        rerender(
            <Router history={history}>
                <ExplorePage history={history} location={history.location} />
            </Router>
        );

        await waitFor(() => getByTestId("view-story"));

        expect(getByTestId("story-location").textContent).toBe("6:00 & Esplanade");
    });
});
