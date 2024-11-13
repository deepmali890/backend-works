import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddPCategory = () => {
  const nav = useNavigate();

  const [parentCategory, setParentCategory]= useState([]);
  const [preview,setPreview] = useState('')
  const fatchCategory = () => {
    axios.get(`${process.env.REACT_APP_API_HOST}/api/admin-panel/parent-category/active-category`)
      .then((response) => {
        console.log(response.data);
        setParentCategory(response.data.data)

       
      })
      .catch((error) => {
        console.log(error);
      })
  };

  useEffect(()=>{fatchCategory()},[])
  

  const handleAddCategory=(e)=>{
    e.preventDefault();

    if(e.target.parent_category.value === 'default'){
      Swal.fire({
        title: "Parent Category",
        text: "please select parent category",
        icon: "info"
      });

      return;
    }

    

    axios.post(`${process.env.REACT_APP_API_HOST}/api/admin-panel/product-category/create-category`, e.target)
    .then((response)=>{
      console.log(response)

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
    .catch((error) => {
      console.error(error);
    
    })
  }

  const handleImgPreview=(e)=>{

    const file = e.target.files[0]

    const reader = new FileReader;

    reader.readAsDataURL(file)

    reader.onload = ()=>{
      setPreview(reader.result)

    }

    console.log(reader)

  }

  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white border rounded-[10px]">
      <span className="bg-[#f8f8f9] rounded-[10px_10px_0_0] border-b p-[8px_16px] text-[20px] font-bold block text-[#303640]">
        Add Category
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <form method="post" onSubmit={handleAddCategory} >
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

          <div className="w-full my-[10px]">
            <label htmlFor="slug" className="block text-[#303640]">
              Category slug
            </label>
            <input
              type="text"
              name="slug"
              id="slug"
              placeholder="Category Slug"
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
              className="input border w-full rounded-[5px] my-[10px] category"
              onChange={handleImgPreview}
            />

            {
              (!preview) ? (''):(
                <img src={preview} alt="" className="w-[150px]" />
              )
            }
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="categoryImg" className="block text-[#303640]">
              Parent Category
            </label>
            <select name="parent_category" id="" className="border w-full rounded-[5px] py-2 ps-2 my-[10px] category input">
            <option value="default"> -- select Parent category --</option>
           {
            parentCategory.map((parentCategory)=>(
              <option value={parentCategory._id}>{parentCategory.name}</option>
            ))
           }
            </select>
          </div>
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
            <button type="submit" className="bg-[#5351c9] rounded-md text-white px-3 h-[35px]">
              Add category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPCategory;

