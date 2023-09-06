import React, { useEffect, useRef } from "react";
import { AiOutlineUser, AiOutlineCaretDown } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineSetting } from "react-icons/ai";
import { MdOutlineDarkMode, MdOutlineMenuOpen } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
    authTokenClear,
    darkModeFn,
    lightModeFn,
    sidebarCloseFn,
    sidebarOpenFn,
} from "../../../Redux/ReducerAction";
import { CiLight, CiSearch } from "react-icons/ci";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const { sidebarCollapse, darkModeReducer, userInfoReducer } = useSelector(
        (state) => state
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userDropDownFlag, setUserDropDownFlag] = useState(false);
    const currentRef = useRef(null);
    const collapsSidebarFn = () => {
        if (sidebarCollapse) {
            dispatch(sidebarOpenFn());
        } else {
            dispatch(sidebarCloseFn());
        }
    };

    const logoutBtn = () => {
        console.log("Log out button");
        if (window.confirm("Are you sure to Logout?")) {
            dispatch(authTokenClear());
            sessionStorage.clear();
            navigate("/admin/login");
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!currentRef?.current?.contains(event.target)) {
                setUserDropDownFlag(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
    }, [currentRef]);

    return (
        <div
            className={`fixed top-0 ${
                sidebarCollapse ? "ms-[50px]" : "ms-[250px]"
            } transition-all bg-white select-none h-[45px] duration-300 right-0 border-b left-0 flex dark:border-[#525355] dark:bg-[#232730] justify-between items-center px-2 py-1 z-20`}
        >
            <div className=" flex items-center">
                <MdOutlineMenuOpen
                    size={35}
                    className={`mx-2 cursor-pointer dark:text-white transition duration-1000 ${
                        sidebarCollapse && " -scale-x-100"
                    }`}
                    title="collapse"
                    onClick={() => collapsSidebarFn()}
                />

                {/*<div className="relative">*/}
                {/*    <input type="text" placeholder="Search..."*/}
                {/*           className="text-lg outline-none border rounded-full ps-3 pe-10 text-[#6c6cef]"/>*/}
                {/*    <CiSearch size={20} color="blue" className="absolute top-0 right-3 bottom-0 my-auto"/>*/}
                {/*</div>*/}
            </div>
            <div className="flex items-center">
                <HiOutlineMail
                    size={25}
                    className="mx-2 cursor-pointer dark:text-white"
                    title="Mail Box"
                />
                <IoMdNotificationsOutline
                    size={25}
                    className="mx-2 cursor-pointer dark:text-white"
                    title="Notifications"
                />
                <div>
                    {darkModeReducer ? (
                        <CiLight
                            size={25}
                            className="mx-2 cursor-pointer dark:text-white"
                            title="Dark Mode"
                            onClick={() => dispatch(lightModeFn())}
                        />
                    ) : (
                        <MdOutlineDarkMode
                            size={25}
                            className="mx-2 cursor-pointer"
                            title="Dark Mode"
                            onClick={() => dispatch(darkModeFn())}
                        />
                    )}
                </div>
                <div
                    className="flex items-center ms-2 cursor-pointer"
                    onClick={() => setUserDropDownFlag(!userDropDownFlag)}
                >
                    {userInfoReducer.photo ? (
                        <div className="bg-[#EDEAEA] rounded-md me-2 dark:bg-[#3d0f82]">
                            <img
                                src={userInfoReducer.photo}
                                className="h-8 w-8 rounded-md object-cover"
                            />
                        </div>
                    ) : (
                        <div className="bg-[#EDEAEA] p-1 rounded-md me-2 dark:bg-[#3d0f82]">
                            <AiOutlineUser
                                size={25}
                                className="dark:text-white"
                            />
                        </div>
                    )}
                    <div className="flex justify-center items-start flex-col">
                        <h1 className="font-extrabold text-base leading-none dark:text-white">
                            {userInfoReducer.name && userInfoReducer.name}
                        </h1>
                        <span className="text-sm leading-none dark:text-[#eee]">
                            {userInfoReducer.userType &&
                                userInfoReducer.userType}
                        </span>
                    </div>
                    <AiOutlineCaretDown
                        className="ms-2 dark:text-white"
                        size={20}
                    />
                </div>
                <div
                    ref={currentRef}
                    className={`${
                        !userDropDownFlag && "hidden"
                    } absolute w-[300px] min-h-[100px] top-11 right-2 bg-white dark:border-[#525355] dark:bg-[#232730] dark:text-white border rounded-md"`}
                >
                    <ul className={`p-4`}>
                        <Link
                            to="admin/profile"
                            className={`flex items-center ps-2 py-2 hover:bg-teal-100 hover:text-violet-600 dark:hover:bg-teal-700 dark:hover:text-yellow-400 rounded-md cursor-pointer`}
                        >
                            <AiOutlineUser />{" "}
                            <span className={`ms-2`}>Profile</span>
                        </Link>
                        <li
                            className={`flex items-center ps-2 py-2 hover:bg-teal-100 hover:text-violet-600 dark:hover:bg-teal-700 dark:hover:text-yellow-400  rounded-md cursor-pointer`}
                        >
                            <AiOutlineSetting />{" "}
                            <span className={`ms-2`}>Setting</span>
                        </li>
                    </ul>
                    <hr className={`dark:border-[#525355]`} />
                    <ul className={`p-4`}>
                        <li
                            className={`flex items-center ps-2 py-2 hover:bg-teal-100 hover:text-violet-600 dark:hover:bg-teal-700 dark:hover:text-yellow-400  rounded-md cursor-pointer`}
                            onClick={() => logoutBtn()}
                        >
                            <IoLogOutOutline />{" "}
                            <span className={`ms-2`}>Logout</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
