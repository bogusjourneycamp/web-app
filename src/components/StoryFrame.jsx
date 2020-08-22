import React from "react";
import styled from "styled-components";
import ColorPalette from "../utils/colors";

const OuterBorder = styled.div`
    border: 3px solid ${ColorPalette.CoffeeBean};
`;

const EndFrame = styled.div`
    height: 10px;
    width: 100%;
    background-color: white;
`;

const Middle = styled.div`
    display: flex;
    flex: 1;
`;

const SideFrame = styled.div`
    width: 10px;
    background-color: white;
`;

const Content = styled.div`
    background: rgba(255, 255, 255, 0.5);
    border: 3px solid ${ColorPalette.CoffeeBean};
    flex: 1;
`;

const StoryFrame = ({ children }) => {
    return (
        <OuterBorder>
            <EndFrame />
            <Middle>
                <SideFrame />
                <Content>{children}</Content>
                <SideFrame />
            </Middle>
            <EndFrame />
        </OuterBorder>
    );
};

export default StoryFrame;
