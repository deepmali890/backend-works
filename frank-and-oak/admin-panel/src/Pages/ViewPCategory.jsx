import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete, MdDeleteForever, MdOutlineSettingsBackupRestore } from "react-icons/md";
import Modal from "react-responsive-modal";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import Swal from "sweetalert2";

const ViewCategory = () => {
  let [show1, setShow1] = useState(false);
  let [show2, setShow2] = useState(false);

  const [product,setProduct] = useState([])
  const [deletedProduct,setDeletedProduct] = useState([])
  const [checked,setChecked] = useState([])
  const [ifAllChecked,setIfAllChecked] = useState(false)
  const [open, setOpen] = useState(false);
  const [filePath,setFilePath] = useState('')

  const fatchProductCategory = ()=>{
    axios.get(`${process.env.REACT_APP_API_HOST}/api/admin-panel/product-category/read-category`)
    .then((response)=>{
      console.log(response.data)
      setFilePath(response.data.filepath);
      setProduct(response.data.data)
    })
    .catch((error)=>{
      console.log(error)
      })
  }

  const fatchDeletedProductCategory = ()=>{
    axios.get(`${process.env.REACT_APP_API_HOST}/api/admin-panel/product-category/deleted-productCategory`)
    .then((response)=>{
      console.log(response.data)
      setDeletedProduct(response.data.data)
    })
    .catch((error)=>{
      console.log(error)
      })
  }

  useEffect(()=>{
    fatchProductCategory();
    fatchDeletedProductCategory() ;
  },[])

  const handleUpdateStatus=(e)=>{
    const status = e.target.textContent !== "Active";
    axios.put(`${process.env.REACT_APP_API_HOST}/api/admin-panel/product-category/update-status/${e.target.value}` , {status})
    .then((response)=>{
      // console.log(response)
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Status Updated",
        showConfirmButton: false,
        timer: 400
      });

     const index = product.findIndex((cat)=> cat._id === e.target.value)
     const newData = [...product]
     newData[index].status = status
     setProduct(newData)


  })
  .catch((error)=>{
    console.log(error)
    })

    
  }

  const handledeletecat=(id)=>{

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.put(`${process.env.REACT_APP_API_HOST}/api/admin-panel/product-category/delete-category/${id}`)
        .then((response)=>{
          console.log(response)
          setProduct((pre)=>(
            pre.filter((categoryy)=> categoryy._id !== id)
          ))
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
          fatchDeletedProductCategory()
        })
        .catch((error)=>{
          console.log(error)
          })

       
      }
    });
    
  
  }

  const handleCheacked =(e)=>{
    // console.log(e.target.checked)
    if(e.target.checked){
      setChecked([...checked, e.target .value])
    }else{
      setChecked((pre)=>pre.filter((item)=> item !== e.target.value))
    }
  }

  const handleAllChecked =(e)=>{
    setIfAllChecked(e.target.checked)
    if(e.target.checked){
      setChecked(product.map((item)=> item._id))
    }
    else{
      setChecked([])
    }
  }

  useEffect(()=>{
    setIfAllChecked(product.length===checked.length && product.length !== 0)
  },[product, checked])

  const handleMultidelete=()=>{
    if(checked.length===0) return

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        axios.put(`${process.env.REACT_APP_API_HOST}/api/admin-panel/product-category/multidelete-product_category`, {ids :checked})
    .then((response)=>{
      console.log(response)
      setProduct((pre) => (
        pre.filter((item) => !checked.includes(item._id))
      ))
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    })
    .catch((error)=>{
      console.log(error)
      })
      
      }
    });
    
  }

  const handlerestoreCategory=(id)=>{
    axios.put(`${process.env.REACT_APP_API_HOST}/api/admin-panel/product-category/restore-product-category/${id}`)
    .then((res)=>{
      fatchProductCategory()
      fatchDeletedProductCategory()
      setOpen(false)
    })
    .catch((err)=>{
      console.log(err)
      })
  }
  
  const handleUpdateProductStatus=(e)=>{
    const feature = e.target.textContent !== "Show";
    axios.put(`${process.env.REACT_APP_API_HOST}/api/admin-panel/product-category/update-product-category-feature/${e.target.value}` , {feature})
    .then((response)=>{
      console.log(response)
      // fatchProductCategory()
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Feature Updated",
        showConfirmButton: false,
        timer: 400
      });

      const index = product.findIndex((cate)=> cate._id === e.target.value)
      const newData = [...product]
      newData[index].featured = feature
      setProduct(newData)
    })
    .catch((error)=>{
      console.log(error)
      })

  }
  
  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white rounded-[10px] border">

<Tooltip id="my-tooltip" />
      <div className="flex items-center justify-between px-3 h-[40px] bg-[#f8f8f9] text-[20px] text-[#303640] p-[8px_16px] border-b rounded-[10px_10px_0_0]">
        <h4> View Category</h4>
       
        <span className=" cursor-pointer" onClick={() => setOpen(true)}><MdDeleteForever /></span>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} center>
        {
          (deletedProduct.length===0) ? (<h1>No Data Found</h1>):  <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th className="flex gap-2">
                <button
                onClick={handleMultidelete}
                className="bg-red-500 px-4 rounded-sm py-1 text-white"> Delete</button>
               
                <input
                  type="checkbox"
                  name="deleteAll"
                  id="deleteAllCat"
                  onClick={handleAllChecked}
                  className="accent-[#5351c9]"
                  checked={ifAllChecked}
                />
              </th>
              <th>Sno</th>
              <th>Category Name</th>
              <th>Image</th>
              <th>Description</th>
              <th>Action</th>
            
            </tr>
          </thead>
          <tbody>
            {
              deletedProduct.map((category,index)=>(
                <tr className="border-b" key={index}>
                <td>
                  <input
                    type="checkbox"
                    name="delete"
                    id="delete1"
                    value={category._id}
                    onClick={handleCheacked}
                    checked={checked.includes(category._id)}
                    className="accent-[#5351c9] cursor-pointer"
                  />
                </td>
                <td>{index+1}</td>
                <td>{category.name}</td>
                <td className="object-contain p-2">
                  <img
                    src={category.thumbnail}
                    alt="product men's t-shirt"
                    width={80}
                    height={80}
                  />
                </td>
                <td className="w-[200px] flex-wrap p-1">
                  {category.description}
                  <span
                    onClick={() => setShow1(!show1)}
                    className={
                      show1 === true ? "hidden" : "font-bold cursor-pointer"
                    }
                  >
                    ...Read
                  </span>
                  {show1 === false ? (
                    " "
                  ) : (
                    <span>
                      Deserunt nam est delectus itaque sint harum architecto.
                    </span>
                  )}
                </td>
                <td>
                  <MdDelete onClick={() => { handledeletecat(category._id) }}className="my-[5px] text-red-500 cursor-pointer inline" />{" "}
                  |{" "}
                  
                    <MdOutlineSettingsBackupRestore onClick={()=>{handlerestoreCategory(category._id)}} className="my-[5px] text-yellow-500 cursor-pointer inline" />
                
                </td>
            
              </tr>
              ))
            }
          
          
          </tbody>
        </table>
        }

     
      </Modal>

      <div className="w-[90%] mx-auto my-[20px]">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th className="flex gap-2">
                <button
                onClick={handleMultidelete}
                className="bg-red-400 shadow-red-600 px-4 rounded-sm py-1 text-white"> Delete</button>
               
                <input
                  type="checkbox"
                  name="deleteAll"
                  id="deleteAllCat"
                  onClick={handleAllChecked}
                  className="accent-[#5351c9]"
                  checked={ifAllChecked}
                />
              </th>
              <th>Sno</th>
              <th> Name</th>
              <th>parentCategory</th>
              <th>Image</th>
              <th>Description</th>
              <th>Action</th>
              <th>Feature</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              product.map((category,index)=>(
                <tr className="border-b" key={index}>
                <td>
                  <input
                    type="checkbox"
                    name="delete"
                    id="delete1"
                    value={category._id}
                    onClick={handleCheacked}
                    checked={checked.includes(category._id)}
                    className="accent-[#5351c9] cursor-pointer"
                  />
                </td>
                <td>{index+1}</td>
                <td>{category.name}</td>
                <td>{category.parent_category.name}</td>
                <td className="object-contain p-2">
                  <img
                    src={filePath + category.thumbnail}
                    alt="product men's t-shirt"
                    width={80}
                    height={80}
                  />
                </td>
                <td className="w-[200px] flex-wrap p-1">
                  {category.description}
                  <span
                    onClick={() => setShow1(!show1)}
                    className={
                      show1 === true ? "hidden" : "font-bold cursor-pointer"
                    }
                  >
                    ...Read
                  </span>
                  {show1 === false ? (
                    " "
                  ) : (
                    <span>
                      Deserunt nam est delectus itaque sint harum architecto.
                    </span>
                  )}
                </td>
                <td>
                  <MdDelete onClick={() => { handledeletecat(category._id) }}className="my-[5px] text-red-500 cursor-pointer inline" />{" "}
                  |{" "}
                  <Link to={`/dashboard/products/update-category/${category._id}`}>
                    <CiEdit className="my-[5px] text-yellow-500 cursor-pointer inline" />
                  </Link>
                </td>

                <td>

                  <button 
                  data-tooltip-id="my-tooltip"
                  value={category._id}
                  onClick={handleUpdateProductStatus}
                  data-tooltip-content={(category.featured) ? "Click to Hide" : "Click to Show"}
                  className={`p-[4px_10px] rounded-sm ${(category.featured) ? "bg-green-500" : "bg-red-500 translate-x-1 skew-y-6"}  rounded-lg px-3  translate-x-1 hover:skew-y-6 text-white  hover:bg-red-500 hover:border-white  bg-green-500 shadow-lg shadow-cyan-500/50 hover:shadow-red-500`}>
                  {(category.featured) ? "Show" :"Hide"}
                  </button>
                  
                  </td>

                <td>

                  <button 
                  data-tooltip-id="my-tooltip"
                  value={category._id}
                  onClick={handleUpdateStatus}
                  data-tooltip-content={(category.status) ? "Click to Inactive" : "Click to Active"}
                  className={`p-[4px_10px] rounded-sm ${(category.status) ? "bg-green-500" : "bg-red-500"}  text-white`}>
                  {(category.status) ? "Active" :"Inactive"}
                  </button>
                  
                  </td>
              </tr>
              ))
            }
          
          
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewCategory;
