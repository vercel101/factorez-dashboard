import React from "react";
import { IconButton, Divider, MenuGroup } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { RxExit } from "react-icons/rx";
import { AddIcon, ExternalLinkIcon, RepeatIcon, EditIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuList, MenuItem, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { authTokenClear } from "../../../Redux/ReducerAction";
import { useNavigate } from "react-router-dom";

const UserBtn = ({ size, tokenReducer, userInfoReducer }) => {
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
                <MenuButton
                    size={size}
                    border={"none"}
                    as={IconButton}
                    aria-label="Options"
                    icon={<Avatar border={"1px solid #E0F2F1"} size="sm" name={userInfoReducer.name} src={userInfoReducer.photo} />}
                    variant="outline"
                />
                <MenuList className="p-1">
                    <MenuGroup title={userInfoReducer.name} fontWeight={"bold"} fontSize={"lg"}>
                        <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
                        <MenuItem onClick={() => navigate("/orders")}>Orders</MenuItem>
                    </MenuGroup>
                    <Divider orientation="horizontal" className="my-1" />
                    <MenuItem onClick={() => setIsLogOutDialogOpen(true)} icon={<RxExit size={20} />}>
                        Logout
                    </MenuItem>
                </MenuList>
            </Menu>
        </>
    );
};

export default UserBtn;
