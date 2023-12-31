import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Homepage from "./Layout/Setting/Homepage";
import BusinessInfo from "./Layout/Setting/BusinessInfo";
import { isRoleExists } from "../../utils/checkRole";
const Setting = ({
    sidebarCollapse,
    userInfoReducer,
    darkModeReducer,
    tokenReducer,
}) => {
    return (
        <div
            className={`${
                sidebarCollapse ? "ps-[50px]" : "ps-[250px]"
            } pt-[55px] bg-[#fafbfe] transition-all duration-300 delay-300 dark:bg-[#17191e] dark:text-white w-full h-full min-h-screen`}
        >
            <div className="px-3 py-1">
                <Tabs>
                    <TabList className="flex flex-wrap -mb-px text-sm font-medium text-center border-b dark:border-[#525355]">
                        {userInfoReducer.role &&
                            isRoleExists(userInfoReducer.role, [
                                "ADMIN",
                                "SETTING_BUSINESS_INFO_SETTING",
                            ]) && (
                                <Tab
                                    selectedClassName="bg-teal-100 dark:bg-teal-800 bg-teal-100 border-b-2 border-blue-500"
                                    className="cursor-pointer px-4 py-2 rounded-t-lg outline-none"
                                >
                                    Business Info. Setting
                                </Tab>
                            )}
                        {userInfoReducer.role &&
                            isRoleExists(userInfoReducer.role, [
                                "ADMIN",
                                "SETTING_HOMEPAGE_SETTING",
                            ]) && (
                                <Tab
                                    selectedClassName="bg-teal-100 dark:bg-teal-800 bg-teal-100 border-b-2 border-blue-500"
                                    className="cursor-pointer px-4 py-2 rounded-t-lg outline-none"
                                >
                                    Homepage Setting
                                </Tab>
                            )}
                    </TabList>
                    {userInfoReducer.role &&
                        isRoleExists(userInfoReducer.role, [
                            "ADMIN",
                            "SETTING_BUSINESS_INFO_SETTING",
                        ]) && (
                            <TabPanel className="mt-5">
                                <BusinessInfo tokenReducer={tokenReducer} />
                            </TabPanel>
                        )}
                    {userInfoReducer.role &&
                        isRoleExists(userInfoReducer.role, [
                            "ADMIN",
                            "SETTING_HOMEPAGE_SETTING",
                        ]) && (
                            <TabPanel className="mt-5">
                                <Homepage tokenReducer={tokenReducer} />
                            </TabPanel>
                        )}
                </Tabs>
            </div>
        </div>
    );
};

export default Setting;
