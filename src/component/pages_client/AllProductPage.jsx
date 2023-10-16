import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Checkbox,
    Input,
    RangeSlider,
    RangeSliderFilledTrack,
    RangeSliderThumb,
    RangeSliderTrack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsFillSquareFill } from "react-icons/bs";
import { FcFilledFilter } from "react-icons/fc";
import { allDashboardProductsApi } from "../../apis/clientApis";
import ProductCard from "./Layout/ProductCard";
import { useDispatch } from "react-redux";
import { categoryFilterClearFn } from "../../Redux/ReducerAction";

const AllProductPage = ({ tokenReducer, userInfoReducer, storeInfoReducer, categoryFilterReducer }) => {
    const dispatch = useDispatch();
    const [products, setProducts] = React.useState([]);
    const [filteredProduct, setFilteredProduct] = React.useState([]);
    const [minPrice, setMinPrice] = React.useState(100);
    const [maxPrice, setMaxPrice] = React.useState(5000);
    const [colorChecked, setColorChecked] = useState([]);
    const [categoryChecked, setCategoryChecked] = useState([]);
    const category = storeInfoReducer && storeInfoReducer.category && storeInfoReducer.category;
    const color = storeInfoReducer && storeInfoReducer.color && storeInfoReducer.color;

    const allProducts = async () => {
        await allDashboardProductsApi(tokenReducer)
            .then((res) => {
                console.log(res.data);
                setProducts(res.data.data);
                setFilteredProduct(res.data.data);
                subCategoryFilter(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const rangSliderHandler = (e) => {
        setMinPrice((old) => e[0]);
        setMaxPrice((old) => e[1]);
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

    const subCategoryFilter = (listOfProduct) => {
        console.log(categoryFilterReducer);
        setCategoryChecked([]);
        setColorChecked([]);
        if (categoryFilterReducer.length > 0) {
            console.log(products);
            if (products.length > 0) {
                let x = products.filter((o) => {
                    console.log(categoryFilterReducer[0], categoryFilterReducer[1]);
                    if (o.categoryId._id === categoryFilterReducer[0] && o.subCatId._id === categoryFilterReducer[1]) {
                        console.log("yes product is exists");
                        return o;
                    }
                });
                setFilteredProduct((old) => x);
            } else if (listOfProduct.length > 0) {
                let x = listOfProduct.filter((o) => {
                    console.log(categoryFilterReducer[0], categoryFilterReducer[1]);
                    if (o.categoryId._id === categoryFilterReducer[0] && o.subCatId._id === categoryFilterReducer[1]) {
                        console.log("yes product is exists");
                        return o;
                    }
                });
                setFilteredProduct((old) => x);
            }
        }
    };
    React.useEffect(() => {
        subCategoryFilter([]);
    }, [categoryFilterReducer]);

    React.useEffect(() => {
        allProducts();
    }, []);

    return (
        <div>
            <div className="pt-[100px] md:pt-[80px] md:px-[20px] lg:px-[10%]">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 px-2 sm:px-0 md:mt-4">
                    <div className="col-span-3 hidden md:block">
                        <div className="border">
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
                                        <RangeSlider onChange={(val) => rangSliderHandler(val)} ariaLabel={["min", "max"]} defaultValue={[minPrice, maxPrice]} min={50} max={10000}>
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
                    </div>
                    <div className="col-span-9 mb-16">
                        <div className="col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4 mx-3 mt-5 sm:mx-0 sm:mt-0">
                            {filteredProduct.map((el) => (
                                <ProductCard disableFooter={false} customerId={userInfoReducer.customerId} tokenReducer={tokenReducer} key={el._id} element={el} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllProductPage;
