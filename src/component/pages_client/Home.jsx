import React, { useEffect, useRef, useState } from "react";
import Slider from "./Layout/Slider";
import ProductCard from "./Layout/ProductCard";
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
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
import { MdFilterAlt } from "react-icons/md";
import CardSlider from "./Layout/CardSlider";
import DemoTST from "./Layout/DemoTST";
const slide = [
    <ProductCard
        key={1}
        cardwidth={"200px"}
        url={"https://images.unsplash.com/photo-1682673649000-6ef8356758cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80"}
    />,
    <ProductCard
        key={2}
        cardwidth={"200px"}
        url={"https://images.unsplash.com/photo-1682673649000-6ef8356758cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80"}
    />,
    <ProductCard
        key={3}
        cardwidth={"200px"}
        url={"https://images.unsplash.com/photo-1682673649000-6ef8356758cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80"}
    />,
    <ProductCard
        key={4}
        cardwidth={"200px"}
        url={"https://images.unsplash.com/photo-1682673649000-6ef8356758cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80"}
    />,
    <ProductCard
        cardwidth={"200px"}
        url={"https://images.unsplash.com/photo-1682673649000-6ef8356758cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80"}
    />,
    <ProductCard
        key={5}
        cardwidth={"200px"}
        url={"https://images.unsplash.com/photo-1682673649000-6ef8356758cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80"}
    />,
    <ProductCard
        key={6}
        cardwidth={"200px"}
        url={"https://images.unsplash.com/photo-1682673649000-6ef8356758cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80"}
    />,
    <ProductCard
        key={7}
        cardwidth={"200px"}
        url={"https://images.unsplash.com/photo-1682673649000-6ef8356758cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80"}
    />,
    <ProductCard
        key={8}
        cardwidth={"200px"}
        url={"https://images.unsplash.com/photo-1682673649000-6ef8356758cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80"}
    />,
    <ProductCard
        key={9}
        cardwidth={"200px"}
        url={"https://images.unsplash.com/photo-1682673649000-6ef8356758cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80"}
    />,
];
const Home = () => {
    const [childRefWBestSelling, setChildRefWBestSelling] = React.useState(0);
    const [cardWidthBestSelling, setCardWidthBestSelling] = React.useState(0);
    const [noOfCardBestSelling, setNoOfCardBestSelling] = React.useState(0);
    const childRefBestSelling = React.useRef();
    const myRefBestSelling = React.useRef();

    const [childRefWNewArrival, setChildRefWNewArrival] = React.useState(0);
    const [cardWidthNewArrival, setCardWidthNewArrival] = React.useState(0);
    const [noOfCardNewArrival, setNoOfCardNewArrival] = React.useState(0);
    const childRefNewArrival = React.useRef();
    const myRefNewArrival = React.useRef();
    React.useEffect(() => {
        setCardWidthNewArrival(childRefNewArrival.current.childNodes[0].clientWidth + 16);
        setNoOfCardNewArrival(childRefNewArrival.current.childNodes.length);
        setCardWidthBestSelling(childRefBestSelling.current.childNodes[0].clientWidth + 16);
        setNoOfCardBestSelling(childRefBestSelling.current.childNodes.length);
    }, []);
    const leftClickNewArrival = () => {
        if (childRefWNewArrival <= 0) {
            setChildRefWNewArrival((old) => 0);
        } else {
            setChildRefWNewArrival((old) => old - cardWidthNewArrival);
        }
    };
    const rightClickNewArrival = () => {
        let allCardWidth = cardWidthNewArrival * noOfCardNewArrival;
        let divWidth = myRefNewArrival.current.offsetWidth;
        if (allCardWidth - childRefWNewArrival <= divWidth) {
            setChildRefWNewArrival((old) => 0);
        } else {
            setChildRefWNewArrival((old) => old + cardWidthNewArrival);
        }
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

    return (
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
                            <MdFilterAlt color="white" size={25} />
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
                                    <div className="grid grid-cols-5 gap-3">
                                        <div className="h-11 w-11 cursor-pointer border bg-lime-200"></div>
                                        <div className="h-11 w-11 cursor-pointer border bg-blue-200"></div>
                                        <div className="h-11 w-11 cursor-pointer border bg-black"></div>
                                        <div className="h-11 w-11 cursor-pointer border bg-red-400"></div>
                                        <div className="h-11 w-11 cursor-pointer border bg-white"></div>
                                        <div className="h-11 w-11 cursor-pointer border bg-lime-200"></div>
                                        <div className="h-11 w-11 cursor-pointer border bg-lime-200"></div>
                                        <div className="h-11 w-11 cursor-pointer border bg-lime-200"></div>
                                        <div className="h-11 w-11 cursor-pointer border bg-lime-200"></div>
                                        <div className="h-11 w-11 cursor-pointer border bg-lime-200"></div>
                                        <div className="h-11 w-11 cursor-pointer border bg-lime-200"></div>
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
                                        <Checkbox>Category 1</Checkbox>
                                        <Checkbox>Category 2</Checkbox>
                                        <Checkbox>Category 3</Checkbox>
                                        <Checkbox>Category 4</Checkbox>
                                        <Checkbox>Category 5</Checkbox>
                                        <Checkbox>Category 6</Checkbox>
                                        <Checkbox>Category 7</Checkbox>
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
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
                            <Box color="white" className="">
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
                            </Box>
                        </div>
                        <div ref={myRefBestSelling} className={`flex border w-full mb-5 p-2 overflow-hidden`}>
                            <div ref={childRefBestSelling} className="flex w-full transition-all duration-500" style={{ marginLeft: `-${childRefWBestSelling}px` }}>
                                {slide}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between items-center sm:my-0 sm:mb-2">
                            <Heading size="sm" color={"#06038D"}>
                                NEW ARRIVALS
                            </Heading>
                            <Box color="white" className="">
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
                            </Box>
                        </div>
                        <div ref={myRefNewArrival} className={`flex border w-full mb-5 p-2 overflow-hidden`}>
                            <div ref={childRefNewArrival} className="flex w-full transition-all duration-500" style={{ marginLeft: `-${childRefWNewArrival}px` }}>
                                {slide}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="grid grid-cols-1 md:grid-cols-12 gap-4 px-2 sm:px-0 md:mt-6">
                <div className="col-span-3 hidden md:block ">
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
            </div> */}

            {/* <CardSlider slides={slides} /> */}
            {/* <DemoTST /> */}
            {/* <button className="bg-black text-white rounded-sm p-2" onClick={() => childRef.current.leftClick()} >Click</button> */}
        </div>
    );
};

export default Home;
