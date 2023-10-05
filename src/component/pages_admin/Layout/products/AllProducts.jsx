import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuEye } from "react-icons/lu";
import { MdCheckBox, MdDeleteOutline, MdEdit, MdLabel } from "react-icons/md";
import { TbDots } from "react-icons/tb";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { allProductApi, changeProductStatusApi, changeProductStockStatusApi, getAllCategoryApi, getAllColorApi, updateProductApi } from "../../../../apis/adminApis";
import { localDate } from "../../../../utils/stringToLocalDate";
import TableActionModel from "../TableActionModel";
import TableProductModel from "../TableProductModel";
import { authTokenClear, spinnerOverlayOffFn, spinnerOverlayOnFn, userInfoClear } from "../../../../Redux/ReducerAction";
import DataTable from "react-data-table-component";
import { PiMicrosoftExcelLogoDuotone } from "react-icons/pi";
import {
    Badge,
    Button,
    Checkbox,
    Input,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    PopoverTrigger,
    Portal,
    Select,
    Table,
    Tbody,
    Td,
    Th,
    Tr,
    useToast,
} from "@chakra-ui/react";
import { FilterByProductName } from "./FilterComponent";
import { customStyles } from "../../../../utils/customStylesDataTable";
import { convertProductArrayOfObjectsToCSV } from "../../../../utils/convertArrayToCsv";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const AllProducts = ({ userInfoReducer, tokenReducer }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();
    const [editData, setEditData] = useState("");
    const [catData, setCatData] = useState([]);
    const [colorData, setColorData] = useState([]);
    const [checkedColorData, setCheckedColorData] = useState([]);
    const [allProduct, setAllProducts] = useState([]);
    const [categoryIdx, setCategoryIdx] = useState(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isEditSaveLoading, setIsEditSaveLoading] = useState(false);
    const [isTableProductModelSaveLoading, setIsTableProductModelSaveLoading] = useState(false);
    const [newProductInfo, setNewProductInfo] = useState({
        product_name: "",
        sku_code: "",
        hsn_code: "",
        description: "",
        mrp: "",
        gst: "",
        seller_price: "",
        qty_in_hand: "",
        min_order_qty: "",
        lotSizeQty: "",
        sole: "",
        material: "",
        packing_type: "",
        made_in: "",
        weight: "",
        categoryId: "",
        subCatId: "",
        thumbnail_pic: "",
        multiple_pics: "",
    });
    const [activeTableModel, setActiveTableModel] = useState({
        flag: false,
        data: null,
    });
    const [filterText, setFilterText] = React.useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);

    function downloadCSV(array) {
        const link = document.createElement("a");
        let csv = convertProductArrayOfObjectsToCSV(array);
        if (csv == null) return;
        const filename = "products.csv";
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
    };

    const columns = [
        {
            name: "Img",
            selector: (row) => <img className=" object-contain h-12 w-12" src={row.thumbnail_pic} alt={row.product_name} />,
        },
        {
            name: "SKU CODE",
            selector: (row) => row.sku_code,
        },
        {
            name: <span className="whitespace-normal">Product Name</span>,
            selector: (row) => <span className="whitespace-normal">{row.product_name}</span>,
        },
        {
            name: "Brand",
            selector: (row) => <span className="whitespace-normal">{row.brandId.brand_name}</span>,
        },
        {
            name: "HSN code",
            selector: (row) => row.hsn_code,
        },
        {
            name: "Category",
            selector: (row) => <span className="whitespace-normal">{row.categoryId.category_name}</span>,
        },
        {
            name: <span className="whitespace-normal">Sub Category</span>,
            selector: (row) => row.subCatId.subcategory_name,
        },
        {
            name: <span className="whitespace-normal">Dt. Added</span>,
            selector: (row) => localDate(row.createdAt),
        },
        {
            name: "Seller Name",
            selector: (row) => row.vendor_id.firmName,
        },
        {
            name: "Status",
            selector: (row) => (
                <Badge py={1} variant={"solid"} colorScheme={row.status === "Approved" ? "whatsapp" : row.status === "Rejected" ? "red" : "facebook"}>
                    {row.status}
                </Badge>
            ),
        },
        {
            name: "Action",
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
    const logoutBtn = () => {
        dispatch(authTokenClear());
        dispatch(userInfoClear());
        navigate("/seller/login");
    };

    const getAllProduct = async () => {
        await allProductApi(tokenReducer)
            .then((res) => {
                console.log(res.data);
                setAllProducts((old) => {
                    let arr = res.data.data;
                    return arr;
                });
            })
            .catch((err) => {
                if (err.response && err.response.status === 401) {
                    // logoutBtn();
                    navigate('/seller/login');
                }
                console.log(err);
            });
    };
    const getAllColor = async () => {
        await getAllColorApi(tokenReducer)
            .then((res) => {
                setColorData(res.data.data);
            })
            .catch((error) => {
                console.log(error);
                alert("Error occurred!");
            });
    };
    const getAllCategory = async () => {
        await getAllCategoryApi(tokenReducer)
            .then((res) => {
                console.log(res.data);
                setCatData(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const updateProduct = async (data) => {
        console.log(data);
        if (data.newStatus === "Approved") {
            setIsTableProductModelSaveLoading(true);
            await changeProductStatusApi({ newStatus: data.newStatus, margin: data.marginGst.margin, sellingGST: data.marginGst.sellingGst }, data.productId, tokenReducer)
                .then((res) => {
                    setActiveTableModel({ flag: false, data: null });
                    // console.log(res.data);
                    getAllProduct();
                    toast({
                        title: "Success",
                        description: res.data.message,
                        isClosable: true,
                        position: "top",
                        status: "success",
                    });
                })
                .catch((err) => {
                    if (err.response && err.response.status === 401) {
                        logoutBtn();
                    }
                    console.log(err);
                    let message = err.response ? err.response.data.message : err.message;
                    toast({
                        title: "Error",
                        description: message,
                        isClosable: true,
                        position: "top",
                        status: "error",
                    });
                });
            setIsTableProductModelSaveLoading(false);
        } else {
            setIsTableProductModelSaveLoading(true);
            await changeProductStatusApi({ newStatus: data.newStatus }, data.productId, tokenReducer)
                .then((res) => {
                    setActiveTableModel({ flag: false, data: null });
                    console.log(res.data);
                    getAllProduct();
                    toast({
                        title: "Success",
                        description: res.data.message,
                        isClosable: true,
                        position: "top",
                        status: "success",
                    });
                })
                .catch((err) => {
                    console.log(err);
                    if (err.response && err.response.status === 401) {
                        logoutBtn();
                    }
                    let message = err.response ? err.response.data.message : err.message;
                    toast({
                        title: "Error",
                        description: message,
                        isClosable: true,
                        position: "top",
                        status: "error",
                    });
                });
            setIsTableProductModelSaveLoading(false);
        }
    };
    const changeStockStatusFn = async (data) => {
        dispatch(spinnerOverlayOnFn());
        await changeProductStockStatusApi({ newStockStatus: data.newStockStatus }, data.productId, tokenReducer)
            .then((res) => {
                setActiveTableModel({ flag: false, data: null });
                console.log(res.data);
                getAllProduct();
                alert(res.data.data.message);
            })
            .catch((err) => {
                if (err.response && err.response.status === 401) {
                    logoutBtn();
                }
                console.log(err);
            });
        dispatch(spinnerOverlayOffFn());
    };
    // const categoryChangeHandler = (category_id) => {

    // }
    const eyeBtn = (objId, obj) => {
        setActiveTableModel({ flag: true, data: obj });
        console.log(objId);
    };
    const editBtn = (objId, obj) => {
        console.log(obj);
        setEditData(obj);
        setIsEditOpen(true);
    };
    const deleteBtn = (objId) => {
        console.log(objId);
    };
    const filteredItems = allProduct.filter((item) => {
        let record = null;
        if (
            item.product_name.toLowerCase().includes(filterText.toLowerCase()) ||
            item.sku_code.includes(filterText.toLowerCase()) ||
            item.vendor_id.firmName.toLowerCase().includes(filterText.toLowerCase())
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
                <FilterByProductName onFilter={(e) => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
                {/* {console.log(filteredItems)} */}
                <Export onExport={() => downloadCSV(filteredItems)} />
            </div>
        );
    }, [filterText, filteredItems, resetPaginationToggle]);
    const selectedRows = (e) => {
        console.log(e);
    };
    const colorHandler = (flag, colorObj) => {
        console.log(flag, colorObj);
        if (flag) {
            setCheckedColorData((old) => {
                let arr = [...old];
                let idx = arr.findIndex((o) => o === colorObj._id);
                if (idx < 0) {
                    arr.push(colorObj._id);
                }
                return arr;
            });
        } else {
            setCheckedColorData((old) => {
                let arr = [...old];
                let idx = arr.findIndex((o) => o === colorObj._id);
                if (idx >= 0) {
                    arr.splice(idx, 1);
                }
                return arr;
            });
        }
    };
    const saveEditProductInfo = async (id) => {
        let formData = new FormData();
        for (let x of Object.keys(newProductInfo)) {
            if (x !== "multiple_pics") {
                if (newProductInfo[x]) {
                    formData.append(x, newProductInfo[x]);
                }
            } else {
                for (let y of newProductInfo[x]) {
                    formData.append(x, y);
                }
            }
        }
        for (let x of checkedColorData) {
            formData.append("color_id", x);
        }
        setIsEditSaveLoading(true);
        await updateProductApi(formData, id, tokenReducer)
            .then((res) => {
                toast({
                    title: "Success",
                    status: "success",
                    description: res.data.message,
                    isClosable: true,
                    position: "top",
                });
                cancelEditProductInfo();
                getAllProduct();
                setIsEditOpen(false);
            })
            .catch((err) => {
                console.log(err);
                if (err.response && err.response.status === 401) {
                    logoutBtn();
                }
                let message = err.response ? err.response.data.message : err.message;
                toast({
                    title: "Error",
                    status: "error",
                    description: message,
                    isClosable: true,
                    position: "top",
                });
            });
        setIsEditSaveLoading(false);
    };
    const cancelEditProductInfo = () => {
        setNewProductInfo({
            product_name: "",
            sku_code: "",
            hsn_code: "",
            description: "",
            mrp: "",
            gst: "",
            seller_price: "",
            qty_in_hand: "",
            min_order_qty: "",
            lotSizeQty: "",
            sole: "",
            material: "",
            packing_type: "",
            made_in: "",
            weight: "",
            categoryId: "",
            subCatId: "",
            thumbnail_pic: "",
            multiple_pics: "",
        });
        setCheckedColorData([]);
    };
    useEffect(() => {
        getAllProduct();
        getAllCategory();
        getAllColor();
    }, []);

    return (
        <div className="bg-gray-50 dark:bg-gray-800">
            <Modal size={"2xl"} isOpen={isEditOpen} onClose={() => setIsEditOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Product Info</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {editData && (
                            <div className="h-[450px] overflow-y-auto shadow-sm">
                                <Table>
                                    <Tbody>
                                        <Tr>
                                            <Th px={0} py={1} width={"150px"}>
                                                Product Name
                                            </Th>
                                            <Td p={1}>
                                                <Input
                                                    size={"xs"}
                                                    defaultValue={editData.product_name}
                                                    onChange={(e) =>
                                                        setNewProductInfo((old) => {
                                                            return { ...old, product_name: e.target.value };
                                                        })
                                                    }
                                                />
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Th px={0} py={1}>
                                                SKU CODE
                                            </Th>
                                            <Td p={1}>
                                                <Input
                                                    size={"xs"}
                                                    defaultValue={editData.sku_code}
                                                    onChange={(e) =>
                                                        setNewProductInfo((old) => {
                                                            return { ...old, sku_code: e.target.value };
                                                        })
                                                    }
                                                />
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Th px={0} py={1}>
                                                Category
                                            </Th>
                                            <Td p={1}>
                                                <Select
                                                    size={"xs"}
                                                    defaultValue={editData.categoryId._id}
                                                    onChange={(e) => {
                                                        setNewProductInfo((old) => {
                                                            return { ...old, categoryId: e.target.value };
                                                        });
                                                        setCategoryIdx(e.target.selectedIndex);
                                                    }}
                                                >
                                                    {catData.map((el) => (
                                                        <option key={el._id} value={el._id}>
                                                            {el.category_name}
                                                        </option>
                                                    ))}
                                                </Select>
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Th px={0} py={1}>
                                                Sub Category
                                            </Th>
                                            <Td p={1}>
                                                <Select
                                                    placeholder="Select Category"
                                                    size={"xs"}
                                                    defaultValue={editData.subCatId._id}
                                                    onChange={(e) =>
                                                        setNewProductInfo((old) => {
                                                            return { ...old, subCatId: e.target.value };
                                                        })
                                                    }
                                                >
                                                    {categoryIdx !== null &&
                                                        catData[categoryIdx].sub_category.map((el) => (
                                                            <option key={el._id} value={el._id}>
                                                                {el.subcategory_name}
                                                            </option>
                                                        ))}
                                                </Select>
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Th px={0} py={1}>
                                                Lot Size
                                            </Th>
                                            <Td p={1}>
                                                <Input
                                                    size={"xs"}
                                                    onChange={(e) =>
                                                        setNewProductInfo((old) => {
                                                            return { ...old, lotSizeQty: e.target.value };
                                                        })
                                                    }
                                                />
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Th px={0} py={1}>
                                                Color
                                            </Th>
                                            <Td p={1}>
                                                <Menu>
                                                    <MenuButton p={0} px={2} fontSize={12} width={"full"} borderRadius={2} textAlign={"start"} transition="all 0.2s" borderWidth={1}>
                                                        Color Select <ChevronDownIcon />
                                                    </MenuButton>
                                                    <MenuList className="flex flex-col">
                                                        {colorData.map((el) => (
                                                            <Checkbox className="px-2 py-1 hover:bg-teal-50" onChange={(e) => colorHandler(e.target.checked, el)}>
                                                                <div className="flex items-center justify-start">
                                                                    <span className={"h-4 w-4 rounded border border-teal-100 me-1"} style={{ backgroundColor: el.colorHex }}></span>
                                                                    <span>{el.colorName}</span>
                                                                </div>{" "}
                                                            </Checkbox>
                                                        ))}
                                                    </MenuList>
                                                </Menu>
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Th px={0} py={1}>
                                                Mrp
                                            </Th>
                                            <Td p={1}>
                                                <Input
                                                    size={"xs"}
                                                    defaultValue={editData.mrp}
                                                    onChange={(e) =>
                                                        setNewProductInfo((old) => {
                                                            return { ...old, mrp: e.target.value };
                                                        })
                                                    }
                                                />
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Th px={0} py={1}>
                                                GST in %
                                            </Th>
                                            <Td p={1}>
                                                <Input
                                                    size={"xs"}
                                                    defaultValue={editData.gst}
                                                    onChange={(e) =>
                                                        setNewProductInfo((old) => {
                                                            return { ...old, gst: e.target.value };
                                                        })
                                                    }
                                                />
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Th px={0} py={1}>
                                                Seller Price
                                            </Th>
                                            <Td p={1}>
                                                <Input
                                                    size={"xs"}
                                                    defaultValue={editData.seller_price}
                                                    onChange={(e) =>
                                                        setNewProductInfo((old) => {
                                                            return { ...old, seller_price: e.target.value };
                                                        })
                                                    }
                                                />
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Th px={0} py={1}>
                                                In hand QTY
                                            </Th>
                                            <Td p={1}>
                                                <Input
                                                    size={"xs"}
                                                    defaultValue={editData.qty_in_hand}
                                                    onChange={(e) =>
                                                        setNewProductInfo((old) => {
                                                            return { ...old, qty_in_hand: e.target.value };
                                                        })
                                                    }
                                                />
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Th px={0} py={1}>
                                                Minimum Order
                                            </Th>
                                            <Td p={1}>
                                                <Input
                                                    size={"xs"}
                                                    defaultValue={editData.min_order_qty}
                                                    onChange={(e) =>
                                                        setNewProductInfo((old) => {
                                                            return { ...old, min_order_qty: e.target.value };
                                                        })
                                                    }
                                                />
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Th px={0} py={1}>
                                                Sole
                                            </Th>
                                            <Td p={1}>
                                                <Input
                                                    size={"xs"}
                                                    defaultValue={editData.sole}
                                                    onChange={(e) =>
                                                        setNewProductInfo((old) => {
                                                            return { ...old, sole: e.target.value };
                                                        })
                                                    }
                                                />
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Th px={0} py={1}>
                                                Material
                                            </Th>
                                            <Td p={1}>
                                                <Input
                                                    size={"xs"}
                                                    defaultValue={editData.material}
                                                    onChange={(e) =>
                                                        setNewProductInfo((old) => {
                                                            return { ...old, material: e.target.value };
                                                        })
                                                    }
                                                />
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Th px={0} py={1}>
                                                Packing Type
                                            </Th>
                                            <Td p={1}>
                                                <Input
                                                    size={"xs"}
                                                    defaultValue={editData.packing_type}
                                                    onChange={(e) =>
                                                        setNewProductInfo((old) => {
                                                            return { ...old, packing_type: e.target.value };
                                                        })
                                                    }
                                                />
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Th px={0} py={1}>
                                                Made In
                                            </Th>
                                            <Td p={1}>
                                                <Input
                                                    size={"xs"}
                                                    defaultValue={editData.made_in}
                                                    onChange={(e) =>
                                                        setNewProductInfo((old) => {
                                                            return { ...old, made_in: e.target.value };
                                                        })
                                                    }
                                                />
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Th px={0} py={1}>
                                                Weight
                                            </Th>
                                            <Td p={1}>
                                                <Input
                                                    size={"xs"}
                                                    defaultValue={editData.weight}
                                                    onChange={(e) =>
                                                        setNewProductInfo((old) => {
                                                            return { ...old, weight: e.target.value };
                                                        })
                                                    }
                                                />
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Th px={0} py={1}>
                                                Description
                                            </Th>
                                            <Td p={1}>
                                                <Input
                                                    size={"xs"}
                                                    defaultValue={editData.description}
                                                    onChange={(e) =>
                                                        setNewProductInfo((old) => {
                                                            return { ...old, description: e.target.value };
                                                        })
                                                    }
                                                />
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Th px={0} py={1}>
                                                Thumbnail Image
                                            </Th>
                                            <Td p={1}>
                                                <Input
                                                    size={"sm"}
                                                    type="file"
                                                    multiple={false}
                                                    onChange={(e) =>
                                                        setNewProductInfo((old) => {
                                                            return { ...old, thumbnail_pic: e.target.files[0] };
                                                        })
                                                    }
                                                />
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Th px={0} py={1}>
                                                Multiple Image
                                            </Th>
                                            <Td p={1}>
                                                <Input
                                                    size={"sm"}
                                                    type="file"
                                                    multiple={true}
                                                    onChange={(e) =>
                                                        setNewProductInfo((old) => {
                                                            return { ...old, multiple_pics: e.target.files };
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
                        <Button onClick={() => saveEditProductInfo(editData._id)} isLoading={isEditSaveLoading} loadingText={"Please wait"} size={"sm"} mr={3} colorScheme="yellow">
                            Save Changes
                        </Button>
                        <Button
                            size={"sm"}
                            colorScheme="red"
                            variant={"outline"}
                            onClick={() => {
                                setIsEditOpen(false);
                                cancelEditProductInfo();
                            }}
                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            {activeTableModel.flag && (
                <TableProductModel
                    isTableProductModelSaveLoading={isTableProductModelSaveLoading}
                    save={updateProduct}
                    details={activeTableModel.data}
                    changeStatusHandler={changeStockStatusFn}
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
};

export default AllProducts;
