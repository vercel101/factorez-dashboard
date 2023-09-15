const { localDate } = require("./stringToLocalDate");
const exceljs = require("exceljs");
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

const csvExportKeyForOrder = [
    "orderId",
    "orderDate",
    "invoiceNo",
    "invoiceDate",
    "productsLength",
    "soldByGst",
    "orderStatus",
    "customerName",
    "customerPhone",
    "customerAddress",
    "customerCity",
    "customerState",
    "customerPincode",
    "customerGstNo",
    "customerAltPhone",

    "saleGrandTotal",
    "saleDiscount",
    "saleNetTotal",
    "saleTaxableAmt",
    "saleGstType",
    "saleGstAmt",

    "sellerName",
    "sellerPhone",
    "sellerAddress",
    "sellerCity",
    "sellerState",
    "sellerPincode",
    "sellerGstNo",
    "sellerAltNo",

    "purchaseGrandTotal",
    "purchaseDiscount",
    "purchaseNetTotal",
    "purchaseTaxableAmt",
    "purchaseGstType",
    "purchaseGstAmt",
    "orderJourneyFinalStatus",
    "orderJourneyStages",
    "remark", //38
];
const csvExportHeadForOrder = ["Order", "", "", "", "", "", "", "", "", "", "Buyer", "", "", "", "", "", "", "", "", "Sale", "", "", "", "", "", "", "", "", "Seller", "", "", "", "", "", ""];

const convertOrderArrayOfObjectsToCSV = (array) => {
    var workbook = new exceljs.Workbook();
    var worksheet = workbook.addWorksheet("Add Bulk Product");
    let columnData = [
        { header: "Product Name", key: "product_name" },
        { header: "SKU CODE", key: "skucode" },
        { header: "HSN CODE", key: "hsncode" },
        { header: "Brand ID", key: "brand_id" },
        { header: "Category ID", key: "category_id" },
        { header: "Sub Category ID", key: "subcategory_id" },
        { header: "Color ID", key: "color_id" },
        { header: "Lot Size", key: "lotsize" },
        { header: "MRP", key: "mrp" },
        { header: "GST", key: "gst" },
        { header: "Seller Price", key: "seller_price" },
        { header: "In Hand QTY", key: "in_hand_qty" },
        { header: "Min Order QTY", key: "min_order_qty" },
        { header: "Sole", key: "sole" },
        { header: "Material", key: "material" },
        { header: "Packing Type", key: "packing_type" },
        { header: "Made In", key: "made_in" },
        { header: "Weight", key: "weight" },
        { header: "Description", key: "description" },
        { header: "Thumbnail URL", key: "thumbnail_url" },
        { header: "Multiple Images", key: "multiple_images" },
    ];
    var data = {
        product_name: "Demo prouduct name",
        skucode: "---",
        hsncode: "---",
        brand_id: "64b53---demo---id---747b",
        category_id: "64b53---demo---id---747b",
        subcategory_id: "64b53---demo---id---747b",
        color_id: "64b53---demo---id---747b",
        lotsize: "put multiple lot size seperat by ',' comma",
        mrp: "100",
        gst: "12",
        seller_price: "00",
        in_hand_qty: "00",
        min_order_qty: "0",
        sole: "--",
        material: "--",
        packing_type: "--",
        made_in: "India",
        weight: "0",
        description: "This is demo Description",
        thumbnail_url: "put url here",
        multiple_images: "put multiple url seperated by ',' comma",
    };
    worksheet.columns = columnData;
    worksheet.addRow(data);
    worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
        cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "F08080" },
        };
    });
    let xls = workbook.xlsx.writeBuffer();
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(xls));
    link.setAttribute("download", 'filename.xlsx');
    link.click();

    // let result;
    // const columnDelimiter = ",";
    // const lineDelimiter = "\n";
    // if (array.length === 0) {
    //     return null;
    // }
    // // const keys = Object.keys(array[0]);
    // result = "";
    // // result += csvExportHeadForOrder.join(columnDelimiter);
    // // result += lineDelimiter;
    // result += csvExportKeyForOrder.join(columnDelimiter);
    // result += lineDelimiter;
    // array.forEach((item) => {
    //     let ctr = 0;

    //     csvExportKeyForOrder.forEach((el) => {
    //         if (ctr > 0) result += columnDelimiter;
    //         console.log(el);
    //         // if (item[el] !== undefined) {
    //             // console.log("@@@", item[el]);
    //             result += item[el];
    //         // } else {
    //         //     result += "_";
    //         //     console.log('***');
    //         // }
    //         ctr++;
    //     });
    //     // keys.forEach((key) => {
    //     //     // if (csvExportKeyForOrder.includes(key)) {
    //     //     // }

    //     // })
    //     result += lineDelimiter;
    // });
    // // for(let i=0; i<10, i++){

    // // }
    return "result";
};

module.exports = { convertProductArrayOfObjectsToCSV, convertVendorArrayOfObjectsToCSV, convertOrderArrayOfObjectsToCSV };
