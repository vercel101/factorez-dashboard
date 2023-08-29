import React, { useState } from "react";
import { generateCouponsAPI } from "../../../../apis/adminApis";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AddNewCoupon = ({tokenReducer}) => {
    const [newCouponData, setNewCouponData] = useState({
        couponCode: "",
        validTill: "",
        maxUsers: "",
        maxDiscPrice: "",
        discountType: "",
        discountAmt: "",
    });

    const onSave = async () => {
        if (newCouponData.couponCode === "" || newCouponData.maxUsers === "" || newCouponData.validTill === "" || newCouponData.discountType === "" || newCouponData.discountAmt === "") {
            alert("All field are required");
        } else {
            if (newCouponData.maxUsers > 0) {
                await generateCouponsAPI(newCouponData, tokenReducer)
                    .then((res) => {
                        if (res.data.status) {
                            toast.success(res.data.message);
                            onCancel();
                        } else {
                            toast.error(res.data.message);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        toast.error("something went wrong!");
                    });
            } else {
                toast.warning("Uses limit should be grater than 0");
            }
            console.log(newCouponData);
        }
    };
    const onCancel = () => {
        setNewCouponData({
            couponCode: "",
            validTill: "",
            maxUsers: "",
            maxDiscPrice: "",
            discountType: "",
            discountAmt: "",
        });
    };

    return (
        <div className="border dark:border-teal-600 flex flex-col max-w-[300px] p-2">
            <label htmlFor="cuponcode">Coupon Code</label>
            <input
                id="cuponcode"
                type="text"
                className="outline-none border dark:border-teal-600 p-1 dark:bg-teal-600"
                value={newCouponData.couponCode}
                onChange={(e) =>
                    setNewCouponData((oldPre) => {
                        return { ...oldPre, couponCode: e.target.value };
                    })
                }
            />
            <label htmlFor="validtime" className="mt-3">
                Expiry Date
            </label>
            <input
                id="validtime"
                type="date"
                className="outline-none border dark:border-teal-600 p-1 dark:bg-teal-600"
                value={newCouponData.validTill}
                onChange={(e) =>
                    setNewCouponData((oldPre) => {
                        return { ...oldPre, validTill: e.target.value };
                    })
                }
            />
            <label htmlFor="docType" className="mt-3">
                Discount Type
            </label>
            <select
                name=""
                id="docType"
                value={newCouponData.discountType}
                className="outline-none border dark:border-teal-600 p-1 dark:bg-teal-600"
                onChange={(e) =>
                    setNewCouponData((oldPre) => {
                        return { ...oldPre, discountType: e.target.value };
                    })
                }>
                <option value="">Select</option>
                <option value="PRICE">Price</option>
                <option value="PERCENTAGE">Percentage</option>
            </select>
            {newCouponData.discountType !== "" && (
                <>
                    <label htmlFor="disamt" className="mt-3">
                        {newCouponData.discountType === "PRICE" ? 'Price ₹' : 'Discount %'}
                    </label>
                    <input
                        id="disamt"
                        type="number"
                        className="outline-none border dark:border-teal-600 p-1 dark:bg-teal-600"
                        value={newCouponData.discountAmt}
                        placeholder={newCouponData.discountType === "PRICE" ? 'Amount ₹' : 'Discount in Percentage %'}
                        onChange={(e) =>
                            setNewCouponData((oldPre) => {
                                return { ...oldPre, discountAmt: e.target.value };
                            })
                        }
                    />
                </>
            )}
            {newCouponData.discountType === "PERCENTAGE" && (
                <>
                    <label htmlFor="maxDisAmt" className="mt-3">
                        Maximum Discount Price ₹
                    </label>
                    <input
                        id="maxDisAmt"
                        type="number"
                        className="outline-none border dark:border-teal-600 p-1 dark:bg-teal-600"
                        value={newCouponData.maxDiscPrice}
                        
                        onChange={(e) =>
                            setNewCouponData((oldPre) => {
                                return { ...oldPre, maxDiscPrice: e.target.value };
                            })
                        }
                    />
                </>
            )}
            
            <label htmlFor="maxlimit" className="mt-3">
                Max Used Limit
            </label>
            <input
                id="maxlimit"
                type="number"
                className="outline-none border dark:border-teal-600 p-1 dark:bg-teal-600"
                value={newCouponData.maxUsers}
                placeholder="No. of maximum use"
                onChange={(e) =>
                    setNewCouponData((oldPre) => {
                        return { ...oldPre, maxUsers: e.target.value };
                    })
                }
            />
            <div className="flex items-center">
                <button className="rounded bg-[#007BFF] text-white px-3 py-1 me-3 mt-3" onClick={() => onSave()}>
                    Save
                </button>
                <button className="rounded bg-[#DC3545] text-white px-3 py-1 me-3 mt-3" onClick={() => onCancel()}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default AddNewCoupon;
