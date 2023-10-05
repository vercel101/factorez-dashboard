import React from "react";
import { Card, Image, CardBody, Stack, CardFooter, HStack } from "@chakra-ui/react";
import { BsSuitHeart } from "react-icons/bs";
import SizeSetDropdown from "./SizeSetDropdown";
import { useNavigate } from "react-router-dom";
let productPrice = (price, gst, margin) => {
    let marginAmt = Number(price) + (Number(price) * Number(margin)) / 100;
    let gstAmt = (Number(marginAmt) * Number(gst)) / 100;
    return (gstAmt + marginAmt).toFixed(2);
};
const ProductCard = ({ element, customerId, tokenReducer }) => {
    const navigate = useNavigate();
    const productInfo = () => {
        navigate(`/product/${element.slug}`);
    };

    return (
        <Card maxW="md" borderRadius={0}>
            <CardBody padding={0}>
                <div className="flex items-center justify-center">
                    <Image
                        onClick={() => productInfo()}
                        src={element && element.thumbnail_pic}
                        alt="Green double couch with wooden legs"
                        borderRadius="xs"
                        objectFit={"cover"}
                        className="cursor-pointer h-[300px] lg:h-[200px]"
                    />
                </div>
                <Stack mt="2" spacing="3" padding={1}>
                    <h1 className="text-2xl md:text-lg font-bold">{element && element.product_name}</h1>
                    <p className=" text-[16px] sm:text-md">{element && element.description}</p>
                    <p className="text-red-500 text-md font-semibold">Price : ₹ {element && productPrice(element.seller_price, element.sellingGST, element.margin)}</p>
                </Stack>
            </CardBody>
            {/* <Divider /> */}
            <CardFooter padding={1}>
                <HStack w="full" gap={1}>
                    <SizeSetDropdown list={element ? element.lotSizeQty : []} />
                    <button className="border  w-full flex justify-evenly items-center h-10 hover:bg-[#e2e8f0] transition-all duration-200">
                        <BsSuitHeart className="h-6 w-6" color="#275E61" />
                        <span className="text-[18px] font-semibold text-[#275E61]">Add to wishlist</span>
                    </button>
                    {/* <button className="border h-10 w-20 flex items-center justify-center hover:bg-[#e2e8f0] transition-all duration-200">
                        <BsSuitHeart className="h-6 w-6" color="#275E61" />
                    </button> */}
                </HStack>
            </CardFooter>
        </Card>
    );
};

export default ProductCard;
