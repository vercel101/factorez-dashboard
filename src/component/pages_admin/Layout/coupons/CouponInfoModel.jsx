import React from "react";
import { MdClose } from "react-icons/md";
import { localDate } from "../../../../utils/stringToLocalDate";
const CouponInfoModel = ({ data, close }) => {
    return (
        <div className={`fixed z-20 top-0 left-0 right-0 bottom-0 bg-[#00000043] `}>
            <div className={`w-1/4 bg-white dark:bg-slate-600 mt-16 absolute m-auto right-0 left-0 rounded border-2 border-red-400 dark:border-blue-600`}>
                <div className="w-full px-2 bg-red-400 dark:bg-blue-600 text-white flex items-center justify-between">
                    <span>Coupon Code Information</span>

                    <MdClose className="bg-transparent hover:bg-teal-200 hover:text-black cursor-pointer " onClick={() => close()} />
                </div>
                <div className="p-2">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="border dark:border-teal-600/70 border-teal-600/20 p-1">
                            <span>Coupon Code : </span>
                            <span>{data.couponCode}</span>
                        </div>
                        <div className="border dark:border-teal-600/70 border-teal-600/20 p-1">
                            <span>Expiry Date : </span>
                            <span>{localDate(data.validTill)}</span>
                        </div>
                        <div className="border dark:border-teal-600/70 border-teal-600/20 p-1">
                            <span>Total Uses : </span>
                            <span>{data.customer_id.length}</span>
                        </div>
                        <div className="border dark:border-teal-600/70 border-teal-600/20 p-1">
                            <span>Max Limit : </span>
                            <span>{data.maxUsers}</span>
                        </div>
                        <div className="border dark:border-teal-600/70 border-teal-600/20 p-1">
                            <span>Disc.Type : </span>
                            <span>{data.discountType}</span>
                        </div>
                        <div className="border dark:border-teal-600/70 border-teal-600/20 p-1">
                            <span>Disc.Value : </span>
                            <span>{data.discountAmt}</span>
                        </div>
                        {data.discountType === "PERCENTAGE" && (
                            <div className="border dark:border-teal-600/70 border-teal-600/20 p-1">
                                <span>Max Disc.Price : </span>
                                <span>{data.maxDiscPrice}</span>
                            </div>
                        )}
                    </div>
                    <div className="mt-2  max-h-[300px] overflow-y-scroll">
                        <table className={`w-full text-xs text-left text-gray-500 dark:text-gray-400`}>
                            <thead className={`text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400`}>
                                <tr>
                                    <th scope="col" className="">
                                        #
                                    </th>
                                    <th scope="col" className="">
                                        Customer Name
                                    </th>
                                    <th scope="col" className="">
                                        Phone No.
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.customer_id.length > 0 ? (
                                    data.customer_id.map((el, i) => (
                                        <tr key={el._id} className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`}>
                                            <td>{i + 1}</td>
                                            <td>{el.name}</td>
                                            <td>{el.phone}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={3}>This coupon has not used yet!</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CouponInfoModel;
