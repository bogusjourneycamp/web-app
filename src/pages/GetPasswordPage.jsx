import styled from "styled-components";
import React from "react";
import { useLocation } from "react-router-dom";
import { Layout } from "../components/Layout";

const GetPasswordPage = ({history}) => {
    const loc = useLocation();
    // console.log(location.state.mapLocation)
    const onClickReturn = () => {
        // Only go to the location if there's a valid node there
        history.push({
			pathname: "/",
            search: `?${new URLSearchParams({
                location: loc.state.mapLocation,
            }).toString()}`,
        });
    }

    return (
		
        <Layout>
            {loc.state.password}
            <button id="btn_return" onClick={onClickReturn} />
        </Layout>
		
    );
}
export default GetPasswordPage;