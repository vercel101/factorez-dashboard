import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdClose, MdDeleteOutline, MdEdit } from "react-icons/md";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { LuEye } from "react-icons/lu";
import { TbDots } from "react-icons/tb";
import ReactPaginate from "react-paginate";
import { CiSearch } from "react-icons/ci";
import { deleteVendorApi, getAllVentorApi, verifyVendorApi } from "../../../../apis/adminApis";
import { localDate } from "../../../../utils/stringToLocalDate";
import TableActionModel from "../TableActionModel";
import { useDispatch, useSelector } from "react-redux";
import { spinnerOverlayOffFn, spinnerOverlayOnFn } from "../../../../Redux/ReducerAction";
import { useToast } from "@chakra-ui/react";
function AllVendors({ tokenReducer }) {
    const toast = useToast();
    const [allVendors, setAllVendors] = useState([]);
    const dispatch = useDispatch();
    const [activeTableModel, setActiveTableModel] = useState({
        flag: false,
        data: null,
    });
    const [data, setData] = useState([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 1, 2, 3, 4, 5, 6,
        7, 8, 9, 10, 11, 12, 13, 14, 15, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    ]);
    let size = 5;
    const pageCount = Math.ceil(data.length / size);
    const handlePageClick = (event) => {};

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

    const updatedTable = () => {
        return allVendors.map((el, i) => (
            <tr key={el._id} className="border-b dark:border-neutral-500">
                <td className="whitespace-nowrap border-r w-1 p-3 font-medium dark:border-neutral-500">
                    <input type="checkbox" name="" id="" className="scale-150" />
                </td>
                <td className="whitespace-nowrap border-r px-6 py-2 font-medium dark:border-neutral-500">{i + 1}</td>
                <td className="whitespace-nowrap border-r px-6 py-2 dark:border-neutral-500 border">{el.vendor_unique_id}</td>
                <td className="whitespace-nowrap border-r px-6 py-2 dark:border-neutral-500">{el.firmName}</td>
                <td className="whitespace-nowrap border-r px-6 py-2 dark:border-neutral-500">{el.representativeName}</td>
                <td className="whitespace-nowrap border-r px-6 py-2 dark:border-neutral-500">{el.marginInPercentage && el.marginInPercentage}</td>
                <td className="whitespace-nowrap border-r px-6 py-2 dark:border-neutral-500">{el.mobileNo}</td>
                <td className="whitespace-nowrap border-r px-6 py-2 dark:border-neutral-500">{el.emailId}</td>
                <td className="whitespace-nowrap border-r px-6 py-2 dark:border-neutral-500">{localDate(el.createdAt)}</td>
                <td className="whitespace-nowrap border-r px-6 py-2 dark:border-neutral-500">{el.actionTakenBy ? el.actionTakenBy.name : "NoAction"}</td>
                <td className="whitespace-nowrap border-r px-6 py-2 dark:border-neutral-500">{el.status}</td>
                <td className="whitespace-nowrap group relative px-6 py-2 flex">
                    <div tabIndex="0" className="group relative inline-block ">
                        <button className="focus:outline-none">
                            <BsThreeDotsVertical size={35} className=" border dark:border-neutral-500 cursor-pointer py-1 rounded-md hover:bg-teal-100 dark:hover:bg-teal-800" />
                        </button>
                        <div className="hidden group-focus-within:block items-center dark:border-neutral-500 rounded-md p-1 list-none absolute border dark:bg-teal-800 bg-teal-100 right-10 top-0 z-1 shadow-lg animate-slideIn">
                            <div className="flex">
                                <LuEye size={30} className="m-2 cursor-pointer" title="Information" onClick={(e) => eyeBtn(el._id, el)} />
                                {/* <MdEdit
                                    size={30}
                                    className="m-2 cursor-pointer"
                                    title="Edit Product"
                                    onClick={(e) => editBtn(el._id)}
                                /> */}
                                <MdDeleteOutline size={30} className="m-2 cursor-pointer" title="Delete" onClick={(e) => deleteBtn(el._id)} />
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        ));
    };

    useEffect(() => {
        getAllVendorFn();
    }, []);
    return (
        <div className=" p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            {activeTableModel.flag && (
                <TableActionModel
                    changeHandler={viewHandleChange}
                    save={updateVendor}
                    details={activeTableModel.data}
                    actionClose={() => setActiveTableModel({ data: null, flag: false })}
                />
            )}

            <div className="flex justify-start items-center text-sm">
                <select name="" id="" className="outline-none bg-white dark:bg-teal-800 px-3 py-1 rounded-s-full border">
                    <option value="">Status</option>
                    <option value="">All</option>
                    <option value="">Approved</option>
                    <option value="">Pending</option>
                    <option value="">InProgress</option>
                </select>
                <select name="" id="" className="outline-none bg-white px-3 py-1 dark:bg-teal-800 border border-s-0">
                    <option value="">Test vendor 1</option>
                    <option value="">Test vendor 2</option>
                    <option value="">Test vendor 3</option>
                    <option value="">Test vendor 4</option>
                </select>
                <select name="" id="" className="outline-none bg-white px-3 py-1 border dark:bg-teal-800 border-s-0 rounded-e-full">
                    <option value="">Test vendor 1</option>
                    <option value="">Test vendor 2</option>
                    <option value="">Test vendor 3</option>
                    <option value="">Test vendor 4</option>
                </select>
                <div className="w-[300px] ms-5 rounded-full bg-white dark:bg-teal-800 border flex justify-between items-center">
                    <input type="search" placeholder="Search..." className="outline-none mx-3 w-full text-base" />
                    <button className="bg-teal-200 rounded-e-full py-1 px-2">
                        <CiSearch size={20} color="blue" />
                    </button>
                </div>
            </div>

            <div className="mt-10">
                <div className="flex flex-col">
                    <div className="overflow-x-auto">
                        <div className="inline-block min-w-full py-2 ">
                            <div className="">
                                <table className="min-w-full bg-white dark:bg-gray-800 border text-start text-sm font-light dark:border-neutral-500">
                                    <thead className="border-b font-medium dark:border-neutral-500">
                                        <tr>
                                            <th scope="col" className="border-r w-1 p-3 dark:border-neutral-500 ">
                                                <input type="checkbox" name="" id="" className="scale-150 " />
                                            </th>
                                            <th scope="col" className="border-r w-[20px] px-6 py-3 dark:border-neutral-500">
                                                #
                                            </th>
                                            <th scope="col" className="border-r px-6 py-3 dark:border-neutral-500 text-start">
                                                Vendor ID
                                            </th>
                                            <th scope="col" className="border-r px-6 py-3 dark:border-neutral-500 text-start">
                                                Firm Name
                                            </th>
                                            <th scope="col" className="px-6 py-3 border-r dark:border-neutral-500 text-start">
                                                Name
                                            </th>
                                            <th scope="col" className="px-6 py-3 border-r dark:border-neutral-500 text-start">
                                                Margin %
                                            </th>
                                            <th scope="col" className="border-r px-6 py-3 dark:border-neutral-500 text-start">
                                                Mobile Number
                                            </th>
                                            <th scope="col" className="px-6 py-3 border-r dark:border-neutral-500 text-start">
                                                Email ID
                                            </th>
                                            <th scope="col" className="border-r px-6 py-3 dark:border-neutral-500 text-start">
                                                Dt. Added
                                            </th>
                                            <th scope="col" className="border-r px-6 py-3 dark:border-neutral-500 text-start">
                                                Approved By
                                            </th>

                                            <th scope="col" className="border-r px-6 py-3 dark:border-neutral-500 text-start">
                                                Status
                                            </th>

                                            <th scope="col" className="px-6 w-1 py-3 border-r dark:border-neutral-500 text-start">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>{allVendors.length > 0 && updatedTable()}</tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 flex justify-between items-center">
                        <div className="flex items-center">
                            <input
                                type="text"
                                placeholder="page"
                                className="h-12 w-20 outline-none text-center border dark:border-teal-500 dark:bg-teal-800 text-lg font-semibold"
                            />
                            <button type="text" className="h-12 w-12 dark:bg-teal-500 bg-teal-200 text-center">
                                Go!
                            </button>
                        </div>
                        <ReactPaginate
                            breakLabel={<TbDots size={20} />}
                            nextLabel={<AiFillCaretRight />}
                            breakClassName="h-8 w-12 border dark:border-neutral-500"
                            className="flex justify-center items-center select-none"
                            pageClassName="h-8 w-12 border dark:border-neutral-500"
                            previousClassName="h-8 w-12 border dark:border-neutral-500"
                            nextClassName="h-8 w-12 border dark:border-neutral-500"
                            activeClassName="bg-[#ddd] dark:bg-teal-800"
                            disabledLinkClassName="bg-black dark:bg-white"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={pageCount}
                            previousLabel={<AiFillCaretLeft />}
                            renderOnZeroPageCount={null}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AllVendors;
