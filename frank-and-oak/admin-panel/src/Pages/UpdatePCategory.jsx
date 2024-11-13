import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdatePCategory = () => {

  const nav = useNavigate()
  const [category,setCategory] = useState({})

  const {_id} = useParams()
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_HOST}/api/admin-panel/product-category/read_category/${_id}`)
    .then((response)=>{
      console.log(response.data);
      setCategory(response.data.data)
    })
    .catch((error)=>{
      console.log(error);
      })
  },[_id])

  console.log(_id)

  const handleUpadeCategory =()=>{
    axios.put(`${process.env.REACT_APP_API_HOST}/api/admin-panel/product-category/update-ProductCategory/${_id}`,
      {
        name:category.name,
        description:category.description
      }
    )
    .then((response)=>{
      console.log(response.data);

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
        nav('/dashboard/products/view-category')
      });
    })
    .catch((error)=>{
      console.log(error);
      })
  }
  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white border rounded-[10px]">
      <span className="bg-[#f8f8f9] rounded-[10px_10px_0_0] border-b p-[8px_16px] text-[20px] font-bold block text-[#303640]">
        Update Product Category
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <form>
          <div className="w-full my-[10px]">
            <label htmlFor="categoryName" className="block text-[#303640]">
              Category Name
            </label>
            <input
              type="text"
              name="name"
              id="categoryName"
              value={category.name}
              onChange={(e)=>{setCategory({...category, name: e.target.value})}}
              placeholder="Category Name"
              className="input border p-1 w-full rounded-[5px] my-[10px]"
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="categoryImg" className="block text-[#303640]">
              Category Image
            </label>
            <input
              type="file"
              name="thumbnail"
              id="categoryImg"
              // value={category.thumbnail}
              // ref={fileInputRef}
              onChange={(e)=>{setCategory({...category, thumbnail:e.target.value})}}
              className="input border w-full rounded-[5px] my-[10px] category"
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="categoryDesc" className="block text-[#303640]">
              Category Description
            </label>
            <textarea
              type="file"
              name="description"
              id="categoryDesc"
              value={category.description}
              onChange={(e)=>{setCategory({...category, description:e.target.value})}}
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
              name="categoryStatus"
              id="categoryStatus"
              value={true}
              className="input my-[10px] mx-[10px] accent-[#5351c9] cursor-pointer"
            />
            <span>Display</span>
            <input
              type="radio"
              name="categoryStatus"
              id="categoryStatus"
              value={false}
              checked
              className="input my-[10px] mx-[10px] accent-[#5351c9] cursor-pointer"
            />
            <span>Hide</span>
          </div>
          <div className="w-full my-[20px] ">
            <button type="button" onClick={handleUpadeCategory} className="bg-[#5351c9] rounded-md text-white px-3 h-[35px]">
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePCategory;
