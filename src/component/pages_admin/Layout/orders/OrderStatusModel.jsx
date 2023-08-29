import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { MdCancel, MdDoneAll, MdOutlineCancel, MdPlaylistAddCheck } from "react-icons/md";
import { isRoleExists } from "../../../../utils/checkRole";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const OrderStatusModel = ({ data, close, updatetrackingno, userInfoReducer, updateOrder, questions }) => {
    const [removedProductIds, setRemovedProductIds] = useState([]);
    const [trackingId, setTrackingId] = useState(data.orderInfo.tracking_id);
    const [updateOption, setUpdateOption] = useState("");
    const [cancelMessage, setCancelMessage] = useState("");
    const [questionId, setQuestionId] = useState(null);
    const options = document.querySelectorAll("li");
    console.log(data);
    for (let i = 0; i < options.length; i++) {
        options[i].onclick = () => {
            document.activeElement.blur();
        };
    }
    const changeOption = (value) => {
        setUpdateOption((old) => value);
    };

    const removeProductFromOrder = (id) => {
        setUpdateOption((old) => "");
        setQuestionId(null);
        setRemovedProductIds((oldState) => {
            let arr = [...oldState];
            let index = arr.findIndex((el) => {
                return el === id;
            });
            if (index >= 0) {
                arr.splice(index, 1);
            } else {
                arr.push(id);
            }
            return arr;
        });
    };
    const updateTrackingIdFn = async () => {
        if (trackingId === null) {
            alert("Tracking id required");
        } else {
            let x = await updatetrackingno(data.orderInfo.orderId, trackingId);
            if (x) {
                alert("Tracking ID Added");
            } else {
                alert("Something went wrong!");
            }
        }
    };

    const updateOrderFn = () => {
        if (updateOption === "") {
            close(false);
        } else if (updateOption === "CANCEL" || updateOption === "PARTIAL_CONFIRMED") {
            if (cancelMessage === "") {
                toast.warning("Please provide a product cancel reasone");
            } else if (updateOption === "PARTIAL_CONFIRMED") {
                toast.success("partial cancel ok");
                updateOrder(data.orderInfo.orderId, updateOption, cancelMessage, removedProductIds);
            } else if (questionId !== null) {
                toast.success("cancel ok");
                updateOrder(data.orderInfo.orderId, updateOption, cancelMessage, questionId);
            } else {
                toast.warning("Please select a reason");
            }
        } else {
            updateOrder(data.orderInfo.orderId, updateOption);
        }
    };

    return (
        <div className="fixed select-none top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-[#00000066] z-20">
            <div className="flex flex-col items-center h-3/2 max-h-[80%] w-1/2 bg-white dark:bg-gray-500 border border-gray-400">
                <div className={`flex justify-between items-center w-full p-2 bg-teal-300 dark:bg-black`}>
                    <span className="font-bold text-blue-700">Manage Order</span>
                    <CgClose className={`cursor-pointer bg-[#4b4bf6] text-white p-1 hover:bg-red-400 rounded`} size={25} onClick={() => close(false)} />
                </div>
                <div className={`h-full w-full overflow-y-scroll p-1`}>
                    {data && (
                        <>
                            {userInfoReducer.role && isRoleExists(userInfoReducer.role, ["ADMIN"]) ? (
                                <div className="grid gap-2 gap-y-3 grid-cols-4 my-2 text-sm">
                                    <div className="border dark:border-gray-400  relative p-2 ps-2">
                                        <div>{data.orderInfo.orderId}</div>
                                        <span className="absolute font-bold top-[-9px] left-2 text-gray-400 dark:text-blue-200 bg-white dark:bg-gray-500 px-1 text-xs ">
                                            Order ID
                                        </span>
                                    </div>
                                    <div className="border dark:border-gray-400 relative p-2 ps-2">
                                        <div>{data.orderInfo.order_date}</div>
                                        <span className="absolute font-bold top-[-9px] left-2 text-gray-400 dark:text-blue-200 bg-white dark:bg-gray-500 px-1 text-xs ">
                                            Order Date
                                        </span>
                                    </div>
                                    <div className="border dark:border-gray-400 bg-yellow-50 relative p-2 ps-2">
                                        <div className="font-bold">{data.orderInfo.order_status_id.status.replace("_", " ")}</div>
                                        <span className="absolute font-bold top-[-9px] left-2 text-gray-400 dark:text-blue-200 bg-white dark:bg-gray-500 px-1 text-xs ">
                                            Order Status
                                        </span>
                                    </div>
                                    <div className="border dark:border-gray-400  relative p-2 ps-2">
                                        <div>₹&nbsp;{data.orderInfo.total.toFixed(2)}</div>
                                        <span className="absolute font-bold top-[-9px] left-2 text-gray-400 dark:text-blue-200 bg-white dark:bg-gray-500 px-1 text-xs ">
                                            Order Amount
                                        </span>
                                    </div>

                                    <div className="border dark:border-gray-400  relative p-2 ps-2">
                                        <div>₹&nbsp;{data.orderInfo.GST_amount.toFixed(2)}</div>
                                        <span className="absolute font-bold top-[-9px] left-2 text-gray-400 dark:text-blue-200 bg-white dark:bg-gray-500 px-1 text-xs ">
                                            GST Amount
                                        </span>
                                    </div>
                                    <div className="border dark:border-gray-400 bg-yellow-50  relative p-2 ps-2">
                                        <div className="font-bold text-blue-900">₹&nbsp;{data.orderInfo.grand_total.toFixed(2)}</div>
                                        <span className="absolute font-bold top-[-9px] left-2 text-gray-400 dark:text-blue-200 bg-white dark:bg-gray-500 px-1 text-xs ">
                                            Grand Total
                                        </span>
                                    </div>
                                    {data.orderInfo.discounted_amount && (
                                        <div className="border dark:border-gray-400  relative p-2 ps-2">
                                            <div>₹&nbsp;{data.orderInfo.discounted_amount.toFixed(2)}</div>
                                            <span className="absolute font-bold top-[-9px] left-2 text-gray-400 dark:text-blue-200 bg-white dark:bg-gray-500 px-1 text-xs ">
                                                Discounted Amount
                                            </span>
                                        </div>
                                    )}
                                    <div className="border dark:border-gray-400  relative p-2 ps-2">
                                        <div>{data.orderInfo.vendorId.firmName}</div>
                                        <span className="absolute font-bold top-[-9px] left-2 text-gray-400 dark:text-blue-200 bg-white dark:bg-gray-500 px-1 text-xs ">Firm</span>
                                    </div>
                                    <div className="border dark:border-gray-400  relative p-2 ps-2">
                                        <div>{data.orderInfo.vendorId.representativeName}</div>
                                        <span className="absolute font-bold top-[-9px] left-2 text-gray-400 dark:text-blue-200 bg-white dark:bg-gray-500 px-1 text-xs ">
                                            Firm Representator
                                        </span>
                                    </div>
                                    <div className="border dark:border-gray-400  relative p-2 ps-2">
                                        <div>{data.orderInfo.customer_id.name}</div>
                                        <span className="absolute font-bold top-[-9px] left-2 text-gray-400 dark:text-blue-200 bg-white dark:bg-gray-500 px-1 text-xs ">
                                            Customer Name
                                        </span>
                                    </div>
                                    <div className="border dark:border-gray-400  relative p-2 ps-2">
                                        <div>{data.orderInfo.customer_id.phone}</div>
                                        <span className="absolute font-bold top-[-9px] left-2 text-gray-400 dark:text-blue-200 bg-white dark:bg-gray-500 px-1 text-xs ">
                                            Customer Mobile No.
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid gap-2 gap-y-3 grid-cols-4 my-2 text-sm">
                                    <div className="border dark:border-gray-400  relative p-2 ps-2">
                                        <div>{data.orderInfo.orderId}</div>
                                        <span className="absolute font-bold top-[-9px] left-2 text-gray-400 dark:text-blue-200 bg-white dark:bg-gray-500 px-1 text-xs ">
                                            Order ID
                                        </span>
                                    </div>
                                    <div className="border dark:border-gray-400 relative p-2 ps-2">
                                        <div>{data.orderInfo.order_date}</div>
                                        <span className="absolute font-bold top-[-9px] left-2 text-gray-400 dark:text-blue-200 bg-white dark:bg-gray-500 px-1 text-xs ">
                                            Order Date
                                        </span>
                                    </div>
                                    <div className="border dark:border-gray-400 bg-yellow-50 relative p-2 ps-2">
                                        <div className="font-bold">{data.orderInfo.order_status_id.status.replace("_", " ")}</div>
                                        <span className="absolute font-bold top-[-9px] left-2 text-gray-400 dark:text-blue-200 bg-white dark:bg-gray-500 px-1 text-xs ">
                                            Order Status
                                        </span>
                                    </div>
                                    <div className="border dark:border-gray-400  relative p-2 ps-2">
                                        <div>₹&nbsp;{data.orderInfo.vendorAmtInfo.total}</div>
                                        <span className="absolute font-bold top-[-9px] left-2 text-gray-400 dark:text-blue-200 bg-white dark:bg-gray-500 px-1 text-xs ">
                                            Order Amount
                                        </span>
                                    </div>

                                    <div className="border dark:border-gray-400  relative p-2 ps-2">
                                        <div>₹&nbsp;{data.orderInfo.vendorAmtInfo.gstAmt.toFixed(2)}</div>
                                        <span className="absolute font-bold top-[-9px] left-2 text-gray-400 dark:text-blue-200 bg-white dark:bg-gray-500 px-1 text-xs ">
                                            GST Amount
                                        </span>
                                    </div>
                                    <div className="border dark:border-gray-400 bg-yellow-50 relative p-2 ps-2">
                                        <div className="font-bold text-blue-900">₹&nbsp;{data.orderInfo.vendorAmtInfo.grandTotal.toFixed(2)}</div>
                                        <span className="absolute font-bold top-[-9px] left-2 text-gray-400 dark:text-blue-200 bg-white dark:bg-gray-500 px-1 text-xs ">
                                            Grand Total
                                        </span>
                                    </div>
                                </div>
                            )}

                            {userInfoReducer.role && isRoleExists(userInfoReducer.role, ["ADMIN"]) && data.orderInfo.order_status_id.status !== "PENDING" && (
                                <div className="grid gap-2 gap-y-3 grid-cols-3 my-4 text-sm">
                                    <div className="border dark:border-gray-400  relative p-2 ps-2">
                                        <input
                                            type="text"
                                            className="bg-transparent outline-none w-full"
                                            placeholder="tracking number..."
                                            value={trackingId !== null ? trackingId : ""}
                                            onChange={(e) => setTrackingId(e.target.value)}
                                        />
                                        <span className="absolute font-bold top-[-9px] left-2 text-gray-400 dark:text-blue-200 bg-white dark:bg-gray-500 px-1 text-xs ">
                                            Tracking ID
                                        </span>
                                    </div>
                                    <div className="border bg-green-500 dark:border-gray-400 hover:bg-green-700  relative p-2 ps-2">
                                        <button className="text-center text-white font-bold" onClick={() => updateTrackingIdFn()}>
                                            UPDATE Tracking ID
                                        </button>
                                    </div>
                                </div>
                            )}
                            {userInfoReducer.role && isRoleExists(userInfoReducer.role, ["ADMIN"]) && data.orderInfo.order_status_id.status === "PARTIAL_CONFIRMED" && (
                                <div className="my-5">
                                    <span className="bg-[#e03b3b] text-white text-xs py-1 my-0 px-2 rounded-t-md">Partial Product Amt</span>
                                    <div className="border-2 border-[#e03b3b]">
                                        <div className="grid grid-cols-2 gap-x-3">
                                            <div className="border-e-2 border-[#e03b3b] ps-2">
                                                <h1 className="font-bold">Cancelled Product Information</h1>
                                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                                    <tbody>
                                                        <tr className="border-b dark:bg-gray-800 dark:border-gray-700  dark:hover:bg-gray-600">
                                                            <th>No Of Product</th>
                                                            <td className="text-end">{data.orderInfo.partialCancelOrderInfo.orderedProductAmtInfo.productQty}</td>
                                                            <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                                        </tr>
                                                        <tr className="border-b dark:bg-gray-800 dark:border-gray-700  dark:hover:bg-gray-600">
                                                            <th>Total</th>
                                                            <td className="text-end">{data.orderInfo.partialCancelOrderInfo.orderedProductAmtInfo.total}</td>
                                                            <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                                        </tr>
                                                        <tr className="border-b dark:bg-gray-800 dark:border-gray-700  dark:hover:bg-gray-600">
                                                            <th>GST Amount</th>
                                                            <td className="text-end">+&nbsp;{data.orderInfo.partialCancelOrderInfo.orderedProductAmtInfo.GST_amount}</td>
                                                            <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                                        </tr>
                                                        <tr className="border-b dark:bg-gray-800 dark:border-gray-700  dark:hover:bg-gray-600">
                                                            <th>Grand Total</th>
                                                            <td className="text-end font-bold text-black">
                                                                {" "}
                                                                =&nbsp;{data.orderInfo.partialCancelOrderInfo.orderedProductAmtInfo.grand_total}
                                                            </td>
                                                            <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div>
                                                <h1 className="font-bold">Initial Order Informaition</h1>
                                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                                    <tbody>
                                                        <tr className="border-b dark:bg-gray-800 dark:border-gray-700  dark:hover:bg-gray-600">
                                                            <th>Total</th>
                                                            <td className="text-end">{data.orderInfo.partialCancelOrderInfo.orderedAmtInfo.total}</td>
                                                            <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                                        </tr>
                                                        <tr className="border-b dark:bg-gray-800 dark:border-gray-700  dark:hover:bg-gray-600">
                                                            <th>GST Amount</th>
                                                            <td className="text-end">+&nbsp;{data.orderInfo.partialCancelOrderInfo.orderedAmtInfo.GST_amount}</td>
                                                            <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                                        </tr>
                                                        <tr className="border-b dark:bg-gray-800 dark:border-gray-700  dark:hover:bg-gray-600">
                                                            <th>Grand Total</th>
                                                            <td className="text-end font-bold text-black">
                                                                {" "}
                                                                =&nbsp;{data.orderInfo.partialCancelOrderInfo.orderedAmtInfo.grand_total}
                                                            </td>
                                                            <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <span className="bg-[#4b4bf6] text-white text-xs py-1 my-0 px-2 rounded-t-md">Product Information</span>
                            <hr className="border-b-2 border-b-[#4b4bf6] mt-0" />
                            <div>
                                <table className={`w-full text-sm text-left text-gray-500 dark:text-gray-400`}>
                                    <thead className={`text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400`}>
                                        <tr>
                                            <th scope="col" className="px-6 py-1">
                                                #
                                            </th>
                                            <th scope="col" className="px-6 py-1">
                                                Product
                                            </th>
                                            <th scope="col" className="px-6 py-1">
                                                HSN code
                                            </th>
                                            <th scope="col" className="px-6 py-1">
                                                SKU code
                                            </th>
                                            <th scope="col" className="px-6 py-1">
                                                Price
                                            </th>
                                            <th scope="col" className="px-6 py-1">
                                                Lot Size
                                            </th>
                                            <th scope="col" className="px-6 py-1">
                                                Qty
                                            </th>
                                            <th scope="col" className="px-6 py-1">
                                                Cancel
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.productInfo.products.map((el, i) => (
                                            <tr
                                                className={`border-b dark:bg-gray-800 dark:border-gray-700  dark:hover:bg-gray-600 ${
                                                    removedProductIds.includes(el._id) || el.isRemoved ? "bg-red-300 hover:bg-red-400" : "bg-white hover:bg-gray-50"
                                                } relative`}>
                                                <td className={`px-6 py-1`}>{i + 1}</td>
                                                <td className={`px-6 py-1`}>{el.product_id.product_name}</td>
                                                <td className={`px-6 py-1`}>{el.product_id.hsn_code}</td>
                                                <td className={`px-6 py-1`}>{el.product_id.sku_code}</td>
                                                <td className={`px-6 py-1`}>{el.product_id.seller_price}</td>
                                                <td className={`px-6 py-1 flex flex-col`}>
                                                    {el.product_id.lotSizeQty.map((lotSizes) => (
                                                        <span>{lotSizes}</span>
                                                    ))}
                                                </td>
                                                <td className={`px-6 py-1`}>{el.qty}</td>
                                                <td className={`px-6 py-1`}>
                                                    <MdCancel
                                                        className={`cursor-pointer ${data.orderInfo.order_status_id.status !== "PENDING" && "pointer-events-none "}`}
                                                        size={30}
                                                        color={data.orderInfo.order_status_id.status !== "PENDING" ? "#e1f4f7" : "red"}
                                                        onClick={() => removeProductFromOrder(el._id)}
                                                    />
                                                </td>
                                                {(removedProductIds.includes(el._id) || el.isRemoved) && (
                                                    <div className="absolute right-0 bottom-0 text-xs bg-yellow-300">Removed</div>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                    <div className="mt-5 p-4">
                        {(updateOption === "CANCEL" || data.productInfo.products.length === removedProductIds.length) && (
                            <>
                                <div className="font-bold text-lg">Select Reason</div>
                                <ul>
                                    {questions.map((el) => (
                                        <li key={el._id} className="flex items-center space-x-2 my-2">
                                            <input id={el._id} type="radio" name="question" onChange={(e) => setQuestionId(el._id)} />
                                            <label htmlFor={el._id}>{el.question}</label>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                        {(removedProductIds.length > 0 || updateOption === "CANCEL") && (
                            <textarea
                                name=""
                                id=""
                                className="w-full outline-none border rounded p-2 h-full"
                                placeholder="Resone for cancel proudct"
                                // rows="2"
                                onChange={(e) => setCancelMessage(e.target.value)}></textarea>
                        )}

                        <div tabindex="0" className="group relative inline-block py-3">
                            <ul className=" hidden group-focus-within:block list-none absolute -top-28 bg-gray-50 border w-52 z-1 shadow-lg animate-slideIn">
                                <li
                                    className={`px-2 py-2 font-semibold ${
                                        removedProductIds.length > 0 || data.orderInfo.order_status_id.status !== "PENDING" ? "pointer-events-none text-gray-200" : ""
                                    } cursor-pointer hover:bg-gray-200 hover:text-blue-700 flex justify-start items-center`}
                                    onClick={() => changeOption("CONFIRMED")}>
                                    <MdDoneAll size={20} className="me-3" /> Confirm Order
                                </li>
                                <li
                                    className={`${
                                        (removedProductIds.length === 0 ||
                                            data.productInfo.products.length === removedProductIds.length ||
                                            data.orderInfo.order_status_id.status !== "PENDING") &&
                                        "pointer-events-none text-gray-200"
                                    } px-2 py-2 font-semibold cursor-pointer hover:bg-gray-200 hover:text-blue-700 flex justify-start items-center`}
                                    onClick={() => changeOption("PARTIAL_CONFIRMED")}>
                                    <MdPlaylistAddCheck size={20} className="me-3" /> Partial Confirm
                                </li>
                                <li
                                    className="px-2 py-2 font-semibold cursor-pointer hover:bg-gray-200 hover:text-blue-700 text-red-600 flex justify-start items-center"
                                    onClick={() => changeOption("CANCEL")}>
                                    <MdOutlineCancel size={20} className="me-3" /> Cancel Order
                                </li>
                            </ul>
                            {(data.orderInfo.order_status_id.status === "PENDING" || (userInfoReducer.role && isRoleExists(userInfoReducer.role, ["ADMIN"]))) &&
                                data.orderInfo.order_status_id.status !== "CANCELLED" && (
                                    <button
                                        className={`px-2 py-1 text-[16px]focus:outline-none ${
                                            updateOption === "CONFIRMED"
                                                ? "bg-green-500 text-white"
                                                : updateOption === "PARTIAL_CONFIRMED"
                                                ? "bg-blue-500 text-white"
                                                : updateOption === "CANCEL"
                                                ? "bg-red-500 text-white"
                                                : "border bg-transparent text-black"
                                        }`}>
                                        {updateOption === "CONFIRMED"
                                            ? "Confirm Order"
                                            : updateOption === "PARTIAL_CONFIRMED"
                                            ? "Partial Confirm"
                                            : updateOption === "CANCEL"
                                            ? "Cancel Order"
                                            : "Select Option"}
                                    </button>
                                )}
                        </div>
                        <button onClick={() => updateOrderFn()} className={`px-2 py-1 ${updateOption === "" ? "bg-[#e7af2d]" : "bg-[#4b4bf6]"}  text-[16px] text-white ms-2`}>
                            {updateOption === "" ? "Close" : "Update"}
                        </button>
                    </div>
                </div>
                {data.orderInfo.order_status_id.status !== "CANCELLED" && data.orderInfo.order_status_id.status !== "PENDING" && (
                    <div className="w-full p-2 bg-slate-200 dark:bg-slate-800 border-t-2">
                        <label for="statusorder" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Current Order Status
                        </label>
                        <div className="grid grid-cols-4 gap-4">
                            <select
                                id="statusorder"
                                className="bg-gray-50 col-span-3 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="">Change Order Status</option>
                                <option value="READY_TO_DISPATCH">Ready to dispatch</option>
                                {userInfoReducer.role && isRoleExists(userInfoReducer.role, ["ADMIN"]) && (
                                    <>
                                        <option value="PICKUP_ALLIGNED">Pickup alligned</option>
                                        <option value="PICKUP_DONE">Pickup Done/InTransit</option>
                                        <option value="RETURNED">RTO</option>
                                        <option value="RETURNED">RTO Delivered To seller</option>
                                        <option value="OUT_FOR_DELIVERY">Out for delivery</option>
                                        <option value="DELIVERED">Delivered</option>
                                    </>
                                )}
                            </select>
                            <button className=" outline-none hover:bg-blue-600 font-bold text-white text-sm rounded-lg   w-full p-2 bg-blue-700  ">UPDATE STATUS</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderStatusModel;
