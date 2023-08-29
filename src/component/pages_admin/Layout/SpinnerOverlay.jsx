import React from "react";
import { PiSpinnerGapLight } from "react-icons/pi";
const SpinnerOverlay = () => {
   return (
      <div className="fixed select-none top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-[#0000000b] z-50">
         <div className="flex flex-col items-center">
            <PiSpinnerGapLight size={40} className="animate-spin text-white" />
         </div>
      </div>
   );
};

export default SpinnerOverlay;
