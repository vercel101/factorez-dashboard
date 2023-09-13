import React from "react";
import { IconButton, Divider } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { RxExit } from "react-icons/rx";
import { AddIcon, ExternalLinkIcon, RepeatIcon, EditIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuList, MenuItem, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { authTokenClear } from "../../../Redux/ReducerAction";
import { useNavigate } from "react-router-dom";

const UserBtn = ({ tokenReducer, userInfoReducer }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLogOutDialogOpen, setIsLogOutDialogOpen] = React.useState(false);
    const logoutBtn = () => {
        setIsLogOutDialogOpen(false);
        dispatch(authTokenClear());
        sessionStorage.clear();
        navigate("/login");
    };

    /*
    {userInfoReducer.photo ? (
    <div className="bg-[#EDEAEA] rounded-md me-2 border dark:bg-[#3d0f82]">
        <img src={userInfoReducer.photo} className="h-8 w-8 rounded-md object-cover" />
    </div>
) : (
    <div className="bg-[#EDEAEA] p-1 rounded-md me-2 dark:bg-[#3d0f82]">
        <AiOutlineUser size={25} className="dark:text-white" />
    </div>
)}
    
    */
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
                    border={"none"}
                    as={IconButton}
                    aria-label="Options"
                    icon={<Avatar border={"1px solid #E0F2F1"} size="sm" name={userInfoReducer.name} src={userInfoReducer.photo} />}
                    variant="outline"
                />
                <MenuList className="p-1">
                    <MenuItem pointerEvents={"none"} fontWeight={"bold"}>
                        {userInfoReducer.name}
                    </MenuItem>
                    <MenuItem>Profile</MenuItem>
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
