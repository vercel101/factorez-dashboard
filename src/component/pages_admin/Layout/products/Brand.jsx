import React, { useState } from "react";
import { CgArrowsExchange } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import {
    productBrandDDindex,
    productBrandNewArticleAdd,
    productBrandNewArticleClear,
    productBrandNewArticleClearAllAddArr,
    productBrandNewArticleRemove,
    spinnerOverlayOffFn,
    spinnerOverlayOnFn
} from "../../../../Redux/ReducerAction";
import { MdDeleteForever, MdDeleteOutline, MdEdit } from "react-icons/md";
import { useEffect } from "react";
import {
    AddBrandApi,
    AddCategoryApi,
    getAllBrandApi, getAllBrandByVendorApi,
    getAllCategoryApi,
    updateBrandApi,
    updateCategoryApi,
    verifyBrandById
} from "../../../../apis/adminApis";
import { FaSearch } from "react-icons/fa";
import { localDate } from "../../../../utils/stringToLocalDate";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuEye } from "react-icons/lu";

const Brand = () => {
    const [brandData, setBrandData] = useState([]);
    const { productBrandNewReducer, productBrandDDindexReducer, userInfoReducer, tokenReducer } =
        useSelector((rState) => rState);
    const dispatch = useDispatch();
    const [brandTitle, setBrandTitle] = useState("");
    const [isEditing, setEditing] = useState({ flag: false, _id: "" });
    const [article, setArticle] = useState("");
    const [brandLogo, setBrandLogo] = useState({
        url: "",
        file: null
    })

    const addArticle = () => {
        if (brandTitle !== "" && article !== "") {
            dispatch(productBrandNewArticleAdd({ article_name: article }));
            setArticle("");
        } else {
            alert("Category Title and subcategory are required..");
        }
    };

    const newSubCategoryHandler = () => {
    };
    const editBrand = (_id) => {
        if (productBrandDDindexReducer !== null) {
            setEditing({ flag: true, _id: _id });
            setBrandTitle(brandData[productBrandDDindexReducer].brand_name);
            dispatch(
                productBrandNewArticleClearAllAddArr(
                    brandData[productBrandDDindexReducer].articles
                )
            );
        }
    };

    const getAllBrands = async () => {
        dispatch(spinnerOverlayOnFn());
        if (userInfoReducer.userType === "Seller") {
            await getAllBrandByVendorApi(userInfoReducer.vendorId, tokenReducer).then(res => {
                console.log(res.data);
                setBrandData(res.data.data);
            }).catch(err => {
                console.log(err);
            })
        } else {
            await getAllBrandApi().then(res => {
                console.log(res.data);
                setBrandData(res.data.data);
            }).catch(err => {
                console.log(err);
            })
        }
        dispatch(spinnerOverlayOffFn());
    }

    const uploadCategory = async () => {
        let formData = new FormData();
        formData.append('brand_name', brandTitle)
        formData.append('articles', JSON.stringify(productBrandNewReducer))
        formData.append("vendor_id", userInfoReducer.vendorId);
        if (isEditing.flag) {
            if (brandTitle !== "" && productBrandNewReducer.length !== 0) {
                dispatch(spinnerOverlayOnFn());
                await updateBrandApi(isEditing._id, formData, tokenReducer).then(res => {
                    console.log(res.data);
                    dispatch(productBrandDDindex(null));
                    setEditing({ flag: false, _id: "" });
                    setBrandTitle("");
                    dispatch(productBrandNewArticleClear());
                    getAllBrands();
                    alert("Brand Updated Successfully");
                }).catch(err => {
                    console.log(err);
                    alert("Some error occurred!");
                })
                dispatch(spinnerOverlayOffFn());
            }
        } else {
            if (brandTitle !== "" && productBrandNewReducer.length !== 0) {
                dispatch(spinnerOverlayOnFn());
                formData.append("brandLogo", brandLogo.file ? brandLogo.file : brandLogo.url);
                await AddBrandApi(formData, tokenReducer).then(res => {
                    console.log(res.data);
                    dispatch(productBrandDDindex(null));
                    setEditing({ flag: false, _id: "" });
                    setBrandTitle("");
                    dispatch(productBrandNewArticleClear());
                    getAllBrands();
                    alert("Brand Added Successfully");
                }).catch(err => {
                    console.log(err);
                    alert("Some error occure!");
                })
                dispatch(spinnerOverlayOffFn());
            }
        }//12 2021 -> dala 200m

    };
    const brandStatusFn = async (brandId, newStatus) => {
        if (window.confirm('Are you sure! to change the Status')) {
            await verifyBrandById(brandId, { brandStatus: newStatus }, tokenReducer).then(res => {
                console.log(res.data);
                getAllBrands();
            }).catch(err => {
                console.log(err);
            })
        }
    }
    const handleChangeCategory = (idx) => {
        if (idx > 0) {
            dispatch(productBrandDDindex(idx - 1));
        } else {
            dispatch(productBrandDDindex(null));
        }
    };

    const updatedTable = () => {
        return brandData.map((el, i) => (
            <tr key={el._id} className="border-b dark:border-neutral-500">

                <td className="whitespace-nowrap border-r px-2 py-2 dark:border-neutral-500">
                    <img src={el.brandLogo} alt="" height={80} width={80} />
                </td>
                <td className="whitespace-nowrap border-r px-6 py-2 dark:border-neutral-500">
                    {el.brand_name}
                </td>
                <td className="whitespace-nowrap border-r px-6 py-2 dark:border-neutral-500">
                    <div className={`flex flex-col`}>
                        {el.articles.length > 0 && el.articles.map(el => (
                            <span className={`px-1 dark:bg-[#424242] bg-amber-50`}>{el.article_name}</span>
                        ))}
                    </div>
                </td>
                {el.vendor_id.firmName && (
                    <td className="whitespace-nowrap border-r px-6 py-2 dark:border-neutral-500">
                        {el.vendor_id.firmName}
                    </td>)
                }
                <td className="whitespace-nowrap border-r px-6 py-2 dark:border-neutral-500">
                    {userInfoReducer.userType && userInfoReducer.userType === "Seller" ? (
                        <>
                            {el.brandStatus}
                        </>
                    ) : (
                        <>
                            <select name="brandApprove" value={el.brandStatus} className="p-1 border outline-none" onChange={e => brandStatusFn(el._id, e.target.value)}>
                                <option value="Pending">Pending</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </>
                    )

                    }
                </td>

            </tr>
        ));
    };


    const cancelHandler = () => {
        setEditing({ flag: false, _id: "" });
        setBrandTitle("");
        dispatch(productBrandNewArticleClear());
    };

    const removeArticle = (index) => {
        dispatch(productBrandNewArticleRemove(index));
    };
    useEffect(() => {
        getAllBrands();
        dispatch(productBrandDDindex(null));
        setEditing({ flag: false, _id: "" });
        setBrandTitle("");
        dispatch(productBrandNewArticleClear());
    }, []);

    return (
        <div className=" bg-gray-50 dark:bg-gray-800">
            {
                userInfoReducer.userType && userInfoReducer.userType === "Seller" ? (
                    <>
                        <div className="border-b pb-5">
                            <table
                                className="min-w-full mb-5 bg-white dark:bg-gray-800 border text-start text-sm font-light dark:border-neutral-500">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="border-r px-2 py-3 dark:border-neutral-500 text-start"
                                        >
                                            Logo
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 border-r dark:border-neutral-500 text-start"
                                        >
                                            Brand Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 border-r dark:border-neutral-500 text-start"
                                        >
                                            Articles
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 border-r dark:border-neutral-500 text-start"
                                        >
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {brandData.length > 0 && updatedTable()}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex w-[80%]">
                            <div className="flex-1 me-24 w-[50%]">
                                <h1 className="text-gray-700 dark:text-white font-bold text-base">Brand</h1>
                                <div className="flex items-center">
                                    <select
                                        name=""
                                        id=""
                                        className="outline-none border p-2 w-full bg-white dark:bg-teal-800"
                                        onChange={(e) => handleChangeCategory(e.target.selectedIndex)}
                                    >
                                        <option value="">Select Brand</option>
                                        {brandData.map((el, i) => (
                                            <option key={`${el._id}`} value={el.brand_name}>
                                                {el.brand_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <h1 className="text-gray-700 font-bold text-base mt-10 dark:text-white">
                                    Articles{" "}
                                    {productBrandDDindexReducer !== null && (
                                        <button
                                            className="bg-black dark:bg-[#abd60e]  rounded text-lg font-bold text-white px-2 "
                                            onClick={() => editBrand(brandData[productBrandDDindexReducer]._id)}
                                        >
                                            Edit
                                        </button>
                                    )}
                                </h1>
                                {productBrandDDindexReducer !== null && (
                                    <ul className="bg-white dark:bg-gray-800 border mt-1 p-2">
                                        {brandData.length > 0 && brandData[productBrandDDindexReducer].articles.map(
                                            (el, i) => (
                                                <li
                                                    key={`${el._id}`}
                                                    className="py-1 border-b last:border-b-0 dark:hover:bg-teal-700 hover:bg-teal-50 flex items-center"
                                                >
                                                    <span className="text-lg font-semibold">{el.article_name}</span>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                )}
                            </div>
                            <div className="flex-1 border-s ps-10">
                                <div className="w-full">
                                    <h1 className="text-gray-700 font-bold text-base dark:text-white mb-2">
                                        Brand title {isEditing.flag &&
                                            <span className="bg-teal-500 text-white px-2">Edit Mode</span>}
                                    </h1>
                                    <input
                                        type="text"
                                        className="outline-none border p-2 w-full dark:bg-[#424242] dark:border-0"
                                        value={brandTitle}
                                        disabled={isEditing.flag ? "disabled" : ""}
                                        placeholder="Brand Title"
                                        onChange={(e) => setBrandTitle(e.target.value)}
                                    />
                                    <h1 className="text-gray-700 font-bold text-base dark:text-white mt-4">
                                        Logo
                                    </h1>
                                    <div className={``}>
                                        <input
                                            type="file"
                                            className="outline-none border w-full dark:bg-[#424242] dark:border-0"
                                            placeholder="Brand Title"
                                            disabled={isEditing.flag ? "disabled" : ""}
                                            onChange={(e) => setBrandLogo({ file: e.target.files[0], url: "" })}
                                        />
                                        <div className="flex justify-center items-center">
                                            <div className="w-full border-2 me-1"></div>
                                            <span>OR</span>
                                            <div className="w-full border-2 ms-1"></div>
                                        </div>
                                        <input
                                            type="text"
                                            disabled={isEditing.flag ? "disabled" : ""}
                                            className="outline-none border w-full dark:bg-[#424242] dark:border-0 p-2"
                                            value={brandLogo.url && brandLogo.url}
                                            placeholder="Image URL"
                                            onChange={(e) => setBrandLogo({ file: null, url: e.target.value })}
                                        />
                                    </div>
                                    <button onClick={() => console.log(brandLogo)}>Check</button>

                                    <hr className="my-5 border-t-4 border-[#949494]" />
                                    <h1 className="text-gray-700 font-bold text-base dark:text-white mb-2">
                                        Add Articles
                                    </h1>
                                    <div className="flex items-center">
                                        <input
                                            type="text"
                                            className="outline-none border p-2 w-full dark:bg-[#424242] dark:border-0"
                                            value={article}
                                            placeholder="New Article"
                                            onChange={(e) => setArticle(e.target.value)}
                                        />
                                        <button
                                            className="border border-[#949494] p-2 bg-[#949494] dark:bg-[#5154ac] dark:border-0 text-white font-semibold"
                                            onClick={() => addArticle()}
                                        >
                                            Add
                                        </button>
                                    </div>
                                    <div>
                                        {productBrandNewReducer.length > 0 && (
                                            <ul className="bg-white border mt-1 p-2 dark:bg-gray-800">
                                                {productBrandNewReducer.map((el, i) => (
                                                    <li
                                                        key={`${i}_newSubCat`}
                                                        className="py-1 border-b last:border-b-0 dark:hover:bg-teal-700 hover:bg-teal-50 flex justify-between items-center"
                                                    >
                                                        <span className="text-lg font-semibold">
                                                            {el.article_name}
                                                        </span>
                                                        <MdDeleteForever
                                                            size={30}
                                                            color="red"
                                                            className="cursor-pointer"
                                                            onClick={() => removeArticle(i)}
                                                        />
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                    <div className="mt-2">
                                        <button
                                            className="bg-[#abd60e] rounded-md me-1 font-semibold px-3 py-2"
                                            onClick={() => uploadCategory()}
                                        >
                                            Upload
                                        </button>
                                        <button
                                            className="bg-[#ed0d0d] rounded-md ms-1 font-semibold px-3 py-2"
                                            onClick={() => cancelHandler()}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </>
                ) : (
                    <div className="inline-block min-w-full py-2">
                        <div className="">
                            <table
                                className="min-w-full bg-white dark:bg-gray-800 border text-start text-sm font-light dark:border-neutral-500">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="border-r px-2 py-3 dark:border-neutral-500 text-start"
                                        >
                                            Logo
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 border-r dark:border-neutral-500 text-start"
                                        >
                                            Brand Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 border-r dark:border-neutral-500 text-start"
                                        >
                                            Articles
                                        </th>
                                        <th
                                            scope="col"
                                            className="border-r px-6 py-3 dark:border-neutral-500 text-start"
                                        >
                                            Firm name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 border-r dark:border-neutral-500 text-start"
                                        >
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {brandData.length > 0 && updatedTable()}
                                </tbody>
                            </table>
                        </div>

                    </div>
                )
            }

        </div>
    )
}

export default Brand