(self.webpackChunkfactorez_dashboard=self.webpackChunkfactorez_dashboard||[]).push([[251],{5905:function(e,r,t){"use strict";var a=t(9439),s=t(2791),n=t(6747),l=t(6856),c=t(9126),o=t(548),i=t(6773),d=t(9055),u=t(184);r.Z=function(e){var r=e.details,t=e.actionClose,m=e.save,x=(e.changeHandler,e.vendorHandler,(0,s.useState)(null)),b=(0,a.Z)(x,2),h=b[0],p=b[1],f=(0,s.useState)(null),N=(0,a.Z)(f,2),j=N[0],g=N[1],w=(0,s.useState)(null),v=(0,a.Z)(w,2),k=v[0],C=v[1];console.log(r);return(0,u.jsx)("div",{className:"fixed z-20 top-0 left-0 right-0 bottom-0 bg-[#00000088] ",children:(0,u.jsx)("div",{className:"w-1/2 bg-white mt-5 absolute m-auto right-0 left-0 rounded-md",children:(0,u.jsxs)("div",{className:"p-3 w-full",children:[(0,u.jsxs)("div",{className:"flex items-center justify-between border-b mb-4 pb-2",children:[(0,u.jsx)("h1",{className:"text-xl font-bold  ",children:"Vendor Information"}),(0,u.jsx)("button",{className:"bg-teal-100 p-1 rounded",title:"Cancel & Close Model",onClick:function(){return t()},children:(0,u.jsx)(l.FU5,{size:20})})]}),(0,u.jsxs)(n.mQ,{className:"mt-1 pb-3",children:[(0,u.jsxs)(n.td,{className:"flex text-base font-medium text-center w-full select-none",children:[(0,u.jsx)(n.OK,{selectedClassName:"bg-teal-100 dark:bg-teal-800 bg-teal-100 border-x-teal-100 border-t-teal-100 border-b-4 border-blue-500",className:"cursor-pointer p-3 w-full  outline-none border",children:"Besic Details"}),(0,u.jsx)(n.OK,{selectedClassName:"bg-teal-100 dark:bg-teal-800 bg-teal-100 border-x-teal-100 border-t-teal-100 border-b-4 border-blue-500",className:"cursor-pointer p-3 w-full border border-x-0 outline-none",children:"Document Details"}),(0,u.jsx)(n.OK,{selectedClassName:"bg-teal-100 dark:bg-teal-800 bg-teal-100 border-x-teal-100 border-t-teal-100 border-b-4 border-blue-500",className:"cursor-pointer p-3 w-full border  outline-none",children:"Bank Account"})]}),(0,u.jsx)(n.x4,{children:(0,u.jsxs)("div",{className:"max-h-[400px] overflow-y-scroll scrollbar-auto mt-5 pe-1",children:[(0,u.jsx)("table",{className:"dark:border-neutral-500 border w-full",children:(0,u.jsxs)("tbody",{children:[(0,u.jsxs)("tr",{className:"border-b",children:[(0,u.jsx)("th",{className:"border-r dark:border-neutral-500 pe-3  text-start w-[140px] min-w-[140px] p-2",children:"Firm Name"}),(0,u.jsx)("td",{className:"text-start ps-2",children:r.firmName})]}),(0,u.jsxs)("tr",{className:"border-b ",children:[(0,u.jsx)("th",{className:"border-r dark:border-neutral-500 pe-3  text-start w-[140px] min-w-[140px] p-2",children:"Brand Name"}),(0,u.jsx)("td",{className:"text-start ps-2",children:r.brand_id&&r.brand_id.length>0&&r.brand_id[0].brand_name})]}),(0,u.jsxs)("tr",{className:"border-b ",children:[(0,u.jsx)("th",{className:"border-r dark:border-neutral-500 pe-3  text-start w-[140px] min-w-[140px] p-2",children:"GST Number"}),(0,u.jsx)("td",{className:"text-start ps-2",children:r.gstNo})]}),(0,u.jsxs)("tr",{className:"border-b ",children:[(0,u.jsx)("th",{className:"border-r dark:border-neutral-500 pe-3  text-start w-[140px] min-w-[140px] p-2",children:"Owner Name"}),(0,u.jsx)("td",{className:"text-start ps-2",children:r.representativeName})]}),(0,u.jsxs)("tr",{className:"border-b ",children:[(0,u.jsx)("th",{className:"border-r dark:border-neutral-500 pe-3  text-start w-[140px] min-w-[140px] p-2",children:"Email"}),(0,u.jsx)("td",{className:"text-start ps-2",children:r.emailId})]}),(0,u.jsxs)("tr",{className:"border-b ",children:[(0,u.jsx)("th",{className:"border-r dark:border-neutral-500 pe-3  text-start w-[140px] min-w-[140px] p-2",children:"Mobile Number"}),(0,u.jsx)("td",{className:"text-start ps-2",children:r.mobileNo})]}),(0,u.jsxs)("tr",{className:"border-b ",children:[(0,u.jsx)("th",{className:"border-r dark:border-neutral-500 pe-3  text-start w-[140px] min-w-[140px] p-2",children:"Alt Mobile No"}),(0,u.jsx)("td",{className:"text-start ps-2",children:r.altMobileNo})]}),(0,u.jsxs)("tr",{className:"border-b ",children:[(0,u.jsx)("th",{className:"border-r dark:border-neutral-500 pe-3  text-start w-[140px] min-w-[140px] p-2",children:"Pickup State"}),(0,u.jsx)("td",{className:"text-start ps-2",children:r.pickupState})]}),(0,u.jsxs)("tr",{className:"border-b ",children:[(0,u.jsx)("th",{className:"border-r dark:border-neutral-500 pe-3  text-start w-[140px] min-w-[140px] p-2",children:"Pickup City"}),(0,u.jsx)("td",{className:"text-start ps-2",children:r.pickupCity})]}),(0,u.jsxs)("tr",{className:"border-b ",children:[(0,u.jsx)("th",{className:"border-r dark:border-neutral-500 pe-3  text-start w-[140px] min-w-[140px] p-2",children:"Pickup Pincode"}),(0,u.jsx)("td",{className:"text-start ps-2",children:r.pickupPincode})]}),(0,u.jsxs)("tr",{className:"border-b ",children:[(0,u.jsx)("th",{className:"border-r dark:border-neutral-500 pe-3  text-start w-[140px] min-w-[140px] p-2",children:"Invoice Address"}),(0,u.jsx)("td",{className:"text-start ps-2",children:r.invoiceAddress})]}),(0,u.jsxs)("tr",{className:"border-b ",children:[(0,u.jsx)("th",{className:"border-r dark:border-neutral-500 pe-3  text-start w-[140px] min-w-[140px] p-2",children:"Pickup Address"}),(0,u.jsx)("td",{className:"text-start ps-2",children:r.pickupAddress})]})]})}),(0,u.jsx)("div",{className:"mt-2 mb-10 grid grid-cols-2 gap-3",children:(0,u.jsxs)("div",{className:"flex items-center w-full",children:[(0,u.jsx)("span",{className:"w-full border p-2",children:"Brand Logo"}),(0,u.jsxs)("a",{href:r.brand_id&&r.brand_id.length>0?r.brand_id[0].brandLogo:"",target:"_blank",className:"bg-blue-500 border border-blue-500 cursor-pointer text-white p-2 inline-flex items-center",children:[(0,u.jsx)(c.i5$,{className:"me-2",size:20})," Preview"]})]})})]})}),(0,u.jsx)(n.x4,{children:(0,u.jsxs)("div",{className:"mt-5 grid grid-cols-2 gap-3 items-center justify-between",children:[(0,u.jsxs)("div",{className:"flex items-center w-full",children:[(0,u.jsx)("span",{className:"w-full border p-2",children:"Brand Registration Doc"}),(0,u.jsxs)("a",{href:r.document_id?r.document_id.brandRegDoc:"",target:"_blank",className:"bg-blue-500 border border-blue-500 text-white p-2 inline-flex items-center",children:[(0,u.jsx)(c.i5$,{className:"me-2",size:20})," Preview"]})]}),(0,u.jsxs)("div",{className:"flex items-center w-full",children:[(0,u.jsx)("span",{className:"w-full border p-2",children:"GST certificate"}),(0,u.jsxs)("a",{href:r.document_id?r.document_id.gstRegDoc:"",target:"_blank",className:"bg-blue-500 border border-blue-500 text-white p-2 inline-flex items-center",children:[(0,u.jsx)(c.i5$,{className:"me-2",size:20})," Preview"]})]})]})}),(0,u.jsxs)(n.x4,{children:[(0,u.jsx)("div",{className:"max-h-[600px] overflow-y-scroll scrollbar-auto mt-5 pe-1",children:(0,u.jsx)("table",{className:"dark:border-neutral-500 border w-full",children:(0,u.jsxs)("tbody",{children:[(0,u.jsxs)("tr",{className:"border-b",children:[(0,u.jsx)("th",{className:"border-r dark:border-neutral-500 pe-3  text-start w-[200px] min-w-[140px] p-2",children:"Account Holder Name"}),(0,u.jsx)("td",{className:"text-start ps-2",children:r.bank_id&&r.bank_id.acHolderName})]}),(0,u.jsxs)("tr",{className:"border-b ",children:[(0,u.jsx)("th",{className:"border-r dark:border-neutral-500 pe-3  text-start w-[140px] min-w-[140px] p-2",children:"Account Number"}),(0,u.jsx)("td",{className:"text-start ps-2",children:r.bank_id&&r.bank_id.acNo})]}),(0,u.jsxs)("tr",{className:"border-b ",children:[(0,u.jsx)("th",{className:"border-r dark:border-neutral-500 pe-3  text-start w-[140px] min-w-[140px] p-2",children:"Bank Name"}),(0,u.jsx)("td",{className:"text-start ps-2",children:r.bank_id&&r.bank_id.bankName})]}),(0,u.jsxs)("tr",{className:"border-b ",children:[(0,u.jsx)("th",{className:"border-r dark:border-neutral-500 pe-3  text-start w-[140px] min-w-[140px] p-2",children:"Branch"}),(0,u.jsx)("td",{className:"text-start ps-2",children:r.bank_id&&r.bank_id.branch})]}),(0,u.jsxs)("tr",{className:"border-b ",children:[(0,u.jsx)("th",{className:"border-r dark:border-neutral-500 pe-3  text-start w-[140px] min-w-[140px] p-2",children:"IFSC Code"}),(0,u.jsx)("td",{className:"text-start ps-2",children:r.bank_id&&r.bank_id.ifsc})]})]})})}),(0,u.jsx)("div",{className:"my-10 grid grid-cols-2 gap-3",children:(0,u.jsxs)("div",{className:"flex items-center w-full",children:[(0,u.jsx)("span",{className:"w-full border p-2",children:"Cancelled Cheque"}),(0,u.jsxs)("a",{href:r.bank_id?r.bank_id.cancelledCheque:"",target:"_blank",className:"bg-blue-500 border border-blue-500 text-white p-2 inline-flex items-center",children:[(0,u.jsx)(c.i5$,{className:"me-2",size:20})," Preview"]})]})})]})]}),(0,u.jsxs)("div",{className:" flex items-center justify-start space-x-1 border-t-2 pt-2",children:[(0,u.jsx)(o.I,{defaultValue:r.marginInPercentage&&r.marginInPercentage,onChange:function(e){return g(e.target.value)},type:"number",placeholder:"Margin value %",size:"sm",width:"150px"}),(0,u.jsxs)(i.P,{width:"200px",onChange:function(e){return p(e.target.value)},defaultValue:h,value:null===h?r.status:h,placeholder:"Approval Status",size:"sm",children:[(0,u.jsx)("option",{value:"Pending",children:"Pending"}),(0,u.jsx)("option",{value:"Rejected",children:"Rejected"}),(0,u.jsx)("option",{value:"Approved",children:"Approved"})]}),(0,u.jsxs)(i.P,{width:"150px",onChange:function(e){return C(e.target.value)},defaultValue:r.isActive,value:k,placeholder:"Account Status",size:"sm",children:[(0,u.jsx)("option",{value:"Active",children:"Active"}),(0,u.jsx)("option",{value:"Blocked",children:"Block"})]}),(0,u.jsx)(d.z,{size:"sm",onClick:function(){null===j&&null===k&&null===h||m({vendorStatus:h,vendorMargin:j,isActive:k},r._id)},colorScheme:"messenger",children:"Save Changes"}),(0,u.jsx)(d.z,{size:"sm",onClick:function(){return t()},colorScheme:"red",children:"Cancel"})]})]})})})}},8251:function(e,r,t){"use strict";t.r(r),t.d(r,{default:function(){return T}});var a=t(4165),s=t(5861),n=t(9439),l=t(2791),c=t(9126),o=t(9129),i=t(4873),d=t(3858),u=t(5905),m=t(9434),x=t(4262),b=t(9048),h=t(9055),p=t(9853),f=t(9450),N=t(2872),j=t(5497),g=t(4475),w=t(4627),v=t(3513),k=t(3524),C=t(1692),_=t(548),y=t(7943),S=t(6856),A=t(184),I=function(e){var r=e.filterText,t=e.onFilter,a=e.onClear;return(0,A.jsx)("div",{className:"flex items-center",children:(0,A.jsxs)(C.B,{children:[(0,A.jsx)(_.I,{w:"400px",placeholder:"Search by product, SKU or Seller Name",value:r,onChange:t}),(0,A.jsx)(y.x,{children:(0,A.jsx)(S.lTq,{size:30,color:"green.500",onClick:a,className:"cursor-pointer hover:bg-blue-50 p-1 rounded-md"})})]})})},B=t(9935),P=t(7489);var T=function(e){var r=e.tokenReducer,t=((0,b.p)(),(0,l.useState)([])),C=(0,n.Z)(t,2),_=C[0],y=C[1],S=(0,m.I0)(),T=(0,l.useState)({flag:!1,data:null}),z=(0,n.Z)(T,2),Z=z[0],D=z[1],E=l.useState(""),R=(0,n.Z)(E,2),H=R[0],O=R[1],M=l.useState(!1),V=(0,n.Z)(M,2),F=V[0],L=V[1],q=function(e){var r=e.onExport;return(0,A.jsx)(h.z,{colorScheme:"whatsapp",leftIcon:(0,A.jsx)(k.c2j,{size:25}),onClick:function(e){return r(e.target.value)},children:"Export"})},G=[{name:"Vendor ID",selector:function(e){return e.vendor_unique_id},width:"120px"},{name:(0,A.jsx)("span",{className:"whitespace-normal",children:"Firm Name"}),selector:function(e){return e.firmName}},{name:(0,A.jsx)("span",{className:"whitespace-normal",children:"Name"}),selector:function(e){return(0,A.jsx)("span",{className:"whitespace-normal",children:e.representativeName})}},{name:(0,A.jsx)("span",{className:"whitespace-normal",children:"Margin %"}),selector:function(e){return e.marginInPercentage&&e.marginInPercentage},width:"100px"},{name:"Mobile Number",selector:function(e){return(0,A.jsx)("span",{className:"whitespace-normal",children:e.mobileNo})},width:"150px"},{name:(0,A.jsx)("span",{className:"whitespace-normal",children:"Email ID"}),selector:function(e){return(0,A.jsx)("span",{className:"whitespace-normal",children:e.emailId})}},{name:(0,A.jsx)("span",{className:"whitespace-normal",children:"Dt. Added"}),selector:function(e){return(0,d.localDate)(e.createdAt)},width:"130px"},{name:(0,A.jsx)("span",{className:"whitespace-normal",children:"Approved By"}),selector:function(e){return e.actionTakenBy?e.actionTakenBy.name:"NoAction"}},{name:"Status",selector:function(e){return(0,A.jsx)(p.C,{py:1,variant:"solid",children:e.status})},width:"130px"},{name:"Action",width:"80px",selector:function(e){return(0,A.jsxs)(f.J,{placement:"left",styleConfig:{popper:{maxWidth:"unset",width:"unset"}},children:[(0,A.jsx)(N.x,{children:(0,A.jsx)("button",{className:"focus:outline-none",children:(0,A.jsx)(c.FQA,{size:35,className:" border dark:border-neutral-500 cursor-pointer py-1 rounded-md hover:bg-teal-100 dark:hover:bg-teal-800"})})}),(0,A.jsx)(j.h,{children:(0,A.jsx)(g.y,{className:"bg-white rounded shadow-md",children:(0,A.jsx)(w.b,{children:(0,A.jsx)("div",{className:"flex items-center",children:(0,A.jsx)(o.Lr9,{size:30,color:"green",className:"m-2 cursor-pointer",title:"Information",onClick:function(){return $(e._id,e)}})})})})})]})}}],K=_.filter((function(e){var r=null;return(e.firmName.toLowerCase().includes(H.toLowerCase())||e.representativeName.toLowerCase().includes(H.toLowerCase())||e.vendor_unique_id.includes(H.toLowerCase())||e.mobileNo.includes(H.toLowerCase()))&&(r=e),r})),U=l.useMemo((function(){return(0,A.jsxs)("div",{className:"flex items-center space-x-3",children:[(0,A.jsx)(I,{onFilter:function(e){return O(e.target.value)},onClear:function(){K&&(L(!F),O(""))},filterText:H}),console.log(K),(0,A.jsx)(q,{onExport:function(){return function(e){var r=document.createElement("a"),t=(0,P.convertVendorArrayOfObjectsToCSV)(e);null!=t&&(t.match(/^data:text\/csv/i)||(t="data:text/csv;charset=utf-8,".concat(t)),r.setAttribute("href",encodeURI(t)),r.setAttribute("download","vendors.csv"),r.click())}(K)}})]})}),[H,K,F]),Q=function(){var e=(0,s.Z)((0,a.Z)().mark((function e(){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,i.CB)().then((function(e){console.log(e.data),y(e.data.data)})).catch((function(e){console.log(e)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),W=function(){var e=(0,s.Z)((0,a.Z)().mark((function e(t,s){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return S((0,x.Q5)()),e.next=3,(0,i.YA)(t,r,s).then((function(e){console.log(e.data),alert("vendor updated"),Q(),D({flag:!1,data:null})})).catch((function(e){alert(e.message),console.log(e.message)}));case 3:S((0,x.tV)());case 4:case"end":return e.stop()}}),e)})));return function(r,t){return e.apply(this,arguments)}}(),$=function(e,r){D({flag:!0,data:r}),console.log(e)};return(0,l.useEffect)((function(){Q()}),[]),(0,A.jsxs)("div",{className:"bg-gray-50 dark:bg-gray-800",children:[Z.flag&&(0,A.jsx)(u.Z,{changeHandler:function(e,r,t){console.log(e,r,t)},save:W,details:Z.data,actionClose:function(){return D({data:null,flag:!1})}}),(0,A.jsx)(v.ZP,{columns:G,data:K,selectableRows:!0,pagination:!0,paginationComponentOptions:{rowsPerPageText:"No of Rows",rangeSeparatorText:"Total Records",selectAllRowsItem:!0,selectAllRowsItemText:"HSN code"},paginationResetDefaultPage:F,subHeader:!0,onSelectedRowsChange:function(e){console.log(e)},subHeaderComponent:U,customStyles:B.X,subHeaderAlign:"left"})]})}},7489:function(e,r,t){var a=t(3858).localDate,s=["product_name","sku_code","hsn_code","seller_price","sellingGST","margin","qty_in_hand","color_id","categoryId","subCatId","status","brandId","vendor_id","createdAt"],n=["Product Name","SKU Code","HSN Code","Seller Price","Selling GST","Margin","Qty in Hand","Color","Category","Sub Category","Status","Brand","Seller","Create Date"],l=["firmName","gstNo","representativeName","emailId","mobileNo","brand_id","vendor_unique_id","status","createdAt","marginInPercentage","actionTakenBy"],c=["Firm Name","GST No","Seller Name","Email ID","Mobile No","Brand Name","Seller Unique ID","Status","Create Date","Action Taken By","Margin in %"];e.exports={convertProductArrayOfObjectsToCSV:function(e){var r;if(0===e.length)return null;var t=Object.keys(e[0]);return r="",r+=n.join(","),r+="\n",e.forEach((function(e){var n=0;t.forEach((function(t){console.log(t),s.includes(t)&&(n>0&&(r+=","),r+="color_id"===t?e[t].colorName:"categoryId"===t?e[t].category_name:"subCatId"===t?e[t].subcategory_name:"brandId"===t?e[t].brand_name:"vendor_id"===t?e[t].firmName:"createdAt"===t?a(e[t]):e[t],n++)})),r+="\n"})),r},convertVendorArrayOfObjectsToCSV:function(e){var r;if(0===e.length)return null;var t=Object.keys(e[0]);return r="",r+=c.join(","),r+="\n",e.forEach((function(e){var s=0;t.forEach((function(t){if(l.includes(t)){if(s>0&&(r+=","),"brand_id"===t){var n="";e[t].forEach((function(e){return n+="".concat(e.brand_name," | ")})),console.log("BB",n),r+=n||"-"}else"actionTakenBy"===t?(console.log("Name",e[t].name),e[t].name?r+=e[t].name:r+="-"):"createdAt"===t?e[t]?r+=a(e[t]):r+="-":e[t]?r+=e[t]:r+="-";s++}})),r+="\n"})),r}}},9935:function(e,r,t){"use strict";t.d(r,{X:function(){return a}});var a={rows:{style:{minHeight:"60px"}},headRow:{style:{backgroundColor:"#B2F5EA",minHeight:"45px",marginTop:"10px",borderBottomWidth:"1px",borderBottomColor:"#B2F5EA",borderBottomStyle:"solid"}},head:{style:(0,t(4942).Z)({color:"#4A5568",fontSize:"0.75rem",fontWeight:500,textTransform:"uppercase"},"fontWeight","700")},subHeader:{style:{paddingLeft:"5px"}}}}}]);
//# sourceMappingURL=251.251e480f.chunk.js.map