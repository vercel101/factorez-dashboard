import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { ImCart } from "react-icons/im";
import { BsShop, BsCashCoin, BsPeopleFill } from "react-icons/bs";
import { BiSolidCoupon } from "react-icons/bi";
import { LuLayoutDashboard } from "react-icons/lu";
import { RiAdminLine } from "react-icons/ri";
import { PiBagSimpleDuotone } from "react-icons/pi";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { FcSettings } from "react-icons/fc";
import { couponEnumList, customerEnumList, financeEnumList, isRoleExists, orderEnumList, productEnumList, reportEnumList, settingEnumList, subadminEnumList, vendorsEnumList } from "../../../utils/checkRole";

const Sidebar = () => {
    const { sidebarCollapse, userInfoReducer } = useSelector((state) => state);
    const dispatch = useDispatch();

    return (
        <div className={`${sidebarCollapse ? "w-[50px]" : "w-[250px]"} dark:bg-[#232730] dark:text-white transition-all duration-300 border-e dark:border-[#525355] fixed top-0 bottom-0 bg-white`}>
            <div className="font-extrabold text-[20px] flex justify-center items-center px-2 h-[45px] border-b dark:border-[#525355]">
                <Link to={"/admin"}>
                    {sidebarCollapse ? (
                        <img src={require("../../../assets/factorlogosmall.png")} alt="FactorEz" width={"20px"} />
                    ) : (
                        <img src={require("../../../assets/factorlogo.png")} alt="FactorEz" width={"150px"} />
                    )}
                </Link>
            </div>

            <div className="px-1 mt-1 max-h-[calc(100vh_-_50px)] overflow-y-auto">
                <ul>
                    <li className="my-2">
                        <NavLink
                            to={"dashboard"}
                            className={({ isActive }) =>
                                isActive
                                    ? "dark:bg-[#6e056a] bg-[#eeeded] h-[35px] text-[#FF0000] font-semibold py-6 ps-3 rounded-md flex justify-start items-center"
                                    : " h-[35px] ps-3 rounded-md flex justify-start items-center font-semibold py-6"
                            }
                        >
                            <AiFillHome size={15} />
                            {!sidebarCollapse && <span className="text-[16px] ms-2">Dashboard</span>}
                        </NavLink>
                    </li>
                    {userInfoReducer.role && isRoleExists(userInfoReducer.role, productEnumList) && (
                        <li className="mb-2">
                            <NavLink
                                to={"products"}
                                className={({ isActive }) =>
                                    isActive
                                        ? "dark:bg-[#6e056a] bg-[#eeeded] h-[35px] text-[#FF0000] font-semibold py-6 ps-3 rounded-md flex justify-start items-center"
                                        : "ps-3 h-[35px] rounded-md flex justify-start items-center font-semibold py-6"
                                }
                            >
                                <ImCart size={15} />
                                {!sidebarCollapse && <span className="text-[16px] ms-2">Products</span>}
                            </NavLink>
                        </li>
                    )}

                    {userInfoReducer.role && isRoleExists(userInfoReducer.role, vendorsEnumList) && (
                        <li className="mb-2">
                            <NavLink
                                to={"vendors"}
                                className={({ isActive }) =>
                                    isActive
                                        ? "dark:bg-[#6e056a] bg-[#eeeded] h-[35px] text-[#FF0000] font-semibold py-6 ps-3 rounded-md flex justify-start items-center"
                                        : "ps-3 h-[35px] rounded-md flex justify-start items-center font-semibold py-6"
                                }
                            >
                                <BsShop size={15} />
                                {!sidebarCollapse && <span className="text-[16px] ms-2">Vendors</span>}
                            </NavLink>
                        </li>
                    )}
                    {userInfoReducer.role && isRoleExists(userInfoReducer.role, subadminEnumList) && (
                        <li className="mb-2">
                            <NavLink
                                to={"subadmin"}
                                className={({ isActive }) =>
                                    isActive
                                        ? "dark:bg-[#6e056a] bg-[#eeeded] h-[35px] text-[#FF0000] font-semibold py-6 ps-3 rounded-md flex justify-start items-center"
                                        : "ps-3 h-[35px] rounded-md flex justify-start items-center font-semibold py-6"
                                }
                            >
                                <RiAdminLine size={15} />
                                {!sidebarCollapse && <span className="text-[16px] ms-2">Sub Admin</span>}
                            </NavLink>
                        </li>
                    )}
                    {userInfoReducer.role && isRoleExists(userInfoReducer.role, orderEnumList) && (
                        <li className="mb-2">
                            <NavLink
                                to={"orders"}
                                className={({ isActive }) =>
                                    isActive
                                        ? "dark:bg-[#6e056a] bg-[#eeeded] h-[35px] text-[#FF0000] font-semibold py-6 ps-3 rounded-md flex justify-start items-center"
                                        : "ps-3 h-[35px] rounded-md flex justify-start items-center font-semibold py-6"
                                }
                            >
                                <PiBagSimpleDuotone size={15} />
                                {!sidebarCollapse && <span className="text-[16px] ms-2">Orders</span>}
                            </NavLink>
                        </li>
                    )}
                    {userInfoReducer.role && isRoleExists(userInfoReducer.role, customerEnumList) && (
                        <li className="mb-2">
                            <NavLink
                                to={"customers"}
                                className={({ isActive }) =>
                                    isActive
                                        ? "dark:bg-[#6e056a] bg-[#eeeded] h-[35px] text-[#FF0000] font-semibold py-6 ps-3 rounded-md flex justify-start items-center"
                                        : "ps-3 h-[35px] rounded-md flex justify-start items-center font-semibold py-6"
                                }
                            >
                                <BsPeopleFill size={15} />
                                {!sidebarCollapse && <span className="text-[16px] ms-2">Customers</span>}
                            </NavLink>
                        </li>
                    )}
                    {userInfoReducer.role && isRoleExists(userInfoReducer.role, couponEnumList) && (
                        <li className="mb-2">
                            <NavLink
                                to={"coupon"}
                                className={({ isActive }) =>
                                    isActive
                                        ? "dark:bg-[#6e056a] bg-[#eeeded] h-[35px] text-[#FF0000] font-semibold py-6 ps-3 rounded-md flex justify-start items-center"
                                        : "ps-3 h-[35px] rounded-md flex justify-start items-center font-semibold py-6"
                                }
                            >
                                <BiSolidCoupon size={15} />
                                {!sidebarCollapse && <span className="text-[16px] ms-2">Coupon</span>}
                            </NavLink>
                        </li>
                    )}
                    {userInfoReducer.role && isRoleExists(userInfoReducer.role, settingEnumList) && (
                        <li className="mb-2">
                            <NavLink
                                to={"setting"}
                                className={({ isActive }) =>
                                    isActive
                                        ? "dark:bg-[#6e056a] bg-[#eeeded] h-[35px] text-[#FF0000] font-semibold py-6 ps-3 rounded-md flex justify-start items-center"
                                        : "ps-3 h-[35px] rounded-md flex justify-start items-center font-semibold py-6"
                                }
                            >
                                <FcSettings size={15} />
                                {!sidebarCollapse && <span className="text-[16px] ms-2">Setting</span>}
                            </NavLink>
                        </li>
                    )}
                    <hr />
                    {userInfoReducer.role && isRoleExists(userInfoReducer.role, reportEnumList) && (
                        <li className="my-2">
                            <NavLink
                                to={"reports"}
                                className={({ isActive }) =>
                                    isActive
                                        ? "dark:bg-[#6e056a] bg-[#eeeded] h-[35px] text-[#FF0000] font-semibold py-6 ps-3 rounded-md flex justify-start items-center"
                                        : "ps-3 h-[35px] rounded-md flex justify-start items-center font-semibold py-6"
                                }
                            >
                                <HiOutlineDocumentReport size={15} />
                                {!sidebarCollapse && <span className="text-[16px] ms-2">Reports</span>}
                            </NavLink>
                        </li>
                    )}
                    {userInfoReducer.role && isRoleExists(userInfoReducer.role, financeEnumList) && (
                        <li className="mb-2">
                            <NavLink
                                to={"finance"}
                                className={({ isActive }) =>
                                    isActive
                                        ? "dark:bg-[#6e056a] bg-[#eeeded] h-[35px] text-[#FF0000] font-semibold py-6 ps-3 rounded-md flex justify-start items-center"
                                        : "ps-3 h-[35px] rounded-md flex justify-start items-center font-semibold py-6"
                                }
                            >
                                <BsCashCoin size={15} />
                                {!sidebarCollapse && <span className="text-[16px] ms-2">Finance</span>}
                            </NavLink>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
