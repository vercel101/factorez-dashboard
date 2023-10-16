import React from "react";
import { Card, Image, CardBody, Stack, CardFooter, HStack, useToast, IconButton } from "@chakra-ui/react";
import { BsSuitHeart } from "react-icons/bs";
import SizeSetDropdown from "./SizeSetDropdown";
import { useNavigate } from "react-router-dom";
import { addToWishlistApi, removeFromWishlistApi } from "../../../apis/clientApis";
import { DeleteIcon } from "@chakra-ui/icons";
let productPrice = (price, gst, margin) => {
    let marginAmt = Number(price) + (Number(price) * Number(margin)) / 100;
    let gstAmt = (Number(marginAmt) * Number(gst)) / 100;
    return (gstAmt + marginAmt).toFixed(2);
};
const ProductCard = ({ element, customerId, tokenReducer, disableFooter, removedCart }) => {
    const toast = useToast();

    const navigate = useNavigate();
    const productInfo = () => {
        navigate(`/product/${element.slug}`);
    };

    const addToWishlist = async (id) => {
        await addToWishlistApi({ productId: id }, tokenReducer)
            .then((res) => {
                console.log(res.data);
                toast({
                    title: res.data.message,
                    status: "success",
                    isClosable: true,
                    position: "top",
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const removeWishlist = async (id) => {
        await removeFromWishlistApi(id, tokenReducer)
            .then((res) => {
                console.log(res.data);
                toast({
                    title: res.data.message,
                    status: "success",
                    isClosable: true,
                    position: "top",
                });
                removedCart();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Card maxW="md" borderRadius={0} bgColor={"#fafcfa"}>
            <CardBody padding={0}>
                <div className="flex items-center justify-center bg-white">
                    <Image onClick={() => productInfo()} src={element && element.thumbnail_pic} alt="" borderRadius="xs" objectFit={"cover"} className="cursor-pointer h-[300px] lg:h-[200px]" />
                </div>
                <Stack mt="2" spacing="3" padding={1}>
                    <h1 className="text-2xl md:text-lg font-bold">{element && element.product_name}</h1>
                    <p className=" text-[16px] sm:text-md">{element && element.description}</p>
                    <p className="text-red-500 text-md font-semibold">Price : ₹ {element && productPrice(element.seller_price, element.sellingGST, element.margin)}</p>
                </Stack>
            </CardBody>
            {disableFooter !== true ? (
                <CardFooter padding={1}>
                    <HStack w="full" gap={1}>
                        <SizeSetDropdown list={element ? element.lotSizeQty : []} />
                        <button onClick={() => addToWishlist(element._id)} className="border  w-full flex justify-evenly items-center h-10 hover:bg-[#e2e8f0] transition-all duration-200">
                            <BsSuitHeart className="h-6 w-6" color="#275E61" />
                            <span className="text-[18px] font-semibold text-[#275E61]">Add to wishlist</span>
                        </button>
                    </HStack>
                </CardFooter>
            ) : (
                <div className="absolute bottom-2 right-2">
                    {/* <Button>Remove</Button> */}
                    <IconButton onClick={() => removeWishlist(element._id)} size={"xs"} isRound={true} variant="outline" colorScheme="red" aria-label="Done" fontSize="12px" icon={<DeleteIcon />} />
                </div>
            )}
        </Card>
    );
};

export default ProductCard;
