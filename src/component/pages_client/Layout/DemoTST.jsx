import React from "react";
import ProductCard from "./ProductCard";

const slide = [
    <ProductCard
        cardwidth={"200px"}
        url={
            "https://images.unsplash.com/photo-1682673649000-6ef8356758cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80"
        }
    />,
    <ProductCard
        cardwidth={"200px"}
        url={
            "https://images.unsplash.com/photo-1682673649000-6ef8356758cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80"
        }
    />,
    <ProductCard
        cardwidth={"200px"}
        url={
            "https://images.unsplash.com/photo-1682673649000-6ef8356758cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80"
        }
    />,
    <ProductCard
        cardwidth={"200px"}
        url={
            "https://images.unsplash.com/photo-1682673649000-6ef8356758cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80"
        }
    />,
    <ProductCard
        cardwidth={"200px"}
        url={
            "https://images.unsplash.com/photo-1682673649000-6ef8356758cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80"
        }
    />,
    <ProductCard
        cardwidth={"200px"}
        url={
            "https://images.unsplash.com/photo-1682673649000-6ef8356758cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80"
        }
    />,
    <ProductCard
        cardwidth={"200px"}
        url={
            "https://images.unsplash.com/photo-1682673649000-6ef8356758cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80"
        }
    />,
    <ProductCard
        cardwidth={"200px"}
        url={
            "https://images.unsplash.com/photo-1682673649000-6ef8356758cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80"
        }
    />,
    <ProductCard
        cardwidth={"200px"}
        url={
            "https://images.unsplash.com/photo-1682673649000-6ef8356758cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80"
        }
    />,
    <ProductCard
        cardwidth={"200px"}
        url={
            "https://images.unsplash.com/photo-1682673649000-6ef8356758cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80"
        }
    />,
];
const DemoTST = (props) => {
    const [childRefW, setChildRefW] = React.useState(0);
    const [cardWidth, setCardWidth] = React.useState(0);
    const childRef = React.useRef();
    const myRef = React.useRef();
    React.useEffect(() => {
        console.log("myRef:", myRef.current.offsetWidth);
        console.log("childRef:", childRef.current.offsetWidth);
        setCardWidth(childRef.current.offsetWidth / slide.length);
    }, []);
    const leftClick = () => {
        // let y = childRef.current.offsetWidth - myRef.current.offsetWidth;
        if (childRefW <= 0) {
            setChildRefW((old) => 0);
        } else {
            setChildRefW((old) => old - cardWidth);
        }
    };
    const rightClick = () => {
        // let y = childRef.current.offsetWidth - myRef.current.offsetWidth;
        // console.log(y);
        console.log(childRef.current.offsetLeft);
        console.log(cardWidth);
        // if (y + childRef.current.offsetLeft < cardWidth) {
        //     setChildRefW((old) => 0);
        // } else {
        //     setChildRefW((old) => old + cardWidth);
        // }

        // if(childRefW )
    };

    return (
        <>
            <button onClick={() => leftClick()}>Left</button>
            <button onClick={() => rightClick()}>Right</button>
            <div ref={myRef} className={`flex border w-[200px] mb-10 bg-yellow-200 overflow-hidden`}>
                <div ref={childRef} className="flex transition-all duration-500" style={{ marginLeft: `-${childRefW}px` }}>
                    {slide}
                </div>
            </div>
        </>
    );
};

export default DemoTST;
