import React from "react";
import img from "../../assets/WELCOME.png";
import { Button, Input, InputGroup, InputLeftElement, InputRightElement, Select, Textarea, useToast } from "@chakra-ui/react";
import { PiEyeClosedDuotone, PiEyeDuotone } from "react-icons/pi";
import { IoCall } from "react-icons/io5";
import { StateAndCode } from "../../utils/stateNameAndCode";
import { useNavigate } from "react-router-dom";
import { signupCustomerApi } from "../../apis/clientApis";
const SignUpPage = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const [show, setShow] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [signUpData, setSignUpData] = React.useState({
        name: "",
        gender: "",
        DOB: "",
        email: "",
        password: "",
        alternate_phone: "",
        state: "",
        city: "",
        gstNo: "",
        pincode: "",
        address: "",
    });

    const saveUserInformation = async () => {
        console.log(signUpData);
        if (signUpData.name && signUpData.DOB && signUpData.password && signUpData.state && signUpData.address) {
            const EmailRegex = /^\w+([.]?\w+)*@\w+([.]?\w+)*(\.\w{2,5})+$/;
            const MobileRegex = /^[6-9]\d{9}$/;
            if (signUpData.email && !EmailRegex.test(signUpData.email)) {
                toast({
                    status: "warning",
                    title: "Invalid EmailID",
                    isClosable: true,
                    position: "top",
                });
            } else if (signUpData.password.length < 8 || signUpData.password.length > 18) {
                toast({
                    status: "warning",
                    title: "Password length should be in between 8 to 18",
                    isClosable: true,
                    position: "top",
                });
            } else if (signUpData.alternate_phone && !MobileRegex.test(signUpData.alternate_phone)) {
                toast({
                    status: "warning",
                    title: "Invalid Phone number",
                    isClosable: true,
                    position: "top",
                });
            } else {
                let customerId = localStorage.getItem("customerId");
                if (customerId) {
                    setIsSubmitting(true);
                    await signupCustomerApi(customerId, signUpData)
                        .then((res) => {
                            console.log(res.data);
                            toast({
                                title: "Success",
                                position: "top",
                                status: "success",
                                isClosable: true,
                                description: res.data.message,
                            });
                            localStorage.removeItem("customerId");
                            navigate("/login");
                        })
                        .catch((err) => {
                            console.log(err);
                            toast({
                                title: "Error",
                                position: "top",
                                status: "error",
                                isClosable: true,
                                description: err.response.data.message,
                            });
                        });
                    setIsSubmitting(false);
                } else {
                    toast({
                        status: "error",
                        title: "Something went wrong resend OTP",
                        isClosable: true,
                        position: "top",
                    });
                    localStorage.removeItem("customerId");
                    navigate("/login");
                }
            }
        } else {
            toast({
                status: "warning",
                title: "Please Fill all required field",
                isClosable: true,
                position: "top",
            });
        }
    };

    return (
        <div className="flex bg-cover bg-bottom bg-no-repeat items-center h-screen w-full" style={{ backgroundImage: `url(${img})` }}>
            <div className="w-full mt-[350px] md:mt-0 bg-white rounded shadow-lg p-2 md:p-8 m-4 md:max-w-2xl md:mx-auto">
                <div className="md:flex items-center justify-between mb-5">
                    {/* <img src={logo} width={200} /> */}
                    <div>
                        <h1 className="font-bold text-teal-900 text-xl">Registration Form</h1>
                        <span className="text-xs">Contact US: +9194538000108</span>
                    </div>
                </div>
                <label htmlFor="name" className="block text-xs mb-1 font-bold">
                    Full Name <span className="text-red-600">*</span>
                </label>
                <Input
                    id="name"
                    onChange={(e) =>
                        setSignUpData((old) => {
                            return { ...old, name: e.target.value };
                        })
                    }
                />
                <div className="md:mt-4 md:flex md:items-center md:space-x-2">
                    <div className="w-full mt-2 md:mt-0">
                        <label htmlFor="gstNo" className="block text-xs mb-1 font-bold">
                            GST Number
                        </label>
                        <Input
                            id="gstNo"
                            onChange={(e) =>
                                setSignUpData((old) => {
                                    return { ...old, gstNo: e.target.value };
                                })
                            }
                        />
                    </div>
                    <div className="w-full mt-2 md:mt-0">
                        <label htmlFor="dob" className="block text-xs mb-1 font-bold">
                            Date of Birth <span className="text-red-600">*</span>
                        </label>
                        <Input
                            id="dob"
                            type="date"
                            onChange={(e) =>
                                setSignUpData((old) => {
                                    return { ...old, DOB: e.target.value };
                                })
                            }
                        />
                    </div>
                </div>
                <div className="md:mt-4 md:flex md:items-center md:space-x-2">
                    <div className="w-full mt-2 md:mt-0">
                        <label htmlFor="emailId" className="block text-xs mb-1 font-bold">
                            Email ID
                        </label>
                        <Input
                            id="emailId"
                            autoComplete="new-email"
                            onChange={(e) =>
                                setSignUpData((old) => {
                                    return { ...old, email: e.target.value };
                                })
                            }
                        />
                    </div>
                    <div className="w-full mt-2 md:mt-0">
                        <label htmlFor="password" className="block text-xs mb-1 font-bold">
                            Enter New Password <span className="text-red-600">*</span>
                        </label>
                        <InputGroup size="md">
                            <Input
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setSignUpData((old) => {
                                        return { ...old, password: e.target.value };
                                    })
                                }
                                id="password"
                                pr="4.5rem"
                                type={show ? "text" : "password"}
                                placeholder="Enter password"
                            />
                            <InputRightElement width="4.5rem">
                                <Button title={show ? "Hide" : "Show"} h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                                    {show ? <PiEyeDuotone size={20} /> : <PiEyeClosedDuotone size={20} />}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </div>
                </div>
                <div className="md:mt-4 md:flex md:items-center md:space-x-2">
                    <div className="w-full mt-2 md:mt-0">
                        <label htmlFor="mobile-no" className="block text-xs mb-1 font-bold">
                            Alternate Phone Number
                        </label>
                        <InputGroup>
                            <InputLeftElement pointerEvents="none">
                                <IoCall className="text-gray-300" />
                            </InputLeftElement>
                            <Input
                                onChange={(e) =>
                                    setSignUpData((old) => {
                                        return { ...old, alternate_phone: e.target.value };
                                    })
                                }
                                id="mobile-no"
                                type="number"
                                placeholder="Alt Phone number"
                            />
                        </InputGroup>
                    </div>
                    <div className="w-full mt-2 md:mt-0">
                        <label htmlFor="stateSelect" className="block text-xs mb-1 font-bold">
                            Select State <span className="text-red-600">*</span>
                        </label>
                        <Select
                            onChange={(e) =>
                                setSignUpData((old) => {
                                    return { ...old, state: e.target.value };
                                })
                            }
                            id="stateSelect"
                            placeholder="Select State"
                        >
                            {Object.keys(StateAndCode)
                                .sort()
                                .map((el, idx) => (
                                    <option key={`${idx}-states`} value={el}>
                                        {el}
                                    </option>
                                ))}
                        </Select>
                    </div>
                </div>
                <div className="md:mt-4 md:flex md:items-center md:space-x-2">
                    <div className="w-full mt-2 md:mt-0">
                        <label htmlFor="mobile-no" className="block text-xs mb-1 font-bold">
                            City <span className="text-red-600">*</span>
                        </label>
                        <InputGroup>
                            <InputLeftElement pointerEvents="none">
                                <IoCall className="text-gray-300" />
                            </InputLeftElement>
                            <Input
                                onChange={(e) =>
                                    setSignUpData((old) => {
                                        return { ...old, city: e.target.value };
                                    })
                                }
                                id="city"
                                type="text"
                                placeholder="Enter your city"
                            />
                        </InputGroup>
                    </div>
                    <div className="w-full mt-2 md:mt-0">
                        <label htmlFor="pincode" className="block text-xs mb-1 font-bold">
                            Pincode <span className="text-red-600">*</span>
                        </label>
                        <Input
                            onChange={(e) =>
                                setSignUpData((old) => {
                                    return { ...old, pincode: e.target.value };
                                })
                            }
                            id="city"
                            type="text"
                            placeholder="Enter your city"
                        />
                    </div>
                </div>
                <label htmlFor="address" className="block text-xs mb-1 mt-2 md:mt-4  font-bold">
                    Complete Address <span className="text-red-600">*</span>
                </label>
                <Textarea
                    onChange={(e) =>
                        setSignUpData((old) => {
                            return { ...old, address: e.target.value };
                        })
                    }
                    id="address"
                />
                <Button isLoading={isSubmitting} loadingText="Please wait" onClick={() => saveUserInformation()} colorScheme="whatsapp" className="mt-10">
                    Submit
                </Button>
            </div>
        </div>
    );
};

export default SignUpPage;
