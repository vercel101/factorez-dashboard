import React, { useEffect, useState } from "react";
import { Badge, Button, Image, Table, Tbody, Td, Tr, useToast } from "@chakra-ui/react";
import { BiSolidCheckbox } from "react-icons/bi";
import { BsFiletypePdf } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { downloadCustomerInvoiceByInvoiceNumberApi, getOrderByOrderIdApi } from "../../apis/clientApis";
import { localDateInIndiaTime } from "../../utils/stringToLocalDate";

const OrderInfo = ({ tokenReducer, userInfoReducer, storeInfoReducer }) => {
    const toast = useToast();
    const [order, setOrder] = useState(null);
    const [isDownloadingInv, setIsDownloadingInv] = useState(false);
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

    const calcAmtPerProduct = (price, margin, gst, qty) => {
        let priceWithMargin = price + (price * margin) / 100;
        let priceWithTax = priceWithMargin + (priceWithMargin * gst) / 100;
        return (priceWithTax * qty).toFixed(2);
    };

    const downloadPdfFn = async (invoiceNumber, invType) => {
        setIsDownloadingInv((old) => true);
        await downloadCustomerInvoiceByInvoiceNumberApi(invoiceNumber, invType, tokenReducer)
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
        setIsDownloadingInv((old) => false);
    };

    useEffect(() => {
        fetchOrder();
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-[100px] md:pt-[80px] px-2 md:px-[20px] lg:px-[10%] bg-white">
            <div className="border rounded my-4 p-2 md:m-5 md:p-5">
                {order && (
                    <div>
                        <div className="flex items-start justify-between">
                            <h1 className="font-bold text-md md:text-lg">Order ID: {order.orderId}</h1>
                            {order.saleInvoice && (
                                <Button
                                    isLoading={isDownloadingInv}
                                    loadingText={"Downloading..."}
                                    onClick={() => downloadPdfFn(order.saleInvoice.invoiceNo, "SALE")}
                                    variant={"outline"}
                                    colorScheme="green"
                                    leftIcon={<BsFiletypePdf />}
                                    size={"xs"}
                                >
                                    Invoice
                                </Button>
                            )}
                        </div>
                        <div className="md:space-x-3 text-xs md:text-sm flex flex-col md:flex-row">
                            <span className="text-gray-600 ">
                                Order Date: <span className="text-gray-800">{localDateInIndiaTime(order.order_date)}</span>
                            </span>
                            <span className="text-teal-600 hidden md:block">|</span>
                            <span className="text-orange-600">
                                Estimated Delivery: <span>----</span>
                            </span>
                        </div>
                        <hr className="my-5" />
                        <div>
                            {order.ordered_products.products.map((el) => (
                                <div key={el._id} className="flex mt-2">
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
                                                        <Badge>{el.lotSize}</Badge>
                                                    </span>
                                                </div>
                                                <div className="flex flex-col items-start">
                                                    <div className="flex items-center">
                                                        <BiSolidCheckbox color={el.color.colorHex} size={25} /> <span>{el.color.colorName}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-end">
                                                <div className="font-semibold">₹{calcAmtPerProduct(el.seller_price, el.margin, el.selling_gst, el.qty)}</div>
                                                <div className="text-sm text-neutral-400">Qty:{el.qty}</div>
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
                                    Payment Mode: <Badge colorScheme="whatsapp">{order.payment_id.payment_mode === "TWENTY_ADV" ? "20% Advance" : order.payment_id.payment_mode}</Badge>
                                    {(order.payment_id.payment_mode === "CUSTOM" || order.payment_id.payment_mode === "TWENTY_ADV") && (
                                        <>
                                            <div className="text-xs mb-1">
                                                Payment Amount: ₹<span>{order.payment_id.partial_payment.payment_amount}</span>
                                            </div>
                                            Payment Mode: <Badge colorScheme="messenger">COD</Badge>
                                            <div className="text-xs">
                                                Cash on delivery Amount: ₹<span className="font-bold text-blue-700">{order.payment_id.balance_amount}</span>
                                            </div>
                                        </>
                                    )}
                                    {order.payment_id.payment_mode === "COD" && (
                                        <div className="text-xs">
                                            Cash on delivery Amount: ₹<span className="font-bold text-blue-700">{order.payment_id.balance_amount}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>
                                <h1 className="font-semibold mb-2">Delivery</h1>
                                <div>
                                    <span className="text-sm text-neutral-400">Address</span>
                                    <div className="pe-5">{order.shipping_address.address}</div>
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
                                                    ₹{order.total.toFixed(2)}
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td ps={0} py={1} borderBlock={0} className="text-neutral-400 text-sm">
                                                    Discount
                                                </Td>
                                                <Td pe={0} py={1} borderBlock={0} isNumeric className="text-neutral-400 text-sm">
                                                    - ₹{order.discounted_amount}
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
                                                    + ₹{order.GST_amount}
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
                                                    ₹{order.grand_total.toFixed(2)}
                                                </Td>
                                            </Tr>
                                            {(order.payment_id.payment_mode === "CUSTOM" || order.payment_id.payment_mode === "TWENTY_ADV") && (
                                                <>
                                                    <Tr>
                                                        <Td ps={0} py={1} borderBlock={0} className="text-neutral-400 text-sm">
                                                            Advance
                                                        </Td>
                                                        <Td pe={0} py={1} borderBlock={0} isNumeric className="text-neutral-400 text-sm">
                                                            - ₹{order.payment_id.partial_payment.payment_amount}
                                                        </Td>
                                                    </Tr>
                                                    <Tr className="font-bold">
                                                        <Td ps={0} py={3} borderBlock={0}>
                                                            COD Pay
                                                        </Td>
                                                        <Td pe={0} py={3} borderBlock={0} isNumeric>
                                                            ₹{order.payment_id.balance_amount}
                                                        </Td>
                                                    </Tr>
                                                </>
                                            )}
                                            {(order.payment_id.payment_mode === "COD" || order.payment_id.payment_mode === "PREPAID") && (
                                                <Tr className="font-bold">
                                                    <Td ps={0} py={3} borderBlock={0}>
                                                        COD Pay
                                                    </Td>
                                                    <Td pe={0} py={3} borderBlock={0} isNumeric>
                                                        ₹{order.payment_id.balance_amount}
                                                    </Td>
                                                </Tr>
                                            )}
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
