import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuEye } from "react-icons/lu";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { TbDots } from "react-icons/tb";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { allProductApi, changeProductStatusApi, changeProductStockStatusApi } from "../../../../apis/adminApis";
import { localDate } from "../../../../utils/stringToLocalDate";
import TableActionModel from "../TableActionModel";
import TableProductModel from "../TableProductModel";
import { spinnerOverlayOffFn, spinnerOverlayOnFn } from "../../../../Redux/ReducerAction";
import DataTable from "react-data-table-component";
import { PiMicrosoftExcelLogoDuotone } from "react-icons/pi";
import { Badge, Button, Checkbox, Input, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Portal } from "@chakra-ui/react";
import { FilterByProductName } from "./FilterComponent";
import { customStyles } from "../../../../utils/customStylesDataTable";
import { convertProductArrayOfObjectsToCSV } from "../../../../utils/convertArrayToCsv";

const AllProducts = ({ userInfoReducer, tokenReducer }) => {
    const dispatch = useDispatch();
    const [allProduct, setAllProducts] = useState([]);
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
        selectAllRowsItem: true,
        selectAllRowsItemText: "HSN code",
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
            selector: (row) => <Badge py={1} variant={'solid'}>{row.status}</Badge>,
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
                                    {/* {userInfoReducer.userType !== "Seller" && (
                                        <>
                                            <MdEdit size={30} color="blue" className="m-2 cursor-pointer" title="Edit Product" onClick={() => editBtn(row._id)} />
                                            <MdDeleteOutline size={30} color="red" className="m-2 cursor-pointer" title="Delete" onClick={() => deleteBtn(row._id)} />
                                        </>
                                    )} */}
                                </div>
                            </PopoverBody>
                        </PopoverContent>
                    </Portal>
                </Popover>
            ),
        },
    ];

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
                console.log(err);
            });
    };

    const updateProduct = async (data) => {
        dispatch(spinnerOverlayOnFn());
        if (data.newStatus === "Approved") {
            await changeProductStatusApi({ newStatus: data.newStatus, margin: data.marginGst.margin, sellingGST: data.marginGst.sellingGst }, data.productId, tokenReducer)
                .then((res) => {
                    setActiveTableModel({ flag: false, data: null });
                    // console.log(res.data);
                    getAllProduct();
                    alert(res.data.message);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            await changeProductStatusApi({ newStatus: data.newStatus }, data.productId, tokenReducer)
                .then((res) => {
                    setActiveTableModel({ flag: false, data: null });
                    console.log(res.data);
                    getAllProduct();
                    alert(res.data.data.message);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        dispatch(spinnerOverlayOffFn());
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
                console.log(err);
            });
        dispatch(spinnerOverlayOffFn());
    };
    const eyeBtn = (objId, obj) => {
        setActiveTableModel({ flag: true, data: obj });
        console.log(objId);
    };
    const editBtn = (objId) => {
        console.log(objId);
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
                {console.log(filteredItems)}
                <Export onExport={() => downloadCSV(filteredItems)} />
            </div>
        );
    }, [filterText, filteredItems, resetPaginationToggle]);
    const selectedRows = (e) => {
        console.log(e);
    };
    useEffect(() => {
        getAllProduct();
    }, []);

    return (
        <div className="bg-gray-50 dark:bg-gray-800">
            {activeTableModel.flag && (
                <TableProductModel
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
