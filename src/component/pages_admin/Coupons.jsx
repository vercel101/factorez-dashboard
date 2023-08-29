import React from "react";
import { useSelector } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import AllCoupons from "./Layout/coupons/AllCoupons";
import AddNewCoupon from "./Layout/coupons/AddNewCoupon";

const Coupons = () => {
    const { sidebarCollapse, darkModeReducer, userInfoReducer, tokenReducer } = useSelector((state) => state);
    return (
        <div
            className={`${
                sidebarCollapse ? "ps-[50px]" : "ps-[250px]"
            } pt-[55px] transition-all duration-300 dark:bg-[#17191e] dark:text-white w-full h-full min-h-screen`}>
            <div className="px-3 py-1">
                <Tabs>
                    <TabList className="flex flex-wrap -mb-px text-sm font-medium text-center border-b dark:border-[#525355]">
                        <Tab selectedClassName="bg-teal-100 dark:bg-teal-800 bg-teal-100 border-b-2 border-blue-500" className="cursor-pointer px-4 py-2 rounded-t-lg outline-none">
                            All Coupons
                        </Tab>
                        <Tab selectedClassName="bg-teal-100 dark:bg-teal-800 bg-teal-100 border-b-2 border-blue-500" className="cursor-pointer px-4 py-2 rounded-t-lg outline-none">
                            Add New Coupon
                        </Tab>
                    </TabList>

                    <TabPanel className="mt-5">
                        <AllCoupons tokenReducer={tokenReducer}/>
                    </TabPanel>
                    <TabPanel className="mt-5">
                        <AddNewCoupon tokenReducer={tokenReducer}/>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default Coupons;
