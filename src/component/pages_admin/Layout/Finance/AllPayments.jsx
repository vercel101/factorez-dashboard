import React from "react";
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
    Input,
    Select,
    useToast,
} from "@chakra-ui/react";
import { getOrderReportApi, updatePaymentStatusApi } from "../../../../apis/adminApis";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { capitalizeString } from "../../../../utils/capitalize";
import { useDispatch } from "react-redux";
import { spinnerOverlayOffFn, spinnerOverlayOnFn } from "../../../../Redux/ReducerAction";
const AllPayments = ({ sidebarCollapse, userInfoReducer, tokenReducer }) => {
    const toast = useToast();
    const dispatch = useDispatch();
    const [records, setRecords] = React.useState([]);
    const [selectedRowData, setSelectedRowData] = React.useState(null);
    const [modelData, setModelData] = React.useState({
        payment_status: "",
        payment_amount: "",
        payment_date: "",
    });
    const [isModelOpen, setIsModelOpen] = React.useState(false);
    const updatePaymentFn = async () => {
        if (modelData.payment_amount && modelData.payment_date && modelData.payment_status) {
            setIsModelOpen(false);
            dispatch(spinnerOverlayOnFn());
            await updatePaymentStatusApi(selectedRowData.payment_id._id, modelData, tokenReducer)
                .then((res) => {
                    console.log(res.data);
                    fetchOrders();
                    toast({
                        title: "Success",
                        description: res.data.message,
                        position: "top",
                        isClosable: true,
                        status: "success",
                    });
                })
                .catch((err) => {
                    console.log(err);
                    toast({
                        title: "Error",
                        description: err.response.data.message,
                        position: "top",
                        isClosable: true,
                        status: "error",
                    });
                });
            dispatch(spinnerOverlayOffFn());
        } else {
            toast({
                title: "Warning",
                description: "All fields are required",
                position: "top",
                isClosable: true,
                status: "warning",
            });
        }
    };
    const fetchOrders = async () => {
        await getOrderReportApi(tokenReducer)
            .then((res) => {
                console.log(res.data);
                setRecords(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    React.useEffect(() => {
        fetchOrders();
    }, []);
    return (
        <div>
            <Modal
                isOpen={isModelOpen}
                onClose={() => {
                    setIsModelOpen(false);
                    setSelectedRowData(null);
                }}
                size={"lg"}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Payment</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <label className="text-teal-700 font-semibold text-xs" htmlFor="paymentStatus">
                            Status
                        </label>
                        <Select
                            disabled={selectedRowData && selectedRowData.payment_id && selectedRowData.payment_id.payment_status === "REFUNDED" && true}
                            onChange={(e) =>
                                setModelData((old) => {
                                    return { ...old, payment_status: e.target.value };
                                })
                            }
                            id="paymentStatus"
                            placeholder="Select option"
                        >
                            <option
                                disabled={
                                    (selectedRowData && selectedRowData.payment_id && selectedRowData.payment_id.payment_status === "RECEIVED" && true) ||
                                    (selectedRowData && selectedRowData.payment_id && selectedRowData.payment_id.return_amount > 0 && true)
                                }
                                value={"RECEIVED"}
                            >
                                Received
                            </option>
                            <option value={"REFUNDED"}>Refunded</option>
                        </Select>
                        <div className="grid grid-cols-2 gap-1 mt-1">
                            <div>
                                <label className="text-teal-700 font-semibold text-xs" htmlFor="paymentAmt">
                                    Payment Amount
                                </label>
                                <Input
                                    onChange={(e) =>
                                        setModelData((old) => {
                                            return { ...old, payment_amount: e.target.value };
                                        })
                                    }
                                    id="paymentAmt"
                                />
                            </div>
                            <div>
                                <label className="text-teal-700 font-semibold text-xs" htmlFor="paymentDate">
                                    Payment Date
                                </label>
                                <Input
                                    onChange={(e) =>
                                        setModelData((old) => {
                                            return { ...old, payment_date: e.target.value };
                                        })
                                    }
                                    id="paymentDate"
                                    type="date"
                                />
                            </div>
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="yellow" mr={3} onClick={() => updatePaymentFn()}>
                            Update
                        </Button>
                        <Button
                            colorScheme="blackAlpha"
                            onClick={() => {
                                setIsModelOpen(false);
                                setSelectedRowData(null);
                            }}
                        >
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <TableContainer>
                <Table size="sm">
                    <Thead bg={"teal.100"}>
                        <Tr>
                            <Th py={2}>Order ID</Th>
                            <Th isNumeric py={2}>
                                Order Value
                            </Th>
                            <Th isNumeric py={2}>
                                Invoice Value
                            </Th>
                            <Th isNumeric py={2}>
                                Discount
                            </Th>
                            <Th isNumeric py={2}>
                                Total
                            </Th>
                            <Th isNumeric py={2}>
                                Advance
                            </Th>
                            <Th isNumeric py={2}>
                                Net Total
                            </Th>
                            <Th isNumeric py={2}>
                                Refund
                            </Th>
                            <Th isNumeric py={2}>
                                COD
                            </Th>
                            <Th isNumeric py={2}>
                                Status
                            </Th>
                            <Th isNumeric py={2}>
                                Action
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {records.length ? (
                            records.map((el) => (
                                <Tr className="hover:bg-teal-50">
                                    <Td>{el.orderId}</Td>
                                    <Td isNumeric>{el.partialCancelOrderInfo ? el.partialCancelOrderInfo.orderedAmtInfo.grand_total : el.grand_total}</Td>
                                    <Td isNumeric>
                                        {el.saleInvoice ? (
                                            el.grand_total
                                        ) : (
                                            <Badge userSelect={"none"} p={1} variant="outline" colorScheme="green">
                                                Invoice Not generated
                                            </Badge>
                                        )}
                                    </Td>
                                    <Td isNumeric>{el.discounted_amount ? el.discounted_amount : 0}</Td>
                                    <Td isNumeric>
                                        {el.partialCancelOrderInfo
                                            ? (el.partialCancelOrderInfo.orderedAmtInfo.grand_total - el.discounted_amount).toFixed(2)
                                            : (el.grand_total - el.discounted_amount).toFixed(2)}
                                    </Td>
                                    <Td textColor={"whatsapp.700"} fontWeight={"bold"} isNumeric>
                                        {el.payment_id.payment_status === "RECEIVED"
                                            ? el.payment_id.payment_amount
                                            : el.payment_id.payment_status === "PENDING"
                                            ? 0
                                            : el.payment_id.partial_payment.payment_amount}
                                    </Td>
                                    <Td isNumeric>{el.payment_id.balance_amount}</Td>
                                    <Td isNumeric>{el.payment_id && el.payment_id.return_amount && el.payment_id.return_amount}</Td>
                                    <Td isNumeric>{el.payment_id.balance_amount}</Td>
                                    <Td isNumeric>
                                        {el.payment_id.payment_status === "RECEIVED" ? (
                                            <Badge userSelect={"none"} p={1} variant="solid" colorScheme="green">
                                                {capitalizeString(el.payment_id.payment_status)}
                                            </Badge>
                                        ) : el.payment_id.payment_status === "REFUNDED" || el.payment_id.payment_status === "FAILED" ? (
                                            <Badge userSelect={"none"} p={1} variant={"solid"} colorScheme="red">
                                                {capitalizeString(el.payment_id.payment_status)}
                                            </Badge>
                                        ) : (
                                            <Badge userSelect={"none"} p={1} variant={"outline"} colorScheme="messenger">
                                                {capitalizeString(el.payment_id.payment_status)}
                                            </Badge>
                                        )}
                                    </Td>
                                    <Td isNumeric className="flex items-center justify-end">
                                        <BiSolidMessageSquareEdit
                                            color="#e34b7b"
                                            onClick={() => {
                                                setIsModelOpen(true);
                                                setSelectedRowData(el);
                                            }}
                                            size={30}
                                            cursor={"pointer"}
                                        />
                                    </Td>
                                </Tr>
                            ))
                        ) : (
                            <Tr>
                                <Td colSpan={4} textStyle={"italic"}>
                                    No record found...
                                </Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default AllPayments;
