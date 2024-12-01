"use client"

import { useState } from "react"
import { QuickAddButton } from "../HomeComponents/ThisJustIn"
import { FaRegHeart } from "react-icons/fa6"
import Cookies from "js-cookie"
import Swal from "sweetalert2"

export function Card({ product, filePath }) {
  let [quickAdd, setQuickAdd] = useState(false)

  const handleAddToCart=(e)=>{

    const cookieData  = Cookies.get('frank_user_117');
    if(!cookieData) return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'You need to login first',  
      
    });
    console.log(cookieData)
    const data ={
      size:e.target.value,
      product:product._id
    }

    console.log(data)

  }
 

  return (
    <div className='cursor-pointer group'>
      <div className=' w-full h-full'>
        <div className='group relative'>
          <span className='bg-black text-white absolute right-2 top-2 z-[9999] text-[8px] sm:text-[10px] font-medium uppercase px-0.5 sm:px-1 py-0.5'>{(((product.mrp - product.price) * 100) / product.mrp).toFixed()}%</span>
          <img className='h-full w-full object-cover' src={filePath + product.thumbnail} alt="Womens Denim" />
          <img className='h-full w-full duration-300 z-[999] absolute top-0 group-hover:block hidden object-cover' src={filePath + product.animate_thumbnail} alt="Womens Denim" />

          <button className='bg-white py-2 w-[95%] left-2 z-[9999] absolute bottom-2 font-semibold hidden   cursor-pointer group-hover:inline  showbtn  '>Quick add

            <div className='w-[100%] left-0 absolute bottom-2 bg-white showsize  '>
              <div className=' flex-wrap text-[17px] gap-2 justify-center flex '>
                {
                  product.sizes.map((size, index) => (
                    <button key={index} value={size._id} onClick={handleAddToCart} className='hover:bg-black  text-black px-5 hover:text-white py-1 uppercase'>{size.name}</button>
                  ))
                }


              </div>
            </div>
          </button>

        </div>

        <h5 className='sm:text-[14px] text-[12px] flex gap-3 mt-2 font-semibold'>{product.name}
          <span className=' rounded-full hover:bg-[#EBECEE] h-7 w-7 p-2 flex items-center justify-center'>
            <FaRegHeart />
          </span>
        </h5>
        <div className='sm:text-[14px] text-[13px] font-medium flex gap-2 mt-1 sm:mt-3'>
          <span className=" line-through">₹{product.mrp}</span>
          <span className="text-red-500">₹{product.price}</span>

        </div>
        <span className='group-hover:hidden sm:text-[16px] text-[12px] block'>{product.colors.length} color</span>
        <div className='group-hover:block hidden mt-1'>
          <div className='sm:w-5 sm:h-5 h-3 w-3 rounded-full border border-black flex items-center justify-center'>
            {
              product.colors.map((color, index) => (
                <div key={index} className=" w-[10px] h-[10px] rounded-full border
              border-black" style={{ backgroundColor: color.code }}></div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}
