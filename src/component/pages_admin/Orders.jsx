import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useSelector } from "react-redux";
import { isRoleExists } from "../../utils/checkRole";
import AbandonedOrders from "./Layout/orders/AbandonedOrders";
import AllOrders from "./Layout/orders/AllOrders";
import CancelledOrder from "./Layout/orders/CancelledOrder";

const Orders = ({ sidebarCollapse, userInfoReducer, tokenReducer }) => {
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
                                "VENDOR",
                                "ORDERS_ALL_ORDERS",
                            ]) && (
                                <>
                                    <Tab
                                        selectedClassName="bg-teal-100 dark:bg-teal-800 bg-teal-100 border-b-2 border-blue-500"
                                        className="cursor-pointer px-4 py-2 rounded-t-lg outline-none"
                                    >
                                        Orders
                                    </Tab>
                                    <Tab
                                        selectedClassName="bg-teal-100 dark:bg-teal-800 bg-teal-100 border-b-2 border-blue-500"
                                        className="cursor-pointer px-4 py-2 rounded-t-lg outline-none"
                                    >
                                        Cancelled Orders
                                    </Tab>
                                </>
                            )}
                        {userInfoReducer.role &&
                            isRoleExists(userInfoReducer.role, [
                                "ADMIN",
                                "ORDERS_ABANDONED_ORDERS",
                            ]) && (
                                <Tab
                                    selectedClassName="bg-teal-100 dark:bg-teal-800 bg-teal-100 border-b-2 border-blue-500"
                                    className="cursor-pointer px-4 py-2 rounded-t-lg outline-none"
                                >
                                    Abandoned Orders
                                </Tab>
                            )}
                    </TabList>
                    {userInfoReducer.role &&
                        isRoleExists(userInfoReducer.role, [
                            "ADMIN",
                            "VENDOR",
                            "ORDERS_ALL_ORDERS",
                        ]) && (
                            <>
                                <TabPanel className="mt-5">
                                    <AllOrders
                                        userInfoReducer={userInfoReducer}
                                        tokenReducer={tokenReducer}
                                    />
                                </TabPanel>
                                <TabPanel className="mt-5">
                                    <CancelledOrder
                                        userInfoReducer={userInfoReducer}
                                        tokenReducer={tokenReducer}
                                    />
                                </TabPanel>
                            </>
                        )}
                    {userInfoReducer.role &&
                        isRoleExists(userInfoReducer.role, [
                            "ADMIN",
                            "ORDERS_ABANDONED_ORDERS",
                        ]) && (
                            <TabPanel className="mt-5">
                                <AbandonedOrders tokenReducer={tokenReducer} />
                            </TabPanel>
                        )}
                </Tabs>
            </div>
        </div>
    );
};

export default Orders;
