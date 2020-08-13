import React from 'react';
import styled from 'styled-components';
import { Nav } from "./Nav";

const StyledHeader = styled.div`
    border-bottom: 1px solid black;

    display: flex;
`;

const StyledTitle = styled.div`
    flex-grow: 7;

    display: flex;
    align-items: center;
    font-size: 24px;
    font-family: HelveticaNeue;
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
