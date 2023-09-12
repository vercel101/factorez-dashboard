import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navbar from "./pages_client/Layout/Navbar";
import Footer from "./pages_client/Layout/Footer";

const Client = () => {
    const location = useLocation();
    return (
        <>
            <Helmet>
                <title>FactoEz - Client</title>
            </Helmet>
            <Navbar />
            {/* {(location.pathname === "/login" || location.pathname === "/signup") && } */}
            <Outlet />
            {location.pathname !== "/login" || (location.pathname === "/signup" && <Footer />)}
        </>
    );
};

export default Client;
