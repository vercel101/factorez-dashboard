import React from "react";
import { CgClose } from "react-icons/cg";
function AbandonedOrderInfo({ tokenReducer, data, close }) {
    return (
        <div className="fixed select-none top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-[#00000066] z-20">
            <div className="flex flex-col items-center h-3/4 w-1/2 bg-white dark:bg-gray-500 border border-gray-400">
                <div className={`flex justify-between items-center w-full p-2 bg-yellow-300 dark:bg-black`}>
                    <span>Abandoned Order Information</span>
                    <CgClose className={`cursor-pointer`} onClick={() => close(false)} />
                </div>
                <div className={`h-full w-full overflow-y-scroll`}>Order Details</div>
            </div>
        </div>
    );
}

export default AbandonedOrderInfo;
