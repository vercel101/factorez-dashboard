import React from "react";
import { isRoleExists } from "../../../../utils/checkRole";
import { useState } from "react";
import { changeReturnOrderStatusApi, getAllCancelledOrderAPI } from "../../../../apis/adminApis";
import { useEffect } from "react";
import { dateToLocalDateTime } from "../../../../utils/dateUtils";
import { GrClose } from "react-icons/gr";
import { Badge, Button, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Select, Stack, Text, useToast } from "@chakra-ui/react";
import { FaListCheck } from "react-icons/fa6";

const CancelledOrder = ({ tokenReducer, userInfoReducer }) => {
    const [orders, setOrders] = useState([]);
    const toast = useToast();
    const [statusListFlag, setStatusListFlag] = useState(false);
    const [statusList, setStatusList] = useState([]);
    const [selectedOrderStatus, setSelectedOrderStatus] = useState("");
    const [cancelOrderBtnLoading, setCancelOrderBtnLoading] = useState(false);
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
    const statusListHandler = (flag, selectedRow) => {
        setStatusListFlag(true);
        console.log(selectedRow);
        setStatusList(selectedRow.order_status_id.cancelledStatusList);
    };

    const cancelOrderReturn = async (id) => {
        if (selectedOrderStatus !== "") {
            let data = {
                status: selectedOrderStatus,
            };
            setCancelOrderBtnLoading(true);
            await changeReturnOrderStatusApi(id, data, tokenReducer)
                .then((res) => {
                    setSelectedOrderStatus("");
                    toast({
                        status: "success",
                        position: "top",
                        isClosable: true,
                        title: "Success",
                        description: res.data.message,
                    });
                    getAllCancelledOrder();
                })
                .catch((err) => {
                    console.log(err);
                    toast({
                        status: "error",
                        position: "top",
                        isClosable: true,
                        title: "Error",
                        description: err.message,
                    });
                });
            setCancelOrderBtnLoading(false);
        } else {
            toast({
                status: "warning",
                position: "top",
                isClosable: true,
                title: "Status not selected",
            });
        }
    };

    useEffect(() => {
        getAllCancelledOrder();
    }, []);

    return (
        <div>
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
                            Action
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
                                <td className={`px-6 py-1`}>{dateToLocalDateTime(el.order_date)}</td>
                                {userInfoReducer.role && isRoleExists(userInfoReducer.role, ["ADMIN"]) && (
                                    <>
                                        <td className={`px-6 py-1`}>{el.vendorId.firmName}</td>
                                        <td className={`px-6 py-1`}>{el.customer_id.name}</td>
                                        <td className={`px-6 py-1`}>{el.customer_id.phone}</td>
                                    </>
                                )}
                                <td className={`px-6 py-1`}>{el.ordered_products.products.length}</td>
                                <td className={`px-6 py-1`}>
                                    &#8377;
                                    {userInfoReducer.role && isRoleExists(userInfoReducer.role, ["ADMIN"]) ? el.grand_total : el.vendorAmtInfo.grandTotal}
                                </td>
                                <td className={`px-6 py-1`}>
                                    {Object.keys(el.order_status_id.cancelled.userId)[0][0].toUpperCase() + Object.keys(el.order_status_id.cancelled.userId)[0].substring(1)}
                                </td>
                                <td className={`px-6 py-1`}>
                                    <Popover placement="left">
                                        <PopoverTrigger>
                                            <Button rounded={2} size={"xs"} colorScheme="red">
                                                {el.order_status_id.cancelledStatus ? el.order_status_id.cancelledStatus : "CANCELLED"}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <PopoverArrow />
                                            <PopoverCloseButton />
                                            <PopoverHeader>Update current status</PopoverHeader>
                                            <PopoverBody>
                                                <Stack spacing={3}>
                                                    <Select value={selectedOrderStatus} onChange={(e) => setSelectedOrderStatus(e.target.value)} variant="outline" placeholder="Select...">
                                                        <option value="PICKUP_ALIGNED">Pickup aligned</option>
                                                        <option value="PICKUP_DONE">Pickup Done/InTransit</option>
                                                        <option value="RETURNED_RTO">RTO</option>
                                                        <option value="RETURNED">RETURNED</option>
                                                        <option value="RETURNED_RTO_DELIVERED">RTO Delivered To seller</option>
                                                    </Select>
                                                </Stack>
                                                <Button isLoading={cancelOrderBtnLoading} loadingText="Please wait" mt={3} width={"full"} colorScheme="green" onClick={() => cancelOrderReturn(el._id)}>
                                                    Return Order Update
                                                </Button>
                                            </PopoverBody>
                                        </PopoverContent>
                                    </Popover>
                                </td>
                                <td>
                                    <div className="flex items-center justify-center">
                                        <FaListCheck size={30} onClick={() => statusListHandler(true, el)} className="hover:bg-teal-300 p-1 rounded cursor-pointer" />
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} className="ps-4">
                                No record found...
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className={`bg-white pt-12 z-10 dark:bg-neutral-800 dark:border-gray-700 border-s transition-transform h-screen w-96 fixed top-0 right-0 ${!statusListFlag && "translate-x-full"}`}>
                <div className="flex items-center justify-between p-2">
                    <h1 className="font-bold text-2xl">Status List</h1>
                    <GrClose
                        className="border cursor-pointer p-1 rounded-md hover:bg-teal-200"
                        size={30}
                        onClick={() => {
                            setStatusListFlag(false);
                            setStatusList([]);
                        }}
                    />
                </div>
                <div className="overflow-y-auto h-[calc(100vh_-_100px)] px-7 pt-4">
                    <ul>
                        {statusList.length > 0 ? (
                            statusList.map((el, i) => (
                                <li className={`py-5 border-s-4 ps-8 relative  min-h-[88px] ${statusList.length === i + 1 && "border-transparent"}`}>
                                    <span className="absolute -top-3 -left-2 flex items-center space-x-2">
                                        <span className="relative flex h-3 w-3">
                                            {statusList.length === i + 1 && (
                                                <>
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                                </>
                                            )}
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                                        </span>
                                        <span>{el.status}</span>
                                    </span>
                                    <Text className="font-bold text-xs">{dateToLocalDateTime(el.updatedAt)}</Text>
                                    {el.updatedBy.hasOwnProperty("vendor") ? <Badge colorScheme="green">SELLER</Badge> : <Badge colorScheme="messenger">ADMIN</Badge>}
                                </li>
                            ))
                        ) : (
                            <li>Action not taken</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CancelledOrder;
