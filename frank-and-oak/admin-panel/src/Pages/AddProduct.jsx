import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Select from 'react-select';

const AddProduct = () => {


  const [parentCategory, setParentCategory]= useState([]);
  const [productCategory, setProductCategory]= useState([]);
  const [sizeCategory, setsizeCategory]= useState([]);
  const [Colors, setColors]= useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  // const [preview,setPreview] = useState('')



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

  const fatchSizes = ()=>{
    axios.get(`${process.env.REACT_APP_API_HOST}/api/admin-panel/size/read-size`)
    .then((response) => {
      console.log(response.data);

     const newSize = response.data.data.map((size)=>({...size, value:size._id, label:size.name.toUpperCase()}))
      setsizeCategory(newSize)

     
    })
    .catch((error) => {
      console.log(error);
    })
  }

  
  const fatchColor = ()=>{
    axios.get(`${process.env.REACT_APP_API_HOST}/api/admin-panel/color/viewColor`)
    .then((response) => {
      console.log(response.data);

     const newColor = response.data.data.map((color)=>({...color, value:color._id, label:color.name.toUpperCase()}))
     setColors(newColor)

     
    })
    .catch((error) => {
      console.log(error);
    })
  }


    
  useEffect(()=>{fatchCategory(); fatchSizes(); fatchColor() },[])

  const handleProductCategory=(e)=>{
    if(e.target.value ===  'default' ) return
    console.log(e.target.value)
    axios.get(`${process.env.REACT_APP_API_HOST}/api/admin-panel/product-category/true-read-category-by-parent/${e.target.value}`)
    .then((response) => {
      console.log(response.data);
       setProductCategory(response.data.data)

     
    })
    .catch((error) => {
      console.log(error);
    })
  }

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

    if(e.target.product_category.value === 'default'){
      Swal.fire({
        title: "Product Category",
        text: "please select parent category",
        icon: "info"
      });

      return;
    }
  }

  




  
  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white rounded-[10px] border">
      <span className="block border-b bg-[#f8f8f9] text-[#303640] text-[20px] font-bold p-[8px_16px] h-[40px] rounded-[10px_10px_0_0]">
        Product Details
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <form method="post" onSubmit={handleAddCategory}>
          <div className="w-full my-[10px]">
            <label htmlFor="product_name" className="block text-[#303640]">
              Product Name
            </label>
            <input
              type="text"
              id="product_name"
              name="product_name"
              placeholder="Name"
              className="w-full input border p-2 rounded-[5px] my-[10px]"
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="product_desc" className="block text-[#303640]">
              Product Description
            </label>
            <textarea
              id="product_desc"
              name="product_desc"
              placeholder="Description"
              rows={3}
              cols={10}
              className="w-full input border p-2 rounded-[5px] my-[10px]"
            />
          </div>
          <div className="w-full my-[10px]">
            <label
              htmlFor="product_short_desc"
              className="block text-[#303640]"
            >
              Short Description
            </label>
            <textarea
              id="product_short_desc"
              name="product_short_desc"
              placeholder="Short Description"
              rows={2}
              cols={10}
              className="w-full input border p-2 rounded-[5px] my-[10px]"
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="product_img" className="block text-[#303640]">
              Product Image
            </label>
            <input
              type="file"
              id="product_img"
              name="product_img"
              className="w-full input border rounded-[5px] my-[10px] category"
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="image_animation" className="block text-[#303640]">
              Image Animation
            </label>
            <input
              type="file"
              id="image_animation"
              name="image_animation"
              className="w-full input border rounded-[5px] my-[10px] category"
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="product_gallery" className="block text-[#303640]">
              Product Gallery
            </label>
            <input
              type="file"
              id="product_gallery"
              name="product_gallery"
              className="w-full input border rounded-[5px] my-[10px] category"
            />
          </div>
          <div className="w-full my-[10px] grid grid-cols-[2fr_2fr] gap-[20px]">
            <div>
              <label htmlFor="product_price" className="block text-[#303640]">
                Price
              </label>
              <input
                type="text"
                id="product_price"
                name="product_price"
                placeholder="Product Price"
                className="w-full input border rounded-[5px] my-[10px] p-2"
              />
            </div>
            <div>
              <label htmlFor="product_mrp" className="block text-[#303640]">
                MRP
              </label>
              <input
                type="text"
                id="product_mrp"
                name="product_mrp"
                placeholder="Product MRP"
                className="w-full input border rounded-[5px] my-[10px] p-2"
              />
            </div>
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="parent_category" className="block text-[#303640]">
              Select Parent Category
            </label>
            <select
              id="parent_category"
              name="parent_category"
              onChange={handleProductCategory}
              className="w-full input border p-2 rounded-[5px] my-[10px] cursor-pointer"
            >
              <option value="default" selected disabled hidden>
                --Select Parent Category--

                
              </option>

              {
                parentCategory.map((item,index)=>(
                  <option value={item._id} className="cursor-pointer">
                  {item.name}
                </option>
                ))
              }
          
            
            </select>
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="product_category" className="block text-[#303640]">
              Select Product Category
            </label>
            <select
              id="product_category"
              name="product_category"
              className="w-full input border p-2 rounded-[5px] my-[10px] cursor-pointer"
            >
              <option value="default" selected disabled hidden>
                --Select Product Category--
              </option>

              {
                productCategory.map((items,index)=>(
                  <option value={items._id} className="cursor-pointer">
                 {items.name}
                </option>
                ))
              }
         
            </select>
          </div>
          <div className="w-full grid grid-cols-[2fr_2fr] gap-[20px]">
            <div>
              <label htmlFor="stock" className="block text-[#303640]">
                Manage Stock
              </label>
              <select
                name="stock"
                id="stock"
                className="p-2 input w-full border rounded-[5px] my-[10px]"
              >
                <option value="default" selected disabled hidden>
                  --Select Stock--
                </option>
                <option value="inStock">In Stock</option>
                <option value="outStock">Out of Stock</option>
              </select>
            </div>
            <div>
              <label htmlFor="brand" className="block text-[#303640]">
                Brand Name
              </label>
              <input
                type="text"
                name="brand"
                id="brand"
                placeholder="Brand"
                className="p-2 input w-full border rounded-[5px] my-[10px]"
              />
            </div>
          </div>
          <div className="w-full grid grid-cols-[2fr_2fr] gap-[20px]">
            <div>
              <label htmlFor="size" className="block text-[#303640] mb-3">
                Size
              </label>

              <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={sizeCategory}
        isMulti
        isSearchable
      />
              {/* <select
                name="size"
                id="size"
                className="p-2 input w-full border rounded-[5px] my-[10px]"
                multiple
              >
                <option value="default" selected disabled hidden>
                  --Select Size--
                </option>
                <option value="s">S</option>
                <option value="m">M</option>
                <option value="l">L</option>
                <option value="xl">XL</option>
                <option value="xxl">XXL</option>
              </select> */}
            </div>
            <div>
              <label htmlFor="color" className="block text-[#303640] mb-3">
                Color
              </label>
              <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={Colors}
        isMulti
        isSearchable
      />
            </div>
          </div>
          <div className="w-full my-[10px] ">
            <label htmlFor="status" className="text-[#252b36f2] mr-[30px]">
              Status
            </label>
            <input
              type="radio"
              name="status"
              id="status"
              value="0"
              className="my-[10px] mx-[20px] accent-[#5351c9]"
            />
            <span>Display</span>
            <input
              type="radio"
              name="status"
              id="status"
              value="1"
              className="my-[10px] mx-[20px] accent-[#5351c9]"
              checked
            />
            <span>Hide</span>
          </div>
          <div className="w-full p-[8px_16px] my-[30px] ">
            <button type="submit" className="bg-[#5351c9] rounded-md text-white w-[100px] h-[35px]">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
