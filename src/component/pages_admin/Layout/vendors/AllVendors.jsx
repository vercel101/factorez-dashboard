import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdClose, MdDeleteOutline, MdEdit } from "react-icons/md";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { LuEye } from "react-icons/lu";
import { TbDots } from "react-icons/tb";
import { CiSearch } from "react-icons/ci";
import { deleteVendorApi, getAllVentorApi, updateVendorApi, verifyVendorApi } from "../../../../apis/adminApis";
import { localDate } from "../../../../utils/stringToLocalDate";
import TableActionModel from "../TableActionModel";
import { useDispatch } from "react-redux";
import { spinnerOverlayOffFn, spinnerOverlayOnFn } from "../../../../Redux/ReducerAction";
import {
    Badge,
    Button,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Portal,
    Table,
    Tbody,
    Td,
    Th,
    Tr,
    useToast,
} from "@chakra-ui/react";
import DataTable from "react-data-table-component";
import { PiMicrosoftExcelLogoDuotone } from "react-icons/pi";
import { FilterByVendorName } from "./FilterComponent";
import { customStyles } from "../../../../utils/customStylesDataTable";
import { convertVendorArrayOfObjectsToCSV } from "../../../../utils/convertArrayToCsv";
function AllVendors({ tokenReducer, userInfoReducer }) {
    const toast = useToast();
    const [allVendors, setAllVendors] = useState([]);
    const dispatch = useDispatch();
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isEditSaveLoading, setIsEditSaveLoading] = useState(false);
    const [isViewSaveLoading, setIsViewSaveLoading] = useState(false);
    const [editData, setEditData] = useState("");
    const [newEditData, setNewEditData] = useState({
        firmName: "",
        gstNo: "",
        representativeName: "",
        emailId: "",
        password: "",
        mobileNo: "",
        altMobileNo: "",
        pickupState: "",
        pickupCity: "",
        pickupPincode: "",
        invoiceAddress: "",
        pickupAddress: "",
    });
    const [newBrandData, setBrandEditData] = useState([{ brand_id: "", brand_name: "" }]);
    const [newBankData, setBankEditData] = useState({
        bank_id: "",
        acHolderName: "",
        acNo: "",
        bankName: "",
        branch: "",
        ifsc: "",
    });
    const [newVendorDoc, setNewVendorDoc] = useState({
        cancelledCheque: "",
        gstRegDoc: "",
        brandRegDoc: "",
    });
    const [activeTableModel, setActiveTableModel] = useState({
        flag: false,
        data: null,
    });
    const [filterText, setFilterText] = React.useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);

    function downloadCSV(array) {
        const link = document.createElement("a");
        let csv = convertVendorArrayOfObjectsToCSV(array);
        if (csv == null) return;
        const filename = "vendors.csv";
        if (!csv.match(/^data:text\/csv/i)) {
            csv = `data:text/csv;charset=utf-8,${csv}`;
        }
        link.setAttribute("href", encodeURI(csv));
        link.setAttribute("download", filename);
        link.click();
    }
    const Export = ({ onExport }) => (
        <Button colorScheme="whatsapp" leftIcon={<PiMicrosoftExcelLogoDuotone size={25} />} onClick={(e) => onExport(e.target.value)}>
            Export
        </Button>
    );

    const paginationComponentOptions = {
        rowsPerPageText: "No of Rows",
        rangeSeparatorText: "Total Records",
        selectAllRowsItem: true,
        selectAllRowsItemText: "HSN code",
    };

    const columns = [
        {
            name: "Vendor ID",
            selector: (row) => row.vendor_unique_id,
            width: "120px",
        },
        {
            name: <span className="whitespace-normal">Firm Name</span>,
            selector: (row) => row.firmName,
        },
        {
            name: <span className="whitespace-normal">Name</span>,
            selector: (row) => <span className="whitespace-normal">{row.representativeName}</span>,
        },
        {
            name: <span className="whitespace-normal">Margin %</span>,
            selector: (row) => row.marginInPercentage && row.marginInPercentage,
            width: "100px",
        },
        {
            name: "Mobile Number",
            selector: (row) => <span className="whitespace-normal">{row.mobileNo}</span>,
            width: "150px",
        },
        {
            name: <span className="whitespace-normal">Email ID</span>,
            selector: (row) => <span className="whitespace-normal">{row.emailId}</span>,
        },
        {
            name: <span className="whitespace-normal">Dt. Added</span>,
            selector: (row) => localDate(row.createdAt),
            width: "130px",
        },
        {
            name: <span className="whitespace-normal">Approved By</span>,
            selector: (row) => (row.actionTakenBy ? row.actionTakenBy.name : "NoAction"),
        },
        {
            name: "Status",
            selector: (row) => (
                <Badge py={1} variant={"solid"} colorScheme={row.status === "Approved" ? "whatsapp" : row.status === "Rejected" ? "red" : "facebook"}>
                    {row.status}
                </Badge>
            ),
            width: "130px",
        },
        {
            name: "Action",
            width: "80px",
            selector: (row) => (
                <Popover
                    placement="left"
                    styleConfig={{
                        popper: {
                            maxWidth: "unset",
                            width: "unset",
                        },
                    }}
                >
                    <PopoverTrigger>
                        <button className="focus:outline-none">
                            <BsThreeDotsVertical size={35} className=" border dark:border-neutral-500 cursor-pointer py-1 rounded-md hover:bg-teal-100 dark:hover:bg-teal-800" />
                        </button>
                    </PopoverTrigger>
                    <Portal>
                        <PopoverContent className="bg-white rounded shadow-md">
                            <PopoverBody>
                                <div className="flex items-center">
                                    <LuEye size={30} color="green" className="m-2 cursor-pointer" title="Information" onClick={() => eyeBtn(row._id, row)} />
                                    {userInfoReducer.userType !== "Seller" && (
                                        <>
                                            <MdEdit size={30} color="blue" className="m-2 cursor-pointer" title="Edit Product" onClick={() => editBtn(row._id, row)} />
                                            {/* <MdDeleteOutline size={30} color="red" className="m-2 cursor-pointer" title="Delete" onClick={() => deleteBtn(row._id)} /> */}
                                        </>
                                    )}
                                </div>
                            </PopoverBody>
                        </PopoverContent>
                    </Portal>
                </Popover>
            ),
        },
    ];
    const filteredItems = allVendors.filter((item) => {
        let record = null;
        if (
            item.firmName.toLowerCase().includes(filterText.toLowerCase()) ||
            item.representativeName.toLowerCase().includes(filterText.toLowerCase()) ||
            item.vendor_unique_id.includes(filterText.toLowerCase()) ||
            item.mobileNo.includes(filterText.toLowerCase())
        ) {
            record = item;
        }
        return record;
    });
    const subHeaderComponent = React.useMemo(() => {
        const handleClear = () => {
            if (filteredItems) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText("");
            }
        };
        return (
            <div className="flex items-center space-x-3">
                <FilterByVendorName onFilter={(e) => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
                {/* {console.log(filteredItems)} */}
                <Export onExport={() => downloadCSV(filteredItems)} />
            </div>
        );
    }, [filterText, filteredItems, resetPaginationToggle]);
    const selectedRows = (e) => {
        console.log(e);
    };
    const viewHandleChange = (id, status, key) => {
        console.log(id, status, key);
    };

    const getAllVendorFn = async () => {
        await getAllVentorApi()
            .then((res) => {
                console.log(res.data);
                setAllVendors(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const updateVendor = async (data, id) => {
        setIsViewSaveLoading(true);
        await verifyVendorApi(data, tokenReducer, id)
            .then((res) => {
                console.log(res.data);
                toast({
                    position: "top",
                    status: "success",
                    isClosable: true,
                    title: res.data.message,
                });
                getAllVendorFn();
                setActiveTableModel({ flag: false, data: null });
            })
            .catch((err) => {
                console.log(err);
                let message = err.response ? err.response.data.message : err.message;
                toast({
                    title: "Error",
                    description: message,
                    isClosable: true,
                    status: "error",
                    position: "top",
                });
            });
        setIsViewSaveLoading(false);
    };

    const eyeBtn = (objId, obj) => {
        setActiveTableModel({ flag: true, data: obj });
        console.log(objId);
    };
    const editBtn = (objId, obj) => {
        console.log(obj);
        setEditData(obj);
        setIsEditOpen(true);
    };
    const brandChangeHandler = (index, _id, value) => {
        setBrandEditData((old) => {
            let arr = [...old];
            arr[index] = { brand_id: _id, brand_name: value };
            return arr;
        });
    };
    const saveEditChanged = async (id) => {
        let formData = new FormData();
        for (let x1 of Object.keys(newEditData)) {
            if (newEditData[x1]) {
                formData.append(x1, newEditData[x1]);
            }
        }
        for (let x2 of Object.keys(newBankData)) {
            if (newBankData[x2]) {
                formData.append(x2, newBankData[x2]);
            }
        }
        for (let x3 of newBrandData) {
            if (x3.brand_id) {
                formData.append("brand_id", x3.brand_id);
                formData.append("brand_name", x3.brand_name);
            }
        }
        for (let x4 of Object.keys(newVendorDoc)) {
            if (newVendorDoc[x4]) {
                formData.append(x4, newVendorDoc[x4]);
            }
        }
        setIsEditSaveLoading(true);
        await updateVendorApi(formData, id, tokenReducer)
            .then((res) => {
                console.log(res.data);
                toast({
                    title: "Success",
                    description: res.data.message,
                    isClosable: true,
                    status: "success",
                    position: "top",
                });
                cancelEdit();
                setIsEditOpen(false);
                getAllVendorFn();
            })
            .catch((err) => {
                console.log(err);
                let message = err.response ? err.response.data.message : err.message;
                toast({
                    title: "Error",
                    description: message,
                    isClosable: true,
                    status: "error",
                    position: "top",
                });
            });
        setIsEditSaveLoading(false);
    };
    const cancelEdit = () => {
        setNewEditData({
            firmName: "",
            gstNo: "",
            representativeName: "",
            emailId: "",
            password: "",
            mobileNo: "",
            altMobileNo: "",
            pickupState: "",
            pickupCity: "",
            pickupPincode: "",
            invoiceAddress: "",
            pickupAddress: "",
        });
        setBrandEditData([{ brand_id: "", brand_name: "" }]);
        setBankEditData({
            bank_id: "",
            acHolderName: "",
            acNo: "",
            bankName: "",
            branch: "",
            ifsc: "",
        });
        setNewVendorDoc({
            cancelledCheque: "",
            gstRegDoc: "",
            brandRegDoc: "",
        });
    };
    const deleteBtn = async (objId) => {
        console.log(objId);
        if (window.confirm("Are you sure? You can't undo this action afterwards.")) {
            await deleteVendorApi(objId, tokenReducer)
                .then((res) => {
                    toast({
                        title: "Delete",
                        description: res.data.message,
                        isClosable: true,
                        status: "success",
                        position: "top",
                    });
                    getAllVendorFn();
                })
                .catch((err) => {
                    toast({
                        title: "Delete",
                        description: err.message,
                        isClosable: true,
                        status: "error",
                        position: "top",
                    });
                });
        }
    };
    useEffect(() => {
        getAllVendorFn();
    }, []);
    return (
        <div className="bg-gray-50 dark:bg-gray-800">
            <Modal size={"2xl"} isOpen={isEditOpen} onClose={() => setIsEditOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Vendor Info</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {editData && (
                            <div className="h-[450px] overflow-y-auto shadow-sm">
                                <Table>
                                    <Tbody>
                                        <Tr>
                                            <Th px={0} py={1} width={"200px"}>
                                                Firm Name
                                            </Th>
                                            <Td p={1}>
                                                <Input
                                                    size={"xs"}
                                                    defaultValue={editData.firmName}
                                                    onChange={(e) =>
                                                        setNewEditData((old) => {
                                                            return { ...old, firmName: e.target.value };
                                                        })
                                                    }
                                                />
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Th px={0} py={1}>
                                                Brand Name
                                            </Th>
                                            <Td p={1}>
                                                {editData.brand_id.map((bEl, i) => (
                                                    <Input key={bEl._id} size={"xs"} defaultValue={bEl.brand_name} onChange={(e) => brandChangeHandler(i, bEl._id, e.target.value)} />
                                                ))}
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Th px={0} py={1}>
                                                GST Number
                                            </Th>
                                            <Td p={1}>
                                                <Input
                                                    size={"xs"}
                                                    defaultValue={editData.gstNo}
                                                    onChange={(e) =>
                                                        setNewEditData((old) => {
                                                            return { ...old, gstNo: e.target.value };
                                                        })
                                                    }
                                                />
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Th px={0} py={1}>
                                                Owner Name
                                            </Th>
                                            <Td p={1}>
                                                <Input
                                                    size={"xs"}
                                                    defaultValue={editData.representativeName}
                                                    onChange={(e) =>
                                                        setNewEditData((old) => {
                                                            return { ...old, representativeName: e.target.value };
                                                        })
                                                    }
                                                />
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Th px={0} py={1}>
                                                Email
                                            </Th>
                                            <Td p={1}>
                                                <Input
                                                    size={"xs"}
                                                    defaultValue={editData.emailId}
                                                    onChange={(e) =>
                                                        setNewEditData((old) => {
                                                            return { ...old, emailId: e.target.value };
                                                        })
                                                    }
                                                />
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Th px={0} py={1}>
                                                Mobile Number
                                            </Th>
                                            <Td p={1}>
                                                <Input
                                                    size={"xs"}
                                                    defaultValue={editData.mobileNo}
                                                    onChange={(e) =>
                                                        setNewEditData((old) => {
                                                            return { ...old, mobileNo: e.target.value };
                                                        })
                                                    }
                                                />
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Th px={0} py={1}>
                                                Alt Mobile Number
                                            </Th>
                                            <Td p={1}>
                                                <Input
                                                    size={"xs"}
                                                    defaultValue={editData.altMobileNo}
                                                    onChange={(e) =>
                                                        setNewEditData((old) => {
                                                            return { ...old, altMobileNo: e.target.value };
                                                        })
                                                    }
                                                />
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Th px={0} py={1}>
                                                Pickup State
                                            </Th>
                                            <Td p={1}>
                                                <Input
                                                    size={"xs"}
                                                    defaultValue={editData.pickupState}
                                                    onChange={(e) =>
                                                        setNewEditData((old) => {
                                                            return { ...old, pickupState: e.target.value };
                                                        })
                                                    }
                                                />
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Th px={0} py={1}>
                                                Pickup City
                                            </Th>
                                            <Td p={1}>
                                                <Input
                                                    size={"xs"}
                                                    defaultValue={editData.pickupCity}
                                                    onChange={(e) =>
                                                        setNewEditData((old) => {
                                                            return { ...old, pickupCity: e.target.value };
                                                        })
                                                    }
                                                />
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Th px={0} py={1}>
                                                Pickup Pincode
                                            </Th>
                                            <Td p={1}>
                                                <Input
                                                    size={"xs"}
                                                    defaultValue={editData.pickupPincode}
                                                    onChange={(e) =>
                                                        setNewEditData((old) => {
                                                            return { ...old, pickupPincode: e.target.value };
                                                        })
                                                    }
                                                />
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Th px={0} py={1}>
                                                Invoice Address
                                            </Th>
                                            <Td p={1}>
                                                <Input
                                                    size={"xs"}
                                                    defaultValue={editData.invoiceAddress}
                                                    onChange={(e) =>
                                                        setNewEditData((old) => {
                                                            return { ...old, invoiceAddress: e.target.value };
                                                        })
                                                    }
                                                />
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Th px={0} py={1}>
                                                Pickup Address
                                            </Th>
                                            <Td p={1}>
                                                <Input
                                                    size={"xs"}
                                                    defaultValue={editData.pickupAddress}
                                                    onChange={(e) =>
                                                        setNewEditData((old) => {
                                                            return { ...old, pickupAddress: e.target.value };
                                                        })
                                                    }
                                                />
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Th px={0} py={1}>
                                                Account Holder Name
                                            </Th>
                                            <Td p={1}>
                                                <Input
                                                    size={"xs"}
                                                    defaultValue={editData.bank_id.acHolderName}
                                                    onChange={(e) =>
                                                        setBankEditData((old) => {
                                                            return { ...old, acHolderName: e.target.value, bank_id: editData.bank_id._id };
                                                        })
                                                    }
                                                />
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Th px={0} py={1}>
                                                Account Number
                                            </Th>
                                            <Td p={1}>
                                                <Input
                                                    size={"xs"}
                                                    defaultValue={editData.bank_id.acNo}
                                                    onChange={(e) =>
                                                        setBankEditData((old) => {
                                                            return { ...old, acNo: e.target.value, bank_id: editData.bank_id._id };
                                                        })
                                                    }
                                                />
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Th px={0} py={1}>
                                                Bank Name
                                            </Th>
                                            <Td p={1}>
                                                <Input
                                                    size={"xs"}
                                                    defaultValue={editData.bank_id.bankName}
                                                    onChange={(e) =>
                                                        setBankEditData((old) => {
                                                            return { ...old, bankName: e.target.value, bank_id: editData.bank_id._id };
                                                        })
                                                    }
                                                />
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Th px={0} py={1}>
                                                Branch
                                            </Th>
                                            <Td p={1}>
                                                <Input
                                                    size={"xs"}
                                                    defaultValue={editData.bank_id.branch}
                                                    onChange={(e) =>
                                                        setBankEditData((old) => {
                                                            return { ...old, branch: e.target.value, bank_id: editData.bank_id._id };
                                                        })
                                                    }
                                                />
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Th px={0} py={1}>
                                                IFSC
                                            </Th>
                                            <Td p={1}>
                                                <Input
                                                    size={"xs"}
                                                    defaultValue={editData.bank_id.ifsc}
                                                    onChange={(e) =>
                                                        setBankEditData((old) => {
                                                            return { ...old, ifsc: e.target.value, bank_id: editData.bank_id._id };
                                                        })
                                                    }
                                                />
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Th px={0} py={1}>
                                                Cancel Cheque
                                            </Th>
                                            <Td p={1}>
                                                <Input
                                                    type="file"
                                                    size={"xs"}
                                                    onChange={(e) =>
                                                        setNewVendorDoc((old) => {
                                                            return { ...old, cancelledCheque: e.target.files[0] };
                                                        })
                                                    }
                                                />
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Th px={0} py={1}>
                                                Brand Doc
                                            </Th>
                                            <Td p={1}>
                                                <Input
                                                    type="file"
                                                    size={"xs"}
                                                    onChange={(e) =>
                                                        setNewVendorDoc((old) => {
                                                            return { ...old, brandRegDoc: e.target.files[0] };
                                                        })
                                                    }
                                                />
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Th px={0} py={1}>
                                                GST Doc
                                            </Th>
                                            <Td p={1}>
                                                <Input
                                                    type="file"
                                                    size={"xs"}
                                                    onChange={(e) =>
                                                        setNewVendorDoc((old) => {
                                                            return { ...old, gstRegDoc: e.target.files[0] };
                                                        })
                                                    }
                                                />
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Th px={0} py={1}>
                                                NEW PASSWORD
                                            </Th>
                                            <Td p={1}>
                                                <Input
                                                    size={"xs"}
                                                    onChange={(e) =>
                                                        setNewEditData((old) => {
                                                            return { ...old, password: e.target.value };
                                                        })
                                                    }
                                                />
                                            </Td>
                                        </Tr>
                                    </Tbody>
                                </Table>
                            </div>
                        )}
                    </ModalBody>

                    <ModalFooter>
                        <Button isLoading={isEditSaveLoading} loadingText={"Please wait"} size={"sm"} mr={3} colorScheme="yellow" onClick={() => saveEditChanged(editData._id)}>
                            Save Changes
                        </Button>
                        <Button
                            size={"sm"}
                            colorScheme="red"
                            variant={"outline"}
                            onClick={() => {
                                setIsEditOpen(false);
                                cancelEdit();
                            }}
                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            {activeTableModel.flag && (
                <TableActionModel
                    isViewSaveLoading={isViewSaveLoading}
                    changeHandler={viewHandleChange}
                    save={updateVendor}
                    details={activeTableModel.data}
                    actionClose={() => setActiveTableModel({ data: null, flag: false })}
                />
            )}
            <DataTable
                columns={columns}
                data={filteredItems}
                selectableRows
                pagination
                paginationComponentOptions={paginationComponentOptions}
                paginationResetDefaultPage={resetPaginationToggle}
                subHeader
                onSelectedRowsChange={selectedRows}
                subHeaderComponent={subHeaderComponent}
                customStyles={customStyles}
                subHeaderAlign={"left"}
            />
        </div>
    );
}

export default AllVendors;
