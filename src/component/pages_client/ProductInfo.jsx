import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addToCartApi, getAllAddressApi, getProductInfoApi, setDefaultAddressApi } from "../../apis/clientApis";
import { BsCart, BsTruck, BsFillSquareFill } from "react-icons/bs";
import { PiStorefrontThin } from "react-icons/pi";
import { FcFlashOn } from "react-icons/fc";
import { FaLocationDot } from "react-icons/fa6";
import {
    Badge,
    Button,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Radio,
    RadioGroup,
    Stack,
    Table,
    Tbody,
    Td,
    Tr,
    useToast,
} from "@chakra-ui/react";
import { GrEdit } from "react-icons/gr";
import { Select, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { userInfoAdd } from "../../Redux/ReducerAction";

const ProductInfo = ({ tokenReducer, userInfoReducer, storeInfoReducer, categoryFilterReducer }) => {
    const toast = useToast();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [addresses, setAddresses] = useState([]);
    const [lotValue, setLotValue] = useState("");
    const [colorValue, setColorValue] = useState("");
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(false); //isBuyItNowLoading
    const [isBuyItNowLoading, setIsBuyItNowLoading] = useState(false);
    const [selectPair, setSelectPair] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    let { productId } = useParams();

    const priceCal = (price, margin, gst) => {
        let marginAmt = Number(price) + (Number(price) * Number(margin)) / 100;
        let gstAmt = (Number(marginAmt) * Number(gst)) / 100;
        return (gstAmt + marginAmt).toFixed(2);
    };
    const taxableAmtAntGstAmt = (price, margin, gst) => {
        let marginAmt = Number(price) + (Number(price) * Number(margin)) / 100;
        let gstAmt = (Number(marginAmt) * Number(gst)) / 100;
        return `₹${marginAmt.toFixed(2)} + ₹${gstAmt.toFixed(2)} GST`;
    };
    const listOfPairs = (pairs) => {
        var sum = 0,
            i = 0;
        let strLength = pairs.length;
        while (strLength > 0) {
            if (pairs[i] === "/") {
                sum += Number(pairs[i + 1]);
            }
            strLength--;
            i++;
        }
        let arr = [];
        for (let x = 1; x <= 20; x++) {
            arr.push(sum * x);
        }
        return arr;
    };

    const totalPrice = (price, margin, gst) => {
        let marginAmt = Number(price) + (Number(price) * Number(margin)) / 100;
        let gstAmt = (Number(marginAmt) * Number(gst)) / 100;
        let total = marginAmt + gstAmt;
        return [total.toFixed(2), (total * selectPair).toFixed(2)];
    };

    const getProductInfo = async () => {
        await getProductInfoApi(productId, tokenReducer)
            .then((res) => {
                console.log(res.data);
                setProduct(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const addToCart = async (wantToByNow) => {
        if (product && selectPair && lotValue && colorValue) {
            let productObj = {
                product_id: product._id,
                qty: selectPair,
                lotSize: lotValue,
                colorId: colorValue,
            };
            if (wantToByNow) {
                setIsBuyItNowLoading(true);
            } else {
                setIsLoading(true);
            }
            await addToCartApi(userInfoReducer.customerId, productObj, tokenReducer)
                .then((res) => {
                    console.log(res.data);
                    setColorValue("");
                    setLotValue("");
                    setSelectPair("");
                    toast({
                        title: res.data.message,
                        position: "top",
                        isClosable: true,
                        status: "success",
                    });
                    dispatch(userInfoAdd(res.data.data));
                    if (wantToByNow) {
                        navigate("/cart");
                    }
                })
                .catch((err) => {
                    console.log(err);
                    let message = err.response ? err.response.data.message : err.message;
                    toast({
                        title: message,
                        position: "top",
                        isClosable: true,
                        status: "error",
                    });
                });
            if (wantToByNow) {
                setIsBuyItNowLoading(false);
            } else {
                setIsLoading(false);
            }
        } else {
            toast({
                status: "warning",
                position: "top",
                title: "All fields are required",
                isClosable: true,
            });
        }
    };
    const defaultAddress = async (addressId, index) => {
        await setDefaultAddressApi(userInfoReducer.customerId, addressId, tokenReducer)
            .then((res) => {
                console.log(res.data);
                let data = res.data.data;
                toast({
                    position: "top",
                    status: "success",
                    isClosable: true,
                    title: "Pincode Changed",
                });
                dispatch(userInfoAdd(data));
            })
            .catch((err) => {
                console.log(err);
                let message = err.response && err.response.data.message ? err.response.data.message : err.message;
                toast({
                    position: "top",
                    title: message,
                    isClosable: true,
                    status: "error",
                });
            });
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
    const getPincode = () => {
        let idx = addresses.findIndex((o) => {
            if (o._id === userInfoReducer.defaultAddressId) {
                return o;
            }
        });
        if (idx >= 0) {
            return addresses[idx].pincode;
        } else {
            return "Select";
        }
    };
    const lotPairHandler = (event) => {
        setLotValue(event);
        console.log(event);
    };

    console.log(categoryFilterReducer);

    useEffect(() => {
        getProductInfo();
        window.scrollTo(0, 0);
        getAllAddress();
    }, []);
    // console.log(productId);
    return (
        <div className="pt-[110px] md:pt-[90px] pb-2 md:px-[20px] lg:px-[10%]">
            <div className="">
                <div className="flex px-2 sm:px-0 flex-col sm:flex-row items-start justify-center">
                    <div className="w-full sm:w-[60%] ">
                        <div className="h-[300px] sm:h-[600px] flex items-center justify-center border rounded-md overflow-hidden">
                            <img className="h-full" src={imgUrl ? imgUrl : product && product.thumbnail_pic} alt="" />
                        </div>
                        <div className="flex mt-2 flex-wrap">
                            <div className="h-16 w-16 sm:h-28 sm:w-28 border rounded-md me-1 mb-1 flex items-center justify-center">
                                <img onClick={() => setImgUrl(product && product.thumbnail_pic)} className="h-full object-contain" src={product && product.thumbnail_pic} alt="" />
                            </div>
                            {product &&
                                product.multiple_pics.map((url) => (
                                    <div className="h-16 w-16 sm:h-28 sm:w-28 border rounded-md me-1 mb-1 flex items-center justify-center">
                                        <img onClick={() => setImgUrl(url)} className="h-full object-cover" src={url} alt="" />
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className="w-full sm:w-[40%] sm:ps-4">
                        <h1 className="text-xl md:text-4xl font-bold">{product && product.product_name}</h1>
                        <div className="flex items-center justify-start mt-2">
                            <PiStorefrontThin size={23} color="green" />
                            <Text color={"blackAlpha.700"} fontWeight={"semibold"} fontSize={"sm"} ms={2}>
                                Sold By : {product && product.vendor_id.firmName}
                            </Text>
                        </div>
                        <div className="flex items-start justify-between mt-6">
                            <div>
                                {product && (
                                    <>
                                        <p className="font-semibold  text-lg text-red-500">
                                            ₹ {priceCal(product.seller_price, product.margin, product.sellingGST)}{" "}
                                            <Badge borderRadius={"full"} py={0} px={2} bg={"red.500"} color={"white"}>
                                                MRP ₹{product && product.mrp}
                                            </Badge>
                                        </p>
                                        <span className="text-xs ms-1 text-gray-500">{taxableAmtAntGstAmt(product.seller_price, product.margin, product.sellingGST)}</span>
                                    </>
                                )}
                                <div className="flex items-center space-x-2 my-2 flex-wrap">
                                    <span className="font-bold">Color: </span>
                                    {product &&
                                        product.color_id.map((el) => (
                                            <>
                                                <span>{el.colorName}</span>
                                                <div className="h-5 w-5" style={{ backgroundColor: el.colorHex }}></div>
                                            </>
                                        ))}
                                </div>
                            </div>
                            <div>
                                <Text fontWeight={700}>MOQ:{product && product.min_order_qty} Pairs</Text>
                            </div>
                        </div>
                        <hr />
                        <h3 className="font-bold text-gray-600 mt-4">Available Set Sizes</h3>
                        <div className="space-x-3 mt-2">{product && product.lotSizeQty.map((el) => <span className="border rounded p-1 text-sm font-semibold text-gray-800">{el}</span>)}</div>
                        <div className="border p-3 mt-5 rounded-md shadow-lg">
                            <div className="flex ">
                                <div>
                                    <h1 className="font-bold">Set size & Pairs</h1>
                                    <RadioGroup onChange={(e) => lotPairHandler(e)} value={lotValue}>
                                        <Stack direction="column">{product && product.lotSizeQty.map((el) => <Radio value={el}>{el}</Radio>)}</Stack>
                                    </RadioGroup>
                                </div>
                                <div className="ms-10">
                                    <h1 className="font-bold">Color</h1>
                                    <RadioGroup onChange={setColorValue} value={colorValue}>
                                        <Stack direction="column">
                                            {product &&
                                                product.color_id.map((el) => (
                                                    <Radio value={el._id}>
                                                        <div className="flex items-center space-x-2">
                                                            <BsFillSquareFill color={el.colorHex} />
                                                            <span>{el.colorName}</span>
                                                        </div>
                                                    </Radio>
                                                ))}
                                        </Stack>
                                    </RadioGroup>
                                </div>
                            </div>
                            <div className="mt-5">
                                <Select value={selectPair} placeholder="Select Pairs" onChange={(e) => setSelectPair(e.target.value)}>
                                    {product &&
                                        lotValue &&
                                        listOfPairs(lotValue).map((el) => (
                                            <option key={el} value={el}>
                                                {el} Pairs
                                            </option>
                                        ))}
                                </Select>
                            </div>
                            <div className="text-sm text-gray-500">
                                {selectPair && (
                                    <>
                                        <span className="text-sm">
                                            ₹{totalPrice(product.seller_price, product.margin, product.sellingGST)[0]} x {selectPair} Pairs ={" "}
                                        </span>
                                        <span className="text-blue-600">₹{totalPrice(product.seller_price, product.margin, product.sellingGST)[1]}</span>
                                    </>
                                )}
                            </div>
                            <div className="flex space-x-3 mt-3">
                                <Button
                                    isLoading={isLoading}
                                    loadingText="Please wait"
                                    className="py-2 text-sm md:py-7"
                                    onClick={() => addToCart(false)}
                                    width={"full"}
                                    leftIcon={<BsCart />}
                                    colorScheme="messenger"
                                >
                                    Add to Cart
                                </Button>
                                <Button
                                    isLoading={isBuyItNowLoading}
                                    loadingText="Please wait"
                                    onClick={() => addToCart(true)}
                                    className="py-2 text-sm md:py-7"
                                    width={"full"}
                                    leftIcon={<FcFlashOn />}
                                    colorScheme="whatsapp"
                                >
                                    Buy It Now
                                </Button>
                            </div>
                        </div>
                        <div className="mt-10 border rounded-md p-3 pb-6">
                            <h1 className="font-bold text-xl ">Delivery Information</h1>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center mt-3 space-x-2">
                                    <FaLocationDot size={30} color="#f1f" />
                                    <h4 className="font-semibold">
                                        Deliver to: <span className="text-blue-500 border px-1">{getPincode()}</span>
                                    </h4>
                                </div>
                                <Popover>
                                    <PopoverTrigger>
                                        <Button size={"sm"} leftIcon={<GrEdit color="white" />} colorScheme="twitter">
                                            Change
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent bg={"#ffd"}>
                                        <PopoverArrow />
                                        <PopoverCloseButton />
                                        <PopoverHeader>Change Pincode</PopoverHeader>
                                        <PopoverBody>
                                            <ul>
                                                {addresses &&
                                                    addresses.map((el, idx) => (
                                                        <li key={el._id} onClick={() => defaultAddress(el._id, idx)} className="hover:bg-teal-50 py-1 cursor-pointer border-b last:border-b-0">
                                                            {el.pincode}, {el.city}, {el.state}
                                                        </li>
                                                    ))}
                                            </ul>
                                        </PopoverBody>
                                    </PopoverContent>
                                </Popover>
                            </div>
                            {/* <div className="flex items-center mt-3 space-x-2">
                                <BsTruck size={40} color="blue" />
                                <h4 className="font-semibold text-teal-500">Expected Delivery: 20 Jun 2023</h4>
                            </div> */}
                        </div>
                        <div className="pt-3 border rounded-md p-3 pb-6 mt-10">
                            <h1 className="font-bold text-xl ">Specifications</h1>
                            <Table className="mt-2">
                                <Tbody>
                                    <Tr>
                                        <Td borderBottom={0} py={1}>
                                            Brand
                                        </Td>
                                        <Td borderBottom={0} py={1}>
                                            {product && product.brandId.brand_name}
                                        </Td>
                                    </Tr>
                                    <Tr>
                                        <Td borderBottom={0} py={1}>
                                            Category
                                        </Td>
                                        <Td borderBottom={0} py={1}>
                                            {product && product.categoryId.category_name}
                                        </Td>
                                    </Tr>
                                    <Tr>
                                        <Td borderBottom={0} py={1}>
                                            Color
                                        </Td>
                                        <Td borderBottom={0} py={1}>
                                            <ul>{product && product.color_id.map((el) => <li key={el._id}>{el.colorName}</li>)}</ul>
                                        </Td>
                                    </Tr>
                                    <Tr>
                                        <Td borderBottom={0} py={1}>
                                            Material
                                        </Td>
                                        <Td borderBottom={0} py={1}>
                                            {product && product.material}
                                        </Td>
                                    </Tr>
                                    <Tr>
                                        <Td borderBottom={0} py={1}>
                                            Sole
                                        </Td>
                                        <Td borderBottom={0} py={1}>
                                            {product && product.sole}
                                        </Td>
                                    </Tr>
                                    <Tr>
                                        <Td borderBottom={0} py={1}>
                                            Weight
                                        </Td>
                                        <Td borderBottom={0} py={1}>
                                            {product && product.weight}kg.
                                        </Td>
                                    </Tr>
                                    <Tr>
                                        <Td borderBottom={0} py={1}>
                                            Packing Type
                                        </Td>
                                        <Td borderBottom={0} py={1}>
                                            {product && product.packing_type}
                                        </Td>
                                    </Tr>
                                    <Tr>
                                        <Td borderBottom={0} py={1}>
                                            Made in
                                        </Td>
                                        <Td borderBottom={0} py={1}>
                                            {product && product.made_in}
                                        </Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </div>
                    </div>
                </div>
                <div className="border rounded-md my-5 p-3">
                    <h1 className="font-bold text-xl">Delivery Information</h1>
                    <p className="text-sm text-justify">{product && product.description}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;
