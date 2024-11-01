import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";

const ViewColor = () => {
  const[color,setColor]= useState([])

  const fatchColor = ()=>{
    axios.get(`${process.env.REACT_APP_API_HOST}/api/admin-panel/color/viewColor`)
    .then((response)=>{
      console.log(response.data.data);
      setColor(response.data.data)
     
    })
    .catch((error)=>{
      console.log(error);
      })
  };
  useEffect(()=>{fatchColor()},[]);

  const handleupdatestatus=(e)=>{
    console.log(e.target.value,e.target.textContent ) 
    const status =  e.target.textContent !== "Active";

    
  }
  return (
    <div className="w-[90%] bg-white rounded-[10px] border mx-auto my-[150px]">
       <Tooltip id="my-tooltip" />
      <span className="block h-[40px] border-b rounded-[10px_10px_0_0] bg-[#f8f8f9] text-[#303640] p-[8px_16px] text-[20px]">
        View Color
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="flex p-2">
                <button className="bg-[#5351c9] font-light text-white rounded-md p-1 w-[80px] h-[35px] my-[10px] mr-[10px]">
                  Delete
                </button>
                <input
                  type="checkbox"
                  name="deleteAll"
                  className="cursor-pointer accent-[#5351c9] input"
                />
              </th>
              <th className="p-2">Sno.</th>
              <th className="p-2">Color Name</th>
              <th className="p-2">Color</th>
              <th className="p-2">Action</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {
              color.map((colors,index)=>{
                
                return(
                <>
                <tr className="border-b" key={index}>
                <td className="p-2">
                  <input
                    type="checkbox"
                    name="delete"
                    className="cursor-pointer accent-[#5351c9] input"
                  />
                </td>
                <td className="p-2">{index+1}</td>
                <td className="p-2">{colors.name}</td>
                <td className="p-2">
                  <div className={`w-[90%] mx-auto h-[20px]`} style={{
                    backgroundColor:colors.code
                  }}>{}</div>
                </td>
                <td className="p-2">
                  <MdDelete className="my-[5px] text-red-500 cursor-pointer inline" />{" "}
                  |{" "}
                  <Link to="/dashboard/color/update-colors">
                    <CiEdit className="my-[5px] text-yellow-500 cursor-pointer inline" />
                  </Link>
                </td>
                <td className="p-2">
                  <button 
                  value={colors._id}
                   data-tooltip-id="my-tooltip"
                   onClick={handleupdatestatus}
                   data-tooltip-content={(colors.status) ? "Click to Inactive":"Click to Active"}
                  className={` text-white font-light rounded-md p-1 w-[80px] h-[35px] cursor-pointer ${(colors.status) ? "bg-green-500":"bg-red-500"}`}
                  >
                   {(colors.status) ? "Active":"Inactive"}
                  </button>
                </td>
              </tr>
              </>
              )
})
            }
         
           
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewColor;
