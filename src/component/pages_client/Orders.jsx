import { Badge, Heading, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { getAllOrderApi } from "../../apis/clientApis";
import { useNavigate } from "react-router-dom";
import { capitalizeString } from "../../utils/capitalize";

const Orders = ({ tokenReducer, userInfoReducer, storeInfoReducer }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    const [allOrders, setAllOrders] = React.useState([]);

    const orderInformation = (id) => {
        navigate("/order/" + id);
    };
    const allOrdersFetch = async () => {
        await getAllOrderApi(userInfoReducer.customerId, tokenReducer)
            .then((res) => {
                console.log(res.data);
                setAllOrders(res.data.data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };
    const orderStatusBadge = (status) => {
        let variant = "";
        let colorScheme = "";
        //"PENDING", "CONFIRMED", "PARTIAL_CONFIRMED",
        //"READY_TO_DISPATCH", "PICKUP_ALIGNED", "PICKUP_DONE",
        //"RETURNED","RETURNED_RTO","RETURNED_RTO_DELIVERED",
        //"DELIVERED", "CANCELLED", "OUT_FOR_DELIVERY"
        if (status === "CONFIRMED") {
            variant = "solid";
            colorScheme = "green";
        } else if (status === "OUT_FOR_DELIVERY") {
            variant = "outline";
            colorScheme = "green";
        } else if (status === "PENDING") {
            variant = "outline";
            colorScheme = "facebook";
        } else if (status === "PARTIAL_CONFIRMED") {
            variant = "solid";
            colorScheme = "whatsapp";
        } else if (status === "CANCELLED") {
            variant = "solid";
            colorScheme = "red";
        } else if (status === "DELIVERED") {
            variant = "solid";
            colorScheme = "orange";
        } else {
            variant = "solid";
            colorScheme = "";
        }
        return (
            <Badge ms={2} colorScheme={colorScheme} variant={variant}>
                {status}
            </Badge>
        );
    };

    React.useEffect(() => {
        allOrdersFetch();
    }, []);

    return (
        <div className="pt-[100px] md:pt-[80px] px-2 md:px-[20px] lg:px-[10%] bg-white pb-5">
            <Heading size={"lg"}>All Orders</Heading>
            <div className="mt-5">
                {allOrders?.map((el) => (
                    <div key={el._id} className="border p-2 bg-slate-50 flex items-start justify-between mt-2 cursor-pointer" onClick={() => orderInformation(el.orderId)}>
                        <div>
                            <h1 className="text-sm font-semibold md:text-xl">
                                Order ID : <span className="text-blue-700">{el.orderId}</span>
                            </h1>
                            <h5>Quantity : {el.ordered_products.products.length}</h5>
                        </div>
                        <div>
                            <span className="">
                                Status:
                                {orderStatusBadge(el.order_status_id.status)}
                                {/* <Badge marginStart={2}>{el.order_status_id.status}</Badge> */}
                            </span>
                            <h1 className="text-sm font-semibold md:text-md">Total Amount : ₹{el.grand_total.toFixed(2)}</h1>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;
