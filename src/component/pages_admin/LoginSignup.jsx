import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { BsPhone } from "react-icons/bs";
import { HiOutlineEyeOff, HiOutlineEye } from "react-icons/hi";
import { addVentorApi, adminLogin } from "../../apis/adminApis";
import { useDispatch } from "react-redux";
import { authToken, authTokenClear, spinnerOverlayOffFn, spinnerOverlayOnFn, userInfoAdd, userInfoClear } from "../../Redux/ReducerAction";
import { useNavigate } from "react-router-dom";
import { Button, Input, InputGroup, InputRightElement, Text, useToast } from "@chakra-ui/react";

let basicDetailInitial = {
    firmName: "",
    brandName: "",
    gstNo: "",
    representativeName: "",
    emailId: "",
    mobileNo: "",
    altMobileNo: "",
    pickupState: "",
    pickupCity: "",
    pickupPincode: "",
    invoiceAddress: "",
    pickupAddress: "",
    termsAndConditions: false,
};
let bankAccountInitial = {
    acHolderName: "",
    acNo: "",
    bankName: "",
    branch: "",
    ifsc: "",
    password: "",
};
let documentFileInitial = {
    brandLogo: "",
    brandRegDoc: "",
    gstRegDoc: "",
    cancelledCheque: "",
};
let loginField = {
    email: "",
    password: "",
};

const LoginSignup = ({ storeInfoReducer }) => {
    const toast = useToast();
    const [show, setShow] = React.useState(false);
    const [basicDetails, setBasicDetails] = useState(basicDetailInitial);
    const [bankDetail, setBankDetail] = useState(bankAccountInitial);
    const [documentFile, setDocumentFile] = useState(documentFileInitial);
    const dispatch = useDispatch();
    const history = useNavigate();

    const [isLoginPage, setIsLoginPage] = useState(false);
    const [isSignupLoading, setIsSignupLoading] = useState(false);
    const [passwordHide, setPasswordHide] = useState(true);
    const handleClick = () => setShow(!show);
    const [loginDetail, setLoginDetail] = useState(loginField);

    const submitFn = async () => {
        let flag = true;
        let formData = new FormData();
        for (let keys in basicDetails) {
            console.log(keys);
            if (keys === "firmName" || keys === "brandName" || keys === "representativeName" || keys === "mobileNo") {
                if (!basicDetails[keys]) {
                    flag = false;
                    console.log("No", keys);
                }
            }
            formData.append(keys, basicDetails[keys]);
        }
        for (let keys in bankDetail) {
            console.log(keys);
            formData.append(keys, bankDetail[keys]);
        }
        for (let keys in documentFile) {
            formData.append(keys, documentFile[keys]);
        }
        console.log(basicDetails);
        if (basicDetails.termsAndConditions && flag) {
            setIsSignupLoading(true);
            await addVentorApi(formData)
                .then((res) => {
                    console.log(res.data);
                    setBankDetail(bankAccountInitial);
                    setBasicDetails(basicDetailInitial);
                    setDocumentFile(documentFileInitial);
                    // history('/admin/login');
                    toast({
                        title: res.data.message,
                        description: "You have successfully registered with us, we will get back to you soon",
                        status: "success",
                        isClosable: true,
                        position: "top",
                    });
                })
                .catch((err) => {
                    console.log(err);
                    let message = err.response ? err.response.data.message : err.message;
                    toast({
                        title: "Something went wrong!",
                        description: message,
                        status: "error",
                        isClosable: true,
                        position: "top",
                    });
                });
            setIsSignupLoading(false);
        } else {
            if (!flag) {
                toast({
                    title: "Warning",
                    description: "Firm Name, Brand Name, Mobile Number and Representative Name are required",
                    status: "warning",
                    isClosable: true,
                    position: "top",
                });
            } else {
                toast({
                    title: "Warning",
                    description: "Please check Terms And conditions",
                    status: "warning",
                    isClosable: true,
                    position: "top",
                });
            }
        }
    };

    const loginFn = async () => {
        const EmailRegex = /^\w+([\.]?\w+)*@\w+([\.]?\w+)*(\.\w{2,5})+$/;
        const UserIDReges = /^[0-9]{8,14}$/;
        const PasswordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{10,20}$/;
        if (UserIDReges.test(loginDetail.email) || (EmailRegex.test(loginDetail.email) && PasswordRegex.test(loginDetail.password))) {
            dispatch(spinnerOverlayOnFn());
            await adminLogin(loginDetail)
                .then((res) => {
                    console.log(res.data);
                    let data = res.data.data;
                    dispatch(authToken(data.token));
                    sessionStorage.setItem("token", data.token);
                    sessionStorage.setItem("userInfo", JSON.stringify(data));
                    dispatch(userInfoAdd(data));
                    toast({
                        title: "Success",
                        description: res.data.message,
                        isClosable: true,
                        status: "success",
                        position: "top",
                    });
                    history("/admin/dashboard");
                })
                .catch((err) => {
                    let message = err.response ? err.response.data.message : err.message;
                    console.log(err);
                    toast({
                        title: "Error",
                        description: message,
                        isClosable: true,
                        status: "error",
                        position: "top",
                    });
                });
            dispatch(spinnerOverlayOffFn());
        } else {
            alert("Please provide valid Credentials");
        }
    };

    return (
        <div className=" bg-[url(https://images.unsplash.com/photo-1561955147-098dd3ef9ae5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1134&q=80)] h-screen bg-cover bg-bottom bg-no-repeat">
            <div className="bg-[#00000088] h-screen flex justify-center items-center">
                <div className="lg:w-[40%] lg:min-w-[40%] lg:max-w-[40%] p-2">
                    <div className="bg-teal-100 relative rounded-t-lg">
                        <h1 className="font-[Pacifico] text-center text-4xl text-blue-500">{!isLoginPage ? "Register" : "ShoesHouse Welcomes you!!"}</h1>
                        <p className="font-[Montserrat] text-teal-700 text-center mt-3 pb-4 text-xl font-semibold">{!isLoginPage ? "Seller Registration Form" : "Login for Dashboard"}</p>
                        <button className={`absolute py-1 px-2 rounded-sm bg-violet-500 text-white bottom-2 right-2`} onClick={() => setIsLoginPage(!isLoginPage)}>
                            {!isLoginPage ? "Login Page" : "SignUp Page"}
                        </button>
                    </div>
                    <div className="flex justify-between items-center bg-teal-200 px-3">
                        <div></div>
                        <div className="flex items-center text-lg font-bold">
                            <span className="text-teal-700">Contact Us:</span>
                            <BsPhone className="ms-2 me-1 text-blue-700" />
                            <a href={`tel:${storeInfoReducer.storeInfo.contactNo}`} className="text-black">
                                {storeInfoReducer.storeInfo.contactNo}
                            </a>
                        </div>
                    </div>
                    <div className="bg-white h-[calc(100vh_-_200px)] overflow-x-hidden  overflow-y-auto pt-2">
                        <div className={`flex w-[200%] transform ${isLoginPage && "-translate-x-1/2"} duration-300 `}>
                            <div className="px-3 w-full h-full overflow-y-auto">
                                <Tabs className="">
                                    <TabList className="flex text-base font-medium text-center w-full select-none">
                                        <Tab
                                            selectedClassName="bg-teal-100 dark:bg-teal-800 bg-teal-100 border-x-teal-100 border-t-teal-100 border-b-4 border-blue-500"
                                            className="cursor-pointer p-2 w-full  outline-none border"
                                        >
                                            Basic Details
                                        </Tab>
                                        <Tab
                                            selectedClassName="bg-teal-100 dark:bg-teal-800 bg-teal-100 border-x-teal-100 border-t-teal-100 border-b-4 border-blue-500"
                                            className="cursor-pointer p-2 w-full border border-x-0 outline-none"
                                        >
                                            Document Details
                                        </Tab>
                                        <Tab
                                            selectedClassName="bg-teal-100 dark:bg-teal-800 bg-teal-100 border-x-teal-100 border-t-teal-100 border-b-4 border-blue-500"
                                            className="cursor-pointer p-2 w-full border  outline-none"
                                        >
                                            Bank Account
                                        </Tab>
                                    </TabList>
                                    <TabPanel className="mt-5">
                                        <div className="mb-4">
                                            <h1 className="dark:text-white requiredField text-[#384047] font-semibold text-sm mb-1">Firm Name</h1>
                                            <input
                                                type="text"
                                                placeholder="Firm Name"
                                                value={basicDetails.firmName}
                                                onChange={(e) =>
                                                    setBasicDetails((preData) => {
                                                        return {
                                                            ...preData,
                                                            firmName: e.target.value,
                                                        };
                                                    })
                                                }
                                                className="outline-none border rounded-md p-1 w-full dark:bg-[#424242] dark:border-[#424242] "
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <h1 className="dark:text-white requiredField text-[#384047] font-semibold text-sm mb-1">Brand Name</h1>
                                                <input
                                                    type="text"
                                                    placeholder="Brand Name"
                                                    value={basicDetails.brandName}
                                                    onChange={(e) =>
                                                        setBasicDetails((preData) => {
                                                            return {
                                                                ...preData,
                                                                brandName: e.target.value,
                                                            };
                                                        })
                                                    }
                                                    className="outline-none border rounded-md p-1 w-full dark:bg-[#424242] dark:border-[#424242] "
                                                />
                                            </div>
                                            <div>
                                                <h1 className="dark:text-white text-[#384047] font-semibold text-sm mb-1">Brand Logo</h1>
                                                <div className="border rounded-md flex   w-full dark:bg-[#424242] dark:border-[#424242]">
                                                    <label htmlFor="brandLogo" className="outline-none flex justify-start items-center">
                                                        <input
                                                            type="file"
                                                            placeholder="cheque document"
                                                            id="brandLogo"
                                                            accept={"image/jpeg,image/jpg,image/png"}
                                                            onChange={(e) =>
                                                                setDocumentFile((preData) => {
                                                                    return {
                                                                        ...preData,
                                                                        brandLogo: e.target.files[0],
                                                                    };
                                                                })
                                                            }
                                                            className="hidden"
                                                        />
                                                        <p className="bg-green-200 rounded-s-md p-1">Choose File</p>
                                                        <p className="ms-2 ">{documentFile.brandLogo.name && documentFile.brandLogo.name.slice(0, 32)}</p>
                                                    </label>
                                                </div>
                                            </div>
                                            <div>
                                                <h1 className="dark:text-white requiredField text-[#384047] font-semibold text-sm mb-1">Representative Name</h1>
                                                <input
                                                    type="text"
                                                    placeholder="Representative Name"
                                                    value={basicDetails.representativeName}
                                                    onChange={(e) =>
                                                        setBasicDetails((preData) => {
                                                            return {
                                                                ...preData,
                                                                representativeName: e.target.value,
                                                            };
                                                        })
                                                    }
                                                    className="outline-none border  rounded-md p-1 w-full dark:bg-[#424242] dark:border-[#424242] "
                                                />
                                            </div>
                                            <div>
                                                <h1 className="dark:text-white  text-[#384047] font-semibold text-sm mb-1">Select Gender</h1>
                                                <select
                                                    name="gender"
                                                    id=""
                                                    value={basicDetails.gender}
                                                    className="outline-none border  rounded-md p-1 w-full dark:bg-[#424242] dark:border-[#424242] "
                                                    onChange={(e) =>
                                                        setBasicDetails((preData) => {
                                                            return {
                                                                ...preData,
                                                                gender: e.target.value,
                                                            };
                                                        })
                                                    }
                                                >
                                                    <option value="">Select Gender</option>
                                                    <option value="MALE">Male</option>
                                                    <option value="FEMALE">Female</option>
                                                    <option value="OTHER">Other</option>
                                                </select>
                                            </div>
                                            <div>
                                                <h1 className="dark:text-white  text-[#384047] font-semibold text-sm mb-1">GST Number</h1>
                                                <input
                                                    type="text"
                                                    placeholder="GST Number"
                                                    value={basicDetails.gstNo}
                                                    onChange={(e) =>
                                                        setBasicDetails((preData) => {
                                                            return {
                                                                ...preData,
                                                                gstNo: e.target.value,
                                                            };
                                                        })
                                                    }
                                                    className="outline-none border  rounded-md p-1 w-full dark:bg-[#424242] dark:border-[#424242] "
                                                />
                                            </div>

                                            <div>
                                                <h1 className="dark:text-white text-[#384047] font-semibold text-sm mb-1">Email Id</h1>
                                                <input
                                                    type="email"
                                                    placeholder="email id"
                                                    value={basicDetails.emailId}
                                                    onChange={(e) =>
                                                        setBasicDetails((preData) => {
                                                            return {
                                                                ...preData,
                                                                emailId: e.target.value,
                                                            };
                                                        })
                                                    }
                                                    className="outline-none border  rounded-md p-1 w-full dark:bg-[#424242] dark:border-[#424242] "
                                                />
                                            </div>
                                            <div>
                                                <h1 className="dark:text-white requiredField text-[#384047] font-semibold text-sm mb-1">Mobile Number</h1>
                                                <input
                                                    type="text"
                                                    placeholder="Mobile Number"
                                                    value={basicDetails.mobileNo}
                                                    onChange={(e) =>
                                                        setBasicDetails((preData) => {
                                                            return {
                                                                ...preData,
                                                                mobileNo: e.target.value,
                                                            };
                                                        })
                                                    }
                                                    className="outline-none border  rounded-md p-1 w-full dark:bg-[#424242] dark:border-[#424242] "
                                                />
                                            </div>
                                            <div>
                                                <h1 className="dark:text-white text-[#384047] font-semibold text-sm mb-1">Alternative Phone No</h1>
                                                <input
                                                    type="text"
                                                    placeholder="alternative phone no"
                                                    value={basicDetails.altMobileNo}
                                                    onChange={(e) =>
                                                        setBasicDetails((preData) => {
                                                            return {
                                                                ...preData,
                                                                altMobileNo: e.target.value,
                                                            };
                                                        })
                                                    }
                                                    className="outline-none border rounded-md p-1 w-full dark:bg-[#424242] dark:border-[#424242] "
                                                />
                                            </div>
                                            <div>
                                                <h1 className="dark:text-white  text-[#384047] font-semibold text-sm mb-1">State</h1>
                                                <input
                                                    type="text"
                                                    placeholder="State"
                                                    value={basicDetails.pickupState}
                                                    onChange={(e) =>
                                                        setBasicDetails((preData) => {
                                                            return {
                                                                ...preData,
                                                                pickupState: e.target.value,
                                                            };
                                                        })
                                                    }
                                                    className="outline-none border  rounded-md p-1 w-full dark:bg-[#424242] dark:border-[#424242] "
                                                />
                                            </div>
                                            <div>
                                                <h1 className="dark:text-white  text-[#384047] font-semibold text-sm mb-1">City</h1>
                                                <input
                                                    type="text"
                                                    placeholder="City"
                                                    value={basicDetails.pickupCity}
                                                    onChange={(e) =>
                                                        setBasicDetails((preData) => {
                                                            return {
                                                                ...preData,
                                                                pickupCity: e.target.value,
                                                            };
                                                        })
                                                    }
                                                    className="outline-none border  rounded-md p-1 w-full dark:bg-[#424242] dark:border-[#424242] "
                                                />
                                            </div>
                                            <div>
                                                <h1 className="dark:text-white  text-[#384047] font-semibold text-sm mb-1">Pincode</h1>
                                                <input
                                                    type="text"
                                                    placeholder="Pincode"
                                                    value={basicDetails.pickupPincode}
                                                    onChange={(e) =>
                                                        setBasicDetails((preData) => {
                                                            return {
                                                                ...preData,
                                                                pickupPincode: e.target.value,
                                                            };
                                                        })
                                                    }
                                                    className="outline-none border  rounded-md p-1 w-full dark:bg-[#424242] dark:border-[#424242] "
                                                />
                                            </div>
                                            <div>
                                                <h1 className="dark:text-white text-[#384047] font-semibold text-sm mb-1">Invoice Address</h1>
                                                <input
                                                    type="text"
                                                    placeholder="Invoice Address"
                                                    value={basicDetails.invoiceAddress}
                                                    onChange={(e) =>
                                                        setBasicDetails((preData) => {
                                                            return {
                                                                ...preData,
                                                                invoiceAddress: e.target.value,
                                                            };
                                                        })
                                                    }
                                                    className="outline-none border rounded-md p-1 w-full dark:bg-[#424242] dark:border-[#424242] "
                                                />
                                            </div>
                                            <div>
                                                <h1 className="dark:text-white text-[#384047] font-semibold text-sm mb-1">Address</h1>
                                                <input
                                                    type="text"
                                                    placeholder="Address"
                                                    value={basicDetails.pickupAddress}
                                                    onChange={(e) =>
                                                        setBasicDetails((preData) => {
                                                            return {
                                                                ...preData,
                                                                pickupAddress: e.target.value,
                                                            };
                                                        })
                                                    }
                                                    className="outline-none border rounded-md p-1 w-full dark:bg-[#424242] dark:border-[#424242] "
                                                />
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel className="mt-5">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <h1 className="dark:text-white  text-[#384047] font-semibold text-sm mb-1">Brand Registration Document</h1>

                                                <div className="border rounded-md flex   w-full dark:bg-[#424242] dark:border-[#424242]">
                                                    <label htmlFor="brandDoc" className="outline-none flex justify-start items-center">
                                                        <input
                                                            type="file"
                                                            id="brandDoc"
                                                            accept={"image/jpeg,image/jpg,image/png,application/pdf"}
                                                            onChange={(e) =>
                                                                setDocumentFile((preData) => {
                                                                    return {
                                                                        ...preData,
                                                                        brandRegDoc: e.target.files[0],
                                                                    };
                                                                })
                                                            }
                                                            className="hidden"
                                                        />
                                                        <p className="bg-green-200 rounded-s-md p-1">Choose File</p>
                                                        <p className="ms-2 ">{documentFile.brandRegDoc.name && documentFile.brandRegDoc.name.slice(0, 32)}</p>
                                                    </label>
                                                </div>
                                            </div>
                                            <div>
                                                <h1 className="dark:text-white  text-[#384047] font-semibold text-sm mb-1">GST Registration Document</h1>
                                                <div className="border rounded-md flex   w-full dark:bg-[#424242] dark:border-[#424242]">
                                                    <label htmlFor="gstRegDoc" className="outline-none flex justify-start items-center">
                                                        <input
                                                            type="file"
                                                            id="gstRegDoc"
                                                            accept={"image/jpeg,image/jpg,image/png,application/pdf"}
                                                            onChange={(e) =>
                                                                setDocumentFile((preData) => {
                                                                    return {
                                                                        ...preData,
                                                                        gstRegDoc: e.target.files[0],
                                                                    };
                                                                })
                                                            }
                                                            className="hidden"
                                                        />
                                                        <p className="bg-green-200 rounded-s-md p-1">Choose File</p>
                                                        <p className="ms-2 ">{documentFile.gstRegDoc.name && documentFile.gstRegDoc.name.slice(0, 32)}</p>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel className="mt-5">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <h1 className="dark:text-white  text-[#384047] font-semibold text-sm mb-1">Ac Holder Name</h1>
                                                <input
                                                    type="text"
                                                    placeholder="Ac Holder Name"
                                                    value={bankDetail.acHolderName}
                                                    onChange={(e) =>
                                                        setBankDetail((preData) => {
                                                            return {
                                                                ...preData,
                                                                acHolderName: e.target.value,
                                                            };
                                                        })
                                                    }
                                                    className="outline-none border rounded-md p-1 w-full dark:bg-[#424242] dark:border-[#424242] "
                                                />
                                            </div>
                                            <div>
                                                <h1 className="dark:text-white  text-[#384047] font-semibold text-sm mb-1">Account Number</h1>
                                                <input
                                                    type="text"
                                                    placeholder="Account number"
                                                    value={bankDetail.acNo}
                                                    onChange={(e) =>
                                                        setBankDetail((preData) => {
                                                            return {
                                                                ...preData,
                                                                acNo: e.target.value,
                                                            };
                                                        })
                                                    }
                                                    className="outline-none border rounded-md p-1 w-full dark:bg-[#424242] dark:border-[#424242] "
                                                />
                                            </div>
                                            <div>
                                                <h1 className="dark:text-white  text-[#384047] font-semibold text-sm mb-1">Bank Name</h1>
                                                <input
                                                    type="text"
                                                    placeholder="Bank Name"
                                                    value={bankDetail.bankName}
                                                    onChange={(e) =>
                                                        setBankDetail((preData) => {
                                                            return {
                                                                ...preData,
                                                                bankName: e.target.value,
                                                            };
                                                        })
                                                    }
                                                    className="outline-none border rounded-md p-1 w-full dark:bg-[#424242] dark:border-[#424242] "
                                                />
                                            </div>
                                            <div>
                                                <h1 className="dark:text-white text-[#384047] font-semibold text-sm mb-1">Branch</h1>
                                                <input
                                                    type="text"
                                                    placeholder="Branch"
                                                    value={bankDetail.branch}
                                                    onChange={(e) =>
                                                        setBankDetail((preData) => {
                                                            return {
                                                                ...preData,
                                                                branch: e.target.value,
                                                            };
                                                        })
                                                    }
                                                    className="outline-none border rounded-md p-1 w-full dark:bg-[#424242] dark:border-[#424242] "
                                                />
                                            </div>
                                            <div>
                                                <h1 className="dark:text-white  text-[#384047] font-semibold text-sm mb-1">IFSC</h1>
                                                <input
                                                    type="text"
                                                    placeholder="IFSC code"
                                                    value={bankDetail.ifsc}
                                                    onChange={(e) =>
                                                        setBankDetail((preData) => {
                                                            return {
                                                                ...preData,
                                                                ifsc: e.target.value,
                                                            };
                                                        })
                                                    }
                                                    className="outline-none border rounded-md p-1 w-full dark:bg-[#424242] dark:border-[#424242] "
                                                />
                                            </div>
                                            <div>
                                                <h1 className="dark:text-white text-[#384047] font-semibold text-sm mb-1">Cancelled Cheque</h1>
                                                <div className="border rounded-md flex   w-full dark:bg-[#424242] dark:border-[#424242]">
                                                    <label htmlFor="cancelledCheque" className="outline-none flex justify-start items-center">
                                                        <input
                                                            type="file"
                                                            placeholder="cheque document"
                                                            id="cancelledCheque"
                                                            accept={"image/jpeg,image/jpg,image/png,application/pdf"}
                                                            onChange={(e) =>
                                                                setDocumentFile((preData) => {
                                                                    return {
                                                                        ...preData,
                                                                        cancelledCheque: e.target.files[0],
                                                                    };
                                                                })
                                                            }
                                                            className="hidden"
                                                        />
                                                        <p className="bg-green-200 rounded-s-md p-1">Choose File</p>
                                                        <p className="ms-2 ">{documentFile.cancelledCheque.name && documentFile.cancelledCheque.name.slice(0, 32)}</p>
                                                    </label>
                                                </div>
                                            </div>
                                            <div>
                                                <h1 className="dark:text-white  text-[#384047] font-semibold text-sm mb-1">Set Password</h1>
                                                <input
                                                    type="text"
                                                    placeholder="Set Login Password"
                                                    value={bankDetail.password}
                                                    onChange={(e) =>
                                                        setBankDetail((preData) => {
                                                            return {
                                                                ...preData,
                                                                password: e.target.value,
                                                            };
                                                        })
                                                    }
                                                    className="outline-none border rounded-md p-1 w-full dark:bg-[#424242] dark:border-[#424242] "
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center mt-4 mb-2">
                                            <input
                                                type="checkbox"
                                                value={basicDetails.termsAndConditions}
                                                defaultChecked={basicDetails.termsAndConditions}
                                                onChange={(e) =>
                                                    setBasicDetails((preData) => {
                                                        return {
                                                            ...preData,
                                                            termsAndConditions: e.target.checked,
                                                        };
                                                    })
                                                }
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <span className="ms-3">
                                                I have read and agreed to the{" "}
                                                <a href="www.example.com/termAndCondition" className="text-blue-500">
                                                    Terms And Conditions
                                                </a>
                                            </span>
                                        </div>
                                        <Button isLoading={isSignupLoading} loadingText="Please wait" className="px-4 py-2 border rounded-md mb-4" onClick={() => submitFn()}>
                                            Submit
                                        </Button>
                                    </TabPanel>
                                </Tabs>
                            </div>

                            <div className="p-3 w-full">
                                <div className={`w-full`}>
                                    <div className={`grid grid-cols-2 gap-2`}>
                                        <div>
                                            <h1 className="dark:text-white text-[#384047] font-semibold text-sm mb-1">Email ID or USER ID</h1>
                                            <input
                                                type="text"
                                                placeholder="Email/UserID"
                                                value={loginDetail.email}
                                                onChange={(e) =>
                                                    setLoginDetail((preData) => {
                                                        return {
                                                            ...preData,
                                                            email: e.target.value,
                                                        };
                                                    })
                                                }
                                                className="outline-none border  rounded-md p-2 w-full dark:bg-[#424242] dark:border-[#424242] "
                                            />
                                        </div>
                                        <div>
                                            <h1 className="dark:text-white text-[#384047] font-semibold text-sm mb-1">Password</h1>
                                            <div className={`relative`}>
                                                <input
                                                    type={passwordHide ? "password" : "text"}
                                                    placeholder="Password"
                                                    value={loginDetail.password}
                                                    onChange={(e) =>
                                                        setLoginDetail((preData) => {
                                                            return {
                                                                ...preData,
                                                                password: e.target.value,
                                                            };
                                                        })
                                                    }
                                                    className="outline-none border  rounded-md p-2 w-full dark:bg-[#424242] dark:border-[#424242] "
                                                />
                                                {passwordHide ? (
                                                    <HiOutlineEye className={`absolute top-0 right-2 bottom-0 my-auto`} size={20} onClick={() => setPasswordHide(!passwordHide)} />
                                                ) : (
                                                    <HiOutlineEyeOff size={20} className={`absolute top-0 right-2 bottom-0 my-auto`} onClick={() => setPasswordHide(!passwordHide)} />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <button className="px-12 py-2 mt-3 border text-white border-green-700 rounded-md mb-4 bg-green-700" onClick={() => loginFn()}>
                                            Login
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" bg-blue-500 rounded-b-md text-white text-end px-2 font-semibold">
                        <a href={`mailto:${storeInfoReducer.storeInfo.contactEmail}`} target="_blank">
                            {storeInfoReducer.storeInfo.contactEmail}
                        </a>
                    </div>
                </div>
                {/* <div className="bg-white w-96 overflow-hidden">
                    <div className={`${isSignupPage && "-translate-x-96"} transition-all duration-300 w-[48rem] flex justify-center`}>
                        <div className="w-full p-6">
                            <Text fontWeight={700} fontSize={"2xl"}>
                                Login
                            </Text>
                            <Text fontSize={12}>welcome back, Seller!</Text>
                            <div className="mt-3">
                                <label className="text-xs text-gray-600 font-semibold" htmlFor="username">
                                    Mobile Number/Email
                                </label>
                                <Input borderRadius={0} id="username" placeholder="Enter your mobile number or email" />
                            </div>
                            <div className="mt-2">
                                <label className="text-xs text-gray-600 font-semibold" htmlFor="password">
                                    Password
                                </label>
                                <InputGroup size="md">
                                    <Input borderRadius={0} id="password" pr="4.5rem" type={show ? "text" : "password"} placeholder="Enter password" />
                                    <InputRightElement width="4.5rem">
                                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                                            {show ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </div>
                            <div className="flex justify-end">
                                <Button fontSize={14} variant={"unstyled"}>
                                    Reset Password?
                                </Button>
                            </div>
                            <Button colorScheme="blue" borderRadius={0} width={"full"}>
                                Login
                            </Button>
                            <div className="flex justify-center mt-5">
                                <Button onClick={() => setIsSignupPage(true)} fontSize={14} textColor={"red.700"} variant={"link"}>
                                    Become FactorEz seller | Signup Now
                                </Button>
                            </div>
                        </div>
                        <div className="w-full p-6">
                            <Text fontWeight={700} fontSize={"2xl"}>
                                Sign up
                            </Text>
                            <Text fontSize={12}>Become a seller</Text>
                            <div className="mt-3">
                                <label className="text-xs text-gray-600 font-semibold" htmlFor="username">
                                    Mobile Number/Email
                                </label>
                                <Input borderRadius={0} id="username" placeholder="Enter your mobile number or email" />
                            </div>
                            <div className="mt-2">
                                <label className="text-xs text-gray-600 font-semibold" htmlFor="password">
                                    Password
                                </label>
                                <InputGroup size="md">
                                    <Input borderRadius={0} id="password" pr="4.5rem" type={show ? "text" : "password"} placeholder="Enter password" />
                                    <InputRightElement width="4.5rem">
                                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                                            {show ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </div>
                            <div className="flex justify-end">
                                <Button fontSize={14} variant={"unstyled"}>
                                    Reset Password?
                                </Button>
                            </div>
                            <Button colorScheme="blue" borderRadius={0} width={"full"}>
                                Login
                            </Button>
                            <div className="flex justify-center mt-5">
                                <Button onClick={() => setIsSignupPage(false)} fontSize={14} textColor={"red.700"} variant={"link"}>
                                    Become FactorEz seller | Signup Now
                                </Button>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default LoginSignup;
