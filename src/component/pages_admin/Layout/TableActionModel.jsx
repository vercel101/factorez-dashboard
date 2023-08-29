import React, {useState} from 'react';
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import {MdClose, MdDeleteOutline, MdEdit} from "react-icons/md";
import {BsFiletypeDoc} from 'react-icons/bs';
import {verifyVendorApi} from "../../../apis/adminApis";

const TableActionModel = ({details, actionClose, save, changeHandler, vendorHandler}) => {

    const [basicDetailStatus, setBasicDetailStatus] = useState(null);
    const [documentStatus, setDocumentStatus] = useState(null);
    const [bankStatus, setBankStatus] = useState(null);
    const [vendorStatus, setVendorStatus] = useState(null);

    console.log(details);


    const saveFn = () => {
        let data = {
            basicDetailStatus: basicDetailStatus,
            documentStatus: documentStatus,
            bankStatus: bankStatus,
            vendorStatus: vendorStatus,
        };
        if (vendorStatus !== null) {
            if (vendorStatus !== 'Approved') {
                if (basicDetailStatus === null || basicDetailStatus !== 'Approved') {
                    alert('Basic Details Status should be approved, only after you can approve vendor');
                } else if (documentStatus === null || documentStatus !== 'Approved') {
                    alert('Document Details Status should be approved, only after you can approve vendor');
                } else if (bankStatus === null ) {
                    alert('Bank Details Status should be approved, only after you can approve vendor');
                } else {
                    save(data, details._id);
                }
            }else if (vendorStatus !== 'Rejected'){
                if (basicDetailStatus === null || basicDetailStatus !== 'Approved') {
                    alert('Basic Details Status should be approved, only after you can approve vendor');
                } else if (documentStatus === null || documentStatus !== 'Approved') {
                    alert('Document Details Status should be approved, only after you can approve vendor');
                } else if (bankStatus === null || bankStatus !== 'Approved' ) {
                    alert('Bank Details Status should be approved, only after you can approve vendor');
                } else {
                    save(data,  details._id);
                }
            }else{
                alert('Change status');
            }
        } else {
            if(basicDetailStatus === null && documentStatus === null && bankStatus === null){
                alert("Can not save without any changes");
            }else{
                save(data,  details._id);
            }
        }
    }


    return (
        <div className={`fixed z-20 top-0 left-0 right-0 bottom-0 bg-[#00000088] `}>
            <div className={`w-1/2 bg-white mt-5 absolute m-auto right-0 left-0 rounded-md`}>
                <div className="p-3 w-full">
                    <div className={`flex items-center justify-between border-b mb-4 pb-2`}>
                        <h1 className={`text-xl font-bold  `}>Admin Information</h1>
                        <button className={`bg-teal-100 p-1 rounded`} title={`Cancel & Close Model`}
                                onClick={() => actionClose()}><MdClose size={20}/>
                        </button>
                    </div>
                    <Tabs className="mt-1 pb-3">
                        <TabList className="flex text-base font-medium text-center w-full select-none">
                            <Tab
                                selectedClassName="bg-teal-100 dark:bg-teal-800 bg-teal-100 border-x-teal-100 border-t-teal-100 border-b-4 border-blue-500"
                                className="cursor-pointer p-3 w-full  outline-none border"
                            >
                                Besic Details
                            </Tab>
                            <Tab
                                selectedClassName="bg-teal-100 dark:bg-teal-800 bg-teal-100 border-x-teal-100 border-t-teal-100 border-b-4 border-blue-500"
                                className="cursor-pointer p-3 w-full border border-x-0 outline-none"
                            >
                                Document Details
                            </Tab>
                            <Tab
                                selectedClassName="bg-teal-100 dark:bg-teal-800 bg-teal-100 border-x-teal-100 border-t-teal-100 border-b-4 border-blue-500"
                                className="cursor-pointer p-3 w-full border  outline-none"
                            >
                                Bank Account
                            </Tab>
                        </TabList>
                        <TabPanel>
                            <div className={`max-h-[400px] overflow-y-scroll scrollbar-auto mt-5 pe-1`}>
                                <table className={`dark:border-neutral-500 border w-full`}>
                                    <tbody>
                                    <tr className={`border-b`}>
                                        <th className={`border-r dark:border-neutral-500 pe-3  text-start w-[140px] min-w-[140px] p-2`}>Firm
                                            Name
                                        </th>
                                        <td className={`text-start ps-2`}>{details.firmName}</td>
                                    </tr>
                                    <tr className={`border-b `}>
                                        <th className={`border-r dark:border-neutral-500 pe-3  text-start w-[140px] min-w-[140px] p-2`}>Brand
                                            Name
                                        </th>
                                        <td className={`text-start ps-2`}>{details.brand_id && details.brand_id.length > 0 && details.brand_id[0].brand_name}</td>
                                    </tr>
                                    <tr className={`border-b `}>
                                        <th className={`border-r dark:border-neutral-500 pe-3  text-start w-[140px] min-w-[140px] p-2`}>GST
                                            Number
                                        </th>
                                        <td className={`text-start ps-2`}>{details.gstNo}</td>
                                    </tr>
                                    <tr className={`border-b `}>
                                        <th className={`border-r dark:border-neutral-500 pe-3  text-start w-[140px] min-w-[140px] p-2`}>Owner
                                            Name
                                        </th>
                                        <td className={`text-start ps-2`}>{details.representativeName}</td>
                                    </tr>
                                    <tr className={`border-b `}>
                                        <th className={`border-r dark:border-neutral-500 pe-3  text-start w-[140px] min-w-[140px] p-2`}>Email</th>
                                        <td className={`text-start ps-2`}>{details.emailId}</td>
                                    </tr>
                                    <tr className={`border-b `}>
                                        <th className={`border-r dark:border-neutral-500 pe-3  text-start w-[140px] min-w-[140px] p-2`}>Mobile
                                            Number
                                        </th>
                                        <td className={`text-start ps-2`}>{details.mobileNo}</td>
                                    </tr>
                                    <tr className={`border-b `}>
                                        <th className={`border-r dark:border-neutral-500 pe-3  text-start w-[140px] min-w-[140px] p-2`}>Alt
                                            Mobile No
                                        </th>
                                        <td className={`text-start ps-2`}>{details.altMobileNo}</td>
                                    </tr>
                                    <tr className={`border-b `}>
                                        <th className={`border-r dark:border-neutral-500 pe-3  text-start w-[140px] min-w-[140px] p-2`}>Pickup
                                            State
                                        </th>
                                        <td className={`text-start ps-2`}>{details.pickupState}</td>
                                    </tr>
                                    <tr className={`border-b `}>
                                        <th className={`border-r dark:border-neutral-500 pe-3  text-start w-[140px] min-w-[140px] p-2`}>Pickup
                                            City
                                        </th>
                                        <td className={`text-start ps-2`}>{details.pickupCity}</td>
                                    </tr>
                                    <tr className={`border-b `}>
                                        <th className={`border-r dark:border-neutral-500 pe-3  text-start w-[140px] min-w-[140px] p-2`}>Pickup
                                            Pincode
                                        </th>
                                        <td className={`text-start ps-2`}>{details.pickupPincode}</td>
                                    </tr>
                                    <tr className={`border-b `}>
                                        <th className={`border-r dark:border-neutral-500 pe-3  text-start w-[140px] min-w-[140px] p-2`}>Invoice
                                            Address
                                        </th>
                                        <td className={`text-start ps-2`}>{details.invoiceAddress}</td>
                                    </tr>
                                    <tr className={`border-b `}>
                                        <th className={`border-r dark:border-neutral-500 pe-3  text-start w-[140px] min-w-[140px] p-2`}>Pickup
                                            Address
                                        </th>
                                        <td className={`text-start ps-2`}>{details.pickupAddress}</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div className={`mt-2 mb-10 grid grid-cols-2 gap-3`}>
                                    <select className={`border p-2 outline-none`}
                                            value={basicDetailStatus === null ? details.basicInfoStatus : basicDetailStatus}
                                            onChange={e => setBasicDetailStatus(e.target.value)}>
                                        <option value={""}>Change Status</option>
                                        <option value={"Pending"}>Pending</option>
                                        <option value={"Rejected"}>Rejected</option>
                                        <option value={"Approved"}>Approved</option>
                                    </select>
                                    <div className={`flex items-center w-full`}>
                                        <span className={`w-full border p-2`}>Brand Logo</span>
                                        <a href={details.brand_id && details.brand_id.length > 0 ? details.brand_id[0].brandLogo : ''} target={'_blank'}
                                           className={`bg-blue-500 border border-blue-500 cursor-pointer text-white p-2 inline-flex items-center`}><BsFiletypeDoc
                                            className={`me-2`} size={20}/> Preview</a>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className={`mt-5 grid grid-cols-2 gap-3 items-center justify-between`}>
                                <div className={`flex items-center w-full`}>
                                    <span className={`w-full border p-2`}>Brand Registration Doc</span>
                                    <a href={details.document_id ? details.document_id.brandRegDoc : ''}
                                       target={'_blank'}
                                       className={`bg-blue-500 border border-blue-500 text-white p-2 inline-flex items-center`}><BsFiletypeDoc
                                        className={`me-2`} size={20}/> Preview</a>
                                </div>
                                <div className={`flex items-center w-full`}>
                                    <span className={`w-full border p-2`}>GST certificate</span>
                                    <a href={details.document_id ? details.document_id.gstRegDoc : ''} target={'_blank'}
                                       className={`bg-blue-500 border border-blue-500 text-white p-2 inline-flex items-center`}><BsFiletypeDoc
                                        className={`me-2`} size={20}/> Preview</a>
                                </div>
                            </div>
                            <div className={`my-10 grid grid-cols-2 gap-3`}>
                                <select className={`border p-2 outline-none`}
                                        value={documentStatus === null ? details.document_id.status : documentStatus}
                                        onChange={e => setDocumentStatus(e.target.value)}>
                                    <option value={""}>Change Status</option>
                                    <option value={"Pending"}>Pending</option>
                                    <option value={"Rejected"}>Rejected</option>
                                    <option value={"Approved"}>Approved</option>
                                </select>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className={`max-h-[600px] overflow-y-scroll scrollbar-auto mt-5 pe-1`}>
                                <table className={`dark:border-neutral-500 border w-full`}>
                                    <tbody>
                                    <tr className={`border-b`}>
                                        <th className={`border-r dark:border-neutral-500 pe-3  text-start w-[200px] min-w-[140px] p-2`}>Account
                                            Holder Name
                                        </th>
                                        <td className={`text-start ps-2`}>{details.bank_id && details.bank_id.acHolderName}</td>
                                    </tr>
                                    <tr className={`border-b `}>
                                        <th className={`border-r dark:border-neutral-500 pe-3  text-start w-[140px] min-w-[140px] p-2`}>Account
                                            Number
                                        </th>
                                        <td className={`text-start ps-2`}>{details.bank_id && details.bank_id.acNo}</td>
                                    </tr>
                                    <tr className={`border-b `}>
                                        <th className={`border-r dark:border-neutral-500 pe-3  text-start w-[140px] min-w-[140px] p-2`}>Bank
                                            Name
                                        </th>
                                        <td className={`text-start ps-2`}>{details.bank_id && details.bank_id.bankName}</td>
                                    </tr>
                                    <tr className={`border-b `}>
                                        <th className={`border-r dark:border-neutral-500 pe-3  text-start w-[140px] min-w-[140px] p-2`}>Branch
                                        </th>
                                        <td className={`text-start ps-2`}>{details.bank_id && details.bank_id.branch}</td>
                                    </tr>
                                    <tr className={`border-b `}>
                                        <th className={`border-r dark:border-neutral-500 pe-3  text-start w-[140px] min-w-[140px] p-2`}>IFSC
                                            Code
                                        </th>
                                        <td className={`text-start ps-2`}>{details.bank_id && details.bank_id.ifsc}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className={`my-10 grid grid-cols-2 gap-3`}>
                                <select className={`border p-2 outline-none`}
                                        value={bankStatus === null ? details.bank_id.status : bankStatus}
                                        onChange={e => setBankStatus(e.target.value)}>
                                    <option value={""}>Change Status</option>
                                    <option value={"Pending"}>Pending</option>
                                    <option value={"Rejected"}>Rejected</option>
                                    <option value={"Approved"}>Approved</option>
                                </select>
                                <div className={`flex items-center w-full`}>
                                    <span className={`w-full border p-2`}>Cancelled Cheque</span>
                                    <a href={details.bank_id ? details.bank_id.cancelledCheque : ''} target={'_blank'}
                                       className={`bg-blue-500 border border-blue-500 text-white p-2 inline-flex items-center`}><BsFiletypeDoc
                                        className={`me-2`} size={20}/> Preview</a>
                                </div>
                            </div>
                        </TabPanel>
                    </Tabs>
                    <div>
                        <div className={`flex items-start mb-1 bg-teal-100 p-2`}>
                            <select className={`border p-2 outline-none`}
                                    value={vendorStatus === null ? details.status : vendorStatus}
                                    onChange={e => setVendorStatus(e.target.value)}>
                                <option value={""}>Change Vendor Approval Status</option>
                                <option value={"Pending"}>Pending</option>
                                <option value={"Rejected"}>Rejected</option>
                                <option value={"Approved"}>Approved</option>
                            </select>
                            <span className={`ms-2`}>after approved, vendor can login and add their product.</span>
                        </div>
                        <button className={`bg-blue-500 text-white px-3 py-1 rounded-md me-2`}
                                onClick={() => saveFn()}>Save Changes
                        </button>
                        <button className={`bg-red-500 text-white px-3 py-1 rounded-md`}
                                onClick={() => actionClose()}>Cancel
                        </button>
                    </div>
                </div>
                {/*{props}*/}
            </div>
        </div>
    );
};

export default TableActionModel;