import React from "react";
import img from "../../assets/142.jpg";
import { Button, HStack, Input, InputGroup, InputLeftElement, InputRightElement, useToast } from "@chakra-ui/react";
import { PinInput, PinInputField } from "@chakra-ui/react";
import { IoCall } from "react-icons/io5";
import { PiEyeClosedDuotone, PiEyeDuotone } from "react-icons/pi";
import { generateOTPApi, verifyOTPApi } from "../../apis/clientApis";
import { useNavigate } from "react-router-dom";
import { authToken, spinnerOverlayOffFn, spinnerOverlayOnFn, userInfoAdd } from "../../Redux/ReducerAction";
import { useDispatch } from "react-redux";

const LoginPage = () => {
    const toast = useToast();
    const dispatch = useDispatch();
    const [isOtpVerifying, setIsOtpVerifying] = React.useState(false);
    const [isOtpGenerating, setIsOtpGenerating] = React.useState(false);
    const navigate = useNavigate();
    const [enterOtpIsVisible, setEnterOtpIsVisible] = React.useState(false);
    const [mobileNumber, setMobileNumber] = React.useState("");

    const [otpValue, setOtpValue] = React.useState("");

    let RegexMobile = /^[6-9]\d{9}$/;
    const sendOtp = async () => {
        if (mobileNumber !== "" && RegexMobile.test(mobileNumber)) {
            setIsOtpGenerating((old) => true);
            await generateOTPApi(mobileNumber)
                .then((res) => {
                    console.log(res.data);
                    toast({
                        title: "Success",
                        position: "top",
                        status: "success",
                        isClosable: true,
                        description: res.data.message,
                    });
                    setEnterOtpIsVisible(true);
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
            setIsOtpGenerating((old) => false);
        } else {
            toast({
                title: "Phone Number Validation",
                position: "top",
                status: "warning",
                isClosable: true,
                description: "Phone number is required and its length should be 10 digits",
            });
        }
    };
    const verifyOTP = async () => {
        if (mobileNumber !== "" && RegexMobile.test(mobileNumber) && otpValue.length === 6) {
            setIsOtpVerifying((old) => true);
            await verifyOTPApi(mobileNumber, otpValue)
                .then((res) => {
                    console.log(res.data);
                    let data = res.data.data;
                    if (res.data.data.customerId) {
                        localStorage.setItem("customerId", data.customerId);
                        toast({
                            title: "Success",
                            position: "top",
                            status: "success",
                            isClosable: true,
                            description: "OTP verified, You have to SignUp First",
                        });
                        navigate("/signup");
                    } else {
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
                        navigate("/");
                    }
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
            setIsOtpVerifying((old) => false);
        } else {
            toast({
                title: "Phone and OTP",
                position: "top",
                status: "warning",
                isClosable: true,
                description: "Phone number and OTP are required",
            });
        }
    };

    return (
        <div className="flex bg-cover bg-bottom bg-no-repeat items-center h-screen w-full" style={{ backgroundImage: `url(${img})` }}>
            <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
                <span className="block w-full text-xl uppercase font-bold mb-4">Login</span>
                <div className="mb-4 md:w-full">
                    <label htmlFor="mobile-no" className="block text-xs mb-1">
                        Mobile number
                    </label>
                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <IoCall className="text-gray-300" />
                        </InputLeftElement>
                        <Input onChange={(e) => setMobileNumber(e.target.value)} id="mobile-no" type="number" placeholder="Phone number" />
                    </InputGroup>
                    {/* <input className="w-full border rounded p-2 outline-none focus:shadow-outline" type="number" name="mobile-no" id="mobile-no" placeholder="Enter mobile number" /> */}
                </div>
                {enterOtpIsVisible && (
                    <div className="mb-6 md:w-full">
                        <label htmlFor="password" className="block text-xs mb-1">
                            Enter OTP
                        </label>
                        <HStack width={"full"} className="flex items-center justify-between">
                            <PinInput onChange={(value) => setOtpValue(value)}>
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                            </PinInput>
                        </HStack>
                        {/* <InputGroup size="md">
                            <Input id="password" pr="4.5rem" type={show ? "text" : "password"} placeholder="Enter password" />
                            <InputRightElement width="4.5rem">
                                <Button title={show ? 'Hide' :'Show'} h="1.75rem" size="sm" onClick={handleClick}>
                                    {show ?  <PiEyeDuotone size={20}/>: <PiEyeClosedDuotone size={20}/> }
                                </Button>
                            </InputRightElement>
                        </InputGroup> */}
                        {/* <input className="w-full border rounded p-2 outline-none focus:shadow-outline" type="password" name="password" id="password" placeholder="Password" /> */}
                    </div>
                )}
                {enterOtpIsVisible ? (
                    <Button onClick={() => verifyOTP()} isLoading={isOtpVerifying} loadingText="Please waite" colorScheme="green" variant="solid">
                        Verify OTP
                    </Button>
                ) : (
                    <Button onClick={() => sendOtp()} isLoading={isOtpGenerating} loadingText="Please waite" colorScheme="whatsapp" variant="solid">
                        Generate OTP
                    </Button>
                )}

                {/* <a className="text-blue-700 text-center text-sm" href="/login">
                    Forgot password?
                </a> */}
            </div>
        </div>
    );
};

export default LoginPage;
