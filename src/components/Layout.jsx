import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Header } from "./Header";
import { Footer } from "./Footer";
import {
    FONT_FAMILY_MONOSPACE,
    FONT_FAMILY_MAIN,
    FONT_COLOR_MAIN,
} from "../utils/styleConfig";

const GlobalStyle = createGlobalStyle`
  body {
    background-image: url("images/burning_man_background_1.jpg");
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;

    font-family: ${FONT_FAMILY_MAIN} !important;
    margin: 0;
    padding: 0;
  }

  a, button {
    font-family: ${FONT_FAMILY_MAIN} !important;
  }

  /* Override text color */
  a, body, button, h1, h2, h3, h4, h5, h6 {
    color: ${FONT_COLOR_MAIN} !important;
  }
`;

const StyledContainer = styled.div`
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    margin: auto;
    height: 100%;

    .monospace {
        font-family: ${FONT_FAMILY_MONOSPACE};
    }
`;

export const Layout = ({ children }) => {
    return (
        <StyledContainer>
            <Header />
            <main>{children}</main>
            <Footer />
            <GlobalStyle />
        </StyledContainer>
    );
};
