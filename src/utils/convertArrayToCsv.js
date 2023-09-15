const { localDate } = require("./stringToLocalDate");
const csvExportKeyForProduct = [
    "product_name",
    "sku_code",
    "hsn_code",
    "seller_price",
    "sellingGST",
    "margin",
    "qty_in_hand",
    "color_id",
    "categoryId",
    "subCatId",
    "status",
    "brandId",
    "vendor_id",
    "createdAt",
];

const csvExportHeadForProduct = [
    "Product Name",
    "SKU Code",
    "HSN Code",
    "Seller Price",
    "Selling GST",
    "Margin",
    "Qty in Hand",
    "Color",
    "Category",
    "Sub Category",
    "Status",
    "Brand",
    "Seller",
    "Create Date",
];
const convertProductArrayOfObjectsToCSV = (array) => {
    let result;
    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    if (array.length === 0) {
        return null;
    }
    const keys = Object.keys(array[0]);
    result = "";
    result += csvExportHeadForProduct.join(columnDelimiter);
    result += lineDelimiter;
    array.forEach((item) => {
        let ctr = 0;
        keys.forEach((key) => {
            console.log(key);
            if (csvExportKeyForProduct.includes(key)) {
                if (ctr > 0) result += columnDelimiter;
                if (key === "color_id") {
                    result += item[key].colorName;
                } else if (key === "categoryId") {
                    result += item[key].category_name;
                } else if (key === "subCatId") {
                    result += item[key].subcategory_name;
                } else if (key === "brandId") {
                    result += item[key].brand_name;
                } else if (key === "vendor_id") {
                    result += item[key].firmName;
                } else if (key === "createdAt") {
                    result += localDate(item[key]);
                } else {
                    result += item[key];
                }
                ctr++;
            }
        });
        result += lineDelimiter;
    });
    return result;
};

const csvExportKeyForVendor = [
    "firmName",
    "gstNo",
    "representativeName",
    "emailId",
    "mobileNo",
    // "bank_id",
    // "document_id",
    "brand_id",
    "vendor_unique_id",
    "status",
    "createdAt",
    "marginInPercentage",
    "actionTakenBy",
];
//"Bank AccHolder","Bank BankName", "Bank Branch","Bank AccNo","Bank IFSC"
const csvExportHeadForVendor = ["Firm Name", "GST No", "Seller Name", "Email ID", "Mobile No", "Brand Name", "Seller Unique ID", "Status", "Create Date", "Action Taken By", "Margin in %"];
const convertVendorArrayOfObjectsToCSV = (array) => {
    let result;
    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    if (array.length === 0) {
        return null;
    }
    const keys = Object.keys(array[0]);
    result = "";
    result += csvExportHeadForVendor.join(columnDelimiter);
    result += lineDelimiter;
    array.forEach((item) => {
        let ctr = 0;
        keys.forEach((key) => {
            if (csvExportKeyForVendor.includes(key)) {
                if (ctr > 0) result += columnDelimiter;
                // if (key === "bank_id") {
                //     result += item[key].bank_id.acHolderName;
                //     ctr++;
                //     result += item[key].bank_id.bankName;
                //     ctr++;
                //     result += item[key].bank_id.branch;
                //     ctr++;
                //     result += item[key].bank_id.acNo;
                //     ctr++;
                //     result += item[key].bank_id.ifsc;
                //     ctr++
                // } else if (key === "bank_id") {
                //     result += item[key].category_name;
                // }

                if (key === "brand_id") {
                    let str = "";
                    item[key].forEach((el) => (str += `${el.brand_name} | `));
                    console.log("BB", str);
                    if (str) {
                        result += str;
                    } else {
                        result += "-";
                    }
                } else if (key === "actionTakenBy") {
                    console.log("Name", item[key].name);
                    if (item[key].name) {
                        result += item[key].name;
                    } else {
                        result += "-";
                    }
                } else if (key === "createdAt") {
                    if (item[key]) {
                        result += localDate(item[key]);
                    } else {
                        result += "-";
                    }
                } else {
                    if (item[key]) {
                        result += item[key];
                    } else {
                        result += "-";
                    }
                }
                ctr++;
            }
        });
        result += lineDelimiter;
    });
    return result;
};

module.exports = { convertProductArrayOfObjectsToCSV, convertVendorArrayOfObjectsToCSV };
