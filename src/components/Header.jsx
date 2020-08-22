import React from "react";
import styled from "styled-components";
import { Nav } from "./Nav";

const StyledHeader = styled.header`
    display: flex;
`;

const StyledTitle = styled.div`
    align-items: center;
    display: flex;
    flex-grow: 7;
    font-size: 42px;
    font-weight: 600;
    margin: 15px;
`;

export const Header = () => {
    return (
        <StyledHeader>
            <StyledTitle>Lost Art of Story Telling</StyledTitle>
            <Nav />
        </StyledHeader>
    );
};
