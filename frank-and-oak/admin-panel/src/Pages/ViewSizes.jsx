import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import axios from "axios";
import { Tooltip as ReactTooltip, Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

const ViewSizes = () => {

  const[size,setSize]= useState([])

  const fatchSize=()=>{
    axios.get(`${process.env.REACT_APP_API_HOST}/api/admin-panel/size/read-size`)
    .then((response)=>{
      console.log(response.data.data);
      setSize(response.data.data)
    })
    .catch((error)=>{
      console.log(error);
      })
  }
  useEffect(()=>{fatchSize()},[]);

  const handleUpdateStatus=(e)=>{
    console.log(e.target.value,e.target.textContent )
    const status =  e.target.textContent !== "Active";
    axios.put(`${process.env.REACT_APP_API_HOST}/api/admin-panel/size/update-status/${e.target.value}`, {status})
    .then((response)=>{
      console.log(response.data)
      // fatchSize()
    })
    .catch((error)=>{
      console.log(error);
      })


    

  }
  return (
    <div className="w-[90%] bg-white mx-auto border rounded-[10px] my-[150px]">
         <Tooltip id="my-tooltip" />
      <span className="block border-b rounded-[10px_10px_0_0] bg-[#f8f8f9] text-[#303640] h-[50px] p-[8px_16px] text-[23px] font-bold">
        View Size
      </span>
      <div className="w-[90%] mx-auto">
        <table className="w-full my-[20px]">
          <thead>
            <tr className="text-left border-b">
              <th>
                Delete
                <input
                  type="checkbox"
                  name="deleteAll"
                  className="m-[0_10px] accent-[#5351c9] cursor-pointer input"
                />
              </th>
              <th>Sno</th>
              <th>Size Name</th>
              <th>Size Order</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
        {
          size.map((item,index)=>(
            <tr className="border-b" key={index}>
            <td>
              <input
                type="checkbox"
                name="delete"
                className="accent-[#5351c9] cursor-pointer input"
              />
            </td>
            <td>{index+1}</td>
            <td>{item.name}</td>
            <td>{item.ordar}</td>
            <td className="flex gap-[5px]">

              <MdDelete className="my-[5px] text-red-500 cursor-pointer" /> |{" "}
              <Link to="/dashboard/sizes/update-size">
                <CiEdit className="my-[5px] text-yellow-500 cursor-pointer" />
              </Link>
            </td>
            <td>
              <button
               data-tooltip-id="my-tooltip"
               value={item._id}
               onClick={handleUpdateStatus}
               data-tooltip-content={(item.status) ? "Click to Inactive":"Click to Active"}
              className={`p-[4px_10px] rounded-sm ${(item.status) ? "bg-green-500":"bg-red-500"} text-white`}
              >
              {(item.status) ? "Active":"Inactive"}
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

export default ViewSizes;
