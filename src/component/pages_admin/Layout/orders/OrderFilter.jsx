import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React from "react";
import { MdOutlineClose } from "react-icons/md";

const OrderFilter = ({ filterText, onFilter, onClear }) => {
  return (
    <div className="flex items-center">
        <InputGroup>
            <Input w={'400px'} placeholder="Search by product, SKU or Seller Name" value={filterText} onChange={onFilter} />
            <InputRightElement>
                <MdOutlineClose size={30} color="green.500" onClick={onClear} className="cursor-pointer hover:bg-blue-50 p-1 rounded-md" />
            </InputRightElement>
        </InputGroup>
    </div>
  )
}

export default OrderFilter