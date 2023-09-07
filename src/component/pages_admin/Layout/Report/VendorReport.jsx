import React from "react";
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Badge } from "@chakra-ui/react";

const VendorReport = ({ tokenReducer,userInfoReducer }) => {
    return (
        <div>
            <TableContainer>
                <Table size="sm">
                    <Thead bg={'teal.100'}>
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
                        <Tr className="hover:bg-teal-50">
                            <Td>ABCDEFG</Td>
                            <Td>6000</Td>
                            <Td>4000</Td>
                            <Td>6000</Td>
                            <Td>0</Td>
                            <Td>4000</Td>
                            <Td>2000</Td>
                            <Td>0</Td>
                            <Td>
                                <Badge variant="outline" colorScheme="green">
                                    Not Refunded
                                </Badge>
                            </Td>
                        </Tr>
                        <Tr className="hover:bg-teal-50">
                            <Td>ABCDEFG</Td>
                            <Td>6000</Td>
                            <Td>4000</Td>
                            <Td>6000</Td>
                            <Td>0</Td>
                            <Td>4000</Td>
                            <Td>2000</Td>
                            <Td>0</Td>
                            <Td>
                                <Badge variant="outline" colorScheme="green">
                                    Not Refunded
                                </Badge>
                            </Td>
                        </Tr>
                        <Tr className="hover:bg-teal-50">
                            <Td>ABCDEFG</Td>
                            <Td>6000</Td>
                            <Td>4000</Td>
                            <Td>6000</Td>
                            <Td>0</Td>
                            <Td>4000</Td>
                            <Td>2000</Td>
                            <Td>0</Td>
                            <Td>
                                <Badge variant="subtle" colorScheme="green">
                                    Payment Received
                                </Badge>
                            </Td>
                        </Tr>
                        <Tr className="hover:bg-teal-50">
                            <Td>ABCDEFG</Td>
                            <Td>6000</Td>
                            <Td>4000</Td>
                            <Td>6000</Td>
                            <Td>0</Td>
                            <Td>4000</Td>
                            <Td>2000</Td>
                            <Td>0</Td>
                            <Td>
                                <Badge variant="solid" colorScheme="green">
                                    Refunded
                                </Badge>
                            </Td>
                        </Tr>
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

export default VendorReport;
