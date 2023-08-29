import React, { useState } from "react";
import { getOrdersByCustomerPhoneAPI } from "../../../../apis/adminApis";
import { isRoleExists } from "../../../../utils/checkRole";

function CustomerOrder({ tokenReducer, userInfoReducer }) {
    const [orders, setOrders] = useState([]);
    const [mobileNumber, setMobileNumber] = useState("");

    const getOrder = async () => {
        if (mobileNumber !== "" && mobileNumber.trim().length === 10) {
            await getOrdersByCustomerPhoneAPI(mobileNumber.trim(), tokenReducer)
                .then((res) => {
                    console.log(res.data.data);
                    setOrders(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            alert("please provide a valid mobile number");
        }
    };

    return (
        <div>
            <div className={`flex items-center dark:text-gray-400 mb-3`}>
                <span className={`me-1 text-sm`}>Find By Mobile:</span>
                <input
                    onChange={(e) => setMobileNumber(e.target.value)}
                    type="text"
                    className={`border px-2 py-1 text-sm rounded dark:text-white outline-none  dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`}
                />
                <button onClick={() => getOrder()} className={` bg-blue-500 ms-2 px-2 py-1 text-sm rounded text-white cursor-pointer`}>
                    Get Orders
                </button>
            </div>

            <table className={`w-full text-sm text-left text-gray-500 dark:text-gray-400`}>
                <thead className={`text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400`}>
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
                        <th scope="col" className="px-6 py-3">
                            Firm
                        </th>

                        <th scope="col" className="px-6 py-3">
                            Item Qty
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Amount
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 ? (
                        orders.map((el, i) => (
                            <tr key={el._id} className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`}>
                                <td className={`px-6 py-1`}>{i + 1}</td>
                                <th scope={`row`} className={`px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white`}>
                                    {el.orderId}
                                </th>
                                <td className={`px-6 py-1`}>{el.order_date}</td>
                                <td className={`px-6 py-1`}>{el.vendorId.firmName}</td>

                                <td className={`px-6 py-1`}>{el.ordered_products.products.length}</td>
                                <td className={`px-6 py-1`}>
                                    &#8377;{userInfoReducer.role && isRoleExists(userInfoReducer.role, ["ADMIN"]) ? el.grand_total : el.vendorAmtInfo.grandTotal}
                                </td>
                                <td className={`px-6 py-1`}>
                                    <div
                                        className={`border 
                                                flex p-1 rounded 
                                                justify-center 
                                                items-center text-center
                                                px-2
                                                ${
                                                    el.order_status_id.status === "PENDING"
                                                        ? "bg-gray-400 text-black border-0"
                                                        : el.order_status_id.status === "PARTIAL_CONFIRMED"
                                                        ? "bg-blue-400 text-white border-0"
                                                        : el.order_status_id.status === "CANCELLED"
                                                        ? "bg-red-600 text-white border-0"
                                                        : "bg-green-500 text-white border-0"
                                                }
                                                `}>
                                        {el.order_status_id.status.replace("_", " ")}
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>No record found...</tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default CustomerOrder;
