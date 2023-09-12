import React from "react";
import { IconButton } from "@chakra-ui/react";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import { HamburgerIcon, AddIcon, ExternalLinkIcon, RepeatIcon, EditIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuList, MenuItem, MenuItemOption, MenuGroup, MenuOptionGroup, MenuDivider } from "@chakra-ui/react";
const MenuBtn = () => {
    return (
        <Menu>
            <MenuButton border={'none'} as={IconButton} aria-label="Options" icon={<Avatar size="sm" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />} variant="outline" />
            <MenuList>
                <MenuItem icon={<AddIcon />} command="⌘T">
                    New Tab
                </MenuItem>
                <MenuItem icon={<ExternalLinkIcon />} command="⌘N">
                    New Window
                </MenuItem>
                <MenuItem icon={<RepeatIcon />} command="⌘⇧N">
                    Open Closed Tab
                </MenuItem>
                <MenuItem icon={<EditIcon />} command="⌘O">
                    Open File...
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

export default MenuBtn;
