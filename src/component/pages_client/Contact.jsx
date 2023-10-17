import { Button, Input, Textarea } from "@chakra-ui/react";
import React from "react";
import { MdCall, MdEmail, MdLocationPin } from "react-icons/md";

const Contact = ({ storeInfoReducer }) => {
    const storeInfo = storeInfoReducer && storeInfoReducer.storeInfo && storeInfoReducer.storeInfo;
    return (
        <div>
            <div className="pt-[100px] md:pt-[80px] md:px-[20px] lg:px-[10%] md:pb-[80px]">
                <div className="text-center mt-10 md:mt-20">
                    <p className="text-lg font-semibold text-gray-400">Ask Question</p>
                    <h1 className="font-bold text-3xl">Let us hear from you directly!</h1>
                </div>
                <div className="flex flex-col p-3 md:flex-row items-start justify-start mt-10">
                    <div className="w-full md:w-96">
                        <h3 className="font-bold text-2xl">Address</h3>
                        <div className="flex items-start justify-start mt-3">
                            <div className="mr-2 mt-1">
                                <MdLocationPin size={25} color="blue" />
                            </div>
                            <p className="text-blue-600 font-semibold">Plot No-1056, 1st Floor, Udyog Vihar, Phase-1, Gurugram, Haryana -122016</p>
                        </div>
                        <div className="flex items-center justify-start mt-5">
                            <div className="mr-2 mt-1">
                                <MdCall size={25} color="blue" />
                            </div>
                            <p className="text-blue-600 font-semibold">+91 {storeInfo && storeInfo.contactNo}</p>
                        </div>
                        <div className="flex items-center justify-start mt-5">
                            <div className="mr-2 mt-1">
                                <MdEmail size={25} color="blue" />
                            </div>
                            <p className="text-blue-600 font-semibold">{storeInfo && storeInfo.contactEmail}</p>
                        </div>
                    </div>
                    <div className="flex-1 md:px-10 mt-10 md:mt-0">
                        <div className="flex items-center justify-between space-x-5">
                            <div className="w-full">
                                <label htmlFor="fullname" className="text-md font-semibold">
                                    Full name
                                </label>
                                <Input id="fullname" placeholder="Full Name" width={"full"} size={"lg"} />
                            </div>
                            <div className="w-full">
                                <label htmlFor="email" className="text-md font-semibold">
                                    Email
                                </label>
                                <Input id="email" placeholder="hello@domain.com" width={"full"} size={"lg"} />
                            </div>
                        </div>
                        <Textarea placeholder="Tell us what we can help you with!" className="mt-5" size={"lg"} />
                        <Button colorScheme="messenger" mt={3}>
                            Send message
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
