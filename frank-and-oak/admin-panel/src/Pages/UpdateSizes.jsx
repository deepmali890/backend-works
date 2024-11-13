import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateSizes = () => {

  const {_id} = useParams();
  const nav = useNavigate()

  const [size,setsize]= useState({})

   useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_HOST}/api/admin-panel/size/read-Cat/${_id}`)
    .then((response)=>{
      console.log(response.data.data);
      setsize(response.data.data)
    })
    .catch((error)=>{
      console.log(error);
      })

   },[_id])

   const handleUpadeCategory=()=>{
    axios.put(`${process.env.REACT_APP_API_HOST}/api/admin-panel/size/update-Cat/${_id}`,
      {
      name:size.name,
      ordar:size.ordar
      }
    )
    .then((response)=>{
      console.log(response.data.data);
      setsize(response.data.data)

      let timerInterval;
      Swal.fire({
        title: "Category added",
        html: "You're are redirecting to view page <b></b> milliseconds.",
        timer: 700,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const timer = Swal.getPopup().querySelector("b");
          timerInterval = setInterval(() => {
            timer.textContent = `${Swal.getTimerLeft()}`;
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        }
      }).then((result) => {
        nav('/dashboard/size/view-sizes')
      });
    })
    .catch((error)=>{
      console.log(error);
      })
   }
  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white rounded-[10px] border">
      <span className="block bg-[#f8f8f9] text-[20px] font-bold p-[8px_16px] text-[#303640] border-b rounded-[10px_10px_0_0]">
        Update Size
      </span>
      <div className="w-[95%] mx-auto my-[20px]">
        <form>
          <div>
            <label htmlFor="size" className="block text-[#252b36f2]">
              Size Name
            </label>
            <input
              type="text"
              id="size"
              name="updated_size"
              placeholder="Size Name"
              value={size.name}
              onChange={(e)=>{setsize({...size, name:e.target.value})}}
              className="input p-2 border my-[20px] w-full rounded-[5px]"
            />
            <div className="w-full my-[10px] ">
              <label htmlFor="size" className="text-[#252b36f2] block">
                Size Order
              </label>
              <input
                type="text"
                name="ordar"
                value={size.ordar}
                id="updated_size_order"
                placeholder="Size Order"
                onChange={(e)=>{setsize({...size, ordar:e.target.value})}}
                className="w-full input rounded-[5px] p-2 border my-[10px]"
              />
            </div>
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="status" className="mr-[20px]">
              Status
            </label>
            <input
              type="radio"
              id="status"
              name="status"
              value="0"
              className="accent-[#5351c9] mx-[10px]"
            />
            <span>Display</span>
            <input
              type="radio"
              id="status"
              name="status"
              value="1"
              className="accent-[#5351c9] mx-[10px]"
            />
            <span>Hide</span>
          </div>
          <div className="w-full my-[30px]">
            <button type="button" className="w-[100px] rounded-[10px] bg-[#5351c9] border-none cursor-pointer text-white h-[30px]"
            onClick={handleUpadeCategory}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateSizes;
