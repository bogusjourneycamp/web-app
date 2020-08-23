import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
    padding: 16px;
    text-align: center;
    position: relative;
`;

const PhotoCredit = styled.span`
    position: absolute;
    right: 10px;
`;

export const Footer = () => {
    return (
        <StyledFooter>
            The Lost Arts &copy; 2020
            <PhotoCredit>Photo by Mitchell aka Argus</PhotoCredit>
        </StyledFooter>
    );
};
