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
    padding: 24px;
    text-align: right;

    a:not(:last-child) {
        margin: 0 16px;
    }
`;

export const Nav = () => {
    return (
        <StyledNav>
            <Link to="/help">Feeling Lost?</Link>
        </StyledNav>
    );
};
