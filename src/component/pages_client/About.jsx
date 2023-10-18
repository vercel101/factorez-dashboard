import { Card, CardBody, CardFooter } from "@chakra-ui/react";
import React from "react";
import { MdEmail } from "react-icons/md";
import { PiPhoneCallThin } from "react-icons/pi";
import { BsLinkedin } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const About = ({ storeInfoReducer }) => {
    const navigate = useNavigate();
    const storeInfo = storeInfoReducer && storeInfoReducer.storeInfo && storeInfoReducer.storeInfo;
    return (
        <div>
            <section className="py-16 bg-[#e2f2ee01]">
                <div className="pt-[100px] md:pt-[80px] md:px-[20px] lg:px-[10%]">
                    <div className="p-3">
                        <div className="text-center">
                            <h1 className="font-bold text-4xl mb-3">About us</h1>
                        </div>
                        <div className="">
                            <p className="mt-5 text-xl ">
                                We at FactorEz, we are on a mission to empower retail and enrich MSMEs (Micro, Small, and Medium Enterprises) through our platform. Our journey began with a simple yet
                                profound vision: to provide a platform that fosters growth, innovation, and prosperity for both retailers and small businesses.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-teal-50 py-16">
                <div className="pt-[80px] md:px-[20px] lg:px-[10%]">
                    <div className="p-3">
                        <div className="text-center">
                            <h1 className="font-bold text-4xl mb-3">Our Story</h1>
                        </div>
                        <div className="">
                            <p className="mt-2 text-xl">
                                Founded in 2022, FactorEz was born out of a desire to revolutionize the retail industry and uplift MSMEs. We understand that small businesses are the backbone of the
                                Indian as well as global economy, and we are committed to supporting them in their journey towards success & growth.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className=" py-16">
                <div className="pt-[80px] md:px-[20px] lg:px-[10%]">
                    <div className="p-3">
                        <div className="text-center">
                            <h1 className="font-bold text-4xl mb-3">Our Mission</h1>
                        </div>
                        <div className="">
                            <p className="mt-2 text-xl">
                                At factorEz, our mission is clear and unwavering: to empower retail businesses by fulfilling their procurement requirement with our cutting-edge e-commerce platform
                                that helps them thrive in the digital age. Simultaneously, we strive to enrich MSMEs by giving them the tools, resources, and exposure they need to grow and compete on
                                a global scale.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-teal-50 py-16">
                <div className="pt-[80px] md:px-[20px] lg:px-[10%]">
                    <div className="p-3">
                        <div className="text-center">
                            <h1 className="font-bold text-4xl mb-3">Our Vision</h1>
                        </div>
                        <div className="">
                            <p className="mt-2 text-xl">
                                Our vision is to create a world where every retailer, regardless of their size, has the opportunity to reach their full potential. We see a future where MSMEs are not
                                limited by traditional constraints but can leverage technology to expand their horizons.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className=" py-16">
                <div className="pt-[80px] md:px-[20px] lg:px-[10%]">
                    <div className="p-3">
                        <div className="text-center">
                            <h1 className="font-bold text-4xl mb-3">OUR TEAM</h1>
                            <p className="text-teal-700 text-xl">
                                Team shares Cumulative experience of 15+ years in e-commerce Sales, Marketing and Finance, With 50+ years of family business background in Apparels.
                            </p>
                        </div>

                        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-11">
                            <Card>
                                <CardBody p={0}>
                                    <img src={require("../../assets/KaranAggarwal.jpg")} alt="" className="rounded-t-md" />
                                </CardBody>
                                <CardFooter>
                                    <div className="w-full flex flex-col text-center items-center justify-center">
                                        <h4 className="font-bold text-2xl">Karan Aggarwal</h4>
                                        <p className="text-gray-500">M.B.A & B.Com</p>
                                        <a href="https://www.linkedin.com/in/karanaggarwal005/" target="_blank" rel="noreferrer">
                                            <BsLinkedin color="#0072b1" size={35} className="mt-3 cursor-pointer" />
                                        </a>
                                    </div>
                                </CardFooter>
                            </Card>
                            <Card>
                                <CardBody p={0}>
                                    <img src={require("../../assets/CAHimanshuJain.jpg")} alt="" className="rounded-t-md" />
                                </CardBody>
                                <CardFooter>
                                    <div className="w-full flex flex-col text-center items-center justify-center">
                                        <h4 className="text-center font-bold text-2xl">CA Himanshu Jain</h4>
                                        <p className="text-gray-500">CA & B.Com</p>
                                        <a href="https://www.linkedin.com/in/acahimanshu/" target="_blank" rel="noreferrer">
                                            <BsLinkedin color="#0072b1" size={35} className="mt-3 cursor-pointer" />
                                        </a>
                                    </div>
                                </CardFooter>
                            </Card>
                            <Card>
                                <CardBody p={0}>
                                    <img src={require("../../assets/RishuGupta.jpg")} alt="" className="rounded-t-md" />
                                </CardBody>
                                <CardFooter>
                                    <div className="w-full flex flex-col text-center items-center justify-center">
                                        <h4 className="text-center font-bold text-2xl">Rishu Gupta</h4>
                                        <p className="text-gray-500">B.A From DU</p>
                                        <a href="https://www.linkedin.com/in/rishu10/" target="_blank" rel="noreferrer">
                                            <BsLinkedin color="#0072b1" size={35} className="mt-3 cursor-pointer" />
                                        </a>
                                    </div>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
            <div className="bg-teal-50 flex justify-evenly py-5">
                <div className="flex flex-col items-center justify-center">
                    <PiPhoneCallThin className="text-[50px] sm:text-[70px]" />
                    <span className="text-[14px] sm:text-[16px]">Customer support</span>
                    <span className="text-[11px] sm:text-[14px]">+91-{storeInfo && storeInfo.contactNo}</span>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <MdEmail className="text-[50px] sm:text-[70px]" />
                    <span className="text-[14px] sm:text-[16px]">Customer support</span>
                    <span className="text-[11px] sm:text-[14px]">{storeInfo && storeInfo.contactEmail}</span>
                </div>
            </div>
        </div>
    );
};

export default About;
