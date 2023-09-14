import React from "react";
import { Button, Heading, Input, useToast } from "@chakra-ui/react";
import { addVendorByAdminApi } from "../../../../apis/adminApis";

let initialValue = {
    firmName: "",
    brandName: "",
    gstNo: "",
    representativeName: "",
    emailId: "",
    mobileNo: "",
    pickupState: "",
    pickupCity: "",
    pickupPincode: "",
    invoiceAddress: "",
    pickupAddress: "",
    brandLogo: "",
    brandRegDoc: "",
    gstRegDoc: "",
    cancelledCheque: "",
    acHolderName: "",
    acNo: "",
    bankName: "",
    branch: "",
    ifsc: "",
    password: "",
};

const AddVendor = ({ userInfoReducer, tokenReducer }) => {
    const toast = useToast();
    const [addVendorData, setAddVendorData] = React.useState(initialValue);
    const [isLoading, setIsLoading] = React.useState(false);
    const submitFn = async () => {
        if (
            addVendorData.firmName &&
            addVendorData.brandName &&
            addVendorData.gstNo &&
            addVendorData.representativeName &&
            addVendorData.emailId &&
            addVendorData.mobileNo &&
            addVendorData.pickupState &&
            addVendorData.pickupCity &&
            addVendorData.pickupPincode &&
            addVendorData.invoiceAddress &&
            addVendorData.pickupAddress &&
            addVendorData.brandLogo &&
            addVendorData.brandRegDoc &&
            addVendorData.cancelledCheque &&
            addVendorData.gstRegDoc &&
            addVendorData.acHolderName &&
            addVendorData.acNo &&
            addVendorData.bankName &&
            addVendorData.branch &&
            addVendorData.ifsc &&
            addVendorData.password
        ) {
            const EmailRegex = /^\w+([\.]?\w+)*@\w+([\.]?\w+)*(\.\w{2,5})+$/;
            const MobileRegex = /^[6-9]\d{9}$/;
            const PasswordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{10,20}$/;
            if (!EmailRegex.test(addVendorData.emailId)) {
                toast({
                    position: "top",
                    status: "warning",
                    title: "Invalid Email ID",
                    isClosable: true,
                });
            } else if (!MobileRegex.test(addVendorData.mobileNo)) {
                toast({
                    position: "top",
                    status: "warning",
                    title: "Invalid Mobile number",
                    isClosable: true,
                });
            } else if (!PasswordRegex.test(addVendorData.password)) {
                toast({
                    position: "top",
                    status: "warning",
                    title: "Weak password",
                    isClosable: true,
                });
            } else {
                let formData = new FormData();
                for (let keys in addVendorData) {
                    // if (keys !== "brandLogo" && keys !== "brandRegDoc" && keys !== "cancelledCheque" && keys !== "gstRegDoc") {
                    // }else{
                    //     // formData.
                    // }
                    formData.append(keys, addVendorData[keys]);
                }
                setIsLoading(true);

                await addVendorByAdminApi(formData, tokenReducer)
                    .then((res) => {
                        console.log(res.data);
                        toast({
                            position: "top",
                            status: "success",
                            title: "Success",
                            description: res.data.message,
                            isClosable: true,
                        });
                        setAddVendorData(initialValue);
                    })
                    .catch((err) => {
                        console.log(err);
                        let msg = err.response ? err.response.data.message : err.message;
                        toast({
                            position: "top",
                            status: "error",
                            title: "Error",
                            description: msg,
                            isClosable: true,
                        });
                    });
                setIsLoading(false);
            }
        } else {
            toast({
                position: "top",
                status: "warning",
                title: "All fields are required",
                isClosable: true,
            });
        }
    };

    return (
        <div>
            <Heading size={"lg"}>Add vendor</Heading>
            <div>
                <div className="grid grid-cols-3 gap-2">
                    <div>
                        <label className="text-teal-700 font-semibold text-xs" htmlFor="firmName">
                            Firm Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                            value={addVendorData.firmName}
                            onChange={(e) =>
                                setAddVendorData((old) => {
                                    return { ...old, firmName: e.target.value };
                                })
                            }
                            id="firmName"
                            placeholder="Firm Name"
                        />
                    </div>
                    <div>
                        <label className="text-teal-700 font-semibold text-xs" htmlFor="brandName">
                            Brand Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                            value={addVendorData.brandName}
                            onChange={(e) =>
                                setAddVendorData((old) => {
                                    return { ...old, brandName: e.target.value };
                                })
                            }
                            id="brandName"
                            placeholder="Brand Name"
                        />
                    </div>
                    <div>
                        <label className="text-teal-700 font-semibold text-xs" htmlFor="representativeName">
                            Representative Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                            value={addVendorData.representativeName}
                            onChange={(e) =>
                                setAddVendorData((old) => {
                                    return { ...old, representativeName: e.target.value };
                                })
                            }
                            id="representativeName"
                            placeholder="Representative Name"
                        />
                    </div>
                    <div>
                        <label className="text-teal-700 font-semibold text-xs" htmlFor="gstNumber">
                            GST Number <span className="text-red-500">*</span>
                        </label>
                        <Input
                            value={addVendorData.gstNo}
                            onChange={(e) =>
                                setAddVendorData((old) => {
                                    return { ...old, gstNo: e.target.value };
                                })
                            }
                            id="gstNumber"
                            placeholder="GST Number"
                        />
                    </div>
                    <div>
                        <label className="text-teal-700 font-semibold text-xs" htmlFor="emailId">
                            Email Id <span className="text-red-500">*</span>
                        </label>
                        <Input
                            value={addVendorData.emailId}
                            onChange={(e) =>
                                setAddVendorData((old) => {
                                    return { ...old, emailId: e.target.value };
                                })
                            }
                            id="emailId"
                            placeholder="Email Id"
                        />
                    </div>
                    <div>
                        <label className="text-teal-700 font-semibold text-xs" htmlFor="mobileNumber">
                            Mobile Number <span className="text-red-500">*</span>
                        </label>
                        <Input
                            value={addVendorData.mobileNo}
                            onChange={(e) =>
                                setAddVendorData((old) => {
                                    return { ...old, mobileNo: e.target.value };
                                })
                            }
                            type="number"
                            id="mobileNumber"
                            placeholder="Mobile Number"
                        />
                    </div>
                    <div>
                        <label className="text-teal-700 font-semibold text-xs" htmlFor="pincode">
                            Pickup Pincode <span className="text-red-500">*</span>
                        </label>
                        <Input
                            value={addVendorData.pickupPincode}
                            onChange={(e) =>
                                setAddVendorData((old) => {
                                    return { ...old, pickupPincode: e.target.value };
                                })
                            }
                            type="number"
                            id="pincode"
                            placeholder="Pickup Pincode"
                        />
                    </div>
                    <div>
                        <label className="text-teal-700 font-semibold text-xs" htmlFor="pickupCity">
                            Pickup City <span className="text-red-500">*</span>
                        </label>
                        <Input
                            value={addVendorData.pickupCity}
                            onChange={(e) =>
                                setAddVendorData((old) => {
                                    return { ...old, pickupCity: e.target.value };
                                })
                            }
                            id="pickupCity"
                            placeholder="Pickup City"
                        />
                    </div>
                    <div>
                        <label className="text-teal-700 font-semibold text-xs" htmlFor="pickupState">
                            Pickup State <span className="text-red-500">*</span>
                        </label>
                        <Input
                            value={addVendorData.pickupState}
                            onChange={(e) =>
                                setAddVendorData((old) => {
                                    return { ...old, pickupState: e.target.value };
                                })
                            }
                            id="pickupState"
                            placeholder="Pickup State"
                        />
                    </div>
                    <div>
                        <label className="text-teal-700 font-semibold text-xs" htmlFor="pickupAddress">
                            Pickup Address <span className="text-red-500">*</span>
                        </label>
                        <Input
                            value={addVendorData.pickupAddress}
                            onChange={(e) =>
                                setAddVendorData((old) => {
                                    return { ...old, pickupAddress: e.target.value };
                                })
                            }
                            id="pickupAddress"
                            placeholder="Pickup Address"
                        />
                    </div>
                    <div>
                        <label className="text-teal-700 font-semibold text-xs" htmlFor="invoiceAddress">
                            Invoice Address <span className="text-red-500">*</span>
                        </label>
                        <Input
                            value={addVendorData.invoiceAddress}
                            onChange={(e) =>
                                setAddVendorData((old) => {
                                    return { ...old, invoiceAddress: e.target.value };
                                })
                            }
                            id="invoiceAddress"
                            placeholder="Invoice Address"
                        />
                    </div>
                    <div>
                        <label className="text-teal-700 font-semibold text-xs" htmlFor="accountHolderName">
                            Ac Holder Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                            value={addVendorData.acHolderName}
                            onChange={(e) =>
                                setAddVendorData((old) => {
                                    return { ...old, acHolderName: e.target.value };
                                })
                            }
                            id="accountHolderName"
                            placeholder="Ac Holder Name"
                        />
                    </div>
                    <div>
                        <label className="text-teal-700 font-semibold text-xs" htmlFor="accountNumber">
                            Account Number <span className="text-red-500">*</span>
                        </label>
                        <Input
                            value={addVendorData.acNo}
                            onChange={(e) =>
                                setAddVendorData((old) => {
                                    return { ...old, acNo: e.target.value };
                                })
                            }
                            type="number"
                            id="accountNumber"
                            placeholder="Account Number"
                        />
                    </div>
                    <div>
                        <label className="text-teal-700 font-semibold text-xs" htmlFor="bankName">
                            Bank Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                            value={addVendorData.bankName}
                            onChange={(e) =>
                                setAddVendorData((old) => {
                                    return { ...old, bankName: e.target.value };
                                })
                            }
                            id="bankName"
                            placeholder="Bank Name"
                        />
                    </div>
                    <div>
                        <label className="text-teal-700 font-semibold text-xs" htmlFor="branch">
                            Branch <span className="text-red-500">*</span>
                        </label>
                        <Input
                            value={addVendorData.branch}
                            onChange={(e) =>
                                setAddVendorData((old) => {
                                    return { ...old, branch: e.target.value };
                                })
                            }
                            id="branch"
                            placeholder="Branch"
                        />
                    </div>
                    <div>
                        <label className="text-teal-700 font-semibold text-xs" htmlFor="ifsc">
                            IFSC <span className="text-red-500">*</span>
                        </label>
                        <Input
                            value={addVendorData.ifsc}
                            onChange={(e) =>
                                setAddVendorData((old) => {
                                    return { ...old, ifsc: e.target.value };
                                })
                            }
                            id="ifsc"
                            placeholder="IFSC"
                        />
                    </div>
                    <div>
                        <label className="text-teal-700 font-semibold text-xs" htmlFor="cancelCheque">
                            Cancelled Cheque <span className="text-red-500">*</span>
                        </label>
                        <Input
                            onChange={(e) =>
                                setAddVendorData((old) => {
                                    return { ...old, cancelledCheque: e.target.files[0] };
                                })
                            }
                            id="cancelCheque"
                            accept={"image/jpeg,image/jpg,image/png,application/pdf"}
                            placeholder="Cancelled Cheque"
                            type="file"
                        />
                    </div>
                    <div>
                        <label className="text-teal-700 font-semibold text-xs" htmlFor="logo">
                            Brand Logo <span className="text-red-500">*</span>
                        </label>
                        <Input
                            onChange={(e) =>
                                setAddVendorData((old) => {
                                    return { ...old, brandLogo: e.target.files[0] };
                                })
                            }
                            id="logo"
                            accept={"image/jpeg,image/jpg,image/png,application/pdf"}
                            placeholder="Brand Logo"
                            type="file"
                        />
                    </div>
                    <div>
                        <label className="text-teal-700 font-semibold text-xs" htmlFor="brandRegDoc">
                            Brand Registration Document <span className="text-red-500">*</span>
                        </label>
                        <Input
                            onChange={(e) =>
                                setAddVendorData((old) => {
                                    return { ...old, brandRegDoc: e.target.files[0] };
                                })
                            }
                            id="brandRegDoc"
                            accept={"image/jpeg,image/jpg,image/png,application/pdf"}
                            placeholder="Brand Registration Document"
                            type="file"
                        />
                    </div>
                    <div>
                        <label className="text-teal-700 font-semibold text-xs" htmlFor="gstRegDoc">
                            GST Registration Document <span className="text-red-500">*</span>
                        </label>
                        <Input
                            onChange={(e) =>
                                setAddVendorData((old) => {
                                    return { ...old, gstRegDoc: e.target.files[0] };
                                })
                            }
                            id="gstRegDoc"
                            accept={"image/jpeg,image/jpg,image/png,application/pdf"}
                            placeholder="GST Registration Document"
                            type="file"
                        />
                    </div>
                    <div>
                        <label className="text-teal-700 font-semibold text-xs" htmlFor="password">
                            Set a login password <span className="text-red-500">*</span>
                        </label>
                        <Input
                            value={addVendorData.password}
                            onChange={(e) =>
                                setAddVendorData((old) => {
                                    return { ...old, password: e.target.value };
                                })
                            }
                            id="password"
                            placeholder="password"
                        />
                    </div>
                </div>
            </div>
            <p className="mt-5 text-red-500 italic text-xs">All fields are required</p>
            <hr />
            <div className="mt-4 space-x-3">
                <Button isLoading={isLoading} loadingText="Please wait" onClick={(e) => submitFn()} colorScheme="yellow">
                    Submit
                </Button>
                <Button onClick={() => setAddVendorData(initialValue)} colorScheme="red">
                    Cancel
                </Button>
            </div>
        </div>
    );
};

export default AddVendor;
