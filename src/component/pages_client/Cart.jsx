import React from "react";
import { getCartsByCustomerApi } from "../../apis/clientApis";
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";

const Cart = ({ tokenReducer, userInfoReducer, storeInfoReducer }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const fetchCartValue = async () => {
        let custId = JSON.parse(sessionStorage.getItem("userInfo")).customerId;
        let token = sessionStorage.getItem("token");
        console.log(custId);
        console.log(token);
        await getCartsByCustomerApi(custId, token)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    React.useEffect(() => {
        fetchCartValue();
    }, []);
    return (
        <div className="pt-[80px] md:px-[20px] lg:px-[10%] bg-gray-100">
            
            <div class="container mx-auto mt-10 pb-20">
                <div class="flex flex-col sm:flex-row shadow-md px-2 sm:px-0">
                    <div class="w-full sm:w-3/4 bg-white px-10 py-10">
                        <div class="flex justify-between border-b pb-2 sm:pb-8">
                            <h1 class="font-semibold text-lg sm:text-2xl">Shopping Cart</h1>
                            <h2 class="font-semibold text-lg sm:text-2xl">3 Items</h2>
                        </div>
                        <div class="hidden sm:flex mt-10 mb-5">
                            <h3 class="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
                            <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Quantity</h3>
                            <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Price</h3>
                            <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Total</h3>
                        </div>
                        <div class="flex flex-col sm:flex-row sm:items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                            <div class="flex w-full sm:w-2/5">
                                <div class="w-20">
                                    <img
                                        class="h-24"
                                        src="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80"
                                        alt=""
                                    />
                                </div>
                                <div class="flex flex-col justify-start sm:justify-between ml-4 flex-grow">
                                    <span class="font-bold text-sm">Iphone 6S</span>
                                    <div className="flex sm:flex-col space-x-2 sm:space-x-0 sm:space-y-2 items-start justify-start">
                                        <span class="text-red-500 text-xs">Apple</span>
                                        <a href="#" class="font-semibold hover:text-red-500 text-gray-500 text-xs">
                                            Remove
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="flex justify-between sm:justify-center w-full sm:w-1/5">
                                <div className="flex items-center justify-between">
                                    <svg class="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                                        <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                                    </svg>

                                    <input class="mx-2 border text-center w-8" type="text" value="1" />

                                    <svg class="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                                        <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                                    </svg>
                                </div>
                                <div className="sm:hidden flex flex-col">
                                    <span class="text-center  font-semibold text-sm">Price: $400.00</span>
                                    <span class="text-center font-semibold text-sm">Total: $400.00</span>
                                </div>
                            </div>
                            <span class="hidden sm:block text-center w-1/5 font-semibold text-sm">$400.00</span>
                            <span class="hidden sm:block text-center w-1/5 font-semibold text-sm">$400.00</span>
                        </div>
                        <div class="flex flex-col sm:flex-row sm:items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                            <div class="flex w-full sm:w-2/5">
                                <div class="w-20">
                                    <img
                                        class="h-24"
                                        src="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80"
                                        alt=""
                                    />
                                </div>
                                <div class="flex flex-col justify-start sm:justify-between ml-4 flex-grow">
                                    <span class="font-bold text-sm">Iphone 6S</span>
                                    <div className="flex sm:flex-col space-x-2 sm:space-x-0 sm:space-y-2 items-start justify-start">
                                        <span class="text-red-500 text-xs">Apple</span>
                                        <a href="#" class="font-semibold hover:text-red-500 text-gray-500 text-xs">
                                            Remove
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="flex justify-between sm:justify-center w-full sm:w-1/5">
                                <div className="flex items-center justify-between">
                                    <svg class="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                                        <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                                    </svg>

                                    <input class="mx-2 border text-center w-8" type="text" value="1" />

                                    <svg class="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                                        <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                                    </svg>
                                </div>
                                <div className="sm:hidden flex flex-col">
                                    <span class="text-center  font-semibold text-sm">Price: $400.00</span>
                                    <span class="text-center font-semibold text-sm">Total: $400.00</span>
                                </div>
                            </div>
                            <span class="hidden sm:block text-center w-1/5 font-semibold text-sm">$400.00</span>
                            <span class="hidden sm:block text-center w-1/5 font-semibold text-sm">$400.00</span>
                        </div>
                        <a href="/products" class="flex font-semibold text-indigo-600 text-sm mt-10">
                            <svg class="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512">
                                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                            </svg>
                            Continue Shopping
                        </a>
                    </div>

                    <div id="summary" class="w-full sm:w-1/4 px-2 sm:px-8 py-10">
                        <h1 class="font-semibold text-2xl border-b pb-8">Order Summary</h1>
                        <div class="flex justify-between mt-10 mb-5">
                            <span class="font-semibold text-sm uppercase">Items 3</span>
                            <span class="font-semibold text-sm">590$</span>
                        </div>
                        <div>
                            <label class="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
                            <select class="block p-2 text-gray-600 w-full text-sm">
                                <option>Standard shipping - $10.00</option>
                            </select>
                        </div>
                        <div class="py-10">
                            <label for="promo" class="font-semibold inline-block mb-3 text-sm uppercase">
                                Promo Code
                            </label>
                            <input type="text" id="promo" placeholder="Enter your code" class="p-2 text-sm w-full" />
                        </div>
                        <button class="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">Apply</button>
                        <div class="border-t mt-8">
                            <div class="flex font-semibold justify-between py-6 text-sm uppercase">
                                <span>Total cost</span>
                                <span>$600</span>
                            </div>
                            <button class="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
