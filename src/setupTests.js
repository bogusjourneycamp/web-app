/* eslint-disable import/no-extraneous-dependencies */
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
import { configure as configureRTL } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

// Use id attribute as the testId that @testing-library looks for
configureRTL({ testIdAttribute: "id" });
