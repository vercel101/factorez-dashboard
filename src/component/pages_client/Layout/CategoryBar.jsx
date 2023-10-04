import React from "react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { categoryFilterAddFn } from "../../../Redux/ReducerAction";
import { useLocation, useNavigate } from "react-router-dom";

const CategoryBar = ({ storeInfoReducer, categoryFilterReducer }) => {
    const category = storeInfoReducer && storeInfoReducer.category && storeInfoReducer.category;
    let navigate = useNavigate();
    let location = useLocation();
    const dispatch = useDispatch();
    const categoryHandler = (categoryId, subCategoryId) => {
        dispatch(categoryFilterAddFn([categoryId, subCategoryId]));
        if (location.pathname !== "/products") {
            navigate("/products");
        }
    };
    return (
        category &&
        category.map((e1) => (
            <Menu key={e1._id}>
                <MenuButton
                    className="whitespace-nowrap"
                    fontWeight={700}
                    fontSize={16}
                    px={4}
                    py={0}
                    transition="all 0.2s"
                    textColor={"white"}
                    _hover={{ bg: "transparent" }}
                    _expanded={{ bg: "transparent", textColor: "black" }}
                >
                    {e1.category_name} <ChevronDownIcon h={6} w={6} />
                </MenuButton>
                <MenuList>
                    {e1.sub_category &&
                        e1.sub_category.map((el1) => (
                            <MenuItem onClick={() => categoryHandler(e1._id, el1._id)} key={el1._id}>
                                {el1.subcategory_name}
                            </MenuItem>
                        ))}
                </MenuList>
            </Menu>
        ))
    );
};

export default CategoryBar;
