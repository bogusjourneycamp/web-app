import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
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
        background-color: rgba(255, 255, 255, 1);
    }
`;

const LinkButton = ({ children, ...props }) => {
    return <StyledLink {...props}>{children}</StyledLink>;
};

export default LinkButton;
