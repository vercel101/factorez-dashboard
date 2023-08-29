import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import VendorReport from "./Layout/Report/VendorReport";
import PurchaseInvoice from "./Layout/Report/PurchaseInvoice";
import SaleInvoice from "./Layout/Report/SaleInvoice";
import { isRoleExists } from "../../utils/checkRole";
const Report = ({ sidebarCollapse, tokenReducer, userInfoReducer }) => {
    return (
        <div className={`${sidebarCollapse ? "ps-[50px]" : "ps-[250px]"} pt-[55px] transition-all duration-300 dark:bg-[#17191e] dark:text-white w-full h-full min-h-screen`}>
            <div className="px-3 py-1">
                <Tabs>
                    <TabList className="flex flex-wrap -mb-px text-sm font-medium text-center border-b dark:border-[#525355]">
                        <Tab selectedClassName="bg-teal-100 dark:bg-teal-800 bg-teal-100 border-b-2 border-blue-500" className="cursor-pointer px-4 py-2 rounded-t-lg outline-none">
                            Vendor Report
                        </Tab>
                        {userInfoReducer.role && isRoleExists(userInfoReducer.role, ["ADMIN"]) && (
                            <Tab
                                selectedClassName="bg-teal-100 dark:bg-teal-800 bg-teal-100 border-b-2 border-blue-500"
                                className="cursor-pointer px-4 py-2 rounded-t-lg outline-none">
                                Customer Report
                            </Tab>
                        )}
                        <Tab selectedClassName="bg-teal-100 dark:bg-teal-800 bg-teal-100 border-b-2 border-blue-500" className="cursor-pointer px-4 py-2 rounded-t-lg outline-none">
                            Purchase Invoice
                        </Tab>
                        {userInfoReducer.role && isRoleExists(userInfoReducer.role, ["ADMIN"]) && (
                            <Tab
                                selectedClassName="bg-teal-100 dark:bg-teal-800 bg-teal-100 border-b-2 border-blue-500"
                                className="cursor-pointer px-4 py-2 rounded-t-lg outline-none">
                                Sale Invoice
                            </Tab>
                        )}
                    </TabList>
                    <TabPanel className="mt-5">
                        <VendorReport tokenReducer={tokenReducer} />
                    </TabPanel>
                    {userInfoReducer.role && isRoleExists(userInfoReducer.role, ["ADMIN"]) && <TabPanel className="mt-5">Customer Report</TabPanel>}
                    <TabPanel className="mt-5">
                        <PurchaseInvoice userInfoReducer={userInfoReducer} tokenReducer={tokenReducer} />
                    </TabPanel>
                    {userInfoReducer.role && isRoleExists(userInfoReducer.role, ["ADMIN"]) && (
                        <TabPanel className="mt-5">
                            <SaleInvoice tokenReducer={tokenReducer} />
                        </TabPanel>
                    )}
                </Tabs>
            </div>
        </div>
    );
};

export default Report;
