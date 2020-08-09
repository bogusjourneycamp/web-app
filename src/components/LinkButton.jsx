import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ColorPalette from "../utils/colors";

const StyledLink = styled(Link)`
    border: 1px solid;
    border-radius: 3px;
    color: ${ColorPalette.cornflowerBlue};
    font-size: 16px;
    font-weight: 100;
    height: fit-content;
    line-height: normal;
    padding: 6px 16px;
    text-decoration: none;
`;

const LinkButton = ({ children, ...props }) => {
    return <StyledLink {...props}>{children}</StyledLink>;
};

export default LinkButton;
