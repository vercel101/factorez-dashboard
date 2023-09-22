import React from "react";
import { IconButton } from "@chakra-ui/react";
import { BiChevronDown } from "react-icons/bi";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
const SizeSetDropdown = ({ list }) => {
    return (
        <Menu>
            <MenuButton
                className="h-10"
                color={"teal.700"}
                px={"4"}
                as={IconButton}
                aria-label="Options"
                rightIcon={<BiChevronDown className="h-8 w-8 ms-7" />}
                variant="outline"
                fontSize={'18px'}
                rounded={0}
            >
                Size
            </MenuButton>
            <MenuList pointerEvents={"none"} color={"teal.700"} fontSize={16} w={"48"} minW={"60"} maxW={"60"} fontWeight={600}>
                {list.map((el) => (
                    <MenuItem pointerEvents={"none"}>{el}</MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
};

export default SizeSetDropdown;
