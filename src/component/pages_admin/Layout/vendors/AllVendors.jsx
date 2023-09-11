import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdClose, MdDeleteOutline, MdEdit } from "react-icons/md";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { LuEye } from "react-icons/lu";
import { TbDots } from "react-icons/tb";
import { CiSearch } from "react-icons/ci";
import { deleteVendorApi, getAllVentorApi, verifyVendorApi } from "../../../../apis/adminApis";
import { localDate } from "../../../../utils/stringToLocalDate";
import TableActionModel from "../TableActionModel";
import { useDispatch } from "react-redux";
import { spinnerOverlayOffFn, spinnerOverlayOnFn } from "../../../../Redux/ReducerAction";
import { Badge, Button, Popover, PopoverBody, PopoverContent, PopoverTrigger, Portal, useToast } from "@chakra-ui/react";
import DataTable from "react-data-table-component";
import { PiMicrosoftExcelLogoDuotone } from "react-icons/pi";
import { FilterByVendorName } from "./FilterComponent";
import { customStyles } from "../../../../utils/customStylesDataTable";
import { convertVendorArrayOfObjectsToCSV } from "../../../../utils/convertArrayToCsv";
function AllVendors({ tokenReducer }) {
    const toast = useToast();
    const [allVendors, setAllVendors] = useState([]);
    const dispatch = useDispatch();
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
            name: "Vendor ID",
            selector: (row) => row.vendor_unique_id,
            width: "120px"
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
            width: "100px"
        },
        {
            name: "Mobile Number",
            selector: (row) => <span className="whitespace-normal">{row.mobileNo}</span>,
            width: "150px"
        },
        {
            name: <span className="whitespace-normal">Email ID</span>,
            selector: (row) => <span className="whitespace-normal">{row.emailId}</span>
        },
        {
            name: <span className="whitespace-normal">Dt. Added</span>,
            selector: (row) => localDate(row.createdAt),
            width:'130px'
        },
        {
            name: <span className="whitespace-normal">Approved By</span>,
            selector: (row) => row.actionTakenBy ? row.actionTakenBy.name: "NoAction",
        },
        {
            name: "Status",
            selector: (row) => <Badge py={1} variant={'solid'}>{row.status}</Badge>,
            width: "130px"
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
                {console.log(filteredItems)}
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
        dispatch(spinnerOverlayOnFn());
        await verifyVendorApi(data, tokenReducer, id)
            .then((res) => {
                console.log(res.data);
                alert("vendor updated");
                getAllVendorFn();
                setActiveTableModel({ flag: false, data: null });
            })
            .catch((err) => {
                alert(err.message);
                console.log(err.message);
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
    const deleteBtn = async (objId) => {
        console.log(objId);
        if(window.confirm("Are you sure? You can't undo this action afterwards.")){
            await deleteVendorApi(objId, tokenReducer).then(res => {
                toast({
                    title:'Delete',
                    description:res.data.message,
                    isClosable:true,
                    status:'success',
                    position:'top'
                })
                getAllVendorFn();
            }).catch(err => {
                toast({
                    title:'Delete',
                    description:err.message,
                    isClosable:true,
                    status:'error',
                    position:'top'
                })
            })
        }
    };
    useEffect(() => {
        getAllVendorFn();
    }, []);
    return (
        <div className="bg-gray-50 dark:bg-gray-800">
            {activeTableModel.flag && (
                <TableActionModel
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
