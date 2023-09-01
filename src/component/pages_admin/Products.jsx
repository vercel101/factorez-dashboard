import React, {Suspense, lazy, useState} from "react";
import {useSelector} from "react-redux";
import {Tab, Tabs, TabList, TabPanel} from "react-tabs";
import {isRoleExists, manageEnumManu, productEnumList} from "../../utils/checkRole";
import {roleEnums} from "../../utils/enums";
import ColorAdd from './Layout/products/ColorAdd';
const Products = () => {
    const AllProduct = lazy(() => import('./Layout/products/AllProducts'))
    const ProductCreate = lazy(() => import('./Layout/products/ProductCreate'))
    const Category = lazy(() => import('./Layout/products/Category'))
    const Brand = lazy(() => import('./Layout/products/Brand'))
    const ImportProduct = lazy(() => import('./Layout/products/ImportProduct'))

    const {sidebarCollapse, darkModeReducer, productBrandDDindexReducer, userInfoReducer, tokenReducer} = useSelector((state) => state);
    const [data, setData] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,]);
    let size = 5;

    const [tabIndex, setTabIndex] = useState(0);

    const pageCount = Math.ceil(data.length / size);
    const handlePageClick = (event) => {
    };
    return (<div
        className={`${sidebarCollapse ? "ps-[50px]" : "ps-[250px]"} pt-[55px] transition-all duration-300 dark:bg-[#17191e] dark:text-white w-full h-full min-h-screen`}
    >
        {/* <button className="rounded px-1 bg-red-400">Hello</button> */}
        <div className="px-3 py-1">
            <Tabs selectedIndex={tabIndex} onSelect={tabIdx => setTabIndex(tabIdx)}>
                <TabList
                    className="flex flex-wrap -mb-px text-sm font-medium text-center border-b dark:border-[#525355]">
                    {userInfoReducer.role && isRoleExists(userInfoReducer.role, ['ADMIN', roleEnums.MANAGE_PRODUCT.ALL_PRODUCT]) && (

                        <Tab
                            selectedClassName="bg-teal-100 dark:bg-teal-800 bg-teal-100 border-b-2 border-blue-500"
                            className="cursor-pointer px-4 py-2 rounded-t-lg outline-none"
                        >
                            Product List
                        </Tab>)}
                    {userInfoReducer.role && isRoleExists(userInfoReducer.role, ['ADMIN', roleEnums.MANAGE_PRODUCT.ADD_PRODUCT]) && (

                        <Tab
                            selectedClassName="bg-teal-100 dark:bg-teal-800 bg-teal-100 border-b-2  border-blue-500"
                            className="cursor-pointer px-4 py-2  rounded-t-lg outline-none"
                        >
                            Add Product
                        </Tab>)}
                    {userInfoReducer.role && isRoleExists(userInfoReducer.role, ['ADMIN', roleEnums.MANAGE_MENU.ADD_CATEGORY, roleEnums.MANAGE_MENU.ADD_SUBCATEGORY]) && (

                        <Tab
                            selectedClassName="bg-teal-100 dark:bg-teal-800 bg-teal-100 border-b-2  border-blue-500"
                            className="cursor-pointer px-4 py-2  rounded-t-lg outline-none"
                        >
                            Category
                        </Tab>)}

                    {userInfoReducer.role && isRoleExists(userInfoReducer.role, ['ADMIN', roleEnums.MANAGE_PRODUCT.BRAND]) && (

                        <Tab
                            selectedClassName="bg-teal-100 dark:bg-teal-800 bg-teal-100  border-b-2  border-blue-500"
                            className="cursor-pointer px-4 py-2  rounded-t-lg outline-none"
                        >
                            Brands
                        </Tab>)}
                    {userInfoReducer.role && isRoleExists(userInfoReducer.role, ['ADMIN', roleEnums.MANAGE_PRODUCT.PRODUCT_COLOR]) && (
                        <Tab
                            selectedClassName="bg-teal-100 dark:bg-teal-800 bg-teal-100  border-b-2  border-blue-500"
                            className="cursor-pointer px-4 py-2  rounded-t-lg outline-none"
                        >
                            Colors
                        </Tab>)}

                    {userInfoReducer.role && isRoleExists(userInfoReducer.role, ['ADMIN', roleEnums.MANAGE_PRODUCT.ADD_PRODUCT]) && (
                        <Tab
                            selectedClassName="bg-teal-100 dark:bg-teal-800 bg-teal-100  border-b-2  border-blue-500"
                            className="cursor-pointer px-4 py-2  rounded-t-lg outline-none"
                        >
                            Import Products
                        </Tab>)}
                </TabList>
                {userInfoReducer.role && isRoleExists(userInfoReducer.role, ['ADMIN', roleEnums.MANAGE_PRODUCT.ALL_PRODUCT]) && (
                    <TabPanel className="mt-5">
                        <Suspense fallback={"Loading..."}>
                            <AllProduct/>
                        </Suspense>
                    </TabPanel>)}
                {userInfoReducer.role && isRoleExists(userInfoReducer.role, ['ADMIN', roleEnums.MANAGE_PRODUCT.ADD_PRODUCT]) && (
                    <TabPanel className="mt-5">
                        <div className=" p-4 rounded-lg bg-[#F4F7F8] dark:bg-gray-800">
                            <Suspense fallback={"Loading..."}>
                                <ProductCreate/>
                            </Suspense>
                        </div>
                    </TabPanel>)}
                {userInfoReducer.role && isRoleExists(userInfoReducer.role, ['ADMIN', roleEnums.MANAGE_MENU.ADD_CATEGORY, roleEnums.MANAGE_MENU.ADD_SUBCATEGORY]) && (
                    <TabPanel className="mt-5">
                        <div className=" p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                            <Suspense fallback={"Loading..."}>
                                <Category/>
                            </Suspense>
                        </div>
                    </TabPanel>)}
                {userInfoReducer.role && isRoleExists(userInfoReducer.role, ['ADMIN', roleEnums.MANAGE_PRODUCT.BRAND]) && (
                    <TabPanel className="mt-5">
                        <div className=" p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                            <Suspense fallback={"Loading..."}>
                                <Brand productBrandDDindexReducer={productBrandDDindexReducer} userInfoReducer={userInfoReducer} tokenReducer={tokenReducer}/>
                            </Suspense>
                        </div>
                    </TabPanel>)}
                {userInfoReducer.role && isRoleExists(userInfoReducer.role, ['ADMIN', roleEnums.MANAGE_PRODUCT.PRODUCT_COLOR]) && (
                    <TabPanel className="mt-5">
                        <div className=" p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                            <ColorAdd/>
                        </div>
                    </TabPanel>)}
                {userInfoReducer.role && isRoleExists(userInfoReducer.role, ['ADMIN', roleEnums.MANAGE_PRODUCT.ADD_PRODUCT]) && (
                    <TabPanel className="mt-5">
                        <div className=" p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                            <Suspense fallback={"Loading..."}>
                                <ImportProduct/>
                            </Suspense>
                        </div>
                    </TabPanel>)}
            </Tabs>
        </div>
    </div>);
};

export default Products;
