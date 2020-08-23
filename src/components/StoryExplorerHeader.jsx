import React from "react";
import styled from "styled-components";
import StoryButton from "./StoryButton";

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

const ButtonsContainer = styled.div`
    display: flex;
    margin-right: 20px;
    margin-top: 10px;
`;

const StoryExplorerHeader = ({ title, isRootNode, onBack}) => (
    <Header>
        <Title>{title}</Title>
        <ButtonsContainer>
            {!isRootNode && (
                <StoryButton
                    id="btn-back"
                    onClick={() => onBack()}
                >
                    Back
                </StoryButton>
            )}
        </ButtonsContainer>
    </Header>
);

export default StoryExplorerHeader;
