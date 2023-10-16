import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Slider = ({ images }) => {
    return (
        <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false}>
            {images
                .filter((o) => o.type === "MULTIPLE")
                .map((el) => (
                    <div className="md:h-[300px] lg:h-[400px] overflow-hidden">
                        <img className="h-full object-cover" src={el.bannerUrl} alt="" />
                        {/* <p className="legend">Legend 1</p> */}
                    </div>
                ))}
        </Carousel>
    );
};

export default Slider;
