import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { blockCustomerByIdApi, changePasswordApi, deleteCustomerByIdApi, getAllCustomerAPi } from "../../../../apis/adminApis";
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react";
import { localDate, localDateInIndiaTime } from "../../../../utils/stringToLocalDate";
import { useDispatch } from "react-redux";
import { authTokenClear, userInfoClear } from "../../../../Redux/ReducerAction";
import { useNavigate } from "react-router-dom";

const AllCustomers = ({ tokenReducer }) => {
    const [customers, setCustomers] = useState([]);
    const [isOpenChangePasswordModel, setIsOpenChangePasswordModel] = useState(false);
    const [isPasswordSaveLoading, setIsPasswordSaveLoading] = useState(false);
    const [customerId, setCustomerId] = useState(null);
    const [newPasswordValue, setNewPasswordValue] = useState("");
    const toast = useToast();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getAllCustomer = async () => {
        await getAllCustomerAPi(tokenReducer)
            .then((res) => {
                console.log(res.data);
                setCustomers(res.data.data);
            })
            .catch((err) => {
                console.log(err);
                toast({
                    title: "something went wrong",
                    description: err.message,
                    position: "top",
                    status: "error",
                    isClosable: true,
                });
            });
    };
    const logoutBtn = () => {
        dispatch(authTokenClear());
        dispatch(userInfoClear());
        navigate("/seller/login");
    };
    const deleteCustomer = async (customerId) => {
        if (window.confirm("After delete It cannot be undone.")) {
            await deleteCustomerByIdApi(customerId, tokenReducer)
                .then((res) => {
                    console.log(res.data);
                    toast({
                        title: "something went wrong",
                        description: res.data.message,
                        position: "top",
                        status: "success",
                        isClosable: true,
                    });
                    getAllCustomer();
                })
                .catch((err) => {
                    if (err.response && err.response.status === 401) {
                        logoutBtn();
                    }
                    console.log(err);
                    toast({
                        title: "something went wrong",
                        description: err.message,
                        position: "top",
                        status: "error",
                        isClosable: true,
                    });
                });
        }
    };

    const blockCustomer = async (customerId, value) => {
        if (value === "changePassword") {
            setIsOpenChangePasswordModel(true);
            setCustomerId(customerId);
        } else if (window.confirm("Are you sure!")) {
            await blockCustomerByIdApi(customerId, tokenReducer)
                .then((res) => {
                    console.log(res.data);
                    toast({
                        title: "something went wrong",
                        description: res.data.message,
                        position: "top",
                        status: "success",
                        isClosable: true,
                    });
                    getAllCustomer();
                })
                .catch((err) => {
                    if (err.response && err.response.status === 401) {
                        logoutBtn();
                    }
                    console.log(err);
                    let message = err.response ? err.response.data.message : err.message;
                    toast({
                        title: "something went wrong",
                        description: message,
                        position: "top",
                        status: "error",
                        isClosable: true,
                    });
                });
        }
    };
    const passwordChangeFn = async () => {
        if (newPasswordValue.length >= 8 && newPasswordValue.length <= 20 && customerId) {
            setIsPasswordSaveLoading(true);
            await changePasswordApi({ password: newPasswordValue }, customerId, tokenReducer)
                .then((res) => {
                    toast({
                        title: res.data.message,
                        position: "top",
                        status: "success",
                        isClosable: true,
                    });
                    setIsOpenChangePasswordModel(false);
                    setCustomerId(null);
                    setNewPasswordValue("");
                })
                .catch((err) => {
                    if (err.response && err.response.status === 401) {
                        logoutBtn();
                    }
                    let message = err.response ? err.response.data.message : err.message;
                    toast({
                        title: "Oops!, something went wrong",
                        description: message,
                        position: "top",
                        status: "error",
                        isClosable: true,
                    });
                });
            setIsPasswordSaveLoading(false);
        } else {
            toast({
                title: "Password length should be 8 to 20",
                position: "top",
                status: "warning",
                isClosable: true,
            });
        }
    };

    useEffect(() => {
        getAllCustomer().then();
    }, []);
    return (
        <div>
            <Modal
                isOpen={isOpenChangePasswordModel}
                onClose={() => {
                    setIsOpenChangePasswordModel(false);
                    setNewPasswordValue("");
                    setCustomerId(null);
                }}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Password</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>New Password</FormLabel>
                            <Input placeholder="Password length 8 to 20" onChange={(e) => setNewPasswordValue(e.target.value)} />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button isLoading={isPasswordSaveLoading} loadingText="Please wait" colorScheme="blue" mr={3} onClick={() => passwordChangeFn()}>
                            Save
                        </Button>
                        <Button
                            onClick={() => {
                                setIsOpenChangePasswordModel(false);
                                setNewPasswordValue("");
                                setCustomerId(null);
                            }}
                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <table className={`w-full text-sm text-left text-gray-500 dark:text-gray-400`}>
                <thead className={`text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400`}>
                    <tr>
                        <th scope="col" className="ps-1 py-3">
                            #
                        </th>
                        <th scope="col" className="ps-1 py-3">
                            Name
                        </th>
                        {/* <th scope="col" className="ps-1 py-3">
                            Gender
                        </th>
                        <th scope="col" className="ps-1 py-3">
                            DOB
                        </th> */}
                        <th scope="col" className="ps-1 py-3">
                            SIGNUP DATE
                        </th>
                        <th scope="col" className="ps-1 py-3">
                            GST
                        </th>
                        <th scope="col" className="ps-1 py-3">
                            Email
                        </th>
                        <th scope="col" className="ps-1 py-3">
                            Phone
                        </th>
                        <th scope="col" className="ps-1 py-3">
                            Address
                        </th>
                        <th scope="col" className="ps-1 py-3">
                            Status
                        </th>
                        <th scope="col" className="ps-1 py-3">
                            Delete
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {customers.length > 0 ? (
                        customers.map((el, i) => (
                            <tr key={el._id} className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`}>
                                <td className={`ps-1 border-e py-1`}>{i + 1}</td>
                                <th scope={`row`} className={`ps-1 border-e py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white`}>
                                    {el.name}
                                </th>
                                <td className={`ps-1 border-e py-1`}>{localDateInIndiaTime(el.createdAt)}</td>
                                {/* <td className={`ps-1 border-e py-1`}>{el.gender}</td>
                                <td className={`ps-1 border-e py-1`}>{localDate(el.DOB)}</td> */}
                                <td className={`ps-1 border-e py-1`}>{el.gstNo}07AAGFF2194N1Z1</td>
                                <td className={`ps-1 border-e py-1`}>{el.email}</td>
                                <td className={`ps-1 border-e py-1`}>{el.phone}</td>
                                <td className={`ps-1 border-e py-1`}>{el.defaultAddress ? el.defaultAddress.address : ""}</td>
                                <td className={`ps-1 border-e py-1`}>
                                    <select
                                        value={el.isBlocked ? "suspended" : "active"}
                                        name=""
                                        id=""
                                        onChange={(e) => blockCustomer(el._id, e.target.value)}
                                        className={`border rounded outline-none dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`}
                                    >
                                        <option value="active">Active</option>
                                        <option value="suspended">Suspended</option>
                                        <option value="changePassword">Change Password</option>
                                    </select>
                                </td>
                                <td className={`ps-1 border-e py-1 text-right"`}>
                                    <MdDelete size={20} className="cursor-pointer" onClick={() => deleteCustomer(el._id)} />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr className="p-3">No record found...</tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AllCustomers;
