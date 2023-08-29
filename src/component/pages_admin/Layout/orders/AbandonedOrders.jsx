import React, { useEffect, useState } from "react";
import { getAbandonedCartsAPI } from "../../../../apis/adminApis";
import { FcInfo } from "react-icons/fc";
import { localDate } from "../../../../utils/stringToLocalDate";
import AbandonedOrderInfo from "./AbandonedOrderInfo";
import { useSelector } from "react-redux";

function AbandonedOrders({tokenReducer}) {
   const [carts, setCarts] = useState([]);
   const [infoFlag, setInfoFlag] = useState(false);
   const [infoId, setInfoId] = useState(null);
   const fetchCarts = async () => {
      await getAbandonedCartsAPI(tokenReducer)
         .then((res) => {
            console.log(res.data);
            setCarts(res.data.data);
         })
         .catch((err) => {
            console.log(err);
         });
   };

   const infoHandler = (idx) => {
      setInfoFlag(!infoFlag);
      console.log(idx);
   };

   useEffect(() => {
      fetchCarts().then();
   }, []);
   return (
      <div>
         {infoFlag && <AbandonedOrderInfo close={setInfoFlag} />}
         <table className={`w-full text-sm text-left text-gray-500 dark:text-gray-400`}>
            <thead className={`text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400`}>
               <tr>
                  <th scope="col" className="px-6 py-3">
                     #
                  </th>
                  <th scope="col" className="px-6 py-3">
                     Customer
                  </th>
                  <th scope="col" className="px-6 py-3">
                     Phone
                  </th>
                  <th scope="col" className="px-6 py-3">
                     Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                     Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                     Info
                  </th>
               </tr>
            </thead>
            <tbody>
               {carts.length > 0 &&
                  carts.map((el, i) => (
                     <tr className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`}>
                        <td className={`px-6 py-1`}>{i + 1}</td>
                        <th scope={`row`} className={`px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white`}>
                           {el.customer_id.name}
                        </th>
                        <td className={`px-6 py-1`}>{el.customer_id.phone}</td>
                        <td className={`px-6 py-1`}>{localDate(el.updatedAt)}</td>
                        <td className={`px-6 py-1 flex flex-col`}>
                           {el.products.map((productEl) => (
                              <span>
                                 {productEl.product_id && productEl.product_id.product_name}, Qty:{productEl.qty}
                              </span>
                           ))}
                        </td>
                        <td className={`px-6 py-1 text-right"`}>
                           <FcInfo size={20} className={`cursor-pointer`} onClick={() => infoHandler(i)} />
                        </td>
                     </tr>
                  ))}
            </tbody>
         </table>
      </div>
   );
}

export default AbandonedOrders;
