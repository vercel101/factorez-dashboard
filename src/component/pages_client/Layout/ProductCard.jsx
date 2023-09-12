import React from "react";
import { Card, CardHeader, Image, CardBody, Stack, Divider, Text, Heading, Button, ButtonGroup, CardFooter, IconButton, HStack, VStack, Box } from "@chakra-ui/react";
import { BsCart, BsSuitHeartFill, BsSuitHeart } from "react-icons/bs";
import SizeSetDropdown from "./SizeSetDropdown";
const ProductCard = ({ url,cardwidth }) => {
    return (
        <Card maxW="md" me={4} borderRadius={0} minWidth={cardwidth}>
            <CardBody padding={0} >
                <Image src={url} alt="Green double couch with wooden legs" borderRadius="xs" width={"100%"} objectFit={"cover"} className="h-[100px] lg:h-[150px]" />
                <Stack mt="2" spacing="3" padding={1}>
                    <Heading size={"xs"} m={0} p={0} lineHeight={1} className="text-sm sm:text-md">
                        Living room Sofa
                    </Heading>
                    <Text className=" text-[10px] sm:text-md">This sofa is perfect for modern tropical spaces, baroque</Text>
                    <Text fontSize={12} py={0} my={0} fontWeight={700} color={"red"}>
                        Price : ₹ 810.00
                    </Text>
                </Stack>
            </CardBody>
            {/* <Divider /> */}
            <CardFooter padding={1}>
                <HStack w="full" gap={1}>
                    <SizeSetDropdown />
                    <button className="border  w-full flex justify-evenly items-center h-5 sm:h-7 hover:bg-[#e2e8f0] transition-all duration-200">
                        <BsCart className="h-2 sm:h-5" />
                        <span className="text-[9px] font-semibold sm:text-xs">Add to cart</span>
                    </button>
                    <button className="border h-5 sm:h-7 hover:bg-[#e2e8f0] transition-all duration-200">
                        <BsSuitHeart className="h-2 sm:h-5 mx-1" />
                    </button>
                </HStack>
            </CardFooter>
        </Card>
    );
};

export default ProductCard;
