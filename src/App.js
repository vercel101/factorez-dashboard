import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Admin from "./component/Admin";
import Client from "./component/Client";
import { Route, Routes, Navigate, useNavigate, useLocation } from "react-router-dom";
import LoginPage from "./component/pages_client/LoginPage";
import SignUpPage from "./component/pages_client/SignUpPage";
import Home from "./component/pages_client/Home";
import LoginSignup from "./component/pages_admin/LoginSignup";
import Dashboard from "./component/pages_admin/Dashboard";
import Products from "./component/pages_admin/Products";
import { couponEnumList, customerEnumList, financeEnumList, isRoleExists, orderEnumList, productEnumList, reportEnumList, settingEnumList, subadminEnumList, vendorsEnumList } from "./utils/checkRole";
import Setting from "./component/pages_admin/Setting";
import Profile from "./component/pages_admin/Layout/profile/Profile";
import ProfileClient from "./component/pages_client/Profile";
import Finance from "./component/pages_admin/Finance";
import Customers from "./component/pages_admin/Customers";
import Report from "./component/pages_admin/Report";
import Coupons from "./component/pages_admin/Coupons";
import Orders from "./component/pages_admin/Orders";
import SubAdmin from "./component/pages_admin/SubAdmin";
import Venders from "./component/pages_admin/Venders";
import AllProductPage from "./component/pages_client/AllProductPage";
import { authToken, authTokenClear, storeInfoAddFn, userInfoAdd, userInfoClear } from "./Redux/ReducerAction";
import { getStoreInfoApi } from "./apis/clientApis";
import ProductInfo from "./component/pages_client/ProductInfo";
import Cart from "./component/pages_client/Cart";
import Order from "./component/pages_client/Orders";
import OrderInfo from "./component/pages_client/OrderInfo";
import Wishlist from "./component/pages_client/wishlist";
import Contact from "./component/pages_client/Contact";
import About from "./component/pages_client/About";
function App() {
    const {
        darkModeReducer,
        categoryFilterReducer,
        tokenReducer,
        sidebarCollapse,
        productBrandDDindexReducer,
        storeInfoReducer,
        userInfoReducer,
        productCategoryNewReducer,
        productCategoryDDindexReducer,
    } = useSelector((state) => state);
    let navigate = useNavigate();
    let location = useLocation();
    let dispatch = useDispatch();
    const storeInformation = async () => {
        await getStoreInfoApi(tokenReducer)
            .then((res) => {
                // console.log(res.data);
                dispatch(storeInfoAddFn(res.data.data));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    React.useEffect(() => {
        localStorage.removeItem("customerId");
        console.log("userInfoReducer", userInfoReducer);
        console.log("tokenReducer", tokenReducer);
        console.log("location", location);
        storeInformation();
        if (!tokenReducer) {
            if (location.pathname.startsWith("/seller")) {
                navigate("/seller/login");
            } else {
                navigate("/login");
            }
            dispatch(userInfoClear());
            dispatch(authTokenClear());
        } else {
            if (location.pathname === "/login" && tokenReducer) {
                if (userInfoReducer.userType !== "CUSTOMER") {
                    navigate("/seller");
                } else {
                    navigate("/");
                }
            } else if (location.pathname === "/" && userInfoReducer.userType !== "CUSTOMER") {
                dispatch(userInfoClear());
                dispatch(authTokenClear());
                navigate("/seller/login");
            } else if (location.pathname.startsWith("/seller") && userInfoReducer.userType === "CUSTOMER") {
                dispatch(userInfoClear());
                dispatch(authTokenClear());
                navigate("/login");
            }
        }
    }, []);

    return (
        <div className={`${darkModeReducer && "dark"}`}>
            <Routes>
                <Route path={"/"} element={<Client categoryFilterReducer={categoryFilterReducer} storeInfoReducer={storeInfoReducer} tokenReducer={tokenReducer} userInfoReducer={userInfoReducer} />}>
                    <Route
                        path={"/"}
                        element={<Home categoryFilterReducer={categoryFilterReducer} storeInfoReducer={storeInfoReducer} tokenReducer={tokenReducer} userInfoReducer={userInfoReducer} />}
                    />
                    <Route path={"*"} element={<Navigate to={"/"} />} />
                    <Route path={"signup"} element={<SignUpPage />} />
                    <Route path={"login"} element={<LoginPage />} />
                    <Route
                        path={"cart"}
                        element={<Cart categoryFilterReducer={categoryFilterReducer} storeInfoReducer={storeInfoReducer} tokenReducer={tokenReducer} userInfoReducer={userInfoReducer} />}
                    />
                    <Route
                        path={"wishlist"}
                        element={<Wishlist categoryFilterReducer={categoryFilterReducer} storeInfoReducer={storeInfoReducer} tokenReducer={tokenReducer} userInfoReducer={userInfoReducer} />}
                    />
                    <Route
                        path={"products"}
                        element={<AllProductPage categoryFilterReducer={categoryFilterReducer} storeInfoReducer={storeInfoReducer} tokenReducer={tokenReducer} userInfoReducer={userInfoReducer} />}
                    />
                    <Route
                        path={"contact"}
                        element={<Contact categoryFilterReducer={categoryFilterReducer} storeInfoReducer={storeInfoReducer} tokenReducer={tokenReducer} userInfoReducer={userInfoReducer} />}
                    />
                     <Route
                        path={"about"}
                        element={<About categoryFilterReducer={categoryFilterReducer} storeInfoReducer={storeInfoReducer} tokenReducer={tokenReducer} userInfoReducer={userInfoReducer} />}
                    />
                    <Route
                        path={"product/:productId"}
                        element={<ProductInfo categoryFilterReducer={categoryFilterReducer} storeInfoReducer={storeInfoReducer} tokenReducer={tokenReducer} userInfoReducer={userInfoReducer} />}
                    />
                    <Route
                        path={"profile"}
                        element={<ProfileClient categoryFilterReducer={categoryFilterReducer} storeInfoReducer={storeInfoReducer} tokenReducer={tokenReducer} userInfoReducer={userInfoReducer} />}
                    />
                    <Route
                        path={"orders"}
                        element={<Order categoryFilterReducer={categoryFilterReducer} storeInfoReducer={storeInfoReducer} tokenReducer={tokenReducer} userInfoReducer={userInfoReducer} />}
                    />
                    <Route
                        path={"order/:orderId"}
                        element={<OrderInfo categoryFilterReducer={categoryFilterReducer} storeInfoReducer={storeInfoReducer} tokenReducer={tokenReducer} userInfoReducer={userInfoReducer} />}
                    />
                </Route>
                <Route path="/seller" element={<Admin storeInfoReducer={storeInfoReducer} tokenReducer={tokenReducer} userInfoReducer={userInfoReducer} />}>
                    <Route path={"/seller/*"} element={<Navigate to={"/seller"} />} />
                    <Route path={"/seller"} exact element={<Dashboard sidebarCollapse={sidebarCollapse} darkModeReducer={darkModeReducer} tokenReducer={tokenReducer} />} />
                    <Route path={"/seller/dashboard"} exact element={<Dashboard sidebarCollapse={sidebarCollapse} darkModeReducer={darkModeReducer} tokenReducer={tokenReducer}/>} />
                    <Route path="login" element={<LoginSignup storeInfoReducer={storeInfoReducer} />} />
                    {userInfoReducer.role && isRoleExists(userInfoReducer.role, productEnumList) && (
                        <Route
                            path={"products"}
                            exact
                            element={
                                <React.Suspense fallback={"Loading..."}>
                                    <Products
                                        sidebarCollapse={sidebarCollapse}
                                        productBrandDDindexReducer={productBrandDDindexReducer}
                                        darkModeReducer={darkModeReducer}
                                        userInfoReducer={userInfoReducer}
                                        productCategoryNewReducer={productCategoryNewReducer}
                                        productCategoryDDindexReducer={productCategoryDDindexReducer}
                                        tokenReducer={tokenReducer}
                                    />
                                </React.Suspense>
                            }
                        />
                    )}

                    {userInfoReducer.role && isRoleExists(userInfoReducer.role, settingEnumList) && (
                        <Route
                            path={"setting"}
                            exact
                            element={
                                <React.Suspense fallback={"Loading..."}>
                                    <Setting tokenReducer={tokenReducer} darkModeReducer={darkModeReducer} userInfoReducer={userInfoReducer} sidebarCollapse={sidebarCollapse} />
                                </React.Suspense>
                            }
                        />
                    )}
                    {userInfoReducer.role && isRoleExists(userInfoReducer.role, vendorsEnumList) && (
                        <Route
                            path={"vendors"}
                            exact
                            element={
                                <React.Suspense fallback={"Loading..."}>
                                    <Venders sidebarCollapse={sidebarCollapse} darkModeReducer={darkModeReducer} userInfoReducer={userInfoReducer} tokenReducer={tokenReducer} />
                                </React.Suspense>
                            }
                        />
                    )}
                    {userInfoReducer.role && isRoleExists(userInfoReducer.role, subadminEnumList) && (
                        <Route
                            path={"subadmin"}
                            exact
                            element={
                                <React.Suspense fallback={"Loading..."}>
                                    <SubAdmin userInfoReducer={userInfoReducer} tokenReducer={tokenReducer} sidebarCollapse={sidebarCollapse} darkModeReducer={darkModeReducer} />
                                </React.Suspense>
                            }
                        />
                    )}
                    {userInfoReducer.role && isRoleExists(userInfoReducer.role, orderEnumList) && (
                        <Route
                            path={"orders"}
                            exact
                            element={
                                <React.Suspense fallback={"Loading..."}>
                                    <Orders sidebarCollapse={sidebarCollapse} userInfoReducer={userInfoReducer} tokenReducer={tokenReducer} />
                                </React.Suspense>
                            }
                        />
                    )}
                    {userInfoReducer.role && isRoleExists(userInfoReducer.role, couponEnumList) && (
                        <Route
                            path={"coupon"}
                            exact
                            element={
                                <React.Suspense fallback={"Loading..."}>
                                    <Coupons sidebarCollapse={sidebarCollapse} darkModeReducer={darkModeReducer} userInfoReducer={userInfoReducer} tokenReducer={tokenReducer} />
                                </React.Suspense>
                            }
                        />
                    )}
                    {userInfoReducer.role && isRoleExists(userInfoReducer.role, customerEnumList) && (
                        <Route
                            path={"customers"}
                            exact
                            element={
                                <React.Suspense fallback={"Loading..."}>
                                    <Customers sidebarCollapse={sidebarCollapse} darkModeReducer={darkModeReducer} userInfoReducer={userInfoReducer} tokenReducer={tokenReducer} />
                                </React.Suspense>
                            }
                        />
                    )}
                    {userInfoReducer.role && isRoleExists(userInfoReducer.role, reportEnumList) && (
                        <Route
                            path={"reports"}
                            exact
                            element={
                                <React.Suspense fallback={"Loading..."}>
                                    <Report tokenReducer={tokenReducer} sidebarCollapse={sidebarCollapse} userInfoReducer={userInfoReducer} />
                                </React.Suspense>
                            }
                        />
                    )}
                    {userInfoReducer.role && isRoleExists(userInfoReducer.role, financeEnumList) && (
                        <Route
                            path={"finance"}
                            exact
                            element={
                                <React.Suspense fallback={"Loading..."}>
                                    <Finance tokenReducer={tokenReducer} sidebarCollapse={sidebarCollapse} userInfoReducer={userInfoReducer} />
                                </React.Suspense>
                            }
                        />
                    )}
                    <Route
                        path={"profile"}
                        exact
                        element={
                            <React.Suspense fallback={"Loading..."}>
                                <Profile tokenReducer={tokenReducer} sidebarCollapse={sidebarCollapse} userInfoReducer={userInfoReducer} />
                            </React.Suspense>
                        }
                    />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
