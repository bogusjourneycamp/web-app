import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, fireEvent, waitFor, cleanup } from "@testing-library/react";
import StoryView from "./StoryView";
import { API_URL } from "../utils/urls";

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
    location: "B_4:30",
    storyText: "",
    name: "root",
    choices: [],
};

beforeEach(fetch.resetMocks);

afterEach(cleanup);

describe("Successfully renders", () => {
    test("Should render loading when no story node is set", () => {
        const history = createMemoryHistory();
        const { getByTestId } = render(
            <Router history={history}>
                <StoryView loading />
            </Router>
        );

        getByTestId("loading-story");
    });

    test("Should render loading when loading is set", () => {
        const history = createMemoryHistory();
        const { getByTestId } = render(
            <Router history={history}>
                <StoryView loading storyNode={{}} />
            </Router>
        );

        getByTestId("loading-story");
    });

    test("Should render open playa view", () => {
        const history = createMemoryHistory();
        const { getByText, getByTestId } = render(
            <Router history={history}>
                <StoryView rootNode={openPlayaNode} storyNode={openPlayaNode} />
            </Router>
        );

        // Story content should exist
        getByText(openPlayaNode.selectionText);

        // These buttons should exist
        expect(getByTestId("btn-report").textContent).toBe("Report");
        expect(getByTestId("link-create").textContent).toBe("Create");
        expect(getByTestId("link-gift-a-story").textContent).toBe("Gift a Story :)");

        // These buttons should not exist
        expect(() => getByTestId("btn-edit")).toThrow();
        expect(() => getByTestId("input-edit-password")).toThrow();
    });

    test("Should render story view", () => {
        const history = createMemoryHistory();
        const { getByText, getByTestId } = render(
            <Router history={history}>
                <StoryView rootNode={testStoryNode} storyNode={testStoryNode} />
            </Router>
        );

        // Story content should exist
        getByText(testStoryNode.storyText);
        getByText(testStoryNode.selectionText);

        // These buttons should exist
        expect(getByTestId("btn-report").textContent).toBe("Report");
        expect(getByTestId("btn-edit").textContent).toBe("Edit");
        getByTestId("input-edit-password");

        // These buttons should not exist
        expect(() => getByTestId("link-create")).toThrow();
        expect(() => getByTestId("link-gift-a-story")).toThrow();
    });
});

describe("All buttons works", () => {
    test("Should successfully click buttons on open playa view", async () => {
        const history = createMemoryHistory();
        const { getByTestId, getByText } = render(
            <Router history={history}>
                <StoryView rootNode={openPlayaNode} storyNode={openPlayaNode} />
            </Router>
        );

        // Report button works correctly
        fireEvent.click(getByTestId("btn-report"));
        await waitFor(() => getByText("Successfully reported page"), {
            timeout: 1,
        });

        expect(fetch.mock.calls.length).toEqual(1);
        expect(fetch.mock.calls[0][0]).toEqual(
            `${API_URL}/story/${encodeURI(openPlayaNode.location)}/report`
        );
        expect(getByTestId("btn-report")).toHaveProperty("disabled", true);
        expect(getByTestId("btn-report").textContent).toBe("Reported");

        // Create button works correctly
        fireEvent.click(getByTestId("link-create"));
        expect(history.location.pathname).toBe(`/create-story`);
        expect(history.location.search).toBe(`?location=${encodeURI(openPlayaNode.location)}`);

        // Gift a Story button works correctly
        fireEvent.click(getByTestId("link-gift-a-story"));
        expect(history.location.pathname).toBe(`/create-story`);
        expect(history.location.search).toBe(`?location=${encodeURI(openPlayaNode.location)}`);

        await waitFor(() => getByText("Successfully reported page"), {
            timeout: 1,
        });
    });

    test("Should successfully click buttons on story view", async () => {
        const history = createMemoryHistory();
        const onEditPasswordError = jest.fn();
        const onEditPasswordSuccess = jest.fn();

        const { getByText, getByTestId } = render(
            <Router history={history}>
                <StoryView
                    rootNode={testStoryNode}
                    storyNode={testStoryNode}
                    onEditPasswordError={onEditPasswordError}
                    onEditPasswordSuccess={onEditPasswordSuccess}
                />
            </Router>
        );

        // Report button works correctly
        fireEvent.click(getByTestId("btn-report"));
        await waitFor(() => getByText("Successfully reported page"), {
            timeout: 1,
        });

        expect(fetch.mock.calls.length).toEqual(1);
        expect(fetch.mock.calls[0][0]).toEqual(
            `${API_URL}/story/${encodeURI(testStoryNode.location)}/report`
        );
        expect(getByTestId("btn-report")).toHaveProperty("disabled", true);
        expect(getByTestId("btn-report").textContent).toBe("Reported");

        // Create button works correctly
        // Error notification pops up when no passphrase entered
        fireEvent.click(getByTestId("btn-edit"));
        await waitFor(() => getByText("Please enter a passphrase to edit this story"), {
            timeout: 1,
        });

        // Should handle successful response when password is entered
        fetch.mockResponseOnce(true);

        fireEvent.change(getByTestId("input-edit-password"), {
            target: { value: "some-password" },
        });
        fireEvent.click(getByTestId("btn-edit"));

        expect(fetch.mock.calls.length).toEqual(2);
        expect(fetch.mock.calls[1][0]).toEqual(
            `${API_URL}/story/check_passphrase/${encodeURI(testStoryNode.location)}`
        );

        await waitFor(() => expect(onEditPasswordSuccess).toBeCalledTimes(1));

        // Should handle error response when password is entered
        fetch.mockResponseOnce(false);

        fireEvent.click(getByTestId("btn-edit"));

        expect(fetch.mock.calls.length).toEqual(3);
        expect(fetch.mock.calls[2][0]).toEqual(
            `${API_URL}/story/check_passphrase/${encodeURI(testStoryNode.location)}`
        );

        await waitFor(() => expect(onEditPasswordError).toBeCalledTimes(1));
    });
});
