import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddSizes = () => {
  const nav = useNavigate()

  const handlesize= (e)=>{
    e.preventDefault();
   

    axios.post(`${process.env.REACT_APP_API_HOST}/api/admin-panel/size/create-size`, e.target)
    .then((response)=>{
      console.log(response.data)

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
      console.error(error);
      if(error.status === 400){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Category already exists, if can't find check bin!",
          footer: '<a href="#">Why do I have this issue?</a>'
        });

        return;
      }

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong, please try after some time!",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
    })
  }

  return (
    <div className="w-[90%] my-[150px] mx-auto bg-white rounded-[10px] border">
      <span className="block bg-[#f8f8f9] h-[50px] rounded-[10px_10px_0_0] border-b p-[8px_16px] text-[25px] font-[700] text-[#303640]">
        Add Size
      </span>
      <form onSubmit={handlesize}>
        <div className="w-full p-[8px_16px] my-[10px] ">
          <label htmlFor="size" className="text-[#252b36f2]">
            Size Name
          </label>
          <input
            type="text"
            name="name"
            id="size"
            placeholder="Size Name"
            className="w-full input rounded-[5px] p-2 border my-[10px]"
          />
        </div>
        <div className="w-full p-[8px_16px] my-[10px] ">
          <label htmlFor="size" className="text-[#252b36f2]">
            Size Order
          </label>
          <input
            type="text"
            name="ordar"
            id="size_order"
            placeholder="Size Order"
            className="w-full input rounded-[5px] p-2 border my-[10px]"
          />
        </div>
        <div className="w-full p-[8px_16px] my-[10px] ">
          <label htmlFor="size" className="text-[#252b36f2] mr-[30px]">
            Display
          </label>
          <input
            type="radio"
            name="size"
            id="size"
            value={true}
            placeholder="Size Name"
            className="my-[10px] mx-[20px] accent-[#5351c9] cursor-pointer"
          />
          <span>Display</span>
          <input
            type="radio"
            name="size"
            id="size"
            value={false}
            placeholder="Size Name"
            className="my-[10px] mx-[20px] accent-[#5351c9] cursor-pointer"
            checked
            
          />
          <span>Hide</span>
        </div>
        <div className="w-full p-[8px_16px] my-[10px] ">
          <button className="bg-[#5351c9] rounded-md text-white w-[100px] h-[35px]" >
            Add Size
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSizes;
