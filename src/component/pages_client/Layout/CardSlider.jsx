import React from "react";

const CardSlider = React.forwardRef(({ slides, className }, ref) => {
    const [childRefW, setChildRefW] = React.useState(0);
    const [cardWidth, setCardWidth] = React.useState(0);
    const childRef = React.useRef();
    const myRef = React.useRef();
    React.useEffect(() => {
        console.log("myRef:", myRef.current.offsetWidth);
        console.log("childRef:", childRef.current.offsetWidth);
        setCardWidth(childRef.current.offsetWidth / slides.length);
    }, []);

    React.useImperativeHandle(ref, () => {
        return {
            leftClick: leftClick,
            rightClick: rightClick,
        };
    });

    const leftClick = () => {
        // let y = childRef.current.offsetWidth - myRef.current.offsetWidth;
        if (childRefW <= 0) {
            setChildRefW((old) => 0);
        } else {
            setChildRefW((old) => old - cardWidth);
        }
    };
    const rightClick = () => {
        let y = childRef.current.offsetWidth - myRef.current.offsetWidth;
        if (y + childRef.current.offsetLeft < cardWidth) {
            setChildRefW((old) => 0);
        } else {
            setChildRefW((old) => old + cardWidth);
        }
    };
    return (
        <>
            <div ref={myRef} className={`flex border ${className} mb-10 bg-yellow-200 overflow-hidden`}>
                <div ref={childRef} className="flex transition-all duration-500" style={{ marginLeft: `-${childRefW}px` }}>
                    
                </div>
            </div>
        </>
    );
});

export default CardSlider;
