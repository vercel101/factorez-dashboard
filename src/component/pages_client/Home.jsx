import React, { useEffect, useRef, useState } from "react";
import Slider from "./Layout/Slider";
import ProductCard from "./Layout/ProductCard";
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    AvatarBadge,
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    Checkbox,
    Heading,
    IconButton,
    Image,
    MenuDivider,
    Stack,
    Text,
} from "@chakra-ui/react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { MdEmail, MdFilterAlt } from "react-icons/md";
import CardSlider from "./Layout/CardSlider";
import DemoTST from "./Layout/DemoTST";
import { allDashboardProductsApi, getStoreInfoApi } from "../../apis/clientApis";
import { BsFillSquareFill } from "react-icons/bs";
import { FcFilledFilter } from "react-icons/fc";
import { PiPhoneCallThin } from "react-icons/pi"; 
import { useNavigate } from "react-router-dom";

const Home = ({ tokenReducer, userInfoReducer, storeInfoReducer }) => {
    const [childRefWBestSelling, setChildRefWBestSelling] = React.useState(0);
    const [cardWidthBestSelling, setCardWidthBestSelling] = React.useState(0);
    const [noOfCardBestSelling, setNoOfCardBestSelling] = React.useState(0);
    const childRefBestSelling = React.useRef();
    const myRefBestSelling = React.useRef();

    const [childRefWNewArrival, setChildRefWNewArrival] = React.useState(0);
    const [cardWidthNewArrival, setCardWidthNewArrival] = React.useState(0);
    const [noOfCardNewArrival, setNoOfCardNewArrival] = React.useState(0);
    const navigate = useNavigate();
    const recommendedProduct = storeInfoReducer && storeInfoReducer.recommendedProduct && storeInfoReducer.recommendedProduct;
    const category = storeInfoReducer && storeInfoReducer.category && storeInfoReducer.category;
    const storeInfo = storeInfoReducer && storeInfoReducer.storeInfo && storeInfoReducer.storeInfo;
    const color = storeInfoReducer && storeInfoReducer.color && storeInfoReducer.color;
    // const childRefNewArrival = React.useRef();
    // const myRefNewArrival = React.useRef();
    // React.useEffect(() => {
    //     // setCardWidthNewArrival(220 + 16)
    //     // setCardWidthBestSelling(220 + 16)
    //     // setNoOfCardBestSelling(childRefBestSelling.current.childNodes.length)
    //     // if(storeInfoReducer && storeInfoReducer.recommendedProduct && storeInfoReducer.recommendedProduct.newArrival){
    //     //     setNoOfCardNewArrival(storeInfoReducer.recommendedProduct.newArrival.length);
    //     // }
    //     // if (childRefNewArrival.current.childNodes[0] && childRefNewArrival.current.childNodes[0].clientWidth) setCardWidthNewArrival(childRefNewArrival.current.childNodes[0].clientWidth + 16);
    //     // if (childRefNewArrival.current.childNodes[0] && childRefNewArrival.current.childNodes[0].clientWidth) setNoOfCardNewArrival(childRefNewArrival.current.childNodes.length);
    //     // if (childRefBestSelling.current.childNodes[0] && childRefBestSelling.current.childNodes[0].clientWidth) setCardWidthBestSelling(childRefBestSelling.current.childNodes[0].clientWidth + 16);
    //     // if (childRefBestSelling.current.childNodes) setNoOfCardBestSelling(childRefBestSelling.current.childNodes.length);
    //     setCardWidthNewArrival(childRefNewArrival.current.childNodes.length > 0 ? childRefNewArrival.current.childNodes[0].clientWidth + 16 : 0);
    //     setNoOfCardNewArrival(childRefNewArrival.current.childNodes.length > 0 ? childRefNewArrival.current.childNodes.length : 0);
    //     setCardWidthBestSelling(childRefBestSelling.current.childNodes > 0 ? childRefBestSelling.current.childNodes[0].clientWidth + 16 : 0);
    //     setNoOfCardBestSelling(childRefBestSelling.current.childNodes.length > 0 ? childRefBestSelling.current.childNodes.length : 0);
    // }, [childRefNewArrival, myRefNewArrival]);
    const leftClickNewArrival = () => {
        if (childRefWNewArrival <= 0) {
            setChildRefWNewArrival((old) => 0);
        } else {
            setChildRefWNewArrival((old) => old - cardWidthNewArrival);
        }
    };
    const rightClickNewArrival = () => {
        let allCardWidth = cardWidthNewArrival * noOfCardNewArrival;
        // let divWidth = myRefNewArrival.current.offsetWidth;
        // if (allCardWidth - childRefWNewArrival <= divWidth) {
        //     setChildRefWNewArrival((old) => 0);
        // } else {
        //     setChildRefWNewArrival((old) => old + cardWidthNewArrival);
        // }
    };
    const leftClickBestSelling = () => {
        if (childRefWBestSelling <= 0) {
            setChildRefWBestSelling((old) => 0);
        } else {
            setChildRefWBestSelling((old) => old - cardWidthBestSelling);
        }
    };
    const rightClickBestSelling = () => {
        let allCardWidth = cardWidthBestSelling * noOfCardBestSelling;
        let divWidth = myRefBestSelling.current.offsetWidth;
        if (allCardWidth - childRefWBestSelling <= divWidth) {
            setChildRefWBestSelling((old) => 0);
        } else {
            setChildRefWBestSelling((old) => old + cardWidthBestSelling);
        }
    };
    const allProducts = async () => {
        await allDashboardProductsApi(sessionStorage.getItem("token"))
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const newArrivalFn = () => {
        let arr = storeInfoReducer && storeInfoReducer.recommendedProduct && storeInfoReducer.recommendedProduct.newArrival ? storeInfoReducer.recommendedProduct.newArrival : [];
        console.log("arr", arr);
        let x = arr.map((el) => <ProductCard key={el._id} url={el.thumbnail_pic} cardwidth={"200px"} />);
        return x;
    };

    React.useEffect(() => {
        allProducts();
        // newArrivalFn()
    }, []);

    return (
        <div>
            <div className="pt-[80px] md:px-[20px] lg:px-[10%]">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-0 sm:gap-4 md:h-[300px] lg:h-[400px] md:mt-4">
                    <div className="md:col-span-8 lg:col-span-9">
                        <Slider />
                    </div>
                    <div className="border hidden md:block col-span-4 lg:col-span-3 md:h-[300px] lg:h-[400px]">
                        <img
                            className=" h-full w-full object-cover"
                            src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
                            alt=""
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 px-2 sm:px-0 md:mt-4">
                    <div className="col-span-3 hidden md:block ">
                        <div className="border ">
                            <div className="h-10 bg-[#06038D] flex items-center justify-between px-3">
                                <span className="text-lg font-bold text-white tracking-wide">Filter</span>
                                <FcFilledFilter color="white" size={25} />
                            </div>
                            <Accordion defaultIndex={[0]} allowMultiple>
                                <AccordionItem>
                                    <h2>
                                        <AccordionButton>
                                            <Box as="span" flex="1" textAlign="left">
                                                Color
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4}>
                                        <div className="flex flex-col space-y-2">
                                            {color &&
                                                color.map((el) => (
                                                    <Checkbox size={"lg"} key={el._id}>
                                                        {" "}
                                                        <span className="flex items-center">
                                                            {" "}
                                                            <BsFillSquareFill color={el.colorHex} className="me-1" />
                                                            {el.colorName}
                                                        </span>
                                                    </Checkbox>
                                                ))}
                                        </div>
                                    </AccordionPanel>
                                </AccordionItem>

                                <AccordionItem>
                                    <h2>
                                        <AccordionButton>
                                            <Box as="span" flex="1" textAlign="left">
                                                Category
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4}>
                                        <div className="flex flex-col space-y-2">
                                            {category &&
                                                category.map((el) => (
                                                    <Checkbox size={"lg"} key={el._id}>
                                                        {" "}
                                                        {el.category_name}
                                                    </Checkbox>
                                                ))}
                                        </div>
                                    </AccordionPanel>
                                </AccordionItem>
                                <AccordionItem borderBottom={0}>
                                    <h2>
                                        <AccordionButton>
                                            <Box as="span" flex="1" textAlign="left">
                                                Price
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </AccordionPanel>
                                </AccordionItem>
                            </Accordion>
                        </div>
                        <div className="mt-10">
                            <span className="text-lg font-bold tracking-wide">Featured Product</span>
                            <div className="border p-2 space-y-3">
                                <Card rounded={0} direction={{ base: "column", sm: "row" }} overflow="hidden" variant="unstyled">
                                    <Image
                                        objectFit="cover"
                                        maxW={{ base: "100%", sm: "80px" }}
                                        src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                                        alt="Caffe Latte"
                                    />

                                    <Stack>
                                        <CardBody px={1}>
                                            <Text fontSize={14} fontWeight={600} lineHeight={1.1}>
                                                Men Nike Running Shoes for (men)
                                            </Text>
                                            <Text fontSize={12} color={"red"} mt={2} lineHeight={1.1}>
                                                ₹ 810.00
                                            </Text>
                                        </CardBody>
                                    </Stack>
                                </Card>
                                <Card rounded={0} direction={{ base: "column", sm: "row" }} overflow="hidden" variant="unstyled">
                                    <Image
                                        objectFit="cover"
                                        maxW={{ base: "100%", sm: "80px" }}
                                        src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                                        alt="Caffe Latte"
                                    />

                                    <Stack>
                                        <CardBody px={1}>
                                            <Text fontSize={14} fontWeight={600} lineHeight={1.1}>
                                                Men Nike Running Shoes for (men)
                                            </Text>
                                            <Text fontSize={12} color={"red"} mt={2} lineHeight={1.1}>
                                                ₹ 810.00
                                            </Text>
                                        </CardBody>
                                    </Stack>
                                </Card>
                                <Card rounded={0} direction={{ base: "column", sm: "row" }} overflow="hidden" variant="unstyled">
                                    <Image
                                        objectFit="cover"
                                        maxW={{ base: "100%", sm: "80px" }}
                                        src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                                        alt="Caffe Latte"
                                    />

                                    <Stack>
                                        <CardBody px={1}>
                                            <Text fontSize={14} fontWeight={600} lineHeight={1.1}>
                                                Men Nike Running Shoes for (men)
                                            </Text>
                                            <Text fontSize={12} color={"red"} mt={2} lineHeight={1.1}>
                                                ₹ 810.00
                                            </Text>
                                        </CardBody>
                                    </Stack>
                                </Card>
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-9">
                        <div>
                            <div className="flex justify-between items-center  sm:my-0 sm:mb-2">
                                <Heading size="sm" color={"#06038D"}>
                                    BEST SELLERS
                                </Heading>
                                <Button variant={"outline"} size={"sm"} rounded={0} onClick={() => navigate('/products')}>
                                    View all products
                                </Button>
                                {/* <Box color="white" className="">
                                <IconButton onClick={() => leftClickBestSelling()} variant="outline" height={8} rounded={0} aria-label="Call Sage" fontSize="20px" icon={<BiChevronLeft />} />
                                <IconButton
                                    onClick={() => rightClickBestSelling()}
                                    variant="outline"
                                    height={8}
                                    borderStart={0}
                                    rounded={0}
                                    aria-label="Call Sage"
                                    fontSize="20px"
                                    icon={<BiChevronRight />}
                                />
                            </Box> */}
                            </div>
                            <div className={`border w-full mb-5 p-2`}>
                                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {recommendedProduct && recommendedProduct.bestSelling && recommendedProduct.bestSelling.map((el) => <ProductCard element={el} key={el._id} />)}
                                    {recommendedProduct && recommendedProduct.bestSelling && recommendedProduct.bestSelling.map((el) => <ProductCard element={el} key={el._id} />)}
                                    {recommendedProduct && recommendedProduct.bestSelling && recommendedProduct.bestSelling.map((el) => <ProductCard element={el} key={el._id} />)}
                                    {recommendedProduct && recommendedProduct.bestSelling && recommendedProduct.bestSelling.map((el) => <ProductCard element={el} key={el._id} />)}
                                </div>
                            </div>
                            {/* <div ref={myRefBestSelling} className={`flex border w-full mb-5 p-2 overflow-hidden`}>
                            <div ref={childRefBestSelling} className="flex w-full transition-all duration-500" style={{ marginLeft: `-${childRefWBestSelling}px` }}>
                                {slide}
                            </div>
                        </div> */}
                        </div>
                        <div>
                            <div className="flex justify-between items-center sm:my-0 sm:mb-2">
                                <Heading size="sm" color={"#06038D"}>
                                    NEW ARRIVALS
                                </Heading>
                                <Button variant={"outline"} size={"sm"} rounded={0} onClick={() => navigate('/products')}>
                                    View all products
                                </Button>
                                {/* <Box color="white" className="">
                                <IconButton onClick={() => leftClickNewArrival()} variant="outline" height={8} rounded={0} aria-label="Call Sage" fontSize="20px" icon={<BiChevronLeft />} />
                                <IconButton
                                    onClick={() => rightClickNewArrival()}
                                    variant="outline"
                                    height={8}
                                    borderStart={0}
                                    rounded={0}
                                    aria-label="Call Sage"
                                    fontSize="20px"
                                    icon={<BiChevronRight />}
                                />
                            </Box> */}
                            </div>

                            <div className={`border w-full mb-5 p-2`}>
                                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {recommendedProduct && recommendedProduct.newArrival && recommendedProduct.newArrival.map((el) => <ProductCard element={el} key={el._id} />)}
                                    {recommendedProduct && recommendedProduct.newArrival && recommendedProduct.newArrival.map((el) => <ProductCard element={el} key={el._id} />)}
                                    {recommendedProduct && recommendedProduct.newArrival && recommendedProduct.newArrival.map((el) => <ProductCard element={el} key={el._id} />)}
                                    {recommendedProduct && recommendedProduct.newArrival && recommendedProduct.newArrival.map((el) => <ProductCard element={el} key={el._id} />)}
                                    {recommendedProduct && recommendedProduct.newArrival && recommendedProduct.newArrival.map((el) => <ProductCard element={el} key={el._id} />)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-teal-50 flex justify-evenly py-5">
                <div className="flex flex-col items-center justify-center">
                    <PiPhoneCallThin  className="text-[50px] sm:text-[70px]"/>
                    <span className="text-[14px] sm:text-[16px]">Customer support</span>
                    <span className="text-[11px] sm:text-[14px]">+91-{storeInfo && storeInfo.contactNo}</span>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <MdEmail className="text-[50px] sm:text-[70px]"/>
                    <span className="text-[14px] sm:text-[16px]">Customer support</span>
                    <span className="text-[11px] sm:text-[14px]">{storeInfo && storeInfo.contactEmail}</span>
                </div>
            </div>
        </div>
    );
};

export default Home;
