import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { bulkProductUpload, downloadDemoIdsSheet, downloadDemoProductSheet } from "../../../../apis/adminApis";
import { useState } from "react";
import { spinnerOverlayOffFn, spinnerOverlayOnFn } from "../../../../Redux/ReducerAction";

const ImportProduct = () => {
   const { tokenReducer } = useSelector(state => state);
   const [csvFile, setCsvFile] = useState(null);
   const dispatch = useDispatch();

   const downloadProductXlsx = async () => {
      await downloadDemoProductSheet(tokenReducer).then(res => {
         let blob = res.data;
         const url = window.URL.createObjectURL(
            new Blob([blob]),
         );
         const link = document.createElement('a');
         link.href = url;
         link.setAttribute(
            'download',
            `Sample-Product-Import.xlsx`,
         );

         // Append to html link element page
         document.body.appendChild(link);

         // Start download
         link.click();

         // Clean up and remove the link
         link.parentNode.removeChild(link);
      }).catch(err => {
         console.log(err);
      })
   }

   const downloadIdxXlsx = async () => {
      await downloadDemoIdsSheet(tokenReducer).then(res => {
         let blob = res.data;
         const url = window.URL.createObjectURL(
            new Blob([blob]),
         );
         const link = document.createElement('a');
         link.href = url;
         link.setAttribute(
            'download',
            `List-Of-Ids.xlsx`,
         );
         document.body.appendChild(link);
         link.click();
         link.parentNode.removeChild(link);
      }).catch(err => {
         console.log(err);
      })
   }

   let num = 0;
   function myTimer() {
      console.log(num++);
   }

   const csvUpload = async () => {

      if (csvFile !== null) {
         // console.log(csvFile);
         let formData = new FormData();
         formData.append('csv', csvFile);
         dispatch(spinnerOverlayOnFn());
         const myInterval = setInterval(myTimer, 1000);
         await bulkProductUpload(formData, tokenReducer).then(res => {
            console.log(res.data);
            clearInterval(myInterval);
            alert(res.data.message);
         }).catch(err => {
            console.log(err);
            clearInterval(myInterval);
            alert(err.response.data.message)
         })
         clearInterval(myInterval);
         dispatch(spinnerOverlayOffFn());

      } else {
         alert('Please select a csv File');
      }
   }



   return (
      <div className="grid grid-cols-6">
         <div className="col-start-1 col-end-3">
            <img src={require("../../../../assets/xls.png")} alt="" width={400} />
         </div>
         <div className="col-start-3 col-end-5">
            <h1 className="font-bold text-lg">Import Product via CSV</h1>
            <input type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" className="border border-green-400 w-full" onChange={e => setCsvFile(e.target.files[0])} />
            <button className="bg-blue-500 rounded px-2 py-1 mt-1 text-white font-semibold" onClick={() => csvUpload()}>Upload CSV File</button>
            <div className="border border-green-400 p-3 w-full mt-10 ">
               <h1 className="font-bold text-lg text-blue-500">Download demo Excel Sheet</h1>
               <div className="grid grid-cols-2 mt-4 gap-5">
                  <div className=" ">
                     <span className="font-bold text-xs">Product Demo xlsx</span>
                     <button className="bg-white rounded border p-1 flex items-center pe-2" onClick={() => downloadProductXlsx()}><img src={require("../../../../assets/xls.png")} alt="" width={30} className="me-2" />Download</button>
                  </div>
                  <div className="">
                     <span className="font-bold text-xs">Ids Demo xlsx</span>
                     <button className="bg-white rounded border p-1 flex items-center pe-2" onClick={() => downloadIdxXlsx()}><img src={require("../../../../assets/xls.png")} alt="" width={30} className="me-2" />Download</button>
                  </div>
               </div>

            </div>
         </div>

      </div>
   );
};

export default ImportProduct;
