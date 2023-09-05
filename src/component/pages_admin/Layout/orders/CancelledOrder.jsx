import React from "react";
import { isRoleExists } from "../../../../utils/checkRole";
import { useState } from "react";
import { getAllCancelledOrderAPI } from "../../../../apis/adminApis";
import { useEffect } from "react";

const CancelledOrder = ({ tokenReducer, userInfoReducer }) => {
    const [orders, setOrders] = useState([]);
    const getAllCancelledOrder = async () => {
        await getAllCancelledOrderAPI(tokenReducer)
            .then((res) => {
                setOrders(res.data.data);
                console.log(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getAllCancelledOrder();
    }, []);

    return (
        <div>
            <table
                className={`w-full text-sm text-left text-gray-500 dark:text-gray-400`}
            >
                <thead
                    className={`text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400`}
                >
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            #
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Order ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Order Date
                        </th>
                        {userInfoReducer.role &&
                            isRoleExists(userInfoReducer.role, ["ADMIN"]) && (
                                <>
                                    <th scope="col" className="px-6 py-3">
                                        Firm
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Customer Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Phone
                                    </th>
                                </>
                            )}
                        <th scope="col" className="px-6 py-3">
                            Item Qty
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Amount
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Cancelled By
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 ? (
                        orders.map((el, i) => (
                            <tr
                                key={el._id}
                                className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`}
                            >
                                <td className={`px-6 py-1`}>{i + 1}</td>
                                <th
                                    scope={`row`}
                                    className={`px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white`}
                                >
                                    {el.orderId}
                                </th>
                                <td className={`px-6 py-1`}>{el.order_date}</td>
                                {userInfoReducer.role &&
                                    isRoleExists(userInfoReducer.role, [
                                        "ADMIN",
                                    ]) && (
                                        <>
                                            <td className={`px-6 py-1`}>
                                                {el.vendorId.firmName}
                                            </td>
                                            <td className={`px-6 py-1`}>
                                                {el.customer_id.name}
                                            </td>
                                            <td className={`px-6 py-1`}>
                                                {el.customer_id.phone}
                                            </td>
                                        </>
                                    )}
                                <td className={`px-6 py-1`}>
                                    {el.ordered_products.products.length}
                                </td>
                                <td className={`px-6 py-1`}>
                                    &#8377;
                                    {userInfoReducer.role &&
                                    isRoleExists(userInfoReducer.role, [
                                        "ADMIN",
                                    ])
                                        ? el.grand_total
                                        : el.vendorAmtInfo.grandTotal}
                                </td>
                                <td className={`px-6 py-1`}>
                                    {Object.keys(
                                        el.order_status_id.cancelled.userId
                                    )[0][0].toUpperCase() +
                                        Object.keys(
                                            el.order_status_id.cancelled.userId
                                        )[0].substring(1)}
                                </td>
                                <td className={`px-6 py-1`}>
                                    <div
                                        className={`border 
                                                flex p-1 rounded 
                                                justify-center 
                                                items-center text-center
                                                px-2
                                                ${
                                                    el.order_status_id
                                                        .status === "PENDING"
                                                        ? "bg-gray-400 text-black border-0"
                                                        : el.order_status_id
                                                              .status ===
                                                          "PARTIAL_CONFIRMED"
                                                        ? "bg-blue-400 text-white border-0"
                                                        : el.order_status_id
                                                              .status ===
                                                          "CANCELLED"
                                                        ? "bg-red-600 text-white border-0"
                                                        : "bg-green-500 text-white border-0"
                                                }
                                                `}
                                    >
                                        {el.order_status_id.status.replace(
                                            "_",
                                            " "
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} className="ps-4">No record found...</td>
                            
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default CancelledOrder;
