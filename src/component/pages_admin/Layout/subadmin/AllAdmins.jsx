import React, {useEffect, useState} from 'react';
import {localDate} from "../../../../utils/stringToLocalDate";
import {BsThreeDotsVertical} from "react-icons/bs";
import {LuEye} from "react-icons/lu";
import {MdDeleteOutline, MdEdit, MdClose} from "react-icons/md";
import {getAllSubAdmins} from "../../../../apis/adminApis";
import {useSelector} from "react-redux";
import TableActionModel from "../TableActionModel";

function AllAdmins(props) {
    const [allAdmins, setAllAdmins] = useState([]);
    const {tokenReducer} = useSelector((state) => state);
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

    const eyeBtn = (objId) => {
        console.log(objId)
    }
    const editBtn = (objId) => {
        console.log(objId)
    }
    const deleteBtn = (objId) => {
        console.log(objId)
    }

    const updatedTable = () => {
        return allAdmins.map((el, i) => (
            <tr key={el._id} className="border-b dark:border-neutral-500">
                <td className="whitespace-nowrap border-r px-6 py-2 font-medium dark:border-neutral-500">
                    {i + 1}
                </td>
                <td className="whitespace-nowrap border-r px-6 py-2 dark:border-neutral-500">
                    {el.name}
                </td>
                <td className="whitespace-nowrap border-r px-6 py-2 dark:border-neutral-500">
                    {el.email}
                </td>
                <td className="whitespace-nowrap border-r px-6 py-2 dark:border-neutral-500">
                    {el.phone}
                </td>
                <td className="whitespace-nowrap border-r px-6 py-2 dark:border-neutral-500">
                    {el.gender}
                </td>
                <td className="whitespace-nowrap border-r px-6 py-2 dark:border-neutral-500">
                    {localDate(el.createdAt)}
                </td>
                <td className="whitespace-nowrap border-r px-6 py-2 dark:border-neutral-500">
                    <ul>
                        {
                            el.role.map((role, roleI) => (
                                <li key={`${roleI}_rolesIntable`}
                                    className={`p-1 my-1 rounded-sm bg-emerald-400 dark:bg-green-950  font-semibold`}>{role}</li>
                            ))
                        }
                    </ul>
                </td>
                <td className="whitespace-nowrap px-6 py-2 flex">
                    <div tabIndex="0" className="group relative inline-block ">
                        <button className="focus:outline-none">
                            <BsThreeDotsVertical
                                size={35}
                                className=" border dark:border-neutral-500 cursor-pointer py-1 rounded-md hover:bg-teal-100 dark:hover:bg-teal-800"
                            />
                        </button>
                        <div
                            className="hidden group-focus-within:block items-center dark:border-neutral-500 rounded-md p-1 list-none absolute border dark:bg-teal-800 bg-teal-100 right-10 top-0 z-1 shadow-lg animate-slideIn">
                            <div className="flex">
                                <LuEye

                                    size={30}
                                    className="m-2 cursor-pointer"
                                    title="Information"
                                    onClick={(e) => eyeBtn(el._id)}
                                />
                                <MdEdit
                                    size={30}
                                    className="m-2 cursor-pointer"
                                    title="Edit Product"
                                    onClick={(e) => editBtn(el._id)}
                                />
                                <MdDeleteOutline
                                    size={30}
                                    className="m-2 cursor-pointer"
                                    title="Delete"
                                    onClick={(e) => deleteBtn(el._id)}
                                />
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
            
            <div>
                <div className="inline-block min-w-full py-2">
                    <div className="">
                        <table
                            className="min-w-full bg-white dark:bg-gray-800 border text-start text-sm font-light dark:border-neutral-500">
                            <thead className="border-b font-medium dark:border-neutral-500">
                            <tr>
                                <th
                                    scope="col"
                                    className="border-r w-[20px] px-6 py-3 dark:border-neutral-500"
                                >
                                    #
                                </th>
                                <th
                                    scope="col"
                                    className="border-r px-6 py-3 dark:border-neutral-500 text-start"
                                >
                                    Name
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 border-r dark:border-neutral-500 text-start"
                                >
                                    Email
                                </th>
                                <th
                                    scope="col"
                                    className="border-r px-6 py-3 dark:border-neutral-500 text-start"
                                >
                                    Phone
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 border-r dark:border-neutral-500 text-start"
                                >
                                    Gender
                                </th>
                                <th
                                    scope="col"
                                    className="border-r px-6 py-3 dark:border-neutral-500 text-start"
                                >
                                    Dt. Added
                                </th>
                                <th
                                    scope="col"
                                    className="border-r px-6 py-3 dark:border-neutral-500 text-start"
                                >
                                    Role
                                </th>

                                <th
                                    scope="col"
                                    className="px-6 w-1 py-3 border-r dark:border-neutral-500 text-start"
                                >
                                    Action
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {allAdmins.length > 0 && updatedTable()}
                            </tbody>
                        </table>
                    </div>
                   
                </div>
            </div>
        </div>
    );
}

export default AllAdmins;