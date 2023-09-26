import React, { useEffect, useState } from "react";
import { Badge, Button, Image, Table, Tbody, Td, Tr } from "@chakra-ui/react";
import { BiSolidCheckbox } from "react-icons/bi";
import { BsFiletypePdf } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { getOrderByOrderIdApi } from "../../apis/clientApis";
import { localDateInIndiaTime } from "../../utils/stringToLocalDate";

const OrderInfo = ({ tokenReducer, userInfoReducer, storeInfoReducer }) => {
    const [order, setOrder] = useState(null);
    let { orderId } = useParams();
    const fetchOrder = async () => {
        await getOrderByOrderIdApi(userInfoReducer.customerId, orderId, tokenReducer)
            .then((res) => {
                console.log(res.data);
                setOrder(res.data.data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    useEffect(() => {
        fetchOrder();
    }, []);

    return (
        <div className="pt-[100px] md:pt-[80px] px-2 md:px-[20px] lg:px-[10%] bg-white">
            <div className="border rounded my-4 p-2 md:m-5 md:p-5">
                {order && (
                    <div>
                        <div className="flex items-start justify-between">
                            <h1 className="font-bold text-md md:text-lg">Order ID: {order.orderId}</h1>
                            <Button variant={"outline"} colorScheme="green" leftIcon={<BsFiletypePdf />} size={"xs"}>
                                Invoice
                            </Button>
                        </div>
                        <div className="md:space-x-3 text-xs md:text-sm flex flex-col md:flex-row">
                            <span className="text-gray-600 ">
                                Order Date: <span className="text-gray-800">{localDateInIndiaTime(order.order_date)}</span>
                            </span>
                            <span className="text-teal-600 hidden md:block">|</span>
                            <span className="text-orange-600">
                                Estimated Delivery: <span>22 Feb 2023</span>
                            </span>
                        </div>
                        <hr className="my-5" />
                        <div>
                            {order.ordered_products.products.map((el) => (
                                <div className="flex mt-2">
                                    <div className="p-3 border w-fit h-fit rounded-lg bg-gray-50">
                                        <Image className="h-16 w-16" src={el.product_id.thumbnail_pic} />
                                    </div>
                                    <div className="px-3 w-full">
                                        <div>
                                            <span>{el.product_id.product_name}</span>
                                        </div>
                                        <div className="flex items-center justify-between w-full">
                                            <div>
                                                <div>
                                                    <span>
                                                        <Badge>5/2 6/2 7/3 8/3</Badge>
                                                    </span>
                                                </div>
                                                <div className="flex flex-col items-start">
                                                    <div className="flex items-center">
                                                        <BiSolidCheckbox color="#ff0000" size={25} /> <span>Red</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-end">
                                                <div className="font-semibold">₹15867.98</div>
                                                <div className="text-sm text-neutral-400">Qty:1</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <hr className="my-5" />
                        <div className="grid space-y-5 md:space-y-0 grid-cols-1 md:grid-cols-2">
                            <div>
                                <h1 className="font-semibold mb-2">Payment</h1>
                                <div>
                                    Payment Mode: <Badge>COD</Badge>
                                </div>
                            </div>
                            <div>
                                <h1 className="font-semibold mb-2">Delivery</h1>
                                <div>
                                    <span className="text-sm text-neutral-400">Address</span>
                                    <div className="pe-5">847 chauhan gali, near mata dairy, vasundhara enclave, New Ashok nagar, New Delhi 110041</div>
                                </div>
                            </div>
                        </div>
                        <hr className="my-5" />
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div>
                                <h1></h1>
                            </div>
                            <div>
                                <h1 className="font-semibold">Order Summery</h1>
                                <div>
                                    <Table>
                                        <Tbody>
                                            <Tr>
                                                <Td ps={0} py={1} borderBlock={0}>
                                                    Subtotal
                                                </Td>
                                                <Td pe={0} py={1} borderBlock={0} isNumeric>
                                                    ₹15867.98
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td ps={0} py={1} borderBlock={0} className="text-neutral-400 text-sm">
                                                    Discount
                                                </Td>
                                                <Td pe={0} py={1} borderBlock={0} isNumeric className="text-neutral-400 text-sm">
                                                    (20%) - ₹1250
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td ps={0} py={1} borderBlock={0} className="text-neutral-400 text-sm">
                                                    Delivery
                                                </Td>
                                                <Td pe={0} py={1} borderBlock={0} isNumeric className="text-neutral-400 text-sm">
                                                    + ₹0.00
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td ps={0} py={1} borderBlock={0} className="text-neutral-400 text-sm">
                                                    Tax
                                                </Td>
                                                <Td pe={0} py={1} borderBlock={0} isNumeric className="text-neutral-400 text-sm">
                                                    + ₹15867.98
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td p={0} py={2} colSpan={2} borderStyle={"dashed"}></Td>
                                            </Tr>
                                            <Tr>
                                                <Td ps={0} py={3} borderBlock={0}>
                                                    Total
                                                </Td>
                                                <Td pe={0} py={3} borderBlock={0} isNumeric>
                                                    ₹15867.98
                                                </Td>
                                            </Tr>
                                        </Tbody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderInfo;
