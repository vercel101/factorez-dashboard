import React, { useEffect, useState } from "react";
import { FiUserCheck, FiUser } from "react-icons/fi";
import { HiOutlineDocument, HiOutlineDocumentText } from "react-icons/hi";
import { dashboardDataApi } from "../../apis/adminApis";
import { FaHouseUser, FaRupeeSign } from "react-icons/fa";
import { MdCurrencyRupee, MdLocalGroceryStore, MdOutlineCalendarMonth } from "react-icons/md";
import { LiaCalendarWeekSolid, LiaSuitcaseRollingSolid } from "react-icons/lia";
import { FcSalesPerformance } from "react-icons/fc";
const Dashboard = ({ sidebarCollapse, darkModeReducer, tokenReducer }) => {
    const [dashboardData, setDashboardData] = useState(null);
    const getDashboardDataFn = async () => {
        console.log(tokenReducer);
        await dashboardDataApi(tokenReducer)
            .then((res) => {
                console.log(res.data);
                setDashboardData(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getDashboardDataFn();
    }, []);

    return (
        <div className={`${sidebarCollapse ? "ps-[50px]" : "ps-[250px]"} pt-[45px] transition-all duration-300 dark:bg-[#17191e] dark:text-white w-full h-full min-h-screen`}>
            <div className="p-4">
                <div className="grid grid-cols-4 gap-4">
                    <div className="h-[100px] rounded-md p-6 border">
                        <div className="flex text-blue-900 h-full justify-between items-center">
                            <div className="">
                                <h1 className="font-extrabold text-2xl">{dashboardData && dashboardData.customerCount}</h1>
                                <h5 className="font-semibold">Customers</h5>
                            </div>
                            <FiUser size={50} />
                        </div>
                    </div>
                    <div className="h-[100px] rounded-md p-6 border">
                        <div className="flex text-blue-900 h-full justify-between items-center">
                            <div className="">
                                <h1 className="font-extrabold text-2xl">{dashboardData && dashboardData.vendorCount}</h1>
                                <h5 className="font-semibold">Vendors</h5>
                            </div>
                            <FaHouseUser size={50} />
                        </div>
                    </div>
                    <div className="h-[100px] rounded-md p-6 border">
                        <div className="flex text-blue-900 h-full justify-between items-center">
                            <div className="">
                                <h1 className="font-extrabold text-2xl">{dashboardData && dashboardData.productCount}</h1>
                                <h5 className="font-semibold">Total Products</h5>
                            </div>
                            <MdLocalGroceryStore size={50} />
                        </div>
                    </div>
                    <div className="h-[100px] rounded-md p-6 border">
                        <div className="flex text-blue-900 h-full justify-between items-center">
                            <div className="">
                                <h1 className="font-extrabold text-2xl">{dashboardData && dashboardData.overallOrder}</h1>
                                <h5 className="font-semibold">Total orders</h5>
                            </div>
                            <LiaSuitcaseRollingSolid size={50} />
                        </div>
                    </div>
                    <div className="h-[100px] rounded-md p-6 bg-[#ff9f43]">
                        <div className="flex text-white h-full justify-between items-center">
                            <div className="text-white">
                                <h1 className="font-extrabold text-2xl">{dashboardData && dashboardData.todayOrderCount}</h1>
                                <h5 className="font-semibold">Todays orders</h5>
                            </div>
                            <MdOutlineCalendarMonth size={50} />
                        </div>
                    </div>
                    <div className="h-[100px] rounded-md p-6 bg-[#00cfe8]">
                        <div className="flex text-white h-full justify-between items-center">
                            <div className="text-white">
                                <h1 className="font-extrabold text-2xl">{dashboardData && dashboardData.thisWeakOrderCount}</h1>
                                <h5 className="font-semibold">This weak orders</h5>
                            </div>
                            <MdOutlineCalendarMonth size={50} />
                        </div>
                    </div>
                    <div className="h-[100px] rounded-md p-6 bg-[#1b2850]">
                        <div className="flex text-white h-full justify-between items-center">
                            <div className="text-white">
                                <h1 className="font-extrabold text-2xl">{dashboardData && dashboardData.thisMonthOrderCount}</h1>
                                <h5 className="font-semibold">This month orders</h5>
                            </div>
                            <MdOutlineCalendarMonth size={50} />
                        </div>
                    </div>
                    <div className="h-[100px] rounded-md p-6 bg-[#28c76f]">
                        <div className="flex text-white h-full justify-between items-center">
                            <div className="text-white">
                                <h1 className="font-extrabold text-2xl">{dashboardData && dashboardData.thisYearOrderCount}</h1>
                                <h5 className="font-semibold">This year orders</h5>
                            </div>
                            <MdOutlineCalendarMonth size={50} />
                        </div>
                    </div>
                    <div className="h-[100px] rounded-md p-6 border bg-[#4c5a84]">
                        <div className="flex text-white h-full justify-between items-center">
                            <div className="text-white">
                                <h1 className="font-extrabold text-2xl">{dashboardData && "₹ "+dashboardData.todaySale}</h1>
                                <h5 className="font-semibold">Today's sale</h5>
                            </div>
                            <FcSalesPerformance size={50} />
                        </div>
                    </div>
                    <div className="h-[100px] rounded-md p-6 border bg-[#1f4a26]">
                        <div className="flex text-white h-full justify-between items-center">
                            <div className="text-white">
                                <h1 className="font-extrabold text-2xl">{dashboardData && "₹ "+dashboardData.thisWeekSale}</h1>
                                <h5 className="font-semibold">This week sale</h5>
                            </div>
                            <FcSalesPerformance size={50} />
                        </div>
                    </div>
                    <div className="h-[100px] rounded-md p-6 border bg-[#401b68]">
                        <div className="flex text-white h-full justify-between items-center">
                            <div className="text-white">
                                <h1 className="font-extrabold text-2xl">{dashboardData && "₹ "+dashboardData.thisMonthSale}</h1>
                                <h5 className="font-semibold">This month sale</h5>
                            </div>
                            <FcSalesPerformance size={50} />
                        </div>
                    </div>
                    <div className="h-[100px] rounded-md p-6 border bg-[#5535e4]">
                        <div className="flex text-white h-full justify-between items-center">
                            <div className="text-white">
                                <h1 className="font-extrabold text-2xl">{dashboardData && "₹ "+dashboardData.thisYearSale}</h1>
                                <h5 className="font-semibold">This year sale</h5>
                            </div>
                            <FcSalesPerformance size={50} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
