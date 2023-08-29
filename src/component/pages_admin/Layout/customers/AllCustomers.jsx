import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { blockCustomerByIdApi, deleteCustomerByIdApi, getAllCustomerAPi } from "../../../../apis/adminApis";
import { toast } from "react-toastify";
import { localDate } from "../../../../utils/stringToLocalDate";

const AllCustomers = ({ tokenReducer }) => {
    const [customers, setCustomers] = useState([]);

    const getAllCustomer = async () => {
        await getAllCustomerAPi(tokenReducer)
            .then((res) => {
                console.log(res.data);
                setCustomers(res.data.data);
            })
            .catch((err) => {
                console.log(err);
                toast.error("something went wrong");
            });
    };
    const deleteCustomer = async (customerId) => {
        if (window.confirm("After delete It cannot be undone.")) {
            await deleteCustomerByIdApi(customerId, tokenReducer)
                .then((res) => {
                    console.log(res.data);
                    toast.success(res.data.message);
                    getAllCustomer();
                })
                .catch((err) => {
                    console.log(err);
                    toast.error("something went wrong!");
                });
        }
    };

    const blockCustomer = async (customerId) => {
        if (window.confirm("Are you sure!")) {
            await blockCustomerByIdApi(customerId, tokenReducer)
                .then((res) => {
                    console.log(res.data);
                    toast.success(res.data.message);
                    getAllCustomer();
                })
                .catch((err) => {
                    console.log(err);
                    toast.error("something went wrong");
                });
        }
    };

    useEffect(() => {
        getAllCustomer().then();
    }, []);
    return (
        <div>
            <table className={`w-full text-sm text-left text-gray-500 dark:text-gray-400`}>
                <thead className={`text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400`}>
                    <tr>
                        <th scope="col" className="ps-1 py-3">
                            #
                        </th>
                        <th scope="col" className="ps-1 py-3">
                            Name
                        </th>
                        <th scope="col" className="ps-1 py-3">
                            Gender
                        </th>
                        <th scope="col" className="ps-1 py-3">
                            DOB
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
                                <td className={`ps-1 border-e py-1`}>{el.gender}</td>
                                <td className={`ps-1 border-e py-1`}>{localDate(el.DOB)}</td>
                                <td className={`ps-1 border-e py-1`}>{el.gstNo}07AAGFF2194N1Z1</td>
                                <td className={`ps-1 border-e py-1`}>{el.email}</td>
                                <td className={`ps-1 border-e py-1`}>{el.phone}</td>
                                <td className={`ps-1 border-e py-1`}>{el.defaultAddress ? el.defaultAddress.address : ""}</td>
                                <td className={`ps-1 border-e py-1`}>
                                    <select
                                        value={el.isBlocked ? "suspended" : "active"}
                                        name=""
                                        id=""
                                        onChange={(e) => blockCustomer(el._id)}
                                        className={`border rounded outline-none dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`}>
                                        <option value="active">Active</option>
                                        <option value="suspended">Suspended</option>
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
