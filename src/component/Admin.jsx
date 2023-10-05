import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navbar from "./pages_admin/Layout/Navbar";
import Sidebar from "./pages_admin/Layout/Sidebar";

const Admin = ({ userInfoReducer, tokenReducer,storeInfoReducer }) => {
    const location = useLocation();
    return (
        <>
            <Helmet>
                <title>FactoEz - Seller</title>
            </Helmet>
            {location.pathname !== "/seller/login" && tokenReducer && (
                <>
                    <Navbar />
                    <Sidebar />
                </>
            )}
            <Outlet />
        </>
    );
};

export default Admin;
