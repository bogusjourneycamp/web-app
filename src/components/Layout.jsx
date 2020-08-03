import React from "react";
import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { FONT_FAMILY_MONOSPACE } from "../utils/styleConfig";

const GlobalStyle = createGlobalStyle`
  body {
    background: #ECEEEF;
    margin: 0;
    padding: 0;
  }
`;

const StyledContainer = styled.div`
    font-family: Helvetica, Arial, sans-serif;

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
                <Nav />
            </header>
            <main>{children}</main>
            <Footer />
            <GlobalStyle />
      </StyledContainer>
    );
};
