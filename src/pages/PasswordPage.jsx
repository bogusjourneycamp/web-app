import React from "react";
import { Redirect, useLocation } from "react-router-dom";
import styled from "styled-components";
import { notification } from "antd";
import { Layout } from "../components/Layout";
import StoryButton from "../components/StoryButton";
import StoryFrame from "../components/StoryFrame";

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

const ExtraCopyContainer1 = styled.div`
    font-size: 16px;
`;

const ExtraCopyContainer2 = styled.div`
    margin-top: 20px;
    font-size: 16px;
`;

const PasswordPage = ({ history }) => {
    const loc = useLocation();

    const onClickReturn = () => {
        history.push({
            pathname: "/",
            search: `?${new URLSearchParams({
                location: loc.state.mapLocation,
            }).toString()}`,
        });
    };

    if (!loc.state || !loc.state.password) {
        notification.warning({
            message: "No recently returned passphrase found...\nRedirecting to Explore",
        });

        return <Redirect to="/" />;
    }

    return (
        <Layout>
            <StoryFrame>
                <StyledContainer>
                    <TitleContainer>Your passphrase is:</TitleContainer>
                    <PassphraseContainer>{loc.state.password}</PassphraseContainer>
                    <ExtraCopyContainer1>
                        Write it down or send it to yourself in an email. You&apos;ll need to put it
                        in the &quot;Passphrase for Edit&quot; box in order to edit your story
                        later.
                    </ExtraCopyContainer1>
                    <ExtraCopyContainer2>
                        Every story at every cross-street is easily sharable by copy and pasting the
                        url and sending it to a friend.
                    </ExtraCopyContainer2>
                    <StoryButton onClick={onClickReturn}>To your story!</StoryButton>
                </StyledContainer>
            </StoryFrame>
        </Layout>
    );
};
export default PasswordPage;
