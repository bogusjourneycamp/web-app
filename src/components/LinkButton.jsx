import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button";
import ColorPalette from "../utils/colors";

const StyledLink = styled(Link)`
    background-color: ${({ backgroundColor = "rgba(255, 255, 255, 0.85)" }) => backgroundColor};
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
        background-color: rgba(255, 255, 255, 1);
    }
`;

const StyledButton = styled(Button)`
    background-color: ${({ disabled }) =>
        disabled ? ColorPalette.NodeRed : "rgba(255, 255, 255, 0.85)"};
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
        background-color: ${({ disabled }) => (disabled ? "rgba(219,112,147,0.5)" : "white")};
    }
`;

const LinkButton = ({ children, ...props }) => {
    return <StyledLink {...props}>{children}</StyledLink>;
};

const LinkLikeButton = ({ children, ...props }) => {
    return <StyledButton {...props}>{children}</StyledButton>;
};

export { LinkButton, LinkLikeButton };
