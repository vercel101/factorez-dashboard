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
    Checkbox,
    Heading,
    Image,
    Stack,
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb,
    Text,
    Input,
} from "@chakra-ui/react";
import { MdEmail } from "react-icons/md";
import { allDashboardProductsApi, bannerGetApi } from "../../apis/clientApis";
import { BsFillSquareFill } from "react-icons/bs";
import { FcFilledFilter } from "react-icons/fc";
import { PiPhoneCallThin } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { categoryFilterClearFn } from "../../Redux/ReducerAction";

const Home = ({ tokenReducer, userInfoReducer, storeInfoReducer }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [minPrice, setMinPrice] = useState(100);
    const [maxPrice, setMaxPrice] = useState(5000);
    const [banners, setBanners] = useState([]);
    const [products, setProducts] = React.useState([]);
    const [filteredProduct, setFilteredProduct] = React.useState([]);
    const [colorChecked, setColorChecked] = useState([]);
    const [categoryChecked, setCategoryChecked] = useState([]);
    const recommendedProduct = storeInfoReducer && storeInfoReducer.recommendedProduct && storeInfoReducer.recommendedProduct;
    const category = storeInfoReducer && storeInfoReducer.category && storeInfoReducer.category;
    const storeInfo = storeInfoReducer && storeInfoReducer.storeInfo && storeInfoReducer.storeInfo;
    const color = storeInfoReducer && storeInfoReducer.color && storeInfoReducer.color;
    let productPrice = (price, gst, margin) => {
        let marginAmt = Number(price) + (Number(price) * Number(margin)) / 100;
        let gstAmt = (Number(marginAmt) * Number(gst)) / 100;
        return (gstAmt + marginAmt).toFixed(2);
    };
    const allProducts = async () => {
        await allDashboardProductsApi(tokenReducer)
            .then((res) => {
                console.log(res.data);
                setProducts(res.data.data);
                setFilteredProduct(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const colorFilter = (isChecked, colorID) => {
        console.log(isChecked, colorID);
        dispatch(categoryFilterClearFn());
        let arr = [];
        setColorChecked((old) => {
            arr = [...old];
            if (isChecked) {
                arr.push(colorID);
            } else {
                let x = arr.findIndex((o) => o === colorID);
                if (x >= 0) {
                    arr.splice(x, 1);
                }
            }
            return arr;
        });
        let x = products.filter((o) => {
            for (let m of o.color_id) {
                if (arr.includes(m._id)) {
                    return o;
                }
            }
        });
        if (x.length > 0) {
            setFilteredProduct((old) => x);
        } else {
            setFilteredProduct((old) => products);
        }
        console.log(colorChecked);
    };
    const categoryFilter = (isChecked, categoryID) => {
        console.log(isChecked, categoryID);
        dispatch(categoryFilterClearFn());
        let arr = [];
        setCategoryChecked((old) => {
            arr = [...old];
            if (isChecked) {
                arr.push(categoryID);
            } else {
                let x = arr.findIndex((o) => o === categoryID);
                if (x >= 0) {
                    arr.splice(x, 1);
                }
            }
            return arr;
        });
        let x = products.filter((o) => {
            if (arr.includes(o.categoryId._id)) {
                return o;
            }
        });
        if (arr.length) {
            setFilteredProduct((old) => x);
        } else if (arr.length === 0) {
            setFilteredProduct((old) => products);
        }
    };
    const rangSliderHandler = (e) => {
        setMinPrice((old) => e[0]);
        setMaxPrice((old) => e[1]);
    };
    const getBanners = async () => {
        await bannerGetApi(tokenReducer)
            .then((res) => {
                console.log(res.data);
                setBanners(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    React.useEffect(() => {
        allProducts();
        getBanners();
    }, []);

    return (
        <div>
            <div className="pt-[100px] md:pt-[80px] md:px-[20px] lg:px-[10%]">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-0 sm:gap-4 md:h-[300px] lg:h-[400px] md:mt-4">
                    <div className="md:col-span-8 lg:col-span-9">
                        <Slider images={banners} />
                    </div>
                    <div className="border hidden md:block col-span-4 lg:col-span-3 md:h-[300px] lg:h-[400px]">
                        <img className=" h-full w-full object-cover" src={banners.length > 0 && banners.filter((o) => o.type === "SINGLE").reverse()[0].bannerUrl} alt="" />
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
                                                    <Checkbox size={"lg"} key={el._id} onChange={(e) => colorFilter(e.target.checked, el._id)}>
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
                                                    <Checkbox onChange={(e) => categoryFilter(e.target.checked, el._id)} size={"lg"} key={el._id}>
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
                                        <div className="flex items-center justify-between space-x-1">
                                            <div>
                                                <label htmlFor="minVal" className="text-xs font-bold">
                                                    Min Price
                                                </label>
                                                <Input value={minPrice} onChange={(e) => setMinPrice(e.target.value)} id="minVal" defaultValue={minPrice} rounded={0} p={3} />
                                            </div>
                                            <div>
                                                <label htmlFor="maxVal" className="text-xs font-bold">
                                                    Max Price
                                                </label>
                                                <Input value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} id="maxVal" defaultValue={maxPrice} rounded={0} p={3} />
                                            </div>
                                        </div>
                                        <RangeSlider onChange={(val) => rangSliderHandler(val)} aria-label={["min", "max"]} defaultValue={[minPrice, maxPrice]} min={50} max={10000}>
                                            <RangeSliderTrack>
                                                <RangeSliderFilledTrack />
                                            </RangeSliderTrack>
                                            <RangeSliderThumb index={0} />
                                            <RangeSliderThumb index={1} />
                                        </RangeSlider>
                                    </AccordionPanel>
                                </AccordionItem>
                            </Accordion>
                        </div>
                        {recommendedProduct && recommendedProduct.featuredProduct && (
                            <div className="mt-5">
                                <span className="text-lg font-bold tracking-wide text-[#06038D]">Featured Product</span>
                                <div className="border p-2 space-y-3">
                                    {recommendedProduct &&
                                        recommendedProduct.featuredProduct &&
                                        recommendedProduct.featuredProduct.map((el) => (
                                            <Card key={el._id} rounded={0} direction={{ base: "column", sm: "row" }} overflow="hidden" variant="unstyled">
                                                <Image objectFit="cover" maxW={{ base: "100%", sm: "80px" }} src={el && el.thumbnail_pic} alt="" />
                                                <Stack>
                                                    <CardBody px={1}>
                                                        <Text fontSize={14} fontWeight={600} lineHeight={1.1}>
                                                            {el && el.product_name}
                                                        </Text>
                                                        <Text fontSize={12} color={"red"} mt={2} lineHeight={1.1}>
                                                            ₹ {el && productPrice(el.seller_price, el.sellingGST, el.margin)}
                                                        </Text>
                                                    </CardBody>
                                                </Stack>
                                            </Card>
                                        ))}
                                </div>
                            </div>
                        )}
                        {recommendedProduct && recommendedProduct.bestSelling && (
                            <div className="mt-5">
                                <span className="text-lg font-bold tracking-wide text-[#06038D]">Best Sellers</span>
                                <div className="border p-2 space-y-3">
                                    {recommendedProduct &&
                                        recommendedProduct.bestSelling &&
                                        recommendedProduct.bestSelling.map((el) => (
                                            <Card key={el._id} rounded={0} direction={{ base: "column", sm: "row" }} overflow="hidden" variant="unstyled">
                                                <Image objectFit="cover" maxW={{ base: "100%", sm: "80px" }} src={el && el.thumbnail_pic} alt="" />

                                                <Stack>
                                                    <CardBody px={1}>
                                                        <Text fontSize={14} fontWeight={600} lineHeight={1.1}>
                                                            {el && el.product_name}
                                                        </Text>
                                                        <Text fontSize={12} color={"red"} mt={2} lineHeight={1.1}>
                                                            ₹ {el && productPrice(el.seller_price, el.sellingGST, el.margin)}
                                                        </Text>
                                                    </CardBody>
                                                </Stack>
                                            </Card>
                                        ))}
                                </div>
                            </div>
                        )}
                        {recommendedProduct && recommendedProduct.newArrival && (
                            <div className="mt-5">
                                <span className="text-lg font-bold tracking-wide text-[#06038D]">New Arrivals</span>
                                <div className="border p-2 space-y-3">
                                    {recommendedProduct.newArrival.map((el) => (
                                        <Card key={el._id} rounded={0} direction={{ base: "column", sm: "row" }} overflow="hidden" variant="unstyled">
                                            <Image objectFit="cover" maxW={{ base: "100%", sm: "80px" }} src={el && el.thumbnail_pic} alt="" />
                                            <Stack>
                                                <CardBody px={1}>
                                                    <Text fontSize={14} fontWeight={600} lineHeight={1.1}>
                                                        {el && el.product_name}
                                                    </Text>
                                                    <Text fontSize={12} color={"red"} mt={2} lineHeight={1.1}>
                                                        ₹ {el && productPrice(el.seller_price, el.sellingGST, el.margin)}
                                                    </Text>
                                                </CardBody>
                                            </Stack>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="md:col-span-9">
                        <div>
                            <div className="flex justify-between items-center  sm:my-0 sm:mb-2">
                                <Heading size="sm" color={"#06038D"}>
                                    PRODUCTS
                                </Heading>
                                <Button className="shadow-md border border-teal-50" bg={"white"} size={"sm"} rounded={0} onClick={() => navigate("/products")}>
                                    View all products
                                </Button>
                            </div>
                            <div className={`shadow-sm w-full mb-5 p-2`}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {filteredProduct.slice(0, 9).map((el) => (
                                        <ProductCard disableFooter={false} customerId={userInfoReducer.customerId} tokenReducer={tokenReducer} key={el._id} element={el} />
                                    ))}
                                    {filteredProduct.length > 9 && (
                                        <Button  className="shadow-md"  size={"sm"} rounded={0} onClick={() => navigate("/products")}>
                                            View all products
                                        </Button>
                                        // <Button rounded={4} colorScheme="red" onClick={() => navigate("/products")}>
                                        //     View All Product
                                        // </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-teal-50 flex justify-evenly py-5">
                <div className="flex flex-col items-center justify-center">
                    <PiPhoneCallThin className="text-[50px] sm:text-[70px]" />
                    <span className="text-[14px] sm:text-[16px]">Customer support</span>
                    <span className="text-[11px] sm:text-[14px]">+91-{storeInfo && storeInfo.contactNo}</span>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <MdEmail className="text-[50px] sm:text-[70px]" />
                    <span className="text-[14px] sm:text-[16px]">Customer support</span>
                    <span className="text-[11px] sm:text-[14px]">{storeInfo && storeInfo.contactEmail}</span>
                </div>
            </div>
        </div>
    );
};

export default Home;
