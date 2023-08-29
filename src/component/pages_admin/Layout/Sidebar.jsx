import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { ImCart } from "react-icons/im";
import { BsShop, BsPeopleFill } from "react-icons/bs";
import { BiSolidCoupon } from "react-icons/bi";
import { LuLayoutDashboard } from "react-icons/lu";
import { RiAdminLine } from "react-icons/ri";
import { PiBagSimpleDuotone } from "react-icons/pi";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { FcSettings } from "react-icons/fc";
import { homepageEnumList, isRoleExists, productEnumList, vendorsEnumList } from "../../../utils/checkRole";
import { roleEnums } from "../../../utils/enums";

const Sidebar = () => {
    const { sidebarCollapse, userInfoReducer } = useSelector((state) => state);
    const dispatch = useDispatch();

    return (
        <div
            className={`${
                sidebarCollapse ? "w-[50px]" : "w-[250px]"
            } dark:bg-[#232730] dark:text-white transition-all duration-300 border-e dark:border-[#525355] fixed top-0 bottom-0 bg-white`}>
            <div className="font-extrabold text-[20px] flex justify-center items-center px-2 h-[45px] border-b dark:border-[#525355]">
                {sidebarCollapse ? (
                    <span className="text-blue-700">D</span>
                ) : (
                    <span>
                        BRAN<span className="text-blue-700">D</span>NAME
                    </span>
                )}
            </div>

            <div className="px-1 mt-1 max-h-[calc(100vh_-_50px)] overflow-y-scroll">
                <ul>
                    <li className="mb-3">
                        <NavLink
                            to={"admin/dashboard"}
                            className={({ isActive }) =>
                                isActive
                                    ? "dark:bg-[#6e056a] bg-[#eeeded] h-[35px] text-[#FF0000] font-semibold py-6 ps-3 rounded-md flex justify-start items-center"
                                    : " h-[35px] ps-3 rounded-md flex justify-start items-center font-semibold py-6"
                            }>
                            <AiFillHome size={15} />
                            {!sidebarCollapse && <span className="text-[16px] ms-2">Dashboard</span>}
                        </NavLink>
                    </li>
                    {userInfoReducer.role && isRoleExists(userInfoReducer.role, productEnumList) && (
                        <li className="mb-3">
                            <NavLink
                                to={"admin/products"}
                                className={({ isActive }) =>
                                    isActive
                                        ? "dark:bg-[#6e056a] bg-[#eeeded] h-[35px] text-[#FF0000] font-semibold py-6 ps-3 rounded-md flex justify-start items-center"
                                        : "ps-3 h-[35px] rounded-md flex justify-start items-center font-semibold py-6"
                                }>
                                <ImCart size={15} />
                                {!sidebarCollapse && <span className="text-[16px] ms-2">Products</span>}
                            </NavLink>
                        </li>
                    )}

                    {userInfoReducer.role && isRoleExists(userInfoReducer.role, ["ADMIN"]) && (
                        <li className="mb-3">
                            <NavLink
                                to={"admin/vendors"}
                                className={({ isActive }) =>
                                    isActive
                                        ? "dark:bg-[#6e056a] bg-[#eeeded] h-[35px] text-[#FF0000] font-semibold py-6 ps-3 rounded-md flex justify-start items-center"
                                        : "ps-3 h-[35px] rounded-md flex justify-start items-center font-semibold py-6"
                                }>
                                <BsShop size={15} />
                                {!sidebarCollapse && <span className="text-[16px] ms-2">Vendors</span>}
                            </NavLink>
                        </li>
                    )}
                    {userInfoReducer.role && isRoleExists(userInfoReducer.role, ["ADMIN"]) && (
                        <li className="mb-3">
                            <NavLink
                                to={"admin/subadmin"}
                                className={({ isActive }) =>
                                    isActive
                                        ? "dark:bg-[#6e056a] bg-[#eeeded] h-[35px] text-[#FF0000] font-semibold py-6 ps-3 rounded-md flex justify-start items-center"
                                        : "ps-3 h-[35px] rounded-md flex justify-start items-center font-semibold py-6"
                                }>
                                <RiAdminLine size={15} />
                                {!sidebarCollapse && <span className="text-[16px] ms-2">Sub Admin</span>}
                            </NavLink>
                        </li>
                    )}
                    {userInfoReducer.role && isRoleExists(userInfoReducer.role, vendorsEnumList) && (
                        <li className="mb-3">
                            <NavLink
                                to={"admin/orders"}
                                className={({ isActive }) =>
                                    isActive
                                        ? "dark:bg-[#6e056a] bg-[#eeeded] h-[35px] text-[#FF0000] font-semibold py-6 ps-3 rounded-md flex justify-start items-center"
                                        : "ps-3 h-[35px] rounded-md flex justify-start items-center font-semibold py-6"
                                }>
                                <PiBagSimpleDuotone size={15} />
                                {!sidebarCollapse && <span className="text-[16px] ms-2">Orders</span>}
                            </NavLink>
                        </li>
                    )}
                    {userInfoReducer.role && isRoleExists(userInfoReducer.role, ["ADMIN"]) && (
                        <li className="mb-3">
                            <NavLink
                                to={"admin/customers"}
                                className={({ isActive }) =>
                                    isActive
                                        ? "dark:bg-[#6e056a] bg-[#eeeded] h-[35px] text-[#FF0000] font-semibold py-6 ps-3 rounded-md flex justify-start items-center"
                                        : "ps-3 h-[35px] rounded-md flex justify-start items-center font-semibold py-6"
                                }>
                                <BsPeopleFill size={15} />
                                {!sidebarCollapse && <span className="text-[16px] ms-2">Customers</span>}
                            </NavLink>
                        </li>
                    )}
                    {userInfoReducer.role && isRoleExists(userInfoReducer.role, ["ADMIN"]) && (
                        <li className="mb-3">
                            <NavLink
                                to={"admin/coupon"}
                                className={({ isActive }) =>
                                    isActive
                                        ? "dark:bg-[#6e056a] bg-[#eeeded] h-[35px] text-[#FF0000] font-semibold py-6 ps-3 rounded-md flex justify-start items-center"
                                        : "ps-3 h-[35px] rounded-md flex justify-start items-center font-semibold py-6"
                                }>
                                <BiSolidCoupon size={15} />
                                {!sidebarCollapse && <span className="text-[16px] ms-2">Coupon</span>}
                            </NavLink>
                        </li>
                    )}
                    {userInfoReducer.role && isRoleExists(userInfoReducer.role, homepageEnumList) && (
                        <li className="mb-3">
                            <NavLink
                                to={"admin/setting"}
                                className={({ isActive }) =>
                                    isActive
                                        ? "dark:bg-[#6e056a] bg-[#eeeded] h-[35px] text-[#FF0000] font-semibold py-6 ps-3 rounded-md flex justify-start items-center"
                                        : "ps-3 h-[35px] rounded-md flex justify-start items-center font-semibold py-6"
                                }>
                                <FcSettings size={15} />
                                {!sidebarCollapse && <span className="text-[16px] ms-2">Setting</span>}
                            </NavLink>
                        </li>
                    )}
                    <hr />
                    <li className="my-3 ">
                        <NavLink
                            to={"admin/reports"}
                            className={({ isActive }) =>
                                isActive
                                    ? "dark:bg-[#6e056a] bg-[#eeeded] h-[35px] text-[#FF0000] font-semibold py-6 ps-3 rounded-md flex justify-start items-center"
                                    : "ps-3 h-[35px] rounded-md flex justify-start items-center font-semibold py-6"
                            }>
                            <HiOutlineDocumentReport size={15} />
                            {!sidebarCollapse && <span className="text-[16px] ms-2">Reports</span>}
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
