import React from "react";
import { Menu, MenuButton, MenuList, MenuItem, MenuDivider } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
const catMenus = [
    {
        name: "Category 1",
        menus: [
            {
                name: "Cat 1",
                href: "",
            },
            {
                name: "Cat 2",
                href: "",
            },
            {
                name: "Cat 3",
                href: "",
            },
            {
                name: "Cat 4",
                href: "",
            },
        ],
    },
    {
        name: "Category 2",
        menus: [
            {
                name: "Cat 11",
                href: "",
            },
            {
                name: "Cat 22",
                href: "",
            },
            {
                name: "Cat 334",
                href: "",
            },
            {
                name: "Cat 44",
                href: "",
            },
        ],
    },
    {
        name: "Category 3",
        menus: [
            {
                name: "Cat 112",
                href: "",
            },
            {
                name: "Cat 223",
                href: "",
            },
            {
                name: "Cat 3344",
                href: "",
            },
            {
                name: "Cat 445",
                href: "",
            },
        ],
    },
    {
        name: "Category 4",
        menus: [
            {
                name: "Cat A",
                href: "",
            },
            {
                name: "Cat B",
                href: "",
            },
            {
                name: "Cat V",
                href: "",
            },
            {
                name: "Cat D",
                href: "",
            },
        ],
    },
];
const CategoryBar = () => {
    return catMenus.map((e1, i) => (
        <Menu key={i}>
            <MenuButton className="whitespace-nowrap" fontWeight={700} fontSize={16} px={4} py={0} transition="all 0.2s" textColor={"white"} _hover={{ bg: "transparent" }} _expanded={{ bg: "transparent", textColor: "black" }}>
                {e1.name} <ChevronDownIcon h={6} w={6}/>
            </MenuButton>
            <MenuList>
                {e1.menus.map((el1, i1) => (
                    <MenuItem key={i1}>{el1.name}</MenuItem>
                ))}
            </MenuList>
        </Menu>
    ));
};

export default CategoryBar;
