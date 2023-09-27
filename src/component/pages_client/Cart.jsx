import React, { useState } from "react";
import { applyPromoCodeApi, createOrderApi, getAllAddressApi, getCartsByCustomerApi, qtyIncreaseDecreaseApi, removeFromCartApi } from "../../apis/clientApis";
import { Button, useToast, useDisclosure, Select, Badge } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userInfoAdd } from "../../Redux/ReducerAction";

const Cart = ({ tokenReducer, userInfoReducer, storeInfoReducer }) => {
    const toast = useToast();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [cartData, setCartData] = useState();
    const [promoCode, setPromoCode] = useState({
        code: "",
        amount: 0,
    });
    const [addresses, setAddresses] = useState([]);
    const [checkoutLoadingFlag, setCheckoutLoadingFlag] = useState(false);
    const [isRemoveLoading, setIsRemoveLogin] = useState([false, null]);
    const [paymentField, setPaymentField] = useState({
        addressId: "",
        paymentMode: "",
        paymentAmt: "",
    });
    const priceCal = (price, margin, gst) => {
        let marginAmt = Number(price) + (Number(price) * Number(margin)) / 100;
        let gstAmt = (Number(marginAmt) * Number(gst)) / 100;
        return (gstAmt + marginAmt).toFixed(2);
    };
    const totalPriceCalc = (products) => {
        let totalPrice = 0;
        products.forEach((element) => {
            let { seller_price, margin, sellingGST } = element.product_id;
            totalPrice += Number(element.qty) * Number(priceCal(seller_price, margin, sellingGST));
        });
        return totalPrice.toFixed(2);
    };
    const fetchCartValue = async () => {
        await getCartsByCustomerApi(userInfoReducer.customerId, tokenReducer)
            .then((res) => {
                console.log(res.data);
                setCartData(res.data.data);
                dispatch(userInfoAdd(res.data.customerData))
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const removeFromCart = async (index) => {
        console.log(index);
        setIsRemoveLogin([true, index]);
        await removeFromCartApi(userInfoReducer.customerId, index, tokenReducer)
            .then((res) => {
                console.log(res);
                toast({
                    status: "success",
                    position: "top",
                    title: res.data.message,
                    isClosable: true,
                });
                fetchCartValue();
            })
            .catch((err) => {
                console.log(err);
                toast({
                    status: "error",
                    position: "top",
                    title: err.message,
                    isClosable: true,
                });
            });
        setIsRemoveLogin([true, null]);
    };

    const applyPromoCode = async () => {
        let totalPrice = totalPriceCalc(cartData.products);
        let data = {
            couponCode: promoCode.code,
            orderAmount: totalPrice,
        };
        if (cartData && cartData.products.length > 0 && totalPrice && promoCode.code) {
            await applyPromoCodeApi(userInfoReducer.customerId, data, tokenReducer)
                .then((res) => {
                    console.log(res.data);
                    if (res.data.status) {
                        setPromoCode((old) => {
                            return { ...old, amount: res.data.data };
                        });
                    } else {
                        setPromoCode({ code: "", amount: 0 });
                    }
                    toast({
                        status: "success",
                        position: "top",
                        title: res.data.message,
                        isClosable: true,
                    });
                })
                .catch((err) => {
                    console.log(err);
                    setPromoCode({ code: "", amount: 0 });
                    let message = err.response ? err.response.data.message : err.message;
                    toast({
                        status: "error",
                        position: "top",
                        title: message,
                        isClosable: true,
                    });
                });
        } else {
            toast({
                status: "warning",
                position: "top",
                title: "Promo Code is required",
                isClosable: true,
            });
        }
    };
    const qtyHandler = async (type, index, moq, qty) => {
        let qty1 = qty;
        if (type === "DEC" && moq !== qty) {
            qty1 = qty - moq;
            await qtyIncreaseDecreaseApi(userInfoReducer.customerId, index, qty1, tokenReducer)
                .then((res) => {
                    console.log(res);
                    fetchCartValue();
                })
                .catch((err) => {
                    console.log(err);
                    toast({
                        status: "error",
                        position: "top",
                        title: err.message,
                        isClosable: true,
                    });
                });
        } else if (type === "INC") {
            qty1 = qty + moq;
            await qtyIncreaseDecreaseApi(userInfoReducer.customerId, index, qty1, tokenReducer)
                .then((res) => {
                    console.log(res);
                    fetchCartValue();
                })
                .catch((err) => {
                    console.log(err);
                    toast({
                        status: "error",
                        position: "top",
                        title: err.message,
                        isClosable: true,
                    });
                });
        }
    };
    const getAllAddress = async () => {
        await getAllAddressApi(userInfoReducer.customerId, tokenReducer)
            .then((res) => {
                console.log(res);
                setAddresses(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const paymentModeHandler = (mode) => {
        let amtOld = cartData ? totalPriceCalc(cartData.products) - promoCode.amount : 0;
        if (mode === "TWENTY_ADV") {
            let amt = (amtOld * 20) / 100;
            setPaymentField((old) => {
                return { ...old, paymentMode: mode, paymentAmt: amt.toFixed(2) };
            });
        } else if (mode === "PREPAID" || mode === "COD") {
            setPaymentField((old) => {
                return { ...old, paymentMode: mode, paymentAmt: amtOld.toFixed(2) };
            });
        } else {
            setPaymentField((old) => {
                return { ...old, paymentMode: mode, paymentAmt: "" };
            });
        }
    };
    const checkoutMethod = async () => {
        let data = {
            address_id: "",
            payment_mode: "",
            paymentAmt: "",
            transaction_id: "demo transaction id",
        };
        if (cartData && cartData.products.length > 0 && paymentField.paymentAmt && paymentField.paymentMode) {
            data.payment_mode = paymentField.paymentMode;
            data.paymentAmt = paymentField.paymentAmt;
            if (!paymentField.addressId) {
                data.address_id = userInfoReducer.defaultAddressId;
            } else {
                data.address_id = paymentField.addressId;
            }
            if (promoCode.code) data.couponCode = promoCode.code;
            setCheckoutLoadingFlag(true);
            await createOrderApi(data, userInfoReducer.customerId, tokenReducer)
                .then((res) => {
                    console.log(res.data);
                    toast({
                        status: "success",
                        position: "top",
                        title: res.data.message,
                        isClosable: true,
                    });
                    setPromoCode({ code: "", amount: 0 });
                    setPaymentField({
                        addressId: "",
                        paymentMode: "",
                        paymentAmt: "",
                    });
                    fetchCartValue();
                })
                .catch((err) => {
                    let message = err.response ? err.response.data.message : err.message;
                    toast({
                        status: "error",
                        position: "top",
                        title: message,
                        isClosable: true,
                    });
                });
            setCheckoutLoadingFlag(false);
        } else {
            if (cartData && cartData.products.length === 0) {
                toast({
                    status: "warning",
                    position: "top",
                    title: "Your Cart is Empty!",
                    isClosable: true,
                });
            } else {
                toast({
                    status: "warning",
                    position: "top",
                    title: "All fields required",
                    isClosable: true,
                });
            }
        }
        console.log(paymentField);
    };
    React.useEffect(() => {
        fetchCartValue();
        getAllAddress();
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="pt-[100px] md:pt-[80px] md:px-[20px] lg:px-[10%] bg-gray-100">
            <div className="container mx-auto mt-10 pb-20">
                <div className="flex flex-col sm:flex-row shadow-md px-2 sm:px-0">
                    <div className="w-full sm:w-3/4 bg-white px-10 py-10">
                        <div className="flex justify-between border-b pb-2 sm:pb-8">
                            <h1 className="font-semibold text-lg sm:text-2xl">Shopping Cart</h1>
                            <h2 className="font-semibold text-lg sm:text-2xl">{cartData && cartData.products.length} Items</h2>
                        </div>
                        <div className="hidden sm:flex mt-10 mb-5">
                            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
                            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Quantity</h3>
                            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Price/Unit</h3>
                            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Total</h3>
                        </div>
                        {cartData &&
                            cartData.products.map((el, idx) => (
                                <div key={el._id} className="flex flex-col sm:flex-row sm:items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                                    <div className="flex w-full sm:w-2/5">
                                        <div className="w-20 cursor-pointer" onClick={() => navigate(`/product/${el.product_id.slug}`)}>
                                            <img className="h-24" src={el.product_id.thumbnail_pic} alt="" />
                                        </div>
                                        <div className="flex flex-col justify-start sm:justify-between ml-4 flex-grow">
                                            <span className="font-bold text-sm">{el.product_id.product_name}</span>
                                            <div className="text-sm flex items-center justify-start space-x-1">
                                                <span>{el.color.colorName}</span>
                                                <Badge>{el.lotSize}</Badge>
                                            </div>
                                            <div className="flex sm:flex-col space-x-2 sm:space-x-0 sm:space-y-2 items-start justify-start">
                                                <span className="text-red-500 text-xs">{el.product_id.brandId.brand_name}</span>
                                                <Button
                                                    onClick={() => removeFromCart(idx)}
                                                    size={"xs"}
                                                    isLoading={isRemoveLoading[1] === idx && isRemoveLoading[0]}
                                                    variant={"unstyled"}
                                                    loadingText={"Please wait"}
                                                >
                                                    Remove
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between sm:justify-center w-full sm:w-1/5">
                                        <div className="flex items-center justify-between">
                                            <svg
                                                onClick={() => qtyHandler("DEC", idx, el.product_id.min_order_qty, el.qty)}
                                                className="cursor-pointer fill-current text-gray-600 w-3"
                                                viewBox="0 0 448 512"
                                            >
                                                <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                                            </svg>

                                            <input className="mx-2 border text-center w-8 outline-none" type="text" value={el.qty} readOnly />

                                            <svg
                                                onClick={() => qtyHandler("INC", idx, el.product_id.min_order_qty, el.qty)}
                                                className="cursor-pointer fill-current text-gray-600 w-3"
                                                viewBox="0 0 448 512"
                                            >
                                                <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                                            </svg>
                                        </div>
                                        <div className="sm:hidden flex flex-col">
                                            <span className="text-center  font-semibold text-sm">Price: ₹{priceCal(el.product_id.seller_price, el.product_id.margin, el.product_id.sellingGST)}</span>
                                            <span className="text-center font-semibold text-sm">
                                                Total: ₹{(priceCal(el.product_id.seller_price, el.product_id.margin, el.product_id.sellingGST) * el.qty).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                    <span className="hidden sm:block text-center w-1/5 font-semibold text-sm">
                                        ₹{priceCal(el.product_id.seller_price, el.product_id.margin, el.product_id.sellingGST)}
                                    </span>
                                    <span className="hidden sm:block text-center w-1/5 font-semibold text-sm">
                                        ₹{(priceCal(el.product_id.seller_price, el.product_id.margin, el.product_id.sellingGST) * el.qty).toFixed(2)}
                                    </span>
                                </div>
                            ))}

                        <a href="/products" className="flex font-semibold text-indigo-600 text-sm mt-10 w-fit">
                            <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512">
                                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                            </svg>
                            Continue Shopping
                        </a>
                    </div>

                    <div id="summary" className="w-full sm:w-1/3 px-2 sm:px-8 py-10">
                        <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
                        <div className="flex justify-between mt-10 mb-5">
                            <span className="font-semibold text-sm uppercase">Items {cartData && cartData.products.length}</span>
                            <span className="font-semibold text-sm">₹{cartData && totalPriceCalc(cartData.products)}</span>
                        </div>
                        <div className="py-5">
                            <label htmlFor="promo" className="font-semibold inline-block mb-3 text-sm uppercase">
                                Promo Code
                            </label>
                            <input
                                value={promoCode.code}
                                onChange={(e) =>
                                    setPromoCode((old) => {
                                        return { ...old, code: e.target.value };
                                    })
                                }
                                type="text"
                                id="promo"
                                placeholder="Enter your code"
                                className="p-2 text-sm w-full"
                            />
                            {promoCode.amount > 0 && <p className="text-xs text-red-600">Applied discount ₹{promoCode.amount}</p>}
                        </div>
                        <Button onClick={() => applyPromoCode()} borderRadius={0} colorScheme="red">
                            Apply
                        </Button>
                        <div className="border-t mt-8">
                            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                                <span>Total cost</span>
                                <span>₹{cartData && (totalPriceCalc(cartData.products) - promoCode.amount).toFixed(2)}</span>
                            </div>
                            {cartData && cartData.products.length > 0 && (
                                <>
                                    <div>
                                        <label className="text-xs font-semibold" htmlFor="address">
                                            Select Address
                                        </label>
                                        <Select
                                            backgroundColor={"white"}
                                            onChange={(e) =>
                                                setPaymentField((old) => {
                                                    return { ...old, addressId: e.target.value };
                                                })
                                            }
                                            value={paymentField.addressId}
                                            defaultValue={userInfoReducer.defaultAddressId}
                                            size={"sm"}
                                            id="address"
                                            placeholder="Select Address"
                                        >
                                            {addresses.map((el) => (
                                                <option key={el._id} value={el._id}>
                                                    {el.pincode}, {el.city}
                                                </option>
                                            ))}
                                        </Select>
                                    </div>
                                    <div className="mt-2">
                                        <label className="text-xs font-semibold" htmlFor="paymentmode">
                                            Payment Mode
                                        </label>
                                        <Select
                                            value={paymentField.paymentMode}
                                            backgroundColor={"white"}
                                            onChange={(e) => paymentModeHandler(e.target.value)}
                                            size={"sm"}
                                            id="paymentmode"
                                            placeholder="Select Mode"
                                        >
                                            <option value={"CUSTOM"}>Custom Amount</option>
                                            <option value={"TWENTY_ADV"}>20 % of Total Amount</option>
                                            <option value={"PREPAID"}>Prepaid</option>
                                            <option value={"COD"}>Cash on Delivery</option>
                                        </Select>
                                    </div>
                                    {paymentField.paymentMode && (paymentField.paymentMode === "CUSTOM" || paymentField.paymentMode === "TWENTY_ADV") && (
                                        <div className="mt-2">
                                            <label className="text-xs font-semibold" htmlFor="paymentamt">
                                                Payment Amount
                                            </label>
                                            <input
                                                onChange={(e) =>
                                                    setPaymentField((old) => {
                                                        return { ...old, paymentAmt: e.target.value };
                                                    })
                                                }
                                                disabled={paymentField.paymentMode === "TWENTY_ADV"}
                                                value={paymentField.paymentAmt}
                                                type="text"
                                                id="paymentamt"
                                                placeholder="Enter amount"
                                                className="p-2 text-sm w-full bg-white disabled:text-gray-400"
                                            />
                                        </div>
                                    )}
                                </>
                            )}
                            <Button isLoading={checkoutLoadingFlag} loadingText="Please wait" borderRadius={0} colorScheme="messenger" onClick={() => checkoutMethod()} width={"full"} mt={5}>
                                Checkout
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
