import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    Input,
    InputGroup,
    InputRightElement,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FcAddImage } from "react-icons/fc";
import { updateUserProfileApi } from "../../../../apis/adminApis";
import { useDispatch } from "react-redux";
import {
    spinnerOverlayOffFn,
    spinnerOverlayOnFn,
    userInfoAdd,
} from "../../../../Redux/ReducerAction";
const Profile = ({ sidebarCollapse, tokenReducer, userInfoReducer }) => {
    const toast = useToast();
    const dispatch = useDispatch();
    const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
    const [showPass, setShowPass] = React.useState(false);
    const [userInfoFetched, setUserInfoFetched] = useState(null);
    const [userProfileUrl, setUserProfileUrl] = useState(null);
    const [userInfo, setUserInfo] = useState({
        fullName: "",
        emailID: "",
        phone: "",
        altPhone: "",
        oldPass: "",
        newPass: "",
    });
    const [profileImg, setProfileImg] = useState(null);
    const profileImghandler = (file) => {
        console.log(file);
        if (file) {
            setProfileImg(file);
            setUserProfileUrl(URL.createObjectURL(file));
        }
    };
    console.log(userInfoReducer);
    const onCancel = () => {
        setUserInfo({
            fullName: "",
            emailID: "",
            phone: "",
            altPhone: "",
            oldPass: "",
            newPass: "",
        });
        setProfileImg(null);
        setUserProfileUrl(null);
    };

    const onSave = async () => {
        const EmailRegex = /^\w+([\.]?\w+)*@\w+([\.]?\w+)*(\.\w{2,3})+$/;
        const PasswordRegex =
            /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{10,20}$/;
        if (userInfo.emailID && !EmailRegex.test(userInfo.emailID)) {
            toast({
                status: "warning",
                position: "top",
                title: "Invalid Email id",
                isClosable: true,
            });
        } else if (userInfo.newPass && !PasswordRegex.test(userInfo.newPass)) {
            toast({
                status: "warning",
                position: "top",
                title: "Weak password",
                description:
                    "Password length 10-20, password contains 1 special charactor, 1 number, 1 Uppercase and 1 lowercase",
                isClosable: true,
            });
        } else if (
            (userInfo.altPhone && userInfo.altPhone.length !== 10) ||
            (userInfo.phone && userInfo.phone.length !== 10)
        ) {
            toast({
                status: "warning",
                position: "top",
                title: "Invalid phone number",
                isClosable: true,
            });
        } else {
            // toast({
            //     status: "success",
            //     position: "top",
            //     title: "Success",
            //     description: "Profile updated successfully",
            //     isClosable: true,
            // });
            // setIsAlertDialogOpen(false);
            // console.log(userInfo);
            // console.log(profileImg);
            console.log("first");
            let formData = new FormData();
            if (userInfo.fullName)
                formData.append("fullName", userInfo.fullName);
            if (userInfo.emailID) formData.append("emailID", userInfo.emailID);
            if (userInfo.phone) formData.append("phone", userInfo.phone);
            if (userInfo.altPhone)
                formData.append("altPhone", userInfo.altPhone);
            if (userInfo.newPass) formData.append("newPass", userInfo.newPass);
            if (userInfo.oldPass) formData.append("oldPass", userInfo.oldPass);
            if (profileImg) formData.append("profileImg", profileImg);
            dispatch(spinnerOverlayOnFn());
            setIsAlertDialogOpen(false);
            await updateUserProfileApi(formData, tokenReducer)
                .then((res) => {
                    console.log(res.data);
                    dispatch(userInfoAdd(res.data.data));
                    toast({
                        status: "success",
                        position: "top",
                        title: "Success",
                        description: res.data.message,
                        isClosable: true,
                    });
                    // onCancel();
                })
                .catch((err) => {
                    console.log(err);
                    toast({
                        status: "error",
                        position: "top",
                        title: "Error",
                        description: err.response.data.message,
                        isClosable: true,
                    });
                });
            dispatch(spinnerOverlayOffFn());
        }
    };

    useEffect(() => {
        if (userInfoReducer.photo) {
            setUserProfileUrl(userInfoReducer.photo);
        }
    }, []);

    return (
        <div
            className={`${
                sidebarCollapse ? "ps-[50px]" : "ps-[250px]"
            } pt-[55px] transition-all duration-300 dark:bg-[#17191e] dark:text-white w-full h-full min-h-screen`}
        >
            <div className="px-3">
                <div className="relative h-[200px] bg-gradient-to-r from-[#046A38] to-[#FF834F] rounded-t-2xl">
                    <div className=" absolute -bottom-8 left-2 h-32 w-32 bg-white border rounded-full flex items-end justify-end">
                        <img
                            className="rounded-full h-32 w-32 object-cover"
                            src={userProfileUrl}
                            alt=""
                        />
                        <div className="absolute pe-2 pb-2">
                            <label
                                htmlFor="profileImage"
                                className="cursor-pointer"
                            >
                                <FcAddImage size={30} />
                            </label>
                            <input
                                id="profileImage"
                                type="file"
                                className="hidden "
                                onChange={(e) =>
                                    profileImghandler(e.target.files[0])
                                }
                            />
                        </div>
                        {/* <button className="text-2xl absolute pe-2 pb-2">
                        </button> */}
                    </div>
                    <div className="absolute bottom-3 left-40">
                        <h1 className="font-bold text-2xl text-white">
                            {userInfoReducer.name}
                        </h1>
                        <div className="flex items-center space-x-2 text-teal-200 font-semibold">
                            <span>{userInfoReducer.phone}</span>
                            {userInfoReducer.altMobileNo && (
                                <span>{userInfoReducer.altMobileNo}</span>
                            )}
                            <span>{userInfoReducer.email}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-20 grid grid-cols-2 gap-3 max-w-4xl">
                    <div>
                        <label htmlFor="fullName">Full Name</label>
                        <Input
                            id="fullName"
                            value={userInfo.fullName}
                            autoComplete="full-name"
                            onChange={(e) =>
                                setUserInfo((old) => {
                                    return { ...old, fullName: e.target.value };
                                })
                            }
                        />
                    </div>
                    <div>
                        <label htmlFor="emailID">Email ID</label>
                        <Input
                            id="emailID"
                            value={userInfo.emailID}
                            autoComplete="email-id"
                            onChange={(e) =>
                                setUserInfo((old) => {
                                    return { ...old, emailID: e.target.value };
                                })
                            }
                        />
                    </div>
                    <div>
                        <label htmlFor="phoneNo">Phone Number</label>
                        <Input
                            id="phoneNo"
                            value={userInfo.phone}
                            autoComplete="phone-number"
                            onChange={(e) =>
                                setUserInfo((old) => {
                                    return { ...old, phone: e.target.value };
                                })
                            }
                        />
                    </div>
                    <div>
                        <label htmlFor="altphoneNo">Alt Phone Number</label>
                        <Input
                            id="altphoneNo"
                            value={userInfo.altPhone}
                            autoComplete="alt-phone"
                            onChange={(e) =>
                                setUserInfo((old) => {
                                    return { ...old, altPhone: e.target.value };
                                })
                            }
                        />
                    </div>
                    <div>
                        <label htmlFor="oldPass">Old Password</label>

                        <InputGroup size="md">
                            <Input
                                id="oldPass"
                                pr="4.5rem"
                                type={showPass ? "text" : "password"}
                                placeholder="Enter password"
                                value={userInfo.oldPass}
                                autoComplete="old-password"
                                onChange={(e) =>
                                    setUserInfo((old) => {
                                        return {
                                            ...old,
                                            oldPass: e.target.value,
                                        };
                                    })
                                }
                            />
                            <InputRightElement width="4.5rem">
                                <Button
                                    h="1.75rem"
                                    size="sm"
                                    onClick={() => setShowPass(!showPass)}
                                >
                                    {showPass ? "Hide" : "Show"}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </div>
                    <div>
                        <label htmlFor="newPass">New Password</label>

                        <InputGroup size="md">
                            <Input
                                id="newPass"
                                pr="4.5rem"
                                type={showPass ? "text" : "password"}
                                placeholder="Enter password"
                                value={userInfo.newPass}
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setUserInfo((old) => {
                                        return {
                                            ...old,
                                            newPass: e.target.value,
                                        };
                                    })
                                }
                            />
                            <InputRightElement width="4.5rem">
                                <Button
                                    h="1.75rem"
                                    size="sm"
                                    onClick={() => setShowPass(!showPass)}
                                >
                                    {showPass ? "Hide" : "Show"}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </div>
                </div>
                <div className="space-x-2 mt-5">
                    <Button
                        colorScheme="green"
                        onClick={() => setIsAlertDialogOpen(true)}
                    >
                        Save
                    </Button>
                    <Button colorScheme="red" onClick={() => onCancel()}>
                        Cancel
                    </Button>
                    <AlertDialog
                        isOpen={isAlertDialogOpen}
                        onClose={() => setIsAlertDialogOpen(false)}
                    >
                        <AlertDialogOverlay>
                            <AlertDialogContent>
                                <AlertDialogHeader
                                    fontSize="lg"
                                    fontWeight="bold"
                                >
                                    Update Profile
                                </AlertDialogHeader>

                                <AlertDialogBody>
                                    Are you sure?, To change your information
                                </AlertDialogBody>

                                <AlertDialogFooter>
                                    <Button
                                        onClick={() =>
                                            setIsAlertDialogOpen(false)
                                        }
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        colorScheme="green"
                                        onClick={() => onSave()}
                                        ml={3}
                                    >
                                        Save
                                    </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialogOverlay>
                    </AlertDialog>
                </div>
            </div>
        </div>
    );
};

export default Profile;
