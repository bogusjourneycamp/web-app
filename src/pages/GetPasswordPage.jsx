import React from "react";
import { useLocation } from "react-router-dom";
import { Layout } from "../components/Layout";
import StoryButton from "../components/StoryButton";

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
            Your passphrase is:  {loc.state.password}. Write it down, you will need it for editing!
            <StoryButton id="btn_return" onClick={onClickReturn}>To your story</StoryButton>
        </Layout>
		
    );
}
export default GetPasswordPage;