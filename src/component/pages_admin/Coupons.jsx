import React from "react";
import { useSelector } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import AllCoupons from "./Layout/coupons/AllCoupons";
import AddNewCoupon from "./Layout/coupons/AddNewCoupon";
import { couponEnumList, isRoleExists } from "../../utils/checkRole";

const Coupons = ({ sidebarCollapse, darkModeReducer, userInfoReducer, tokenReducer }) => {
    return (
        <div
            className={`${
                sidebarCollapse ? "ps-[50px]" : "ps-[250px]"
            } pt-[55px] transition-all duration-300 dark:bg-[#17191e] dark:text-white w-full h-full min-h-screen`}
        >
            <div className="px-3 py-1">
                <Tabs>
                    <TabList className="flex flex-wrap -mb-px text-sm font-medium text-center border-b dark:border-[#525355]">
                        {userInfoReducer.role &&
                            isRoleExists(userInfoReducer.role, [
                                "ADMIN",
                                "COUPON_ALL_COUPON",
                            ]) && (
                                <Tab
                                    selectedClassName="bg-teal-100 dark:bg-teal-800 bg-teal-100 border-b-2 border-blue-500"
                                    className="cursor-pointer px-4 py-2 rounded-t-lg outline-none"
                                >
                                    All Coupons
                                </Tab>
                            )}
                        {userInfoReducer.role &&
                            isRoleExists(userInfoReducer.role, [
                                "ADMIN",
                                "COUPON_ADD_NEW_COUPON",
                            ]) && (
                                <Tab
                                    selectedClassName="bg-teal-100 dark:bg-teal-800 bg-teal-100 border-b-2 border-blue-500"
                                    className="cursor-pointer px-4 py-2 rounded-t-lg outline-none"
                                >
                                    Add New Coupon
                                </Tab>
                            )}
                    </TabList>

                    {userInfoReducer.role &&
                        isRoleExists(userInfoReducer.role, [
                            "COUPON_ALL_COUPON",
                            "ADMIN",
                        ]) && (
                            <TabPanel className="mt-5">
                                <AllCoupons tokenReducer={tokenReducer} />
                            </TabPanel>
                        )}
                    {userInfoReducer.role &&
                        isRoleExists(userInfoReducer.role, [
                            "COUPON_ADD_NEW_COUPON",
                            "ADMIN",
                        ]) && (
                            <TabPanel className="mt-5">
                                <AddNewCoupon tokenReducer={tokenReducer} />
                            </TabPanel>
                        )}
                </Tabs>
            </div>
        </div>
    );
};

export default Coupons;
