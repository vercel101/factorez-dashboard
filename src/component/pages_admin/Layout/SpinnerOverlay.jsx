import { Spinner } from "@chakra-ui/react";
import React from "react";
import { PiSpinnerGapLight } from "react-icons/pi";
const SpinnerOverlay = () => {
    return (
        <div className="fixed select-none top-0 left-0 right-0 bottom-0 flex justify-center items-center backdrop-blur-sm z-50">
            <div className="flex flex-col items-center">
                {/* <PiSpinnerGapLight size={40} className="animate-spin text-black" /> */}
                <Spinner
                    thickness="7px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                />
            </div>
        </div>
    );
};

export default SpinnerOverlay;
