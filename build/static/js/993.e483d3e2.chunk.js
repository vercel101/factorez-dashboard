(self.webpackChunkfactorez_dashboard=self.webpackChunkfactorez_dashboard||[]).push([[993],{5905:function(e,r,t){"use strict";var s=t(9439),a=t(2791),n=t(6747),l=t(6856),c=t(9126),d=t(548),i=t(6773),o=t(9055),x=t(184);r.Z=function(e){var r=e.details,t=e.actionClose,u=e.save,m=(e.changeHandler,e.vendorHandler,(0,a.useState)(null)),p=(0,s.Z)(m,2),h=p[0],b=p[1],j=(0,a.useState)(null),N=(0,s.Z)(j,2),g=N[0],f=N[1],w=(0,a.useState)(null),v=(0,s.Z)(w,2),k=v[0],S=v[1];console.log(r);return(0,x.jsx)("div",{className:"fixed z-20 top-0 left-0 right-0 bottom-0 bg-[#00000088] ",children:(0,x.jsx)("div",{className:"w-1/2 bg-white mt-5 absolute m-auto right-0 left-0 rounded-md",children:(0,x.jsxs)("div",{className:"p-3 w-full",children:[(0,x.jsxs)("div",{className:"flex items-center justify-between border-b mb-4 pb-2",children:[(0,x.jsx)("h1",{className:"text-xl font-bold  ",children:"Vendor Information"}),(0,x.jsx)("button",{className:"bg-teal-100 p-1 rounded",title:"Cancel & Close Model",onClick:function(){return t()},children:(0,x.jsx)(l.FU5,{size:20})})]}),(0,x.jsxs)(n.mQ,{className:"mt-1 pb-3",children:[(0,x.jsxs)(n.td,{className:"flex text-base font-medium text-center w-full select-none",children:[(0,x.jsx)(n.OK,{selectedClassName:"bg-teal-100 dark:bg-teal-800 bg-teal-100 border-x-teal-100 border-t-teal-100 border-b-4 border-blue-500",className:"cursor-pointer p-3 w-full  outline-none border",children:"Besic Details"}),(0,x.jsx)(n.OK,{selectedClassName:"bg-teal-100 dark:bg-teal-800 bg-teal-100 border-x-teal-100 border-t-teal-100 border-b-4 border-blue-500",className:"cursor-pointer p-3 w-full border border-x-0 outline-none",children:"Document Details"}),(0,x.jsx)(n.OK,{selectedClassName:"bg-teal-100 dark:bg-teal-800 bg-teal-100 border-x-teal-100 border-t-teal-100 border-b-4 border-blue-500",className:"cursor-pointer p-3 w-full border  outline-none",children:"Bank Account"})]}),(0,x.jsx)(n.x4,{children:(0,x.jsxs)("div",{className:"max-h-[400px] overflow-y-scroll scrollbar-auto mt-5 pe-1",children:[(0,x.jsx)("table",{className:"dark:border-neutral-500 border w-full",children:(0,x.jsxs)("tbody",{children:[(0,x.jsxs)("tr",{className:"border-b",children:[(0,x.jsx)("th",{className:"border-r dark:border-neutral-500 pe-3  text-start w-[140px] min-w-[140px] p-2",children:"Firm Name"}),(0,x.jsx)("td",{className:"text-start ps-2",children:r.firmName})]}),(0,x.jsxs)("tr",{className:"border-b ",children:[(0,x.jsx)("th",{className:"border-r dark:border-neutral-500 pe-3  text-start w-[140px] min-w-[140px] p-2",children:"Brand Name"}),(0,x.jsx)("td",{className:"text-start ps-2",children:r.brand_id&&r.brand_id.length>0&&r.brand_id[0].brand_name})]}),(0,x.jsxs)("tr",{className:"border-b ",children:[(0,x.jsx)("th",{className:"border-r dark:border-neutral-500 pe-3  text-start w-[140px] min-w-[140px] p-2",children:"GST Number"}),(0,x.jsx)("td",{className:"text-start ps-2",children:r.gstNo})]}),(0,x.jsxs)("tr",{className:"border-b ",children:[(0,x.jsx)("th",{className:"border-r dark:border-neutral-500 pe-3  text-start w-[140px] min-w-[140px] p-2",children:"Owner Name"}),(0,x.jsx)("td",{className:"text-start ps-2",children:r.representativeName})]}),(0,x.jsxs)("tr",{className:"border-b ",children:[(0,x.jsx)("th",{className:"border-r dark:border-neutral-500 pe-3  text-start w-[140px] min-w-[140px] p-2",children:"Email"}),(0,x.jsx)("td",{className:"text-start ps-2",children:r.emailId})]}),(0,x.jsxs)("tr",{className:"border-b ",children:[(0,x.jsx)("th",{className:"border-r dark:border-neutral-500 pe-3  text-start w-[140px] min-w-[140px] p-2",children:"Mobile Number"}),(0,x.jsx)("td",{className:"text-start ps-2",children:r.mobileNo})]}),(0,x.jsxs)("tr",{className:"border-b ",children:[(0,x.jsx)("th",{className:"border-r dark:border-neutral-500 pe-3  text-start w-[140px] min-w-[140px] p-2",children:"Alt Mobile No"}),(0,x.jsx)("td",{className:"text-start ps-2",children:r.altMobileNo})]}),(0,x.jsxs)("tr",{className:"border-b ",children:[(0,x.jsx)("th",{className:"border-r dark:border-neutral-500 pe-3  text-start w-[140px] min-w-[140px] p-2",children:"Pickup State"}),(0,x.jsx)("td",{className:"text-start ps-2",children:r.pickupState})]}),(0,x.jsxs)("tr",{className:"border-b ",children:[(0,x.jsx)("th",{className:"border-r dark:border-neutral-500 pe-3  text-start w-[140px] min-w-[140px] p-2",children:"Pickup City"}),(0,x.jsx)("td",{className:"text-start ps-2",children:r.pickupCity})]}),(0,x.jsxs)("tr",{className:"border-b ",children:[(0,x.jsx)("th",{className:"border-r dark:border-neutral-500 pe-3  text-start w-[140px] min-w-[140px] p-2",children:"Pickup Pincode"}),(0,x.jsx)("td",{className:"text-start ps-2",children:r.pickupPincode})]}),(0,x.jsxs)("tr",{className:"border-b ",children:[(0,x.jsx)("th",{className:"border-r dark:border-neutral-500 pe-3  text-start w-[140px] min-w-[140px] p-2",children:"Invoice Address"}),(0,x.jsx)("td",{className:"text-start ps-2",children:r.invoiceAddress})]}),(0,x.jsxs)("tr",{className:"border-b ",children:[(0,x.jsx)("th",{className:"border-r dark:border-neutral-500 pe-3  text-start w-[140px] min-w-[140px] p-2",children:"Pickup Address"}),(0,x.jsx)("td",{className:"text-start ps-2",children:r.pickupAddress})]})]})}),(0,x.jsx)("div",{className:"mt-2 mb-10 grid grid-cols-2 gap-3",children:(0,x.jsxs)("div",{className:"flex items-center w-full",children:[(0,x.jsx)("span",{className:"w-full border p-2",children:"Brand Logo"}),(0,x.jsxs)("a",{href:r.brand_id&&r.brand_id.length>0?r.brand_id[0].brandLogo:"",target:"_blank",className:"bg-blue-500 border border-blue-500 cursor-pointer text-white p-2 inline-flex items-center",children:[(0,x.jsx)(c.i5$,{className:"me-2",size:20})," Preview"]})]})})]})}),(0,x.jsx)(n.x4,{children:(0,x.jsxs)("div",{className:"mt-5 grid grid-cols-2 gap-3 items-center justify-between",children:[(0,x.jsxs)("div",{className:"flex items-center w-full",children:[(0,x.jsx)("span",{className:"w-full border p-2",children:"Brand Registration Doc"}),(0,x.jsxs)("a",{href:r.document_id?r.document_id.brandRegDoc:"",target:"_blank",className:"bg-blue-500 border border-blue-500 text-white p-2 inline-flex items-center",children:[(0,x.jsx)(c.i5$,{className:"me-2",size:20})," Preview"]})]}),(0,x.jsxs)("div",{className:"flex items-center w-full",children:[(0,x.jsx)("span",{className:"w-full border p-2",children:"GST certificate"}),(0,x.jsxs)("a",{href:r.document_id?r.document_id.gstRegDoc:"",target:"_blank",className:"bg-blue-500 border border-blue-500 text-white p-2 inline-flex items-center",children:[(0,x.jsx)(c.i5$,{className:"me-2",size:20})," Preview"]})]})]})}),(0,x.jsxs)(n.x4,{children:[(0,x.jsx)("div",{className:"max-h-[600px] overflow-y-scroll scrollbar-auto mt-5 pe-1",children:(0,x.jsx)("table",{className:"dark:border-neutral-500 border w-full",children:(0,x.jsxs)("tbody",{children:[(0,x.jsxs)("tr",{className:"border-b",children:[(0,x.jsx)("th",{className:"border-r dark:border-neutral-500 pe-3  text-start w-[200px] min-w-[140px] p-2",children:"Account Holder Name"}),(0,x.jsx)("td",{className:"text-start ps-2",children:r.bank_id&&r.bank_id.acHolderName})]}),(0,x.jsxs)("tr",{className:"border-b ",children:[(0,x.jsx)("th",{className:"border-r dark:border-neutral-500 pe-3  text-start w-[140px] min-w-[140px] p-2",children:"Account Number"}),(0,x.jsx)("td",{className:"text-start ps-2",children:r.bank_id&&r.bank_id.acNo})]}),(0,x.jsxs)("tr",{className:"border-b ",children:[(0,x.jsx)("th",{className:"border-r dark:border-neutral-500 pe-3  text-start w-[140px] min-w-[140px] p-2",children:"Bank Name"}),(0,x.jsx)("td",{className:"text-start ps-2",children:r.bank_id&&r.bank_id.bankName})]}),(0,x.jsxs)("tr",{className:"border-b ",children:[(0,x.jsx)("th",{className:"border-r dark:border-neutral-500 pe-3  text-start w-[140px] min-w-[140px] p-2",children:"Branch"}),(0,x.jsx)("td",{className:"text-start ps-2",children:r.bank_id&&r.bank_id.branch})]}),(0,x.jsxs)("tr",{className:"border-b ",children:[(0,x.jsx)("th",{className:"border-r dark:border-neutral-500 pe-3  text-start w-[140px] min-w-[140px] p-2",children:"IFSC Code"}),(0,x.jsx)("td",{className:"text-start ps-2",children:r.bank_id&&r.bank_id.ifsc})]})]})})}),(0,x.jsx)("div",{className:"my-10 grid grid-cols-2 gap-3",children:(0,x.jsxs)("div",{className:"flex items-center w-full",children:[(0,x.jsx)("span",{className:"w-full border p-2",children:"Cancelled Cheque"}),(0,x.jsxs)("a",{href:r.bank_id?r.bank_id.cancelledCheque:"",target:"_blank",className:"bg-blue-500 border border-blue-500 text-white p-2 inline-flex items-center",children:[(0,x.jsx)(c.i5$,{className:"me-2",size:20})," Preview"]})]})})]})]}),(0,x.jsxs)("div",{className:" flex items-center justify-start space-x-1 border-t-2 pt-2",children:[(0,x.jsx)(d.I,{defaultValue:r.marginInPercentage&&r.marginInPercentage,onChange:function(e){return f(e.target.value)},type:"number",placeholder:"Margin value %",size:"sm",width:"150px"}),(0,x.jsxs)(i.P,{width:"200px",onChange:function(e){return b(e.target.value)},defaultValue:h,value:null===h?r.status:h,placeholder:"Approval Status",size:"sm",children:[(0,x.jsx)("option",{value:"Pending",children:"Pending"}),(0,x.jsx)("option",{value:"Rejected",children:"Rejected"}),(0,x.jsx)("option",{value:"Approved",children:"Approved"})]}),(0,x.jsxs)(i.P,{width:"150px",onChange:function(e){return S(e.target.value)},defaultValue:r.isActive,value:k,placeholder:"Account Status",size:"sm",children:[(0,x.jsx)("option",{value:"Active",children:"Active"}),(0,x.jsx)("option",{value:"Blocked",children:"Block"})]}),(0,x.jsx)(o.z,{size:"sm",onClick:function(){null===g&&null===k&&null===h||u({vendorStatus:h,vendorMargin:g,isActive:k},r._id)},colorScheme:"messenger",children:"Save Changes"}),(0,x.jsx)(o.z,{size:"sm",onClick:function(){return t()},colorScheme:"red",children:"Cancel"})]})]})})})}},9993:function(e,r,t){"use strict";t.r(r),t.d(r,{default:function(){return G}});var s=t(4165),a=t(5861),n=t(9439),l=t(2791),c=t(9434),d=t(9126),i=t(9129),o=t(4873),x=t(3858),u=(t(5905),t(1413)),m=t(6856),p=t(144),h=t(184),b=function(e){var r=e.details,t=e.actionClose,s=e.save,a=e.changeStatusHandler,d=(e.vendorHandler,(0,c.v9)((function(e){return e})).userInfoReducer),i=(0,l.useState)(r.status),o=(0,n.Z)(i,2),x=o[0],b=o[1],j=(0,l.useState)({margin:r.margin?r.margin:"",sellingGst:r.sellingGST?r.sellingGST:""}),N=(0,n.Z)(j,2),g=N[0],f=N[1];return(0,h.jsx)("div",{className:"fixed z-20 top-0 left-0 right-0 bottom-0 bg-[#00000088] ",children:(0,h.jsx)("div",{className:"w-1/2 bg-white mt-5 absolute m-auto right-0 left-0 rounded-md",children:(0,h.jsxs)("div",{className:"p-3 w-full",children:[(0,h.jsxs)("div",{className:"flex items-center justify-between border-b mb-4 pb-2",children:[(0,h.jsx)("h1",{className:"text-xl font-bold  ",children:"Product Information"}),(0,h.jsx)("button",{className:"bg-teal-100 p-1 rounded",title:"Cancel & Close Model",onClick:function(){return t()},children:(0,h.jsx)(m.FU5,{size:20})})]}),(0,h.jsxs)("div",{className:"flex justify-center items-start",children:[(0,h.jsxs)("div",{className:"w-[60%] max-h-[400px] overflow-y-scroll scrollbar-auto",children:[(0,h.jsx)("table",{className:"dark:border-neutral-500 border w-full",children:(0,h.jsxs)("tbody",{className:"text-sm",children:[(0,h.jsxs)("tr",{className:"border-b",children:[(0,h.jsx)("th",{className:"border-r dark:border-neutral-500  text-start w-[140px] min-w-[140px] ps-2 py-1",children:"Product Name"}),(0,h.jsx)("td",{className:"text-start ps-2",children:r.product_name})]}),(0,h.jsxs)("tr",{className:"border-b",children:[(0,h.jsx)("th",{className:"border-r dark:border-neutral-500  text-start w-[140px] min-w-[140px] ps-2 py-1",children:"SKU CODE"}),(0,h.jsx)("td",{className:"text-start ps-2",children:r.sku_code})]}),(0,h.jsxs)("tr",{className:"border-b",children:[(0,h.jsx)("th",{className:"border-r dark:border-neutral-500  text-start w-[140px] min-w-[140px] ps-2 py-1",children:"Brand"}),(0,h.jsx)("td",{className:"text-start ps-2",children:r.brandId.brand_name})]}),(0,h.jsxs)("tr",{className:"border-b",children:[(0,h.jsx)("th",{className:"border-r dark:border-neutral-500  text-start w-[140px] min-w-[140px] ps-2 py-1",children:"Category"}),(0,h.jsx)("td",{className:"text-start ps-2",children:r.categoryId.category_name})]}),(0,h.jsxs)("tr",{className:"border-b",children:[(0,h.jsx)("th",{className:"border-r dark:border-neutral-500  text-start w-[140px] min-w-[140px] ps-2 py-1",children:"Sub Category"}),(0,h.jsxs)("td",{className:"text-start ps-2",children:["T",r.subCatId.subcategory_name]})]}),(0,h.jsxs)("tr",{className:"border-b",children:[(0,h.jsx)("th",{className:"border-r dark:border-neutral-500  text-start w-[140px] min-w-[140px] ps-2 py-1",children:"Lot Size"}),(0,h.jsx)("td",{className:"text-start ps-2",children:(0,h.jsx)("ul",{children:r.lotSizeQty.length>0&&r.lotSizeQty.map((function(e,r){return(0,h.jsx)("li",{children:e})}))})})]}),(0,h.jsxs)("tr",{className:"border-b",children:[(0,h.jsx)("th",{className:"border-r dark:border-neutral-500  text-start w-[140px] min-w-[140px] ps-2 py-1",children:"Color"}),(0,h.jsx)("td",{className:"text-start ps-2",children:r.color_id.colorName})]}),(0,h.jsxs)("tr",{className:"border-b",children:[(0,h.jsx)("th",{className:"border-r dark:border-neutral-500  text-start w-[140px] min-w-[140px] ps-2 py-1",children:"Mrp"}),(0,h.jsxs)("td",{className:"text-start ps-2 font-bold text-blue-500",children:["\u20b9 ",r.mrp]})]}),(0,h.jsxs)("tr",{className:"border-b",children:[(0,h.jsx)("th",{className:"border-r dark:border-neutral-500  text-start w-[140px] min-w-[140px] ps-2 py-1",children:"GST in %"}),(0,h.jsxs)("td",{className:"text-start ps-2 font-bold text-blue-500",children:[r.gst," %"]})]}),(0,h.jsxs)("tr",{className:"border-b",children:[(0,h.jsx)("th",{className:"border-r dark:border-neutral-500  text-start w-[140px] min-w-[140px] ps-2 py-1",children:"Seller Price"}),(0,h.jsxs)("td",{className:"text-start ps-2 font-bold text-blue-500",children:["\u20b9 ",r.seller_price]})]}),(0,h.jsxs)("tr",{className:"border-b",children:[(0,h.jsx)("th",{className:"border-r dark:border-neutral-500  text-start w-[140px] min-w-[140px] ps-2 py-1",children:"In hand QTY"}),(0,h.jsx)("td",{className:"text-start ps-2",children:r.qty_in_hand})]}),(0,h.jsxs)("tr",{className:"border-b",children:[(0,h.jsx)("th",{className:"border-r dark:border-neutral-500  text-start w-[140px] min-w-[140px] ps-2 py-1",children:"Minimum Order"}),(0,h.jsx)("td",{className:"text-start ps-2",children:r.min_order_qty})]}),(0,h.jsxs)("tr",{className:"border-b",children:[(0,h.jsx)("th",{className:"border-r dark:border-neutral-500  text-start w-[140px] min-w-[140px] ps-2 py-1",children:"Sole"}),(0,h.jsx)("td",{className:"text-start ps-2",children:r.sole})]}),(0,h.jsxs)("tr",{className:"border-b",children:[(0,h.jsx)("th",{className:"border-r dark:border-neutral-500  text-start w-[140px] min-w-[140px] ps-2 py-1",children:"Material"}),(0,h.jsx)("td",{className:"text-start ps-2",children:r.material})]}),(0,h.jsxs)("tr",{className:"border-b",children:[(0,h.jsx)("th",{className:"border-r dark:border-neutral-500  text-start w-[140px] min-w-[140px] ps-2 py-1",children:"Packing Type"}),(0,h.jsx)("td",{className:"text-start ps-2",children:r.packing_type})]}),(0,h.jsxs)("tr",{className:"border-b",children:[(0,h.jsx)("th",{className:"border-r dark:border-neutral-500  text-start w-[140px] min-w-[140px] ps-2 py-1",children:"Made In"}),(0,h.jsx)("td",{className:"text-start ps-2",children:r.made_in})]}),(0,h.jsxs)("tr",{className:"border-b",children:[(0,h.jsx)("th",{className:"border-r dark:border-neutral-500  text-start w-[140px] min-w-[140px] ps-2 py-1",children:"Weight"}),(0,h.jsx)("td",{className:"text-start ps-2",children:r.weight})]}),(0,h.jsxs)("tr",{className:"border-b",children:[(0,h.jsx)("th",{className:"border-r dark:border-neutral-500  text-start w-[140px] min-w-[140px] ps-2 py-1",children:"Status"}),(0,h.jsx)("td",{className:"text-start ps-2",children:(0,h.jsx)("span",{className:"bg-black rounded-full text-white px-3",children:r.status})})]}),(0,h.jsxs)("tr",{className:"border-b",children:[(0,h.jsx)("th",{className:"border-r dark:border-neutral-500  text-start w-[140px] min-w-[140px] ps-2 py-1",children:"Stock Status"}),(0,h.jsx)("td",{className:"text-start ps-2",children:(0,h.jsxs)("select",{className:"border px-2 outline-none",value:r.stockStatus,onChange:function(e){var t;"Out_of_stock"===(t=e.target.value)?r.stockStatus!==t&&window.confirm("After perform action this product will not be visible to the client, press OK to change the status")&&a({productId:r._id,newStockStatus:t}):r.stockStatus!==t&&window.confirm("Press OK to change the status")&&a({productId:r._id,newStockStatus:t})},children:[(0,h.jsx)("option",{value:"",children:"Stock Status"}),(0,h.jsx)("option",{value:"In_stock",children:"In Stock"}),(0,h.jsx)("option",{value:"Out_of_stock",children:"Out Of Stock"})]})})]}),(0,h.jsxs)("tr",{className:"border-b",children:[(0,h.jsx)("th",{className:"border-r dark:border-neutral-500  text-start w-[140px] min-w-[140px] ps-2 py-1",children:"Description"}),(0,h.jsx)("td",{className:"text-start ps-2",children:r.description})]})]})}),"Seller"!==d.userType&&(0,h.jsxs)("div",{className:"mt-4",children:[(0,h.jsx)("h4",{className:"font-bold text-sm text-blue-500",children:"Product Selling Price And Selling GST"}),(0,h.jsx)("table",{className:"dark:border-neutral-500 border w-full bg-yellow-50",children:(0,h.jsxs)("tbody",{className:"text-sm",children:[(0,h.jsxs)("tr",{className:"border-b",children:[(0,h.jsx)("th",{className:"border-r dark:border-neutral-500  text-start w-[140px] min-w-[140px] ps-2 py-1",children:"Margin %"}),(0,h.jsx)("td",{className:"text-start ps-2",children:(0,h.jsx)("input",{type:"number",defaultValue:g.margin,className:"outline-none",placeholder:"Margin percentage",onChange:function(e){return f((function(r){return(0,u.Z)((0,u.Z)({},r),{},{margin:e.target.value})}))}})})]}),(0,h.jsxs)("tr",{className:"border-b",children:[(0,h.jsx)("th",{className:"border-r dark:border-neutral-500  text-start w-[140px] min-w-[140px] ps-2 py-1",children:"Selling GST %"}),(0,h.jsx)("td",{className:"text-start ps-2",children:(0,h.jsx)("input",{type:"number",defaultValue:g.sellingGst,className:"outline-none",placeholder:"GST percentage",onChange:function(e){return f((function(r){return(0,u.Z)((0,u.Z)({},r),{},{sellingGst:e.target.value})}))}})})]}),(0,h.jsxs)("tr",{className:"border-b",children:[(0,h.jsx)("th",{className:"border-r dark:border-neutral-500  text-start w-[140px] min-w-[140px] ps-2 py-1",children:"Total Selling Price"}),(0,h.jsxs)("td",{className:"text-start ps-2 font-bold text-blue-500",children:["\u20b9 ",(0,p.calculateMarginAndSelling)(r.seller_price,g.margin,g.sellingGst)]})]})]})})]})]}),(0,h.jsxs)("div",{className:"flex-1 ps-2 max-h-[400px] overflow-y-scroll scrollbar-auto",children:[(0,h.jsx)("div",{className:"w-full border",children:(0,h.jsx)("a",{href:r.thumbnail_pic,target:"_blank",children:(0,h.jsx)("img",{src:r.thumbnail_pic,alt:r.product_name})})}),(0,h.jsx)("div",{className:"grid grid-cols-3 gap-2",children:r.multiple_pics.length>0&&r.multiple_pics.map((function(e,r){return(0,h.jsx)("a",{href:e,target:"_blank",children:(0,h.jsx)("img",{src:e,alt:""})},r)}))})]})]}),(0,h.jsxs)("div",{className:"flex justify-start items-center mt-5",children:["Seller"!==d.userType&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)("select",{value:x,onChange:function(e){return b(e.target.value)},className:"border border-green-500 outline-none py-1 ",children:[(0,h.jsx)("option",{value:"",children:"Status Change"}),(0,h.jsx)("option",{value:"Pending",children:"Pending"}),(0,h.jsx)("option",{value:"Rejected",children:"Rejected"}),(0,h.jsx)("option",{value:"Approved",children:"Approved"})]}),(0,h.jsx)("button",{className:"bg-blue-500 text-white px-3 py-1 mx-2",onClick:function(){r.status!==x&&window.confirm("Are you sure to change the product status?")?"Approved"===x?g.margin>0&&g.sellingGst>0?s({productId:r._id,newStatus:x,marginGst:g}):alert("Product can only be Approved if Margin and Selling GST is provided"):s({productId:r._id}):r.margin!==g.margin||r.sellingGST!==g.sellingGst?(console.log("margin and selling gst change"),s({productId:r._id,newStatus:x,marginGst:g})):t()},children:"Save Changes"})]}),(0,h.jsx)("button",{className:"bg-red-500 text-white px-3 py-1",onClick:function(){return t()},children:"Cancel"})]})]})})})},j=t(4262),N=t(3513),g=t(3524),f=t(9055),w=t(9853),v=t(9450),k=t(2872),S=t(5497),y=t(4475),_=t(4627),C=t(1692),A=t(548),I=t(7943),P=function(e){var r=e.filterText,t=e.onFilter,s=e.onClear;return(0,h.jsx)("div",{className:"flex items-center",children:(0,h.jsxs)(C.B,{children:[(0,h.jsx)(A.I,{w:"400px",placeholder:"Search by product, SKU or Seller Name",value:r,onChange:t}),(0,h.jsx)(I.x,{children:(0,h.jsx)(m.lTq,{size:30,color:"green.500",onClick:s,className:"cursor-pointer hover:bg-blue-50 p-1 rounded-md"})})]})})},T=t(9935),z=t(7489),G=function(e){e.userInfoReducer;var r=e.tokenReducer,t=(0,c.I0)(),u=(0,l.useState)([]),m=(0,n.Z)(u,2),p=m[0],C=m[1],A=(0,l.useState)({flag:!1,data:null}),I=(0,n.Z)(A,2),G=I[0],Z=I[1],B=l.useState(""),O=(0,n.Z)(B,2),M=O[0],R=O[1],D=l.useState(!1),H=(0,n.Z)(D,2),E=H[0],V=H[1];var F=function(e){var r=e.onExport;return(0,h.jsx)(f.z,{colorScheme:"whatsapp",leftIcon:(0,h.jsx)(g.c2j,{size:25}),onClick:function(e){return r(e.target.value)},children:"Export"})},L=[{name:"Img",selector:function(e){return(0,h.jsx)("img",{className:" object-contain h-12 w-12",src:e.thumbnail_pic,alt:e.product_name})}},{name:"SKU CODE",selector:function(e){return e.sku_code}},{name:(0,h.jsx)("span",{className:"whitespace-normal",children:"Product Name"}),selector:function(e){return(0,h.jsx)("span",{className:"whitespace-normal",children:e.product_name})}},{name:"Brand",selector:function(e){return(0,h.jsx)("span",{className:"whitespace-normal",children:e.brandId.brand_name})}},{name:"HSN code",selector:function(e){return e.hsn_code}},{name:"Category",selector:function(e){return(0,h.jsx)("span",{className:"whitespace-normal",children:e.categoryId.category_name})}},{name:(0,h.jsx)("span",{className:"whitespace-normal",children:"Sub Category"}),selector:function(e){return e.subCatId.subcategory_name}},{name:(0,h.jsx)("span",{className:"whitespace-normal",children:"Dt. Added"}),selector:function(e){return(0,x.localDate)(e.createdAt)}},{name:"Seller Name",selector:function(e){return e.vendor_id.firmName}},{name:"Status",selector:function(e){return(0,h.jsx)(w.C,{py:1,variant:"solid",children:e.status})}},{name:"Action",selector:function(e){return(0,h.jsxs)(v.J,{placement:"left",styleConfig:{popper:{maxWidth:"unset",width:"unset"}},children:[(0,h.jsx)(k.x,{children:(0,h.jsx)("button",{className:"focus:outline-none",children:(0,h.jsx)(d.FQA,{size:35,className:" border dark:border-neutral-500 cursor-pointer py-1 rounded-md hover:bg-teal-100 dark:hover:bg-teal-800"})})}),(0,h.jsx)(S.h,{children:(0,h.jsx)(y.y,{className:"bg-white rounded shadow-md",children:(0,h.jsx)(_.b,{children:(0,h.jsx)("div",{className:"flex items-center",children:(0,h.jsx)(i.Lr9,{size:30,color:"green",className:"m-2 cursor-pointer",title:"Information",onClick:function(){return U(e._id,e)}})})})})})]})}}],K=function(){var e=(0,a.Z)((0,s.Z)().mark((function e(){return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,o.yw)(r).then((function(e){console.log(e.data),C((function(r){return e.data.data}))})).catch((function(e){console.log(e)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),q=function(){var e=(0,a.Z)((0,s.Z)().mark((function e(a){return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t((0,j.Q5)()),"Approved"!==a.newStatus){e.next=6;break}return e.next=4,(0,o.kA)({newStatus:a.newStatus,margin:a.marginGst.margin,sellingGST:a.marginGst.sellingGst},a.productId,r).then((function(e){Z({flag:!1,data:null}),K(),alert(e.data.message)})).catch((function(e){console.log(e)}));case 4:e.next=8;break;case 6:return e.next=8,(0,o.kA)({newStatus:a.newStatus},a.productId,r).then((function(e){Z({flag:!1,data:null}),console.log(e.data),K(),alert(e.data.data.message)})).catch((function(e){console.log(e)}));case 8:t((0,j.tV)());case 9:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}(),Q=function(){var e=(0,a.Z)((0,s.Z)().mark((function e(a){return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t((0,j.Q5)()),e.next=3,(0,o.wb)({newStockStatus:a.newStockStatus},a.productId,r).then((function(e){Z({flag:!1,data:null}),console.log(e.data),K(),alert(e.data.data.message)})).catch((function(e){console.log(e)}));case 3:t((0,j.tV)());case 4:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}(),U=function(e,r){Z({flag:!0,data:r}),console.log(e)},W=p.filter((function(e){var r=null;return(e.product_name.toLowerCase().includes(M.toLowerCase())||e.sku_code.includes(M.toLowerCase())||e.vendor_id.firmName.toLowerCase().includes(M.toLowerCase()))&&(r=e),r})),$=l.useMemo((function(){return(0,h.jsxs)("div",{className:"flex items-center space-x-3",children:[(0,h.jsx)(P,{onFilter:function(e){return R(e.target.value)},onClear:function(){W&&(V(!E),R(""))},filterText:M}),console.log(W),(0,h.jsx)(F,{onExport:function(){return function(e){var r=document.createElement("a"),t=(0,z.convertProductArrayOfObjectsToCSV)(e);null!=t&&(t.match(/^data:text\/csv/i)||(t="data:text/csv;charset=utf-8,".concat(t)),r.setAttribute("href",encodeURI(t)),r.setAttribute("download","products.csv"),r.click())}(W)}})]})}),[M,W,E]);return(0,l.useEffect)((function(){K()}),[]),(0,h.jsxs)("div",{className:"bg-gray-50 dark:bg-gray-800",children:[G.flag&&(0,h.jsx)(b,{save:q,details:G.data,changeStatusHandler:Q,actionClose:function(){return Z({data:null,flag:!1})}}),(0,h.jsx)(N.ZP,{columns:L,data:W,selectableRows:!0,pagination:!0,paginationComponentOptions:{rowsPerPageText:"No of Rows",rangeSeparatorText:"Total Records",selectAllRowsItem:!0,selectAllRowsItemText:"HSN code"},paginationResetDefaultPage:E,subHeader:!0,onSelectedRowsChange:function(e){console.log(e)},subHeaderComponent:$,customStyles:T.X,subHeaderAlign:"left"})]})}},7489:function(e,r,t){var s=t(3858).localDate,a=["product_name","sku_code","hsn_code","seller_price","sellingGST","margin","qty_in_hand","color_id","categoryId","subCatId","status","brandId","vendor_id","createdAt"],n=["Product Name","SKU Code","HSN Code","Seller Price","Selling GST","Margin","Qty in Hand","Color","Category","Sub Category","Status","Brand","Seller","Create Date"],l=["firmName","gstNo","representativeName","emailId","mobileNo","brand_id","vendor_unique_id","status","createdAt","marginInPercentage","actionTakenBy"],c=["Firm Name","GST No","Seller Name","Email ID","Mobile No","Brand Name","Seller Unique ID","Status","Create Date","Action Taken By","Margin in %"];e.exports={convertProductArrayOfObjectsToCSV:function(e){var r;if(0===e.length)return null;var t=Object.keys(e[0]);return r="",r+=n.join(","),r+="\n",e.forEach((function(e){var n=0;t.forEach((function(t){console.log(t),a.includes(t)&&(n>0&&(r+=","),r+="color_id"===t?e[t].colorName:"categoryId"===t?e[t].category_name:"subCatId"===t?e[t].subcategory_name:"brandId"===t?e[t].brand_name:"vendor_id"===t?e[t].firmName:"createdAt"===t?s(e[t]):e[t],n++)})),r+="\n"})),r},convertVendorArrayOfObjectsToCSV:function(e){var r;if(0===e.length)return null;var t=Object.keys(e[0]);return r="",r+=c.join(","),r+="\n",e.forEach((function(e){var a=0;t.forEach((function(t){if(l.includes(t)){if(a>0&&(r+=","),"brand_id"===t){var n="";e[t].forEach((function(e){return n+="".concat(e.brand_name," | ")})),console.log("BB",n),r+=n||"-"}else"actionTakenBy"===t?(console.log("Name",e[t].name),e[t].name?r+=e[t].name:r+="-"):"createdAt"===t?e[t]?r+=s(e[t]):r+="-":e[t]?r+=e[t]:r+="-";a++}})),r+="\n"})),r}}},9935:function(e,r,t){"use strict";t.d(r,{X:function(){return s}});var s={rows:{style:{minHeight:"60px"}},headRow:{style:{backgroundColor:"#B2F5EA",minHeight:"45px",marginTop:"10px",borderBottomWidth:"1px",borderBottomColor:"#B2F5EA",borderBottomStyle:"solid"}},head:{style:(0,t(4942).Z)({color:"#4A5568",fontSize:"0.75rem",fontWeight:500,textTransform:"uppercase"},"fontWeight","700")},subHeader:{style:{paddingLeft:"5px"}}}}}]);
//# sourceMappingURL=993.e483d3e2.chunk.js.map