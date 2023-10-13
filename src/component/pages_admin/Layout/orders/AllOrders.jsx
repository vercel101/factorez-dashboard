import React, { useEffect, useState } from "react";
import {
    changeBulkOrderStatusApi,
    changeOrderStatusApi,
    downloadInvoiceByInvoiceNumberApi,
    getAllOrdersAPI,
    getAllQuestionByUserApi,
    getAllQuestions,
    getOrderedProductAPI,
    orderReportDownloadApi,
    patchTrackingIDByOrderId,
    updateOrderByOrderId,
} from "../../../../apis/adminApis";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { FaListCheck } from "react-icons/fa6";
import { GrClose } from "react-icons/gr";
import { GoDotFill } from "react-icons/go";
import OrderStatusModel from "./OrderStatusModel";
import { isRoleExists } from "../../../../utils/checkRole";
import { Button, Select, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Stack, useToast, Badge, Text } from "@chakra-ui/react";
import { dateToLocalDateTime } from "../../../../utils/dateUtils";
import { spinnerOverlayOffFn, spinnerOverlayOnFn } from "../../../../Redux/ReducerAction";
import DataTable from "react-data-table-component";
import { customStyles } from "../../../../utils/customStylesDataTable";
import OrderFilter from "./OrderFilter";
import { PiMicrosoftExcelLogoDuotone } from "react-icons/pi";

function AllOrders({ tokenReducer, userInfoReducer }) {
    const toast = useToast();
    const dispatch = useDispatch();
    const [orders, setOrders] = useState([]);
    const [listOfQuestion, setListOfQuestion] = useState([]);
    const [selectedOrders, setSelectedOrders] = useState([]);
    const [selectedOrderStatus, setSelectedOrderStatus] = useState("");
    const [bulkOrderProcessBtnLoading, setBulkOrderProcessBtnLoading] = useState(false);
    const [orderModelFlag, setOrderModelFlag] = useState(false);
    const [statusListFlag, setStatusListFlag] = useState(false);
    const [statusList, setStatusList] = useState([]);
    const [filterText, setFilterText] = React.useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
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
    const paginationComponentOptions = {
        rowsPerPageText: "No of Rows",
        rangeSeparatorText: "Total Records",
    };

    const filteredItems = orders.filter((item) => {
        let record = null;
        // console.log(item);
        if (item.orderId.toLowerCase().includes(filterText.toLowerCase()) || item.vendorId.firmName.toLowerCase().includes(filterText.toLowerCase())) {
            record = item;
        }
        return record;
    });

    async function downloadCSV(array) {
        let arr = [];
        for (let x of array) {
            arr.push(x._id);
        }
        await orderReportDownloadApi(arr, tokenReducer)
            .then((res) => {
                console.log(res);
                let blob = res.data;
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", `OrderReport.xlsx`);
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    const Export = ({ onExport }) => (
        <Button colorScheme="whatsapp" leftIcon={<PiMicrosoftExcelLogoDuotone size={25} />} onClick={(e) => onExport(e.target.value)}>
            Export
        </Button>
    );
    const subHeaderComponent = React.useMemo(() => {
        const handleClear = () => {
            if (filteredItems) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText("");
            }
        };
        return (
            <div className="flex items-center space-x-3">
                <OrderFilter onFilter={(e) => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
                <Export onExport={() => downloadCSV(filteredItems)} />
                <Popover onClose={() => setSelectedOrderStatus("")}>
                    <PopoverTrigger>
                        <Button colorScheme="messenger">Bulk Order Process</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader>Choose Order status</PopoverHeader>
                        <PopoverBody>
                            <Stack spacing={3}>
                                <Select value={selectedOrderStatus} onChange={(e) => setSelectedOrderStatus(e.target.value)} variant="outline" placeholder="Select...">
                                    <option value="PICKUP_ALIGNED">Pickup aligned</option>
                                    <option value="PICKUP_DONE">Pickup Done/InTransit</option>
                                    <option value="RETURNED_RTO">RTO</option>
                                    <option value="RETURNED_RTO_DELIVERED">RTO Delivered To seller</option>
                                    <option value="OUT_FOR_DELIVERY">Out for delivery</option>
                                    <option value="DELIVERED">Delivered</option>
                                </Select>
                            </Stack>
                            <Button isLoading={bulkOrderProcessBtnLoading} loadingText="Please wait" mt={3} width={"full"} colorScheme="green" onClick={() => changeBulkOrderStatus()}>
                                Bulk Order Process
                            </Button>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            </div>
        );
    }, [filterText, filteredItems, resetPaginationToggle]);
    const selectedRows = (e) => {
        console.log(e);
        setSelectedOrders(e.selectedRows);
    };
    const columnsAdmin = [
        {
            name: <span className="whitespace-normal">Order ID</span>,
            selector: (row) => row.orderId,
            width: "130px",
        },
        {
            name: <span className="whitespace-normal">Order Date</span>,
            selector: (row) => <span className="whitespace-normal">{dateToLocalDateTime(row.order_date)}</span>,
        },
        {
            name: <span className="whitespace-normal">Seller</span>,
            selector: (row) => row.vendorId.firmName,
        },
        {
            name: <span className="whitespace-normal">Buyer</span>,
            selector: (row) => row.customer_id.name,
        },
        {
            name: <span className="whitespace-normal">Buyer Phone</span>,
            selector: (row) => row.customer_id.phone,
            width: "120px",
        },
        {
            name: <span className="whitespace-normal">Shipping Address</span>,
            selector: (row) => <span className="whitespace-normal">{row.shipping_address && row.shipping_address.address}</span>,
        },
        {
            name: <span className="whitespace-normal">Item Qty</span>,
            selector: (row) => row.ordered_products && row.ordered_products.products.length,
            width: "70px",
        },
        {
            name: <span className="whitespace-normal">Amount</span>,
            selector: (row) => row.grand_total,
            width: "100px",
        },
        {
            name: <span className="whitespace-normal">Action</span>,
            width: "210px",
            selector: (row) => (
                <button
                    onClick={() => orderManageFn(row)}
                    className={`border flex p-1 rounded justify-center  items-center text-center px-2 text-xs
                                ${
                                    row.order_status_id && row.order_status_id.status === "PENDING"
                                        ? "bg-gray-400 border-0 text-black"
                                        : row.order_status_id && row.order_status_id.status === "PARTIAL_CONFIRMED"
                                        ? "bg-blue-400 border-0 text-white"
                                        : row.order_status_id && row.order_status_id.status === "CANCELLED"
                                        ? "bg-red-600 text-white border-0"
                                        : "bg-green-500 border-0 text-white"
                                }
                                `}
                >
                    {row.order_status_id && row.order_status_id.status.replace("_", " ")}
                </button>
            ),
        },
        {
            name: <span className="whitespace-normal">Invoice Download</span>,
            selector: (row) => (
                <div className="flex flex-col items-start justify-center">
                    <button
                        disabled={!row.saleInvoice}
                        className="px-2 py-1 border disabled:text-white bg-green-300 border-green-300 text-blue-700 disabled:bg-gray-200 disabled:border-gray-200 rounded"
                        onClick={() => downloadPdfFn(row.saleInvoice && row.saleInvoice.invoiceNo, "SALE")}
                    >
                        Sale
                    </button>
                    <button
                        disabled={!row.purchaseInvoice}
                        className="px-2 mt-1 bg-blue-300 text-white disabled:bg-gray-200 py-1 border border-blue-300 disabled:border-gray-200 rounded"
                        onClick={() => downloadPdfFn(row.purchaseInvoice && row.purchaseInvoice.invoiceNo, "PURCHASE")}
                    >
                        Purchase
                    </button>
                </div>
            ),
        },
        {
            name: "Status",
            selector: (row) => (
                <div className="flex items-center justify-center">
                    <FaListCheck size={30} onClick={() => statusListHandler(true, row)} className="hover:bg-teal-300 p-1 rounded cursor-pointer" />
                </div>
            ),
            width: "100px",
        },
    ];
    const columnVendor = [
        {
            name: <span className="whitespace-normal">Order ID</span>,
            selector: (row) => row.orderId,
        },
        {
            name: <span className="whitespace-normal">Order Date</span>,
            selector: (row) => <span className="whitespace-normal">{dateToLocalDateTime(row.order_date)}</span>,
        },
        {
            name: <span className="whitespace-normal">Item Qty</span>,
            selector: (row) => row.ordered_products && row.ordered_products.products.length,
            width: "70px",
        },
        {
            name: <span className="whitespace-normal">Amount</span>,
            selector: (row) => row.vendorAmtInfo.grandTotal,
            width: "100px",
        },
        {
            name: <span className="whitespace-normal">Action</span>,
            selector: (row) => (
                <button
                    onClick={() => orderManageFn(row)}
                    className={`border 
                                flex p-1 rounded 
                                justify-center 
                                items-center text-center
                                px-2
                                text-xs
                                ${
                                    row.order_status_id && row.order_status_id.status === "PENDING"
                                        ? "bg-gray-400 border-0 text-black"
                                        : row.order_status_id && row.order_status_id.status === "PARTIAL_CONFIRMED"
                                        ? "bg-blue-400 border-0 text-white"
                                        : row.order_status_id && row.order_status_id.status === "CANCELLED"
                                        ? "bg-red-600 text-white border-0"
                                        : "bg-green-500 border-0 text-white"
                                }
                                `}
                >
                    {row.order_status_id && row.order_status_id.status.replace("_", " ")}
                </button>
            ),
        },
        {
            name: <span className="whitespace-normal">Invoice Download</span>,
            selector: (row) => (
                <div className="flex flex-col items-start justify-center">
                    <button
                        disabled={!row.purchaseInvoice}
                        className="px-2 py-1 border disabled:text-white bg-green-300 border-green-300 text-blue-700 disabled:bg-gray-200 disabled:border-gray-200 rounded"
                        onClick={() => downloadPdfFn(row.purchaseInvoice && row.purchaseInvoice.invoiceNo, "PURCHASE")}
                    >
                        Sale Invoice
                    </button>
                </div>
            ),
        },
        {
            name: "Status",
            selector: (row) => (
                <div className="flex items-center justify-center">
                    <FaListCheck size={30} onClick={() => setStatusListFlag(true)} className="hover:bg-teal-300 p-1 rounded cursor-pointer" />
                </div>
            ),
            width: "100px",
        },
    ];

    const statusListHandler = (flag, selectedRow) => {
        setStatusListFlag(true);
        // console.log(flag, selectedRow);
        setStatusList(selectedRow.order_status_id.statusList);
        // console.log(selectedRow.order_status_id.statusList);
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
    const changeBulkOrderStatus = async () => {
        if (selectedOrders.length > 0 && selectedOrderStatus !== "") {
            let objectIds = [];
            for (let id of selectedOrders) {
                objectIds.push(id._id);
            }
            let data = {
                status: selectedOrderStatus,
                orderIds: objectIds,
            };
            setBulkOrderProcessBtnLoading(true);
            await changeBulkOrderStatusApi(data, tokenReducer)
                .then((res) => {
                    setSelectedOrderStatus("");
                    setSelectedOrders([]);
                    toast({
                        status: "success",
                        position: "top",
                        isClosable: true,
                        title: "Success",
                        description: res.data.message,
                    });
                    fetchOrders();
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
            setBulkOrderProcessBtnLoading(false);
        } else {
            toast({
                status: "warning",
                position: "top",
                isClosable: true,
                title: "Orders not selected",
            });
        }
    };
    const changeOrderStatus = async (orderid, status) => {
        await changeOrderStatusApi(orderid, { status }, tokenReducer)
            .then((res) => {
                console.log(res.data);
                setOrderModelFlag(false);
                toast({
                    status: "success",
                    position: "top",
                    isClosable: true,
                    title: "Success",
                    description: res.data.message,
                });
                fetchOrders().then();
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
    };
    const allQuestions = async () => {
        await getAllQuestionByUserApi(tokenReducer)
            .then((res) => {
                // console.log(res.data);
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

    const downloadPdfFn = async (invoiceNumber, invType) => {
        dispatch(spinnerOverlayOnFn());
        await downloadInvoiceByInvoiceNumberApi(invoiceNumber, invType, tokenReducer)
            .then((res) => {
                let blob = res.data;
                const url = window.URL.createObjectURL(new Blob([blob], { type: "application/pdf" }));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", `${invoiceNumber}.pdf`);

                // Append to html link element page
                document.body.appendChild(link);

                // Start download
                link.click();

                // Clean up and remove the link
                link.parentNode.removeChild(link);
                toast({
                    title: "Invoice Downloaded",
                    status: "success",
                    position: "top",
                    isClosable: true,
                });
            })
            .catch((err) => {
                console.log(err.message);
                toast({
                    title: "Error in downloading",
                    status: "error",
                    position: "top",
                    isClosable: true,
                });
            });
        dispatch(spinnerOverlayOffFn());
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
                    changeOrderStatus={changeOrderStatus}
                />
            )}
            <DataTable
                columns={userInfoReducer.role && isRoleExists(userInfoReducer.role, ["ADMIN"]) ? columnsAdmin : columnVendor}
                data={filteredItems}
                selectableRows
                pagination
                paginationComponentOptions={paginationComponentOptions}
                paginationResetDefaultPage={resetPaginationToggle}
                subHeader
                onSelectedRowsChange={selectedRows}
                subHeaderComponent={subHeaderComponent}
                customStyles={customStyles}
                subHeaderAlign={"left"}
            />

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
}

export default AllOrders;
