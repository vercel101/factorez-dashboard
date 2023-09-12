import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navbar from "./pages_admin/Layout/Navbar";
import Sidebar from "./pages_admin/Layout/Sidebar";

const Admin = () => {
    const location = useLocation();
    return (
        <>
            <Helmet>
                <title>FactoEz - Admin</title>
            </Helmet>
            {location.pathname !== "/admin/login" && (
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
