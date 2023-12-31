import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllSubAdmin, getAllSubAdminEnums } from "../../apis/adminApis";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useState } from "react";
import AddNewAdmin from "./Layout/subadmin/AddNewAdmin";
import { useNavigate } from "react-router-dom";
import AllAdmins from "./Layout/subadmin/AllAdmins";
import { isRoleExists } from "../../utils/checkRole";

const SubAdmin = ({
    userInfoReducer,
    tokenReducer,
    sidebarCollapse,
    darkModeReducer,
}) => {
    const navigate = useNavigate();
    const [allEnums, setAllEnums] = useState({});
    const [newAdminTextField, setNewAdminTextField] = useState({
        name: "",
        email: "",
        gender: "",
        phone: "",
        password: "",
    });
    const [adminRoles, setAdminRoles] = useState([]);

    const addRolesToStack = (field) => {
        let arr = [];
        let idx = -1;
        setAdminRoles((prevState) => {
            arr = [...prevState];
            idx = arr.findIndex((val) => val === field);
            if (idx >= 0) {
                arr.splice(idx, 1);
            } else {
                arr.push(field);
            }
            return arr;
        });
    };

    const getAllSubAdminEnum = async () => {
        await getAllSubAdminEnums(tokenReducer)
            .then((res) => {
                console.log(res.data);
                setAllEnums(res.data.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };
    useEffect(() => {
        getAllSubAdminEnum();
    }, []);
    return (
        <div
            className={`${
                sidebarCollapse ? "ps-[50px]" : "ps-[250px]"
            } pt-[55px] transition-all duration-300 dark:bg-[#17191e] dark:text-white w-full h-full min-h-screen`}
        >
            <div className="ms-2 pe-2">
                <div className="px-3 py-1">
                    <Tabs>
                        <TabList className="flex flex-wrap -mb-px text-sm font-medium text-center border-b dark:border-[#525355]">
                            {userInfoReducer.role &&
                                isRoleExists(userInfoReducer.role, [
                                    "ADMIN",
                                    "SUB_ADMIN_ALL_ADMIN",
                                ]) && (
                                    <Tab
                                        selectedClassName="bg-teal-100 dark:bg-teal-800 bg-teal-100 border-b-2 border-blue-500"
                                        className="cursor-pointer px-4 py-2 rounded-t-lg outline-none"
                                    >
                                        All Admins
                                    </Tab>
                                )}
                            {userInfoReducer.role &&
                                isRoleExists(userInfoReducer.role, [
                                    "ADMIN",
                                    "SUB_ADMIN_ADD_ADMIN",
                                ]) && (
                                    <Tab
                                        selectedClassName="bg-teal-100 dark:bg-teal-800 bg-teal-100 border-b-2  border-blue-500"
                                        className="cursor-pointer px-4 py-2  rounded-t-lg outline-none"
                                    >
                                        Add Admin
                                    </Tab>
                                )}
                        </TabList>
                        {userInfoReducer.role &&
                            isRoleExists(userInfoReducer.role, [
                                "ADMIN",
                                "SUBADMIN_VIEW",
                                "SUBADMIN_DOWNLOAD",
                                "SUB_ADMIN_ALL_ADMIN",
                            ]) && (
                                <TabPanel className="mt-5">
                                    <AllAdmins tokenReducer={tokenReducer} userInfoReducer={userInfoReducer}/>
                                </TabPanel>
                            )}
                        {userInfoReducer.role &&
                            isRoleExists(userInfoReducer.role, [
                                "ADMIN",
                                "SUB_ADMIN_ADD_ADMIN",
                            ]) && (
                                <TabPanel className="mt-5">
                                    <AddNewAdmin tokenReducer={tokenReducer} userInfoReducer={userInfoReducer}/>
                                </TabPanel>
                            )}
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default SubAdmin;
