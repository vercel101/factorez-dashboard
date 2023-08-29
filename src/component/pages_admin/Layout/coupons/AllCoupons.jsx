import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { deleteCouponsAPI, getAllCouponsAPI } from "../../../../apis/adminApis";
import { useSelector } from "react-redux";
import { localDate } from "../../../../utils/stringToLocalDate";
import { ToastContainer, toast } from 'react-toastify';
import CouponInfoModel from "./CouponInfoModel";



const AllCoupons = ({tokenReducer}) => {
    const [coupons, setCoupons] = useState([]);
    const [activeInfoModel, setActiveInfoModel] = useState(false);
    const [activeInfoModelData, setActiveInfoModelData] = useState(null);
    const getAllCoupon = async () => {
        getAllCouponsAPI(tokenReducer)
            .then((res) => {
                console.log(res.data);
                setCoupons(res.data.data);
                updateTable();
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const deleteCoupon = async (couponid) => {
        if (window.confirm("Do you want to delete the coupon?")) {
            await deleteCouponsAPI(couponid, tokenReducer)
                .then((res) => {
                    console.log(res.data);
                    toast.success(res.data.message);
                    getAllCoupon();
                })
                .catch((err) => {
                    toast.error('Something went wrong!')
                    console.log(err.message);
                });
        }
    };
    const activeInfo = (element) => {
        console.log(element);
        setActiveInfoModel(true);
        setActiveInfoModelData(element);
    }
    const activeInfoClose = () => {
        setActiveInfoModel(false);
        setActiveInfoModelData(null);
    }

    const updateTable = () => {
        return (
            <>
                {coupons.map((el, i) => (
                    <tr key={el._id} onClick={() => activeInfo(el)} className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`}>
                        <td className={`px-6 py-1`}>{i + 1}</td>
                        <th scope={`row`} className={`px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white`}>
                            {el.couponCode}
                        </th>
                        <td className={`px-6 py-1`}>{localDate(el.validTill)}</td>
                        <td className={`px-6 py-1`}>
                            <span className={`rounded-full px-2 ${el.isUsed ? "bg-red-600 text-white" : "border"}`}>{el.isUsed ? "Used" : "Not Used"}</span>
                        </td>
                        <td className={`px-6 py-1`}>{el.customer_id.length}</td>
                        <td className={`px-6 py-1`}>{el.maxUsers}</td>
                        <td className={`px-6 py-1`}>
                            <span className={`rounded-full px-2 ${el.isExpired ? "bg-red-600 text-white" : "border"}`}>{el.isExpired ? "Expired" : "Not Expired"}</span>
                        </td>
                        <td className={`px-6 py-1`}>Admin</td>
                        <td className={`px-6 py-1 text-right"`} onClick={(e) => e.stopPropagation()}>
                            <MdDelete size={20} className="cursor-pointer hover:text-red-600" onClick={() => deleteCoupon(el._id)} />
                        </td>
                    </tr>
                ))}
            </>
        );
    };

    useEffect(() => {
        getAllCoupon();
    }, []);
    return (
        <div>
            {activeInfoModel && <CouponInfoModel data={activeInfoModelData} close={activeInfoClose}/>}
            <table className={`w-full text-sm text-left text-gray-500 dark:text-gray-400`}>
                <thead className={`text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400`}>
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            #
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Coupon Code
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Expiry Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Used Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Total Uses
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Max use limit
                        </th>
                        <th scope="col" className="px-6 py-3">
                            status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Generated By
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Delete
                        </th>
                    </tr>
                </thead>
                <tbody>{updateTable()}</tbody>
            </table>
        </div>
    );
};

export default AllCoupons;
