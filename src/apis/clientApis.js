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
