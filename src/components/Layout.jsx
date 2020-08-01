import React from 'react';
import styled from 'styled-components';
import { Nav } from './Nav';
import { Footer } from './Footer';

const StyledContainer = styled.div`
    font-family: Helvetica, Arial, sans-serif;
`;

export const Layout = ({ children }) => {
    return (
        <StyledContainer>
            <header>
                <Nav />
            </header>
            <main>{children}</main>
            <Footer />
        </StyledContainer>
    );
};
