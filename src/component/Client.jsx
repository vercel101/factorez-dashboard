import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navbar from "./pages_client/Layout/Navbar";
import Footer from "./pages_client/Layout/Footer";
import { getStoreInfoApi } from "../apis/clientApis";

const Client = ({ userInfoReducer, tokenReducer,storeInfoReducer }) => {
    const location = useLocation();
    return (
        <>
            <Helmet>
                <title>FactoEz - Client</title>
            </Helmet>
            <Navbar tokenReducer={tokenReducer} userInfoReducer={userInfoReducer} storeInfoReducer={storeInfoReducer}/>
            <Outlet />
            {(location.pathname !== "/login" || location.pathname === "/signup") && <Footer storeInfoReducer={storeInfoReducer}/>}
        </>
    );
};

export default Client;
