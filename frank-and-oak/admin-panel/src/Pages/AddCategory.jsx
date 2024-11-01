import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

const AddCategory = () => {
  const nav = useNavigate();

  const handleCreateCategory = (e)=>{
    e.preventDefault();

    axios.post(`${process.env.REACT_APP_API_HOST}/api/admin-panel/parent-category/create-category`, e.target)
    .then((response)=>{
      console.log(response);
     
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
  nav('/dashboard/category/view-category')
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
    <div className="w-[90%] mx-auto my-[150px] bg-white border rounded-[10px]">
      <span className="bg-[#f8f8f9] rounded-[10px_10px_0_0] border-b p-[8px_16px] text-[20px] font-bold block text-[#303640]">
        Add Category
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <form method="post" onSubmit={handleCreateCategory}>
          <div className="w-full my-[10px]">
            <label htmlFor="categoryName" className="block text-[#303640]">
              Category Name
            </label>
            <input
              type="text"
              name="name"
              id="categoryName"
              placeholder="Category Name"
              className="input border p-1 w-full rounded-[5px] my-[10px]"
            />
          </div>
          {/* <div className="w-full my-[10px]">
            <label htmlFor="categoryImg" className="block text-[#303640]">
              Category Image
            </label>
            <input
              type="file"
              name="thumbnail"
              id="categoryImg"
              className="input border w-full rounded-[5px] my-[10px] category"
            />
          </div> */}
          <div className="w-full my-[10px]">
            <label htmlFor="categoryDesc" className="block text-[#303640]">
              Category Description
            </label>
            <textarea
              type="file"
              name="description"
              id="categoryDesc"
              className="input border w-full rounded-[5px] my-[10px]"
            />
          </div>
          <div className="w-full my-[10px]">
            <label
              htmlFor="categoryStatus"
              className=" text-[#303640] mr-[20px]"
            >
              Status
            </label>
            <input
              type="radio"
              name="status"
              id="categoryStatus"
              value={true}
              className="input my-[10px] mx-[10px] accent-[#5351c9] cursor-pointer"
            />
            <span>Display</span>
            <input
              type="radio"
              name="status"
              id="categoryStatus"
              value={false}
              className="input my-[10px] mx-[10px] accent-[#5351c9] cursor-pointer"
            />
            <span>Hide</span>
          </div>
          <div className="w-full my-[20px] ">
            <button className="bg-[#5351c9] rounded-md text-white px-3 h-[35px]">
              Add Category
            </button> 
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
