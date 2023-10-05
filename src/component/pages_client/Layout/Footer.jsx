import React from "react";
import { BsFacebook, BsFillTelephoneFill, BsInstagram, BsLinkedin, BsTwitter, BsYoutube } from "react-icons/bs";
import playBtn from "../../../assets/playbtn.png";
import { IoMailUnread } from "react-icons/io5";
const Footer = ({ storeInfoReducer }) => {
    const storeInfo = storeInfoReducer && storeInfoReducer.storeInfo && storeInfoReducer.storeInfo;
    // console.log(storeInfoReducer);
    return (
        <footer className="bg-[#06038D] ">
            <div className="mx-auto w-full">
                <div className="grid grid-cols-2 gap-8 sm:px-[100px] px-4 py-6 lg:py-8 md:grid-cols-4 lg:grid-cols-5">
                    <div className="col-span-2">
                        <div className="w-2/3">
                            <img src="./factorlogo.png" alt="factorez" width={"250px"} />
                            <p className="text-teal-50 mt-2">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, error similique inventore sequi ex quod. Quia quod facilis mollitia itaque perspiciatis quasi,
                            </p>
                        </div>
                    </div>
                    <div>
                        <h2 className="mb-4 md:mb-6 text-xl font-extrabold text-[#dadada] uppercase ">Company</h2>
                        <ul className="text-white  font-medium">
                            <li className="mb-3 md:mb-4">
                                <a href="#" className=" hover:underline">
                                    About
                                </a>
                            </li>
                            <li className="mb-3 md:mb-4">
                                <a href="#" className="hover:underline">
                                    Careers
                                </a>
                            </li>
                            <li className="mb-3 md:mb-4">
                                <a href="#" className="hover:underline">
                                    Brand Center
                                </a>
                            </li>
                            <li className="mb-3 md:mb-4">
                                <a href="#" className="hover:underline">
                                    Blog
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-4 sm:mb-6 text-xl font-extrabold text-[#dadada] uppercase">Legal</h2>
                        <ul className="text-white font-medium">
                            <li className="mb-3 md:mb-4">
                                <a
                                    href={storeInfoReducer && storeInfoReducer.storeInfo && storeInfoReducer.storeInfo.privacyPolicy ? storeInfoReducer.storeInfo.privacyPolicy : "#"}
                                    target="_blank"
                                    className="hover:underline"
                                >
                                    Privacy Policy
                                </a>
                            </li>
                            {/* <li className="mb-3 md:mb-4">
                                <a href="#" className="hover:underline">
                                    Licensing
                                </a>
                            </li> */}
                            <li className="mb-3 md:mb-4">
                                <a
                                    target="_blank"
                                    href={storeInfoReducer && storeInfoReducer.storeInfo && storeInfoReducer.storeInfo.iAgree ? storeInfoReducer.storeInfo.iAgree : "#"}
                                    className="hover:underline"
                                >
                                    Terms &amp; Conditions
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col items-start justify-start md:col-span-2 lg:col-span-1">
                        <img src={playBtn} alt="" className="w-[150px] lg:w-[200px] cursor-pointer" />
                        <span className="hidden md:flex text-[18px] text-white  items-center ps-3 mt-2 whitespace-nowrap">
                            <BsFillTelephoneFill className="me-2" /> +91-{storeInfo && storeInfo.contactNo}
                        </span>
                        <span className="hidden md:flex text-[18px] text-white items-center ps-3 mt-2 whitespace-nowrap">
                            <IoMailUnread className="me-2" />
                            {storeInfo && storeInfo.contactEmail}
                        </span>
                        <div className="md:hidden mt-4 ps-3 flex space-x-5 sm:justify-center md:mt-0">
                            {storeInfoReducer && storeInfoReducer.storeInfo && storeInfoReducer.storeInfo.socialMedia && (
                                <>
                                    {storeInfoReducer.storeInfo.socialMedia.facebook && (
                                        <a href={`https://www.facebook.com/${storeInfoReducer.storeInfo.socialMedia.facebook}`} target="_blank" className="text-white hover:text-white ">
                                            <BsFacebook size={20} color="#322bff" />
                                            <span className="sr-only">Facebook page</span>
                                        </a>
                                    )}
                                    {storeInfoReducer.storeInfo.socialMedia.instagram && (
                                        <a href={`https://www.instagram.com/${storeInfoReducer.storeInfo.socialMedia.instagram}`} target="_blank" className="text-white hover:text-white ">
                                            <BsInstagram size={20} color="#cb7c6b" />
                                            <span className="sr-only">Instagram</span>
                                        </a>
                                    )}
                                    {storeInfoReducer.storeInfo.socialMedia.linkedin && (
                                        <a href={`https://www.linkedin.com/${storeInfoReducer.storeInfo.socialMedia.linkedin}`} target="_blank" className="text-white hover:text-white ">
                                            <BsLinkedin size={20} color="#452b8b" />
                                            <span className="sr-only">LinkedIn</span>
                                        </a>
                                    )}
                                    {storeInfoReducer.storeInfo.socialMedia.twitter && (
                                        <a href={`https://twitter.com/${storeInfoReducer.storeInfo.socialMedia.twitter}`} target="_blank" className="text-white hover:text-white ">
                                            <BsTwitter size={20} color="#3b49e1" />
                                            <span className="sr-only">Twitter page</span>
                                        </a>
                                    )}
                                    {storeInfoReducer.storeInfo.socialMedia.youtube && (
                                        <a href={`https://www.youtube.com/${storeInfoReducer.storeInfo.socialMedia.youtube}`} target="_blank" className="text-white hover:text-white ">
                                            <BsYoutube size={20} color="#9e2424" />
                                            <span className="sr-only">Youtube</span>
                                        </a>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="sm:px-[100px] px-4 py-6 bg-[#0c0c0c]  md:flex md:items-center md:justify-between">
                    <span className="text-sm text-white  sm:text-center">
                        © {new Date().getFullYear()} <a href="https://factorez.in/">FactorEz</a>. All Rights Reserved.
                    </span>
                    <div className="md:flex mt-4 hidden space-x-5 sm:justify-center md:mt-0">
                        {storeInfoReducer && storeInfoReducer.storeInfo && storeInfoReducer.storeInfo.socialMedia && (
                            <>
                                {storeInfoReducer.storeInfo.socialMedia.facebook && (
                                    <a href={`https://www.facebook.com/${storeInfoReducer.storeInfo.socialMedia.facebook}`} target="_blank" className="text-white hover:text-white ">
                                        <BsFacebook size={20} color="#322bff" />
                                        <span className="sr-only">Facebook page</span>
                                    </a>
                                )}
                                {storeInfoReducer.storeInfo.socialMedia.instagram && (
                                    <a href={`https://www.instagram.com/${storeInfoReducer.storeInfo.socialMedia.instagram}`} target="_blank" className="text-white hover:text-white ">
                                        <BsInstagram size={20} color="#cb7c6b" />
                                        <span className="sr-only">Instagram</span>
                                    </a>
                                )}
                                {storeInfoReducer.storeInfo.socialMedia.linkedin && (
                                    <a href={`https://www.linkedin.com/${storeInfoReducer.storeInfo.socialMedia.linkedin}`} target="_blank" className="text-white hover:text-white ">
                                        <BsLinkedin size={20} color="#452b8b" />
                                        <span className="sr-only">LinkedIn</span>
                                    </a>
                                )}
                                {storeInfoReducer.storeInfo.socialMedia.twitter && (
                                    <a href={`https://twitter.com/${storeInfoReducer.storeInfo.socialMedia.twitter}`} target="_blank" className="text-white hover:text-white ">
                                        <BsTwitter size={20} color="#3b49e1" />
                                        <span className="sr-only">Twitter page</span>
                                    </a>
                                )}
                                {storeInfoReducer.storeInfo.socialMedia.youtube && (
                                    <a href={`https://www.youtube.com/${storeInfoReducer.storeInfo.socialMedia.youtube}`} target="_blank" className="text-white hover:text-white ">
                                        <BsYoutube size={20} color="#9e2424" />
                                        <span className="sr-only">Youtube</span>
                                    </a>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
