import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { addNewAdmin, getAllSubAdminEnums } from "../../../../apis/adminApis";
import { useState } from "react";
import { Checkbox, Stack, useToast } from "@chakra-ui/react";
import { accessControls } from "../../../../utils/enums";

function AddNewAdmin({ tokenReducer }) {
    const toast = useToast();
    const [allEnums, setAllEnums] = useState({});
    const [newAdminTextField, setNewAdminTextField] = useState({
        name: "",
        email: "",
        gender: "",
        phone: "",
        password: "",
    });
    const [adminRoles, setAdminRoles] = useState([]);

    const addRolesToStack = (field, value) => {
        let arr = [];
        let idx = -1;
        setAdminRoles((prevState) => {
            arr = [...prevState];
            idx = arr.findIndex((val) => val === field);
            if (idx >= 0) {
                arr.splice(idx, 1);
            } else {
                arr.push(field);
            }
            return arr;
        });
    };
    const createNewAdminFn = async () => {
        if (
            newAdminTextField.name === "" ||
            newAdminTextField.email === "" ||
            newAdminTextField.phone === "" ||
            newAdminTextField.password === "" ||
            adminRoles.length === 0
        ) {
            console.log(newAdminTextField, adminRoles);
            // alert("All fields are required");
            toast({
                status: "warning",
                title: "Warning",
                position: "top",
                description: "All fields are required",
                isClosable: true,
            });
        } else {
            const EmailRegex = /^\w+([\.]?\w+)*@\w+([\.]?\w+)*(\.\w{2,3})+$/;
            const PasswordRegex =
                /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{10,20}$/;
            if (!EmailRegex.test(newAdminTextField.email)) {
                toast({
                    status: "warning",
                    position: "top",
                    title: "Email validation",
                    description: "Email is not valid",
                    isClosable: true,
                });
            } else if (!PasswordRegex.test(newAdminTextField.password)) {
                toast({
                    status: "warning",
                    position: "top",
                    title: "Email and Password validation",
                    description:
                        "Password length 10-20, password contains 1 special charactor, 1 number, 1 Uppercase and 1 lowercase",
                    isClosable: true,
                });
            } else if (newAdminTextField.phone.length !== 10) {
                toast({
                    status: "warning",
                    position: "top",
                    title: "Phone number is not valid",
                    isClosable: true,
                });
            } else {
                let data = {
                    name: newAdminTextField.name,
                    email: newAdminTextField.email,
                    password: newAdminTextField.password,
                    role: adminRoles,
                    phone: newAdminTextField.phone,
                };
                await addNewAdmin(data, tokenReducer)
                    .then((res) => {
                        console.log(res.data);
                        setNewAdminTextField({
                            name: "",
                            email: "",
                            gender: "",
                            phone: "",
                            password: "",
                        });
                        setAdminRoles([]);

                        toast({
                            status: "success",
                            position: "top",
                            title: "Account Created",
                            description: res.data.message,
                            isClosable: true,
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                        alert("Something went wrong!");
                        toast({
                            status: "error",
                            position: "top",
                            title: "Error",
                            description: err.message,
                            isClosable: true,
                        });
                    });
            }
        }
    };


    const getAllSubAdminEnumFn = async () => {
        await getAllSubAdminEnums(tokenReducer)
            .then((res) => {
                console.log(res.data);
                setAllEnums(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const cancelNewAdminFn = () => {
        setNewAdminTextField({
            name: "",
            email: "",
            gender: "",
            phone: "",
            password: "",
        });
        setAdminRoles([]);
    };
    useEffect(() => {
        getAllSubAdminEnumFn();
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-2">Add New Admin</h1>
            <div className="grid grid-cols-4 gap-2">
                <div>
                    <span>Name</span>
                    <input
                        type="text"
                        placeholder={"Admin Name"}
                        value={newAdminTextField.name}
                        onChange={(e) =>
                            setNewAdminTextField((prevState) => {
                                return { ...prevState, name: e.target.value };
                            })
                        }
                        className="w-full p-2 outline-none bg-[#fafafa] border rounded-md dark:bg-[#424242] dark:border-[#424242]"
                    />
                </div>
                <div>
                    <span>Phone</span>
                    <input
                        type="number"
                        placeholder={"Phone Number"}
                        value={newAdminTextField.phone}
                        onChange={(e) =>
                            setNewAdminTextField((prevState) => {
                                return { ...prevState, phone: e.target.value };
                            })
                        }
                        className="w-full p-2 outline-none bg-[#fafafa] border rounded-md dark:bg-[#424242] dark:border-[#424242]"
                    />
                </div>
                <div>
                    <span>Email</span>
                    <input
                        type="text"
                        placeholder={"Email ID"}
                        value={newAdminTextField.email}
                        onChange={(e) =>
                            setNewAdminTextField((prevState) => {
                                return { ...prevState, email: e.target.value };
                            })
                        }
                        className="w-full p-2 outline-none bg-[#fafafa] border rounded-md dark:bg-[#424242] dark:border-[#424242]"
                    />
                </div>
                <div>
                    <span>Password</span>
                    <input
                        type="text"
                        placeholder={"Password"}
                        value={newAdminTextField.password}
                        onChange={(e) =>
                            setNewAdminTextField((prevState) => {
                                return {
                                    ...prevState,
                                    password: e.target.value,
                                };
                            })
                        }
                        className="w-full p-2 outline-none bg-[#fafafa] border rounded-md dark:bg-[#424242] dark:border-[#424242]"
                    />
                </div>
            </div>
            <h1 className="text-lg font-bold border-b my-3">All Permissions</h1>
            <div
                className={`border p-4 bg-green-100 dark:bg-[#424242] dark:border-[#424242] rounded-md`}
            >
                <div className="grid grid-cols-4 gap-2">
                    {Object.keys(accessControls).map((el, i) => (
                        <div
                            key={`${i}_${el}`}
                            className="bg-white dark:bg-[#242424]"
                        >
                            <h1
                                key={i}
                                className="font-bold text-lg bg-teal-300 dark:bg-teal-800 p-2"
                            >
                                {el}
                            </h1>
                            <div className="p-2">
                                <Stack direction={"column"} gap={0}>
                                    {Object.keys(accessControls[el]).map(
                                        (headKey) => (
                                            <>
                                                {typeof accessControls[el][
                                                    headKey
                                                ] !== "string" ? (
                                                    <>
                                                        {Object.keys(
                                                            accessControls[el][
                                                                headKey
                                                            ]
                                                        ).map((subKey) => (
                                                            <Checkbox
                                                                defaultChecked={adminRoles.includes(
                                                                    subKey
                                                                )}
                                                                onChange={(e) =>
                                                                    addRolesToStack(
                                                                        subKey
                                                                    )
                                                                }
                                                            >
                                                                {
                                                                    subKey.split(
                                                                        "_"
                                                                    )[1]
                                                                }
                                                            </Checkbox>
                                                        ))}
                                                    </>
                                                ) : (
                                                    <Checkbox
                                                        defaultChecked={adminRoles.includes(
                                                            headKey
                                                        )}
                                                        onChange={(e) =>
                                                            addRolesToStack(
                                                                headKey
                                                            )
                                                        }
                                                    >
                                                        {
                                                            accessControls[el][
                                                                headKey
                                                            ]
                                                        }
                                                    </Checkbox>
                                                )}
                                            </>
                                        )
                                    )}
                                </Stack>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={`mt-2`}>
                <button
                    className={`border px-2 py-1 bg-[#4f46e5] rounded-md text-white hover:bg-indigo-800`}
                    onClick={() => createNewAdminFn()}
                >
                    Submit
                </button>
                <button
                    className={`ms-1 border px-2 py-1 rounded-md bg-red-300 hover:bg-yellow-200`}
                    onClick={() => cancelNewAdminFn()}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default AddNewAdmin;
