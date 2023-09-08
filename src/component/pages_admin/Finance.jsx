import React from "react";
import AllPayments from "./Layout/Finance/AllPayments";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
const Finance = ({ sidebarCollapse, userInfoReducer, tokenReducer }) => {
    return (
        <div className={`${sidebarCollapse ? "ps-[50px]" : "ps-[250px]"} pt-[55px] transition-all duration-300 dark:bg-[#17191e] dark:text-white w-full h-full min-h-screen`}>
            <div className="px-3 py-1">
                <Tabs>
                    <TabList className="flex flex-wrap -mb-px text-sm font-medium text-center border-b dark:border-[#525355]">
                        <Tab selectedClassName="bg-teal-100 dark:bg-teal-800 bg-teal-100 border-b-2 border-blue-500" className="cursor-pointer px-4 py-2 rounded-t-lg outline-none">
                            All Payment Record
                        </Tab>
                    </TabList>
                    <TabPanel className="mt-5">
                        <AllPayments tokenReducer={tokenReducer} sidebarCollapse={sidebarCollapse} userInfoReducer={userInfoReducer} />
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default Finance;
