import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FONT_FAMILY_MONOSPACE, FONT_FAMILY_MAIN } from "../utils/styleConfig";

const GlobalStyle = createGlobalStyle`
  body {
    background: #ECEEEF;
    font-family: ${FONT_FAMILY_MAIN} !important;
    margin: 0;
    padding: 0;
  }

  a, button {
    font-family: ${FONT_FAMILY_MAIN} !important;
  }
`;

const StyledContainer = styled.div`
    border: 1px solid black;

    .monospace {
        font-family: ${FONT_FAMILY_MONOSPACE};
    }

    margin: auto;
    width: 80%;
    height: 100%;

    display: flex;
    flex-direction: column;

    background: white;
`;

export const Layout = ({ children }) => {
    return (
        <StyledContainer>
            <header>
                <Header />
            </header>
            <main>{children}</main>
            <Footer />
            <GlobalStyle />
        </StyledContainer>
    );
};
