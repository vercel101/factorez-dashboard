import React, {useEffect, useState} from "react";
import {MdDeleteOutline} from "react-icons/md";
import {useDispatch, useSelector} from "react-redux";
import {spinnerOverlayOffFn, spinnerOverlayOnFn} from "../../../../Redux/ReducerAction";
import {addNewColorApi, deleteColorByIdApi, getAllColorApi} from "../../../../apis/adminApis";

const ColorAdd = () => {
    const dispatch = useDispatch();
    const {tokenReducer} = useSelector(state => state);
    const [colorData, setColorData] = useState([]);
    const [color, setColor] = useState({
        colorHex: "",
        colorName: "",
    });


    const onDrag = (colorHex) => {
        setColor({
            colorHex: colorHex,
            colorName: "",
        });
    };
    const getAllColor = async () => {
        dispatch(spinnerOverlayOnFn());
        await getAllColorApi().then(res => {
            setColorData(res.data.data);
        }).catch(error => {
            console.log(error);
            alert("Error occurred!");
        })
        dispatch(spinnerOverlayOffFn());
    }
    const deleteColor = async (id) => {
        if (window.confirm('Are you sure to delete?')) {
            dispatch(spinnerOverlayOnFn());
            await deleteColorByIdApi(tokenReducer, id).then(res => {
                getAllColor();
                alert(res.data.message);
            }).catch(error => {
                console.log(error);
                alert("Error occurred!");
            })
            dispatch(spinnerOverlayOffFn());
        }
    }

    const uploadColor = async () => {
        if (color.colorHex !== "" && color.colorName !== "") {
            dispatch(spinnerOverlayOnFn());
            await addNewColorApi(color, tokenReducer).then(res => {
                getAllColor();
                alert(res.data.message);
            }).catch(error => {
                console.log(error);
                alert(error.response.data.message);
            })
            dispatch(spinnerOverlayOffFn());
        } else {
            alert("Select Color and Insert Color Name");
        }
    }

    useEffect(() => {
        getAllColor();
    }, [])

    return (
        <div className="w-[60%] flex">
            <div className="w-[60%] border-e pe-3">
                <h1 className="dark:text-white text-[#384047] font-semibold text-lg">
                    All Available Colors {colorData.length}
                </h1>
                <ul className="bg-white p-3 max-h-[calc(100vh_-_220px)] overflow-y-scroll">
                    {colorData.length > 0 ? colorData.map((e, i) => (
                        <li key={`${e._id}`} className="h-16 flex mb-2 border-b pb-2 last:border-b-0 last:pb-0">
                            <div
                                className="px-5 w-36 h-full flex justify-center items-center border"
                                style={{backgroundColor: e.colorHex}}
                            >
                                {e.colorHex}
                            </div>
                            <div className="mx-5 w-full flex justify-between items-center">
                                <span>{e.colorName}</span>
                                <MdDeleteOutline size={30} className="cursor-pointer" onClick={() => deleteColor(e._id)}/>
                            </div>
                        </li>
                    )) : <h1>Not Available</h1>}
                </ul>
            </div>
            <div className="w-[40%] ps-8 ">
                <h1 className="dark:text-white text-[#384047] font-semibold text-lg">
                    Color picker
                </h1>
                <div className="flex items-center mb-3">
                    <input
                        type="color"
                        value={color.colorHex}
                        onChange={(e) => onDrag(e.target.value)}
                    />
                    <span className="text-2xl font-semibold">{color.colorHex}</span>
                </div>
                <h1 className="dark:text-white text-[#384047] font-semibold text-lg">
                    Color Name
                </h1>
                <input value={color.colorName} onChange={e => setColor(pre => {
                    return {...pre, colorName: e.target.value}
                })} type="text" placeholder="Insert Selected Color Name"
                       className="w-full outline-none border p-2 text-lg"/>

                <div className="flex items-center justify-start mt-10">
                    <button
                        className="bg-[#4BC970] rounded-md border border-[#4BC970] px-3 py-2 text-white font-bold text-lg"
                        onClick={() => uploadColor()}
                    >
                        Submit
                    </button>
                    <button
                        className="bg-[#ffffff] rounded-md px-3 py-2 ms-3 border border-[#4BC970] text-[#384047] font-bold text-lg"
                        onClick={() => setColor({colorHex: '', colorName: ''})}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ColorAdd;
