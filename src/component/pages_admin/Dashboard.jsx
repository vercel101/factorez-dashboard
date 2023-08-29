import React from "react";
import { useSelector } from "react-redux";
import { FiUserCheck, FiUser } from "react-icons/fi";
import { HiOutlineDocument, HiOutlineDocumentText } from "react-icons/hi";
const Dashboard = () => {
    const { sidebarCollapse, darkModeReducer } = useSelector((state) => state);
    return (
        <div
            className={`${
                sidebarCollapse ? "ps-[50px]" : "ps-[250px]"
            } pt-[45px] transition-all duration-300 dark:bg-[#17191e] dark:text-white w-full h-full min-h-screen`}>
            <div className="p-4">
                <div className="grid grid-cols-4 gap-4">
                    <div className="h-[100px] rounded-md p-6 border">
                        <div className="flex text-blue-900 h-full justify-between items-center">
                            <div className="">
                                <h1 className="font-extrabold text-2xl">100</h1>
                                <h5>Customers</h5>
                            </div>
                            <FiUser size={50} />
                        </div>
                    </div>
                    <div className="h-[100px] rounded-md p-6 border">
                        <div className="flex text-blue-900 h-full justify-between items-center">
                            <div className="">
                                <h1 className="font-extrabold text-2xl">100</h1>
                                <h5>Customers</h5>
                            </div>
                            <FiUser size={50} />
                        </div>
                    </div>
                    <div className="h-[100px] rounded-md p-6 border">
                        <div className="flex text-blue-900 h-full justify-between items-center">
                            <div className="">
                                <h1 className="font-extrabold text-2xl">100</h1>
                                <h5>Customers</h5>
                            </div>
                            <FiUser  size={50} />
                        </div>
                    </div>
                    <div className="h-[100px] rounded-md p-6 border">
                        <div className="flex text-blue-900 h-full justify-between items-center">
                            <div className="">
                                <h1 className="font-extrabold text-2xl">100</h1>
                                <h5>Customers</h5>
                            </div>
                            <FiUser size={50} />
                        </div>
                    </div>
                    <div className="h-[100px] rounded-md p-6 bg-[#ff9f43]">
                        <div className="flex text-white h-full justify-between items-center">
                            <div className="text-white">
                                <h1 className="font-extrabold text-2xl">100</h1>
                                <h5>Customers</h5>
                            </div>
                            <FiUser size={50} />
                        </div>
                    </div>
                    <div className="h-[100px] rounded-md p-6 bg-[#00cfe8]">
                        <div className="flex text-white h-full justify-between items-center">
                            <div className="text-white">
                                <h1 className="font-extrabold text-2xl">100</h1>
                                <h5>Suppliers</h5>
                            </div>
                            <FiUserCheck size={50} />
                        </div>
                    </div>
                    <div className="h-[100px] rounded-md p-6 bg-[#1b2850]">
                        <div className="flex text-white h-full justify-between items-center">
                            <div className="text-white">
                                <h1 className="font-extrabold text-2xl">100</h1>
                                <h5>Purchase Invoice</h5>
                            </div>
                            <HiOutlineDocumentText size={50} />
                        </div>
                    </div>
                    <div className="h-[100px] rounded-md p-6 bg-[#28c76f]">
                        <div className="flex text-white h-full justify-between items-center">
                            <div className="text-white">
                                <h1 className="font-extrabold text-2xl">100</h1>
                                <h5>Sales Invoice</h5>
                            </div>
                            <HiOutlineDocument size={50} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
