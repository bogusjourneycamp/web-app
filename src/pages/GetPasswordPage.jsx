import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { Layout } from "../components/Layout";
import StoryButton from "../components/StoryButton";
import StoryFrame from "../components/StoryFrame";
import ColorPalette from "../utils/colors";

const StyledContainer = styled.div`
    padding: 12px;
    display: flex;
    flex-direction: column;
`;

const TitleContainer = styled.div`
    font-size: 16px;
`;

const PassphraseContainer = styled.div`
    padding: 12px;
    font-size: 20px;
`;

const ExtraCopyContainer = styled.div`
    font-size: 16px;
`;

const GetPasswordPage = ({history}) => {
    const loc = useLocation();

    const onClickReturn = () => {
        history.push({
            pathname: "/",
            search: `?${new URLSearchParams({
                location: loc.state.mapLocation,
            }).toString()}`,
        });
        console.log("History has been pushed");
    }

    return (
        <Layout>
            <StoryFrame>
                <StyledContainer>
                    <TitleContainer>Your passphrase is:</TitleContainer>
                    <PassphraseContainer>{loc.state.password}</PassphraseContainer>
                    <ExtraCopyContainer>Write it down. You'll need to put it in the "Passphrase for Edit" box in order to edit your story later.</ExtraCopyContainer>
                    <StoryButton onClick={onClickReturn}>To your story!</StoryButton>
                </StyledContainer>
            </StoryFrame>
        </Layout>
    );
}
export default GetPasswordPage;
