import React from "react";
import styled from "styled-components";
import { Button as AntdButton } from "antd";
import ColorPalette from "../utils/colors";

const StyledButton = styled(AntdButton)`
    cursor: pointer;

    :hover {
        border-color: ${ColorPalette.CoffeeBean};
    }
`;

const Button = ({ children, ...props }) => <StyledButton {...props}>{children}</StyledButton>;

export default Button;
