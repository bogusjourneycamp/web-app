import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
    cursor: pointer;
`;

const Button = ({ children, ...props }) => (
    <StyledButton {...props}>{children}</StyledButton>
);

export default Button;
