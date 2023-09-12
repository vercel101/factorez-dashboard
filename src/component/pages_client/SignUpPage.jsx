import React from "react";
import img from "../../assets/143.jpg";
import logo from "../../assets/factorlogo.png";
import { Button, HStack, Input, InputGroup, InputLeftElement, InputRightElement, Select, Textarea, useToast } from "@chakra-ui/react";
import { PiEyeClosedDuotone, PiEyeDuotone } from "react-icons/pi";
import { IoCall } from "react-icons/io5";
import { StateAndCode } from "../../utils/stateNameAndCode";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authToken, spinnerOverlayOffFn, spinnerOverlayOnFn, userInfoAdd } from "../../Redux/ReducerAction";
import { signupCustomerApi } from "../../apis/clientApis";
const SignUpPage = () => {
    const toast = useToast();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [show, setShow] = React.useState(false);
    const [signUpData, setSignUpData] = React.useState({
        name: "",
        gender: "",
        DOB: "",
        email: "",
        password: "",
        alternate_phone: "",
        state: "",
        address: "",
    });

    const saveUserInformation = async () => {
        console.log(signUpData);
        if (signUpData.name && signUpData.gender && signUpData.DOB && signUpData.email && signUpData.password && signUpData.state && signUpData.address) {
            const EmailRegex = /^\w+([\.]?\w+)*@\w+([\.]?\w+)*(\.\w{2,5})+$/;
            const PasswordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{10,20}$/;
            const MobileRegex = /^[6-9]\d{9}$/;
            if (!EmailRegex.test(signUpData.email)) {
                toast({
                    status: "warning",
                    title: "Invalid EmailID",
                    isClosable: true,
                    position: "top",
                });
            } else if (!PasswordRegex.test(signUpData.password)) {
                toast({
                    status: "warning",
                    title: "Weak password",
                    description: "Password must contains at least One special character, One Uppercase, One Lowercase, One Number and length in between 10-20",
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
                    dispatch(spinnerOverlayOnFn());
                    await signupCustomerApi(customerId, signUpData)
                        .then((res) => {
                            console.log(res.data);
                            let data = res.data.data;
                            toast({
                                title: "Success",
                                position: "top",
                                status: "success",
                                isClosable: true,
                                description: res.data.message,
                            });
                            dispatch(authToken(data.token));
                            sessionStorage.setItem("token", data.token);
                            sessionStorage.setItem("userInfo", JSON.stringify(data));
                            dispatch(userInfoAdd(data));
                            localStorage.removeItem('customerId');
                            navigate("/");
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
                            localStorage.removeItem('customerId');
                            navigate("/login");
                        });
                    dispatch(spinnerOverlayOffFn());
                    console.log("Every thing is fine");
                } else {
                    toast({
                        status: "error",
                        title: "Something went wrong resend OTP",
                        isClosable: true,
                        position: "top",
                    });
                    localStorage.removeItem('customerId');
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
                <div className="md:mt-4 md:flex md:items-center">
                    <div className="w-full mt-2 md:mt-0">
                        <label htmlFor="gender" className="block text-xs mb-1 font-bold">
                            Gender <span className="text-red-600">*</span>
                        </label>
                        <Select
                            id="gender"
                            placeholder="Select Gender"
                            onChange={(e) =>
                                setSignUpData((old) => {
                                    return { ...old, gender: e.target.value };
                                })
                            }
                        >
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                            <option value="OTHER">Other</option>
                        </Select>
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
                <div className="md:mt-4 md:flex md:items-center">
                    <div className="w-full mt-2 md:mt-0">
                        <label htmlFor="emailId" className="block text-xs mb-1 font-bold">
                            Email ID <span className="text-red-600">*</span>
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
                <div className="md:mt-4 md:flex md:items-center">
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
                            {Object.keys(StateAndCode).map((el, idx) => (
                                <option key={`${idx}-states`} value={el}>
                                    {el}
                                </option>
                            ))}
                        </Select>
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
                <Button onClick={() => saveUserInformation()} colorScheme="whatsapp" className="mt-10">
                    Submit
                </Button>
            </div>
        </div>
    );
};

export default SignUpPage;
