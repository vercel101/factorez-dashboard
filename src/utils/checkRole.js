export const isRoleExists = (list, values) => {
    for (let x of list) {
        if (values.includes(x)) {
            return true;
        }
    }
    return false;
};
export const orderEnumList = [
    "ADMIN",
    "VENDOR",
    "ORDERS_VIEW",
    "ORDERS_EDIT",
    "ORDERS_DOWNLOAD",
    "ORDERS_ALL_ORDERS",
    "ORDERS_CHANGE_ORDER_STATUS",
    "ORDERS_ABANDONED_ORDERS",
];
export const couponEnumList = [
    "ADMIN",
    "COUPON_VIEW",
    "COUPON_EDIT",
    "COUPON_DOWNLOAD",
    "COUPON_ALL_COUPON",
    "COUPON_ADD_NEW_COUPON",
];
export const productEnumList = [
    "ADMIN",
    "VENDOR",
    "PRODUCT_VIEW",
    "PRODUCT_EDIT",
    "PRODUCT_DOWNLOAD",
    "PRODUCT_ALL_PRODUCT",
    "PRODUCT_ADD_PRODUCT",
];
export const vendorsEnumList = [
    "ADMIN",
    "VENDOR_VIEW",
    "VENDOR_EDIT",
    "VENDOR_DOWNLOAD",
    "VENDOR_ALL_VENDOR",
    "VENDOR_ADD_VENDOR",
    "VENDOR_VENDOR_PAYMENT",
    "VENDOR_VENDOR_MOV",
];
export const customerEnumList = [
    "ADMIN",
    "CUSTOMER_VIEW",
    "CUSTOMER_EDIT",
    "CUSTOMER_DOWNLOAD",
    "CUSTOMER_ALL_CUSTOMER",
    "CUSTOMER_CUSTOMER_ORDER_BY_PHONE",
];
export const settingEnumList = [
    "ADMIN",
    "SETTING_BUSINESS_INFO_SETTING",
    "SETTING_HOMEPAGE_SETTING",
];
export const reportEnumList = ["ADMIN","VENDOR", "REPORT_VIEW", "REPORT_DOWNLOAD"];
export const subadminEnumList = [
    "ADMIN",
    "SUBADMIN_VIEW",
    "SUBADMIN_DOWNLOAD",
    "SUB_ADMIN_ALL_ADMIN",
    "SUB_ADMIN_ADD_ADMIN",
];
