import React, { useState } from "react";
import { getWishlistProductApi } from "../../apis/clientApis";
import ProductCard from "./Layout/ProductCard";

const Wishlist = ({ tokenReducer, userInfoReducer, storeInfoReducer }) => {
    const [cartWishlist, setWishlistData] = useState([]);

    const fetchWishlistData = async () => {
        await getWishlistProductApi(tokenReducer)
            .then((res) => {
                console.log(res.data);
                setWishlistData(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const removedCart = () => {
        fetchWishlistData();
    };

    React.useEffect(() => {
        fetchWishlistData();
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="pt-[100px] md:pt-[80px] md:px-[20px] lg:px-[10%] bg-gray-100 ">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-3 mt-5 sm:mx-0 sm:mt-5 pb-20">
                {cartWishlist.length > 0 ? (
                    cartWishlist.map((el) => (
                        <ProductCard customerId={userInfoReducer.customerId} tokenReducer={tokenReducer} key={el._id} element={el.productId} disableFooter={true} removedCart={removedCart} />
                    ))
                ) : (
                    <h1 className="mt-10 font-bold text-lg">Nothing to show</h1>
                )}
            </div>
        </div>
    );
};

export default Wishlist;
