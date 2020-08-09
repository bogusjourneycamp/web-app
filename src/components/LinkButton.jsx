import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ColorPalette from "../utils/colors";

const StyledLink = styled(Link)`
    border: 1px solid;
    color: ${ColorPalette.cornflowerBlue};
    padding: 6px 16px;
    text-decoration: none;
    border-radius: 3px;
    font-weight: 100;
    font-size: 16px;
`;

const LinkButton = ({ children, ...props }) => {
    return <StyledLink {...props}>{children}</StyledLink>;
};

export default LinkButton;
