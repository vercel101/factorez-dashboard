import React from "react";
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Badge } from "@chakra-ui/react";
import { getOrderReportApi } from "../../../../apis/adminApis";

const CustomerReport = ({ tokenReducer, userInfoReducer }) => {
    const [records, setRecords] = React.useState([]);
    const fetchOrderReport = async () => {
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
        fetchOrderReport();
    }, []);
    return (
        <div>
            <TableContainer>
                <Table size="sm">
                    <Thead bg={"teal.100"}>
                        <Tr>
                            <Th>Order ID</Th>
                            <Th>Order Value</Th>
                            <Th>Invoice Value</Th>
                            <Th>Advance</Th>
                            <Th>Discount</Th>
                            <Th>Total</Th>
                            <Th>Refund</Th>
                            <Th>COD</Th>
                            <Th>Status</Th>
                            {/* <Th isNumeric>multiply by</Th> */}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {records.length ? (
                            records.map((el) => (
                                <Tr className="hover:bg-teal-50">
                                    <Td>{el.orderId}</Td>
                                    <Td>{el.partialCancelOrderInfo ? el.partialCancelOrderInfo.orderedAmtInfo.grand_total : el.grand_total}</Td>
                                    <Td>{el.grand_total}</Td>
                                    <Td>{el.payment_id.partial_payment ? el.payment_id.partial_payment.payment_amount : el.payment_id.payment_amount ? el.payment_id.payment_amount : 0}</Td>
                                    <Td>{el.discounted_amount ? el.discounted_amount : 0}</Td>
                                    <Td>
                                        {el.partialCancelOrderInfo
                                            ? (el.partialCancelOrderInfo.orderedAmtInfo.grand_total - el.discounted_amount).toFixed(2)
                                            : (el.grand_total - el.discounted_amount).toFixed(2)}
                                    </Td>
                                    <Td>0</Td>
                                    <Td>{el.payment_id.balance_amount}</Td>
                                    <Td>
                                        <Badge userSelect={"none"} variant="outline" colorScheme="green">
                                            Pending
                                        </Badge>
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
                    {/* <Tfoot>
                        <Tr>
                            <Th>To convert</Th>
                            <Th>into</Th>
                            <Th isNumeric>multiply by</Th>
                        </Tr>
                    </Tfoot> */}
                </Table>
            </TableContainer>
        </div>
    );
};

export default CustomerReport;
