import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip as ReactTooltip, Tooltip } from 'react-tooltip'
import Swal from "sweetalert2";

const ViewCategory = () => {
  let [show1, setShow1] = useState(false);
  let [show2, setShow2] = useState(false);
  let [show3, setShow3] = useState(false);
  let [show4, setShow4] = useState(false);

  const [categories,setCategories] = useState([])


  const fatchCategory = ()=>{
    axios.get(`${process.env.REACT_APP_API_HOST}/api/admin-panel/parent-category/read-category`)
    .then((response)=>{
      console.log(response.data);
      setCategories(response.data.data)
    })
    .catch((error)=>{
      console.log(error);
      })
  };
  useEffect(()=>{fatchCategory()},[]);

  const handleUpdateStatus =(e)=>{
    const status =  e.target.textContent !== "Active";
    axios.put(`${process.env.REACT_APP_API_HOST}/api/admin-panel/parent-category/update-status/${e.target.value}`, {status})
    .then((response)=>{
      console.log(response.data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Status Updated",
        showConfirmButton: false,
        timer: 400
      });

      const index = categories.findIndex((cat)=> cat._id === e.target.value)
      const newData = [...categories]
      newData[index].status = status
      setCategories(newData)
    })
    .catch((error)=>{
      console.log(error);
      })

  }
 
  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white rounded-[10px] border">
      <Tooltip id="my-tooltip" />
      <span className="block h-[40px] bg-[#f8f8f9] text-[20px] text-[#303640] p-[8px_16px] border-b rounded-[10px_10px_0_0]">
        View Category
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th>
               <button 
               className="bg-red-400 rounded-sm px-2 py-1"
               
               >Delete</button>
                <input
                  type="checkbox"
                  name="deleteAll"
                  id="deleteAllCat"
                 
                  className="accent-[#5351c9]"
                
                />
              </th>
              <th>Sno</th>
              <th>Category Name</th>
              <th>Description</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
           {
            categories.map((category, index)=>(
              <tr className="border-b">
              <td>
                <input
                  type="checkbox"
                  name="delete"
                  id="delete1"
                 
                  className="accent-[#5351c9] cursor-pointer"
                 
                />
              </td>
              <td>{index+1}</td>
              <td>{category.name}</td>
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
                    {category.description}
                  </span>
                )}
              </td>
              <td>
                <MdDelete className="my-[5px] text-red-500 cursor-pointer inline" />{" "}
                |{" "}
                <Link to={`/dashboard/category/update-category/${'parentCategory._id'}`}>
                  <CiEdit className="my-[5px] text-yellow-500 cursor-pointer inline" />
                </Link>
              </td>
              <td>
                
                <button
               data-tooltip-id="my-tooltip"
               value={category._id}
               onClick={handleUpdateStatus}
               data-tooltip-content={(category.status) ? "Click to Inactive":"Click to Active"}
                className={`p-[4px_10px] rounded-sm ${(category.status) ? "bg-green-500":"bg-red-500"}  text-white`}
                >
                 {(category.status) ? "Active":"Inactive"}
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
