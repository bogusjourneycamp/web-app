import React from "react";
import styled from "styled-components";
import Button from "./Button";
import ColorPalette from "../utils/colors";

const { DisabledRed } = ColorPalette;

const StyledButton = styled(Button)`
    background-color: ${({ backgroundcolor = "rgba(255, 255, 255, 0.85)" }) => backgroundcolor};
    border: 3px solid;
    border-radius: 100px;
    font-size: 16px;
    font-weight: 400;
    height: fit-content;
    line-height: normal;
    padding: 10px 20px;
    text-decoration: none;
    text-align: center;
    transition: background-color 200ms;

    :hover {
        background-color: ${({ disabled }) => (disabled ? DisabledRed : "white")};
    }

    :disabled {
        background-color: ${DisabledRed};
    }
`;

/**
 * A button that looks like a link
 */
const ButtonLink = ({ children, ...props }) => {
    return <StyledButton {...props}>{children}</StyledButton>;
};

export { ButtonLink };
