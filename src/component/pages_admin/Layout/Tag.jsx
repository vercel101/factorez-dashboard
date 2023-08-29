import React from 'react'
import {IoCloseSharp} from 'react-icons/io5'

const Tag = ({tag, onClick}) => {
  
  return (
    <div className='bg-[#38c65c] dark:bg-[#00000096] mb-[1px] me-[1px] text-white w-fit px-2 rounded-full flex items-center justify-betweena'>
      <span>{tag}</span>
      <button className='ms-2  border-s ps-2'><IoCloseSharp size={20} onClick={() => onClick()}/></button>
    </div>
  )
}

export default Tag