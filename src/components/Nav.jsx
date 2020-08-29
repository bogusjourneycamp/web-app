import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledNav = styled.nav`
    align-items: center;
    display: flex;
    flex-grow: 3;
    font-size: 20px;
    font-weight: 600;
    justify-content: flex-end;
    padding-right: 50px;
    text-align: right;

    #info {
        padding-right: 40px;
    }

    a:not(:last-child) {
        margin: 0 16px;
    }
`;

export const Nav = () => {
    return (
        <StyledNav>
            <Link id="info" target="_blank" to="/info">
                Playa Info
            </Link>
            <Link target="_blank" to="/help">
                Feeling Lost?
            </Link>
        </StyledNav>
    );
};
