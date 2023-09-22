import React from "react";
import img from "../../assets/142.jpg";
import { Button, HStack, Input, InputGroup, InputLeftElement, InputRightElement, useToast } from "@chakra-ui/react";
import { PinInput, PinInputField } from "@chakra-ui/react";
import { IoCall } from "react-icons/io5";
import { PiEyeClosedDuotone, PiEyeDuotone } from "react-icons/pi";
import { forgetPasswordUsingOtpApi, generateOTPApi, loginCustomerApi, verifyOTPApi } from "../../apis/clientApis";
import { useNavigate } from "react-router-dom";
import { authToken, userInfoAdd } from "../../Redux/ReducerAction";
import { useDispatch } from "react-redux";

const LoginPage = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isOtpVerifying, setIsOtpVerifying] = React.useState(false);
    const [isOtpGenerating, setIsOtpGenerating] = React.useState(false);
    const [isOtpRegenerate, setIsOtpRegenerate] = React.useState(false);
    const [isPasswordShow, setIsPasswordShow] = React.useState(false);
    const [isUsingPassword, setIsUsingPassword] = React.useState(true);
    const [isForgetUsingOtp, setIsForgetUsingOtp] = React.useState(false);
    const [isSignup, setIsSignup] = React.useState(false);
    const [isLogin, setIsLogin] = React.useState(false);
    const [enterOtpIsVisible, setEnterOtpIsVisible] = React.useState(false);
    const [mobileNumber, setMobileNumber] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [otpValue, setOtpValue] = React.useState("");

    const RegexMobile = /^[6-9]\d{9}$/;
    // const PasswordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{10,20}$/;
    const sendOtp = async () => {
        if (mobileNumber !== "" && RegexMobile.test(mobileNumber)) {
            setIsOtpGenerating((old) => true);
            await generateOTPApi(mobileNumber)
                .then((res) => {
                    console.log(res);
                    toast({
                        title: "Success",
                        position: "top",
                        status: "success",
                        isClosable: true,
                        description: res.data.message,
                    });
                    setEnterOtpIsVisible(true);
                    if (!isSignup) {
                        setIsForgetUsingOtp(true);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    toast({
                        title: "Error",
                        position: "top",
                        status: "error",
                        isClosable: true,
                        description: err.message,
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
                    if (isSignup && !res.data.data.isActivated) {
                        localStorage.setItem("customerId", data.customerId);
                        toast({
                            title: "Success",
                            position: "top",
                            status: "success",
                            isClosable: true,
                            description: "OTP verified",
                        });
                        navigate("/signup");
                    } else {
                        toast({
                            title: "Warning",
                            position: "top",
                            status: "warning",
                            isClosable: true,
                            description: "Mobile number already exists, Please login",
                        });
                        setIsForgetUsingOtp(false);
                        setEnterOtpIsVisible(false);
                        setIsUsingPassword(true);
                        setIsSignup(false);
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
            } else if (password.length < 8 || password.length > 18) {
                toast({
                    title: "Password",
                    position: "top",
                    status: "warning",
                    isClosable: true,
                    description: "Invalid password, Password length should be in between 8 to 18 character",
                });
            } else {
                setIsLogin((old) => true);
                await loginCustomerApi({ phone: mobileNumber, password: password })
                    .then((res) => {
                        console.log(res.data);
                        // let data = res.data.data;
                        toast({
                            title: "Success",
                            position: "top",
                            status: "success",
                            isClosable: true,
                            description: res.data.message,
                        });
                        // dispatch(authToken(data.token));
                        // dispatch(userInfoAdd(data));
                        // navigate("/");
                    })
                    .catch((err) => {
                        console.log(err);
                        let message = err.response && err.response.data ? err.response.data.message : err.message;
                        toast({
                            title: "Error",
                            position: "top",
                            status: "error",
                            isClosable: true,
                            description: message,
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
    const signUpBtn = () => {
        setIsUsingPassword(false);
        setIsSignup(true);
    };

    const loginForgetHandler = () => {
        if (isUsingPassword) {
            setIsUsingPassword(false);
        } else {
            setIsForgetUsingOtp(false);
            setEnterOtpIsVisible(false);
            setIsUsingPassword(true);
            setIsSignup(false);
        }
    };
    const forgetPassword = async () => {
        if (!password || !otpValue || !mobileNumber) {
            toast({
                title: "Phone, Password & OTP",
                position: "top",
                status: "warning",
                isClosable: true,
                description: "Phone number,Password and OTP are required",
            });
        } else if (!RegexMobile.test(mobileNumber)) {
            toast({
                title: "Phone",
                position: "top",
                status: "warning",
                isClosable: true,
                description: "Invalid Mobile number",
            });
        } else if (password.length < 8 || password.length > 18) {
            toast({
                title: "Password",
                position: "top",
                status: "warning",
                isClosable: true,
                description: "Invalid password, Password length should be in between 8 to 18 character",
            });
        } else {
            setIsOtpVerifying((old) => true);
            await forgetPasswordUsingOtpApi(mobileNumber, otpValue, { password })
                .then((res) => {
                    toast({
                        title: res.data.message,
                        position: "top",
                        status: "success",
                        isClosable: true,
                    });
                    setIsForgetUsingOtp(false);
                    setEnterOtpIsVisible(false);
                    setIsUsingPassword(true);
                })
                .catch((err) => {
                    let message = err.response && err.response.data && err.response.data.message ? err.response.data.message : err.message;
                    toast({
                        title: "Error",
                        position: "top",
                        status: "error",
                        isClosable: true,
                        description: message,
                    });
                    setIsOtpRegenerate(true);
                });
            setIsOtpVerifying((old) => false);
        }
    };

    return (
        <div className="flex bg-cover bg-bottom bg-no-repeat items-center h-screen w-full" style={{ backgroundImage: `url(${img})` }}>
            <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
                <span className="block w-full text-xl uppercase font-bold mb-4">{!isUsingPassword && !isSignup ? "Forget Password" : isSignup ? "Signup using OTP" : "Login"}</span>
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

                {isUsingPassword && (
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

                {isForgetUsingOtp && (
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
                    <Button onClick={() => loginForgetHandler()} fontSize={"xs"} colorScheme="messenger" variant="link">
                        {!isUsingPassword ? "← Back to Login" : "Forget password"}
                    </Button>
                </div>

                {isUsingPassword && !isForgetUsingOtp ? (
                    <div className="flex items-center space-x-2">
                        <Button onClick={() => loginWithPassword()} isLoading={isLogin} loadingText="Please wait" colorScheme="green" variant="solid">
                            Login
                        </Button>
                        <Button onClick={() => signUpBtn()} loadingText="Please wait" colorScheme="yellow" variant="solid">
                            Signup
                        </Button>
                    </div>
                ) : enterOtpIsVisible ? (
                    <>
                        {isForgetUsingOtp ? (
                            <Button onClick={() => forgetPassword()} isLoading={isOtpVerifying} loadingText="Please wait" colorScheme="green" variant="solid">
                                Forget Password using OTP
                            </Button>
                        ) : (
                            <Button onClick={() => verifyOTP()} isLoading={isOtpVerifying} loadingText="Please wait" colorScheme="green" variant="solid">
                                Verify OTP
                            </Button>
                        )}
                        {isOtpRegenerate && (
                            <Button fontSize={"xs"} ms={2} variant="link" onClick={() => sendOtp()} isLoading={isOtpGenerating} loadingText="Please wait" colorScheme="whatsapp">
                                Resend OTP
                            </Button>
                        )}
                    </>
                ) : (
                    <Button onClick={() => sendOtp()} isLoading={isOtpGenerating} loadingText="Please wait" colorScheme="whatsapp" variant="solid">
                        Generate OTP
                    </Button>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
