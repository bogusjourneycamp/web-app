import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ColorPalette from "../utils/colors";

const StyledLink = styled(Link)`
    background-color: rgba(92, 184, 92, 0.85);
    border: 3px solid;
    border-radius: 100px;
    font-size: 16px;
    font-weight: 400;
    height: fit-content;
    line-height: normal;
    margin: 20px;
    padding: 10px 20px;
    text-decoration: none;
    text-align: center;
    transition: background-color 200ms;

    :hover {
        background-color: rgba(255, 255, 255, 1);
    }
`;

const GiftAStoryButton = ({ children, ...props }) => {
    if (!props.isCreatePage)
        return null
    return <StyledLink {...props}>{children}</StyledLink>;
};

export default GiftAStoryButton;
