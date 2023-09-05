import React, {Suspense, lazy, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Tab, Tabs, TabList, TabPanel} from "react-tabs";
import {isRoleExists} from "../../utils/checkRole";
import {roleEnums} from "../../utils/enums";

const Venders = ({sidebarCollapse, darkModeReducer, userInfoReducer, tokenReducer}) => {
    const AllVendors = lazy(() => import('./Layout/vendors/AllVendors'));
    useEffect(() => {
    }, []);
    return (
        <div
            className={`${
                sidebarCollapse ? "ps-[50px]" : "ps-[250px]"
            } pt-[55px] transition-all duration-300 dark:bg-[#17191e] dark:text-white w-full h-full min-h-screen`}
        >
            <div className="px-3 py-1">
                <Tabs>
                    <TabList
                        className="flex flex-wrap -mb-px text-sm font-medium text-center border-b dark:border-[#525355]">
                        {userInfoReducer.role && isRoleExists(userInfoReducer.role, ['ADMIN', 'VENDOR_ALL_VENDOR']) && (

                            <Tab
                                selectedClassName="bg-teal-100 dark:bg-teal-800 bg-teal-100 border-b-2 border-blue-500"
                                className="cursor-pointer px-4 py-2 rounded-t-lg outline-none"
                            >
                                All Vendors
                            </Tab>
                        )}
                        {userInfoReducer.role && isRoleExists(userInfoReducer.role, ['ADMIN', 'VENDOR_ADD_VENDOR']) && (

                            <Tab
                                selectedClassName="bg-teal-100 dark:bg-teal-800 bg-teal-100 border-b-2  border-blue-500"
                                className="cursor-pointer px-4 py-2  rounded-t-lg outline-none"
                            >
                                Add Vendor
                            </Tab>
                        )}
                    </TabList>
                    {userInfoReducer.role && isRoleExists(userInfoReducer.role, ['ADMIN', 'VENDOR_ALL_VENDOR']) && (
                        <TabPanel className="mt-5">
                            <Suspense fallback={"Loading..."}>
                                <AllVendors tokenReducer={tokenReducer}/>
                            </Suspense>
                        </TabPanel>
                    )}
                    {userInfoReducer.role && isRoleExists(userInfoReducer.role, ['ADMIN', 'VENDOR_ADD_VENDOR']) && (
                        <TabPanel className="mt-5">
                            <div className=" p-4 rounded-lg bg-[#F4F7F8] dark:bg-gray-800">
                                Add New Vendor
                            </div>
                        </TabPanel>
                    )}
                </Tabs>
            </div>
        </div>
    );
};

export default Venders;
