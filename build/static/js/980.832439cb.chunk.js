"use strict";(self.webpackChunkfactorez_dashboard=self.webpackChunkfactorez_dashboard||[]).push([[980],{7980:function(e,t,n){n.r(t),n.d(t,{default:function(){return I}});var r=n(1413),l=n(3433),a=n(7762),s=n(4165),i=n(5861),o=n(9439),d=n(2791),c=n(9434),u=n(9048),m=n(3164),x=n(1980),h=n(6355),f=n(9126),b=n(2943),p=n(9055),g=n(4524),v=n(421),j=n(2767),k=n(4873),N=n(4262),w=n(6856),y=n(2086),Z=n(608),_=n(71),S=n(184),C=function(e){var t=e.tag,n=e.onClick;return(0,S.jsxs)("div",{className:"bg-[#38c65c] dark:bg-[#00000096] mb-[1px] me-[1px] text-white w-fit px-2 rounded-full flex items-center justify-betweena",children:[(0,S.jsx)("span",{children:t}),(0,S.jsx)("button",{className:"ms-2  border-s ps-2",children:(0,S.jsx)(_.Lp2,{size:20,onClick:function(){return n()}})})]})},I=function(e){for(var t=e.userInfoReducer,n=e.tokenReducer,_=(0,c.I0)(),I=(0,u.p)(),T=(0,d.useState)(null),A=(0,o.Z)(T,2),M=A[0],P=A[1],U=(0,d.useState)(null),D=(0,o.Z)(U,2),Q=D[0],z=D[1],L=(0,d.useState)(!1),q=(0,o.Z)(L,2),B=q[0],O=q[1],E=(0,d.useState)({urls:[],files:"",singleImageUrl:""}),K=(0,o.Z)(E,2),F=K[0],R=K[1],V=(0,d.useState)([]),Y=(0,o.Z)(V,2),G=Y[0],H=Y[1],W=(0,d.useState)(null),J=(0,o.Z)(W,2),X=J[0],$=J[1],ee=(0,d.useState)([]),te=(0,o.Z)(ee,2),ne=te[0],re=te[1],le=(0,d.useState)([]),ae=(0,o.Z)(le,2),se=ae[0],ie=ae[1],oe=(0,d.useState)([]),de=(0,o.Z)(oe,2),ce=de[0],ue=de[1],me=(0,d.useState)([]),xe=(0,o.Z)(me,2),he=xe[0],fe=xe[1],be=(0,d.useState)(0),pe=(0,o.Z)(be,2),ge=pe[0],ve=pe[1],je=(0,d.useState)(0),ke=(0,o.Z)(je,2),Ne=ke[0],we=ke[1],ye=(0,d.useState)(null),Ze=(0,o.Z)(ye,2),_e=Ze[0],Se=Ze[1],Ce=(0,d.useState)(""),Ie=(0,o.Z)(Ce,2),Te=Ie[0],Ae=Ie[1],Me=(0,d.useState)([]),Pe=(0,o.Z)(Me,2),Ue=Pe[0],De=Pe[1],Qe=(0,d.useState)({product_name:"",sku_code:"",hsn_code:"",brandId:"",color:[],categoryId:"",subCatId:"",stockStatus:"In_stock",lotSizeQty:[],mrp:0,seller_price:0,gst:0,qty_in_hand:0,min_order_qty:0,sole:"",material:"",packing_type:"",made_in:"India",weight:"",description:""}),ze=(0,o.Z)(Qe,2),Le=ze[0],qe=ze[1],Be=(0,d.useState)({metaTitle:"",metaKeyword:"",metaDescription:""}),Oe=(0,o.Z)(Be,2),Ee=Oe[0],Ke=Oe[1],Fe=(0,d.useState)(""),Re=(0,o.Z)(Fe,2),Ve=Re[0],Ye=Re[1],Ge=(0,d.useState)({bestSelling:!1,newArrival:!1}),He=(0,o.Z)(Ge,2),We=He[0],Je=He[1],Xe=(0,y.Z)({value:Ve,onChange:function(e){Ye(e),console.log(ne);var t=ne.filter((function(t){if(t.vendor_id._id===e.value)return t}));ie((function(e){return t})),ve((function(t){return e.margin}))}}),$e=document.querySelectorAll("li"),et=0;et<$e.length;et++)$e[et].onclick=function(){document.activeElement.blur()};var tt=function(){var e=(0,i.Z)((0,s.Z)().mark((function e(){return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("Seller"!==t.userType){e.next=5;break}return e.next=3,(0,k.Ty)(t.vendorId,n).then((function(e){console.log(e.data),ie(e.data.data),re(e.data.data)})).catch((function(e){console.log(e)}));case 3:e.next=7;break;case 5:return e.next=7,(0,k.vu)(n).then((function(e){console.log(e.data),re(e.data.data)})).catch((function(e){console.log(e)}));case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),nt=function(){var e=(0,i.Z)((0,s.Z)().mark((function e(){return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("get all category fired"),_((0,N.Q5)()),e.next=4,(0,k.pB)().then((function(e){console.log(e.data),H(e.data.data)})).catch((function(e){console.log(e)}));case 4:_((0,N.tV)());case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),rt=function(){var e=(0,i.Z)((0,s.Z)().mark((function e(){return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("Admin"!==t.userType&&"Super Admin"!==t.userType){e.next=5;break}return _((0,N.Q5)()),e.next=4,(0,k.CB)(n).then((function(e){console.log(e.data);var t,n=[],r=(0,a.Z)(e.data.data);try{for(r.s();!(t=r.n()).done;){var l=t.value;l.marginInPercentage&&l.marginInPercentage>0&&n.push({label:l.firmName,value:l._id,margin:l.marginInPercentage})}}catch(s){r.e(s)}finally{r.f()}console.log(n),fe(n)})).catch((function(e){console.log(e)}));case 4:_((0,N.tV)());case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),lt=function(){var e=(0,i.Z)((0,s.Z)().mark((function e(){var r,l,i,o,d,c,u,m;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(l in console.log(Le),Le.lotSizeQty=Ue,se[_e]&&(Le.brandId=se[_e]._id),G[X]&&(Le.categoryId=G[X]._id),r=new FormData,Le)"lotSizeQty"===l||"color"===l?r.append(l,JSON.stringify(Le[l])):r.append(l,Le[l]);if(r.append("thumbnail",M),F.files.length>0){i=(0,a.Z)(F.files);try{for(i.s();!(o=i.n()).done;)d=o.value,console.log(d),r.append("mulImg",d)}catch(s){i.e(s)}finally{i.f()}}else if(F.urls.length>0){c=(0,a.Z)(F.urls);try{for(c.s();!(u=c.n()).done;)m=u.value,console.log(m),r.append("mulImg",m)}catch(s){c.e(s)}finally{c.f()}}if(r.append("meta",JSON.stringify(Ee)),console.log("first 243"),"Admin"!==t.userType&&"Super Admin"!==t.userType){e.next=26;break}if(!(ge>0&&Ne>0)){e.next=23;break}return r.append("margin",ge),r.append("sellingGST",Ne),r.append("vendor_id",Ve.value),console.log("best Selling",We),r.append("best_arrival",JSON.stringify(We)),_((0,N.Q5)()),e.next=20,(0,k.wN)(r,n).then((function(e){console.log(e.data),I({title:"Product Created Successfully",position:"top",status:"success",isClosable:!0})})).catch((function(e){console.log(e),I({title:"Error",description:e.response.data.message,position:"top",status:"error",isClosable:!0})}));case 20:_((0,N.tV)()),e.next=24;break;case 23:I({title:"Margin and selling gst are required",position:"top",status:"warning",isClosable:!0});case 24:e.next=30;break;case 26:return _((0,N.Q5)()),e.next=29,(0,k.wN)(r,n).then((function(e){console.log(e.data),I({title:"Product Created Successfully",position:"top",status:"success",isClosable:!0})})).catch((function(e){console.log(e),I({title:"Error",description:e.response.data.message,position:"top",status:"error",isClosable:!0})}));case 29:_((0,N.tV)());case 30:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),at=function(){var e=(0,i.Z)((0,s.Z)().mark((function e(){return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return _((0,N.Q5)()),e.next=3,(0,k.df)().then((function(e){ue(e.data.data)})).catch((function(e){console.log(e),alert("Error occurred!")}));case 3:_((0,N.tV)());case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),st=function(e,t){if("DEL"===e){var n=[];R((function(e){return(n=e.urls).splice(t,1),{urls:n,files:"",singleImageUrl:""}}))}else if("ADD"===e)if("http"===F.singleImageUrl.slice(0,4).toLocaleLowerCase()){var r=[];R((function(e){return(r=e.urls).push(e.singleImageUrl),{urls:r,files:"",singleImageUrl:""}}))}else{alert("Please provide a valid image url");R((function(e){return{urls:e.urls,files:"",singleImageUrl:""}}))}};return(0,d.useEffect)((function(){tt(),nt(),rt(),at(),De([])}),[]),(0,S.jsxs)("div",{className:"flex",children:[(0,S.jsxs)("div",{className:"flex-1 me-24",children:[(0,S.jsxs)("div",{className:"grid grid-cols-3 gap-4",children:[(0,S.jsxs)("div",{className:"col-span-2",children:[(0,S.jsx)("h1",{className:"dark:text-white text-[#384047] font-semibold text-lg mb-1",children:"Product Name"}),(0,S.jsx)("input",{type:"text",placeholder:"Product Name",value:Le.product_name,onChange:function(e){return qe((function(t){return(0,r.Z)((0,r.Z)({},t),{},{product_name:e.target.value})}))},className:"outline-none border rounded-md p-2 w-full dark:bg-[#424242] dark:border-[#424242]"})]}),(0,S.jsxs)("div",{children:[(0,S.jsx)("h1",{className:"dark:text-white text-[#384047] font-semibold text-lg mb-1",children:"SKU code"}),(0,S.jsx)("input",{type:"text",placeholder:"SKU code",value:Le.sku_code,onChange:function(e){return qe((function(t){return(0,r.Z)((0,r.Z)({},t),{},{sku_code:e.target.value})}))},className:"outline-none border rounded-md p-2 w-full dark:bg-[#424242] dark:border-[#424242]"})]}),(0,S.jsxs)("div",{children:[(0,S.jsx)("h1",{className:"dark:text-white text-[#384047] font-semibold text-lg mb-1",children:"HSN code"}),(0,S.jsx)("input",{type:"text",placeholder:"HSN code",value:Le.hsn_code,onChange:function(e){return qe((function(t){return(0,r.Z)((0,r.Z)({},t),{},{hsn_code:e.target.value})}))},className:"outline-none border rounded-md p-2 w-full mb-8 dark:bg-[#424242] dark:border-[#424242]"})]}),(0,S.jsxs)("div",{children:[(0,S.jsx)("h1",{className:"dark:text-white text-[#384047] font-semibold text-lg mb-1",children:"Brand"}),(0,S.jsxs)("select",{name:"",id:"",onChange:function(e){return t=e.target.selectedIndex,void Se(t>0?t-1:null);var t},className:"outline-none rounded-md border px-3 py-2  w-full dark:bg-[#424242] dark:border-[#424242]",children:[(0,S.jsx)("option",{value:"",children:"Select Brand"}),se.length>0&&se.map((function(e,t){return(0,S.jsx)("option",{value:e.brand_name,children:e.brand_name},"".concat(e._id))}))]})]}),(0,S.jsxs)("div",{children:[(0,S.jsx)("h1",{className:"dark:text-white text-[#384047] font-semibold text-lg mb-1",children:"Color"}),(0,S.jsx)("div",{tabIndex:"0",className:"group relative inline-block w-full",children:(0,S.jsxs)(m.v,{closeOnSelect:!1,children:[(0,S.jsx)(b.j,{fontWeight:400,className:"text-start",width:"full",bg:"white",variant:"outline",as:p.z,rightIcon:(0,S.jsx)(x.v,{}),children:"Colors"}),(0,S.jsx)(g.q,{minWidth:"240px",children:(0,S.jsx)(v._,{className:"ps-0",type:"checkbox",onChange:function(e){return qe((function(t){return(0,r.Z)((0,r.Z)({},t),{},{color:e})}))},children:ce.map((function(e,t){return(0,S.jsx)(j.i,{value:e._id,children:(0,S.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,S.jsx)(f.AhU,{color:e.colorHex}),(0,S.jsx)("span",{children:e.colorName})]})},e._id)}))})})]})})]})]}),(0,S.jsxs)("div",{className:"grid grid-cols-3 gap-4 mb-8",children:[(0,S.jsxs)("div",{children:[(0,S.jsx)("h1",{className:"dark:text-white text-[#384047] font-semibold text-lg mb-1",children:"Category"}),(0,S.jsxs)("select",{name:"",id:"",onChange:function(e){return t=e.target.selectedIndex,void $(t>0?t-1:null);var t},className:"outline-none border rounded-md px-3 py-2  w-full dark:bg-[#424242] dark:border-[#424242]",children:[(0,S.jsx)("option",{value:"",children:"Select Category"}),G.length>0&&G.map((function(e,t){return(0,S.jsx)("option",{value:"",children:e.category_name},e._id)}))]})]}),(0,S.jsxs)("div",{children:[(0,S.jsx)("h1",{className:"dark:text-white text-[#384047] font-semibold text-lg mb-1",children:"Sub Category"}),(0,S.jsxs)("select",{name:"",id:"",onChange:function(e){return qe((function(t){return(0,r.Z)((0,r.Z)({},t),{},{subCatId:e.target.value})}))},className:"outline-none border rounded-md px-3 py-2  w-full dark:bg-[#424242] dark:border-[#424242]",children:[(0,S.jsx)("option",{value:"",children:"Select SubCategory"}),null!==X&&G[X].sub_category.map((function(e){return(0,S.jsx)("option",{value:e._id,children:e.subcategory_name},e._id)}))]})]}),(0,S.jsxs)("div",{children:[(0,S.jsx)("h1",{className:"dark:text-white text-[#384047] font-semibold text-lg mb-1",children:"Stock status"}),(0,S.jsxs)("select",{name:"",id:"",value:Le.stockStatus,onChange:function(e){return qe((function(t){return(0,r.Z)((0,r.Z)({},t),{},{stockStatus:e.target.value})}))},className:"outline-none border rounded-md px-3 py-2  w-full dark:bg-[#424242] dark:border-[#424242]",children:[(0,S.jsx)("option",{value:"In_stock",children:"In Stock"}),(0,S.jsx)("option",{value:"Out_of_stock",children:"Out Off Stock"})]})]})]}),(0,S.jsxs)("div",{children:[(0,S.jsx)("h1",{className:"dark:text-white text-[#384047] font-semibold text-lg mb-1",children:"Lot Size / Quantity"}),(0,S.jsxs)("div",{className:"rounded-md bg-white p-2 w-full mb-8 border dark:bg-[#424242] dark:border-[#424242] flex flex-wrap",children:[Ue.map((function(e,t){return(0,S.jsx)(C,{tag:e,onClick:function(){return function(e){var t;De((function(n){return(t=(0,l.Z)(n)).splice(e,1),t})),console.log("first")}(t)}},"".concat(t,"_tags"))})),(0,S.jsx)("input",{type:"text",value:Te,className:"outline-none flex-1 ps-1 dark:bg-[#424242]",placeholder:0===Ue.length&&"insert size and press enter",onChange:function(e){return Ae(e.target.value)},onKeyDown:function(e){"Enter"===e.key&&(De((function(e){return[].concat((0,l.Z)(e),[Te])})),Ae(""))}})]})]}),(0,S.jsxs)("div",{className:"grid grid-cols-3 gap-4",children:[(0,S.jsxs)("div",{children:[(0,S.jsx)("h1",{className:"dark:text-white text-[#384047] font-semibold text-lg mb-1",children:"MRP"}),(0,S.jsx)("input",{type:"number",placeholder:"MRP",value:Le.mrp,onChange:function(e){return qe((function(t){return(0,r.Z)((0,r.Z)({},t),{},{mrp:e.target.value})}))},className:"outline-none border rounded-md p-2 w-full mb-8 dark:bg-[#424242] dark:border-[#424242] "})]}),(0,S.jsxs)("div",{children:[(0,S.jsx)("h1",{className:"dark:text-white text-[#384047] font-semibold text-lg mb-1",children:"Seller Price"}),(0,S.jsx)("input",{type:"number",placeholder:"Seller Price",value:Le.seller_price,onChange:function(e){return qe((function(t){return(0,r.Z)((0,r.Z)({},t),{},{seller_price:e.target.value})}))},className:"outline-none border rounded-md p-2 w-full mb-8 dark:bg-[#424242] dark:border-[#424242] "})]}),(0,S.jsxs)("div",{children:[(0,S.jsx)("h1",{className:"dark:text-white text-[#384047] font-semibold text-lg mb-1",children:"Seller GST in %"}),(0,S.jsx)("input",{type:"number",placeholder:"GST in %",value:Le.gst,onChange:function(e){return qe((function(t){return(0,r.Z)((0,r.Z)({},t),{},{gst:e.target.value})}))},className:"outline-none border rounded-md p-2 w-full mb-8 dark:bg-[#424242] dark:border-[#424242]"})]}),(0,S.jsxs)("div",{children:[(0,S.jsx)("h1",{className:"dark:text-white text-[#384047] font-semibold text-lg mb-1",children:"Total"}),(0,S.jsx)("input",{type:"number",disabled:!0,placeholder:"Selling Price",value:(Number(Le.seller_price)+Number(Le.seller_price)*Number(Le.gst)/100).toFixed(2),className:"outline-none border rounded-md p-2 w-full mb-8 dark:bg-[#424242] dark:border-[#424242]"})]}),"Admin"===t.userType||"Super Admin"===t.userType&&(0,S.jsxs)(S.Fragment,{children:[(0,S.jsxs)("div",{children:[(0,S.jsx)("h1",{className:"dark:text-white text-[#384047] font-semibold text-lg mb-1",children:"Vendor margin"}),(0,S.jsx)("input",{type:"number",placeholder:"Margin",value:ge,onChange:function(e){return ve((function(t){return e.target.value}))},className:"outline-none border rounded-md p-2 w-full mb-8 dark:bg-[#424242] dark:border-[#424242] "})]}),(0,S.jsxs)("div",{children:[(0,S.jsx)("h1",{className:"dark:text-white text-[#384047] font-semibold text-lg mb-1",children:"Margin + Seller Price"}),(0,S.jsx)("input",{type:"number",placeholder:"Margin",value:Number(Le.seller_price)+Number(Le.seller_price)*Number(ge)/100,disabled:!0,className:"outline-none border rounded-md p-2 w-full mb-8 dark:bg-[#424242] dark:border-[#424242] "})]}),(0,S.jsxs)("div",{children:[(0,S.jsx)("h1",{className:"dark:text-white text-[#384047] font-semibold text-lg mb-1",children:"Selling GST in %"}),(0,S.jsx)("input",{type:"number",placeholder:"Selling GST",value:Ne,onChange:function(e){return we((function(t){return e.target.value}))},className:"outline-none border rounded-md p-2 w-full mb-8 dark:bg-[#424242] dark:border-[#424242] "})]}),(0,S.jsxs)("div",{children:[(0,S.jsx)("h1",{className:"dark:text-white text-[#384047] font-semibold text-lg mb-1",children:"Total Selling Price"}),(0,S.jsx)("input",{type:"number",placeholder:"Margin",disabled:!0,value:(Number(Le.seller_price)+Number(Le.seller_price)*Number(ge)/100+(Number(Le.seller_price)+Number(Le.seller_price)*Number(ge)/100)*Number(Ne)/100).toFixed(2),className:"outline-none border rounded-md p-2 w-full mb-8 dark:bg-[#424242] dark:border-[#424242] "})]})]}),(0,S.jsxs)("div",{children:[(0,S.jsx)("h1",{className:"dark:text-white text-[#384047] font-semibold text-lg mb-1",children:"QTY in hand"}),(0,S.jsx)("input",{type:"text",placeholder:"QTY in hand",value:Le.qty_in_hand,onChange:function(e){return qe((function(t){return(0,r.Z)((0,r.Z)({},t),{},{qty_in_hand:e.target.value})}))},className:"outline-none border rounded-md p-2 w-full mb-8 dark:bg-[#424242] dark:border-[#424242] "})]}),(0,S.jsxs)("div",{children:[(0,S.jsx)("h1",{className:"dark:text-white text-[#384047] font-semibold text-lg mb-1",children:"Minimum Order QTY"}),(0,S.jsx)("input",{type:"text",placeholder:"Minimum Order QTY",value:Le.min_order_qty,onChange:function(e){return qe((function(t){return(0,r.Z)((0,r.Z)({},t),{},{min_order_qty:e.target.value})}))},className:"outline-none border rounded-md p-2 w-full mb-8 dark:bg-[#424242] dark:border-[#424242] "})]}),(0,S.jsxs)("div",{children:[(0,S.jsx)("h1",{className:"dark:text-white text-[#384047] font-semibold text-lg mb-1",children:"Sole"}),(0,S.jsx)("input",{type:"text",placeholder:"Sole",value:Le.sole,onChange:function(e){return qe((function(t){return(0,r.Z)((0,r.Z)({},t),{},{sole:e.target.value})}))},className:"outline-none border rounded-md p-2 w-full mb-8 dark:bg-[#424242] dark:border-[#424242] "})]}),(0,S.jsxs)("div",{children:[(0,S.jsx)("h1",{className:"dark:text-white text-[#384047] font-semibold text-lg mb-1",children:"Material"}),(0,S.jsx)("input",{type:"text",placeholder:"material",value:Le.material,onChange:function(e){return qe((function(t){return(0,r.Z)((0,r.Z)({},t),{},{material:e.target.value})}))},className:"outline-none border rounded-md p-2 w-full mb-8 dark:bg-[#424242] dark:border-[#424242] "})]}),(0,S.jsxs)("div",{children:[(0,S.jsx)("h1",{className:"dark:text-white text-[#384047] font-semibold text-lg mb-1",children:"Packing type"}),(0,S.jsx)("input",{type:"text",placeholder:"Packing type",value:Le.packing_type,onChange:function(e){return qe((function(t){return(0,r.Z)((0,r.Z)({},t),{},{packing_type:e.target.value})}))},className:"outline-none border rounded-md p-2 w-full mb-8 dark:bg-[#424242] dark:border-[#424242] "})]}),(0,S.jsxs)("div",{children:[(0,S.jsx)("h1",{className:"dark:text-white text-[#384047] font-semibold text-lg mb-1",children:"Made in"}),(0,S.jsx)("input",{type:"text",placeholder:"Made in",value:Le.made_in,onChange:function(e){return qe((function(t){return(0,r.Z)((0,r.Z)({},t),{},{made_in:e.target.value})}))},className:"outline-none border rounded-md p-2 w-full mb-8 dark:bg-[#424242] dark:border-[#424242] "})]}),(0,S.jsxs)("div",{children:[(0,S.jsx)("h1",{className:"dark:text-white text-[#384047] font-semibold text-lg mb-1",children:"Weight"}),(0,S.jsx)("input",{type:"text",placeholder:"Weight",value:Le.weight,onChange:function(e){return qe((function(t){return(0,r.Z)((0,r.Z)({},t),{},{weight:e.target.value})}))},className:"outline-none rounded-md border p-2 w-full mb-8 dark:bg-[#424242] dark:border-[#424242] "})]})]}),(0,S.jsx)("h1",{className:"dark:text-white text-[#384047] font-semibold text-lg mb-1",children:"Description"}),(0,S.jsx)("textarea",{type:"text",placeholder:"summary for product",value:Le.description,onChange:function(e){return qe((function(t){return(0,r.Z)((0,r.Z)({},t),{},{description:e.target.value})}))},className:"outline-none border rounded-md p-2 w-full mb-8 dark:bg-[#424242] dark:border-[#424242]"}),(0,S.jsxs)("div",{className:"p-4 rounded-md bg-[#adffd5] dark:bg-[#0a110d70] mb-8",children:[(0,S.jsxs)("div",{children:[(0,S.jsx)("h1",{className:"dark:text-white text-[#384047] font-semibold text-lg mb-1",children:"Meta Title"}),(0,S.jsx)("input",{type:"text",placeholder:"Meta Title",value:Ee.metaTitle,onChange:function(e){return Ke((function(t){return(0,r.Z)((0,r.Z)({},t),{},{metaTitle:e.target.value})}))},className:"outline-none border rounded-md p-2 w-full mb-8 dark:bg-[#424242] dark:border-[#424242]"})]}),(0,S.jsxs)("div",{children:[(0,S.jsx)("h1",{className:"dark:text-white text-[#384047] font-semibold text-lg mb-1",children:"Meta Keywords"}),(0,S.jsx)("input",{type:"text",placeholder:"Meta  Keywords",value:Ee.metaKeyword,onChange:function(e){return Ke((function(t){return(0,r.Z)((0,r.Z)({},t),{},{metaKeyword:e.target.value})}))},className:"outline-none border rounded-md p-2 w-full mb-8 dark:bg-[#424242] dark:border-[#424242]"})]}),(0,S.jsxs)("div",{children:[(0,S.jsx)("h1",{className:"dark:text-white text-[#384047] font-semibold text-lg mb-1",children:"Meta Description"}),(0,S.jsx)("input",{type:"text",placeholder:"Meta Description",value:Ee.metaDescription,onChange:function(e){return Ke((function(t){return(0,r.Z)((0,r.Z)({},t),{},{metaDescription:e.target.value})}))},className:"outline-none border rounded-md p-2 w-full mb-8 dark:bg-[#424242] dark:border-[#424242]"})]})]}),(0,S.jsxs)("div",{className:"flex items-center justify-start",children:[(0,S.jsx)("button",{className:"bg-[#4BC970] rounded-md border border-[#4BC970] px-3 py-2 text-white font-bold text-lg",onClick:function(){return lt()},children:"Submit"}),(0,S.jsx)("button",{className:"bg-[#ffffff] rounded-md px-3 py-2 ms-3 border border-[#4BC970] text-[#384047] font-bold text-lg",onClick:function(){window.confirm("Are you want to cancel this product")&&(qe({product_name:"",sku_code:"",hsn_code:"",brandId:"",color:"",categoryId:"",subCatId:"",stockStatus:"In_stock",lotSizeQty:[],mrp:0,gst:0,seller_price:0,qty_in_hand:0,min_order_qty:0,sole:"",material:"",packing_type:"",made_in:"",weight:"",description:""}),we((function(e){return 0})),ve((function(e){return 0})),Je({bestSelling:!1,newArrival:!1}),Se((function(e){return null})),$((function(e){return null})),R({urls:[],files:"",singleImageUrl:""}),Ke({metaTitle:"",metaKeyword:"",metaDescription:""}),Ye(""))},children:"Cancel"})]})]}),(0,S.jsxs)("div",{className:"w-[30%]",children:[t.userType&&"Admin"===t.userType||"Super Admin"===t.userType&&(0,S.jsxs)("div",{className:"p-4 rounded-md bg-[#adffd5] dark:bg-[#0a110d70] mb-8",children:[(0,S.jsxs)("div",{children:[(0,S.jsx)("h1",{className:"dark:text-white text-[#384047] font-semibold text-lg mb-1",children:"Select Vendor"}),(0,S.jsx)(Z.Z,(0,r.Z)((0,r.Z)({className:"bg-white"},Xe),{},{options:he}))]}),(0,S.jsxs)("div",{className:"border p-3 mt-5 bg-white rounded-md dark:bg-[#424242] dark:border-[#424242]",children:[(0,S.jsxs)("div",{className:"flex items-center justify-between",children:[(0,S.jsx)("h1",{className:"dark:text-white text-[#384047] font-semibold text-lg mb-1",children:"Show in Best Selling"}),(0,S.jsxs)("label",{htmlFor:"bestSelling",className:"flex items-center",children:[(0,S.jsx)("span",{className:"mx-1 px-3 font-bold text-blue-600 dark:text-yellow-300",children:We.bestSelling?"Yes":"No"}),(0,S.jsxs)("div",{className:"relative",children:[(0,S.jsx)("input",{id:"bestSelling",type:"checkbox",className:"hidden",value:We.bestSelling,onChange:function(e){return Je((function(t){return(0,r.Z)((0,r.Z)({},t),{},{bestSelling:e.target.checked})}))}}),(0,S.jsx)("div",{className:"toggle__line w-12 h-6 bg-gray-200 rounded-full shadow-inner"}),(0,S.jsx)("div",{className:"toggle__dot absolute w-5 h-5 bg-white rounded-full shadow inset-y-0 left-0"})]})]})]}),(0,S.jsxs)("div",{className:"mt-2 flex items-center justify-between",children:[(0,S.jsx)("h1",{className:"dark:text-white text-[#384047] font-semibold text-lg mb-1",children:"Show in New Arrivals"}),(0,S.jsxs)("label",{htmlFor:"newArrivals",className:"flex items-center",children:[(0,S.jsx)("span",{className:"mx-1 px-3 font-bold text-blue-600 dark:text-yellow-300",children:We.newArrival?"Yes":"No"}),(0,S.jsxs)("div",{className:"relative",children:[(0,S.jsx)("input",{id:"newArrivals",type:"checkbox",className:"hidden",value:We.newArrival,onChange:function(e){return Je((function(t){return(0,r.Z)((0,r.Z)({},t),{},{newArrival:e.target.checked})}))}}),(0,S.jsx)("div",{className:"toggle__line w-12 h-6 bg-gray-200 rounded-full shadow-inner"}),(0,S.jsx)("div",{className:"toggle__dot absolute w-5 h-5 bg-white rounded-full shadow inset-y-0 left-0"})]})]})]})]})]}),(0,S.jsxs)("div",{children:[(0,S.jsx)("div",{className:"flex items-center justify-center w-full mb-12",children:(0,S.jsxs)("label",{htmlFor:"toggleB",className:"flex items-center cursor-pointer",children:[(0,S.jsx)("div",{className:"me-3 text-[#384047] font-medium dark:text-white",children:"Image"}),(0,S.jsxs)("div",{className:"relative",children:[(0,S.jsx)("input",{type:"checkbox",defaultChecked:B,id:"toggleB",className:"sr-only",onClick:function(e){return t=e.target.checked,O(t),P(null),void z(null);var t}}),(0,S.jsx)("div",{className:"block bg-gray-600 w-14 h-8 rounded-full"}),(0,S.jsx)("div",{className:"dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"})]}),(0,S.jsx)("div",{className:"ml-3 text-[#384047] font-medium dark:text-white",children:"Link"})]})}),(0,S.jsxs)("div",{className:" border-dashed border-4 py-8 cursor-pointer px-4",onClick:function(){document.getElementById("thumbnailInput").click()},children:[M&&(0,S.jsx)("img",{src:B?M:URL.createObjectURL(M),alt:"",title:"thumbnail Image"}),(0,S.jsxs)("div",{children:[(0,S.jsxs)("div",{className:"".concat(null!==M||B?"hidden":"flex"," flex-col justify-center items-center"),children:[(0,S.jsx)(h.Qvc,{size:150,className:"w-full text-[#683aff]"}),(0,S.jsx)("span",{className:"bg-[#683affbd] text-white font-semibold p-3 rounded-md",children:"Upload a product thumbnail"})]}),(0,S.jsxs)("div",{className:"flex justify-center items-center mt-1 w-full",children:[(0,S.jsx)("input",{type:"".concat(B?"text":"file"),id:"thumbnailInput",onChange:function(e){return function(e){e.target.files?P(e.target.files[0]):z(e.target.value)}(e)},autoComplete:"off",className:"".concat(!B&&"hidden"," outline-none border py-1 w-full dark:bg-[#424242] dark:border-[#424242] px-2")}),(0,S.jsx)("button",{className:"".concat(!B&&"hidden"," bg-[#683aff] text-white font-semibold px-2 py-1 border border-[#683aff] dark:border-[#424242]"),onClick:function(){B&&null!==Q&&("http"===Q.slice(0,4).toLocaleLowerCase()?P(Q):(I({title:"Please provide a valid image url",position:"top",status:"warning",isClosable:!0}),z("")))},children:"upload"})]})]})]})]}),(0,S.jsxs)("div",{className:"mt-5",children:[(0,S.jsx)("span",{className:"mb-1",children:"Multiple Images"}),(0,S.jsx)("div",{children:(0,S.jsx)("input",{type:"file",name:"",id:"",multiple:!0,className:"border border-green-500 w-full",onChange:function(e){return R({urls:[],files:e.target.files})}})}),(0,S.jsxs)("div",{className:"flex justify-center items-center my-3",children:[(0,S.jsx)("div",{className:"border-b-2 w-full me-2"}),(0,S.jsx)("span",{className:"text-xs text-blue-500",children:"OR"}),(0,S.jsx)("div",{className:"border-b-2 w-full ms-2"})]}),(0,S.jsxs)("div",{className:"flex items-center",children:[(0,S.jsx)("input",{type:"text",className:"outline-none border border-green-500 w-full p-1",placeholder:"Image URL",value:F.singleImageUrl,onChange:function(e){return R((function(t){return(0,r.Z)((0,r.Z)({},t),{},{singleImageUrl:e.target.value})}))}}),(0,S.jsx)("button",{className:"border p-1 px-4 border-green-500 bg-green-500 text-white",onClick:function(){return st("ADD")},children:(0,S.jsx)(w.LkC,{size:24})})]}),(0,S.jsx)("div",{className:"mt-2",children:F.urls.length>0&&F.urls.map((function(e,t){return(0,S.jsxs)("div",{className:"flex items-center my-1",children:[(0,S.jsxs)("span",{className:" bg-white w-full p-1",children:[e.slice(0,35),e.length>35&&"..."]}),(0,S.jsx)("button",{className:"p-1 px-4 bg-red-500 text-white",onClick:function(){return st("DEL",t)},children:(0,S.jsx)(w.FH3,{size:24})})]})}))})]})]})]})}}}]);
//# sourceMappingURL=980.832439cb.chunk.js.map