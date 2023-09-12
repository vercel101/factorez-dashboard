import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Slider = () => {
    return (
        <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false}>
            <div className="md:h-[300px] lg:h-[400px] overflow-hidden">
                <img
                    className="h-full object-cover"
                    src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                />
                {/* <p className="legend">Legend 1</p> */}
            </div>
            <div className="md:h-[300px] lg:h-[400px] overflow-hidden">
                <img
                    className="h-full object-cover"
                    src="https://plus.unsplash.com/premium_photo-1661780784016-84df03d7d8a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1812&q=80"
                />
                {/* <p className="legend">Legend 2</p> */}
            </div>
            <div className="md:h-[300px] lg:h-[400px]  overflow-hidden">
                <img
                    className="h-full object-cover"
                    src="https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                />
                {/* <p className="legend">Legend 3</p> */}
            </div>
        </Carousel>
    );
};

export default Slider;
