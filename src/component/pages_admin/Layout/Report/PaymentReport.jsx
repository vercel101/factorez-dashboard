import React, { useState } from "react";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Badge,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    IconButton,
    Input,
    Textarea,
    useToast,
    Tooltip,
} from "@chakra-ui/react";
import { isRoleExists } from "../../../../utils/checkRole";
import { MdPendingActions } from "react-icons/md";
import { Select } from "@chakra-ui/react";
import { getPaymentReportApi, updatePaymentReportApi } from "../../../../apis/adminApis";
import { dateToLocalDateTime } from "../../../../utils/dateUtils";
import { useDispatch } from "react-redux";
import { spinnerOverlayOffFn, spinnerOverlayOnFn } from "../../../../Redux/ReducerAction";
import { GrTooltip } from "react-icons/gr";

export const badgeColor = {
    CANCELLED: "red",
    DELIVERED: "green",
    OUT_FOR_DELIVERY: "facebook",
    RETURNED: "red",
    READY_TO_DISPATCH: "teal.500",
    PARTIAL_CONFIRMED: "pink",
    CONFIRMED: "green",
    PENDING: "yellow",
};

const PaymentReport = ({ tokenReducer, userInfoReducer }) => {
    const toast = useToast();
    const dispatch = useDispatch();
    const [fetchedData, setFetchedData] = useState([]);
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [modelData, setModelData] = useState({
        paymentStatus: "",
        paidAmount: "",
        paymentDate: "",
        transactionId: "",
        settlementAmt: "",
        message: "",
    });
    const saveModelData = async () => {
        if (modelData.paymentStatus || modelData.paidAmount || modelData.paymentDate || modelData.transactionId || modelData.settlementAmt || modelData.message) {
            setIsModelOpen(false);
            dispatch(spinnerOverlayOnFn());
            await updatePaymentReportApi(selectedRowData._id, modelData, tokenReducer)
                .then((res) => {
                    console.log(res.data);
                    toast({
                        status: "success",
                        position: "top",
                        isClosable: true,
                        title: res.data.message,
                    });
                    setFetchedData(res.data.data);
                })
                .catch((err) => {
                    // console.log(err);
                    toast({
                        status: "error",
                        position: "top",
                        isClosable: true,
                        title: "Error",
                        description: err.message,
                    });
                });
            console.log(selectedRowData);
            dispatch(spinnerOverlayOffFn());
        } else {
            toast({
                status: "warning",
                position: "top",
                isClosable: true,
                title: "Make some changes and save",
            });
        }
    };

    const fetchPaymentReport = async () => {
        await getPaymentReportApi(tokenReducer)
            .then((res) => {
                console.log(res);
                setFetchedData(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    React.useEffect(() => {
        fetchPaymentReport();
    }, []);
    return (
        <div>
            <Modal onClose={() => setIsModelOpen(false)} size={"2xl"} isOpen={isModelOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader bg={"whatsapp.100"} roundedTop={"md"}>
                        Payment Action
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="text-teal-700 font-semibold text-xs" htmlFor="payment_status">
                                    Payment Status
                                </label>
                                <Select
                                    id="payment_status"
                                    placeholder="Select option"
                                    defaultValue={selectedRowData && selectedRowData.paymentReportStatus && selectedRowData.paymentReportStatus.paymentStatus}
                                    disabled={userInfoReducer.role && isRoleExists(userInfoReducer.role, ["ADMIN"]) ? false : true}
                                    onChange={(e) =>
                                        setModelData((old) => {
                                            return { ...old, paymentStatus: e.target.value };
                                        })
                                    }
                                >
                                    <option value="PENDING">Pending</option>
                                    <option value="DUE">Due</option>
                                    <option value="PARTIAL_PAID">Partial Paid</option>
                                    <option value="FULL_PAID">Full Paid</option>
                                    <option value="SETTLED_PAID">Settled Paid</option>
                                </Select>
                            </div>
                            <div>
                                <label className="text-teal-700 font-semibold text-xs" htmlFor="paid_amount">
                                    Paid Amount
                                </label>
                                <Input
                                    id="paid_amount"
                                    disabled={userInfoReducer.role && isRoleExists(userInfoReducer.role, ["ADMIN"]) ? false : true}
                                    onChange={(e) =>
                                        setModelData((old) => {
                                            return { ...old, paidAmount: e.target.value };
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <label className="text-teal-700 font-semibold text-xs" htmlFor="payment_date">
                                    Payment Date
                                </label>
                                <Input
                                    id="payment_date"
                                    type="date"
                                    disabled={userInfoReducer.role && isRoleExists(userInfoReducer.role, ["ADMIN"]) ? false : true}
                                    onChange={(e) =>
                                        setModelData((old) => {
                                            return { ...old, paymentDate: e.target.value };
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <label className="text-teal-700 font-semibold text-xs" htmlFor="transaction_id">
                                    Transaction ID
                                </label>
                                <Input
                                    id="transaction_id"
                                    disabled={userInfoReducer.role && isRoleExists(userInfoReducer.role, ["ADMIN"]) ? false : true}
                                    onChange={(e) =>
                                        setModelData((old) => {
                                            return { ...old, transactionId: e.target.value };
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <label className="text-teal-700 font-semibold text-xs" htmlFor="settlement_amt">
                                    Settlement Amount
                                </label>
                                <Input
                                    id="settlement_amt"
                                    disabled={userInfoReducer.role && isRoleExists(userInfoReducer.role, ["ADMIN"]) ? false : true}
                                    onChange={(e) =>
                                        setModelData((old) => {
                                            return { ...old, settlementAmt: e.target.value };
                                        })
                                    }
                                />
                            </div>
                            <div className=" col-span-2">
                                <label className="text-teal-700 font-semibold text-xs" htmlFor="messageInfo">
                                    Message{" "}
                                    <Badge colorScheme="blue" rounded={"full"}>
                                        optional
                                    </Badge>
                                </label>
                                <Textarea
                                    disabled={userInfoReducer.role && isRoleExists(userInfoReducer.role, ["ADMIN"]) ? false : true}
                                    id="messageInfo"
                                    onChange={(e) =>
                                        setModelData((old) => {
                                            return { ...old, message: e.target.value };
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <h1 className="font-semibold text-lg mt-3">Status Logs</h1>
                        <div className="border rounded p-1">
                            <Table size={"sm"}>
                                <Thead>
                                    <Tr>
                                        <Th>Status</Th>
                                        <Th>Paid Amt</Th>
                                        <Th>Changed on</Th>
                                        <Th>Settlement Amt</Th>
                                        <Th>Info</Th>
                                    </Tr>
                                </Thead>
                                <Tbody height={"100px"} maxHeight={"100px"} overflowY={"auto"}>
                                    {selectedRowData && selectedRowData.paymentReportStatus && selectedRowData.paymentReportStatus.logs.length > 0 ? (
                                        selectedRowData.paymentReportStatus.logs.map((el) => (
                                            <Tr>
                                                <Td>{el.paymentStatus && el.paymentStatus.replace('_'," ")}</Td>
                                                <Td>{el.paidAmount ? el.paidAmount : 0}</Td>
                                                <Td>{el.updateAt ? dateToLocalDateTime(el.updateAt) : ""}</Td>
                                                <Td>{el.settlementAmt ? el.settlementAmt : 0}</Td>
                                                <Td>
                                                    <Tooltip label={`${el.message && el.message} - ${el.paymentDate && el.paymentDate}`} aria-label="A tooltip">
                                                        <span><GrTooltip/></span>
                                                    </Tooltip>
                                                </Td>
                                            </Tr>
                                        ))
                                    ) : (
                                        <Tr>
                                            <Td colSpan={3}>Nothing to show</Td>
                                        </Tr>
                                    )}
                                </Tbody>
                            </Table>
                        </div>
                    </ModalBody>
                    <ModalFooter className="space-x-2">
                        {userInfoReducer.role && isRoleExists(userInfoReducer.role, ["ADMIN"]) && (
                            <Button colorScheme="green" onClick={() => saveModelData()}>
                                Save
                            </Button>
                        )}
                        <Button
                            colorScheme="red"
                            onClick={() => {
                                setIsModelOpen(false);
                                setSelectedRowData(null);
                            }}
                        >
                            {userInfoReducer.role && isRoleExists(userInfoReducer.role, ["ADMIN"]) ? "Cancel" : "Close"}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <TableContainer>
                <Table size="sm">
                    <Thead bg={"teal.100"}>
                        <Tr>
                            {userInfoReducer.role && isRoleExists(userInfoReducer.role, ["ADMIN"]) && (
                                <>
                                    <Th py={2}>Seller Name</Th>
                                    <Th py={2}>Seller Phone</Th>
                                </>
                            )}
                            <Th py={2}>Order ID</Th>
                            <Th py={2}>Order Date</Th>
                            <Th py={2}>Total Amount</Th>
                            <Th py={2}>Order Status</Th>
                            <Th py={2}>Order Delivery Date</Th>
                            <Th py={2}>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {fetchedData.length > 0 ? (
                            fetchedData.map((el) => (
                                <Tr className="hover:bg-teal-50">
                                    {userInfoReducer.role && isRoleExists(userInfoReducer.role, ["ADMIN"]) && (
                                        <>
                                            <Td>{el.vendorId && el.vendorId.representativeName}</Td>
                                            <Td>{el.vendorId && el.vendorId.mobileNo}</Td>
                                        </>
                                    )}
                                    <Td>{el.orderId}</Td>
                                    <Td>{dateToLocalDateTime(el.order_date)}</Td>
                                    <Td>{el.vendorAmtInfo && el.vendorAmtInfo.grandTotal}</Td>
                                    <Td>
                                        <Badge py={1} colorScheme={Object.keys(badgeColor).includes(el.order_status_id && el.order_status_id.status) ? badgeColor[el.order_status_id.status] : "cyan"}>
                                            {el.order_status_id && el.order_status_id.status}
                                        </Badge>
                                    </Td>
                                    <Td>
                                        {el.order_status_id && el.order_status_id.status === "DELIVERED" ? (
                                            dateToLocalDateTime(el.order_status_id.updatedAt)
                                        ) : (
                                            <Badge py={1} variant="outline" colorScheme={"yellow"}>
                                                Not delivered yet
                                            </Badge>
                                        )}
                                    </Td>
                                    <Td>
                                        <IconButton
                                            size={"sm"}
                                            fontSize="20px"
                                            onClick={() => {
                                                setIsModelOpen(true);
                                                setSelectedRowData(el);
                                            }}
                                            icon={<MdPendingActions size={20} />}
                                        />
                                    </Td>
                                </Tr>
                            ))
                        ) : (
                            <Tr>
                                <Td>No record found...</Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default PaymentReport;
