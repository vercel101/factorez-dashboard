import { Heading, Input, Image, Textarea, Select, Button, useToast, Table, Tbody, Tr, Th, Td, Text, Badge, IconButton } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import React, { useState } from "react";
import { StateAndCode } from "../../utils/stateNameAndCode";
import { addAddressApi, deleteAddressApi, getAllAddressApi, setDefaultAddressApi, updateUserInfoApi } from "../../apis/clientApis";
import { useDispatch } from "react-redux";
import { userInfoAdd } from "../../Redux/ReducerAction";

const Profile = ({ tokenReducer, userInfoReducer }) => {
    const toast = useToast();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState({
        saveUserInfoFlag: false,
        saveAddressFlag: false,
        changeDefaultAddressFlag: false,
    });
    const [addresses, setAddresses] = useState([]);
    const [addressField, setAddressField] = useState({
        address: "",
        state: "",
        city: "",
        pincode: "",
    });
    const [userInfoField, setUserInfoField] = useState({
        name: "",
        gstNo: "",
        alternate_phone: "",
        email: "",
        password: "",
    });

    const saveUserInfo = async () => {
        if (!userInfoField.name && !userInfoField.gstNo && !userInfoField.alternate_phone && !userInfoField.email && !userInfoField.password) {
            toast({
                position: "top",
                status: "warning",
                isClosable: true,
                title: "At least one field is require",
            });
        } else {
            setIsLoading((old) => {
                return { ...old, saveUserInfoFlag: true };
            });
            await updateUserInfoApi(userInfoReducer.customerId, userInfoField, tokenReducer).then((res) => {
                console.log(res.data);
                let data = res.data.data;
                toast({
                    position: "top",
                    status: "success",
                    isClosable: true,
                    title: res.data.message,
                });
                dispatch(userInfoAdd(data));
            });
            setIsLoading((old) => {
                return { ...old, saveUserInfoFlag: false };
            });
        }
    };

    const saveAddress = async () => {
        let stateCode = StateAndCode[addressField.state];
        if (addressField.address && addressField.state && addressField.city && addressField.pincode) {
            console.log(addressField);
            addressField.stateCode = stateCode;
            setIsLoading((old) => {
                return { ...old, saveAddressFlag: true };
            });
            await addAddressApi(userInfoReducer.customerId, addressField, tokenReducer)
                .then((res) => {
                    console.log(res);
                    toast({
                        position: "top",
                        title: res.data.message,
                        isClosable: true,
                        status: "success",
                    });
                    getAllAddress();
                })
                .catch((err) => {
                    console.log(err);
                    let message = err.response && err.response.data.message ? err.response.data.message : err.message;
                    toast({
                        position: "top",
                        title: message,
                        isClosable: true,
                        status: "error",
                    });
                });
            setIsLoading((old) => {
                return { ...old, saveAddressFlag: true };
            });
        } else {
            toast({
                position: "top",
                title: "All fields are required",
                isClosable: true,
                status: "warning",
            });
        }
    };
    const getAllAddress = async () => {
        await getAllAddressApi(userInfoReducer.customerId, tokenReducer)
            .then((res) => {
                console.log(res);
                setAddresses(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const defaultAddress = async (addressId) => {
        setIsLoading((old) => {
            return { ...old, changeDefaultAddressFlag: true };
        });
        await setDefaultAddressApi(userInfoReducer.customerId, addressId, tokenReducer)
            .then((res) => {
                console.log(res.data);
                let data = res.data.data;
                toast({
                    position: "top",
                    status: "success",
                    isClosable: true,
                    title: res.data.message,
                });
                dispatch(userInfoAdd(data));
            })
            .catch((err) => {
                console.log(err);
                let message = err.response && err.response.data.message ? err.response.data.message : err.message;
                toast({
                    position: "top",
                    title: message,
                    isClosable: true,
                    status: "error",
                });
            });
        setIsLoading((old) => {
            return { ...old, changeDefaultAddressFlag: false };
        });
    };

    const deleteAddress = async (addressId) => {
        await deleteAddressApi(userInfoReducer.customerId, addressId, tokenReducer)
            .then((res) => {
                console.log(res.data);
                let data = res.data.data;
                toast({
                    position: "top",
                    status: "success",
                    isClosable: true,
                    title: res.data.message,
                });
                getAllAddress();
                dispatch(userInfoAdd(data));
            })
            .catch((err) => {
                console.log(err);
                let message = err.response && err.response.data.message ? err.response.data.message : err.message;
                toast({
                    position: "top",
                    title: message,
                    isClosable: true,
                    status: "error",
                });
            });
    };

    React.useEffect(() => {
        getAllAddress();
    }, []);

    return (
        <div className="pt-[80px] px-2 md:px-[20px] lg:px-[10%] bg-white pb-10">
            <div className="pt-5">
                <Heading>My Profile</Heading>
            </div>
            <div className="bg-gradient-to-br from-[#a3abd985] to-[#FF834F51] p-3 mt-5 rounded-t-2xl mb-2">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-start sm:space-x-3">
                    <Image borderRadius="full" boxSize="150px" src="https://www.logiconme.com/assets/img-temp/400x450/img5.jpg" alt="Dan Abramov" />
                    <div>
                        <Table>
                            <Tbody>
                                <Tr>
                                    <Th border={0} width={150} p={1}>
                                        Name
                                    </Th>
                                    <Td border={0} p={0}>
                                        <Text fontWeight={"bold"} fontSize={"sm"}>
                                            {userInfoReducer.name}
                                        </Text>
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Th border={0} p={1}>
                                        Email
                                    </Th>
                                    <Td border={0} p={0}>
                                        <Text fontWeight={"bold"} fontSize={"sm"}>
                                            {userInfoReducer.email}
                                        </Text>
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Th border={0} p={1}>
                                        Phone Number
                                    </Th>
                                    <Td border={0} p={0}>
                                        <Text fontWeight={"bold"} fontSize={"sm"}>
                                            {userInfoReducer.phone}
                                        </Text>
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Th border={0} p={1}>
                                        Alternate Phone
                                    </Th>
                                    <Td border={0} p={0}>
                                        <Text fontWeight={"bold"} fontSize={"sm"}>
                                            {userInfoReducer.altMobileNo}
                                        </Text>
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Th border={0} p={1}>
                                        GST Number
                                    </Th>
                                    <Td border={0} p={0}>
                                        <Text fontWeight={"bold"} fontSize={"sm"}>
                                            {userInfoReducer.gstNo}
                                        </Text>
                                    </Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </div>
                </div>
            </div>
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-2 pb-0 md:pb-5 border-b-0 md:border-b-2">
                <div className="md:border-r pe-2 pb-5 md:pb-0 border-b-2 md:border-b-0">
                    <Heading size={"md"} className="mb-2">
                        Info
                    </Heading>
                    <div className="mt-2">
                        <label htmlFor="full_name" className="text-sm font-bold">
                            Full Name
                        </label>
                        <Input
                            id="full_name"
                            type="text"
                            onChange={(e) =>
                                setUserInfoField((old) => {
                                    return { ...old, name: e.target.value };
                                })
                            }
                        />
                    </div>
                    <div className="mt-2">
                        <label htmlFor="email_id" className="text-sm font-bold">
                            Email ID
                        </label>
                        <Input
                            id="email_id"
                            onChange={(e) =>
                                setUserInfoField((old) => {
                                    return { ...old, email: e.target.value };
                                })
                            }
                        />
                    </div>
                    <div className="mt-2">
                        <label htmlFor="alternate_phone" className="text-sm font-bold">
                            Alternate Phone Number
                        </label>
                        <Input
                            id="alternate_phone"
                            onChange={(e) =>
                                setUserInfoField((old) => {
                                    return { ...old, alternate_phone: e.target.value };
                                })
                            }
                        />
                    </div>
                    <div className="mt-2">
                        <label htmlFor="password" className="text-sm font-bold">
                            New Password
                        </label>
                        <Input
                            id="password"
                            onChange={(e) =>
                                setUserInfoField((old) => {
                                    return { ...old, password: e.target.value };
                                })
                            }
                        />
                    </div>
                    <div className="mt-2">
                        <label htmlFor="gstNo" className="text-sm font-bold">
                            GST Number
                        </label>
                        <Input
                            id="gstNo"
                            onChange={(e) =>
                                setUserInfoField((old) => {
                                    return { ...old, gstNo: e.target.value };
                                })
                            }
                        />
                    </div>
                    <div className="mt-5 space-x-2">
                        <Button colorScheme="green" onClick={() => saveUserInfo()} isLoading={isLoading.saveUserInfoFlag} loadingText="Please wait">
                            Submit
                        </Button>
                        <Button colorScheme="yellow">Cancel</Button>
                    </div>
                </div>
                <div className="pb-5 md:pb-0 border-b-2 md:border-b-0">
                    <Heading size={"md"} className="mb-2">
                        Add Address
                    </Heading>
                    <div className="mt-2">
                        <label htmlFor="state" className="text-sm font-bold">
                            State
                        </label>
                        <Select
                            id="state"
                            placeholder="Select State"
                            onChange={(e) =>
                                setAddressField((old) => {
                                    return { ...old, state: e.target.value };
                                })
                            }
                        >
                            {Object.keys(StateAndCode)
                                .sort()
                                .map((el, i) => (
                                    <option key={`${i}_state`} value={el}>
                                        {el}
                                    </option>
                                ))}
                        </Select>
                    </div>
                    <div className="mt-2">
                        <label htmlFor="city" className="text-sm font-bold">
                            City
                        </label>
                        <Input
                            id="city"
                            onChange={(e) =>
                                setAddressField((old) => {
                                    return { ...old, city: e.target.value };
                                })
                            }
                        />
                    </div>
                    <div className="mt-2">
                        <label htmlFor="pincode" className="text-sm font-bold">
                            Pincode
                        </label>
                        <Input
                            id="pincode"
                            onChange={(e) =>
                                setAddressField((old) => {
                                    return { ...old, pincode: e.target.value };
                                })
                            }
                        />
                    </div>
                    <div className="mt-2">
                        <label htmlFor="full_address" className="text-sm font-bold">
                            Complete Address
                        </label>
                        <Textarea
                            id="full_address"
                            placeholder="Complete Address"
                            onChange={(e) =>
                                setAddressField((old) => {
                                    return { ...old, address: e.target.value };
                                })
                            }
                        />
                    </div>
                    <div className="mt-5 space-x-2">
                        <Button colorScheme="green" onClick={() => saveAddress()} isLoading={isLoading.saveAddressFlag} loadingText="Please wait">
                            Submit
                        </Button>
                        <Button colorScheme="yellow">Cancel</Button>
                    </div>
                </div>
            </div>
            <div className="mt-5">
                <Heading size={"md"} className="mb-2">
                    All Address
                </Heading>
                {addresses.map((el) => (
                    <div key={el._id} className="border rounded-md p-1 mb-3 relative">
                        {el._id === userInfoReducer.defaultAddressId && <Badge colorScheme="blue">Default Address</Badge>}
                        <div className="absolute right-1 top-1 flex items-center">
                            <Button
                                variant={"outline"}
                                size={"xs"}
                                borderRadius={"full"}
                                isLoading={isLoading.changeDefaultAddressFlag}
                                loadingText={"Please wait"}
                                onClick={() => defaultAddress(el._id)}
                            >
                                Set as default
                            </Button>
                            <MdDelete onClick={() => deleteAddress(el._id)} color="red" className="text-2xl cursor-pointer" title="Delete This Address" />
                        </div>
                        <Table>
                            <Tbody>
                                <Tr>
                                    <Th border={0} width={20} p={1}>
                                        State
                                    </Th>
                                    <Td border={0} p={1}>
                                        {el.state}
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Th border={0} width={20} p={1}>
                                        City
                                    </Th>
                                    <Td border={0} p={1}>
                                        {el.city}
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Th border={0} width={20} p={1}>
                                        Pincode
                                    </Th>
                                    <Td border={0} p={1}>
                                        {el.pincode}
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Th border={0} width={20} p={1}>
                                        Address
                                    </Th>
                                    <Td border={0} p={1}>
                                        {el.address}
                                    </Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Profile;
