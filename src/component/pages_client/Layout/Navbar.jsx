import React, { useEffect } from "react";
import SearchNav from "./SearchNav";
import { IconButton } from "@chakra-ui/react";
import { BsCart } from "react-icons/bs";
import UserBtn from "./UserBtn";
import { Link, useNavigate } from "react-router-dom";
import CategoryBar from "./CategoryBar";

const Navbar = ({ tokenReducer, userInfoReducer }) => {
    const navigate = useNavigate();
    let login = sessionStorage.getItem("token") !== null;
    return (
        <div className="fixed bg-white left-0 right-0 top-0 z-30">
            <div className="h-[53px] flex items-center justify-between lg:px-16 md:px-10">
                <div className="h-full overflow-hidden flex items-center justify-start space-x-4">
                    <img
                        src="/factorlogo.png"
                        alt=""
                        className="h-full"
                        onClick={() => {
                            login ? navigate("/") : navigate("/login/");
                        }}
                    />
                    {login && <SearchNav />}
                    <a
                        href="/admin/login/"
                        target="_blank"
                        className="border cursor-pointer rounded-full px-3 text-sm py-1 whitespace-nowrap transition-all duration-200 hover:bg-[#ff834f] hover:text-white text-[#A46A38] font-semibold bg-white border-[#A46A38]"
                    >
                        Become a seller
                    </a>
                </div>
                <div className=" inline-flex items-center space-x-3 pe-2">
                    {login && (
                        <>
                            <IconButton _hover={{ bg: "#fff1f1" }} bgColor={"transparent"} aria-label="Search database" icon={<BsCart size={35} color="#A46A38" className="cursor-pointer p-2" />} />
                            <UserBtn tokenReducer={tokenReducer} userInfoReducer={userInfoReducer} />
                        </>
                    )}
                </div>
            </div>
            {login && (
                <div className="h-7 categoryBar-scrollbar bg-[#FF834F] flex sm:px-16 overflow-x-auto">
                    <CategoryBar />
                </div>
            )}
        </div>
    );
};

export default Navbar;
