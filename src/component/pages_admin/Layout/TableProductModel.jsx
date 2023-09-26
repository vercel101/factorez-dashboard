import React, { useState } from "react";
import { MdClose, MdSquare } from "react-icons/md";
import { useSelector } from "react-redux";
import { LiaRupeeSignSolid } from "react-icons/lia";
import percentage, { calculateMarginAndSelling } from "../../../utils/percentage";
const TableProductModel = ({ details, actionClose, save, changeStatusHandler, vendorHandler }) => {
    const { userInfoReducer } = useSelector((state) => state);
    const [newStatus, setNewStatus] = useState(details.status);
    const [marginGst, setMarginGst] = useState({
        margin: details.margin ? details.margin : "",
        sellingGst: details.sellingGST ? details.sellingGST : "",
    });

    const updateStock = (value) => {
        if (value === "Out_of_stock") {
            if (details.stockStatus !== value && window.confirm("After perform action this product will not be visible to the client, press OK to change the status")) {
                changeStatusHandler({ productId: details._id, newStockStatus: value });
            }
        } else {
            if (details.stockStatus !== value && window.confirm("Press OK to change the status")) {
                changeStatusHandler({ productId: details._id, newStockStatus: value });
            }
        }
    };
    console.log(details);

    const saveFn = () => {
        if (details.status !== newStatus && window.confirm("Are you sure to change the product status?")) {
            if (newStatus === "Approved") {
                if (marginGst.margin > 0 && marginGst.sellingGst > 0) {
                    save({ productId: details._id, newStatus: newStatus, marginGst: marginGst });
                } else {
                    alert("Product can only be Approved if Margin and Selling GST is provided");
                }
            } else {
                save({ productId: details._id });
            }
        } else if (details.margin !== marginGst.margin || details.sellingGST !== marginGst.sellingGst) {
            console.log("margin and selling gst change");
            save({ productId: details._id, newStatus: newStatus, marginGst: marginGst });
        } else {
            actionClose();
        }
    };

    return (
        <div className={`fixed z-20 top-0 left-0 right-0 bottom-0 bg-[#00000088] `}>
            <div className={`w-1/2 bg-white mt-5 absolute m-auto right-0 left-0 rounded-md`}>
                <div className="p-3 w-full">
                    <div className={`flex items-center justify-between border-b mb-4 pb-2`}>
                        <h1 className={`text-xl font-bold  `}>Product Information</h1>
                        <button className={`bg-teal-100 p-1 rounded`} title={`Cancel & Close Model`} onClick={() => actionClose()}>
                            <MdClose size={20} />
                        </button>
                    </div>

                    <div className="flex justify-center items-start">
                        <div className="w-[60%] max-h-[400px] overflow-y-scroll scrollbar-auto">
                            <table className={`dark:border-neutral-500 border w-full`}>
                                <tbody className="text-sm">
                                    <tr className={`border-b`}>
                                        <th className={`border-r dark:border-neutral-500  text-start w-[140px] min-w-[140px] ps-2 py-1`}>Product Name</th>
                                        <td className={`text-start ps-2`}>{details.product_name}</td>
                                    </tr>
                                    <tr className={`border-b`}>
                                        <th className={`border-r dark:border-neutral-500  text-start w-[140px] min-w-[140px] ps-2 py-1`}>SKU CODE</th>
                                        <td className={`text-start ps-2`}>{details.sku_code}</td>
                                    </tr>
                                    <tr className={`border-b`}>
                                        <th className={`border-r dark:border-neutral-500  text-start w-[140px] min-w-[140px] ps-2 py-1`}>Brand</th>
                                        <td className={`text-start ps-2`}>{details.brandId.brand_name}</td>
                                    </tr>
                                    <tr className={`border-b`}>
                                        <th className={`border-r dark:border-neutral-500  text-start w-[140px] min-w-[140px] ps-2 py-1`}>Category</th>
                                        <td className={`text-start ps-2`}>{details.categoryId.category_name}</td>
                                    </tr>
                                    <tr className={`border-b`}>
                                        <th className={`border-r dark:border-neutral-500  text-start w-[140px] min-w-[140px] ps-2 py-1`}>Sub Category</th>
                                        <td className={`text-start ps-2`}>T{details.subCatId.subcategory_name}</td>
                                    </tr>
                                    <tr className={`border-b`}>
                                        <th className={`border-r dark:border-neutral-500  text-start w-[140px] min-w-[140px] ps-2 py-1`}>Lot Size</th>
                                        <td className={`text-start ps-2`}>
                                            <ul>{details.lotSizeQty.length > 0 && details.lotSizeQty.map((el, i) => <li>{el}</li>)}</ul>
                                        </td>
                                    </tr>
                                    <tr className={`border-b`}>
                                        <th className={`border-r dark:border-neutral-500  text-start w-[140px] min-w-[140px] ps-2 py-1`}>Color</th>
                                        <td className={`text-start ps-2`}>
                                            {details.color_id.map((colorEl) => (
                                                <span className="flex items-center justify-start">
                                                    <MdSquare size={20} color={colorEl.colorHex} /> {colorEl.colorName}
                                                </span>
                                            ))}
                                        </td>
                                    </tr>
                                    <tr className={`border-b`}>
                                        <th className={`border-r dark:border-neutral-500  text-start w-[140px] min-w-[140px] ps-2 py-1`}>Mrp</th>
                                        <td className={`text-start ps-2 font-bold text-blue-500`}>&#8377; {details.mrp}</td>
                                    </tr>
                                    <tr className={`border-b`}>
                                        <th className={`border-r dark:border-neutral-500  text-start w-[140px] min-w-[140px] ps-2 py-1`}>GST in %</th>
                                        <td className={`text-start ps-2 font-bold text-blue-500`}>{details.gst} %</td>
                                    </tr>
                                    <tr className={`border-b`}>
                                        <th className={`border-r dark:border-neutral-500  text-start w-[140px] min-w-[140px] ps-2 py-1`}>Seller Price</th>
                                        <td className={`text-start ps-2 font-bold text-blue-500`}>&#8377; {details.seller_price}</td>
                                    </tr>
                                    <tr className={`border-b`}>
                                        <th className={`border-r dark:border-neutral-500  text-start w-[140px] min-w-[140px] ps-2 py-1`}>In hand QTY</th>
                                        <td className={`text-start ps-2`}>{details.qty_in_hand}</td>
                                    </tr>
                                    <tr className={`border-b`}>
                                        <th className={`border-r dark:border-neutral-500  text-start w-[140px] min-w-[140px] ps-2 py-1`}>Minimum Order</th>
                                        <td className={`text-start ps-2`}>{details.min_order_qty}</td>
                                    </tr>
                                    <tr className={`border-b`}>
                                        <th className={`border-r dark:border-neutral-500  text-start w-[140px] min-w-[140px] ps-2 py-1`}>Sole</th>
                                        <td className={`text-start ps-2`}>{details.sole}</td>
                                    </tr>
                                    <tr className={`border-b`}>
                                        <th className={`border-r dark:border-neutral-500  text-start w-[140px] min-w-[140px] ps-2 py-1`}>Material</th>
                                        <td className={`text-start ps-2`}>{details.material}</td>
                                    </tr>
                                    <tr className={`border-b`}>
                                        <th className={`border-r dark:border-neutral-500  text-start w-[140px] min-w-[140px] ps-2 py-1`}>Packing Type</th>
                                        <td className={`text-start ps-2`}>{details.packing_type}</td>
                                    </tr>
                                    <tr className={`border-b`}>
                                        <th className={`border-r dark:border-neutral-500  text-start w-[140px] min-w-[140px] ps-2 py-1`}>Made In</th>
                                        <td className={`text-start ps-2`}>{details.made_in}</td>
                                    </tr>
                                    <tr className={`border-b`}>
                                        <th className={`border-r dark:border-neutral-500  text-start w-[140px] min-w-[140px] ps-2 py-1`}>Weight</th>
                                        <td className={`text-start ps-2`}>{details.weight}</td>
                                    </tr>

                                    <tr className={`border-b`}>
                                        <th className={`border-r dark:border-neutral-500  text-start w-[140px] min-w-[140px] ps-2 py-1`}>Status</th>
                                        <td className={`text-start ps-2`}>
                                            <span className="bg-black rounded-full text-white px-3">{details.status}</span>
                                        </td>
                                    </tr>
                                    <tr className={`border-b`}>
                                        <th className={`border-r dark:border-neutral-500  text-start w-[140px] min-w-[140px] ps-2 py-1`}>Stock Status</th>
                                        <td className={`text-start ps-2`}>
                                            <select className="border px-2 outline-none" value={details.stockStatus} onChange={(e) => updateStock(e.target.value)}>
                                                <option value="">Stock Status</option>
                                                <option value="In_stock">In Stock</option>
                                                <option value="Out_of_stock">Out Of Stock</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr className={`border-b`}>
                                        <th className={`border-r dark:border-neutral-500  text-start w-[140px] min-w-[140px] ps-2 py-1`}>Description</th>
                                        <td className={`text-start ps-2`}>{details.description}</td>
                                    </tr>
                                </tbody>
                            </table>
                            {userInfoReducer.userType !== "Seller" && (
                                <div className="mt-4">
                                    <h4 className="font-bold text-sm text-blue-500">Product Selling Price And Selling GST</h4>
                                    <table className={`dark:border-neutral-500 border w-full bg-yellow-50`}>
                                        <tbody className="text-sm">
                                            <tr className={`border-b`}>
                                                <th className={`border-r dark:border-neutral-500  text-start w-[140px] min-w-[140px] ps-2 py-1`}>Margin %</th>
                                                <td className={`text-start ps-2`}>
                                                    <input
                                                        type="number"
                                                        defaultValue={marginGst.margin}
                                                        className="outline-none"
                                                        placeholder="Margin percentage"
                                                        onChange={(e) =>
                                                            setMarginGst((preState) => {
                                                                return { ...preState, margin: e.target.value };
                                                            })
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                            <tr className={`border-b`}>
                                                <th className={`border-r dark:border-neutral-500  text-start w-[140px] min-w-[140px] ps-2 py-1`}>Selling GST %</th>
                                                <td className={`text-start ps-2`}>
                                                    <input
                                                        type="number"
                                                        defaultValue={marginGst.sellingGst}
                                                        className="outline-none"
                                                        placeholder="GST percentage"
                                                        onChange={(e) =>
                                                            setMarginGst((preState) => {
                                                                return { ...preState, sellingGst: e.target.value };
                                                            })
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                            <tr className={`border-b`}>
                                                <th className={`border-r dark:border-neutral-500  text-start w-[140px] min-w-[140px] ps-2 py-1`}>Total Selling Price</th>
                                                <td className={`text-start ps-2 font-bold text-blue-500`}>
                                                    &#8377; {calculateMarginAndSelling(details.seller_price, marginGst.margin, marginGst.sellingGst)}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>

                        <div className="flex-1 ps-2 max-h-[400px] overflow-y-scroll scrollbar-auto">
                            <div className="w-full border">
                                <a href={details.thumbnail_pic} target="_blank">
                                    <img src={details.thumbnail_pic} alt={details.product_name} />
                                </a>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                {details.multiple_pics.length > 0 &&
                                    details.multiple_pics.map((el, i) => (
                                        <a href={el} key={i} target="_blank">
                                            <img src={el} alt="" />
                                        </a>
                                    ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-start items-center mt-5">
                        {userInfoReducer.userType !== "Seller" && (
                            <>
                                <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)} className="border border-green-500 outline-none py-1 ">
                                    <option value="">Status Change</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Rejected">Rejected</option>
                                    <option value="Approved">Approved</option>
                                </select>

                                <button className={`bg-blue-500 text-white px-3 py-1 mx-2`} onClick={() => saveFn()}>
                                    Save Changes
                                </button>
                            </>
                        )}
                        <button className={`bg-red-500 text-white px-3 py-1`} onClick={() => actionClose()}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TableProductModel;
