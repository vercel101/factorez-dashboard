import React from "react";
import { IconButton, Divider, Button } from "@chakra-ui/react";
import { BiChevronDown } from "react-icons/bi";
import { Menu, MenuButton, MenuList, MenuItem, MenuItemOption, MenuGroup, MenuOptionGroup, MenuDivider } from "@chakra-ui/react";
const SizeSetDropdown = () => {
    return (
        <Menu>
            <MenuButton
                className="text-[9px] sm:text-[12px]  h-3 min-h-5 max-h-5  sm:h-7 sm:min-h-7 sm:max-h-7"
                px={"2"}
                as={IconButton}
                aria-label="Options"
                rightIcon={<BiChevronDown className="h-3 sm:h-5 ms-4" />}
                variant="outline"
                fontSize={"2px sm:15px"}
                rounded={0}>
                Size
            </MenuButton>
            <MenuList fontSize={10} w={'48'} minW={'48'} maxW={'48'} fontWeight={600}>
                <MenuItem>MR. JOHN</MenuItem>
                <MenuItem>New Window</MenuItem>
                <MenuItem>Open Closed Tab</MenuItem>
            </MenuList>
        </Menu>
    );
};

export default SizeSetDropdown;
