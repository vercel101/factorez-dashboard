import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addToCartApi, getProductInfoApi } from "../../apis/clientApis";
import { BsCart, BsTruck, BsFillSquareFill } from "react-icons/bs";
import { FcFlashOn } from "react-icons/fc";
import { FaLocationDot } from "react-icons/fa6";
import {  Button,  Radio, RadioGroup, Stack, Table, Tbody, Td, Tr, useToast } from "@chakra-ui/react";
import { GrEdit } from "react-icons/gr";
import { Modal, Select, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";

const ProductInfo = ({ tokenReducer, userInfoReducer, storeInfoReducer }) => {
    const toast = useToast();
    const [isOpen, setIsOpen] = useState(false);
    const [lotValue, setLotValue] = useState("");
    const [colorValue, setColorValue] = useState("");
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
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
    const listOfPairs = (moq) => {
        let arr = [];
        for (let x = 1; x <= 20; x++) {
            arr.push(moq * x);
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

    const addToCart = async () => {
        if (product && selectPair && lotValue && colorValue) {
            let productObj = {
                product_id: product._id,
                qty: selectPair,
                lotSize: lotValue,
                colorId: colorValue,
            };
            setIsLoading(true);
            await addToCartApi(userInfoReducer.customerId, productObj, tokenReducer)
                .then((res) => {
                    console.log(res.data);
                    setIsOpen(false);
                    setColorValue("");
                    setLotValue("");
                    setSelectPair("");
                    toast({
                        title: res.data.message,
                        position: "top",
                        isClosable: true,
                        status: "success",
                    });
                })
                .catch((err) => {
                    console.log(err);
                    toast({
                        title: err.message,
                        position: "top",
                        isClosable: true,
                        status: "error",
                    });
                });
            setIsLoading(false);
        } else {
            toast({
                status: "warning",
                position: "top",
                title: "All fields are required",
                isClosable: true,
            });
        }
    };
    useEffect(() => {
        getProductInfo();
        window.scrollTo(0, 0);
    }, []);
    // console.log(productId);
    return (
        <div className="pt-[110px] md:pt-[90px] pb-2 md:px-[20px] lg:px-[10%]">
            <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add to cart</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text fontSize={"xl"} fontWeight={700}>
                            Product Name and Details
                        </Text>
                        <div className="flex items-center justify-between">
                            <Text fontWeight={700}>
                                ₹ {product && priceCal(product.seller_price, product.margin, product.sellingGST)}{" "}
                                <span className="text-xs px-2 py-1 rounded-full bg-red-600 text-white">MRP ₹{product && product.mrp}</span>
                            </Text>
                            <Text fontWeight={700}>MOQ:{product && product.min_order_qty} Pairs</Text>
                        </div>
                        <div>
                            <span className="text-xs text-gray-500">{product && taxableAmtAntGstAmt(product.seller_price, product.margin, product.sellingGST)}</span>
                        </div>
                        <hr />
                        <div className="flex mt-5">
                            <div>
                                <h1 className="font-bold">Set size & Pairs</h1>
                                <RadioGroup onChange={setLotValue} value={lotValue}>
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
                                    listOfPairs(product.min_order_qty).map((el) => (
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
                    </ModalBody>

                    <ModalFooter>
                        <Button isLoading={isLoading} loadingText="Please wait" colorScheme="yellow" mr={3} onClick={() => addToCart()}>
                            Add to cart
                        </Button>
                        <Button colorScheme="red" onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <div className="">
                <div className="flex px-2 sm:px-0 flex-col sm:flex-row items-start justify-center">
                    <div className="w-full sm:w-[60%] ">
                        <div className="h-[300px] sm:h-[600px] border overflow-hidden">
                            <img className="w-full h-full object-cover " src={imgUrl ? imgUrl : product && product.thumbnail_pic} alt="" />
                        </div>
                        <div className="flex mt-2 flex-wrap">
                            <div className="h-16 w-16 sm:h-28 sm:w-28 border me-1 mb-1">
                                <img onClick={() => setImgUrl(product && product.thumbnail_pic)} className="h-full w-full object-cover" src={product && product.thumbnail_pic} alt="" />
                            </div>
                            {product &&
                                product.multiple_pics.map((url) => (
                                    <div className="h-16 w-16 sm:h-28 sm:w-28 border me-1 mb-1">
                                        <img onClick={() => setImgUrl(url)} className="h-full w-full object-cover" src={url} alt="" />
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className="w-full sm:w-[40%] sm:ps-4">
                        <h1 className="text-4xl font-bold">{product && product.product_name}</h1>
                        <p className="my-2 text-sm">{product && product.description}</p>
                        {product && <p className="font-semibold my-3 text-lg text-red-500">₹ {priceCal(product.seller_price, product.margin, product.sellingGST)}</p>}
                        <div className="flex items-center space-x-2 mb-2 flex-wrap">
                            <span className="font-bold">Color: </span>
                            {product &&
                                product.color_id.map((el) => (
                                    <>
                                        <span>{el.colorName}</span>
                                        <div className="h-5 w-5" style={{ backgroundColor: el.colorHex }}></div>
                                    </>
                                ))}
                        </div>
                        <hr />
                        <h3 className="font-bold text-gray-600 mt-4">Available Set Sizes</h3>
                        <div className="space-x-3 mt-2">{product && product.lotSizeQty.map((el) => <span className="border rounded p-1 text-sm font-semibold text-gray-800">{el}</span>)}</div>
                        <div className="flex space-x-3 mt-3">
                            <Button onClick={() => setIsOpen(true)} py={7} width={"full"} leftIcon={<BsCart />} colorScheme="messenger" fontSize={20}>
                                Add to Cart
                            </Button>
                            <Button py={7} width={"full"} leftIcon={<FcFlashOn />} colorScheme="whatsapp" fontSize={20}>
                                Buy It Now
                            </Button>
                        </div>

                        <div className="mt-10 border px-3">
                            <h1 className="font-bold text-xl ">Delivery Information</h1>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center mt-3 space-x-2">
                                    <FaLocationDot size={30} color="#f1f" />
                                    <h4 className="font-semibold">
                                        Deliver to: <span className="text-blue-500 border px-1">201301</span>
                                    </h4>
                                </div>
                                <Button size={"sm"} leftIcon={<GrEdit color="white" />} colorScheme="twitter">
                                    Change
                                </Button>
                            </div>
                            <div className="flex items-center mt-3 space-x-2">
                                <BsTruck size={40} color="blue" />
                                <h4 className="font-semibold text-teal-500">Expected Delivery: 20 Jun 2023</h4>
                            </div>
                        </div>

                        <div className="pt-3 border px-3">
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
                                            {product && product.color_id.colorName}
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
                                            {product && product.weight} g.
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
            </div>
        </div>
    );
};

export default ProductInfo;
