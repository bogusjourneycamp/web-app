import React from "react";
import styled from "styled-components";
import LinkButton from "./LinkButton";

const Header = styled.header`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding-top: 10px;
`;

const Title = styled.h1`
    display: flex;
    flex: 1;
    font-size: 42px;
    font-weight: 200;
    margin: 20px;
    letter-spacing: 1px;
`;

const ButtonsContainer = styled.div`
    display: flex;
    margin-right: 20px;

    #btn-report {
        margin-left: 20px;
	}
	
	#btn-edit {
		margin-left: 20px;
	}
`;


const StoryExplorerHeader = ({ title, location, editButtonTitle, isRootNode, onBack}) => (
    <Header>
        <Title>{title}</Title>
        <ButtonsContainer>
            {!isRootNode && (
                <LinkButton
                    id="btn-back"
                    onClick={() =>{onBack()}}
                >
                    Back
                </LinkButton>
            )}
            <LinkButton
                id="btn-edit"
                to={{
                    pathname: "/create-story",
                    search: location
                        ? new URLSearchParams({ location }).toString()
                        : undefined,
                }}
            >
                {editButtonTitle}
            </LinkButton>
            {/* TODO: Link to report */}
            <LinkButton id="btn-report">Report</LinkButton>
        </ButtonsContainer>
    </Header>
);

export default StoryExplorerHeader;
