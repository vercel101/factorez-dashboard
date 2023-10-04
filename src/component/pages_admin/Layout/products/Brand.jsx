import React, { useState } from "react";
import { CgArrowsExchange } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { authTokenClear, productBrandDDindex, spinnerOverlayOffFn, spinnerOverlayOnFn, userInfoClear } from "../../../../Redux/ReducerAction";
import { MdDeleteForever, MdDeleteOutline, MdEdit } from "react-icons/md";
import { useEffect } from "react";
import { AddBrandApi, AddCategoryApi, getAllBrandApi, getAllBrandByVendorApi, getAllCategoryApi, updateBrandApi, updateCategoryApi, verifyBrandById } from "../../../../apis/adminApis";
import { FaSearch } from "react-icons/fa";
import { localDate } from "../../../../utils/stringToLocalDate";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuEye } from "react-icons/lu";
import { Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Brand = ({ productBrandDDindexReducer, userInfoReducer, tokenReducer }) => {
    const [brandData, setBrandData] = useState([]);
    const [filteredBrand, setFilteredBrand] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [brandTitle, setBrandTitle] = useState("");
    const [isEditing, setEditing] = useState({ flag: false, _id: "" });
    const [brandLogo, setBrandLogo] = useState({
        url: "",
        file: null,
    });

    const logoutBtn = () => {
        dispatch(authTokenClear());
        dispatch(userInfoClear());
        navigate("/admin/login");
    };

    const editBrand = (_id) => {
        if (productBrandDDindexReducer !== null) {
            setEditing({ flag: true, _id: _id });
            setBrandTitle(brandData[productBrandDDindexReducer].brand_name);
        }
    };

    const getAllBrands = async () => {
        dispatch(spinnerOverlayOnFn());
        if (userInfoReducer.userType === "Seller") {
            await getAllBrandByVendorApi(userInfoReducer.vendorId, tokenReducer)
                .then((res) => {
                    console.log(res.data);
                    setBrandData(res.data.data);
                    setFilteredBrand(res.data.data);
                })
                .catch((err) => {
                    if (err.response && err.response.status === 401) {
                        logoutBtn();
                    }
                    console.log(err);
                });
        } else {
            await getAllBrandApi(tokenReducer)
                .then((res) => {
                    console.log(res.data);
                    setBrandData(res.data.data);
                    setFilteredBrand(res.data.data);
                })
                .catch((err) => {
                    if (err.response && err.response.status === 401) {
                        logoutBtn();
                    }
                    console.log(err);
                });
        }
        dispatch(spinnerOverlayOffFn());
    };
    const onSearchBrandHandler = (val) => {
        let arr = [];
        for (let el of brandData) {
            if (el.brand_name.toLowerCase().includes(val.toLowerCase())) {
                arr.push(el);
            }
        }
        setFilteredBrand((preState) => arr);
    };

    const uploadCategory = async () => {
        let formData = new FormData();
        formData.append("brand_name", brandTitle);
        formData.append("vendor_id", userInfoReducer.vendorId);

        if (brandTitle !== "") {
            dispatch(spinnerOverlayOnFn());
            formData.append("brandLogo", brandLogo.file ? brandLogo.file : brandLogo.url);
            await AddBrandApi(formData, tokenReducer)
                .then((res) => {
                    console.log(res.data);
                    dispatch(productBrandDDindex(null));
                    setEditing({ flag: false, _id: "" });
                    setBrandTitle("");
                    getAllBrands();
                    alert("Brand Added Successfully");
                })
                .catch((err) => {
                    if (err.response && err.response.status === 401) {
                        logoutBtn();
                    }
                    console.log(err);
                    alert("Some error occure!");
                });
            dispatch(spinnerOverlayOffFn());
        }
    };
    const brandStatusFn = async (brandId, newStatus) => {
        if (window.confirm("Are you sure! to change the Status")) {
            await verifyBrandById(brandId, { brandStatus: newStatus }, tokenReducer)
                .then((res) => {
                    console.log(res.data);
                    getAllBrands();
                })
                .catch((err) => {
                    if (err.response && err.response.status === 401) {
                        logoutBtn();
                    }
                    console.log(err);
                });
        }
    };
    const handleChangeCategory = (idx) => {
        if (idx > 0) {
            dispatch(productBrandDDindex(idx - 1));
        } else {
            dispatch(productBrandDDindex(null));
        }
    };

    const updatedTable = () => {
        return filteredBrand.map((el, i) => (
            <tr key={el._id} className="border-b dark:border-neutral-500">
                <td className="whitespace-nowrap border-r px-2 py-2 dark:border-neutral-500">
                    <img src={el.brandLogo} alt="" height={80} width={80} />
                </td>
                <td className="whitespace-nowrap border-r px-6 py-2 dark:border-neutral-500">{el.brand_name}</td>
                {el.vendor_id.firmName && <td className="whitespace-nowrap border-r px-6 py-2 dark:border-neutral-500">{el.vendor_id.firmName}</td>}
                <td className="whitespace-nowrap border-r px-6 py-2 dark:border-neutral-500">
                    {userInfoReducer.userType && userInfoReducer.userType === "Seller" ? (
                        <>{el.brandStatus}</>
                    ) : (
                        <>
                            <select name="brandApprove" value={el.brandStatus} className="p-1 border outline-none" onChange={(e) => brandStatusFn(el._id, e.target.value)}>
                                <option value="Pending">Pending</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </>
                    )}
                </td>
            </tr>
        ));
    };

    const cancelHandler = () => {
        setEditing({ flag: false, _id: "" });
        setBrandTitle("");
    };

    useEffect(() => {
        getAllBrands();
        dispatch(productBrandDDindex(null));
        setEditing({ flag: false, _id: "" });
        setBrandTitle("");
    }, []);

    return (
        <div className=" bg-gray-50 dark:bg-gray-800">
            {userInfoReducer.userType && userInfoReducer.userType === "Seller" ? (
                <>
                    <div className="border-b pb-5">
                        <table className="min-w-full mb-5 bg-white dark:bg-gray-800 border text-start text-sm font-light dark:border-neutral-500">
                            <thead className="border-b font-medium dark:border-neutral-500">
                                <tr>
                                    <th scope="col" className="border-r px-2 py-3 dark:border-neutral-500 text-start">
                                        Logo
                                    </th>
                                    <th scope="col" className="px-6 py-3 border-r dark:border-neutral-500 text-start">
                                        Brand Name
                                    </th>

                                    <th scope="col" className="px-6 py-3 border-r dark:border-neutral-500 text-start">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>{brandData.length > 0 && updatedTable()}</tbody>
                        </table>
                    </div>
                    <div className="flex w-[80%]">
                        <div className="flex-1 border-s ps-10">
                            <div className="w-full">
                                <h1 className="text-gray-700 font-bold text-base dark:text-white mb-2">
                                    Brand title {isEditing.flag && <span className="bg-teal-500 text-white px-2">Edit Mode</span>}
                                </h1>
                                <input
                                    type="text"
                                    className="outline-none border p-2 w-full dark:bg-[#424242] dark:border-0"
                                    value={brandTitle}
                                    disabled={isEditing.flag ? "disabled" : ""}
                                    placeholder="Brand Title"
                                    onChange={(e) => setBrandTitle(e.target.value)}
                                />
                                <h1 className="text-gray-700 font-bold text-base dark:text-white mt-4">Logo</h1>
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

                                <div className="mt-2">
                                    <button className="bg-[#abd60e] rounded-md me-1 font-semibold px-3 py-2" onClick={() => uploadCategory()}>
                                        Upload
                                    </button>
                                    <button className="bg-[#ed0d0d] rounded-md ms-1 font-semibold px-3 py-2" onClick={() => cancelHandler()}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="inline-block min-w-full py-2">
                    <div className="max-w-[400px] mb-2">
                        <Input placeholder="Search brand" onChange={(e) => onSearchBrandHandler(e.target.value)} />
                    </div>
                    <div className="">
                        <table className="min-w-full bg-white dark:bg-gray-800 border text-start text-sm font-light dark:border-neutral-500">
                            <thead className="border-b font-medium dark:border-neutral-500">
                                <tr>
                                    <th scope="col" className="border-r px-2 py-3 dark:border-neutral-500 text-start">
                                        Logo
                                    </th>
                                    <th scope="col" className="px-6 py-3 border-r dark:border-neutral-500 text-start">
                                        Brand Name
                                    </th>

                                    <th scope="col" className="border-r px-6 py-3 dark:border-neutral-500 text-start">
                                        Firm name
                                    </th>
                                    <th scope="col" className="px-6 py-3 border-r dark:border-neutral-500 text-start">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>{brandData.length > 0 && updatedTable()}</tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Brand;
