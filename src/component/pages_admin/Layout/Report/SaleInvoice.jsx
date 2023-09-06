import React from "react";
import { localDate } from "../../../../utils/stringToLocalDate";
import { useEffect } from "react";
import { useState } from "react";
import { downloadInvoiceByInvoiceNumberApi, getAllSaleInvoiceApi } from "../../../../apis/adminApis";
import { ImFilePdf } from "react-icons/im";
import { useDispatch } from "react-redux";
import { spinnerOverlayOffFn, spinnerOverlayOnFn } from "../../../../Redux/ReducerAction";
import { isRoleExists } from "../../../../utils/checkRole";
import { useToast } from "@chakra-ui/react";

const SaleInvoice = ({ userInfoReducer, tokenReducer }) => {
    const toast = useToast();
    const dispatch = useDispatch();
    const [invData, setInvdata] = useState([]);
    const getInvoice = async () => {
        await getAllSaleInvoiceApi(tokenReducer)
            .then((res) => {
                console.log(res.data);
                setInvdata(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const downloadPdfFn = async (invoiceNumber) => {
        dispatch(spinnerOverlayOnFn());
        await downloadInvoiceByInvoiceNumberApi(invoiceNumber, "SALE", tokenReducer)
            .then((res) => {
                let blob = res.data;
                const url = window.URL.createObjectURL(new Blob([blob], { type: "application/pdf" }));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", `${invoiceNumber}.pdf`);

                // Append to html link element page
                document.body.appendChild(link);

                // Start download
                link.click();

                // Clean up and remove the link
                link.parentNode.removeChild(link);
                toast({
                    title: "Invoice Downloaded",
                    status: "success",
                    position: "top",
                    isClosable: true,
                });
            })
            .catch((err) => {
                console.log(err.message);
                toast({
                    title: "Error in downloading",
                    status: "error",
                    position: "top",
                    isClosable: true,
                });
            });
        dispatch(spinnerOverlayOffFn());
    };

    useEffect(() => {
        getInvoice();
    }, []);
    return (
        <div>
            <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Invoice number
                            </th>
                            {(userInfoReducer.userType === "Super Admin" || userInfoReducer.userType === "Admin")  && (
                                <th scope="col" class="px-6 py-3">
                                    Seller name
                                </th>
                            )}
                            <th scope="col" class="px-6 py-3">
                                Buyer name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Invoice Date
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Amount
                            </th>
                            <th scope="col" class="px-6 py-3">
                                PDF
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Satus
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {invData.length > 0 ? (
                            invData.map((el, i) => (
                                <tr key={el._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td className="px-6 py-3">{el.invoiceNo}</td>
                                    {(userInfoReducer.userType === "Super Admin" || userInfoReducer.userType === "Admin") && <td className="px-6 py-3">{el.soldBy.name}</td>}
                                    <td className="px-6 py-3">{el.billingAddress.name}</td>
                                    <td className="px-6 py-3">{localDate(el.invoiceDate)}</td>
                                    <td className="px-6 py-3">{el.totalAmount + el.gstAmount}</td>
                                    <td className="px-6 py-3">
                                        <button
                                            className="inline-flex items-center py-1 px-2 rounded space-x-3 border bg-slate-100 dark:bg-slate-500 dark:border-gray-700 text-red-400"
                                            onClick={() => downloadPdfFn(el.invoiceNo)}
                                        >
                                            <ImFilePdf size={20} />
                                            <span>Download</span>
                                        </button>
                                    </td>
                                    <td className="px-6 py-3">
                                        <div
                                            className={`text-center rounded text-xs p-1 text-white ${
                                                el.invoiceStatus === "PAID" ? "bg-green-500" : el.invoiceStatus === "UNPAID" ? "bg-[#637381]" : "bg-red-500"
                                            }`}
                                        >
                                            {el.invoiceStatus.charAt(0) + el.invoiceStatus.slice(1).toLowerCase()}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className="bg-white  dark:bg-gray-800 dark:border-gray-700">No record found...</tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SaleInvoice;
