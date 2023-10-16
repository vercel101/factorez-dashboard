import React, { useEffect, useState } from "react";
import SearchNav from "./SearchNav";
import { Button, IconButton, Input, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Badge, Text } from "@chakra-ui/react";
import { BsCart, BsSuitHeart } from "react-icons/bs";
import UserBtn from "./UserBtn";
import { useNavigate } from "react-router-dom";
import CategoryBar from "./CategoryBar";
import { useDispatch } from "react-redux";
import { authTokenClear, userInfoClear } from "../../../Redux/ReducerAction";
import { allDashboardProductsApi } from "../../../apis/clientApis";
import { PiStorefrontThin } from "react-icons/pi";

let productPrice = (price, gst, margin) => {
    let marginAmt = Number(price) + (Number(price) * Number(margin)) / 100;
    let gstAmt = (Number(marginAmt) * Number(gst)) / 100;
    return (gstAmt + marginAmt).toFixed(2);
};

const Navbar = ({ tokenReducer, userInfoReducer, storeInfoReducer, categoryFilterReducer }) => {
    const storeInfo = storeInfoReducer && storeInfoReducer.storeInfo && storeInfoReducer.storeInfo;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLogOutDialogOpen, setIsLogOutDialogOpen] = React.useState(false);
    const [products, setProducts] = React.useState(false);
    const [filteredProduct, setFilteredProduct] = React.useState([]);
    const [searchText, setSearchText] = useState("");
    const goToAdminLogin = () => {
        if (tokenReducer) {
            setIsLogOutDialogOpen(true);
        } else {
            navigate("/seller/login/");
        }
    };
    const logoutBtn = () => {
        setIsLogOutDialogOpen(false);
        dispatch(authTokenClear());
        dispatch(userInfoClear());
        navigate("/seller/login/");
    };

    const allProducts = async () => {
        await allDashboardProductsApi(tokenReducer)
            .then((res) => {
                console.log(res.data);
                setProducts(res.data.data);
                setFilteredProduct(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const productCardClickHandler = (slug) => {
        setSearchText("");
        navigate(`/product/${slug}`);
    };

    const filterProductFn = (value) => {
        setSearchText(value);
        let x = products.filter((el) => {
            if (el.product_name.toLowerCase().includes(value.toLowerCase())) {
                return el;
            }
        });
        setFilteredProduct((old) => x);
    };

    useEffect(() => {
        allProducts();
    }, []);

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
            <div className="h-[53px] flex items-center justify-between lg:px-16 md:px-10 ">
                <div className="h-full w-full overflow-hidden flex items-center justify-between md:justify-start space-x-2 me-3">
                    <img
                        src={storeInfo && storeInfo.business_Logo}
                        alt=""
                        className="h-full cursor-pointer"
                        onClick={() => {
                            tokenReducer ? navigate("/") : navigate("/login/");
                        }}
                    />
                    {tokenReducer && <SearchNav searchText={(e) => filterProductFn(e)} />}
                    <Button px={5} rounded={"full"} onClick={() => goToAdminLogin()} size={"sm"} colorScheme="orange" variant={"outline"}>
                        Become a seller
                    </Button>
                </div>
                <div className=" hidden md:inline-flex items-center space-x-5 pe-2">
                    {tokenReducer && (
                        <>
                            <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
                                <IconButton _hover={{ bg: "#fff1f1" }} bgColor={"transparent"} aria-label="Search database" icon={<BsCart size={35} color="#A46A38" className=" p-2" />} />
                                <Badge className="absolute left-6 top-0" rounded={"full"} colorScheme="messenger">
                                    {userInfoReducer.cartLength}
                                </Badge>
                            </div>
                            <div className="relative cursor-pointer" onClick={() => navigate("/wishlist")}>
                                <IconButton _hover={{ bg: "#fff1f1" }} bgColor={"transparent"} aria-label="Search database" icon={<BsSuitHeart size={35} color="#A46A38" className=" p-2" />} />
                            </div>
                            <UserBtn tokenReducer={tokenReducer} userInfoReducer={userInfoReducer} />
                        </>
                    )}
                </div>
            </div>
            {tokenReducer && (
                <div className="categoryBar-scrollbar bg-[#FF834F] md:hidden flex items-center sm:px-16 overflow-x-auto px-1 py-2 space-x-1">
                    <Input value={searchText} onChange={(e) => filterProductFn(e.target.value)} rounded={"md"} size={"sm"} placeholder="Search..." backgroundColor={"white"} />
                    <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
                        <IconButton _hover={{ bg: "#fff1f1" }} bgColor={"transparent"} aria-label="Search database" icon={<BsCart size={35} color="#A46A38" className=" p-2" />} />
                        <Badge className="absolute left-6 top-0" rounded={"full"} colorScheme="messenger">
                            {userInfoReducer.cartLength}
                        </Badge>
                    </div>
                    <div className="relative cursor-pointer" onClick={() => navigate("/wishlist")}>
                        <IconButton _hover={{ bg: "#fff1f1" }} bgColor={"transparent"} aria-label="Search database" icon={<BsSuitHeart size={35} color="#A46A38" className="p-2" />} />
                    </div>
                    <UserBtn size={"sm"} tokenReducer={tokenReducer} userInfoReducer={userInfoReducer} />
                </div>
            )}
            {tokenReducer && (
                <div className="hidden h-7 categoryBar-scrollbar bg-[#FF834F] md:flex sm:px-16 overflow-x-auto">
                    <CategoryBar categoryFilterReducer={categoryFilterReducer} storeInfoReducer={storeInfoReducer} />
                </div>
            )}
            {searchText !== "" && (
                <div className="absolute md:p-2 md:top-12 left-0 right-0 mx-auto md:max-w-[60%] bg-white border shadow-2xl md:rounded-lg min-h-[100px] max-h-[calc(100vh_-_200px)] overflow-y-auto">
                    {filteredProduct.length > 0 ? (
                        filteredProduct.map((el) => (
                            <div key={el._id} className="border rounded-md bg-slate-50 w-full mb-1 flex justify-start items-start cursor-pointer" onClick={() => productCardClickHandler(el.slug)}>
                                <img src={el.thumbnail_pic} alt="" className="h-28  w-20 p-1 object-center" />
                                <div className="pt-2 ps-2">
                                    <h1 className="text-md font-bold">{el.product_name}</h1>
                                    <p className="text-sm">
                                        Price : <span className="text-red-500 font-semibold"> ₹ {productPrice(el.seller_price, el.sellingGST, el.margin)}</span>
                                    </p>
                                    <div className="flex items-center justify-start mt-2">
                                        <PiStorefrontThin size={23} color="green" />
                                        <Text color={"blue.400"} fontWeight={"semibold"} fontSize={"sm"} ms={2}>
                                            Sold By : {el.vendor_id.firmName}
                                        </Text>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Nothing to show...</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Navbar;
