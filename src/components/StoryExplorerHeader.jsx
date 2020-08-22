import React from "react";
import styled from "styled-components";

const Header = styled.header`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;

const Title = styled.h2`
    display: flex;
    flex: 1;
    font-size: 32px;
    font-weight: 200;
    letter-spacing: 1px;
    margin: 20px 20px 0 20px;
`;

const StoryExplorerHeader = ({ title }) => (
    <Header>
        <Title>{title}</Title>
    </Header>
);

export default StoryExplorerHeader;
