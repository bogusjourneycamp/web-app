import React from "react";
import styled from "styled-components";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { FONT_FAMILY_MONOSPACE } from "../utils/styleConfig";

const StyledContainer = styled.div`
    font-family: Helvetica, Arial, sans-serif;

    .monospace {
        font-family: ${FONT_FAMILY_MONOSPACE};
    }
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
