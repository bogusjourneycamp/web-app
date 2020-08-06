import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledNav = styled.nav`
    text-align: right;
    padding: 24px;

    flex-grow: 3;

    a:not(:last-child) {
        margin: 0 16px;
    }
`;

export const Nav = () => {
    return (
        <StyledNav>
            <Link to="/">Home</Link>
            <Link to="/create-story">Create Story</Link>
        </StyledNav>
    );
};
