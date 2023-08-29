const { roleEnums } = require("./enums");
export const isRoleExists = (list, values) => {
    for (let x of list) {
        if (values.includes(x)) {
            return true;
        }
    }
    return false;
};

export const vendorsEnumList = [
    "ADMIN",
    roleEnums.MANAGE_VENDOR.ADD_VENDOR,
    roleEnums.MANAGE_VENDOR.ALL_VENDOR,
    roleEnums.MANAGE_VENDOR.ALL_SETTLED,
    roleEnums.MANAGE_VENDOR.ALL_OUTSTANDING,
    roleEnums.MANAGE_ORDERS.ALL_ORDERS,
    roleEnums.MANAGE_ORDERS.CONFIRM_ORDERS,
];
export const productEnumList = [
    "ADMIN",
    roleEnums.MANAGE_PRODUCT.ADD_PRODUCT,
    roleEnums.MANAGE_PRODUCT.BRAND,
    roleEnums.MANAGE_PRODUCT.ALL_PRODUCT,
    roleEnums.MANAGE_PRODUCT.PRODUCT_COLOR,
    roleEnums.MANAGE_PRODUCT.PRODUCT_REVIEW,
    roleEnums.MANAGE_PRODUCT.OUT_OF_STOCK_PRODUCTS,
    roleEnums.MANAGE_PRODUCT.PRODUCT_SIZE,
];
export const homepageEnumList = ["ADMIN", roleEnums.HOMEPAGE_MANAGE];
export const manageEnumManu = ["ADMIN", roleEnums.MANAGE_MENU.ADD_SUBCATEGORY, roleEnums.MANAGE_MENU.ADD_CATEGORY];

// module.exports = { vendorsEnumList, productEnumList, homepageEnumList, manageEnumManu };
