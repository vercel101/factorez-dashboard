import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { SketchPicker } from "react-color";
import { useEffect } from "react";
import { createProductApi, getAllBrandApi, getAllBrandByVendorApi, getAllCategoryApi, getAllColorApi, getAllVentorApi } from "../../../../apis/adminApis";
import { spinnerOverlayOffFn, spinnerOverlayOnFn } from "../../../../Redux/ReducerAction";
import { useDispatch, useSelector } from "react-redux";
import Tag from "../Tag";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuEye } from "react-icons/lu";
import { MdOutlinePlaylistAdd, MdDeleteForever } from "react-icons/md";
import { BiChevronDown } from "react-icons/bi";

const ProductCreate = () => {
    const dispatch = useDispatch();
    const { userInfoReducer, tokenReducer } = useSelector((state) => state);
    const [thumbnailImg, setThumbnail] = useState(null);
    const [thumbnailUrl, setThumbnailUrl] = useState(null);
    const [imgOrLink, setImgOrLink] = useState(false);
    const [multipleImages, setMultipleImages] = useState({
        urls: [],
        files: "",
        singleImageUrl: "",
    });
    const [catData, setCatData] = useState([]);
    const [categoryIdx, setCategoryIdx] = useState(null);
    const [brandData, setBrandData] = useState([]);
    const [colorData, setColorData] = useState([]);
    const [vendorData, setVendorData] = useState([]);
    const [brandIdx, setBrandIdx] = useState(null);
    const [tagInputString, setTagInputString] = useState("");
    const [tags, setTags] = useState([]);
    const [productField, setProductField] = useState({
        product_name: "",
        sku_code: "",
        hsn_code: "",
        brandId: "",
        articleId: "",
        color: "",
        categoryId: "",
        subCatId: "",
        stockStatus: "In_stock",
        lotSizeQty: [],
        mrp: 0,
        seller_price: 0,
        gst: 0,
        qty_in_hand: 0,
        min_order_qty: 0,
        sole: "",
        material: "",
        packing_type: "",
        made_in: "India",
        weight: "",
        description: "",
    });
    const [selectedColor, setSelectedColor] = useState({ colorName: "", colorHex: "", color_id: "" });
    const [metaData, setMetaData] = useState({
        metaTitle: "",
        metaKeyword: "",
        metaDescription: "",
    });
    const [vendorStatus, setVendorStatus] = useState({
        vendorId: "",
        status: "",
    });
    const [bestSellingNewArrival, setBestSellingNewArrival] = useState({
        bestSelling: false,
        newArrival: false,
    });
    const inputFn = () => {
        document.getElementById("thumbnailInput").click();
    };
    const options = document.querySelectorAll("li");
    for (let i = 0; i < options.length; i++) {
        options[i].onclick = () => {
            document.activeElement.blur();
        };
    }

    const handleThumbUpload = (e) => {
        if (e.target.files) {
            setThumbnail(e.target.files[0]);
        } else {
            setThumbnailUrl(e.target.value);
        }
    };
    const setImgFn = () => {
        if (imgOrLink && thumbnailUrl !== null) {
            if (thumbnailUrl.slice(0, 4).toLocaleLowerCase() === "http") {
                setThumbnail(thumbnailUrl);
            } else {
                alert("Please provide a valid image url");
                setThumbnailUrl("");
            }
        }
    };
    const toggleBtn = (flag) => {
        setImgOrLink(flag);
        setThumbnail(null);
        setThumbnailUrl(null);
    };
    const brandHandler = (index) => {
        if (index > 0) {
            setBrandIdx(index - 1);
        } else {
            setBrandIdx(null);
        }
    };
    const categoryHandler = (index) => {
        if (index > 0) {
            setCategoryIdx(index - 1);
        } else {
            setCategoryIdx(null);
        }
    };

    const getAllBrands = async () => {
        if (userInfoReducer.userType === "Seller") {
            await getAllBrandByVendorApi(userInfoReducer.vendorId, tokenReducer)
                .then((res) => {
                    setBrandData(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            await getAllBrandApi()
                .then((res) => {
                    setBrandData(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };
    const getAllCategory = async () => {
        console.log("get all category fired");
        dispatch(spinnerOverlayOnFn());
        await getAllCategoryApi()
            .then((res) => {
                console.log(res.data);
                setCatData(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
        dispatch(spinnerOverlayOffFn());
    };
    const getAllVendors = async () => {
        if (userInfoReducer.userType === "Admin" || userInfoReducer.userType === "Super Admin") {
            dispatch(spinnerOverlayOnFn());
            await getAllVentorApi(tokenReducer)
                .then((res) => {
                    console.log(res.data);
                    setVendorData(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                });
            dispatch(spinnerOverlayOffFn());
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            setTags((preState) => {
                return [...preState, tagInputString];
            });
            setTagInputString("");
        }
    };

    const addProductFn = async () => {
        productField.lotSizeQty = tags;
        if (brandData[brandIdx]) {
            productField.brandId = brandData[brandIdx]._id;
        }
        if (catData[categoryIdx]) {
            productField.categoryId = catData[categoryIdx]._id;
        }
        if (selectedColor.colorHex !== "" && selectedColor.colorName !== "") {
            productField.color = selectedColor.color_id;
        }

        let formData = new FormData();
        for (let productKey in productField) {
            if (productKey === "lotSizeQty") {
                formData.append(productKey, JSON.stringify(productField[productKey]));
            } else {
                formData.append(productKey, productField[productKey]);
            }
        }
        formData.append("thumbnail", thumbnailImg);
        if (multipleImages.files.length > 0) {
            for (let val of multipleImages.files) {
                console.log(val);
                formData.append("mulImg", val);
            }
        } else if (multipleImages.urls.length > 0) {
            for (let val of multipleImages.urls) {
                console.log(val);
                formData.append("mulImg", val);
            }
        }
        formData.append("meta", JSON.stringify(metaData));
        dispatch(spinnerOverlayOnFn());
        await createProductApi(formData, tokenReducer)
            .then((res) => {
                console.log(res.data);
                alert("Product Created Successfully");
            })
            .catch((err) => {
                console.log(err);
                alert(err.response.data.message);
            });
        dispatch(spinnerOverlayOffFn());
    };

    const cancelProductFn = () => {
        if (window.confirm("Are you want to cancel this product")) {
            setProductField({
                product_name: "",
                sku_code: "",
                hsn_code: "",
                brandId: "",
                articleId: "",
                color: "",
                categoryId: "",
                subCatId: "",
                stockStatus: "In_stock",
                lotSizeQty: [],
                mrp: 0,
                gst: 0,
                seller_price: 0,
                qty_in_hand: 0,
                min_order_qty: 0,
                sole: "",
                material: "",
                packing_type: "",
                made_in: "",
                weight: "",
                description: "",
            });
            setMetaData({
                metaTitle: "",
                metaKeyword: "",
                metaDescription: "",
            });
            setVendorStatus({
                vendorId: "",
                status: "",
            });
        }
    };

    const getAllColor = async () => {
        dispatch(spinnerOverlayOnFn());
        await getAllColorApi()
            .then((res) => {
                setColorData(res.data.data);
            })
            .catch((error) => {
                console.log(error);
                alert("Error occurred!");
            });
        dispatch(spinnerOverlayOffFn());
    };

    const removeTag = (index) => {
        let arr;
        setTags((old) => {
            arr = [...old];
            arr.splice(index, 1);
            return arr;
        });
        console.log("first");
    };
    const multipleImagehandler = (method, index) => {
        if (method === "DEL") {
            let arr = [];
            setMultipleImages((old) => {
                arr = old.urls;
                arr.splice(index, 1);
                return { urls: arr, files: "", singleImageUrl: "" };
            });
        } else if (method === "ADD") {
            if (multipleImages.singleImageUrl.slice(0, 4).toLocaleLowerCase() === "http") {
                let arr = [];
                setMultipleImages((old) => {
                    arr = old.urls;
                    arr.push(old.singleImageUrl);
                    return { urls: arr, files: "", singleImageUrl: "" };
                });
            } else {
                alert("Please provide a valid image url");
                let arr = [];
                setMultipleImages((old) => {
                    arr = old.urls;
                    return { urls: arr, files: "", singleImageUrl: "" };
                });
            }
        }
    };

    useEffect(() => {
        // console.log(userInfoReducer)
        getAllBrands();
        getAllCategory();
        getAllVendors();
        getAllColor();
        setTags([]);
    }, []);

    return (
        <div className="flex">
            <div className="flex-1 me-24">
                <div className="grid grid-cols-3 gap-4">
                    <div className={`col-span-3`}>
                        <h1 className="dark:text-white text-[#384047] font-semibold text-lg mb-1">Product Name</h1>
                        <input
                            type="text"
                            placeholder="Product Name"
                            value={productField.product_name}
                            onChange={(e) =>
                                setProductField((old) => {
                                    return { ...old, product_name: e.target.value };
                                })
                            }
                            className="outline-none border rounded-md p-2 w-full dark:bg-[#424242] dark:border-[#424242]"
                        />
                    </div>
                    <div>
                        <h1 className="dark:text-white text-[#384047] font-semibold text-lg mb-1">SKU code</h1>
                        <input
                            type="text"
                            placeholder="SKU code"
                            value={productField.sku_code}
                            onChange={(e) =>
                                setProductField((old) => {
                                    return { ...old, sku_code: e.target.value };
                                })
                            }
                            className="outline-none border rounded-md p-2 w-full dark:bg-[#424242] dark:border-[#424242]"
                        />
                    </div>
                    <div>
                        <h1 className="dark:text-white text-[#384047] font-semibold text-lg mb-1">HSN code</h1>
                        <input
                            type="text"
                            placeholder="SKU code"
                            value={productField.hsn_code}
                            onChange={(e) =>
                                setProductField((old) => {
                                    return { ...old, hsn_code: e.target.value };
                                })
                            }
                            className="outline-none border rounded-md p-2 w-full mb-8 dark:bg-[#424242] dark:border-[#424242]"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                    
                    <div>
                        <h1 className="dark:text-white text-[#384047] font-semibold text-lg mb-1">Brand</h1>
                        <select
                            name=""
                            id=""
                            onChange={(e) => brandHandler(e.target.selectedIndex)}
                            className="outline-none rounded-md border px-3 py-2  w-full dark:bg-[#424242] dark:border-[#424242]">
                            <option value="">Select Brand</option>
                            {brandData.length > 0 &&
                                brandData.map((el, i) => (
                                    <>
                                        {" "}
                                        {el.brandStatus === "Approved" && (
                                            <option key={`${el._id}`} value={el.brand_name}>
                                                {el.brand_name}
                                            </option>
                                        )}
                                    </>
                                ))}
                        </select>
                    </div>
                    <div>
                        <h1 className="dark:text-white text-[#384047] font-semibold text-lg mb-1">Article</h1>
                        <select
                            name=""
                            id=""
                            onChange={(e) =>
                                setProductField((preState) => {
                                    return { ...preState, articleId: e.target.value };
                                })
                            }
                            className="outline-none rounded-md border px-3 py-2 w-full dark:bg-[#424242] dark:border-[#424242]">
                            <option value="">Select Article</option>
                            {brandIdx !== null &&
                                brandData[brandIdx].articles.map((el, index) => (
                                    <option value={el._id} key={el._id}>
                                        {el.article_name}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div>
                        <h1 className="dark:text-white text-[#384047] font-semibold text-lg mb-1">Color</h1>
                        <div tabIndex="0" className="group relative inline-block w-full">
                            <button className="focus:outline-none border py-2 ps-2 w-full flex justify-between items-center bg-white rounded-md dark:bg-[#424242] dark:border-[#424242] text-start">
                                {selectedColor.colorName !== "" ? selectedColor.colorName : "Select Color"}
                                <BiChevronDown size={20} />
                            </button>
                            <div className="hidden group-focus-within:block w-[230px] items-center dark:border-neutral-500 rounded-md p-1 list-none absolute border dark:bg-teal-800 bg-teal-50 right-0 top-10 z-1 shadow-lg animate-slideIn">
                                <ul>
                                    {colorData.length > 0 &&
                                        colorData.map((el, i) => (
                                            <li
                                                key={el._id}
                                                className={`flex justify-start items-center h-[50px] mb-2 cursor-pointer border`}
                                                onClick={() =>
                                                    setSelectedColor({
                                                        colorName: el.colorName,
                                                        colorHex: el.colorHex,
                                                        color_id: el._id,
                                                    })
                                                }>
                                                <div className={`h-full w-1/2 flex justify-center items-center border`} style={{ backgroundColor: el.colorHex }}>
                                                    {el.colorHex}
                                                </div>
                                                <div className={`ms-3`}>{el.colorName}</div>
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div>
                        <h1 className="dark:text-white text-[#384047] font-semibold text-lg mb-1">Category</h1>
                        <select
                            name=""
                            id=""
                            onChange={(e) => categoryHandler(e.target.selectedIndex)}
                            className="outline-none border rounded-md px-3 py-2  w-full dark:bg-[#424242] dark:border-[#424242]">
                            <option value="">Select Category</option>
                            {catData.length > 0 &&
                                catData.map((el, i) => (
                                    <option value="" key={el._id}>
                                        {el.category_name}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div>
                        <h1 className="dark:text-white text-[#384047] font-semibold text-lg mb-1">Sub Category</h1>
                        <select
                            name=""
                            id=""
                            onChange={(e) =>
                                setProductField((preState) => {
                                    return { ...preState, subCatId: e.target.value };
                                })
                            }
                            className="outline-none border rounded-md px-3 py-2  w-full dark:bg-[#424242] dark:border-[#424242]">
                            <option value="">Select SubCategory</option>
                            {categoryIdx !== null &&
                                catData[categoryIdx].sub_category.map((el) => (
                                    <option value={el._id} key={el._id}>
                                        {el.subcategory_name}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div>
                        <h1 className="dark:text-white text-[#384047] font-semibold text-lg mb-1">Stock status</h1>
                        <select
                            name=""
                            id=""
                            value={productField.stockStatus}
                            onChange={(e) =>
                                setProductField((old) => {
                                    return { ...old, stockStatus: e.target.value };
                                })
                            }
                            className="outline-none border rounded-md px-3 py-2  w-full dark:bg-[#424242] dark:border-[#424242]">
                            <option value="In_stock">In Stock</option>
                            <option value="Out_of_stock">Out Off Stock</option>
                        </select>
                    </div>
                </div>
                <div>
                    <h1 className="dark:text-white text-[#384047] font-semibold text-lg mb-1">Lot Size / Quantity</h1>
                    <div className="rounded-md bg-white p-2 w-full mb-8 border dark:bg-[#424242] dark:border-[#424242] flex flex-wrap">
                        {tags.map((e, i) => (
                            <Tag key={`${i}_tags`} tag={e} onClick={() => removeTag(i)} />
                        ))}
                        <input
                            type="text"
                            value={tagInputString}
                            className="outline-none flex-1 ps-1 dark:bg-[#424242]"
                            placeholder={tags.length === 0 && "insert size and press enter"}
                            onChange={(e) => setTagInputString(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <h1 className="dark:text-white text-[#384047] font-semibold text-lg mb-1">MRP</h1>
                        <input
                            type="number"
                            placeholder="MRP"
                            value={productField.mrp}
                            onChange={(e) =>
                                setProductField((old) => {
                                    return { ...old, mrp: e.target.value };
                                })
                            }
                            className="outline-none border rounded-md p-2 w-full mb-8 dark:bg-[#424242] dark:border-[#424242] "
                        />
                    </div>
                    <div>
                        <h1 className="dark:text-white text-[#384047] font-semibold text-lg mb-1">Seller Price</h1>
                        <input
                            type="number"
                            placeholder="Seller Price"
                            value={productField.seller_price}
                            onChange={(e) =>
                                setProductField((old) => {
                                    return { ...old, seller_price: e.target.value };
                                })
                            }
                            className="outline-none border rounded-md p-2 w-full mb-8 dark:bg-[#424242] dark:border-[#424242] "
                        />
                    </div>
                    <div>
                        <h1 className="dark:text-white text-[#384047] font-semibold text-lg mb-1">GST in %</h1>
                        <input
                            type="number"
                            placeholder="GST in %"
                            value={productField.gst}
                            onChange={(e) =>
                                setProductField((old) => {
                                    return { ...old, gst: e.target.value };
                                })
                            }
                            className="outline-none border rounded-md p-2 w-full mb-8 dark:bg-[#424242] dark:border-[#424242]"
                        />
                    </div>
                    {/* <div>
                        <h1 className="dark:text-white text-[#384047] font-semibold text-lg mb-1">Selling Price</h1>
                        <input
                            type="number"
                            disabled={true}
                            placeholder="Selling Price"
                            value={productField.selling_price}
                            className="outline-none border rounded-md p-2 w-full mb-8 dark:bg-[#424242] dark:border-[#424242]"
                        />
                    </div>
                    <div>
                        <h1 className="dark:text-white text-[#384047] font-semibold text-lg mb-1">Final Price(incl. GST)</h1>
                        <input
                            type="number"
                            placeholder="Final Price(incl. GST)"
                            disabled={true}
                            value={Number(productField.seller_price) + ((Number(productField.seller_price) * Number(productField.gst))/100)}
                            className="outline-none border rounded-md p-2 w-full mb-8 dark:bg-[#424242] dark:border-[#424242] "
                        />
                    </div> */}

                    <div>
                        <h1 className="dark:text-white text-[#384047] font-semibold text-lg mb-1">QTY in hand</h1>
                        <input
                            type="text"
                            placeholder="QTY in hand"
                            value={productField.qty_in_hand}
                            onChange={(e) =>
                                setProductField((old) => {
                                    return { ...old, qty_in_hand: e.target.value };
                                })
                            }
                            className="outline-none border rounded-md p-2 w-full mb-8 dark:bg-[#424242] dark:border-[#424242] "
                        />
                    </div>
                    <div>
                        <h1 className="dark:text-white text-[#384047] font-semibold text-lg mb-1">Minimum Order QTY</h1>
                        <input
                            type="text"
                            placeholder="Minimum Order QTY"
                            value={productField.min_order_qty}
                            onChange={(e) =>
                                setProductField((old) => {
                                    return { ...old, min_order_qty: e.target.value };
                                })
                            }
                            className="outline-none border rounded-md p-2 w-full mb-8 dark:bg-[#424242] dark:border-[#424242] "
                        />
                    </div>

                    <div>
                        <h1 className="dark:text-white text-[#384047] font-semibold text-lg mb-1">Sole</h1>
                        <input
                            type="text"
                            placeholder="Sole"
                            value={productField.sole}
                            onChange={(e) =>
                                setProductField((old) => {
                                    return { ...old, sole: e.target.value };
                                })
                            }
                            className="outline-none border rounded-md p-2 w-full mb-8 dark:bg-[#424242] dark:border-[#424242] "
                        />
                    </div>
                    <div>
                        <h1 className="dark:text-white text-[#384047] font-semibold text-lg mb-1">Material</h1>
                        <input
                            type="text"
                            placeholder="material"
                            value={productField.material}
                            onChange={(e) =>
                                setProductField((old) => {
                                    return { ...old, material: e.target.value };
                                })
                            }
                            className="outline-none border rounded-md p-2 w-full mb-8 dark:bg-[#424242] dark:border-[#424242] "
                        />
                    </div>
                    <div>
                        <h1 className="dark:text-white text-[#384047] font-semibold text-lg mb-1">Packing type</h1>
                        <input
                            type="text"
                            placeholder="Packing type"
                            value={productField.packing_type}
                            onChange={(e) =>
                                setProductField((old) => {
                                    return { ...old, packing_type: e.target.value };
                                })
                            }
                            className="outline-none border rounded-md p-2 w-full mb-8 dark:bg-[#424242] dark:border-[#424242] "
                        />
                    </div>
                    <div>
                        <h1 className="dark:text-white text-[#384047] font-semibold text-lg mb-1">Made in</h1>
                        <input
                            type="text"
                            placeholder="Made in"
                            value={productField.made_in}
                            onChange={(e) =>
                                setProductField((old) => {
                                    return { ...old, made_in: e.target.value };
                                })
                            }
                            className="outline-none border rounded-md p-2 w-full mb-8 dark:bg-[#424242] dark:border-[#424242] "
                        />
                    </div>
                    <div>
                        <h1 className="dark:text-white text-[#384047] font-semibold text-lg mb-1">Weight</h1>
                        <input
                            type="text"
                            placeholder="Weight"
                            value={productField.weight}
                            onChange={(e) =>
                                setProductField((old) => {
                                    return { ...old, weight: e.target.value };
                                })
                            }
                            className="outline-none rounded-md border p-2 w-full mb-8 dark:bg-[#424242] dark:border-[#424242] "
                        />
                    </div>
                </div>
                <h1 className="dark:text-white text-[#384047] font-semibold text-lg mb-1">Description</h1>
                <textarea
                    type="text"
                    placeholder="summary for product"
                    value={productField.description}
                    onChange={(e) =>
                        setProductField((old) => {
                            return { ...old, description: e.target.value };
                        })
                    }
                    className="outline-none border rounded-md p-2 w-full mb-8 dark:bg-[#424242] dark:border-[#424242]"
                />
                <div className="p-4 rounded-md bg-[#adffd5] dark:bg-[#0a110d70] mb-8">
                    <div>
                        <h1 className="dark:text-white text-[#384047] font-semibold text-lg mb-1">Meta Title</h1>
                        <input
                            type="text"
                            placeholder="Meta Title"
                            value={metaData.metaTitle}
                            onChange={(e) =>
                                setMetaData((old) => {
                                    return { ...old, metaTitle: e.target.value };
                                })
                            }
                            className="outline-none border rounded-md p-2 w-full mb-8 dark:bg-[#424242] dark:border-[#424242]"
                        />
                    </div>
                    <div>
                        <h1 className="dark:text-white text-[#384047] font-semibold text-lg mb-1">Meta Keywords</h1>
                        <input
                            type="text"
                            placeholder="Meta  Keywords"
                            value={metaData.metaKeyword}
                            onChange={(e) =>
                                setMetaData((old) => {
                                    return { ...old, metaKeyword: e.target.value };
                                })
                            }
                            className="outline-none border rounded-md p-2 w-full mb-8 dark:bg-[#424242] dark:border-[#424242]"
                        />
                    </div>
                    <div>
                        <h1 className="dark:text-white text-[#384047] font-semibold text-lg mb-1">Meta Description</h1>
                        <input
                            type="text"
                            placeholder="Meta Description"
                            value={metaData.metaDescription}
                            onChange={(e) =>
                                setMetaData((old) => {
                                    return { ...old, metaDescription: e.target.value };
                                })
                            }
                            className="outline-none border rounded-md p-2 w-full mb-8 dark:bg-[#424242] dark:border-[#424242]"
                        />
                    </div>
                </div>
                <div className="flex items-center justify-start">
                    <button className="bg-[#4BC970] rounded-md border border-[#4BC970] px-3 py-2 text-white font-bold text-lg" onClick={() => addProductFn()}>
                        Submit
                    </button>
                    <button className="bg-[#ffffff] rounded-md px-3 py-2 ms-3 border border-[#4BC970] text-[#384047] font-bold text-lg" onClick={() => cancelProductFn()}>
                        Cancel
                    </button>
                </div>
            </div>

            {/* -------------------------------- Right side container -------------------------------- */}

            <div className="w-[30%]">
                {(userInfoReducer.userType && userInfoReducer.userType === "Admin") ||
                    (userInfoReducer.userType === "Super Admin" && (
                        <div className="p-4 rounded-md bg-[#adffd5] dark:bg-[#0a110d70] mb-8">
                            <div>
                                <h1 className="dark:text-white text-[#384047] font-semibold text-lg mb-1">Select Vendor</h1>
                                <select
                                    name=""
                                    id=""
                                    onChange={(e) =>
                                        setVendorStatus((old) => {
                                            return { ...old, vendorId: e.target.value };
                                        })
                                    }
                                    className="outline-none border rounded-md px-3 py-2  w-full dark:bg-[#424242] dark:border-[#424242]">
                                    <option value="">Select</option>
                                    {vendorData.length > 0 &&
                                        vendorData.map((el, i) => (
                                            <option key={el._id} value={el._id}>
                                                {el.firmName}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div className="mt-5">
                                <h1 className="dark:text-white text-[#384047] font-semibold text-lg mb-1">Product Status</h1>
                                <select
                                    name=""
                                    id=""
                                    onChange={(e) =>
                                        setVendorStatus((old) => {
                                            return { ...old, status: e.target.value };
                                        })
                                    }
                                    className="outline-none border rounded-md px-3 py-2  w-full dark:bg-[#424242] dark:border-[#424242]">
                                    <option value="Pending">Pending</option>
                                    <option value="Rejected">Rejected</option>
                                    <option value="Approved">Approved</option>
                                </select>
                            </div>
                            <div className="border p-3 mt-5 bg-white rounded-md dark:bg-[#424242] dark:border-[#424242]">
                                <div className="flex items-center justify-between">
                                    <h1 className="dark:text-white text-[#384047] font-semibold text-lg mb-1">Show in Best Selling</h1>
                                    <label htmlFor="bestSelling" className="flex items-center">
                                        <span className="mx-1 px-3 font-bold text-blue-600 dark:text-yellow-300">{bestSellingNewArrival.bestSelling ? "Yes" : "No"}</span>
                                        <div className="relative">
                                            <input
                                                id="bestSelling"
                                                type="checkbox"
                                                className="hidden"
                                                value={bestSellingNewArrival.bestSelling}
                                                onChange={(e) =>
                                                    setBestSellingNewArrival((prev) => {
                                                        return { ...prev, bestSelling: e.target.checked };
                                                    })
                                                }
                                            />
                                            <div className="toggle__line w-12 h-6 bg-gray-200 rounded-full shadow-inner"></div>
                                            <div className="toggle__dot absolute w-5 h-5 bg-white rounded-full shadow inset-y-0 left-0"></div>
                                        </div>
                                    </label>
                                </div>
                                <div className="mt-2 flex items-center justify-between">
                                    <h1 className="dark:text-white text-[#384047] font-semibold text-lg mb-1">Show in New Arrivals</h1>
                                    <label htmlFor="newArrivals" className="flex items-center">
                                        <span className="mx-1 px-3 font-bold text-blue-600 dark:text-yellow-300">{bestSellingNewArrival.newArrival ? "Yes" : "No"}</span>
                                        <div className="relative">
                                            <input
                                                id="newArrivals"
                                                type="checkbox"
                                                className="hidden"
                                                value={bestSellingNewArrival.newArrival}
                                                onChange={(e) =>
                                                    setBestSellingNewArrival((prev) => {
                                                        return { ...prev, newArrival: e.target.checked };
                                                    })
                                                }
                                            />
                                            <div className="toggle__line w-12 h-6 bg-gray-200 rounded-full shadow-inner"></div>
                                            <div className="toggle__dot absolute w-5 h-5 bg-white rounded-full shadow inset-y-0 left-0"></div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    ))}
                <div>
                    <div className="flex items-center justify-center w-full mb-12">
                        <label htmlFor="toggleB" className="flex items-center cursor-pointer">
                            <div className="me-3 text-[#384047] font-medium dark:text-white">Image</div>
                            <div className="relative">
                                <input type="checkbox" defaultChecked={imgOrLink} id="toggleB" className="sr-only" onClick={(e) => toggleBtn(e.target.checked)} />

                                <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>

                                <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                            </div>
                            <div className="ml-3 text-[#384047] font-medium dark:text-white">Link</div>
                        </label>
                    </div>
                    <div className=" border-dashed border-4 py-8 cursor-pointer px-4" onClick={() => inputFn()}>
                        {thumbnailImg && <img src={imgOrLink ? thumbnailImg : URL.createObjectURL(thumbnailImg)} alt="" title="thumbnail Image" />}

                        <div>
                            <div className={`${thumbnailImg === null && !imgOrLink ? "flex" : "hidden"} flex-col justify-center items-center`}>
                                <FaCloudUploadAlt size={150} className="w-full text-[#683aff]" />
                                <span className="bg-[#683affbd] text-white font-semibold p-3 rounded-md">Upload a product thumbnail</span>
                            </div>
                            <div className="flex justify-center items-center mt-1 w-full">
                                <input
                                    type={`${imgOrLink ? "text" : "file"}`}
                                    id="thumbnailInput"
                                    onChange={(e) => handleThumbUpload(e)}
                                    autoComplete="off"
                                    className={`${!imgOrLink && "hidden"} outline-none border py-1 w-full dark:bg-[#424242] dark:border-[#424242] px-2`}
                                />
                                <button
                                    className={`${!imgOrLink && "hidden"} bg-[#683aff] text-white font-semibold px-2 py-1 border border-[#683aff] dark:border-[#424242]`}
                                    onClick={() => setImgFn()}>
                                    upload
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    <span className="mb-1">Multiple Images</span>
                    <div>
                        <input
                            type="file"
                            name=""
                            id=""
                            multiple
                            className="border border-green-500 w-full"
                            onChange={(e) => setMultipleImages({ urls: [], files: e.target.files })}
                        />
                    </div>
                    <div className="flex justify-center items-center my-3">
                        <div className="border-b-2 w-full me-2"></div>
                        <span className="text-xs text-blue-500">OR</span>
                        <div className="border-b-2 w-full ms-2"></div>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="text"
                            className="outline-none border border-green-500 w-full p-1"
                            placeholder="Image URL"
                            value={multipleImages.singleImageUrl}
                            onChange={(e) =>
                                setMultipleImages((preState) => {
                                    return { ...preState, singleImageUrl: e.target.value };
                                })
                            }
                        />
                        <button className="border p-1 px-4 border-green-500 bg-green-500 text-white" onClick={() => multipleImagehandler("ADD")}>
                            <MdOutlinePlaylistAdd size={24} />
                        </button>
                    </div>
                    <div className="mt-2">
                        {multipleImages.urls.length > 0 &&
                            multipleImages.urls.map((el, i) => (
                                <div className="flex items-center my-1">
                                    <span className=" bg-white w-full p-1">
                                        {el.slice(0, 35)}
                                        {el.length > 35 && "..."}
                                    </span>
                                    <button className="p-1 px-4 bg-red-500 text-white" onClick={() => multipleImagehandler("DEL", i)}>
                                        <MdDeleteForever size={24} />
                                    </button>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCreate;
