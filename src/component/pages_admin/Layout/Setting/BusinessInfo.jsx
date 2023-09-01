import React, { useState } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import { addBusinessFilesApi, addBusinessGstApi, addBusinessInfoApi, getBusinessInfoApi, setDefaultGstApi } from "../../../../apis/adminApis";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { spinnerOverlayOffFn, spinnerOverlayOnFn } from "../../../../Redux/ReducerAction";
const BusinessInfo = ({ tokenReducer }) => {
    const toast = useToast();
    const dispatch = useDispatch();
    const [saveFlag, setSaveFlag] = useState({
        save1: false,
        save2: false,
        save3: false,
    });
    const [gstList, setGstList] = useState([]);
    const [defGst, setDefGst] = useState("");
    const [imageFile, setImageFIle] = useState({
        img1: "",
        img2: "",
        img3: "",
        img4: "",
    });
    const [images, setImages] = useState({
        bLogo: "",
        bInvLogo: "",
        bTC: "",
        bPolicy: "",
    });
    const [bInfo, setBinfo] = useState({
        bName: "",
        bNumber: "",
        bEmail: "",
    });
    const [gstInfo, setGstInfo] = useState({
        gstNo: "",
        stateCode: "",
        pickupAddress: "",
    });
    const [gstArr, setGstArr] = useState([]);
    const saveBInfo = async () => {
        if (bInfo.bEmail === "" || bInfo.bName === "" || bInfo.bNumber === "") {
            toast({
                title: "all fields are required",
                position: "top",
                status: "warning",
                isClosable: true,
            });
        } else {
             dispatch(spinnerOverlayOnFn());
            await addBusinessInfoApi(bInfo, tokenReducer)
                .then((res) => {
                    console.log(res.data);
                    getBusinessInfo();
                })
                .catch((err) => {
                    console.log(err);
                });
             dispatch(spinnerOverlayOffFn());
        }
        console.log(bInfo);
    };
    const cancelBInfo = () => {
        setBinfo({
            bName: "",
            bNumber: "",
            bEmail: "",
        });
    };

    const cancelBGstInfo = () => {
        setGstInfo({
            gstNo: "",
            stateCode: "",
            pickupAddress: "",
        });
    };
    const saveBGstInfo = async () => {
        if (gstArr.length === 0) {
            toast({
                title: "Add gst to stack",
                position: "top",
                status: "warning",
                isClosable: true,
            });
        } else {
            dispatch(spinnerOverlayOnFn());
            await addBusinessGstApi({ gsts: gstArr }, tokenReducer)
                .then((res) => {
                    console.log(res.data);
                    getBusinessInfo();
                })
                .catch((err) => {
                    console.log(err);
                });
            dispatch(spinnerOverlayOffFn());
        }
    };

    const saveBImage = async () => {
        let formData = new FormData();
        if (images.bLogo !== "") {
            formData.append("bLogo", images.bLogo);
        }
        if (images.bInvLogo !== "") {
            formData.append("bInvLogo", images.bInvLogo);
        }
        if (images.bPolicy !== "") {
            formData.append("bPolicy", images.bPolicy);
        }
        if (images.bTC !== "") {
            formData.append("bTC", images.bTC);
        }
        if (Array.from(formData.keys()).length === 0) {
            toast({
                title: "Atleast add one field",
                position: "top",
                status: "warning",
                isClosable: true,
            });
        } else {
            setSaveFlag((preStage) => {
                return { ...preStage, save3: true };
            });
            dispatch(spinnerOverlayOnFn());
            await addBusinessFilesApi(formData, tokenReducer)
                .then((res) => {
                    console.log(res.data);
                    cancelBImage();
                    getBusinessInfo();
                })
                .catch((err) => {
                    console.log(err);
                });
            dispatch(spinnerOverlayOffFn());
            setSaveFlag((preStage) => {
                return { ...preStage, save3: false };
            });
        }
    };
    const cancelBImage = () => {
        setImages({
            bLogo: "",
            bInvLogo: "",
            bTC: "",
            bPolicy: "",
        });
    };
    const addToStack = () => {
        if (gstInfo.gstNo !== "" && gstInfo.pickupAddress !== "" && gstInfo.stateCode !== "") {
            setGstArr((preState) => {
                return [...preState, gstInfo];
            });
            cancelBGstInfo();
        } else {
            toast({
                title: "all fields are required",
                position: "top",
                status: "warning",
                isClosable: true,
            });
        }
    };
    const removeGstArr = (idx) => {
        setGstArr((preState) => {
            let arr = [...preState];
            arr.splice(idx, 1);
            return arr;
        });
    };

    const getBusinessInfo = async () => {
        await getBusinessInfoApi(tokenReducer)
            .then((res) => {
                let obj = res.data.data;
                console.log(obj);
                setImageFIle({
                    img1: obj.business_Logo ? obj.business_Logo : "",
                    img2: obj.invoiceLogo ? obj.invoiceLogo : "",
                    img3: obj.iAgree ? obj.iAgree : "",
                    img4: obj.privacyPolicy ? obj.privacyPolicy : "",
                });
                setBinfo({
                    bName: obj.business_name ? obj.business_name : "",
                    bEmail: obj.contactEmail ? obj.contactEmail : "",
                    bNumber: obj.contactNo ? obj.contactNo : "",
                });
                setGstArr(obj.gsts);
                let arr = [];
                for (let gst of obj.gsts) {
                    arr.push(gst.gstNo);
                }
                setGstList((old) => arr);
                if (obj.defaultGST) {
                    setDefGst(obj.defaultGST.gstNo);
                } else {
                    setDefGst("");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const saveDefaultGst = async (value) => {
        if (value !== "" && window.confirm("press ok to save this change")) {
            dispatch(spinnerOverlayOnFn());
            await setDefaultGstApi({ gst: value }, tokenReducer)
                .then((res) => {
                    toast({
                        title: "Default GST",
                        description: res.data.message,
                        status:'success',
                        isClosable:true,
                        position:'top'
                    });
                    getBusinessInfo();
                })
                .catch((err) => {
                    console.log(err);
                });
            dispatch(spinnerOverlayOffFn());
        }
    };
    useEffect(() => {
        getBusinessInfo();
    }, []);

    return (
        <div>
            <h1 className="mb-2 font-bold">Business Information</h1>
            <div className="border dark:border-[#525355] rounded bg-white dark:bg-teal-950 p-3">
                <div className="grid grid-cols-4 gap-3">
                    <div>
                        <label htmlFor="bName" className="text-sm text-gray-700 dark:text-gray-400">
                            Business Name
                        </label>
                        <input
                            type="text"
                            id="bName"
                            value={bInfo.bName}
                            onChange={(e) =>
                                setBinfo((preState) => {
                                    return { ...preState, bName: e.target.value };
                                })
                            }
                            className="w-full mt-1 dark:bg-black dark:text-gray-200  text-teal-800 text-sm outline-orange-200 dark:outline-black outline-1 py-2 px-3 border dark:border-[#525355] rounded-md"
                        />
                    </div>
                    <div>
                        <label htmlFor="bNumber" className="text-sm text-gray-700 dark:text-gray-400">
                            Contact Number
                        </label>
                        <input
                            type="number"
                            id="bNumber"
                            value={bInfo.bNumber}
                            onChange={(e) =>
                                setBinfo((preState) => {
                                    return { ...preState, bNumber: e.target.value };
                                })
                            }
                            className="w-full mt-1 dark:bg-black dark:text-gray-200  text-teal-800 text-sm outline-orange-200 dark:outline-black outline-1 py-2 px-3 border dark:border-[#525355] rounded-md"
                        />
                    </div>
                    <div>
                        <label htmlFor="bEmail" className="text-sm text-gray-700 dark:text-gray-400">
                            Contact Email
                        </label>
                        <input
                            type="email"
                            id="bEmail"
                            value={bInfo.bEmail}
                            onChange={(e) =>
                                setBinfo((preState) => {
                                    return { ...preState, bEmail: e.target.value };
                                })
                            }
                            className="w-full mt-1 dark:bg-black dark:text-gray-200  text-teal-800 text-sm outline-orange-200 dark:outline-black outline-1 py-2 px-3 border dark:border-[#525355] rounded-md"
                        />
                    </div>
                </div>
                <div className="mt-4 flex items-center space-x-3">
                    <button
                        onClick={() => saveBInfo()}
                        disabled={saveFlag.save1}
                        className="bg-[#ff9f43] dark:bg-[#88613a] px-3 py-2 rounded flex items-center justify-between text-sm text-white font-semibold disabled:bg-[#ababab]">
                        Save
                        {saveFlag.save1 && <CgSpinner size={20} color="white" className="ms-2 animate-spin" />}
                    </button>
                    <button disabled={false} onClick={() => cancelBInfo()} className="bg-[#637381]  dark:bg-[#333b43] px-3 py-2 rounded text-sm text-white font-semibold">
                        Cancel
                    </button>
                </div>
            </div>
            <h1 className="my-2 mt-10 font-bold">GST Information</h1>
            <div className="border dark:border-[#525355] rounded bg-white dark:bg-teal-950 p-3">
                <div className="grid grid-cols-4 gap-3">
                    <div className="flex flex-col">
                        <label htmlFor="bGst" className="text-sm text-gray-700 dark:text-gray-400">
                            Business GST
                        </label>
                        <input
                            type="text"
                            id="bGst"
                            value={gstInfo.gstNo}
                            onChange={(e) =>
                                setGstInfo((preState) => {
                                    return { ...preState, gstNo: e.target.value };
                                })
                            }
                            className="w-full mt-1 dark:bg-black  dark:text-gray-200  text-teal-800 text-sm outline-orange-200 dark:outline-black outline-1 py-2 px-3 border dark:border-[#525355] rounded-md"
                        />
                        <label htmlFor="bGst" className="text-sm mt-1 text-gray-700 dark:text-gray-400">
                            State Code
                        </label>
                        <input
                            type="text"
                            id="bGst"
                            value={gstInfo.stateCode}
                            onChange={(e) =>
                                setGstInfo((preState) => {
                                    return { ...preState, stateCode: e.target.value };
                                })
                            }
                            className="w-full mt-1 dark:bg-black  dark:text-gray-200  text-teal-800 text-sm outline-orange-200 dark:outline-black outline-1 py-2 px-3 border dark:border-[#525355] rounded-md"
                        />
                        <label htmlFor="bGst" className="text-sm mt-1 text-gray-700 dark:text-gray-400">
                            Pickup Address
                        </label>
                        <textarea
                            type="text"
                            id="bGst"
                            value={gstInfo.pickupAddress}
                            onChange={(e) =>
                                setGstInfo((preState) => {
                                    return { ...preState, pickupAddress: e.target.value };
                                })
                            }
                            className="w-full mt-1 dark:bg-black  dark:text-gray-200  text-teal-800 text-sm outline-orange-200 dark:outline-black outline-1 py-2 px-3 border dark:border-[#525355] rounded-md"
                        />
                        <button onClick={() => addToStack()} className="bg-[#ff9f43] mt-2 dark:bg-[#88613a] px-3 py-2 rounded text-sm text-white font-semibold">
                            ADD TO STACK
                        </button>
                    </div>
                    <div className="col-span-3 flex flex-wrap">
                        {gstArr.length > 0 &&
                            gstArr.map((el, i) => (
                                <div key={el._id} className="flex flex-col p-1 border max-w-[300px] m-1">
                                    <div className="flex items-center p-1 justify-between border-b">
                                        <span>{el.gstNo}</span>
                                        <span className="border-s p-1 font-bold text-lg">{el.stateCode}</span>
                                    </div>
                                    <span className="pt-1 break-all">{el.pickupAddress}</span>
                                    <MdDelete size={20} className="mt-3" onClick={() => removeGstArr(i)} />
                                </div>
                            ))}
                    </div>
                </div>
                <div className="mt-4 flex items-center space-x-3">
                    <button
                        disabled={saveFlag.save2}
                        onClick={() => saveBGstInfo()}
                        className="bg-[#ff9f43] dark:bg-[#88613a] px-3 py-2 rounded text-sm text-white font-semibold flex items-center justify-between disabled:bg-[#ababab]">
                        Save
                        {saveFlag.save2 && <CgSpinner size={20} color="white" className="ms-2 animate-spin" />}
                    </button>
                    <button onClick={() => cancelBGstInfo()} className="bg-[#637381] dark:bg-[#333b43] px-3 py-2 rounded text-sm text-white font-semibold">
                        Cancel
                    </button>

                    <div className="flex items-center">
                        <span className="p-2 font-semibold text-white w-[100px] text-sm bg-orange-500 rounded-s-md border-e-0 border-orange-500 border outline-none">
                            Default GST
                        </span>
                        <select
                            id="statusorder"
                            value={defGst}
                            onChange={(e) => saveDefaultGst(e.target.value)}
                            className="bg-gray-50 col-span-3 border outline-none border-gray-300 text-gray-900 text-sm rounded-e-md focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="">Select Default GST NO</option>
                            {gstList.map((el, i) => (
                                <option key={`${i}_defaultgst`} value={el}>
                                    {el}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <h1 className="my-2 mt-10 font-bold">Images or PDF urls</h1>
            <div className="border dark:border-[#525355] rounded bg-white dark:bg-teal-950 p-3">
                <div className="grid grid-cols-4 gap-3">
                    <div>
                        <label htmlFor="bLogo" className="text-sm text-gray-700 dark:text-gray-400">
                            Business Logo
                        </label>
                        <input
                            type="file"
                            id="bLogo"
                            placeholder="url..."
                            accept="image/jpeg, image/png"
                            onChange={(e) =>
                                setImages((preState) => {
                                    return { ...preState, bLogo: e.target.files[0] };
                                })
                            }
                            className="w-full mt-1 p-1 dark:bg-black dark:text-gray-200  text-teal-800 text-sm outline-orange-200 dark:outline-black outline-1 border dark:border-[#525355] rounded-md"
                        />
                    </div>
                    <div>
                        <label htmlFor="bInvLogo" className="text-sm text-gray-700 dark:text-gray-400">
                            Invoice Logo
                        </label>
                        <input
                            type="file"
                            id="bInvLogo"
                            placeholder="url..."
                            accept="image/jpeg, image/png"
                            onChange={(e) =>
                                setImages((preState) => {
                                    return { ...preState, bInvLogo: e.target.files[0] };
                                })
                            }
                            className="w-full mt-1 p-1 dark:bg-black dark:text-gray-200  text-teal-800 text-sm outline-orange-200 dark:outline-black outline-1 border dark:border-[#525355] rounded-md"
                        />
                    </div>
                    <div>
                        <label htmlFor="bTandC" className="text-sm text-gray-700 dark:text-gray-400">
                            Terms And Conditions
                        </label>
                        <input
                            type="file"
                            id="bTandC"
                            placeholder="url..."
                            accept="application/pdf"
                            onChange={(e) =>
                                setImages((preState) => {
                                    return { ...preState, bTC: e.target.files[0] };
                                })
                            }
                            className="w-full mt-1 p-1 dark:bg-black dark:text-gray-200  text-teal-800 text-sm outline-orange-200 dark:outline-black outline-1 border dark:border-[#525355] rounded-md"
                        />
                    </div>
                    <div>
                        <label htmlFor="bPolicy" className="text-sm text-gray-700 dark:text-gray-400">
                            Privacy Policy
                        </label>
                        <input
                            type="file"
                            id="bPolicy"
                            placeholder="url..."
                            accept="application/pdf"
                            onChange={(e) =>
                                setImages((preState) => {
                                    return { ...preState, bPolicy: e.target.files[0] };
                                })
                            }
                            className="w-full mt-1 p-1 dark:bg-black dark:text-gray-200  text-teal-800 text-sm outline-orange-200 dark:outline-black outline-1 border dark:border-[#525355] rounded-md"
                        />
                    </div>
                    <div className="border rounded">{imageFile.img1 !== "" && <img src={imageFile.img1} alt="" />}</div>
                    <div className="border rounded">{imageFile.img2 !== "" && <img src={imageFile.img2} alt="" />}</div>
                    <div className="border rounded">
                        {imageFile.img3 !== "" && <embed className="h-full" name="plugin" src={`${imageFile.img3}#toolbar=0&scrollbar=0`} type="application/pdf" />}
                    </div>
                    <div className="border rounded">
                        {imageFile.img4 !== "" && <embed className="h-full" name="plugin" src={`${imageFile.img4}#toolbar=0&scrollbar=0`} type="application/pdf" />}
                    </div>
                </div>
                <div className="mt-4 flex items-center space-x-3">
                    <button
                        disabled={saveFlag.save3}
                        onClick={() => saveBImage()}
                        className="bg-[#ff9f43] dark:bg-[#88613a] px-3 py-2 flex items-center justify-between rounded text-sm text-white font-semibold disabled:bg-[#ababab]">
                        Save
                        {saveFlag.save3 && <CgSpinner size={20} color="white" className="ms-2 animate-spin" />}
                    </button>
                    <button onClick={() => cancelBImage()} className="bg-[#637381] dark:bg-[#333b43] px-3 py-2 rounded text-sm text-white font-semibold">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BusinessInfo;
