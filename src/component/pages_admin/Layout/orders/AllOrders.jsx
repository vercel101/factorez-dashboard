import React, { useEffect, useState } from "react";
import { getAllOrdersAPI, getAllQuestions, getOrderedProductAPI, patchTrackingIDByOrderId, updateOrderByOrderId } from "../../../../apis/adminApis";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { FaListCheck } from "react-icons/fa6";
import { GrClose } from "react-icons/gr";
import { GoDotFill } from "react-icons/go";
import OrderStatusModel from "./OrderStatusModel";
import { isRoleExists } from "../../../../utils/checkRole";

function AllOrders({ tokenReducer, userInfoReducer }) {
    const [orders, setOrders] = useState([]);
    const [listOfQuestion, setListOfQuestion] = useState([]);
    const [orderModelFlag, setOrderModelFlag] = useState(false);
    const [statusListFlag, setStatusListFlag] = useState(false);
    const [orderModelData, setOrderModelData] = useState({
        productInfo: "",
        orderInfo: "",
    });
    const fetchOrders = async () => {
        allQuestions();
        await getAllOrdersAPI(tokenReducer)
            .then((res) => {
                console.log(res.data);
                setOrders(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const orderedProduct = async (id) => {
        await getOrderedProductAPI(id, tokenReducer)
            .then((res) => {
                setOrderModelData((prevState) => {
                    return { ...prevState, productInfo: res.data.data };
                });
                setOrderModelFlag(true);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const allQuestions = async (id) => {
        await getAllQuestions(tokenReducer)
            .then((res) => {
                console.log(res.data);
                setListOfQuestion(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const updateOrder = async (orderId, orderType, cancelMessage, removedProductIdsOrQuestionId) => {
        let data = { orderType };
        if (orderType === "CANCEL") {
            data.cancelMessage = cancelMessage;
            data.questionId = removedProductIdsOrQuestionId;
        }
        if (orderType === "PARTIAL_CONFIRMED") {
            data.cancelMessage = cancelMessage;
            data.removedProductIds = removedProductIdsOrQuestionId;
        }
        await updateOrderByOrderId(orderId, data, tokenReducer)
            .then((res) => {
                console.log(res);
                fetchOrders();
                setOrderModelFlag(false);
                setOrderModelData(null);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const updateTrackingIdFn = async (orderid, trackingid) => {
        await patchTrackingIDByOrderId(orderid, trackingid, tokenReducer)
            .then((res) => {
                console.log(res.data);
                fetchOrders();
                return true;
            })
            .catch((err) => {
                console.error(err);
                return false;
            });
    };

    const orderManageFn = (data) => {
        setOrderModelData({
            productInfo: "",
            orderInfo: data,
        }); //ordered_products
        orderedProduct(data.ordered_products._id);

        // console.log(data);
    };
    const closeFn = (flag) => {
        setOrderModelFlag(flag);
        setOrderModelData(null);
    };

    useEffect(() => {
        fetchOrders().then();
    }, []);
    return (
        <div>
            {orderModelFlag && orderModelData !== null && (
                <OrderStatusModel
                    questions={listOfQuestion}
                    userInfoReducer={userInfoReducer}
                    updateOrder={updateOrder}
                    updatetrackingno={updateTrackingIdFn}
                    data={orderModelData}
                    close={closeFn}
                />
            )}
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
                        {userInfoReducer.role && isRoleExists(userInfoReducer.role, ["ADMIN"]) && (
                            <>
                                <th scope="col" className="px-6 py-3">
                                    Seller
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Buyer
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Buyer Phone
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Shipping Address
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
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((el, i) => (
                        <tr
                            key={el._id}
                            onClick={() => orderManageFn(el)}
                            className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`}>
                            <td className={`px-6 py-1`}>{i + 1}</td>
                            <th scope={`row`} className={`px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white`}>
                                {el.orderId}
                            </th>
                            <td className={`px-6 py-1`}>{el.order_date}</td>
                            {userInfoReducer.role && isRoleExists(userInfoReducer.role, ["ADMIN"]) && (
                                <>
                                    <td className={`px-6 py-1`}>{el.vendorId.firmName}</td>
                                    <td className={`px-6 py-1`}>{el.customer_id.name}</td>
                                    <td className={`px-6 py-1`}>{el.customer_id.phone}</td>
                                    <td className={`px-6 py-1`}>{el.shipping_address.address}</td>
                                </>
                            )}
                            <td className={`px-6 py-1`}>{el.ordered_products.products && el.ordered_products.products.length}</td>
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
                                                        ? "bg-gray-400 border-0 text-black"
                                                        : el.order_status_id.status === "PARTIAL_CONFIRMED"
                                                        ? "bg-blue-400 border-0 text-white"
                                                        : el.order_status_id.status === "CANCELLED"
                                                        ? "bg-red-600 text-white border-0"
                                                        : "bg-green-500 border-0 text-white"
                                                }
                                                `}>
                                    {el.order_status_id.status.replace("_", " ")}
                                </div>
                            </td>
                            <td>
                                <div className="flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                                    <FaListCheck size={30} onClick={() => setStatusListFlag(true)} className="hover:bg-teal-300 p-1 rounded cursor-pointer"/>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div
                className={`bg-white pt-12 z-10 dark:bg-neutral-800 dark:border-gray-700 border-s transition-transform h-screen w-96 fixed top-0 right-0 ${
                    !statusListFlag && "translate-x-full"
                }`}>
                <div className="flex items-center justify-between p-2">
                    <h1 className="font-bold text-2xl">Status List</h1>
                    <GrClose className="border cursor-pointer p-1 rounded-md hover:bg-teal-200" size={30} onClick={() => setStatusListFlag(false)} />
                </div>
                <div className="overflow-y-auto h-[calc(100vh_-_100px)] px-7 pt-4">
                    <ul>
                        <li className="py-5 border-s-4 ps-8 relative  min-h-[88px]">
                            <span className="absolute -top-3 -left-2 flex items-center space-x-2">
                                <span class="relative flex h-3 w-3">
                                    {/* <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span> */}
                                    <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                                </span>
                                <span>Ready For Dispatch</span>
                            </span>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, ut.
                        </li>
                        <li className="py-5 border-s-4 ps-8 relative  min-h-[88px]">
                            <span className="absolute -top-3 -left-2 flex items-center space-x-2">
                                <span class="relative flex h-3 w-3">
                                    {/* <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span> */}
                                    <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                                </span>
                                <span>Pickup Aligned</span>
                            </span>
                            {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, ut. */}
                        </li>
                        <li className="py-5 border-s-4 ps-8 relative  min-h-[88px]">
                            <span className="absolute -top-3 -left-2 flex items-center space-x-2">
                                <span class="relative flex h-3 w-3">
                                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                    <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                                </span>
                                <span>Pickup Done/Intransit</span>
                            </span>
                            {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, ut. */}
                        </li>
                        <li className="py-5 border-s-4 ps-8 relative min-h-[88px]">
                            <span className="absolute -top-3 -left-2 flex items-center space-x-2">
                                <span class="relative flex h-3 w-3">
                                    {/* <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span> */}
                                    <span class="relative inline-flex rounded-full h-3 w-3 bg-[#E5E7EB]"></span>
                                </span>
                                <span>Out for delivery</span>
                            </span>
                            {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, ut. */}
                        </li>
                        <li className="py-5 border-s-4 border-transparent ps-8 relative  min-h-[88px]">
                            <span className="absolute -top-3 -left-2 flex items-center space-x-2">
                                <span class="relative flex h-3 w-3">
                                    {/* <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span> */}
                                    <span class="relative inline-flex rounded-full h-3 w-3 bg-[#E5E7EB]"></span>
                                </span>
                                <span>Delivered</span>
                            </span>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, ut.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default AllOrders;
