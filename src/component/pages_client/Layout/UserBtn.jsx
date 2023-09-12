import React from "react";
import { IconButton, Divider } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { HiLogout } from "react-icons/hi";
import { AddIcon, ExternalLinkIcon, RepeatIcon, EditIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuList, MenuItem, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { authTokenClear } from "../../../Redux/ReducerAction";
import { useNavigate } from "react-router-dom";

const UserBtn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLogOutDialogOpen, setIsLogOutDialogOpen] = React.useState(false);
    const logoutBtn = () => {
        setIsLogOutDialogOpen(false);
        dispatch(authTokenClear());
        sessionStorage.clear();
        navigate("/login");
    };
    return (
        <>
            <AlertDialog isOpen={isLogOutDialogOpen} onClose={() => setIsLogOutDialogOpen(false)}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Log out
                        </AlertDialogHeader>

                        <AlertDialogBody>Are you sure you want to log out? Confirm and log out.</AlertDialogBody>

                        <AlertDialogFooter>
                            <Button onClick={() => setIsLogOutDialogOpen(false)}>Cancel</Button>
                            <Button colorScheme="red" onClick={() => logoutBtn()} ml={3}>
                                Confirm
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
            <Menu>
                <MenuButton border={"none"} as={IconButton} aria-label="Options" icon={<Avatar size="sm" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />} variant="outline" />
                <MenuList className="p-1">
                    <MenuItem fontWeight={"bold"}>MR. JOHN</MenuItem>
                    <MenuItem>New Window</MenuItem>
                    <MenuItem>Open Closed Tab</MenuItem>
                    <Divider orientation="horizontal" className="my-1" />
                    <MenuItem onClick={() => setIsLogOutDialogOpen(true)} icon={<HiLogout size={20} />}>
                        Logout
                    </MenuItem>
                </MenuList>
            </Menu>
        </>
    );
};

export default UserBtn;
