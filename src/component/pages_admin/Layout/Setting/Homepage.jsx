import React, { useState } from "react";
import { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { allProductsForFilterApi, getallfeaturedproductsApi, removeFeaturedproductsApi, setHomepageProductsForBestSellingApi } from "../../../../apis/adminApis";
import { calculateMarginAndSelling } from "../../../../utils/percentage";
import { useToast } from "@chakra-ui/react";
const Homepage = ({ tokenReducer }) => {
    const toast = useToast();
    const [filteredProduct, setFilteredProduct] = useState([]);
    const [products, setProducts] = useState([]);
    const [featuredProductObj, setFeaturedProductObj] = useState(null);
    const [singleProduct, setSingleProduct] = useState(null);
    const [data, setData] = useState({
        newArrival: "",
        featuredProduct: "",
        bestSelling: "",
    });
    const handler = (e) => {
        let flag = e.target.checked;
        if (e.target.id === "featuredproduct") {
            setData((prevState) => {
                return { ...prevState, featuredProduct: flag ? singleProduct._id : "" };
            });
        }
        if (e.target.id === "bestselling") {
            setData((prevState) => {
                return { ...prevState, bestSelling: flag ? singleProduct._id : "" };
            });
        }
        if (e.target.id === "newarrival") {
            setData((prevState) => {
                return { ...prevState, newArrival: flag ? singleProduct._id : "" };
            });
        }
    };
    const singleProductHandler = (el) => {
        console.log(el)
        setSingleProduct(el);
        setData({
            newArrival: "",
            featuredProduct: "",
            bestSelling: "",
        });
    };
    const searchFn = (value) => {
        let arr = [];
        for (let el of products) {
            if (el.product_name.toLowerCase().includes(value.toLowerCase())) {
                arr.push(el);
            }
        }
        setData({
            newArrival: "",
            featuredProduct: "",
            bestSelling: "",
        });
        setFilteredProduct((preState) => arr);
    };
    const saveData = async () => {
        if (data.bestSelling !== "" || data.featuredProduct !== "" || data.newArrival !== "") {
            console.log("yes");
            await setHomepageProductsForBestSellingApi(data, tokenReducer)
                .then((res) => {
                    console.log(res.data);
                    toast({
                        title: "Successfully updatd",
                        status: "success",
                        description: res.data.message,
                        position: "top",
                        isClosable: true,
                    });
                    allFeaturedProducts();
                })
                .catch((err) => {
                    console.log(err);
                    toast({
                        title: "Something went wrong.",
                        status: "error",
                        description: err.message,
                        position: "top",
                        isClosable: true,
                    });
                });
        } else {
            toast({
                title: "Warning",
                status: "warning",
                position: "top",
                description: "Atleast one filed should be checked",
                isClosable: true,
            });
        }
    };

    const getAllProducts = async () => {
        await allProductsForFilterApi(tokenReducer)
            .then((res) => {
                console.log(res.data);

                setProducts(res.data.data);
                setFilteredProduct(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const allFeaturedProducts = async () => {
        await getallfeaturedproductsApi(tokenReducer)
            .then((res) => {
                console.log(res.data);
                setFeaturedProductObj(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const removeProduct = async (key, id) => {
        if (window.confirm("Press ok, for remove...")) {
            await removeFeaturedproductsApi({ key: key, id: id }, tokenReducer)
                .then((res) => {
                    console.log(res.data);
                    toast({
                        title: "Successfully removed",
                        status: "success",
                        description: res.data.message,
                        position: "top",
                        isClosable: true,
                    });
                    allFeaturedProducts();
                })
                .catch((err) => {
                    console.log(err);
                    toast({
                        title: "Something went wrong.",
                        status: "error",
                        description: err.message,
                        position: "top",
                        isClosable: true,
                    });
                });
        }
    };

    const homepageCancel = () => {
        setSingleProduct((old) => null);
    };

    useEffect(() => {
        getAllProducts();
        allFeaturedProducts();
    }, []);

    return (
        <div>
            <h1 className="mb-2 font-bold">Search for Product</h1>
            <div className="border dark:border-[#525355] mb-5 rounded bg-white dark:bg-teal-950 p-3">
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <input
                            type="text"
                            placeholder="Search product..."
                            onChange={(e) => searchFn(e.target.value)}
                            className="w-full mt-1 dark:bg-black dark:text-gray-200  text-teal-800 text-sm outline-orange-200 dark:outline-black outline-1 py-2 px-3 border dark:border-[#525355] rounded"
                        />
                        <div className="max-h-[300px] h-[300px] mt-2 overflow-y-scroll border dark:border-[#525355] rounded p-2">
                            <ul>
                                {filteredProduct.length > 0 ? (
                                    filteredProduct.map((el, i) => (
                                        <li key={el._id} onClick={() => singleProductHandler(el)} className="py-1 hover:bg-slate-100 dark:hover:bg-slate-700 px-2 rounded text-sm">
                                            {el.product_name}
                                        </li>
                                    ))
                                ) : (
                                    <li className="py-1 hover:bg-slate-100 dark:hover:bg-slate-700 px-2 rounded text-sm italic"> No record found...</li>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div>
                        <div>
                            {singleProduct && (
                                <>
                                    <div className="border dark:border-[#525355] h-[200px] rounded-md flex items-center justify-center">
                                        <div className="w-[60%] h-[200px] rounded-t-md overflow-hidden">
                                            <img src={singleProduct.thumbnail_pic} alt="" className=" object-contain h-full w-full" />
                                        </div>
                                        <div className="border-t dark:border-[#525355] p-1 bg-pink-50 h-full w-[40%] dark:bg-slate-600 rounded-b-md">
                                            <h1 className="font-bold">{singleProduct.product_name}</h1>

                                            <table className="border border-collapse text-sm w-full my-2">
                                                <tbody>
                                                    <tr className="text-start">
                                                        <th className="border text-start p-1">Seller</th>
                                                        <td className="border text-start p-1">{singleProduct.vendor_id.firmName}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className="border text-start p-1">Brand Name</th>
                                                        <td className="border text-start p-1">{singleProduct.brandId.brand_name}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className="border text-start p-1">Category</th>
                                                        <td className="border text-start p-1">{singleProduct.categoryId.category_name}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className="border text-start p-1">Sub Category</th>
                                                        <td className="border text-start p-1">{singleProduct.subCatId.subcategory_name}</td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <div className="text-lg font-extrabold text-blue-600 p-1">
                                                <span className="">
                                                    ₹ {calculateMarginAndSelling(singleProduct.seller_price, singleProduct.margin, singleProduct.sellingGST).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <div className="flex flex-col select-none">
                                            <div className="flex items-center space-x-3">
                                                <input
                                                    defaultChecked={false}
                                                    checked={data.featuredProduct === "" ? false : true}
                                                    id="featuredproduct"
                                                    type="checkbox"
                                                    className="h-5 w-5"
                                                    onChange={handler}
                                                />
                                                <label htmlFor="featuredproduct">Featured Product</label>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <input
                                                    defaultChecked={false}
                                                    checked={data.bestSelling === "" ? false : true}
                                                    id="bestselling"
                                                    type="checkbox"
                                                    className="h-5 w-5"
                                                    onChange={handler}
                                                />
                                                <label htmlFor="bestselling">Best Selling</label>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <input
                                                    defaultChecked={false}
                                                    checked={data.newArrival === "" ? false : true}
                                                    id="newarrival"
                                                    type="checkbox"
                                                    className="h-5 w-5"
                                                    onChange={handler}
                                                />
                                                <label htmlFor="newarrival">New Arrival</label>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex items-center space-x-3">
                                            <button
                                                onClick={() => saveData()}
                                                className="bg-[#ff9f43] dark:bg-[#88613a] px-3 py-2 rounded flex items-center justify-between text-sm text-white font-semibold disabled:bg-[#ababab]">
                                                Save
                                            </button>
                                            <button onClick={() => homepageCancel()} className="bg-[#637381]  dark:bg-[#333b43] px-3 py-2 rounded text-sm text-white font-semibold">
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <h1 className="mb-2 font-bold">Featured Product</h1>
                    <div className="border dark:border-[#525355] rounded bg-white dark:bg-teal-950 p-3">
                        <div className="grid gap-3 grid-cols-3">
                            {featuredProductObj &&
                                featuredProductObj.featuredProduct &&
                                featuredProductObj.featuredProduct.map((el, i) => (
                                    <div key={el._id} className="border dark:border-[#525355] rounded-md">
                                        <div className="w-full h-[150px] rounded-t-md overflow-hidden">
                                            <img src={el.thumbnail_pic} alt="" className=" object-contain h-full w-full" />
                                        </div>
                                        <div className="border-t dark:border-[#525355] p-1 bg-pink-50 dark:bg-slate-600 rounded-b-md">
                                            <h1 className="font-bold">{el.product_name}</h1>
                                            <div className="text-sm">
                                                <span>Seller:</span>
                                                <span>{el.vendor_id.firmName}</span>
                                            </div>

                                            <div className="flex items-center justify-between dark:border-[#afb2b7] border-t p-1">
                                                <span className="">₹ {calculateMarginAndSelling(el.seller_price, el.margin, el.sellingGST).toFixed(2)}</span>
                                                <MdDelete size={20} color="red" className="cursor-pointer" onClick={() => removeProduct("featuredProduct", el._id)} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            {(featuredProductObj === null || featuredProductObj.featuredProduct.length === 0) && <h1>Nothing to show</h1>}
                        </div>
                    </div>
                </div>
                <div>
                    <h1 className="mb-2 font-bold">Best Selling</h1>
                    <div className="border dark:border-[#525355] rounded bg-white dark:bg-teal-950 p-3">
                        <div className="grid gap-3 grid-cols-3">
                            {featuredProductObj && featuredProductObj.bestSelling && (
                                featuredProductObj.bestSelling.map((el, i) => (
                                    <div key={el._id} className="border dark:border-[#525355] rounded-md">
                                        <div className="w-full h-[150px] rounded-t-md overflow-hidden">
                                            <img src={el.thumbnail_pic} alt="" className=" object-contain h-full w-full" />
                                        </div>
                                        <div className="border-t dark:border-[#525355] p-1 bg-pink-50 dark:bg-slate-600 rounded-b-md">
                                            <h1 className="font-bold">{el.product_name}</h1>
                                            <div className="text-sm">
                                                <span>Seller:</span>
                                                <span>{el.vendor_id.firmName}</span>
                                            </div>

                                            <div className="flex items-center justify-between dark:border-[#afb2b7] border-t p-1">
                                                <span className="">₹ {calculateMarginAndSelling(el.seller_price, el.margin, el.sellingGST).toFixed(2)}</span>
                                                <MdDelete size={20} color="red" className="cursor-pointer" onClick={() => removeProduct("bestSelling", el._id)} />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                            {(featuredProductObj === null || featuredProductObj.bestSelling.length === 0) && <h1>Nothing to show</h1>}
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    <h1 className="mb-2 font-bold">New Arrival</h1>
                    <div className="border dark:border-[#525355] rounded bg-white dark:bg-teal-950 p-3">
                        <div className="grid gap-3 grid-cols-3">
                            {featuredProductObj && featuredProductObj.newArrival && (
                                featuredProductObj.newArrival.map((el, i) => (
                                    <div key={el._id} className="border dark:border-[#525355] rounded-md">
                                        <div className="w-full h-[150px] rounded-t-md overflow-hidden">
                                            <img src={el.thumbnail_pic} alt="" className=" object-contain h-full w-full" />
                                        </div>
                                        <div className="border-t dark:border-[#525355] p-1 bg-pink-50 dark:bg-slate-600 rounded-b-md">
                                            <h1 className="font-bold">{el.product_name}</h1>
                                            <div className="text-sm">
                                                <span>Seller:</span>
                                                <span>{el.vendor_id.firmName}</span>
                                            </div>

                                            <div className="flex items-center justify-between dark:border-[#afb2b7] border-t p-1">
                                                <span className="">₹ {calculateMarginAndSelling(el.seller_price, el.margin, el.sellingGST).toFixed(2)}</span>
                                                <MdDelete size={20} color="red" className="cursor-pointer" onClick={() => removeProduct("newArrival", el._id)} />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}{(featuredProductObj === null || featuredProductObj.newArrival.length === 0) && <h1>Nothing to show</h1>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
