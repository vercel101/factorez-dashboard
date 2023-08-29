export const roleEnums = {
   MANAGE_MENU: {
      ADD_CATEGORY: "ADD_CATEGORY",
      ADD_SUBCATEGORY: "ADD_SUBCATEGORY",
   },
   MANAGE_PRODUCT: {
      ADD_PRODUCT: "ADD_PRODUCT",
      ALL_PRODUCT: "ALL_PRODUCT",
      PRODUCT_COLOR: "PRODUCT_COLOR",
      PRODUCT_SIZE: "PRODUCT_SIZE",
      BRAND:"BRAND",
      OUT_OF_STOCK_PRODUCTS: "OUT_OF_STOCK_PRODUCTS",
      PRODUCT_REVIEW: "PRODUCT_REVIEW",
   },
   MANAGE_ORDERS: {
      ALL_ORDERS: "ALL_ORDERS",
      CONFIRM_ORDERS: "CONFIRM_ORDERS",
      SHIPPED_ORDER: "SHIPPED_ORDER",
      PICKUP_PENDING: "PICKUP_PENDING",
      DELIVERED_ORDER: "DELIVERED_ORDER",
      RTO_ORDER: "RTO_ORDER",
      RTO_DELIVERED: "RTO_DELIVERED",
      CANCEL_ORDER: "CANCEL_ORDER",
      PARTIAL_DELIVERED: "PARTIAL_DELIVERED",
      HOLD: "HOLD",
      PICKUP_INITIATE: "PICKUP_INITIATE",
   },
   IMPORT_PINCODE: "IMPORT_PINCODE",
   MANAGE_RETURN: {
      RETURN_REQUEST: "RETURN_REQUEST",
      SETTLEMENT_REQUEST: "SETTLEMENT_REQUEST",
      REFUNDED: "REFUNDED",
      SETTLEMENT_REQUEST_CANCEL: "SETTLEMENT_REQUEST_CANCEL",
   },
   ALL_USERS: "ALL_USERS",
   MANAGE_COUPONS: {
      ADD_COUPON: "ADD_COUPON",
      ALL_COUPON: "ALL_COUPON",
   },
   MANAGE_SALES: "MANAGE_SALES",
   HOMEPAGE_MANAGE: "HOMEPAGE_MANAGE",
   MANAGE_VENDOR: {
      ADD_VENDOR: "ADD_VENDOR",
      ALL_VENDOR: "ALL_VENDOR",
      ALL_OUTSTANDING: "ALL_OUTSTANDING",
      ALL_SETTLED: "ALL_SETTLED",
   },
   ADD_EMPLOYEE: "ADD_EMPLOYEE",
   EXPORT_INFORMATION: "EXPORT_INFORMATION",
};

export const listOfRoleEnums = () => {
   let arr = ["ADMIN"];

   for (let keys in roleEnums) {
      if (typeof roleEnums[keys] === "string") {
         arr.push(roleEnums[keys]);
      } else {
         arr = [...arr, ...Object.values(roleEnums[keys]).flat()];
      }
   }
   return arr;
};

