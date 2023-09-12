import React from "react";

const Footer = () => {
    return (
        <footer className="bg-[#06038D] ">
            <div className="mx-auto w-full">
                <div className="grid grid-cols-2 gap-8 sm:px-[100px] px-4 py-6 lg:py-8 md:grid-cols-4">
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-white uppercase ">Company</h2>
                        <ul className="text-[#ff834f]  font-medium">
                            <li className="mb-4">
                                <a href="#" className=" hover:underline">
                                    About
                                </a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:underline">
                                    Careers
                                </a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:underline">
                                    Brand Center
                                </a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:underline">
                                    Blog
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-white uppercase ">Help center</h2>
                        <ul className="text-[#ff834f]  font-medium">
                            <li className="mb-4">
                                <a href="#" className="hover:underline">
                                    Discord Server
                                </a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:underline">
                                    Twitter
                                </a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:underline">
                                    Facebook
                                </a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:underline">
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-white uppercase">Legal</h2>
                        <ul className="text-[#ff834f]  font-medium">
                            <li className="mb-4">
                                <a href="#" className="hover:underline">
                                    Privacy Policy
                                </a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:underline">
                                    Licensing
                                </a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:underline">
                                    Terms &amp; Conditions
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-white uppercase ">Download</h2>
                        <ul className="text-[#ff834f]  font-medium">
                            <li className="mb-4">
                                <a href="#" className="hover:underline">
                                    iOS
                                </a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:underline">
                                    Android
                                </a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:underline">
                                    Windows
                                </a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:underline">
                                    MacOS
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="sm:px-[100px] px-4 py-6 bg-[#046a38]  md:flex md:items-center md:justify-between">
                    <span className="text-sm text-white  sm:text-center">
                        © {new Date().getFullYear()} <a href="https://flowbite.com/">FactorEz</a>. All Rights Reserved.
                    </span>
                    <div className="flex mt-4 space-x-5 sm:justify-center md:mt-0">
                        <a href="#" className="text-white hover:text-white ">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-facebook">
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                            </svg>
                            <span className="sr-only">Facebook page</span>
                        </a>
                        <a href="#" className="text-white hover:text-white ">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-instagram">
                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                            </svg>
                            <span className="sr-only">Instagram</span>
                        </a>
                        <a href="#" className="text-white hover:text-white ">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-twitter">
                                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                            </svg>
                            <span className="sr-only">Twitter page</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
