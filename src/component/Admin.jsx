import React, { useEffect, Suspense, lazy } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./pages_admin/Dashboard";
import Navbar from "./pages_admin/Layout/Navbar";
import Footer from "./pages_admin/Layout/Footer";
import Sidebar from "./pages_admin/Layout/Sidebar";
import SpinnerOverlay from "./pages_admin/Layout/SpinnerOverlay";
import { useDispatch, useSelector } from "react-redux";
import LoginSignup from "./pages_admin/LoginSignup";
import { Helmet } from "react-helmet";
// import SubAdmin from "./pages_admin/SubAdmin";
import { authToken, userInfoAdd, userInfoClear } from "../Redux/ReducerAction";
import Report from "./pages_admin/Report";
import { isRoleExists, productEnumList, vendorsEnumList, homepageEnumList } from "../utils/checkRole";

const Admin = () => {
    const { spinnerOverlayReducer, sidebarCollapse, tokenReducer, userInfoReducer, darkModeReducer } = useSelector((rState) => rState);
    const SubAdmin = lazy(() => import("./pages_admin/SubAdmin"));
    const Venders = lazy(() => import("./pages_admin/Venders"));
    const Setting = lazy(() => import("./pages_admin/Setting"));
    const Products = lazy(() => import("./pages_admin/Products"));
    const Orders = lazy(() => import("./pages_admin/Orders"));
    const Customers = lazy(() => import("./pages_admin/Customers"));
    const Coupons = lazy(() => import("./pages_admin/Coupons"));
    const dispatch = useDispatch();

    const navigate = useNavigate();
    let login = sessionStorage.getItem("token") !== null;
    let userInfo = {};

    useEffect(() => {
        if (!login) {
            navigate("/admin/login/");
            dispatch(userInfoClear());
        } else {
            dispatch(authToken(sessionStorage.getItem("token")));
            userInfo = JSON.parse(sessionStorage.userInfo);
            dispatch(userInfoAdd(userInfo));
        }
    }, []);

    return (
        <>
            <Helmet>
                <title>FactorEz - Admin</title>
            </Helmet>

            {spinnerOverlayReducer && <SpinnerOverlay />}
            {login ? (
                <div className="dark:bg-[#17191e] dark:text-white">
                    <Navbar />
                    <Sidebar />
                    <Routes>
                        <Route path={"admin/dashboard"} exact element={<Dashboard />} />
                        {userInfoReducer.role && isRoleExists(userInfoReducer.role, productEnumList) && (
                            <Route
                                path={"admin/products"}
                                exact
                                element={
                                    <React.Suspense fallback={"Loading..."}>
                                        <Products />
                                    </React.Suspense>
                                }
                            />
                        )}
                        {userInfoReducer.role && isRoleExists(userInfoReducer.role, homepageEnumList) && (
                            <Route
                                path={"admin/setting"}
                                exact
                                element={
                                    <React.Suspense fallback={"Loading..."}>
                                        <Setting tokenReducer={tokenReducer} darkModeReducer={darkModeReducer} sidebarCollapse={sidebarCollapse} />
                                    </React.Suspense>
                                }
                            />
                        )}
                        {userInfoReducer.role && userInfoReducer.role.includes("ADMIN") && (
                            <Route
                                path={"admin/vendors"}
                                exact
                                element={
                                    <React.Suspense fallback={"Loading..."}>
                                        <Venders />
                                    </React.Suspense>
                                }
                            />
                        )}
                        {userInfoReducer.role && userInfoReducer.role.includes("ADMIN") && (
                            <Route
                                path={"admin/subadmin"}
                                exact
                                element={
                                    <React.Suspense fallback={"Loading..."}>
                                        <SubAdmin />
                                    </React.Suspense>
                                }
                            />
                        )}
                        {userInfoReducer.role && isRoleExists(userInfoReducer.role, vendorsEnumList) && (
                            <Route
                                path={"admin/orders"}
                                exact
                                element={
                                    <React.Suspense fallback={"Loading..."}>
                                        <Orders />
                                    </React.Suspense>
                                }
                            />
                        )}
                        {userInfoReducer.role && userInfoReducer.role.includes("ADMIN") && (
                            <Route
                                path={"admin/coupon"}
                                exact
                                element={
                                    <React.Suspense fallback={"Loading..."}>
                                        <Coupons />
                                    </React.Suspense>
                                }
                            />
                        )}
                        {userInfoReducer.role && userInfoReducer.role.includes("ADMIN") && (
                            <Route
                                path={"admin/customers"}
                                exact
                                element={
                                    <React.Suspense fallback={"Loading..."}>
                                        <Customers />
                                    </React.Suspense>
                                }
                            />
                        )}

                        <Route
                            path={"admin/reports"}
                            exact
                            element={
                                <React.Suspense fallback={"Loading..."}>
                                    <Report tokenReducer={tokenReducer} sidebarCollapse={sidebarCollapse} userInfoReducer={userInfoReducer} />
                                </React.Suspense>
                            }
                        />

                        {/* <Footer/> */}
                    </Routes>
                </div>
            ) : (
                <Routes>
                    <Route path={"admin/login"} exact element={<LoginSignup />} />
                </Routes>
            )}
        </>
    );
};

export default Admin;
