import { useState } from "react";
import { CgArrowsExchange } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import {
   productCategoryDDindex,
   productCategoryNewSubCatAdd,
   productCategoryNewSubCatClear,
   productCategoryNewSubCatClearAllAddArr,
   productCategoryNewSubCatRemove,
   spinnerOverlayOffFn,
   spinnerOverlayOnFn,
} from "../../../../Redux/ReducerAction";
import { MdDeleteForever } from "react-icons/md";
import { useEffect } from "react";
import {
   AddCategoryApi,
   getAllCategoryApi,
   updateCategoryApi,
} from "../../../../apis/adminApis";
import { FaSearch } from "react-icons/fa";

const Category = ({productCategoryNewReducer, productCategoryDDindexReducer}) => {
   const [catData, setCatData] = useState([]);
   const dispatch = useDispatch();
   const [catTitle, setCatTitle] = useState("");
   const [isEditing, setEditing] = useState({ flag: false, _id: "" });
   const [subCat, setSubCat] = useState("");

   const addSubcategory = () => {
      if (catTitle !== "" && subCat !== "") {
         dispatch(productCategoryNewSubCatAdd({ subcategory_name: subCat }));
         setSubCat("");
      } else {
         alert("Category Title and subcategory are required..");
      }
   };

   const newSubCategoryHandler = () => {};
   const editCategory = (_id) => {
      if (productCategoryDDindexReducer !== null) {
         setEditing({ flag: true, _id: _id });
         setCatTitle(catData[productCategoryDDindexReducer].category_name);
         dispatch(
            productCategoryNewSubCatClearAllAddArr(
               catData[productCategoryDDindexReducer].sub_category
            )
         );
      }
   };

   const getAllCategory = async () => {
      console.log("get all category fired");
      dispatch(spinnerOverlayOnFn());
      await getAllCategoryApi()
         .then((res) => {
            console.log(res.data);
            setCatData(res.data.data);
         })
         .catch((err) => {
            console.log(err);
         });
      dispatch(spinnerOverlayOffFn());
   };

   const uploadCategory = async () => {
      console.log(productCategoryNewReducer);
      let data = {
         category_name: catTitle,
         subCategory: productCategoryNewReducer,
      };
      if (isEditing.flag) {
         if (catTitle !== "" && productCategoryNewReducer.length !== 0) {
            dispatch(spinnerOverlayOnFn());
            await updateCategoryApi(isEditing._id, data)
               .then((res) => {
                  console.log(res.data);
                  dispatch(productCategoryDDindex(null));
                  setEditing({ flag: false, _id: "" });
                  setCatTitle("");
                  dispatch(productCategoryNewSubCatClear());
                  alert("Category Updated Successfully");
                  getAllCategory();
               })
               .catch((err) => {
                  console.log(err);
                  alert("Some error occure!");
               });
            dispatch(spinnerOverlayOffFn());
         }
      } else {
         if (catTitle !== "" && productCategoryNewReducer.length !== 0) {
            dispatch(spinnerOverlayOnFn());
            await AddCategoryApi(data)
               .then((res) => {
                  console.log(res.data);
                  dispatch(productCategoryDDindex(null));
                  setEditing({ flag: false, _id: "" });
                  setCatTitle("");
                  dispatch(productCategoryNewSubCatClear());
                  alert("Category Added Successfully");
                  getAllCategory();
               })
               .catch((err) => {
                  console.log(err);
                  alert("Some error occure!");
               });
            dispatch(spinnerOverlayOffFn());
         }
      }
   };
   const handleChangeCategory = (idx) => {
      if (idx > 0) {
         dispatch(productCategoryDDindex(idx - 1));
      } else {
         dispatch(productCategoryDDindex(null));
      }
   };

   const cancelHandler = () => {
      setEditing({ flag: false, _id: "" });
      setCatTitle("");
      dispatch(productCategoryNewSubCatClear());
   };

   const removeSubCat = (index) => {
      dispatch(productCategoryNewSubCatRemove(index));
   };
   useEffect(() => {
      getAllCategory();
      dispatch(productCategoryDDindex(null));
      setEditing({ flag: false, _id: "" });
      setCatTitle("");
      dispatch(productCategoryNewSubCatClear());
   }, []);

   // console.log(process.env.REACT_APP_API_ADDRESS);

   return (
      <div className="flex w-[80%] bg-gray-50 dark:bg-gray-800">
         <div className="flex-1 me-24 w-[50%]">
            <h1 className="text-gray-700 dark:text-white font-bold text-base">Category</h1>
            <div className="flex items-center">
               <select
                  name=""
                  id=""
                  className="outline-none border p-2 w-full bg-white dark:bg-teal-800"
                  onChange={(e) => handleChangeCategory(e.target.selectedIndex)}
               >
                  <option value="">Select Category</option>
                  {catData.map((el, i) => (
                     <option key={`${el._id}`} value={el.category_name}>
                        {el.category_name}
                     </option>
                  ))}
               </select>
            </div>
            <h1 className="text-gray-700 font-bold text-base mt-10 dark:text-white">
               Sub Category{" "}
               {productCategoryDDindexReducer !== null && (
                  <button
                     className="bg-black dark:bg-[#abd60e]  rounded text-lg font-bold text-white px-2 "
                     onClick={() =>
                        editCategory(catData[productCategoryDDindexReducer]._id)
                     }
                  >
                     Edit
                  </button>
               )}
            </h1>
            {productCategoryDDindexReducer !== null && (
               <ul className="bg-white dark:bg-gray-800 border mt-1 p-2">
                  {catData.length > 0 &&
                     catData[productCategoryDDindexReducer].sub_category.map(
                        (el, i) => (
                           <li
                              key={`${el._id}`}
                              className="py-1 border-b last:border-b-0 hover:bg-teal-50 dark:hover:bg-teal-700 flex items-center"
                           >
                              <span className="text-lg font-semibold">
                                 {el.subcategory_name}
                              </span>
                           </li>
                        )
                     )}
               </ul>
            )}
         </div>
         <div className="flex-1 border-s ps-10">
            <div className="w-full">
               <h1 className="text-gray-700 mb-2 font-bold text-base dark:text-white">
                  Category title{" "}
                  {isEditing.flag && (
                     <span className="bg-teal-500 text-white px-2">
                        Edit Mode
                     </span>
                  )}
               </h1>
               <input
                  type="text"
                  className="outline-none border p-2 w-full dark:bg-[#424242] dark:border-0"
                  value={catTitle}
                  placeholder="Category Title"
                  onChange={(e) => setCatTitle(e.target.value)}
               />

               <hr className="my-5 border-t-4 border-[#949494]" />
               <h1 className="text-gray-700 font-bold text-base dark:text-white mb-2">
                  Subcategory
               </h1>
               <div className="flex items-center">
                  <input
                     type="text"
                     className="outline-none border p-2 w-full dark:bg-[#424242] dark:border-0"
                     value={subCat}
                     placeholder="New Sub category"
                     onChange={(e) => setSubCat(e.target.value)}
                  />
                  <button
                     className="border border-[#949494] p-2 bg-[#949494] dark:bg-[#5154ac] dark:border-0 text-white font-semibold"
                     onClick={() => addSubcategory()}
                  >
                     Add
                  </button>
               </div>
               <div>
                  {productCategoryNewReducer.length > 0 && (
                     <ul className="bg-white border mt-1 p-2 dark:bg-gray-800">
                        {productCategoryNewReducer.map((el, i) => (
                           <li
                              key={`${i}_newSubCat`}
                              className="py-1 border-b last:border-b-0 hover:bg-teal-50 dark:hover:bg-teal-700 flex justify-between items-center"
                           >
                              <span className="text-lg font-semibold">
                                 {el.subcategory_name}
                              </span>
                              <MdDeleteForever
                                 size={30}
                                 color="red"
                                 className="cursor-pointer"
                                 onClick={() => removeSubCat(i)}
                              />
                           </li>
                        ))}
                     </ul>
                  )}
               </div>
               <div className="mt-2">
                  <button
                     className="bg-[#abd60e] rounded-md me-1 font-semibold px-3 py-2"
                     onClick={() => uploadCategory()}
                  >
                     Upload
                  </button>
                  <button
                     className="bg-[#ed0d0d] rounded-md ms-1 font-semibold px-3 py-2"
                     onClick={() => cancelHandler()}
                  >
                     Cancel
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Category;
