import React from "react";
import SearchNav from "./SearchNav";
import { IconButton, Input } from "@chakra-ui/react";
import { BsCart } from "react-icons/bs";
import UserBtn from "./UserBtn";
import { useNavigate } from "react-router-dom";
import CategoryBar from "./CategoryBar";
const Navbar = ({ tokenReducer, userInfoReducer }) => {
    const navigate = useNavigate();
    return (
        <div className="fixed bg-white left-0 right-0 top-0 z-30">
            <div className="h-[53px] flex items-center justify-between lg:px-16 md:px-10">
                <div className="h-full overflow-hidden flex items-center justify-start space-x-4">
                    <img
                        src="/factorlogo.png"
                        alt=""
                        className="h-full"
                        onClick={() => {
                            tokenReducer ? navigate("/") : navigate("/login/");
                        }}
                    />
                    {tokenReducer && <SearchNav />}
                    <a
                        href="/admin/login/"
                        target="_blank"
                        className="border cursor-pointer rounded-full px-3 text-sm py-1 whitespace-nowrap transition-all duration-200 hover:bg-[#ff834f] hover:text-white text-[#A46A38] font-semibold bg-white border-[#A46A38]"
                    >
                        Become a seller
                    </a>
                </div>
                <div className=" hidden  md:inline-flex items-center space-x-3 pe-2">
                    {tokenReducer && (
                        <>
                            <IconButton
                                onClick={() => navigate("/cart")}
                                _hover={{ bg: "#fff1f1" }}
                                bgColor={"transparent"}
                                aria-label="Search database"
                                icon={<BsCart size={35} color="#A46A38" className="cursor-pointer p-2" />}
                            />
                            <UserBtn tokenReducer={tokenReducer} userInfoReducer={userInfoReducer} />
                        </>
                    )}
                </div>
            </div>
            {tokenReducer && (
                <div className="categoryBar-scrollbar bg-[#FF834F] md:hidden flex items-center sm:px-16 overflow-x-auto px-1 py-2 space-x-1">
                    <Input rounded={"md"} size={"sm"} placeholder="Search..." backgroundColor={"white"} />
                    <IconButton
                        size={"sm"}
                        onClick={() => navigate("/cart")}
                        _hover={{ bg: "#fff1f1" }}
                        bgColor={"transparent"}
                        aria-label="Search database"
                        icon={<BsCart size={35} color="blue" className="cursor-pointer p-2" />}
                    />
                    <UserBtn size={"sm"} tokenReducer={tokenReducer} userInfoReducer={userInfoReducer} />
                </div>
            )}
            {tokenReducer && (
                <div className="hidden h-7 categoryBar-scrollbar bg-[#FF834F] md:flex sm:px-16 overflow-x-auto">
                    <CategoryBar />
                </div>
            )}
        </div>
    );
};

export default Navbar;
