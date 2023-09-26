import React from "react";
import SearchNav from "./SearchNav";
import { Button, IconButton, Input, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay } from "@chakra-ui/react";
import { BsCart } from "react-icons/bs";
import UserBtn from "./UserBtn";
import { useNavigate } from "react-router-dom";
import CategoryBar from "./CategoryBar";
import { useDispatch } from "react-redux";
import { authTokenClear, userInfoClear } from "../../../Redux/ReducerAction";
const Navbar = ({ tokenReducer, userInfoReducer }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLogOutDialogOpen, setIsLogOutDialogOpen] = React.useState(false);
    const goToAdminLogin = () => {
        if (tokenReducer) {
            setIsLogOutDialogOpen(true);
        } else {
            navigate("/admin/login/");
        }
    };
    const logoutBtn = () => {
        setIsLogOutDialogOpen(false);
        dispatch(authTokenClear());
        dispatch(userInfoClear());
        navigate("/admin/login/");
    };

    return (
        <div className="fixed bg-white left-0 right-0 top-0 z-30">
            <AlertDialog isOpen={isLogOutDialogOpen} onClose={() => setIsLogOutDialogOpen(false)}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Log out
                        </AlertDialogHeader>
                        <AlertDialogBody>Log out and go to the Seller page</AlertDialogBody>
                        <AlertDialogFooter>
                            <Button onClick={() => setIsLogOutDialogOpen(false)}>Cancel</Button>
                            <Button colorScheme="red" onClick={() => logoutBtn()} ml={3}>
                                Confirm
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
            <div className="h-[53px] flex items-center justify-between lg:px-16 md:px-10">
                <div className="h-full overflow-hidden flex items-center justify-start space-x-4">
                    <img
                        src="/factorlogo.png"
                        alt=""
                        className="h-full"
                        onClick={() => {
                            tokenReducer ? navigate("/") : navigate("/login/");
                        }}
                    />
                    {tokenReducer && <SearchNav />}
                    <Button onClick={() => goToAdminLogin()} rounded={"full"} size={"sm"} width={'full'} colorScheme="orange" variant={"outline"}>
                        Become a seller
                    </Button>
                </div>
                <div className=" hidden  md:inline-flex items-center space-x-3 pe-2">
                    {tokenReducer && (
                        <>
                            <IconButton
                                onClick={() => navigate("/cart")}
                                _hover={{ bg: "#fff1f1" }}
                                bgColor={"transparent"}
                                aria-label="Search database"
                                icon={<BsCart size={35} color="#A46A38" className="cursor-pointer p-2" />}
                            />
                            <UserBtn tokenReducer={tokenReducer} userInfoReducer={userInfoReducer} />
                        </>
                    )}
                </div>
            </div>
            {tokenReducer && (
                <div className="categoryBar-scrollbar bg-[#FF834F] md:hidden flex items-center sm:px-16 overflow-x-auto px-1 py-2 space-x-1">
                    <Input rounded={"md"} size={"sm"} placeholder="Search..." backgroundColor={"white"} />
                    <IconButton
                        size={"sm"}
                        onClick={() => navigate("/cart")}
                        _hover={{ bg: "#fff1f1" }}
                        bgColor={"transparent"}
                        aria-label="Search database"
                        icon={<BsCart size={35} color="blue" className="cursor-pointer p-2" />}
                    />
                    <UserBtn size={"sm"} tokenReducer={tokenReducer} userInfoReducer={userInfoReducer} />
                </div>
            )}
            {tokenReducer && (
                <div className="hidden h-7 categoryBar-scrollbar bg-[#FF834F] md:flex sm:px-16 overflow-x-auto">
                    <CategoryBar />
                </div>
            )}
        </div>
    );
};

export default Navbar;
