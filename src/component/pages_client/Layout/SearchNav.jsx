import React from "react";
import { CiSearch } from "react-icons/ci";
const SearchNav = () => {
    return (
        <div className="relative hidden lg:flex md:flex w-full flex-nowrap items-stretch ">
            <input type="search" placeholder="Search..." className="border rounded-s-full outline-none w-40 md:w-44 lg:w-72 text-sm py-1 px-3 border-[#A46A38]" />
            <button type="button" className="border rounded-e-full px-3 border-s-0 bg-[#A46A38] border-[#A46A38]">
                <CiSearch color="white" size={20} />
            </button>
        </div>
    );
};

export default SearchNav;
