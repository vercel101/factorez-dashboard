import React from "react";
import img from "../../assets/142.jpg";
import { Button, HStack, Input, InputGroup, InputLeftElement, InputRightElement, useToast } from "@chakra-ui/react";
import { PinInput, PinInputField } from "@chakra-ui/react";
import { IoCall } from "react-icons/io5";
import { PiEyeClosedDuotone, PiEyeDuotone } from "react-icons/pi";
import { generateOTPApi, loginCustomerApi, verifyOTPApi } from "../../apis/clientApis";
import { useNavigate } from "react-router-dom";
import { authToken, spinnerOverlayOffFn, spinnerOverlayOnFn, userInfoAdd } from "../../Redux/ReducerAction";
import { useDispatch } from "react-redux";

const LoginPage = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isOtpVerifying, setIsOtpVerifying] = React.useState(false);
    const [isOtpGenerating, setIsOtpGenerating] = React.useState(false);
    const [isOtpRegenerate, setIsOtpRegenerate] = React.useState(false);
    const [isPasswordShow, setIsPasswordShow] = React.useState(false);
    const [isUsingOtp, setIsUsingOtp] = React.useState(false);
    const [isLogin, setIsLogin] = React.useState(false);
    const [enterOtpIsVisible, setEnterOtpIsVisible] = React.useState(false);
    const [mobileNumber, setMobileNumber] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [otpValue, setOtpValue] = React.useState("");

    const RegexMobile = /^[6-9]\d{9}$/;
    const PasswordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{10,20}$/;
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
                    setIsOtpRegenerate(true);
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

    const loginWithPassword = async () => {
        if (mobileNumber !== "" && password !== "") {
            if (!RegexMobile.test(mobileNumber)) {
                toast({
                    title: "Phone",
                    position: "top",
                    status: "warning",
                    isClosable: true,
                    description: "Invalid Mobile number",
                });
            } else if (!PasswordRegex.test(password)) {
                toast({
                    title: "Password",
                    position: "top",
                    status: "warning",
                    isClosable: true,
                    description: "Invalid password",
                });
            } else {
                setIsLogin((old) => true);
                await loginCustomerApi({ phone: mobileNumber, password: password })
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
                    });
                setIsLogin((old) => false);
            }
        } else {
            toast({
                title: "Phone and Password",
                position: "top",
                status: "warning",
                isClosable: true,
                description: "Phone number and Password are required",
            });
        }
    };

    return (
        <div className="flex bg-cover bg-bottom bg-no-repeat items-center h-screen w-full" style={{ backgroundImage: `url(${img})` }}>
            <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
                <span className="block w-full text-xl uppercase font-bold mb-4">Login</span>
                <div className="md:w-full">
                    <label htmlFor="mobile-no" className="block text-xs mb-1">
                        Mobile number
                    </label>
                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <IoCall className="text-gray-300" />
                        </InputLeftElement>
                        <Input autoComplete="new-phone" onChange={(e) => setMobileNumber(e.target.value)} id="mobile-no" type="number" placeholder="Phone number" />
                    </InputGroup>
                </div>
                {enterOtpIsVisible && (
                    <div className="mt-4 md:w-full">
                        <label htmlFor="otp" className="block text-xs mb-1">
                            Enter OTP
                        </label>
                        <HStack width={"full"} className="flex items-center justify-between">
                            <PinInput id="otp" onChange={(value) => setOtpValue(value)}>
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                            </PinInput>
                        </HStack>
                    </div>
                )}
                {!isUsingOtp && (
                    <div className="mt-4 md:w-full">
                        <label htmlFor="password" className="block text-xs mb-1">
                            Enter Password
                        </label>
                        <InputGroup mb={3} size="md">
                            <Input
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="new-password"
                                id="password"
                                pr="4.5rem"
                                type={isPasswordShow ? "text" : "password"}
                                placeholder="Enter password"
                            />
                            <InputRightElement width="4.5rem">
                                <Button title={isPasswordShow ? "Hide" : "Show"} h="1.75rem" size="sm" onClick={() => setIsPasswordShow(!isPasswordShow)}>
                                    {isPasswordShow ? <PiEyeDuotone size={20} /> : <PiEyeClosedDuotone size={20} />}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </div>
                )}
                <div className="mb-4">
                    <Button onClick={() => setIsUsingOtp(!isUsingOtp)} fontSize={"xs"} colorScheme="messenger" variant="link">
                        {isUsingOtp ? "Login with Password" : "Login with OTP"}
                    </Button>
                </div>
                {!isUsingOtp ? (
                    <Button onClick={() => loginWithPassword()} isLoading={isLogin} loadingText="Please waite" colorScheme="green" variant="solid">
                        Login
                    </Button>
                ) : enterOtpIsVisible ? (
                    <>
                        <Button onClick={() => verifyOTP()} isLoading={isOtpVerifying} loadingText="Please waite" colorScheme="green" variant="solid">
                            Verify OTP
                        </Button>
                        {isOtpRegenerate && (
                            <Button fontSize={"xs"} ms={2} variant="link" onClick={() => sendOtp()} isLoading={isOtpGenerating} loadingText="Please waite" colorScheme="whatsapp">
                                Resend OTP
                            </Button>
                        )}
                    </>
                ) : (
                    <Button onClick={() => sendOtp()} isLoading={isOtpGenerating} loadingText="Please waite" colorScheme="whatsapp" variant="solid">
                        Generate OTP
                    </Button>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
