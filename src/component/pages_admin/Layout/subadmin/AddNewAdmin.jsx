import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {addNewAdmin, getAllSubAdminEnums} from "../../../../apis/adminApis";
import {useState} from "react";

function AddNewAdmin(props) {
    const {tokenReducer} = useSelector((state) => state);
    const [allEnums, setAllEnums] = useState({});
    const [newAdminTextField, setNewAdminTextField] = useState({
        name: "", email: "", gender: "", phone: "", password: ""
    })
    const [adminRoles, setAdminRoles] = useState([]);

    const addRolesToStack = (field) => {
        let arr = [];
        let idx = -1;
        setAdminRoles(prevState => {
            arr = [...prevState];
            idx = arr.findIndex(val => val === field);
            if (idx >= 0) {
                arr.splice(idx, 1);
            } else {
                arr.push(field);
            }
            return arr;
        })
    }
    const createNewAdminFn = async () => {
        if(newAdminTextField.name === "" || newAdminTextField.email === "" || newAdminTextField.phone === "" || newAdminTextField.gender === "" || newAdminTextField.password === "" || adminRoles.length === 0){
            console.log(newAdminTextField, adminRoles);
            alert("All fields are required");
        }else{
            let data = {
                name : newAdminTextField.name,
                email : newAdminTextField.email,
                password : newAdminTextField.password,
                gender : newAdminTextField.gender,
                role : adminRoles,
                phone : newAdminTextField.phone,
            };
            await addNewAdmin(data, tokenReducer).then(res => {
                console.log(res.data);
                alert("New Admin Created successfully");
            }).catch(err => {
                console.log(err.message);
                alert("Something went wrong!")
            })
        }
    }


    const getAllSubAdminEnumFn = async () => {
        await getAllSubAdminEnums(tokenReducer)
            .then((res) => {
                console.log(res.data);
                setAllEnums(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const cancelNewAdminFn = () => {

    }
    useEffect(() => {
        getAllSubAdminEnumFn();
    }, []);



    return (
        <div>
            <h1 className="text-2xl font-bold mb-2">Add New Admin</h1>
            <div className="grid grid-cols-4 gap-2">
                <div>
                    <span>Name</span>
                    <input
                        type="text"
                        placeholder={"Admin Name"}
                        value={newAdminTextField.name}
                        onChange={e => setNewAdminTextField(prevState => {
                            return {...prevState, name: e.target.value}
                        })}
                        className="w-full p-2 outline-none bg-[#fafafa] border rounded-md dark:bg-[#424242] dark:border-[#424242]"
                    />
                </div>
                <div>
                    <span>Phone</span>
                    <input
                        type="number"
                        placeholder={"Phone Number"}
                        value={newAdminTextField.phone}
                        onChange={e => setNewAdminTextField(prevState => {
                            return {...prevState, phone: e.target.value}
                        })}
                        className="w-full p-2 outline-none bg-[#fafafa] border rounded-md dark:bg-[#424242] dark:border-[#424242]"
                    />
                </div>
                <div>
                    <span>Email</span>
                    <input
                        type="text"
                        placeholder={"Email ID"}
                        onChange={e => setNewAdminTextField(prevState => {
                            return {...prevState, email: e.target.value}
                        })}
                        className="w-full p-2 outline-none bg-[#fafafa] border rounded-md dark:bg-[#424242] dark:border-[#424242]"
                    />
                </div>
                <div>
                    <span>Password</span>
                    <input
                        type="text"
                        placeholder={"Password"}
                        onChange={e => setNewAdminTextField(prevState => {
                            return {...prevState, password: e.target.value}
                        })}
                        className="w-full p-2 outline-none bg-[#fafafa] border rounded-md dark:bg-[#424242] dark:border-[#424242]"
                    />
                </div>
                <div>
                    <span>Gender</span>
                    <select
                        className="w-full p-2 outline-none bg-[#fafafa] border rounded-md dark:bg-[#424242] dark:border-[#424242]"
                        value={newAdminTextField.gender} onChange={e => setNewAdminTextField(prevState => {
                        return {...prevState, gender: e.target.value}
                    })}>
                        <option value={``}>Select Gender</option>
                        <option value={`MALE`}>Male</option>
                        <option value={`FEMALE`}>Female</option>
                        <option value={`OTHER`}>Other</option>
                    </select>
                </div>

            </div>
            <h1 className="text-lg font-bold border-b my-3">All Permissions</h1>

            <div className={`border p-4 bg-green-100 dark:bg-[#424242] dark:border-[#424242] rounded-md`}>
                <div className="grid grid-cols-4 gap-2">
                    <div className="bg-white  dark:bg-[#242424]">
                        <h1 className="font-bold text-lg bg-teal-300 dark:bg-teal-800 p-2">Others</h1>
                        <ul className="ps-2">
                            {Object.keys(allEnums).map((el, i) => (
                                <>
                                    {typeof allEnums[el] === "string" && (<>
                                        <li key={`${i}_otherFields`}>
                                            <input type="checkbox"
                                                   defaultChecked={adminRoles.includes(allEnums[el])}
                                                   onChange={e => addRolesToStack(allEnums[el])}/>{" "}
                                            <span>{allEnums[el]}</span>
                                        </li>
                                    </>)}
                                </>
                            ))}
                        </ul>
                    </div>

                    {Object.keys(allEnums).map((el, i) => (<>
                        {typeof allEnums[el] !== "string" && (<div key={`${i}_${el}`} className="bg-white dark:bg-[#242424]">
                            <h1 className="font-bold text-lg dark:bg-teal-800 bg-teal-300 p-2">
                                {el}
                            </h1>
                            <ul className="ps-2">
                                {Object.keys(allEnums[el]).map((subEl, subi) => (<li key={`${subi}_${subEl}`}>
                                    <input type="checkbox"
                                           defaultChecked={adminRoles.includes(allEnums[el][subEl])}
                                           onChange={e => addRolesToStack(allEnums[el][subEl])}/>{" "}
                                    <span>{allEnums[el][subEl]}</span>
                                </li>))}
                            </ul>
                        </div>)}
                    </>))}

                </div>
            </div>
            <div className={`mt-2`}>
                <button className={`border px-2 py-1 bg-[#4f46e5] rounded-md text-white hover:bg-indigo-800`}
                        onClick={() => createNewAdminFn()}>Submit
                </button>
                <button className={`ms-1 border px-2 py-1 rounded-md bg-red-300 hover:bg-yellow-200`} onClick={() => cancelNewAdminFn()}>Cancel</button>
            </div>
        </div>
    );
}

export default AddNewAdmin;