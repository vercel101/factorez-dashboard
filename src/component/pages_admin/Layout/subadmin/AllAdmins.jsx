import React, { useEffect, useState } from "react";
import { localDate } from "../../../../utils/stringToLocalDate";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuEye } from "react-icons/lu";
import { MdDeleteOutline, MdEdit, MdClose } from "react-icons/md";
import { deleteAdminByid, getAllSubAdminEnums, getAllSubAdmins, updateAdminByid } from "../../../../apis/adminApis";
import { useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";

import {
    Modal,
    ModalOverlay,
    FormControl,
    FormLabel,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    InputGroup,
    Input,
    Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    InputRightElement,
    Stack,
    Checkbox,
} from "@chakra-ui/react";
function AllAdmins(props) {
    const toast = useToast();
    const [allEnums, setAllEnums] = useState({});
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [allAdmins, setAllAdmins] = useState([]);
    const { tokenReducer } = useSelector((state) => state);
    const [activeModelData, setActiveModelData] = useState(null);
    const [updatedValue, setUpdatedValue] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
    });

    const handleClickPassword = () => setShowPassword(!showPassword);

    const getAllAdminFn = async () => {
        await getAllSubAdmins(tokenReducer)
            .then((res) => {
                console.log(res.data);
                setAllAdmins(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const closeEdit = () => {
        setIsEditOpen(false);
        setActiveModelData(null);
    };
    const closeDelete = () => {
        setIsDeleteOpen(false);
        setActiveModelData(null);
    };
    const editBtn = (userObj) => {
        console.log(userObj);
        setUpdatedValue({
            name: userObj.name,
            email: userObj.email,
            phone: userObj.phone,
        });
        setActiveModelData(userObj);
        setIsEditOpen(true);
    };
    const deleteBtn = (userObj) => {
        setActiveModelData(userObj);
        setIsDeleteOpen(true);
    };

    const saveUpdateUser = async () => {
        if (!updatedValue.email || !updatedValue.name || !updatedValue.phone) {
            alert("All fields are required, Only Password is optional");
        } else {
            await updateAdminByid(updatedValue, activeModelData._id, tokenReducer)
                .then((res) => {
                    alert(res.data.message);
                    closeEdit();
                    getAllAdminFn();
                })
                .catch((err) => {
                    console.log(err);
                    alert(err.message);
                });
        }
    };
    const saveDeleteUser = async () => {
        if (activeModelData) {
            await deleteAdminByid(activeModelData._id, tokenReducer)
                .then((res) => {
                    alert(res.data.message);
                    closeDelete();
                    getAllAdminFn();
                })
                .catch((err) => {
                    console.log(err.messgae);
                    alert(err.message);
                });
        }
    };

    const updatedTable = () => {
        return allAdmins.map((el, i) => (
            <tr key={el._id} className="border-b dark:border-neutral-500">
                <td className="whitespace-nowrap border-r px-6 py-2 font-medium dark:border-neutral-500">{i + 1}</td>
                <td className="whitespace-nowrap border-r px-6 py-2 dark:border-neutral-500">{el.name}</td>
                <td className="whitespace-nowrap border-r px-6 py-2 dark:border-neutral-500">{el.email}</td>
                <td className="whitespace-nowrap border-r px-6 py-2 dark:border-neutral-500">{el.phone}</td>
                <td className="whitespace-nowrap border-r px-6 py-2 dark:border-neutral-500">{el.gender}</td>
                <td className="whitespace-nowrap border-r px-6 py-2 dark:border-neutral-500">{localDate(el.createdAt)}</td>
                <td className="whitespace-nowrap border-r px-6 py-2 dark:border-neutral-500">
                    <ul>
                        {el.role.map((role, roleI) => (
                            <li key={`${roleI}_rolesIntable`} className={`p-1 my-1 rounded-sm bg-emerald-400 dark:bg-green-950  font-semibold`}>
                                {role}
                            </li>
                        ))}
                    </ul>
                </td>
                <td className="whitespace-nowrap px-6 py-2 flex">
                    <div tabIndex="0" className="group relative inline-block ">
                        <button className="focus:outline-none">
                            <BsThreeDotsVertical size={35} className=" border dark:border-neutral-500 cursor-pointer py-1 rounded-md hover:bg-teal-100 dark:hover:bg-teal-800" />
                        </button>
                        <div className="hidden group-focus-within:block items-center dark:border-neutral-500 rounded-md p-1 list-none absolute border dark:bg-teal-800 bg-teal-100 right-10 top-0 z-1 shadow-lg animate-slideIn">
                            <div className="flex">
                                <MdEdit size={30} className="m-2 cursor-pointer" title="Edit Product" onClick={() => editBtn(el)} />
                                <MdDeleteOutline size={30} className="m-2 cursor-pointer" title="Delete" onClick={() => deleteBtn(el)} />
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        ));
    };

    useEffect(() => {
        getAllAdminFn();
    }, []);
    return (
        <div>
            {activeModelData && (
                <>
                    <AlertDialog isOpen={isDeleteOpen} onClose={() => closeDelete()}>
                        <AlertDialogOverlay>
                            <AlertDialogContent>
                                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                    Delete Admin
                                </AlertDialogHeader>
                                <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>
                                <AlertDialogFooter>
                                    <Button onClick={() => closeDelete()}>Cancel</Button>
                                    <Button colorScheme="red" onClick={() => saveDeleteUser()} ml={3}>
                                        Delete
                                    </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialogOverlay>
                    </AlertDialog>
                    <Modal isOpen={isEditOpen} onClose={() => closeEdit()} scrollBehavior={"inside"}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Update Admin</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6}>
                                <FormControl>
                                    <FormLabel>Update Name</FormLabel>
                                    <Input
                                        placeholder="Full name"
                                        onChange={(e) =>
                                            setUpdatedValue((old) => {
                                                return { ...old, name: e.target.value };
                                            })
                                        }
                                        defaultValue={activeModelData.name}
                                    />
                                </FormControl>

                                <FormControl mt={4}>
                                    <FormLabel>Add new password</FormLabel>
                                    <InputGroup size="md">
                                        <Input
                                            pr="4.5rem"
                                            onChange={(e) =>
                                                setUpdatedValue((old) => {
                                                    return { ...old, password: e.target.value };
                                                })
                                            }
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter password"
                                        />
                                        <InputRightElement width="4.5rem">
                                            <Button h="1.75rem" size="sm" onClick={handleClickPassword}>
                                                {showPassword ? "Hide" : "Show"}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                </FormControl>
                                <FormControl mt={4}>
                                    <FormLabel>Phone</FormLabel>
                                    <Input
                                        placeholder="Phone number"
                                        onChange={(e) =>
                                            setUpdatedValue((old) => {
                                                return { ...old, phone: e.target.value };
                                            })
                                        }
                                        defaultValue={activeModelData.phone}
                                    />
                                </FormControl>
                                <FormControl mt={4}>
                                    <FormLabel>Email</FormLabel>
                                    <Input
                                        placeholder="Email"
                                        onChange={(e) =>
                                            setUpdatedValue((old) => {
                                                return { ...old, email: e.target.value };
                                            })
                                        }
                                        defaultValue={activeModelData.email}
                                    />
                                </FormControl>
                            </ModalBody>
                            <ModalFooter>
                                <Button colorScheme="blue" mr={3} onClick={() => saveUpdateUser()}>
                                    Save
                                </Button>
                                <Button onClick={() => closeEdit()}>Cancel</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </>
            )}

            <div>
                <div className="inline-block min-w-full py-2">
                    <div className="">
                        <table className="min-w-full bg-white dark:bg-gray-800 border text-start text-sm font-light dark:border-neutral-500">
                            <thead className="border-b font-medium dark:border-neutral-500">
                                <tr>
                                    <th scope="col" className="border-r w-[20px] px-6 py-3 dark:border-neutral-500">
                                        #
                                    </th>
                                    <th scope="col" className="border-r px-6 py-3 dark:border-neutral-500 text-start">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 border-r dark:border-neutral-500 text-start">
                                        Email
                                    </th>
                                    <th scope="col" className="border-r px-6 py-3 dark:border-neutral-500 text-start">
                                        Phone
                                    </th>
                                    <th scope="col" className="px-6 py-3 border-r dark:border-neutral-500 text-start">
                                        Gender
                                    </th>
                                    <th scope="col" className="border-r px-6 py-3 dark:border-neutral-500 text-start">
                                        Dt. Added
                                    </th>
                                    <th scope="col" className="border-r px-6 py-3 dark:border-neutral-500 text-start">
                                        Role
                                    </th>

                                    <th scope="col" className="px-6 w-1 py-3 border-r dark:border-neutral-500 text-start">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>{allAdmins.length > 0 && updatedTable()}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AllAdmins;
