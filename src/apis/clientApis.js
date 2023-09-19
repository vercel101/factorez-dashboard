import axios from "axios";

/* ----------------------- Category Apis start ------------------- */
export const generateOTPApi = (phone) => {
    return axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_ADDRESS}/sendotp/${phone}`,
        // headers: {
        //     Authorization: "Bearer " + token,
        // },
    });
};

export const verifyOTPApi = (phone, otp) => {
    return axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_ADDRESS}/verifyotp/${phone}/${otp}`,
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
