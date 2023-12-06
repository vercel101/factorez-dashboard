import axios from "axios";

/* ----------------------- Category Apis start ------------------- */
export const generateOTPApi = (phone) => {
    return axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_ADDRESS}/sendOTP`,
        data: { mobile: phone },
        // headers: {
        //     Authorization: "Bearer " + token,
        // },
    });
};

export const verifyOTPApi = (phone, otp) => {
    return axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_ADDRESS}/verifyOTP`,
        // url: `${process.env.REACT_APP_API_ADDRESS}/verifyotp/${phone}/${otp}`,
        data: { mobile: phone, OTP: otp },
    });
};

export const signupCustomerApi = (customerID, data) => {
    return axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_ADDRESS}/addcustomrinformation/${customerID}`,
        data: data,
    });
};

export const loginCustomerApi = (data) => {
    return axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_ADDRESS}/login-customer`,
        data: data,
    });
};

export const allDashboardProductsApi = (token) => {
    return axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_ADDRESS}/dashboardproduct`,
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const getStoreInfoApi = (token) => {
    return axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_ADDRESS}/get-store-info`,
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const getProductInfoApi = (productId, token) => {
    return axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_ADDRESS}/get-product-info-by-id/${productId}`,
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const addToCartApi = (customerId, data, token) => {
    return axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_ADDRESS}/addtocart/${customerId}`,
        headers: {
            Authorization: "Bearer " + token,
        },
        data: data,
    });
};

export const qtyIncreaseDecreaseApi = (customerId, index, qty, token) => {
    return axios({
        method: "PUT",
        url: `${process.env.REACT_APP_API_ADDRESS}/qty-increase-decrease/${customerId}/${index}/${qty}`,
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const removeFromCartApi = (customerId, index, token) => {
    return axios({
        method: "PUT",
        url: `${process.env.REACT_APP_API_ADDRESS}/removefromcart/${customerId}/${index}`,
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const getCartsByCustomerApi = (customerId, token) => {
    return axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_ADDRESS}/cart/${customerId}`,
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const forgetPasswordUsingOtpApi = (phone, otp, data) => {
    return axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_ADDRESS}/forget-password/${phone}/${otp}`,
        // headers: {
        //     Authorization: "Bearer " + token,
        // },
        data: data,
    });
};

export const applyPromoCodeApi = (customerId, data, token) => {
    return axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_ADDRESS}/applycoupon/${customerId}/`,
        headers: {
            Authorization: "Bearer " + token,
        },
        data: data,
    });
};

export const addAddressApi = (customerId, data, token) => {
    return axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_ADDRESS}/addaddress/${customerId}`,
        headers: {
            Authorization: "Bearer " + token,
        },
        data: data,
    });
};

export const getAllAddressApi = (customerId, token) => {
    return axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_ADDRESS}/getalladdress/${customerId}`,
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const updateUserInfoApi = (customerId, data, token) => {
    return axios({
        method: "PUT",
        url: `${process.env.REACT_APP_API_ADDRESS}/updatecustomer/${customerId}`,
        headers: {
            Authorization: "Bearer " + token,
        },
        data: data,
    });
};

export const setDefaultAddressApi = (customerId, addressId, token) => {
    return axios({
        method: "PUT",
        url: `${process.env.REACT_APP_API_ADDRESS}/setdefaultaddress/${customerId}/${addressId}`,
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const deleteAddressApi = (customerId, addressId, token) => {
    return axios({
        method: "DELETE",
        url: `${process.env.REACT_APP_API_ADDRESS}/address/${customerId}/${addressId}`,
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const createOrderApi = (data, customerId, token) => {
    return axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_ADDRESS}/createorder/${customerId}`,
        headers: {
            Authorization: "Bearer " + token,
        },
        data: data,
    });
};

export const getAllOrderApi = (customerId, token) => {
    return axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_ADDRESS}/orders/${customerId}`,
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const getOrderByOrderIdApi = (customerId, orderId, token) => {
    return axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_ADDRESS}/order/${customerId}/${orderId}`,
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const downloadCustomerInvoiceByInvoiceNumberApi = (invoiceNumber, invoiceType, token) => {
    return axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_ADDRESS}/customer-downloadpdf/${invoiceNumber}/${invoiceType}`,
        responseType: "blob",
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const bannerGetApi = (token) => {
    return axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_ADDRESS}/bannerimagesforclient`,
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const getWishlistProductApi = (token) => {
    return axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_ADDRESS}/get-wishlist`,
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const removeFromWishlistApi = (wishlistId, token) => {
    return axios({
        method: "DELETE",
        url: `${process.env.REACT_APP_API_ADDRESS}/remove-from-wishlist/${wishlistId}`,
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const addToWishlistApi = (data, token) => {
    return axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_ADDRESS}/add-to-wishlist`,
        headers: {
            Authorization: "Bearer " + token,
        },
        data: data,
    });
};
