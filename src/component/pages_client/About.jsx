import { Card, CardBody, CardFooter } from "@chakra-ui/react";
import React from "react";
import { MdEmail } from "react-icons/md";
import { PiPhoneCallThin } from "react-icons/pi";

const About = ({ storeInfoReducer }) => {
    const storeInfo = storeInfoReducer && storeInfoReducer.storeInfo && storeInfoReducer.storeInfo;
    return (
        <div>
            <section className="py-16 bg-[#e2f2ee01]">
                <div className="pt-[100px] md:pt-[80px] md:px-[20px] lg:px-[10%]">
                    <div className="p-3">
                        <div className="text-center">
                            <h1 className="font-bold text-3xl mb-3">About us</h1>
                        </div>
                        <div className="flex flex-col space-x-0 md:flex-row items-start justify-center mt-5 md:space-x-2">
                            <div>
                                <img
                                    src="https://firebasestorage.googleapis.com/v0/b/shoe-ecommerce-5d41f.appspot.com/o/files%2F2023-10-14_13%3A14%3A43_photo-1542291026-7eec264c27ff.jpg?alt=media&token=f0523303-e715-467e-8eae-cd18cd6971f1"
                                    alt=""
                                />
                            </div>
                            <div className="mt-5 md:mt-0">
                                <p className="mt-2">A little something about our company</p>
                                <p className="mt-5">
                                    istory enim vestibulum mollis erat suspendisse sapien habitant taciti id urna ut tellus cum proin, a est dictum cursus ridiculus venenatis sed habitasse turpis
                                    praesent dictumst nascetur. Tortor lacinia netus maecenas eros neque interdum cras conubia, commodo senectus posuere pharetra. web services via user-centric
                                    initiatives. Quickly promote sticky testing procedures before unique process improvements. Distinctively engineer innovative information whereas revolutionary
                                    process improvements. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia enim omnis saepe dolor voluptatum.
                                </p>
                                <p>
                                    Distinctively engineer innovative information whereas revolutionary process improvements. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia enim omnis
                                    saepe dolor voluptatum. Natus soluta maxime ipsum nam sapiente dignissimos voluptatum totam.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-teal-50 py-16">
                <div className="pt-[100px] md:pt-[80px] md:px-[20px] lg:px-[10%]">
                    <div className="p-3">
                        <div className="text-center">
                            <h1 className="font-bold text-3xl mb-3">WHAT WE DO</h1>
                        </div>
                        <div className="flex flex-col space-x-0 md:flex-row items-start justify-center mt-5 md:space-x-2">
                            <div>
                                <p className="mt-2">
                                    The most comprehensive repairs available at Profix. Any device, mobile, tablet or laptop can be repaired or upgraded by us, learn more about us and see why we are
                                    the best choice for device repairs and upgrades.
                                </p>
                                <p className="mt-5">
                                    We have a fully trained, experienced service department ready to handle all of your service needs. We have been in the repair and service business since 2006.
                                </p>
                            </div>
                            <div className="mt-5 md:mt-0">
                                <img
                                    src="https://firebasestorage.googleapis.com/v0/b/shoe-ecommerce-5d41f.appspot.com/o/files%2F2023-10-14_13%3A14%3A43_photo-1542291026-7eec264c27ff.jpg?alt=media&token=f0523303-e715-467e-8eae-cd18cd6971f1"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className=" py-16">
                <div className="pt-[100px] md:pt-[80px] md:px-[20px] lg:px-[10%]">
                    <div className="p-3">
                        <div className="text-center">
                            <h1 className="font-bold text-3xl mb-3">OUR TEAM</h1>
                            <p className="text-teal-700">
                                Meet with our qualified and expert team. We are specialized in our individual field. We have enough skill and tested. That’s why you’re getting the quality repair
                                services.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 gap-4">
                            <Card>
                                <CardBody p={0}>
                                    <img src="https://amigos-themes.com/profix/assets/images/outsource/member-1.jpg" alt="" className="rounded-t-md" />
                                </CardBody>
                                <CardFooter>
                                    <div className="w-full text-center">
                                        <h4 className="text-center font-bold text-2xl">Karan Aggrawal</h4>
                                        <p className="text-gray-500">Founder & CEO</p>
                                    </div>
                                </CardFooter>
                            </Card>
                            <Card>
                                <CardBody p={0}>
                                    <img src="https://amigos-themes.com/profix/assets/images/outsource/member-2.jpg" alt="" className="rounded-t-md" />
                                </CardBody>
                                <CardFooter>
                                    <div className="w-full text-center">
                                        <h4 className="text-center font-bold text-2xl">Karan Aggrawal</h4>
                                        <p className="text-gray-500">Founder & CEO</p>
                                    </div>
                                </CardFooter>
                            </Card>
                            <Card>
                                <CardBody p={0}>
                                    <img src="https://amigos-themes.com/profix/assets/images/outsource/member-1.jpg" alt="" className="rounded-t-md" />
                                </CardBody>
                                <CardFooter>
                                    <div className="w-full text-center">
                                        <h4 className="text-center font-bold text-2xl">Karan Aggrawal</h4>
                                        <p className="text-gray-500">Founder & CEO</p>
                                    </div>
                                </CardFooter>
                            </Card>
                            <Card>
                                <CardBody p={0}>
                                    <img src="https://amigos-themes.com/profix/assets/images/outsource/member-1.jpg" alt="" className="rounded-t-md" />
                                </CardBody>
                                <CardFooter>
                                    <div className="w-full text-center">
                                        <h4 className="text-center font-bold text-2xl">Karan Aggrawal</h4>
                                        <p className="text-gray-500">Founder & CEO</p>
                                    </div>
                                </CardFooter>
                            </Card>
                            <Card>
                                <CardBody p={0}>
                                    <img src="https://amigos-themes.com/profix/assets/images/outsource/member-1.jpg" alt="" className="rounded-t-md" />
                                </CardBody>
                                <CardFooter>
                                    <div className="w-full text-center">
                                        <h4 className="text-center font-bold text-2xl">Karan Aggrawal</h4>
                                        <p className="text-gray-500">Founder & CEO</p>
                                    </div>
                                </CardFooter>
                            </Card>
                            <Card>
                                <CardBody p={0}>
                                    <img src="https://amigos-themes.com/profix/assets/images/outsource/member-1.jpg" alt="" className="rounded-t-md" />
                                </CardBody>
                                <CardFooter>
                                    <div className="w-full text-center">
                                        <h4 className="text-center font-bold text-2xl">Karan Aggrawal</h4>
                                        <p className="text-gray-500">Founder & CEO</p>
                                    </div>
                                </CardFooter>
                            </Card>
                            <Card>
                                <CardBody p={0}>
                                    <img src="https://amigos-themes.com/profix/assets/images/outsource/member-1.jpg" alt="" className="rounded-t-md" />
                                </CardBody>
                                <CardFooter>
                                    <div className="w-full text-center">
                                        <h4 className="text-center font-bold text-2xl">Karan Aggrawal</h4>
                                        <p className="text-gray-500">Founder & CEO</p>
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
