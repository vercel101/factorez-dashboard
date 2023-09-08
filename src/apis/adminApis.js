import axios from "axios";

/* ----------------------- Category Apis start ------------------- */
export const AddCategoryApi = (data, token) => {
    return axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_ADDRESS}/category`,
        headers: {
            Authorization: "Bearer " + token,
        },
        data: data,
    });
};
export const updateCategoryApi = (categoryId, data, token) => {
    return axios({
        method: "PUT",
        url: `${process.env.REACT_APP_API_ADDRESS}/category/${categoryId}`,
        headers: {
            Authorization: "Bearer " + token,
        },
        data: data,
    });
};
export const getAllCategoryApi = (token) => {
    return axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_ADDRESS}/categories`,
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
/* ----------------------- Category Apis end ------------------- */

/* ----------------------- Brand Apis start ------------------- */
export const AddBrandApi = (data, token) => {
    return axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_ADDRESS}/brand`,
        headers: {
            Authorization: "Bearer " + token,
        },
        data: data,
    });
};
export const updateBrandApi = (brandId, data, token) => {
    return axios({
        method: "PUT",
        url: `${process.env.REACT_APP_API_ADDRESS}/brand/${brandId}`,
        headers: {
            Authorization: "Bearer " + token,
        },
        data: data,
    });
};
export const getAllBrandApi = (token) => {
    return axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_ADDRESS}/brands`,
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const getAllBrandByVendorApi = (vendorId, token) => {
    return axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_ADDRESS}/brands/${vendorId}`,
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const verifyBrandById = (brandId, data, token) => {
    return axios({
        method: "PATCH",
        url: `${process.env.REACT_APP_API_ADDRESS}/verifybrand/${brandId}`,
        headers: {
            Authorization: "Bearer " + token,
        },
        data: data,
    });
};
/* ----------------------- Brand Apis end ------------------- */

/* ----------------------- Vendor Apis end ------------------- */
export const addVentorApi = (data, token) => {
    return axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_ADDRESS}/addvendor`,
        headers: {
            Authorization: "Bearer " + token,
        },
        data: data,
    });
};
export const getAllVentorApi = (token) => {
    return axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_ADDRESS}/allvendors`,
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const deleteVendorApi = (id, token) => {
    return axios({
        method: "DELETE",
        url: `${process.env.REACT_APP_API_ADDRESS}/deleteVendor`,
        headers: {
            Authorization: "Bearer " + token,
        },
        data: { vendorId: id },
    });
};
/* ----------------------- Vendor Apis end ------------------- */

/* ----------------------- SubAdmin Apis end ------------------- */
export const getAllSubAdmins = (token) => {
    return axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_ADDRESS}/getadmin`,
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const getAllSubAdminEnums = (token) => {
    return axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_ADDRESS}/alladminenums`,
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const addNewAdmin = (data, token) => {
    return axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_ADDRESS}/addadmin`,
        headers: {
            Authorization: "Bearer " + token,
        },
        data: data,
    });
};
export const updateAdminByid = (data, id, token) => {
    return axios({
        method: "PUT",
        url: `${process.env.REACT_APP_API_ADDRESS}/update-admin/${id}`,
        headers: {
            Authorization: "Bearer " + token,
        },
        data: data,
    });
};
export const deleteAdminByid = (id, token) => {
    return axios({
        method: "DELETE",
        url: `${process.env.REACT_APP_API_ADDRESS}/delete-admin/${id}`,
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const adminLogin = (data) => {
    return axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_ADDRESS}/adminlogin`,
        data: data,
    });
};
/* ----------------------- SubAdmin Apis end ------------------- */

export const verifyVendorApi = (data, token, vendorId) => {
    return axios({
        method: "PUT",
        url: `${process.env.REACT_APP_API_ADDRESS}/verifyvendor/${vendorId}`,
        headers: {
            Authorization: "Bearer " + token,
        },
        data: data,
    });
};

/* ----------------------- Color Apis Start ------------------- */
export const getAllColorApi = () => {
    return axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_ADDRESS}/getallcolors`,
    });
};

export const addNewColorApi = (data, token) => {
    return axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_ADDRESS}/addnewcolor`,
        headers: {
            Authorization: "Bearer " + token,
        },
        data: data,
    });
};

export const deleteColorByIdApi = (token, colorId) => {
    return axios({
        method: "DELETE",
        url: `${process.env.REACT_APP_API_ADDRESS}/deletecolorbyid/${colorId}`,
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
/* ----------------------- Color Apis end ------------------- */

/* ----------------------- Product Apis end ------------------- */
export const createProductApi = (data, token) => {
    return axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_ADDRESS}/product`,
        headers: {
            Authorization: "Bearer " + token,
        },
        data: data,
    });
};
export const chnageProductStatusApi = (data, productId, token) => {
    return axios({
        method: "PATCH",
        url: `${process.env.REACT_APP_API_ADDRESS}/changeproductstatus/${productId}`,
        headers: {
            Authorization: "Bearer " + token,
        },
        data: data,
    });
};

export const chnageProductStockStatusApi = (data, productId, token) => {
    return axios({
        method: "PATCH",
        url: `${process.env.REACT_APP_API_ADDRESS}/changeproductstockstatus/${productId}`,
        headers: {
            Authorization: "Bearer " + token,
        },
        data: data,
    });
};

export const allProductApi = (token) => {
    return axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_ADDRESS}/products`,
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const allProductsForFilterApi = (token) => {
    return axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_ADDRESS}/allproducts`,
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const downloadDemoProductSheet = (token) => {
    return axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_ADDRESS}/downloadprodctxlsx`,
        responseType: "blob",
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const downloadDemoIdsSheet = (token) => {
    return axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_ADDRESS}/downloadDependencies`,
        responseType: "blob",
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const bulkProductUpload = (data, token) => {
    return axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_ADDRESS}/bulkproductupload`,
        headers: {
            Authorization: "Bearer " + token,
        },
        data: data,
    });
};
/* ----------------------- Product Apis end ------------------- */
/* ----------------------- Customer Apis start ------------------- */
export const getAllCustomerAPi = (token) => {
    return axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_ADDRESS}/customers`,
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const getAbandonedCartsAPI = (token) => {
    return axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_ADDRESS}/abandonedcarts`,
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const blockCustomerByIdApi = (customerid, token) => {
    return axios({
        method: "PATCH",
        url: `${process.env.REACT_APP_API_ADDRESS}/blockcustomer/${customerid}`,
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const deleteCustomerByIdApi = (customerid, token) => {
    return axios({
        method: "DELETE",
        url: `${process.env.REACT_APP_API_ADDRESS}/customer/${customerid}`,
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const getOrdersByCustomerPhoneAPI = (phone, token) => {
    return axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_ADDRESS}/getordersbycustomerphone`,
        headers: {
            Authorization: "Bearer " + token,
        },
        data: { userPhone: phone },
    });
};
/* ----------------------- Customer Apis end ------------------- */

export const getAllOrdersAPI = (token) => {
    return axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_ADDRESS}/orders`,
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const getAllCouponsAPI = (token) => {
    return axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_ADDRESS}/allcoupon`,
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const deleteCouponsAPI = (couponId, token) => {
    return axios({
        method: "PATCH",
        url: `${process.env.REACT_APP_API_ADDRESS}/deletecoupon/${couponId}`,
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const generateCouponsAPI = (data, token) => {
    return axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_ADDRESS}/generatecoupon`,
        headers: {
            Authorization: "Bearer " + token,
        },
        data: data,
    });
};
export const getOrderedProductAPI = (id, token) => {
    return axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_ADDRESS}/orderedproduct/${id}`,
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const patchTrackingIDByOrderId = (orderid, trackingid, token) => {
    return axios({
        method: "PATCH",
        url: `${process.env.REACT_APP_API_ADDRESS}/patchtrackingid/${orderid}`,
        headers: {
            Authorization: "Bearer " + token,
        },
        data: { t_id: trackingid },
    });
};

export const updateOrderByOrderId = (orderid, data, token) => {
    return axios({
        method: "PUT",
        url: `${process.env.REACT_APP_API_ADDRESS}/updateorder/${orderid}`,
        headers: {
            Authorization: "Bearer " + token,
        },
        data: data,
    });
};
export const changeOrderStatusApi = (orderid, data, token) => {
    return axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_ADDRESS}/change-order-status/${orderid}`,
        headers: {
            Authorization: "Bearer " + token,
        },
        data: data,
    });
};
export const getAllQuestions = (token) => {
    return axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_ADDRESS}/getallquestion`,
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const getAllCancelledOrderAPI = (token) => {
    return axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_ADDRESS}/getcancelledorders`,
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const addBusinessInfoApi = (data, token) => {
    return axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_ADDRESS}/addbusinessinfo`,
        headers: {
            Authorization: "Bearer " + token,
        },
        data: data,
    });
};
export const addBusinessGstApi = (data, token) => {
    return axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_ADDRESS}/addbusinessgst`,
        headers: {
            Authorization: "Bearer " + token,
        },
        data: data,
    });
};
export const addBusinessFilesApi = (data, token) => {
    return axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_ADDRESS}/addbusinessfiles`,
        headers: {
            Authorization: "Bearer " + token,
        },
        data: data,
    });
};
export const getBusinessInfoApi = (token) => {
    return axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_ADDRESS}/getbusinessinfo`,
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const setDefaultGstApi = (data, token) => {
    return axios({
        method: "PATCH",
        url: `${process.env.REACT_APP_API_ADDRESS}/updatedefgst`,
        headers: {
            Authorization: "Bearer " + token,
        },
        data: data,
    });
};

export const setHomepageProductsForBestSellingApi = (data, token) => {
    return axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_ADDRESS}/bestsellingproducts`,
        headers: {
            Authorization: "Bearer " + token,
        },
        data: data,
    });
};
export const getallfeaturedproductsApi = (token) => {
    return axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_ADDRESS}/allbestsellingproduct`,
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const removeFeaturedproductsApi = (data, token) => {
    return axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_ADDRESS}/removebestsellingproduct`,
        headers: {
            Authorization: "Bearer " + token,
        },
        data: data,
    });
};

export const getAllSaleInvoiceApi = (token) => {
    return axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_ADDRESS}/saleinvoice`,
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const getAllPurchaseInvoiceApi = (token) => {
    return axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_ADDRESS}/purchaseinvoice`,
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const downloadInvoiceByInvoiceNumberApi = (invoiceNumber, invoiceType, token) => {
    return axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_ADDRESS}/downloadpdf/${invoiceNumber}/${invoiceType}`,
        responseType: "blob",
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const updateUserProfileApi = (data, token) => {
    return axios({
        method: "PUT",
        url: `${process.env.REACT_APP_API_ADDRESS}/update-userprofile`,
        headers: {
            Authorization: "Bearer " + token,
        },
        data: data,
    });
};

export const addNewQuestionApi = (data, token) => {
    return axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_ADDRESS}/addquestion`,
        headers: {
            Authorization: "Bearer " + token,
        },
        data: data,
    });
};

export const deleteQuestionByIdApi = (questionid, token) => {
    return axios({
        method: "DELETE",
        url: `${process.env.REACT_APP_API_ADDRESS}/delete-question-byid/${questionid}`,
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const getAllQuestionApi = (token) => {
    return axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_ADDRESS}/getallquestion`,
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const getAllQuestionByUserApi = (token) => {
    return axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_ADDRESS}/getallquestionbyuser`,
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const saveSocialMediaApi = (data, token) => {
    return axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_ADDRESS}/savesocialmedia`,
        headers: {
            Authorization: "Bearer " + token,
        },
        data: data,
    });
};

export const getOrderReportApi = (token) => {
    return axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_ADDRESS}/order-report`,
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const exportSaleReport = (data, token) => {
    return axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_ADDRESS}/export-sale-report`,
        responseType: "blob",
        headers: {
            Authorization: "Bearer " + token,
        },
        data: data,
    });
};
export const exportPurchaseReport = (data, token) => {
    return axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_ADDRESS}/export-purchase-report`,
        responseType: "blob",
        headers: {
            Authorization: "Bearer " + token,
        },
        data: data,
    });
};
export const getPaymentReportApi = (token) => {
    return axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_ADDRESS}/payment-report`,
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const updatePaymentReportApi = (orderId, data, token) => {
    return axios({
        method: "PUT",
        url: `${process.env.REACT_APP_API_ADDRESS}/update-payment-report/${orderId}`,
        headers: {
            Authorization: "Bearer " + token,
        },
        data: data,
    });
};

export const updatePaymentStatusApi = (paymentId, data, token) => {
    return axios({
        method: "PUT",
        url: `${process.env.REACT_APP_API_ADDRESS}/updatepaymentstatus/${paymentId}`,
        headers: {
            Authorization: "Bearer " + token,
        },
        data: data,
    });
};